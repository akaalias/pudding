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
      {{ transactionsNetwork }}
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
        transactionsNetwork: []
      }
    },
    methods: {
      async search() {
        // `this` inside methods point to the Vue instance
        this.transactionsNetwork = await GraphDataProvider.getTransactionsNetworkForAccount("0x9aa99c23f67c81701c772b106b4f83f6e858dd2e");
      }
    },
    async created() {
      // this.transactionsNetwork = await GraphDataProvider.getTransactionsNetworkForAccount("0x9aa99c23f67c81701c772b106b4f83f6e858dd2e");
    }
  })
</script>
