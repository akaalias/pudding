<template>
  <v-app>
    <v-app-bar
        app
        dark
        fluid
    >
      <v-progress-linear
          indeterminate
          color="purple darken-2"
          v-if="searching"
          class="searchingProgressIndicator"
      ></v-progress-linear>
      <v-row>
        <v-col cols="12">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-select
                      v-model="selectedAddress"
                      :items="tokens"
                      item-text="name"
                      item-value="address"
                      @change="search"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container fluid id="content-container">
        <v-card
            id="filters"
            class="mx-auto"
            max-width="300"
            tile
            v-if="elements.length > 0"
        >
          <h2>Focus</h2>
          <v-select
              v-model="selectedFocus"
              :items="focusItems"
              @change="search"
          > </v-select>

          <h2>Filters</h2>
          <v-slider
              v-if="selectedFocus == 'Relationships'"
              v-model="connectionThreshold"
              :max="maxConnections"
              :hint="connectionThresholdLabel"
              persistent-hint
              min="1"
              thumb-label
              @change="search"
              :color="computedRelationshipEdgeColorEnd"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="connectionThreshold"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 50px"
                  @click="search"
              ></v-text-field>
            </template>
          </v-slider>

          <v-slider
              v-if="selectedFocus == 'Transactions'"
              v-model="totalSumThreshold"
              :max="computedMaxTotalSum"
              :hint="totalSumThresholdLabel"
              persistent-hint
              min="1"
              thumb-label
              @change="search"
              :color="computedTransactionEdgeColorEnd"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="totalSumThreshold"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 50px"
                  @change="search"
              ></v-text-field>
            </template>
          </v-slider>


          <v-slider
              v-if="selectedFocus == 'Fiat'"
              v-model="totalFiatThreshold"
              :max="computedMaxTotalFiat"
              :hint="totalFiatThresholdLabel"
              persistent-hint
              min="1"
              thumb-label
              @change="search"
              :color="computedFiatEdgeColorEnd"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="totalFiatThreshold"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 50px"
                  @change="search"
              ></v-text-field>
            </template>
          </v-slider>

        </v-card>

        <v-row>
          <v-col cols="12">
            <div id="cyto" ref="cyto"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GraphDataProvider from "@/models/GraphDataProvider"
  import Constants from "@/models/Constants"
  import API from "@/models/API"
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';

  export default Vue.extend({
    name: 'Home',
    components: {
    },
    data() {
      return {
        searching: false,
        tokens: [],
        rawTokens: [],
        tokenLookupTable: new Map<string, any>(),
        selectedAddress: '',
        elements: [],
        clusterElements: [],
        apiResultCount: 0,
        api: new API(),
        searchCount: 0,
        searchedQueries: [],
        connectionThreshold: 1,
        maxConnections: 100,
        maxTotalSum: 100,
        maxTotalFiat: 100,
        totalSumThreshold: 1,
        totalFiatThreshold: 1,
        selectedFocus: Constants.RelationshipFocus,
        focusItems: [Constants.RelationshipFocus, Constants.TransactionFocus, Constants.FiatFocus]
      }
    },
    methods: {
      async search() {
        this.searchCount += 1
        if(this.selectedAddress.length == 42) {
          this.searching = true
          this.elements = []

          // Get Elements
          this.elements = await this.graphDataProvider.getTokenNetwork(this.selectedAddress, this.tokenLookupTable.get(this.selectedAddress))

          // Get Communities
          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]

          // Generate Community Classes
          for(var id of uniqueCommunityIds) {
            const rnd = Math.floor(Math. random() * Constants.RandomNodeCount)
            // const color = Constants.getBackgroundColor(id + " " + id)
            const color = Constants.colors[id]
            // const color = Constants.StringToColor.next(id + " ")

            this.cy.style()
                .selector('node.c' + id)
                .style({
                  'background-color': color
                })
                .update()
          }

          // Set Elements
          this.cy.remove('')
          this.cy.add(this.elements)

          // Update Nodes
          var nodes = this.cy.nodes('')

          // Update Node Community Classes
          for(var node of nodes) {
            let nId = node.data('id')
            this.cy.$('#' + nId).addClass("c" + nodeToCommunityMapping.get(nId))
            if(this.searchedQueries.includes(nId)) {
              this.cy.$('#' + nId).addClass("target")
            }
            // Update node score
            this.cy.$('#' + nId).data("score", this.cy.$('#' + nId).incomers().length)
          }


          // Get max TX transaction count
          var maxEdgeTransactions = this.cy.edges().max(function(edge){
            return edge.data('transactions')
          });
          this.maxConnections = maxEdgeTransactions.value

          // Get max TX totalSum
          var maxEdgeTotalHumanreadableSum = this.cy.edges().max(function(edge){
            return edge.data('humanReadableTotalSum')
          });

          this.maxTotalSum = maxEdgeTotalHumanreadableSum.value

          // Get max TX fiat
          var maxEdgeTotalHumanreadableFiat = this.cy.edges().max(function(edge){
            return edge.data('fiat')
          });

          this.maxTotalFiat = maxEdgeTotalHumanreadableFiat.value

          // Get max score
          var maxNodeScore = this.cy.nodes().max(function(node){
            return node.data('score')
          });

          this.cy.style()
              .selector('node')
              .style({
                "width": "mapData(score, 0, " + maxNodeScore.value + ", 10, 80)",
                "height": "mapData(score, 0, " + maxNodeScore.value + ", 10, 80)",
              })
              .update()

          // Apply Filters...
          if(this.selectedFocus == Constants.RelationshipFocus) {
            // Filter out edges and nodes
            var filteredElements = []
            this.cy.filter(function(element, i){
              if(!element.isEdge()) {
                return false
              }
              let txs = element.data('transactions')
              let result = txs < this.connectionThreshold
              return result
            }.bind(this)).remove();

          } else if(this.selectedFocus == Constants.TransactionFocus) {
            // Filter out edges and nodes
            var filteredElements = []
            this.cy.filter(function(element, i){
              if(!element.isEdge()) {
                return false
              }
              let humanReadableTotalSum = element.data('humanReadableTotalSum')
              let result = humanReadableTotalSum < this.totalSumThreshold
              return result
            }.bind(this)).remove();

          } else if(this.selectedFocus == Constants.FiatFocus) {
            // Filter out edges and nodes
            var filteredElements = []
            this.cy.filter(function(element, i){
              if(!element.isEdge()) {
                return false
              }
              let fiatSum = element.data('fiat')
              let result = fiatSum < this.totalFiatThreshold
              return result
            }.bind(this)).remove();
          }

          // Remove orphaned nodes
          this.cy.filter(function(element, i){
            if(!element.isNode()) {
              return false
            }
            let hasEdges = element.connectedEdges().length <= 0
            return hasEdges
          }.bind(this)).remove();

          // Set up edge classes
          var dataMapProperty = 'transactions'
          var dataMapMaximum = maxEdgeTransactions.value
          var dataMapColorStart = Constants.RelationshipEdgeColorStart
          var dataMapColorEnd = Constants.RelationshipEdgeColorEnd
          var descriptionProperty = 'relationshipDescription'

          if(this.selectedFocus == Constants.TransactionFocus) {
            // Change mapping values
            dataMapProperty = 'humanReadableTotalSum'
            dataMapMaximum = maxEdgeTotalHumanreadableSum.value
            dataMapColorStart = Constants.TransactionEdgeColorStart
            dataMapColorEnd = Constants.TransactionEdgeColorEnd
            descriptionProperty = 'transactionDescription'
          } else if (this.selectedFocus == Constants.FiatFocus) {
            dataMapProperty = 'fiat'
            dataMapMaximum = maxEdgeTotalHumanreadableFiat.value
            dataMapColorStart = Constants.FiatEdgeColorStart
            dataMapColorEnd = Constants.FiatEdgeColorEnd
            descriptionProperty = 'transactionDescription'
          }

          this.cy.style()
              .selector('edge')
              .style({
                "width": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 10)",
                "arrow-scale": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 1.2)",
                "line-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'mid-target-arrow-color': "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum  + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
              })
              .update()

          // Run Layout
          this.cy.layout(Constants.coseLayout).run();
          this.cy.fit()

          // Indicate finished
          this.maxConnections = maxEdgeTransactions.value
          this.maxTotalSum = maxEdgeTotalHumanreadableSum.value
          this.searching = false
        }
      },
      playSound (sound) {
        if(sound) {
          var audio = new Audio(sound);
          audio.play();
        }
      },
      setupCyGraph() {
        let cy = cytoscape({
          container: this.$refs.cyto,
          elements: [],
          style: Constants.cyStyle
        })

        this.cy = cy

        this.cy.on('mouseover', 'edge', function(e){
          var sel = e.target;
          sel.addClass('showLabel')
        }.bind(this))

        this.cy.on('mouseout', 'edge', function(e){
          var sel = e.target;
          sel.removeClass('showLabel')
        }.bind(this))
      },
      setupClusterGraph() {
        let clusterCy = cytoscape({
          container: this.$refs.clusterCyto,
          elements: [],
          style: Constants.cyStyle
        })

        this.clusterCy = clusterCy
      },
    },
    async mounted() {
      this.api = new API()
      this.graphDataProvider = new GraphDataProvider(this.api)
      this.rawTokens = await this.api.getTopTokens()
      for(var token of this.rawTokens) {
        this.tokenLookupTable.set(token['address'], token)
        this.tokens.push(token)
      }
      // cytoscape.use( cola );

      this.setupCyGraph()
    },
    computed: {
      connectionThresholdLabel() {
        return "Minimum Relationship Strength:" + " " + this.connectionThreshold
      },
      totalSumThresholdLabel() {
        let token = this.tokenLookupTable.get(this.selectedAddress)
        let symbol = token['symbol']
        return "Minimum Total " + symbol + ": " + this.totalSumThreshold
      },
      totalFiatThresholdLabel() {
        let humanReadableWithCurrency = this.totalFiatThreshold.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        });
        return "Minimum Dollar: " + humanReadableWithCurrency
      },
      computedRelationshipEdgeColorEnd() {
        return Constants.RelationshipEdgeColorEnd
      },
      computedTransactionEdgeColorEnd() {
        return Constants.TransactionEdgeColorEnd
      },
      computedFiatEdgeColorEnd() {
        return Constants.FiatEdgeColorEnd
      },
      computedMaxTotalSum() {
        // Get max TX totalSum
        var maxEdgeTotalHumanreadableSum = this.cy.edges().max(function(edge){
          return edge.data('humanReadableTotalSum')
        });

        return maxEdgeTotalHumanreadableSum.value
      },
      computedMaxTotalFiat() {
        var maxEdgeTotalHumanreadableFiat = this.cy.edges().max(function(edge){
          return edge.data('fiat')
        });

        return maxEdgeTotalHumanreadableFiat.value
      }
    }
  })
</script>

<style>

.v-toolbar form {
  padding-top: 20px;
}

#cytoscape-div {
}

#content-container {
  background-color: #222;
}

#cyto {
  width: 100%;
  height: 700px;
  display: block;
  background-color: #222;
}

#clusterCyto {
  width: 100%;
  height: 900px;
  display: block;
}

.searchingProgressIndicator {
  width: 100%;
  height: 4px;
  position: fixed;
  top: 0px;
  left: 0px;
}

#filters {
  padding: 10px;
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 1;
}

#filters h2 {
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0.5;
}

</style>