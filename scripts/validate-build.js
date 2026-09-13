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
    phrases: ['Kehan Pang', 'About Me', 'Research Interests', 'Education &amp; Experience', 'Selected Milestones', 'Research &amp; Internship', 'Publications', 'Contact', 'On this page', 'CCF-A Conference', 'CCF-A Journal', 'Fiction Writing', 'Beihang University', 'No. 37 Xueyuan Road', 'Haidian District, Beijing, China'],
    cv: '/cv/kehan-pang-cv-en.pdf',
    advisor: 'Prof. Wenfei Fan (CAS Academician)'
  },
  'zh/index.html': {
    phrases: ['庞可涵', '关于我', '研究方向', '教育与经历', '重要节点', '科研与实习', '学术成果', '联系方式', '本页目录', 'CCF-A 类会议', 'CCF-A 类期刊', '樊文飞院士', '小说与同人创作', '北京市海淀区学院路37号', '北京航空航天大学'],
    cv: '/cv/kehan-pang-cv-zh.pdf',
    advisor: '樊文飞院士'
  },
  'ja/index.html': {
    phrases: ['Kehan Pang', 'プロフィール', '研究分野', '学歴・経歴', '主な歩み', '研究・インターン経験', '研究業績', '連絡先', '目次', 'CCF-A 会議', 'CCF-A ジャーナル', '小説・二次創作', '中国北京市海淀区学院路37号', '北京航空航天大学'],
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
  'index.html': ['Data-centric AI', 'Graph Data Mining', 'Graph Data Quality', 'Graph Knowledge Reasoning', 'GNN Explainability', 'Large Language Models to Data Processing'],
  'zh/index.html': ['以数据为中心的人工智能', '图数据挖掘', '图数据质量', '图知识推理', 'GNN 可解释性', '大语言模型在数据处理中的应用'],
  'ja/index.html': ['データ中心型AI（Data-centric AI）', 'グラフデータマイニング', 'グラフデータ品質', 'グラフ知識推論', 'GNNの説明可能性', '大規模言語モデルを用いたデータ処理']
}

const aboutEducationTerms = {
  'index.html': 'Before joining Beihang',
  'zh/index.html': '本科就读于北京邮电大学',
  'ja/index.html': '北京郵電大学（Beijing University of Posts and Telecommunications）'
}

