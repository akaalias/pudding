<template>
  <router-view/>
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
