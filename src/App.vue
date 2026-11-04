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

<style>
/* Colours per theme. Dark keeps the original look; light follows the
   recent project sites (Ballpark, K4): paper, ink, oxblood, Palatino. */
:root {
  --serif: "Palatino", "Palatino Linotype", "Book Antiqua", "URW Palladio L", Georgia, serif;
  --page-bg: #333;
  --graph-bg: #222;
  --panel-bg: #333;
  --banner-bg: #310f50;
  --contact-bg: #401567;
  --showcase-bg: #280e41;
  --showcase-frame: #333;
  --showcase-glow: 0px 0px 300px #f63232;
  --showcase-border: 1px solid #f63232;
  --footer-bg: #222;
  --hero-glow: 0px 0px 10px blueviolet;
  --rule: transparent;
  --ink: #fff;
  --muted: rgba(255, 255, 255, 0.7);
  --hero-image-filter: none;
  --hero-image-opacity: 1;
}

[data-theme="light"] {
  --paper: #fffff8;
  --wash: #fbf8ea;
  --page-bg: var(--paper);
  --graph-bg: var(--paper);
  --panel-bg: var(--wash);
  --banner-bg: transparent;
  --contact-bg: var(--wash);
  --showcase-bg: var(--paper);
  --showcase-frame: var(--wash);
  --showcase-glow: none;
  --showcase-border: 1px solid #d9d5c3;
  --footer-bg: var(--paper);
  --hero-glow: none;
  --rule: #d9d5c3;
  --ink: #111111;
  --muted: #6b6a60;
  --accent: #8c2f1f;
  /* The graph pictures are transparent with dark lines: they read on paper as
     they are; the hero one is faded so the headline stays in front. */
  --hero-image-filter: none;
  --hero-image-opacity: 0.6;
}

[data-theme="light"] body,
[data-theme="light"] .theme--light.v-application {
  background: var(--paper);
  color: var(--ink);
}

/* Palatino everywhere in light mode, including Vuetify's type classes. */
[data-theme="light"] .v-application,
[data-theme="light"] .v-application [class*="display-"],
[data-theme="light"] .v-application [class*="text-"],
[data-theme="light"] .v-application .headline,
[data-theme="light"] .v-application .title,
[data-theme="light"] .v-application .v-card__title,
[data-theme="light"] .v-application .v-btn,
[data-theme="light"] .v-application input,
[data-theme="light"] .v-application .v-label,
[data-theme="light"] .v-application .v-select__selection,
[data-theme="light"] .v-application .v-list-item__title,
[data-theme="light"] .v-application .v-messages {
  font-family: var(--serif) !important;
}

[data-theme="light"] .v-application a {
  color: var(--accent);
}

/* Flat paper surfaces with hairline rules instead of shadows. */
[data-theme="light"] .theme--light.v-card,
[data-theme="light"] .theme--light.v-sheet.v-card {
  background-color: var(--paper);
  border: 1px solid var(--rule);
  box-shadow: none !important;
}

[data-theme="light"] .theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: var(--paper);
  border-bottom: 1px solid var(--rule);
  box-shadow: none !important;
}

[data-theme="light"] .theme--light.v-btn {
  letter-spacing: 0.09em;
}

[data-theme="light"] .theme--light.v-btn.v-btn--has-bg:not(.primary) {
  background-color: var(--paper);
  border: 1px solid var(--rule);
  box-shadow: none !important;
}

[data-theme="light"] .theme--light.v-btn.primary {
  box-shadow: none !important;
}

[data-theme="light"] .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: var(--paper);
  border: 1px solid #b9b6a6;
  box-shadow: none !important;
}
</style>
