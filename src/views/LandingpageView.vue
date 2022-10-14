<template>
  <v-app class="landingpage-app">
    <v-container fluid id="landingpage-container">
      <v-row
          align="center"
          justify="center"
      >
        <v-col cols="12" class="centered">
          <h1 class="display-4">Find the story faster.</h1>
          <h2 class="display-1">
            Pudding is Ecosystem Reconnaissance For Forensic Crypto Researchers
          </h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid id="explore-container">
      <h2 class="headline centered">Explore Ethererum Tokens</h2>
      <v-row>
        <v-col cols="3" v-for="token in tokens">
          <v-card
              elevation="2"
          >
            <v-img
                height="200px"
                v-bind:src="token.imageFileName"
                v-if="token.imageFileName"
            >
              <v-card-title>
                {{token.name}}
              </v-card-title>
            </v-img>

            <v-card-title v-if="!token.imageFileName">
              {{token.name}}
            </v-card-title>

            <v-card-actions>
              <v-btn
                  elevation="4"
                  dark
                  small
                  v-bind:to="token.deepLink"
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
import Constants from "@/models/Constants"

export default Vue.extend({

  name: 'Landingpage',
  components: {
  },
  data() {
    return {
      tokens: Constants.AvailableTokens
    }
  }})

</script>

<style scoped>
.display-4 {

}
.display-4 {
  margin-top: 10%;
  text-shadow: 0px 0px 15px black ;
}

.display-1 {
  margin-top: 32pt;
  text-shadow: 0px 0px 15px black ;
}
.landingpage-app {
  background-color: #333;
}
.centered {
  text-align: center;
}

#landingpage-container {
  height: 700px;
  background-image: url('https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png');
}

.headline {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
