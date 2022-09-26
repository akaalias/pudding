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
      <v-container fluid>
        <v-row>
          <v-col
              cols="12"
          >
            <cytoscape
                :config="config"
                :preConfig="preConfig"
                :afterCreated="afterCreated"
                v-if="elements.length !== 0"
            />
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import cola from "cytoscape-cola";
  import GraphDataProvider from "@/models/GraphDataProvider"

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
        config: {
          style: [
            {
              selector: 'node',
              style: {
                'background-color': '#222',
                'label': 'data(label)',
                "width": "mapData(score, 0, 100, 20, 60)",
                "height": "mapData(score, 0, 100, 20, 60)",
                "font-size": "12px",
                "text-valign": "center",
                "text-halign": "center",
                "background-color": "#555",
                "text-outline-color": "#555",
                "text-outline-width": "2px",
                "color": "#fff",
                "overlay-padding": "6px",
                "z-index": "10"
              }
            },
            {
              selector: 'node.target',
              style: {
                'background-color': 'red',
              }
            }
            , {
              selector: 'edge',
              style: {
                'curve-style': 'haystack',
                'haystack-radius': 0.8,
                "font-size": "6px",
                "opacity": 0.5,
                "line-color": "#333",
                "width": 'mapData(weight, 1, 100, 1, 10)',
                'arrow-scale': 'mapData(weight, 1, 100, 0.5, 3)',
                'label': 'data(weight)',
                'color': 'white',
                'mid-target-arrow-fill': 'filled',
                'mid-target-arrow-shape': 'triangle',
                'mid-target-arrow-color': "#333"
              }
            },
            {
              selector: 'node.highlight',
              style: {
                'border-color': '#FFF',
                'border-width': '2px'
              }
            },
            {
              selector: 'node.semitransp',
              style:{ 'opacity': '0.5' }
            },
            {
              selector: 'edge.highlight',
              style: { 'mid-target-arrow-color': '#FFF' }
            },
            {
              selector: 'edge.semitransp',
              style:{ 'opacity': '0.2' }
            }
          ]
        }
      }
    },
    methods: {
      async search() {
        if(this.query.length == 42) {
          this.elements = []
          this.elements = await GraphDataProvider.getTransactionsNetworkForAccount(this.query);
        }
      },
      preConfig(cytoscape) {
        cytoscape.use( cola );
      },
      async afterCreated(cy) {
        this.cy = cy;
        this.cy.add(this.elements);

        this.cy.on(
            "tap",
            "node",
            function (evt) {
              console.log("tap")
              let node = evt.target;
              this.query = node.data().id;
              this.search();
            }.bind(this)
        );

        this.cy.on('mouseover', 'node', function(e){
            var sel = e.target;
            this.cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
            sel.addClass('highlight').outgoers().addClass('highlight');
          }.bind(this)
        );

        this.cy.on('mouseout', 'node', function(e){
          var sel = e.target;
          this.cy.elements().removeClass('semitransp');
          sel.removeClass('highlight').outgoers().removeClass('highlight');
          }.bind(this)
        );

        const coseLayout = {
          name: 'cose',
              animate: false,
              idealEdgeLength: 100,
              nodeOverlap: 20,
              refresh: 20,
              fit: true,
              padding: 30,
              randomize: false,
              componentSpacing: 100,
              nodeRepulsion: 400000,
              edgeElasticity: 100,
              nestingFactor: 5,
              gravity: 80,
              numIter: 1000,
              initialTemp: 200,
              coolingFactor: 0.95,
              minTemp: 1.0
        }

        let concentricOptions = {
          name: 'concentric',

          fit: true, // whether to fit the viewport to the graph
          padding: 30, // the padding on fit
          startAngle: 3 / 2 * Math.PI, // where nodes start in radians
          sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
          clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
          equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
          minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
          boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
          avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
          nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
          height: undefined, // height of layout area (overrides container height)
          width: undefined, // width of layout area (overrides container width)
          spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
          concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.degree();
          },
          levelWidth: function( nodes ){ // the variation of concentric values in each level
            return nodes.maxDegree() / 4;
          },
          animate: false, // whether to transition the node positions
          animationDuration: 500, // duration of animation in ms if enabled
          animationEasing: undefined, // easing of animation if enabled
          animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
          ready: undefined, // callback on layoutready
          stop: undefined, // callback on layoutstop
          transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
        };


        this.cy.layout(concentricOptions).run();
        this.cy.resize();
        this.cy.fit();
      }
    },
    async created() {
    },
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

</style>