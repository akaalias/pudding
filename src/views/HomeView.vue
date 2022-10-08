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
        query: '0xee599d36b41759d0343d997657e51665f973e944',
        queryRules: [
          v => !!v || 'Query is required',
          v => v.length == 42 || 'Query must be 42 characters',
        ],
        elements: [],
        clusterElements: [],
        apiResultCount: 0,
        api: new API()
      }
    },
    methods: {
      async search() {
        if(this.query.length == 42) {

          this.elements = []
          this.elements = await this.graphDataProvider.getRandomNetwork()
          // this.elements = await this.graphDataProvider.getTransactionsNetworkForAccount(this.query);
          this.cy.elements().remove()
          this.cy.add(this.elements)

          const nodeToCommunityMapping = await this.graphDataProvider.getNodeToCommunityMap(this.elements)
          const uniqueCommunityIds = [...new Set(nodeToCommunityMapping.values())]; // [ 'A', 'B']

          for(var id of uniqueCommunityIds) {
            const rnd = Math.floor(Math. random() * Constants.RandomNodeCount)
            this.cy.style()
                .selector('node.c' + id)
                .style({
                  'background-color': Constants.getBackgroundColor(id + rnd)
                })
                .update()
          }

          var nodes = this.cy.nodes('')
          for(var node of nodes) {
            let nId = node.data('id')
            this.cy.$('#' + nId).addClass("c" + nodeToCommunityMapping.get(nId))
          }

          this.cy.layout(Constants.coseLayout).run();
          this.cy.resize();
          this.cy.fit();

          // this.clusterElements = []
          // this.clusterElements = await this.graphDataProvider.getClusterElements(this.elements)
          // this.clusterCy.elements().remove()
          // this.clusterCy.add(this.clusterElements)
          // this.clusterCy.layout(Constants.coseLayout).run()
          // this.clusterCy.resize()
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
          this.cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
          sel.addClass('highlight').outgoers().addClass('highlight');
        }.bind(this));

        this.cy.on('mouseout', 'node', function(e){
          var sel = e.target;
          this.cy.elements().removeClass('semitransp');
          sel.removeClass('highlight').outgoers().removeClass('highlight');
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
  height: 900px;
}

#content-container {
  margin-top: 40px;
}

#cyto {
  width: 100%;
  height: 900px;
  display: block;
}

#clusterCyto {
  width: 100%;
  height: 900px;
  display: block;
}

</style>