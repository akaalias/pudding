<template>
  <v-app>
    <v-progress-linear
        indeterminate
        color="purple darken-2"
        v-if="searching"
        class="searchingProgressIndicator"
    ></v-progress-linear>
    <v-app-bar
        app
        dark
        fluid
    >
      <v-toolbar-title>
        Pudding
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
          label="Select a Token to explore"
          v-model="selectedAddress"
          :items="tokens"
          item-text="name"
          item-value="address"
          @change="searchFromScratch"
          style="padding-top: 25px; padding-left: 20px;"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container fluid id="content-container">
        <v-card
            id="filters"
            class="mx-auto"
            tile
            v-if="elements.length > 0"
        >
          <v-btn x-small
                 icon
                 @click="toggleShowMenu"
          id="toggleMenuButton">
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>

          <div id="menuToggleWrapper" v-if="showMenu">
            <h2>Focus</h2>
            <v-select
                v-model="selectedFocus"
                :items="focusItems"
                @change="search"
            > </v-select>
            <h2>Filters</h2>
            <v-slider
                v-if="selectedFocus == 'Relationships' || selectedFocus == 'Hybrid'"
                v-model="connectionThreshold"
                :max="maxConnections"
                :hint="connectionThresholdLabel"
                persistent-hint
                min="1"
                thumb-label
                @change="search"
                :color="computedRelationshipEdgeColorEnd"
            >
            </v-slider>
            <v-slider
                v-if="selectedFocus == 'Transactions' || selectedFocus == 'Hybrid'"
                v-model="totalSumThreshold"
                :max="maxTotalSum"
                :hint="totalSumThresholdLabel"
                persistent-hint
                min="1"
                thumb-label
                @change="search"
                :color="computedTransactionEdgeColorEnd"
            >
            </v-slider>
          </div>
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
        showMenu: true,
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
        maxConnections: 1,
        maxTotalSum: 1,
        totalSumThreshold: 1,
        selectedFocus: Constants.HybridFocus,
        focusItems: [Constants.HybridFocus, Constants.RelationshipFocus, Constants.TransactionFocus]
      }
    },
    methods: {
      async searchFromScratch() {
        this.searching = true
        this.maxConnections = 1
        this.maxTotalSum = 1
        this.connectionThreshold = 1
        this.totalSumThreshold = 1
        this.search()
      },
      async search() {
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
            const color = Constants.colors[id]// Constants.StringToColor.next(id)

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

            this.cy.$('.transaction-focus').remove()

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

            this.cy.$('.relationship-focus').remove()

          } else if(this.selectedFocus == Constants.HybridFocus) {
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

          this.cy.style()
              .selector('edge.relationship-focus')
              .style({
                "width": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 10)",
                "arrow-scale": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 1.2)",
                "line-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'mid-target-arrow-color': "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum  + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'control-point-distances': "80"
              })
              .update()

          dataMapProperty = 'humanReadableTotalSum'
          dataMapMaximum = maxEdgeTotalHumanreadableSum.value
          dataMapColorStart = Constants.TransactionEdgeColorStart
          dataMapColorEnd = Constants.TransactionEdgeColorEnd
          descriptionProperty = 'transactionDescription'

          this.cy.style()
              .selector('edge.transaction-focus')
              .style({
                "width": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 10)",
                "arrow-scale": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 1.2)",
                "line-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'mid-target-arrow-color': "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum  + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'control-point-distances': "40"
              })
              .update()


          // Run Layout
          this.cy.layout(Constants.coseLayout).run();
          this.cy.fit()

          // Indicate finished
          this.searching = false
        }
      },
      setupCyGraph() {
        let cy = cytoscape({
          container: this.$refs.cyto,
          elements: [],
          style: Constants.cyStyle
        })

        this.cy = cy

        this.cy.on('mouseover', 'edge, node', function(e){
          var sel = e.target;
          sel.addClass('showLabel')
        }.bind(this))

        this.cy.on('mouseout', 'edge, node', function(e){
          var sel = e.target;
          sel.removeClass('showLabel')
        }.bind(this))

      },
      toggleShowMenu() {
        this.showMenu = !this.showMenu
      }
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
        let rate = token['price']['rate']
        let currency = token['price']['currency']
        let humanReadableWithCurrency = this.totalSumThreshold.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        });

        return "Minimum: " + Intl.NumberFormat().format(this.totalSumThreshold) + symbol + " (" + humanReadableWithCurrency + ")"
      },
      computedRelationshipEdgeColorEnd() {
        return Constants.RelationshipEdgeColorEnd
      },
      computedTransactionEdgeColorEnd() {
        return Constants.TransactionEdgeColorEnd
      }
    }
  })
</script>

<style>

#content-container {
  background-color: #222;
}

#cyto {
  width: 100%;
  height: 900px;
  display: block;
  background-color: #222;
}

.searchingProgressIndicator {
  width: 100%;
  height: 5px;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
}

#filters {
  padding: 10px;
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 1;
  background-color: #333;
}

#filters h2 {
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0.5;
}

</style>