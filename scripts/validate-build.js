const assert = require('assert')
const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '../docs/.vuepress/dist')

function walk (directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(filename) : [filename]
  })
}

const files = walk(dist)
const relativeFiles = files.map(filename => path.relative(dist, filename).replace(/\\/g, '/'))
const htmlFiles = relativeFiles.filter(filename => filename.endsWith('.html')).sort()
assert.deepStrictEqual(htmlFiles, ['404.html', 'index.html', 'ja/index.html', 'zh/index.html'])

const expected = {
  'index.html': ['Kehan Pang', 'About Me', 'Publications', 'Contact'],
  'zh/index.html': ['庞可涵', '关于我', '学术成果', '联系方式'],
  'ja/index.html': ['Kehan Pang', 'プロフィール', '研究業績', '連絡先']
}

for (const [filename, phrases] of Object.entries(expected)) {
  const html = fs.readFileSync(path.join(dist, filename), 'utf8')
  for (const phrase of phrases) assert(html.includes(phrase), `${filename} is missing ${phrase}`)
  for (const link of ['/kehan-pang-cv.pdf', 'https://github.com/KehanPang', 'https://scholar.google.com/citations?user=b3XVG_oAAAAJ']) {
    assert(html.includes(link), `${filename} is missing ${link}`)
  }
  for (const languagePath of ['href="/"', 'href="/zh/"', 'href="/ja/"']) {
    assert(html.includes(languagePath), `${filename} is missing language link ${languagePath}`)
  }
  assert(html.includes('rel="canonical"'), `${filename} is missing a canonical URL`)
  assert(html.includes('hreflang="'), `${filename} is missing alternate-language metadata`)
  assert(html.indexOf('id="contact"') > html.indexOf('id="honors"'), `${filename} does not place Contact last`)
  assert(html.includes('class="profile-introduction content-width"'), `${filename} is missing the compact profile introduction`)
  assert(html.includes('class="profile-photo"'), `${filename} is missing the small profile photo`)
  assert(!html.includes('Academic Homepage'), `${filename} still contains the old hero eyebrow`)
  assert(!html.includes('class="hero'), `${filename} still contains the old hero`)
  assert(!html.includes('section-index'), `${filename} still contains section numbers`)

  const occurrences = link => html.split(link).length - 1
  assert.strictEqual(occurrences('href="/kehan-pang-cv.pdf"'), 1, `${filename} repeats the CV link`)
  assert.strictEqual(occurrences('href="https://github.com/KehanPang"'), 1, `${filename} repeats the GitHub link`)
  assert.strictEqual(occurrences('href="https://scholar.google.com/citations?user=b3XVG_oAAAAJ"'), 1, `${filename} repeats the Scholar link`)
}

const notFound = fs.readFileSync(path.join(dist, '404.html'), 'utf8')
for (const phrase of ['Wrong stage.', 'Back to homepage', 'not-found-illustration', 'rebel-title']) {
  assert(notFound.includes(phrase), `404.html is missing ${phrase}`)
}
assert(notFound.includes('<svg'), '404.html is missing the original inline illustration')

for (const legacyPath of ['jottings/', 'novels/', 'technology/', 'knowledge/', 'about/']) {
  assert(!relativeFiles.some(filename => filename.startsWith(legacyPath)), `legacy output remains: ${legacyPath}`)
}

const searchable = files
  .filter(filename => /\.(html|js|css|xml|txt)$/.test(filename))
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .join('\n')

for (const forbidden of ['127.0.0.1:3000', 'ClustrMaps', 'titlePv', 'Skill Tree', 'vuepress-plugin-cat', 'section-index', 'hero__actions']) {
  assert(!searchable.includes(forbidden), `forbidden legacy string remains: ${forbidden}`)
}

const css = files
  .filter(filename => filename.endsWith('.css'))
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .join('\n')
for (const forbidden of ['@keyframes', 'animation:', 'backdrop-filter']) {
  assert(!css.includes(forbidden), `the refined site still contains ${forbidden}`)
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
for (const legacyPath of ['/jottings/', '/novels/', '/technology/', '/knowledge/', '/about/']) {
  assert(!sitemap.includes(legacyPath), `sitemap contains legacy route: ${legacyPath}`)
}

const cv = fs.readFileSync(path.join(dist, 'kehan-pang-cv.pdf'))
assert.strictEqual(cv.subarray(0, 5).toString(), '%PDF-', 'CV is not a valid PDF')
const cvText = fs.readFileSync(path.resolve(__dirname, '../cv/kehan-pang-cv.tex'), 'utf8')
for (const section of ['Education', 'Work Experience', 'Research Experience', 'Awards and Academic Service', 'Research and Technical Expertise', 'Publications', 'Manuscripts']) {
  assert(cvText.includes(section), `CV is missing ${section}`)
}
assert(!/[\u3400-\u9fff]/.test(cvText), 'English CV contains Chinese text')
assert(cvText.includes('\\usepackage{fontawesome5}'), 'CV does not use FontAwesome section icons')
assert(cvText.includes('\\newpage'), 'CV source does not define its intentional second page')
assert(fs.statSync(path.join(dist, 'portrait.webp')).size > 10000, 'portrait asset is missing or unexpectedly small')

console.log(`Validated ${htmlFiles.length} HTML pages, compact academic layout, custom 404, two-page CV, three locales, and legacy-route removal.`)
