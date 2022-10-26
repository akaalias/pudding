<template>
  <v-app class="landingpage-app">

    <div id="new-banner">
        Hello and welcome to Pudding Research!
    </div>

    <v-container fluid id="landingpage-container">
      <v-row>
        <v-col cols="md-6">
          <h1 class="display-3"><span class="highlight">Follow the money, connect the dots, find the story.</span></h1>
          <br>
          <h2 class="display-2"><span class="highlight-2">
            Putting the FUN back into forensic analysis and reconnaissance of crypto-currency token ecosystems</span>
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid id="explore-tokens-container">
      <v-row>
        <v-col cols="md-4" v-for="token in tokens">
          <v-card elevation="4" >
            <v-img
                height="300px"
                v-bind:src="token.imageFileName"
                v-if="token.imageFileName"
            >
              <v-card-title>
                {{token.name}}
              </v-card-title>
            </v-img>
            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                    align="center"
                    justify="end"
                >
                  <v-btn
                      elevation="1"
                      light
                      small
                      v-bind:to="token.deepLink"
                  >
                    Explore {{token.name}}
                    <v-icon
                        right
                        dark
                    >
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="md-4">
          <v-card elevation="4" >
            <v-img
                height="300px"
                src="https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png">
              <v-card-title>
                Missing a Token?
              </v-card-title>
            </v-img>
            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                    align="center"
                    justify="end"
                >
                  <v-btn class="cta"
                         href="https://calendly.com/alexis-rondeau"
                         color="primary"
                         elevation="5"
                         small
                  >
                    Request a token!
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid id="explore-addresses-container">
      <v-row>
        <v-col cols="md-12 centered">
          <h2><span class="highlight">NEW! Explore the Transaction Networks of Individual Ethereum Addresses</span></h2>
          <v-btn
              elevation="1"
              light
              large
              to="/explore"
          >
            Explore Ethereum Addresses<sup class="sup"><i>Beta</i></sup>
            <v-icon
                right
                dark
            >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid light id="contact-container" class="contact">
      <v-row>
        <v-col cols="md-2">
        </v-col>
        <v-col cols="md-8">
          <h2 class="centered">Got questions? Let's talk.</h2>
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
        <v-col cols="md-2">
        </v-col>
      </v-row>
    </v-container>
    <footer>
      <h2>Pudding (because <i>that's</i> where the proof is)</h2>
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
  background-color: #310f50;
  padding: 5px;
  width: 100%;
  text-align: center;
}

h1.display-3 {
  margin-top: 10%;
  line-height: 120%;
  transform: rotate(-5deg);
}

h2.display-2 {
  font-size: 36px !important;
  line-height: 120%;
  transform: rotate(-5deg);
}

.highlight {
  padding: 5px;
  background-color: blueviolet;
}

.highlight-2 {
  background-color: #571c8d;
}

.landingpage-app {
  background-color: #333;
}
.centered {
  text-align: center;
}

#landingpage-container {
  min-height: 600px;
  background-position: bottom;
  background-size: 100%;
  background-image: url('https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png');
}

.headline {
  margin-top: 50px;
  margin-bottom: 30px;
}

#contact-container {
  padding-top: 50px;
  background-color: #401567;
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
  padding-top: 50px;
  font-size: 10pt;
  text-align: center;
}
footer:hover {
  opacity: 1;
}

.sup {
  color: #a265da;
}

#explore-addresses-container {
  margin-top: 100px;
  margin-bottom: 100px;
  padding-top: 200px;
  min-height: 600px;
  background-size: 100%;
  background-image: url('https://raw.githubusercontent.com/akaalias/pudding/main/public/img/explore-address.png');
}

#explore-addresses-container h2 {
  padding: 30px;
  transform: rotate(-5deg);

}
</style>
