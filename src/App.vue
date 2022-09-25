<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>Pudding</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCytoscape from 'vue-cytoscape';

Vue.use(VueCytoscape);

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
