<template>
  <div class="site-shell" :lang="locale">
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-name" :href="homePath">Kehan Pang</a>

        <div class="header-actions">
          <nav class="profile-nav" :aria-label="copy.navLabel">
            <a :href="cvLink" target="_blank" rel="noopener noreferrer">CV</a>
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a :href="links.scholar" target="_blank" rel="noopener noreferrer">
              <span class="scholar-long">Google Scholar</span><span class="scholar-short">Scholar</span>
            </a>
          </nav>
          <nav class="language-switch" :aria-label="copy.languageLabel">
            <a
              v-for="language in languages"
              :key="language.code"
              :href="language.path"
              :class="{ active: locale === language.code }"
              :aria-current="locale === language.code ? 'page' : null"
            >{{ language.label }}</a>
          </nav>
          <button
            class="theme-toggle"
            type="button"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            @click="toggleTheme"
          ><span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span></button>
        </div>
      </div>
    </header>

    <main class="not-found">
      <img
        class="not-found-gif"
        src="/nina-iseri-girls-band-cry.gif"
        alt="A rebellious band girl — a quiet Girls Band Cry easter egg"
        width="238"
        height="244"
      >
      <h1>404</h1>
      <h2>Wrong stage.</h2>
      <a class="not-found-home" :href="homePath">Back to homepage</a>
    </main>
  </div>
</template>

<script>
import { content, languages, links } from '../data/content'

export default {
  name: 'NotFound',
  data () {
    return {
      locale: 'en',
      theme: 'light'
    }
  },
  computed: {
    copy () {
      return content[this.locale] || content.en
    },
    languages () {
      return languages
    },
    links () {
      return links
    },
    homePath () {
      return this.locale === 'en' ? '/' : `/${this.locale}/`
    },
    cvLink () {
      return this.locale === 'zh' ? links.cvZh : links.cvEn
    },
    themeToggleLabel () {
      return this.theme === 'dark' ? this.copy.themeToLight : this.copy.themeToDark
    }
  },
  mounted () {
    if (window.location.pathname.startsWith('/zh/')) this.locale = 'zh'
    if (window.location.pathname.startsWith('/ja/')) this.locale = 'ja'
    this.theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    this.updateThemeColor()
  },
  methods: {
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', this.theme)
      document.documentElement.style.colorScheme = this.theme
      window.localStorage.setItem('theme', this.theme)
      this.updateThemeColor()
    },
    updateThemeColor () {
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', this.theme === 'dark' ? '#181a1e' : '#f1f2f3')
    }
  }
}
</script>

<style src="../styles/theme.css"></style>
