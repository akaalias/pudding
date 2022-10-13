<template>
  <v-app class="landingpage-app">
    <v-container fluid id="landingpage-container">
      <v-row
          align="center"
          justify="space-around"
      >
        <v-col cols="12" class="centered">
          <h1 class="display-4">Get from <i>hairball</i> to <u>story</u> faster.</h1>

          <!--
          <h1 class="display-4">Find the Story In the Hairball Faster</h1>
          -->
          <h2 class="display-1">
            Pudding is Ecosystem Reconnaissance For Forensic Crypto Researchers
          </h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid id="explore-container">

      <v-row>
        <v-col cols="3" v-for="token in tokens">
          <v-card
              elevation="2"
          >
            <v-card-title>{{token.name}}</v-card-title>

            <v-card-actions>
              <v-btn
                  elevation="4"
                  light
                  v-bind:to="token.address"
              >
                Explore {{token.name}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Landingpage',
  components: {
  },
  data() {
    return {
      tokens: [{name: 'WETH', address: '/home?address=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
        {name: 'Tether USD', address: '/home?address=0xdac17f958d2ee523a2206206994597c13d831ec7'},
        {name: 'USD Coin', address: '/home?address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
        {name: 'Dai', address: '/home?address=0x6b175474e89094c44da98b954eedeac495271d0f'},
        {name: 'Curve DAO Token', address: '/home?address=0xd533a949740bb3306d119cc777fa900ba034cd52'},
        {name: 'Shiba Inu', address: '/home?address=0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'},
        {name: 'Wrapped Bitcoin', address: '/home?address=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'},
        {name: 'Chainlink', address: '/home?address=0x514910771af9ca656af840dff83e8264ecf986ca'},
        {name: 'HEX', address: '/home?address=0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'},
        {name: 'Matic Network', address: '/home?address=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'},
        {name: 'Hedron', address: '/home?address=0x3819f64f282bf135d62168c1e513280daf905e06'},
        {name: 'Binance USD', address: '/home?address=0x4fabb145d64652a948d72533023f6e7a623c7c53'},
        {name: 'SAND', address: '/home?address=0x3845badade8e6dff049820680d1f14bd3903a5d0'},
        {name: 'ApeCoin', address: '/home?address=0x4d224452801aced8b2f0aebe155379bb5d594381'},
        {name: 'Quant', address: '/home?address=0x4a220e6096b25eadb88358cb44068a3248254675'},
        {name: 'aave-sr.xyz', address: '/home?address=0x5d80a8d8cb80696073e82407968600a37e1dd780'},
        {name: 'Convex Finance', address: '/home?address=0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'},
        {name: 'Gala', address: '/home?address=0x15d4c048f83bd7e37d49ea4c83a07267ec4203da'},
        {name: 'Uniswap', address: '/home?address=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'},
        {name: 'New World Order', address: '/home?address=0x00c2999c8b2adf4abc835cc63209533973718eb1'}]
    }
  }})

</script>

<style scoped>
.display-4 {

}
.display-4, .display-1 {
  margin-bottom: 32pt;
}
.landingpage-app {
  background-color: #333;
}
.centered {
  text-align: center;
}

#landingpage-container {
  height: 400px;
}
</style>
