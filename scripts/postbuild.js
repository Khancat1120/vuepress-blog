const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '../docs/.vuepress/dist')
const alternates = [
  ['en', 'https://kehanpang.github.io/'],
  ['zh-CN', 'https://kehanpang.github.io/zh/'],
  ['ja', 'https://kehanpang.github.io/ja/'],
  ['x-default', 'https://kehanpang.github.io/']
]

const pages = [
  ['index.html', 'https://kehanpang.github.io/'],
  ['zh/index.html', 'https://kehanpang.github.io/zh/'],
  ['ja/index.html', 'https://kehanpang.github.io/ja/']
]

for (const [relativePath, canonical] of pages) {
  const filename = path.join(dist, relativePath)
  let html = fs.readFileSync(filename, 'utf8')
  const links = [
    `<link rel="canonical" href="${canonical}">`,
    ...alternates.map(([language, href]) => `<link rel="alternate" hreflang="${language}" href="${href}">`)
  ].join('')
  html = html.replace('</head>', `${links}</head>`)
  fs.writeFileSync(filename, html)
}

const notFound = path.join(dist, '404.html')
let notFoundHtml = fs.readFileSync(notFound, 'utf8')
notFoundHtml = notFoundHtml.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>')
fs.writeFileSync(notFound, notFoundHtml)

console.log('Canonical, alternate-language, and 404 indexing metadata added.')
