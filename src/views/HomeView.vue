<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Transactions</h1>
        <li v-for="item in transactions">
          {{ item }}
        </li>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import API from "@/models/API";

  export default Vue.extend({
    name: 'Home',
    components: {
    },
    data() {
      return {
        transactions: []
      }
    },

    async created() {
      this.transactions = await API.getTransactions()
    }
  })
</script>
