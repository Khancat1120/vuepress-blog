const assert = require('assert')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const projectRoot = path.resolve(__dirname, '..')
const dist = path.join(projectRoot, 'docs/.vuepress/dist')

function walk (directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(filename) : [filename]
  })
}

function digest (filename) {
  return crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex')
}

function pdfPages (filename) {
  const info = execFileSync('pdfinfo', [filename], { encoding: 'utf8' })
  return Number(info.match(/^Pages:\s+(\d+)$/m)[1])
}

const files = walk(dist)
const relativeFiles = files.map(filename => path.relative(dist, filename).replace(/\\/g, '/'))
const htmlFiles = relativeFiles.filter(filename => filename.endsWith('.html')).sort()
assert.deepStrictEqual(htmlFiles, ['404.html', 'index.html', 'ja/index.html', 'zh/index.html'])

const expectedPages = {
  'index.html': {
    phrases: ['Kehan Pang', 'About Me', 'Research Interests', 'Publications', 'Contact', 'On this page', 'CCF-A Conference', 'CCF-A Journal'],
    cv: '/cv/kehan-pang-cv-en.pdf',
    advisor: 'Prof. Wenfei Fan (Foreign Member of CAS)'
  },
  'zh/index.html': {
    phrases: ['庞可涵', '关于我', '研究方向', '学术成果', '联系方式', '本页目录', 'CCF-A 类会议', 'CCF-A 类期刊', '樊文飞 院士'],
    cv: '/cv/kehan-pang-cv-zh.pdf',
    advisor: '樊文飞 院士'
  },
  'ja/index.html': {
    phrases: ['Kehan Pang', 'プロフィール', '研究分野', '研究業績', '連絡先', '目次', 'CCF-A 会議', 'CCF-A ジャーナル'],
    cv: '/cv/kehan-pang-cv-en.pdf',
    advisor: 'Wenfei Fan 教授（中国科学院外国人会員）'
  }
}

const interests = {
  'index.html': ['Graph Data Mining', 'Graph Data Quality', 'Graph Knowledge Reasoning', 'Large Language Models'],
  'zh/index.html': ['图数据挖掘', '图数据质量', '图知识推理', '大语言模型'],
  'ja/index.html': ['グラフデータマイニング', 'グラフデータ品質', 'グラフ知識推論', '大規模言語モデル']
}

for (const [filename, expected] of Object.entries(expectedPages)) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const phrase of expected.phrases) assert(html.includes(phrase), `${filename} is missing ${phrase}`)
  for (const link of [expected.cv, 'https://github.com/KehanPang', 'https://scholar.google.com/citations?user=b3XVG_oAAAAJ']) {
    assert(html.includes(link), `${filename} is missing ${link}`)
  }
  for (const languagePath of ['href="/"', 'href="/zh/"', 'href="/ja/"']) {
    assert(html.includes(languagePath), `${filename} is missing language link ${languagePath}`)
  }
  for (const advisorUrl of ['https://cs.pku.edu.cn/info/1008/2707.htm', 'https://scse.buaa.edu.cn/info/1388/10436.htm']) {
    assert(html.includes(`href="${advisorUrl}" target="_blank" rel="noopener noreferrer"`), `${filename} has an unsafe or missing advisor link`)
  }
  for (const interest of interests[filename]) assert(html.includes(interest), `${filename} is missing ${interest}`)
  const positions = interests[filename].map(interest => html.indexOf(interest))
  assert(positions.every((position, index) => index === 0 || position > positions[index - 1]), `${filename} has the wrong research-interest order`)
  assert(html.includes('href="mailto:pangkehan@buaa.edu.cn"'), `${filename} is missing the primary email`)
  assert(html.includes('href="mailto:k3hanpang@gmail.com"'), `${filename} is missing the alternative email`)
  assert(html.includes('class="page-toc"'), `${filename} is missing the page table of contents`)
  assert(html.includes('class="theme-toggle"'), `${filename} is missing the theme toggle`)
  assert(html.includes('rel="canonical"'), `${filename} is missing a canonical URL`)
  assert(html.includes('hreflang="'), `${filename} is missing alternate-language metadata`)
  assert(html.indexOf('id="contact"') > html.indexOf('id="honors"'), `${filename} does not place Contact last`)
  assert(html.includes('class="profile-introduction content-width"'), `${filename} is missing the compact profile introduction`)
  assert(!html.includes('Academic Homepage'), `${filename} still contains the old hero eyebrow`)
  assert(!html.includes('class="hero'), `${filename} still contains the old hero`)
  assert(!html.includes('section-index'), `${filename} still contains section numbers`)
  assert(!html.includes('数据中心'), `${filename} contains the incorrect translation of data-centric`)

  const occurrences = value => html.split(value).length - 1
  assert.strictEqual(occurrences(`href="${expected.cv}"`), 1, `${filename} repeats or misroutes the CV link`)
  assert.strictEqual(occurrences('href="https://github.com/KehanPang"'), 1, `${filename} repeats the GitHub link`)
  assert.strictEqual(occurrences('href="https://scholar.google.com/citations?user=b3XVG_oAAAAJ"'), 1, `${filename} repeats the Scholar link`)
  assert(!html.includes(expected.cv.includes('-en.pdf') ? '/cv/kehan-pang-cv-zh.pdf' : '/cv/kehan-pang-cv-en.pdf'), `${filename} contains the wrong locale CV`)
}

