const path = require('path')

module.exports = {
  base: '/',
  dest: './docs/.vuepress/dist',
  evergreen: true,
  theme: path.resolve(__dirname, './theme'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Kehan Pang | Ph.D. Student at Beihang University',
      description: 'Academic homepage of Kehan Pang, a Ph.D. student at Beihang University working on graph data mining, graph data quality, and graph knowledge reasoning.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '庞可涵 | 北京航空航天大学博士研究生',
      description: '庞可涵的学术主页：北京航空航天大学计算机学院博士研究生，研究方向为图数据挖掘、图数据质量与图知识推理。'
    },
    '/ja/': {
      lang: 'ja-JP',
      title: 'Kehan Pang | 北京航空航天大学 博士課程',
      description: '北京航空航天大学でグラフデータマイニング、グラフデータ品質、グラフ知識推論を研究する Kehan Pang の研究者ホームページです。'
    }
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    ['script', {}, "(function(){try{var saved=localStorage.getItem('theme');var theme=saved==='light'||saved==='dark'?saved:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',theme);document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.setAttribute('data-theme','light');}})();"],
    ['meta', { id: 'theme-color', name: 'theme-color', content: '#f2f3f4' }],
    ['meta', { name: 'author', content: 'Kehan Pang' }],
    ['meta', { property: 'og:type', content: 'profile' }],
    ['meta', { property: 'og:image', content: 'https://kehanpang.github.io/portrait.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-kehan-image-v4.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-kehan-image-v4-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-kehan-image-v4-16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-kehan-image-v4-192.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-v4.png' }]
  ],
  plugins: [],
  shouldPrefetch: () => false
}
