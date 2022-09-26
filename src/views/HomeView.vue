<template>
  <v-app>
    <v-app-bar
        app
        dark
        fluid
    >
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
                      label=""
                      clearable
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
    </v-app-bar>
    <v-main>
      <v-container fluid id="content-container">
        <v-row>
          <v-col
              cols="12"
          >
            <div class="status">
              {{ apiResultCount }} Transactions
            </div>

            <cytoscape
                ref="cy"
                :config="config"
                :afterCreated="afterCreated"
                v-if="elements.length !== 0"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import cola from "cytoscape-cola";
  import GraphDataProvider from "@/models/GraphDataProvider"
  import Constants from "@/models/Constants"
  import API from "@/models/API"

  export default Vue.extend({
    name: 'Home',
    components: {
    },
    data() {
      return {
        valid: false,
        query: '0xee599d36b41759d0343d997657e51665f973e944',
        queryRules: [
          v => !!v || 'Query is required',
          v => v.length == 42 || 'Query must be 42 characters',
        ],
        elements: [],
        config: Constants.cyConfig,
        apiResultCount: 0,
        api: new API()
      }
    },
    methods: {
      async search() {
        if(this.query.length == 42) {
          this.elements = []
          this.elements = await this.graphDataProvider.getTransactionsNetworkForAccount(this.query);
          this.playSound('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')
        }
      },
      playSound (sound) {
        if(sound) {
          var audio = new Audio(sound);
          audio.play();
        }
      },
      async preConfig(cytoscape) {
      },
      async afterCreated(cy) {
        this.cy = cy;
        this.cy.add(this.elements);

        this.cy.on(
            "tap",
            "node",
            function (evt) {
              let node = evt.target;
              this.query = node.data().id;
              this.search();
            }.bind(this)
        );

        this.cy.on('mouseover', 'node', function(e){
            var sel = e.target;
            this.cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
            sel.addClass('highlight').outgoers().addClass('highlight');
          }.bind(this)
        );

        this.cy.on('mouseout', 'node', function(e){
          var sel = e.target;
          this.cy.elements().removeClass('semitransp');
          sel.removeClass('highlight').outgoers().removeClass('highlight');
          }.bind(this)
        );

        this.cy.layout(Constants.coseLayout).run();
        this.cy.resize();
        this.cy.fit();
      }
    },
    mounted() {
      this.api = new API()
      this.graphDataProvider = new GraphDataProvider(this.api)
    },
    watch: {
      elements: {
        handler(newVal, oldVal) {
          console.log("Elements changed!")
        },
        deep: true,
        immediate: true
      },
      api: {
        handler(newVal, oldVal){  // here having access to the new and old value
          this.apiResultCount = newVal.totalTransactionsFetchedCount
        },
        deep: true,
        immediate: true //  Also very important the immediate in case you need it, the callback will be called immediately after the start of the observation
      }
    }
  })
</script>

<style>

.v-toolbar {
  padding-top: 30px;
  padding-bottom: 80px;
}

#cytoscape-div {
  height: 900px;
}

#content-container {
  margin-top: 40px;
}

</style>