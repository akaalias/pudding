import Vue from 'vue'

// Light or dark. A choice made with the toggle is remembered; until then the
// page follows the system setting. `?theme=light|dark` in the URL wins (handy
// for links and screenshots) without being remembered.
export type Theme = 'light' | 'dark'

const KEY = 'pudding-theme'

function savedTheme(): Theme | null {
    try {
        const v = localStorage.getItem(KEY)
        return v === 'light' || v === 'dark' ? v : null
    } catch (e) {
        return null
    }
}

function urlTheme(): Theme | null {
    const m = window.location.href.match(/[?&]theme=(light|dark)\b/)
    return m ? (m[1] as Theme) : null
}

const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null

function systemTheme(): Theme {
    return darkQuery && darkQuery.matches ? 'dark' : 'light'
}

export const themeState = Vue.observable({
    theme: (urlTheme() || savedTheme() || systemTheme()) as Theme
})

let vuetifyInstance: any = null

function apply() {
    document.documentElement.setAttribute('data-theme', themeState.theme)
    if (vuetifyInstance) {
        vuetifyInstance.framework.theme.dark = themeState.theme === 'dark'
    }
}

export function setTheme(theme: Theme) {
    themeState.theme = theme
    try {
        localStorage.setItem(KEY, theme)
    } catch (e) {
        // private window or blocked storage: the switch still works for this visit
    }
    apply()
}

export function toggleTheme() {
    setTheme(themeState.theme === 'dark' ? 'light' : 'dark')
}

export function installTheme(vuetify: any) {
    vuetifyInstance = vuetify
    apply()
    if (darkQuery) {
        const follow = () => {
            if (!savedTheme() && !urlTheme()) {
                themeState.theme = systemTheme()
                apply()
            }
        }
        if (darkQuery.addEventListener) {
            darkQuery.addEventListener('change', follow)
        } else if ((darkQuery as any).addListener) {
            (darkQuery as any).addListener(follow)
        }
    }
}