const notFound = fs.readFileSync(path.join(dist, '404.html'), 'utf8')
for (const phrase of ['Wrong stage.', 'Back to homepage', '/nina-iseri-girls-band-cry.gif', 'class="not-found-gif"', 'class="theme-toggle"']) {
  assert(notFound.includes(phrase), `404.html is missing ${phrase}`)
}
assert(!notFound.includes('<svg'), '404.html still contains the retired SVG illustration')
assert(!notFound.includes('not-found-illustration'), '404.html still contains the retired illustration class')

for (const legacyPath of ['jottings/', 'novels/', 'technology/', 'knowledge/', 'about/']) {
  assert(!relativeFiles.some(filename => filename.startsWith(legacyPath)), `legacy output remains: ${legacyPath}`)
}

const searchable = files
  .filter(filename => /\.(html|js|css|xml|txt)$/.test(filename))
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .join('\n')

for (const forbidden of ['127.0.0.1:3000', 'ClustrMaps', 'titlePv', 'Skill Tree', 'vuepress-plugin-cat', 'section-index', 'hero__actions', '数据中心', '/favicon.svg']) {
  assert(!searchable.includes(forbidden), `forbidden legacy string remains: ${forbidden}`)
}

const css = files
  .filter(filename => filename.endsWith('.css'))
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .join('\n')
for (const required of ['data-theme=dark', '--paper:#f5f6f7', '--paper:#181a1e', '.page-toc', 'position:sticky', 'scroll-margin-top', 'prefers-reduced-motion']) {
  assert(css.includes(required), `theme CSS is missing ${required}`)
}
for (const forbidden of ['@keyframes', 'animation:', 'backdrop-filter']) {
  assert(!css.includes(forbidden), `the site still contains ${forbidden}`)
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
for (const legacyPath of ['/jottings/', '/novels/', '/technology/', '/knowledge/', '/about/']) {
  assert(!sitemap.includes(legacyPath), `sitemap contains legacy route: ${legacyPath}`)
}

const englishCv = path.join(dist, 'cv/kehan-pang-cv-en.pdf')
const chineseCv = path.join(dist, 'cv/kehan-pang-cv-zh.pdf')
const aliasCv = path.join(dist, 'kehan-pang-cv.pdf')
for (const filename of [englishCv, chineseCv, aliasCv]) {
  assert.strictEqual(fs.readFileSync(filename).subarray(0, 5).toString(), '%PDF-', `${filename} is not a valid PDF`)
  assert.strictEqual(pdfPages(filename), 2, `${filename} is not a two-page PDF`)
}
assert.strictEqual(digest(englishCv), digest(aliasCv), 'the legacy CV alias differs from the English CV')
assert.strictEqual(digest(chineseCv), digest(path.resolve(projectRoot, '../庞可涵的个人简历-202608.pdf')), 'the published Chinese CV differs from its selected source')

const cvText = fs.readFileSync(path.join(projectRoot, 'cv/kehan-pang-cv.tex'), 'utf8')
for (const section of ['Education', 'Work Experience', 'Research Experience', 'Awards and Academic Service', 'Research and Technical Expertise', 'Publications', 'Manuscripts']) {
  assert(cvText.includes(section), `English CV is missing ${section}`)
}
assert(!/[\u3400-\u9fff]/.test(cvText), 'English CV contains Chinese text')
assert(cvText.includes('\\usepackage{fontawesome5}'), 'English CV does not use FontAwesome section icons')
assert(cvText.includes('\\newpage'), 'English CV source does not define its intentional second page')

const gifSource = path.resolve(projectRoot, '../nina-iseri-girls-band-cry.gif')
const gifPublic = path.join(dist, 'nina-iseri-girls-band-cry.gif')
assert.strictEqual(digest(gifPublic), digest(gifSource), 'the public 404 GIF differs from the user-provided source')

for (const asset of [
  'portrait.webp',
  'favicon-kehan-portrait-v3-512.png',
  'favicon-kehan-portrait-v3-192.png',
  'favicon-kehan-portrait-v3-32.png',
  'favicon-kehan-portrait-v3-16.png',
  'apple-touch-icon-kehan-v3.png'
]) {
  assert(fs.statSync(path.join(dist, asset)).size > 100, `${asset} is missing or unexpectedly small`)
}

for (const filename of ['index.html', 'zh/index.html', 'ja/index.html', '404.html']) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const icon of ['/favicon-kehan-portrait-v3-32.png', '/favicon-kehan-portrait-v3-16.png', '/apple-touch-icon-kehan-v3.png']) {
    assert(html.includes(icon), `${filename} does not reference ${icon}`)
  }
  assert(html.includes("localStorage.getItem('theme')"), `${filename} lacks the early theme initializer`)
}

console.log(`Validated ${htmlFiles.length} HTML pages, locale-aware CVs, portrait favicons, animated 404, light/dark themes, page TOC, external links, and legacy-route removal.`)
