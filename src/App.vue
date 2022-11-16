<template>
  <router-view/>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

document.title = "Pudding Research";

export default Vue.extend({
  name: 'App',
  metaInfo: {
    title: 'Pudding Research – Find Better Questions Sooner With Forensic Crypto Ecosystem Reconnaissance',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'og:title', content: 'Pudding Research' },
      { name: 'og:description', content: 'Find Better Questions Sooner With Forensic Crypto Ecosystem Reconnaissance'},
      { name: 'og:url', content: 'https://getpudding.app/' },
      { name: 'og:image', content: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png' },
      { name: 'og:type', content: 'Website' },
      { name: 'og:site_name', content: 'Pudding Research'},
      { name: 'twitter:card', content: 'Pudding Research – Find Better Questions Sooner With Forensic Crypto Ecosystem Reconnaissance'},
      { name: 'twitter:image', content: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png'},
      { name: 'twitter:title', content: 'Pudding - Pudding Research – Find Better Questions Sooner With Forensic Crypto Ecosystem Reconnaissance'},
      { name: 'author', content: 'Alexis Rondeau' },
    ]
  },
  data: () => ({
  }),
});
</script>
