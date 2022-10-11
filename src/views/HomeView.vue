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
        selectedAddress: '',
        elements: [],
        clusterElements: [],
        apiResultCount: 0,
        api: new API(),
        searchCount: 0,
        searchedQueries: []
      }
    },
    methods: {
      async search() {
        this.searchCount += 1
        if(this.selectedAddress.length == 42) {
          this.searching = true
          this.searchedQueries.push(this.selectedAddress)
          this.elements = []
          this.elements = await this.graphDataProvider.getTokenNetwork(this.selectedAddress)
          this.cy.add(this.elements)
          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]
          var communityNodeCounts = new Map<string, number>()
          var maxNodes = 0
          var communityIdWithMaxNodes = 0
          this.searching = false

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

          var nodes = this.cy.nodes('')
          for(var node of nodes) {
            let nId = node.data('id')
            this.cy.$('#' + nId).addClass("c" + nodeToCommunityMapping.get(nId))
            if(this.searchedQueries.includes(nId)) {
              this.cy.$('#' + nId).addClass("target")
            }
            this.cy.$('#' + nId).data("score", this.cy.$('#' + nId).incomers().length)
          }

          var maxNodeScore = this.cy.nodes().max(function(node){
            return node.data('score')
          });

          var maxEdgeWeight = this.cy.edges().max(function(edge){
            return edge.data('weight')
          });

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
                "width":        "mapData(weight, 0, " + maxEdgeWeight.value + ", 0.5, 10)",
                "arrow-scale":  "mapData(weight, 0, " + maxEdgeWeight.value + ", 0.5, 1)",
              })
              .update()

          this.cy.layout(Constants.coseLayout).run();
          this.cy.fit(this.cy.$('.c' + communityIdWithMaxNodes))

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
        this.cy.on("tap", "node",
            function (evt) {
              let node = evt.target;
              this.selectedAddress = node.data().id;
              this.search();
            }.bind(this));

        this.cy.on('mouseover', 'node', function(e){
          var sel = e.target;
          this.cy.elements().difference(sel.neighborhood()).not(sel).addClass('semitransp');
          sel.addClass('showLabel')
          sel.addClass('highlight').neighborhood().addClass('highlight');
        }.bind(this));

        this.cy.on('mouseout', 'node', function(e){
          var sel = e.target;
          this.cy.elements().removeClass('semitransp');
          sel.removeClass('showLabel')
          sel.removeClass('highlight').neighborhood().removeClass('highlight');
        }.bind(this));
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
      const theTokens = await this.api.getTopTokens()

      for(var token of theTokens) {
        this.tokens.push(token)
      }

      cytoscape.use( cola );

      this.setupCyGraph()
      this.setupClusterGraph()
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