for (const [filename, expected] of Object.entries(expectedPages)) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const phrase of expected.phrases) assert(html.includes(phrase), `${filename} is missing ${phrase}`)
  assert(html.includes(expected.advisor), `${filename} is missing the expected advisor title`)
  for (const link of [expected.cv, 'https://github.com/KehanPang', 'https://scholar.google.com/citations?user=b3XVG_oAAAAJ', 'https://orcid.org/0009-0006-4086-1421']) {
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
  assert(!aboutBlock.includes(aboutEducationTerms[filename]), `${filename} repeats the undergraduate history in About`)
  for (const advisorUrl of ['https://cs.pku.edu.cn/info/1008/2707.htm', 'https://scse.buaa.edu.cn/info/1388/10436.htm']) {
    assert(aboutBlock.includes(`href="${advisorUrl}" target="_blank" rel="noopener noreferrer"`), `${filename} does not link the advisor name in About`)
  }
  assert.strictEqual((html.match(/href="mailto:pangkehan@buaa.edu.cn"/g) || []).length, 2, `${filename} does not link the primary email in both the rail and Contact`)
  assert(html.includes('href="mailto:k3hanpang@gmail.com"'), `${filename} is missing the alternative email`)
  assert(html.includes('class="page-toc"'), `${filename} is missing the page table of contents`)
  assert(html.includes('class="theme-toggle"'), `${filename} is missing the theme toggle`)
  assert(html.includes('rel="canonical"'), `${filename} is missing a canonical URL`)
  assert(html.includes('hreflang="'), `${filename} is missing alternate-language metadata`)
  assert(html.indexOf('id="contact"') > html.indexOf('id="honors"'), `${filename} does not place Contact last`)
  assert(html.includes('class="profile-rail"'), `${filename} is missing the profile rail`)
  assert(html.includes('class="profile-introduction"'), `${filename} is missing the compact profile introduction`)
  assert(html.includes('id="timeline"'), `${filename} is missing the integrated timeline`)
  assert(!html.includes('id="education"'), `${filename} still contains the separate Education section`)
  assert(!html.includes('id="experience"'), `${filename} still contains the separate Experience section`)
  assert.strictEqual((html.match(/class="education-span /g) || []).length, 2, `${filename} does not contain exactly two education spans`)
  assert.strictEqual((html.match(/class="milestone /g) || []).length, 8, `${filename} does not contain exactly eight milestones`)
  assert.strictEqual((html.match(/class="work-entry /g) || []).length, 2, `${filename} does not contain exactly two work entries`)
  assert(!html.includes('Academic Homepage'), `${filename} still contains the old hero eyebrow`)
  assert(!html.includes('class="hero'), `${filename} still contains the old hero`)
  assert(!html.includes('section-index'), `${filename} still contains section numbers`)
  assert(!html.includes('数据中心'), `${filename} contains the incorrect translation of data-centric`)

  const occurrences = value => html.split(value).length - 1
  assert.strictEqual(occurrences(`href="${expected.cv}"`), 2, `${filename} does not route both CV links correctly`)
  assert.strictEqual(occurrences('href="https://github.com/KehanPang"'), 2, `${filename} does not include GitHub in both header and rail`)
  assert.strictEqual(occurrences('href="https://scholar.google.com/citations?user=b3XVG_oAAAAJ"'), 2, `${filename} does not include Scholar in both header and rail`)
  assert.strictEqual(occurrences('href="https://orcid.org/0009-0006-4086-1421"'), 1, `${filename} has an incorrect ORCID link`)
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
for (const required of ['data-theme=dark', '--paper:#f1f2f3', '--paper:#181a1e', '.profile-rail', '.milestone-track', 'overflow-x:auto', '.page-toc', 'position:sticky', 'scroll-margin-top', 'prefers-reduced-motion']) {
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
  'favicon-kehan-v5.png',
  'favicon-kehan-v5-192.png',
  'favicon-kehan-v5-32.png',
  'favicon-kehan-v5-16.png',
  'apple-touch-icon-v5.png'
]) {
  assert(fs.statSync(path.join(dist, asset)).size > 100, `${asset} is missing or unexpectedly small`)
}
assert.strictEqual(digest(path.join(dist, 'favicon-kehan-v5.png')), digest(path.resolve(projectRoot, '../image.png')), 'the primary favicon differs from image.png')
for (const retired of ['favicon-kehan-image-v4.png', 'favicon-kehan-image-v4-192.png', 'favicon-kehan-image-v4-32.png', 'favicon-kehan-image-v4-16.png', 'apple-touch-icon-v4.png', 'favicon-kehan-portrait-v3-512.png', 'favicon-kehan-portrait-v3-192.png', 'favicon-kehan-portrait-v3-32.png', 'favicon-kehan-portrait-v3-16.png', 'apple-touch-icon-kehan-v3.png', 'favicon.svg']) {
  assert(!relativeFiles.includes(retired), `retired favicon remains: ${retired}`)
}

for (const filename of ['index.html', 'zh/index.html', 'ja/index.html', '404.html']) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const icon of ['/favicon-kehan-v5.png', '/favicon-kehan-v5-32.png', '/favicon-kehan-v5-16.png', '/apple-touch-icon-v5.png']) {
    assert(html.includes(icon), `${filename} does not reference ${icon}`)
  }
  assert(html.includes("localStorage.getItem('theme')"), `${filename} lacks the early theme initializer`)
}

const japaneseHtml = fs.readFileSync(path.join(dist, 'ja/index.html'), 'utf8')
for (const forbidden of ['计算机', 'コンピューター', 'データセンター', '>Email<', '執筆']) {
  assert(!japaneseHtml.includes(forbidden), `Japanese page contains inconsistent wording: ${forbidden}`)
}
for (const required of ['メール', '予備メール', 'コンピュータサイエンス', 'データ中心型AI（Data-centric AI）', '数学コンテスト', '学部奨学金', '学業奨学金', 'IEEE ICDE 外部査読者']) {
  assert(japaneseHtml.includes(required), `Japanese page is missing localized wording: ${required}`)
}

console.log(`Validated ${htmlFiles.length} HTML pages, three profile rails, integrated timelines with eight milestones, source-identical CVs, image.png favicons, animated 404, themes, page TOC, and legacy-route removal.`)
