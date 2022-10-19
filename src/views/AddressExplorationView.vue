<template>
  <v-app>
    <v-progress-linear
        indeterminate
        color="purple darken-2"
        v-if="searching"
        class="searchingProgressIndicator"
    ></v-progress-linear>
    <v-app-bar
        app
        dark
        fluid
    >
      <v-toolbar-title>
        <v-btn v-bind:to="'/'">
          <v-icon>mdi-home</v-icon> &nbsp;
          Pudding
        </v-btn>
      </v-toolbar-title>
      <v-text-field
          id="address-field"
          v-model="address"
          hint="Enter an Ethereum address to explore"
          v-on:keyup.enter="search"
      >
      </v-text-field>
    </v-app-bar>
    <v-main>
      <v-container fluid id="content-container">
        <v-row>
          <v-col cols="12">
            <div id="cyto" ref="cyto"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GraphDataProvider from "@/models/GraphDataProvider"
  import Constants from "@/models/Constants"
  import API from "@/models/API"
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';

  cytoscape.use(cola)

  export default Vue.extend({
    name: 'AddressExploration',
    components: {
    },
    data() {
      return {
        searching: false,
        address: '0x9583268553de82effe4ef63e01980aabd7cb5e27',
        elements: [],
        searchedAddresses: [],
        api: new API(),
      }
    },
    methods: {
      async search() {
        if(this.address.length == 42) {
          this.address = this.address.toLowerCase()
          this.searching = true
          this.elements = []
          this.searchedAddresses.push(this.address)

          // Get Elements
          this.elements = await this.graphDataProvider.getAddressNetwork(this.address)

          // Set Elements
          this.cy.add(this.elements)
          for(var searchedAddress of this.searchedAddresses) {
            this.cy.$('#' + searchedAddress).removeClass('current-target')
            this.cy.$('#' + searchedAddress).addClass('target')
          }
          this.cy.$('#' + this.address).addClass('current-target')

          if(this.searchedAddresses.length == 1) {
            this.cy.layout(Constants.coseLayout).run();
            this.cy.fit()
          } else {
            this.cy.layout(Constants.coseLayout).run();
          }
          this.cy.zoom({
            position: this.cy.getElementById(this.address).position()
          });


          // Indicate finished
          this.searching = false
        }
      },
      setupCyGraph() {
        let cy = cytoscape({
          container: this.$refs.cyto,
          elements: [],
          style: Constants.ExploreAddressCyStyle
        })

        this.cy = cy

        this.cy.on('tap', 'node', function(e){
          var sel = e.target;
          this.address = sel.id()
          this.search()
        }.bind(this))

        this.cy.on('mouseover', 'node', function(e){
          var sel = e.target;
          sel.addClass('show-label')
        }.bind(this))

        this.cy.on('mouseout', 'node', function(e){
          var sel = e.target;
          sel.removeClass('show-label')
        }.bind(this))

      },
    },
    async mounted() {
      this.api = new API()
      this.graphDataProvider = new GraphDataProvider(this.api)
      this.setupCyGraph()
    },
    computed: {
    }
  })
</script>

<style>

#address-field {
  margin-top: 10px;
}

#content-container {
  background-color: #222;
}

#cyto {
  width: 100%;
  height: 900px;
  display: block;
  background-color: #222;
}

.searchingProgressIndicator {
  width: 100%;
  height: 5px;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
}

</style>