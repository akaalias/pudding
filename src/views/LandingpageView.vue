<template>
  <v-app class="landingpage-app">
    <div id="new-banner">
      New! For Crypto Researchers
    </div>
    <v-container fluid id="landingpage-container">
      <v-row>
        <v-col cols="8">
          <h1 class="display-4"><span class="highlight">Find better questions.</span></h1>
          <br>
          <h2 class="display-2"><span class="highlight">Follow the money with forensic crypto ecosystem reconnaissance</span></h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid id="explore-container">
      <v-row>
        <v-col cols="4" v-for="token in tokens">
          <v-card
              elevation="2"
          >
            <v-img
                height="350px"
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

        <v-col cols="4">
          <v-card
              elevation="2"
          >
            <v-img
                height="350px"
           >
              <v-card-title>
                Missing Something?
              </v-card-title>
            </v-img>

            <v-card-actions>
              <v-btn class="cta"
                     href="https://calendly.com/alexis-rondeau"
                     color="primary"
                     elevation="5"
                     small
              >
                Request a token!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <v-container fluid id="contact-container" class="contact">
      <v-row>
        <v-col cols="12">
          <h1 class="">Got questions? Let's talk.</h1>
          <p>
            <img src="https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/img/alexis-portrait.jpg"
                 class="portrait" />
          </p>
          <p>
            Oh, hi there!
          </p>
          <p>
            Alexis here, great to meet you.
          </p>

          <p>
            If you want to add a new token to the list, learn more about Pudding, how to integrate ecosystem reconnaissance into your existing auditing
            and diligence workflow, or just chat in general: I want to hear from you!
          </p>
          <p>
            I've found <em>the best way by far</em> is to talk personally so I've opened up office hours this week.
          </p>
          <p>
            Click on the button below and book a time right away.
          </p>
          <p>
            <v-btn class="cta"
                   href="https://calendly.com/alexis-rondeau"
                   color="primary"
                   elevation="5"
            >
              Let's talk about your questions!
            </v-btn>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <footer>
      <h2>"Pudding", because <i>that's</i> where the proof is</h2>
      <br>
      <p>
        Copyright 2022 –
        Made with love by <a href="https://alexisrondeau.me" target="_blank">Alexis Rondeau</a> –
        <a href="https://github.com/akaalias/pudding" target="_blank">Open Source on Github</a>
      </p>
    </footer>
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
#new-banner {
  background-color: #222;
  padding: 5px;
  width: 100%;
  text-align: center;
}

h1 {
  margin-top: 10%;
}

h2 {
  font-size: 24px;
}

.highlight {
  background-color: blueviolet;
}

.landingpage-app {
  background-color: #333;
}
.centered {
  text-align: center;
}

#landingpage-container {
  height: 600px;
  background-position: bottom;
  background-size: 100%;
  background-image: url('https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png');
}

.headline {
  margin-top: 50px;
  margin-bottom: 30px;
}

.contact h1, .contact h1 {
  margin-top: 120px;
  font-size: 48pt;
  text-align: center;
}
.contact p, .contact p {
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 18pt;
  text-align: center;
}

.portrait {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  padding: 10px;
  background: #fff;
}

footer {
  background-color: #222;
  padding: 40px;
  margin-top: 50px;
  font-size: 10pt;
  text-align: center;
}
footer:hover {
  opacity: 1;
}
</style>
