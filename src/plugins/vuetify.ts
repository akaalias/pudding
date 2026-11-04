import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { themeState } from '@/theme';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: themeState.theme === 'dark',
        themes: {
            // Light follows the recent project sites (Ballpark, K4):
            // paper, ink, oxblood accent.
            light: {
                primary: '#8c2f1f',
                secondary: '#6b6a60',
                accent: '#8c2f1f',
                error: '#8c2f1f',
                info: '#6b6a60',
                success: '#3f6b3a',
                warning: '#8a6a1e',
            },
        },
    },
});
