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
        <v-row>
          <v-col cols="2">
            <h2>Filters</h2>

            <v-select
                v-model="selectedFocus"
                :items="focusItems"
            >

            </v-select>

            <v-slider
                v-if="selectedFocus == 'Relationships'"
                v-model="connectionThreshold"
                :max="maxConnections"
                :hint="connectionThresholdLabel"
                persistent-hint
                min="1"
                thumb-label
                @change="search"
            ></v-slider>

            <v-slider
                v-if="selectedFocus == 'Transactions'"
                v-model="totalSumThreshold"
                hint="Total Sum"
                persistent-hint
                thumb-label
                :max="maxTotalSum"
                min="1"
            ></v-slider>
          </v-col>
          <v-col cols="10">
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
        connectednessPercentile: 0,
        connectionThreshold: 1,
        maxConnections: 1000,
        maxTotalSum: 1000000000,
        selectedFocus: Constants.RelationshipFocus,
        focusItems: [Constants.RelationshipFocus, Constants.TransactionFocus]
      }
    },
    methods: {
      async search() {
        this.searchCount += 1
        if(this.selectedAddress.length == 42) {
          this.searching = true
          this.elements = []

          // Get Elements
          console.log("-------------------------------------")
          console.log("this.graphDataProvider.getTokenNetwork()")
          console.time('Execution Time');
          this.elements = await this.graphDataProvider.getTokenNetwork(this.selectedAddress, this.tokenLookupTable.get(this.selectedAddress))
          console.timeEnd('Execution Time');

          // Get Communities
          console.log("-------------------------------------")
          console.log("this.graphDataProvider.getNodeToCommunityMap()")
          console.time('Execution Time');
          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          console.timeEnd('Execution Time');

          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]

          // Get Top Community
          console.log("-------------------------------------")
          console.log("Get Top Community")
          console.time('Execution Time');
          var communityNodeCounts = new Map<string, number>()
          var maxNodes = 0
          var communityIdWithMaxNodes = 0

          for(var node of nodeToCommunityMapping) {
            var c = 1
            if(communityNodeCounts.get(node[1]) == undefined) {
              communityNodeCounts.set(node[1], c)
            } else {
              c = communityNodeCounts.get(node[1])
              c += 1
              communityNodeCounts.set(node[1], c)
            }

            if(c > maxNodes) {
              maxNodes = c
              communityIdWithMaxNodes = node[1]
            }
          }
          console.timeEnd('Execution Time');

          // Generate Community Classes
          console.log("-------------------------------------")
          console.log("Generate Community Classes")
          console.time('Execution Time');
          for(var id of uniqueCommunityIds) {
            const rnd = Math.floor(Math. random() * Constants.RandomNodeCount)
            const color = Constants.getBackgroundColor(id + " " + id)
            // const color = Constants.colors[id]
            // const color = Constants.StringToColor.next(id + " ")

            this.cy.style()
                .selector('node.c' + id)
                .style({
                  'background-color': color
                })
                .update()
          }
          console.timeEnd('Execution Time');


          // Set Elements
          console.log("-------------------------------------")
          console.log("this.cy.add(this.elements)")
          console.time('Execution Time');
          this.cy.remove('')
          this.cy.add(this.elements)
          console.timeEnd('Execution Time');

          // Update Nodes
          console.log("-------------------------------------")
          console.log("Update Nodes")
          console.time('Execution Time');
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
          console.log("maxEdgeTransactions: " + maxEdgeTransactions.value)

          // Get max TX totalSum
          var maxEdgeTotalHumanreadableSum = this.cy.edges().max(function(edge){
            return edge.data('humanReadableTotalSum')
          });

          // Get max score
          var maxNodeScore = this.cy.nodes().max(function(node){
            return node.data('score')
          });

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

          this.cy.filter(function(element, i){
            if(!element.isNode()) {
              return false
            }
            let hasEdges = element.connectedEdges().length <= 0
            return hasEdges
          }.bind(this)).remove();

          this.cy.style()
              .selector('node')
              .style({
                "width": "mapData(score, 0, " + maxNodeScore.value + ", 10, 80)",
                "height": "mapData(score, 0, " + maxNodeScore.value + ", 10, 80)",
              })
              .update()

          this.cy.style()
              .selector('edge')
              .style({
                "width":        "mapData(transactions, 0, " + maxEdgeTransactions.value + ", 0.5, 10)",
                "arrow-scale":  "mapData(transactions, 0, " + maxEdgeTransactions.value + ", 0.5, 1.2)",
                "line-color": "mapData(transactions, 0, " + maxEdgeTransactions.value + ", #333, #fff)",
                'mid-target-arrow-color': "mapData(transactions, 0, " + maxEdgeTransactions.value + ", #333, #efefef)",
              })
              .update()
          console.timeEnd('Execution Time');

          // Run Layout
          console.log("-------------------------------------")
          console.log("this.cy.layout()")
          console.time('Execution Time');
          this.cy.layout(Constants.coseLayout).run();
          this.cy.fit()
          // this.cy.fit(this.cy.$('.c' + communityIdWithMaxNodes))
          console.timeEnd('Execution Time');

          // Indicate finished
          this.maxConnections = maxEdgeTransactions.value

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

</style>