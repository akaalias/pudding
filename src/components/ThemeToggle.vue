<template>
  <v-btn
      icon
      small
      class="theme-toggle"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
  >
    <v-icon small>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { themeState, toggleTheme } from '@/theme'

export default Vue.extend({
  name: 'ThemeToggle',
  computed: {
    isDark(): boolean {
      return themeState.theme === 'dark'
    }
  },
  methods: {
    toggle() {
      toggleTheme()
    }
  }
})
</script>
