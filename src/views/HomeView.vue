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
                    :counter="55"
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
        {{ elements }}
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GraphDataProvider from "@/models/GraphDataProvider"

  export default Vue.extend({
    name: 'Home',
    components: {
    },
    data() {
      return {
        valid: false,
        query: '',
        queryRules: [
          v => !!v || 'Query is required',
          v => v.length >= 10 || 'Query must be more than 10 characters',
        ],
        elements: [],
        config: {
          style: [
            {
              selector: 'node',
              style: {
                'background-color': '#666',
                'label': 'data(id)'
              }
            }, {
              selector: 'edge',
              style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
              }
            }
          ],
          layout: {
            name: 'grid',
            row: 1
          }
        }
      }
    },
    methods: {
      async search() {
        this.elements = await GraphDataProvider.getTransactionsNetworkForAccount("0x9aa99c23f67c81701c772b106b4f83f6e858dd2e");
      },
      preConfig(cytoscape) {
        // cytoscape.use( cola );
      },
      async afterCreated(cy) {
        this.cy = cy;
        this.cy.add(this.elements);

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
  background-color: azure;
  border: 1px solid black;
}

</style>