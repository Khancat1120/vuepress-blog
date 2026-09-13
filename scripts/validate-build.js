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
    phrases: ['Kehan Pang', 'About Me', 'Research Interests', 'Publications', 'Contact', 'On this page', 'CCF-A Conference', 'CCF-A Journal', 'Fiction Writing', 'Beihang University, No. 37 Xueyuan Road, Haidian District, Beijing, China'],
    cv: '/cv/kehan-pang-cv-en.pdf',
    advisor: 'Prof. Wenfei Fan (CAS Academician)'
  },
  'zh/index.html': {
    phrases: ['庞可涵', '关于我', '研究方向', '学术成果', '联系方式', '本页目录', 'CCF-A 类会议', 'CCF-A 类期刊', '樊文飞院士', '小说与同人创作', '北京市海淀区学院路37号 北京航空航天大学'],
    cv: '/cv/kehan-pang-cv-zh.pdf',
    advisor: '樊文飞院士'
  },
  'ja/index.html': {
    phrases: ['Kehan Pang', 'プロフィール', '研究分野', '研究業績', '研究・職務経験', '連絡先', '目次', 'CCF-A 会議', 'CCF-A ジャーナル', '小説・二次創作', '中国北京市海淀区学院路37号 北京航空航天大学'],
    cv: '/cv/kehan-pang-cv-en.pdf',
    advisor: 'Wenfei Fan 教授（中国科学院院士）'
  }
}

const interests = {
  'index.html': ['Graph Data Mining', 'Graph Data Quality', 'Graph Knowledge Reasoning'],
  'zh/index.html': ['图数据挖掘', '图数据质量', '图知识推理'],
  'ja/index.html': ['グラフデータマイニング', 'グラフデータ品質', 'グラフ知識推論']
}

const removedInterests = {
  'index.html': 'Large Language Models',
  'zh/index.html': '大语言模型',
  'ja/index.html': '大規模言語モデル'
}

const boldResearchTerms = {
  'index.html': ['Graph Data Mining', 'Graph Data Quality', 'Graph Data Cleaning', 'Graph Knowledge Reasoning', 'Data-centric AI'],
  'zh/index.html': ['图数据挖掘', '图数据质量', '图数据清洗', '图知识推理', 'Data-centric AI'],
  'ja/index.html': ['グラフデータマイニング', 'グラフデータ品質', 'グラフデータクリーニング', 'グラフ知識推論', 'Data-centric AI']
}

for (const [filename, expected] of Object.entries(expectedPages)) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const phrase of expected.phrases) assert(html.includes(phrase), `${filename} is missing ${phrase}`)
  assert(html.includes(expected.advisor), `${filename} is missing the expected advisor title`)
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
  const researchBlock = html.slice(html.indexOf('id="research-interests"'), html.indexOf('</dd>', html.indexOf('id="research-interests"')))
  assert(!researchBlock.includes(removedInterests[filename]), `${filename} still lists ${removedInterests[filename]} as a research interest`)
  const aboutBlock = html.slice(html.indexOf('id="about"'), html.indexOf('class="profile-details"'))
  for (const term of boldResearchTerms[filename]) assert(aboutBlock.includes(`<strong>${term}</strong>`), `${filename} does not emphasize ${term}`)
  for (const advisorUrl of ['https://cs.pku.edu.cn/info/1008/2707.htm', 'https://scse.buaa.edu.cn/info/1388/10436.htm']) {
    assert(aboutBlock.includes(`href="${advisorUrl}" target="_blank" rel="noopener noreferrer"`), `${filename} does not link the advisor name in About`)
  }
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
for (const required of ['data-theme=dark', '--paper:#f2f3f4', '--paper:#181a1e', '.page-toc', 'position:sticky', 'scroll-margin-top', 'prefers-reduced-motion']) {
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
assert.strictEqual(digest(englishCv), digest(path.resolve(projectRoot, "../KehanPang's Resume-202608.pdf")), 'the published English CV differs from the user-provided canonical source')
assert.strictEqual(digest(chineseCv), digest(path.resolve(projectRoot, '../庞可涵的个人简历-202608.pdf')), 'the published Chinese CV differs from its selected source')

const packageJson = fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
const cvSyncScript = fs.readFileSync(path.join(projectRoot, 'scripts/sync-cv.sh'), 'utf8')
assert(!packageJson.includes('latexmk'), 'package scripts still invoke LaTeX')
assert(!cvSyncScript.includes('latexmk'), 'CV synchronization still invokes LaTeX')

const gifSource = path.resolve(projectRoot, '../nina-iseri-girls-band-cry.gif')
const gifPublic = path.join(dist, 'nina-iseri-girls-band-cry.gif')
assert.strictEqual(digest(gifPublic), digest(gifSource), 'the public 404 GIF differs from the user-provided source')

for (const asset of [
  'portrait.webp',
  'favicon-kehan-image-v4.png',
  'favicon-kehan-image-v4-192.png',
  'favicon-kehan-image-v4-32.png',
  'favicon-kehan-image-v4-16.png',
  'apple-touch-icon-v4.png'
]) {
  assert(fs.statSync(path.join(dist, asset)).size > 100, `${asset} is missing or unexpectedly small`)
}
assert.strictEqual(digest(path.join(dist, 'favicon-kehan-image-v4.png')), digest(path.resolve(projectRoot, '../image.png')), 'the primary favicon differs from image.png')
for (const retired of ['favicon-kehan-portrait-v3-512.png', 'favicon-kehan-portrait-v3-192.png', 'favicon-kehan-portrait-v3-32.png', 'favicon-kehan-portrait-v3-16.png', 'apple-touch-icon-kehan-v3.png', 'favicon.svg']) {
  assert(!relativeFiles.includes(retired), `retired favicon remains: ${retired}`)
}

for (const filename of ['index.html', 'zh/index.html', 'ja/index.html', '404.html']) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const icon of ['/favicon-kehan-image-v4.png', '/favicon-kehan-image-v4-32.png', '/favicon-kehan-image-v4-16.png', '/apple-touch-icon-v4.png']) {
    assert(html.includes(icon), `${filename} does not reference ${icon}`)
  }
  assert(html.includes("localStorage.getItem('theme')"), `${filename} lacks the early theme initializer`)
}

const japaneseHtml = fs.readFileSync(path.join(dist, 'ja/index.html'), 'utf8')
for (const forbidden of ['计算机', 'コンピューター', 'データ中心', 'データセンター', '>Email<', '執筆']) {
  assert(!japaneseHtml.includes(forbidden), `Japanese page contains inconsistent wording: ${forbidden}`)
}
for (const required of ['メール', '予備メール', 'コンピュータサイエンス', 'Data-centric AI', '数学コンテスト', '学部奨学金', '学業奨学金', 'IEEE ICDE 外部査読者']) {
  assert(japaneseHtml.includes(required), `Japanese page is missing localized wording: ${required}`)
}

console.log(`Validated ${htmlFiles.length} HTML pages, source-identical CVs, image.png favicons, localized profile content, animated 404, themes, page TOC, and legacy-route removal.`)
