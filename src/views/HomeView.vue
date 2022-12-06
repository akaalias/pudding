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
        <v-btn v-bind:to="'/'">
          <v-icon>mdi-home</v-icon> &nbsp;
          Pudding
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          small
          right
          @click="sheet = !sheet"
      >
        <v-icon small left>mdi-information</v-icon>
        Show Guide
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid id="content-container">
        <v-card
            id="filters"
            class="mx-auto"
            tile
        >
          <div id="toggleMenuButtonContainer">
            <v-btn x-small
                   icon
                   @click="toggleShowMenu"
                   id="toggleMenuButton">
              <v-icon dark>
                {{showMenu ? "mdi-minus" : "mdi-plus"}}
              </v-icon>
            </v-btn>
          </div>
          <v-select
              label="Select a Token to explore"
              v-model="selectedAddress"
              :items="tokens"
              item-text="name"
              item-value="address"
              @change="searchFromScratch"
              v-if="showMenu"
          ></v-select>
          <div id="menuItems" v-if="elements.length > 0 && showMenu">
            <v-select
                label="Research Focus"
                v-model="selectedFocus"
                :items="focusItems"
                @change="search"
            > </v-select>
            <v-slider
                v-if="selectedFocus == 'Relationships' || selectedFocus == 'Hybrid'"
                v-model="connectionThreshold"
                :max="maxConnections"
                min="0"
                :hint="connectionThresholdLabel"
                persistent-hint
                thumb-label
                @change="search"
                :color="computedRelationshipEdgeColorEnd"
            >
            </v-slider>
            <br>
            <v-slider
                v-if="selectedFocus == 'Transactions' || selectedFocus == 'Hybrid' && !finetuneTotalSumThreshold"
                v-model="totalSumThreshold"
                :max="maxTotalSum"
                min="0"
                :hint="totalSumThresholdLabel"
                :color="computedTransactionEdgeColorEnd"
                persistent-hint
                @change="search"
            >
              <template v-slot:append>
                <v-icon v-if="!finetuneTotalSumThreshold"
                        dark
                        small
                        @click="finetuneTotalSumThreshold = !finetuneTotalSumThreshold"
                >
                  mdi-numeric
                </v-icon>
              </template>
            </v-slider>
            <v-text-field v-if="finetuneTotalSumThreshold"
                          type="number"
                          v-model="totalSumThreshold"
                          @change="search"
                          persistent-hint
                          :hint="totalSumThresholdLabel"
                          :color="computedTransactionEdgeColorEnd"
            >
              <template v-slot:append>
                <v-icon v-if="finetuneTotalSumThreshold"
                        dark
                        small
                        @click="finetuneTotalSumThreshold = !finetuneTotalSumThreshold"
                >
                  mdi-map-marker-minus
                </v-icon>
              </template>
            </v-text-field>


            <br>
            <v-btn
                v-on:click="exportPNG"
                small
                block
            > Export PNG
            </v-btn>
          </div>
        </v-card>
        <v-row>
          <v-col cols="12">
            <div id="cyto" ref="cyto"/>
          </v-col>
        </v-row>

        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            v-model="sheet"
            scrollable>
          <v-card>
            <v-card-text>
                <v-btn
                    class="mt-6"
                    text
                    color="red"
                    @click="sheet = !sheet"
                >
                  Close
                </v-btn>
                  <img src="https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png" style="width: 100%"/>
                  <h2>Wait. What in the world am I even looking at here?</h2>
                  <br/>
                  <p>
                    Great question!
                    </p>
                  <p>
                    First and foremost, those hairballs that you're looking at are...
                    <b>the network of most recent transactions of a specific ERC20 token between addresses</b> on the Ethereum Blockchain.
                  </p>

                  <p>
                    This network shows you <i>"WHO sent HOW MUCH TOKENS to WHOM?"</i>
                  </p>

                  <p>
                    Currently you're seeing a snapshot of the most recent 1,000 transactions for a particular token.
                  </p>

                  <h3>
                    The Circles
                  </h3>
                  <br/>
                  <p>
                    Circles represent individual Ethereum addresses.
                  </p>
                  <p>
                    The <b>color</b> of each circle represents the <a href="https://en.wikipedia.org/wiki/Louvain_method">Louvain community</a> that each address belongs to based on the data available.
                    Circles of the same color belong in the same community.
                  </p>

                  <p>
                    The relative <b>size</b> of each circle represents their 'authority' inside the network, meaning how many incoming arrows it has from other addresses.
                  </p>

                  <h3>
                    The Arrows Between Circles
                  </h3>
                  <br/>
                  <p>
                    The arrows between circles represent the most recent transactions that two addresses were involved in.
                  </p>
                  <p>
                    The arrow <b>direction</b> tells you which address was the SENDER and which was the RECEIVER of tokens.
                  </p>

                  <h4>Arrow Color and Thickness: Pink </h4>
                  <p>
                    A pink arrow shows you the STRENGTH of the relationship between two nodes.
                    The THICKER a pink arrow is, the more transactions the two addresses recently had.
                  </p>

                  <h4>Arrow Color and Thickness: Gray</h4>
                  <p>
                    A gray arrow shows you HOW MUCH VALUE was recently exchanged between two nodes.
                    The THICKER a gray arrow is, the more VALUE the two addresses recently exchanged.
                  </p>

                  <h3>Exploring the Hairball</h3>
                  <br/>
                  <p>
                    Now that you have a basic understanding of what is on your screen, you can start poking around in a few ways.
                  </p>
                  <p>
                    The easiest way is to simply use your trackpad or mouse to
                     <b>zoom in and out</b>. You can also <b>click and drag</b> to move the whole
                    canvas around. You can also <b>click and drag</b> individual circles and select many with <b>click-shift drag</b>.
                  </p>

                  <p>
                    When you <b>hover</b> over an item, you will see extra information about it.
                  </p>

                  <h3>Using Filters</h3>
                  <p>
                    The most powerful feature to pull the stories out of a hairball is to <b>filter down</b> transactions by <b>strength of relationship</b>, <b>value of transaction</b> or both.
                  </p>
            </v-card-text>
          </v-card>
        </v-dialog>
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
        minimumConnections: 1,
        connectionThreshold: 1,
        maxConnections: 0,
        maxTotalSum: 0,
        totalSumThreshold: 0,
        minimumTotalSum: 0,
        selectedFocus: Constants.HybridFocus,
        focusItems: [Constants.HybridFocus, Constants.RelationshipFocus, Constants.TransactionFocus],
        sheet: false,
        finetuneTotalSumThreshold: false
      }
    },
    methods: {
      async searchFromScratch() {
        this.searching = true
        this.maxConnections = 0
        this.maxTotalSum = 0
        this.connectionThreshold = 1
        this.totalSumThreshold = 0
        this.search()
      },
      async fetchTokenInfo() {
        this.selectedAddress = this.selectedAddress.toLowerCase()
        // Get Token Info
        console.log("Fetching Token Info for: " + this.selectedAddress)
        let tokenInfo = await this.api.getTokenInfo(this.selectedAddress)
        this.tokenLookupTable.set(tokenInfo['address'].toLowerCase(), tokenInfo)
        this.tokens.push(tokenInfo)
      },
      async search() {
        if(this.selectedAddress.length == 42) {
          this.fetchTokenInfo()

          this.searching = true
          this.elements = []

          // Get Elements
          this.elements = await this.graphDataProvider.getTokenNetwork(this.selectedAddress, this.tokenLookupTable.get(this.selectedAddress))

          // Get Communities
          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]

          // Generate Community Classes
          for(var id of uniqueCommunityIds) {
            var color = Constants.StringToColor.next(id)
            if(color == null) {
              color = Constants.colors[id]
            }

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
                "width": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 1, 10)",
                "arrow-scale": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 1.2)",
                "line-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'mid-target-arrow-color': "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum  + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'control-point-distances': "80"
              })
              .update()

          this.cy.style()
              .selector('edge.relationship-focus.showLabel')
              .style({
                "text-background-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
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
                "width": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 1, 10)",
                "arrow-scale": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", 0.5, 1.2)",
                "line-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
                'mid-target-arrow-color': "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum  + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
              })
              .update()

          this.cy.style()
              .selector('edge.transaction-focus.showLabel')
              .style({
                "text-background-color": "mapData(" + dataMapProperty + ", 0, " + dataMapMaximum + ", " + dataMapColorStart + ", " + dataMapColorEnd + ")",
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
      },
      async exportPNG() {
        Promise.resolve(this.cy.png({ output: "blob-promise" })).then(
            (result) => {
              var image = new Image();
              image.src = URL.createObjectURL(result);
              window.open(image.src, "_blank");
            }
        )
      }
    },
    async mounted() {
      this.api = new API()
      this.graphDataProvider = new GraphDataProvider(this.api)

      // Setup dropdown list
      for(var token of Constants.AvailableTokens) {
        this.tokens.push(token)
      }

      this.setupCyGraph()

      const addressParam = this.$route.query.address;
      if(!!addressParam) {
        this.selectedAddress = addressParam;
        this.searchFromScratch()
      }
    },
    computed: {
      connectionThresholdLabel() {
        return "Minimum Relationship Strength:" + " " + this.connectionThreshold
      },
      totalSumThresholdLabel() {
        console.log("Looking for: " + this.selectedAddress + " here:")
        console.log(this.tokenLookupTable)
        var token = this.tokenLookupTable.get(this.selectedAddress)
        var symbol = "SYMBOL"
        var rate = 0
        var currency = "UNKNOWN"

        if(token != undefined) {
          console.log("totalSumThresholdLabel: Token")
          symbol = token['symbol']
          rate = token['price']['rate']
          currency = token['price']['currency']
        } else {
          console.log("Didn't get full token info!!")
        }

        let multiplicationWithRate = this.totalSumThreshold * rate
        let humanReadableWithCurrency = multiplicationWithRate.toLocaleString("en-US", {
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

#toggleMenuButtonContainer {
}

#info-button {
  position: absolute;
  bottom: 100px;
  right: 100px;
}

</style>