<template>
  <v-app class="landingpage-app" mobile-breakpoint="800">
    <div id="new-banner">
        Hello and welcome to Pudding Research!
    </div>
    <section id="above-fold" ref="above-fold">
      <v-container fluid id="landingpage-container">
        <v-row>
          <v-col md="10"
                 offset-md="1">
            <h1 class="display-3">
              Have more fun with OSINT analysis of Ethereum ERC-20 ecosystems
            </h1>
            <h2 class="display-2">
              Connect the Dots, Follow the Money, Find the Story.
            </h2>
          </v-col>
        </v-row>
        <div id="search-container">
          <v-row>
            <v-col md="8"
                   offset-md="2">
              <v-autocomplete
                  label="Find a token you want to explore here"
                  v-model="selectedAddress"
                  :items="tokens"
                  item-text="name"
                  item-value="address"
                  @change="startSearch"
                  rounded
                  outlined
                  clearable
                  solo
              ></v-autocomplete>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>
    <v-container fluid id="explore-tokens-container">
      <h2>Explore the Ecosystems</h2>
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
                      v-bind:to="{ name: 'home', query: { address: token.address }}"
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
    <v-container fluid id="ballet-container">
      <h2 class="headline">
        <b>New!</b> Algorand Ballet: OSINT Background-Checks for Wallets and Assets
      </h2>
      <a href="https://alexisrondeau.me/algorand-ballet#main" target="_blank">
        <img src="https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/img/ballet-ui.png"/>
        <br>
        <br>
        <br>
        <p>
          <v-btn large light color="primary">
            Visit Algorand Ballet
          </v-btn>
        </p>
      </a>
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
      selectedAddress: "",
      tokens: Constants.AvailableTokens
    }
  },
  methods: {
    startSearch() {
      this.$router.push({name: 'home', query: {address: this.selectedAddress}})
    }
  },
  mounted() {
    let demo = this.$refs["above-fold"]
    let limited = Constants.AvailableTokens.slice(0, 30)
    const randomElement = limited[Math.floor(Math.random() * limited.length)];
    // const randomElement = limited[0]
    demo.style.backgroundImage = "url('" + randomElement.imageFileName + "')"
  }
}
)
</script>
<style scoped>
#new-banner {
  background-color: #310f50;
  padding: 5px;
  width: 100%;
  text-align: center;
}

h1.display-3 {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 40px;
  font-size: 58pt !important;
  line-height: 68pt;
  text-shadow: 0px 0px 10px blueviolet;
}

h2.display-2 {
  text-align: center;
  font-size: 36px !important;
  line-height: 125%;
  font-weight: normal;
  text-shadow: 0px 0px 10px blueviolet;
}

.landingpage-app {
  background-color: #333;
}
.centered {
  text-align: center;
}

#demo-container {
  min-height: 400px;
  background-size: 100%;
  background-position: center;
  background-image: url('https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Uniswap.png');
}
#landingpage-container {
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

#ballet-container {
  background-color: #280e41;
  padding: 20px;
  padding-bottom: 50px;
  text-align: center;
}

#ballet-container img {
  width: 80%;
  border-radius: 20px;
  box-shadow: 0px 0px 300px #f63232;
  border: 1px solid #f63232;
  padding: 20px;
  background-color: #333;
}

#ballet-container .headline {
  padding: 50px;
  color: #fff;
}

#above-fold {
  background-position: 50% 230px;
  background-size: 750px;
}

#search-container {
  padding-top: 200px;
  padding-bottom: 200px;
}

#explore-tokens-container h2 {
  padding-top: 50px;
  text-align: center;
  font-weight: lighter;
  font-size: 28pt;
  margin-bottom: 24pt;
}
</style>
