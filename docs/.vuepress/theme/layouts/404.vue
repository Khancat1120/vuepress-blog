<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-name" href="/">Kehan Pang</a>
        <div class="header-actions">
          <nav class="profile-nav" aria-label="Profile links">
            <a href="/kehan-pang-cv.pdf" target="_blank" rel="noopener">CV</a>
            <a href="https://github.com/KehanPang" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com/citations?user=b3XVG_oAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          </nav>
          <nav class="language-switch" aria-label="Language">
            <a href="/" :class="{ active: locale === 'en' }" :aria-current="locale === 'en' ? 'page' : null">EN</a>
            <a href="/zh/" :class="{ active: locale === 'zh' }" :aria-current="locale === 'zh' ? 'page' : null" lang="zh-CN">中文</a>
            <a href="/ja/" :class="{ active: locale === 'ja' }" :aria-current="locale === 'ja' ? 'page' : null" lang="ja-JP">日本語</a>
          </nav>
        </div>
      </div>
    </header>

    <main class="not-found">
      <svg
        class="not-found-illustration"
        viewBox="0 0 260 230"
        role="img"
        aria-labelledby="rebel-title rebel-description"
      >
        <title id="rebel-title">A rebellious little band girl</title>
        <desc id="rebel-description">An original line drawing of a small, spiky-haired musician making a cheeky rude gesture.</desc>

        <path d="M35 198c8-34 35-49 67-49s60 15 69 49" fill="#f7f8f9" stroke="#20262e" stroke-width="3" stroke-linejoin="round"/>
        <path d="M69 157l29 38 28-38" fill="none" stroke="#704653" stroke-width="4"/>
        <path d="M86 151l12 13 13-13" fill="#fff" stroke="#20262e" stroke-width="3" stroke-linejoin="round"/>

        <path d="M51 85L39 75l18-6-8-17 20 2 2-22 18 12 12-21 12 20 18-14 4 23 22-3-9 20 17 10-15 13 7 19-23-2-9 20-18-10-17 14-8-21-22 3 7-21-17-9z" fill="#e9ecef" stroke="#20262e" stroke-width="3" stroke-linejoin="round"/>
        <ellipse cx="101" cy="94" rx="44" ry="48" fill="#fffaf7" stroke="#20262e" stroke-width="3"/>
        <path d="M59 84c11-30 65-43 84-7-20 2-37-5-47-17-7 15-18 24-37 24z" fill="#dfe3e7" stroke="#20262e" stroke-width="3" stroke-linejoin="round"/>
        <path d="M77 95l10-2M115 93l10 2" stroke="#20262e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="83" cy="99" r="2.5" fill="#20262e"/>
        <circle cx="120" cy="99" r="2.5" fill="#20262e"/>
        <path d="M95 116c5 3 10 3 15 0" fill="none" stroke="#a25b52" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M68 80l-10-4" stroke="#557d98" stroke-width="4" stroke-linecap="round"/>
        <path d="M73 70l-9-7" stroke="#704653" stroke-width="4" stroke-linecap="round"/>
        <path d="M80 62l-5-9" stroke="#a25b52" stroke-width="4" stroke-linecap="round"/>

        <path d="M151 184c17-10 27-23 32-38" fill="none" stroke="#20262e" stroke-width="14" stroke-linecap="round"/>
        <path d="M178 151c-1-14 1-27 7-36l8 5 8-7 8 8 10-4 6 16-5 25c-2 11-10 18-20 18-11 0-19-7-22-25z" fill="#fffaf7" stroke="#20262e" stroke-width="3" stroke-linejoin="round"/>
        <rect x="193" y="48" width="16" height="78" rx="8" fill="#fffaf7" stroke="#20262e" stroke-width="3"/>
        <path d="M183 123c4-8 11-8 15-1l3 14M206 125c4-8 11-7 13 1l-1 13M178 132c-4-5-10-2-9 5l5 12" fill="none" stroke="#20262e" stroke-width="3" stroke-linecap="round"/>
        <path d="M196 73h10" stroke="#e3c8bd" stroke-width="2"/>

        <path d="M40 207h180" stroke="#dfe3e7" stroke-width="2"/>
        <circle cx="116" cy="207" r="3" fill="#557d98"/>
        <circle cx="130" cy="207" r="3" fill="#704653"/>
        <circle cx="144" cy="207" r="3" fill="#a25b52"/>
      </svg>

      <h1>404</h1>
      <h2>{{ labels[locale].heading }}</h2>
      <p>{{ labels[locale].message }}</p>
      <a class="not-found-home" :href="homePath">{{ labels[locale].back }}</a>
    </main>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      locale: 'en',
      labels: {
        en: { heading: 'Wrong stage.', message: 'Nothing here.', back: 'Back to homepage' },
        zh: { heading: '走错舞台了。', message: '这里没有内容。', back: '返回主页' },
        ja: { heading: 'ステージが違います。', message: 'ここには何もありません。', back: 'ホームに戻る' }
      }
    }
  },
  computed: {
    homePath () {
      return this.locale === 'en' ? '/' : `/${this.locale}/`
    }
  },
  mounted () {
    if (window.location.pathname.startsWith('/zh/')) this.locale = 'zh'
    if (window.location.pathname.startsWith('/ja/')) this.locale = 'ja'
  }
}
</script>

<style src="../styles/theme.css"></style>
