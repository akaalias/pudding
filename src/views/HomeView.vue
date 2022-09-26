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
        query: '0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC',
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
                "curve-style": "haystack",
                "haystack-radius": 0.5,
                "line-color": "#444",
                "width": 'mapData(weight, 1, 100, 1, 10)',
                'label': 'data(weight)'
              }
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
        },

        this.cy.layout(coseLayout).run();
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