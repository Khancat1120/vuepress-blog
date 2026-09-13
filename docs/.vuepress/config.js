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
      description: 'Academic homepage of Kehan Pang, a Ph.D. student at Beihang University working on graph data mining and large language models.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '庞可涵 | 北京航空航天大学博士研究生',
      description: '庞可涵的学术主页：北京航空航天大学计算机学院博士研究生，研究方向为图数据挖掘与大语言模型。'
    },
    '/ja/': {
      lang: 'ja-JP',
      title: 'Kehan Pang | 北京航空航天大学 博士課程',
      description: '北京航空航天大学でグラフデータマイニングと大規模言語モデルを研究する Kehan Pang の研究者ホームページです。'
    }
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    ['meta', { name: 'theme-color', content: '#0b1930' }],
    ['meta', { name: 'author', content: 'Kehan Pang' }],
    ['meta', { property: 'og:type', content: 'profile' }],
    ['meta', { property: 'og:image', content: 'https://kehanpang.github.io/portrait.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  plugins: [],
  shouldPrefetch: () => false
}
