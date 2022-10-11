<template>
  <v-app>
    <v-app-bar
        app
        dark
        fluid
    >
      <v-row>
        <v-col cols="12">
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col
                    cols="10"
                >
                  <v-text-field
                      v-model="query"
                      :rules="queryRules"
                      :counter="42"
                      label=""
                      clearable
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="2"
                >
                  <v-btn
                      class="mr-4"
                      @click="search"
                      :disabled="!valid"
                  >
                    Search
                  </v-btn>
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
<!--          <v-col cols="6">-->
<!--            <div id="clusterCyto" ref="clusterCyto"/>-->
<!--          </v-col>-->
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
        valid: false,
        // query: '0xee599d36b41759d0343d997657e51665f973e944', // Sample Account
        query: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Sample Token
        queryRules: [
          v => !!v || 'Query is required',
          v => v.length == 42 || 'Query must be 42 characters',
        ],
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
        if(this.query.length == 42) {
          this.searchedQueries.push(this.query)

          this.elements = []
          // this.elements = await this.graphDataProvider.getRandomNetwork()
          // this.elements = await this.graphDataProvider.getTransactionsNetworkForAccount(this.query);
          this.elements = await this.graphDataProvider.getTokenNetwork(this.query)
          this.cy.add(this.elements)
          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]

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

          console.log(communityNodeCounts)
          console.log(communityIdWithMaxNodes)

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

            // this.clusterCy.style()
            //     .selector('node.c' + id)
            //     .style({
            //       'background-color': color
            //     })
            //     .update()
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
                "width":        "mapData(weight, 0, " + maxEdgeWeight.value + ", 0.5, 5)",
                "arrow-scale":  "mapData(weight, 0, " + maxEdgeWeight.value + ", 0.5, 1)",
              })
              .update()

          this.cy.layout(Constants.coseLayout).run();
          if(this.searchCount <= 1) {
            // this.cy.reset()
            // this.cy.center()
            // this.cy.fit()
          }


          this.cy.fit(this.cy.$('.c' + communityIdWithMaxNodes))
          // this.cy.pan({
          //   x: 100,
          //   y: 100
          // });

          // this.cy.center()
          // this.cy.zoom({
          //   level: 1.0, // the zoom level
          //   renderedPosition: { x: 100, y: 100 }
          // })

          // this.clusterElements = []
          // this.clusterElements = await this.graphDataProvider.getClusterElements(this.elements)
          // this.clusterCy.elements().remove()
          // this.clusterCy.add(this.clusterElements)
          // this.clusterCy.layout(Constants.coseLayout).run()
          // this.clusterCy.reset()
          // this.clusterCy.fit()
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
              this.query = node.data().id;
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
    mounted() {
      this.api = new API()
      this.graphDataProvider = new GraphDataProvider(this.api)

      cytoscape.use( cola );

      this.setupCyGraph()
      this.setupClusterGraph()
      }
  })
</script>

<style>

.v-toolbar {
  padding-top: 30px;
  padding-bottom: 80px;
}

#cytoscape-div {
}

#content-container {
  margin-top: 40px;
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

</style>