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
    title: 'Pudding Research – Find better questions sooner.',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'og:title', content: 'Pudding Research – Find better questions sooner.' },
      { name: 'og:description', content: 'Forensic Ecosystem Reconnaissance for Crypto Analysts'},
      { name: 'og:url', content: 'https://alexisrondeau.me/pudding/' },
      { name: 'og:image', content: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png' },
      { name: 'og:type', content: 'Website' },
      { name: 'og:site_name', content: 'Pudding Research – Find better questions sooner.'},
      { name: 'twitter:card', content: 'Forensic Ecosystem Reconnaissance for Crypto Analysts'},
      { name: 'twitter:image', content: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/demo.png'},
      { name: 'twitter:title', content: 'Pudding Research – Find better questions sooner.'},
      { name: 'author', content: 'Alexis Rondeau' },
    ]
  },
  data: () => ({
  }),
});
</script>
