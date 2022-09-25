<template>
  <v-container>
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
                    label="Query"
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
                'background-color': '#666',
                'label': 'data(label)',
                'width': 100,
                'height': 100,
                'font-size': 40,
                'text-halign': 'center',
                'text-valign': 'bottom'
              }
            },
            {
              selector: 'node.target',
              style: {
                'background-color': 'red',
                'label': 'data(label)',
                'width': 120,
                'height': 120,
              }
            }
            , {
              selector: 'edge',
              style: {
                'width': 'data(weight)',
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'haystack',
                'haystack-radius': 0.5
              }
            }
          ],
          layout: {
            name: 'circle',
            row: 1
          }
        }
      }
    },
    methods: {
      async search() {
        if(this.query.length == 42) {
          this.elements = await GraphDataProvider.getTransactionsNetworkForAccount(this.query);
        }
      },
      preConfig(cytoscape) {
        cytoscape.use( cola );
      },
      async afterCreated(cy) {
        this.cy = cy;
        this.cy.add(this.elements);
        this.cy.layout({name: 'concentric'}).run();
        this.cy.resize();
        this.cy.fit();
      }
    },
    async created() {
    },
  })
</script>

<style>

#cytoscape-div {
}

</style>