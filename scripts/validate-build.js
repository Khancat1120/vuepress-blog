const assert = require('assert')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

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

const files = walk(dist)
const relativeFiles = files.map(filename => path.relative(dist, filename).replace(/\\/g, '/'))
const htmlFiles = relativeFiles.filter(filename => filename.endsWith('.html')).sort()
assert.deepStrictEqual(htmlFiles, ['404.html', 'index.html', 'ja/index.html', 'zh/index.html'])

const expectedPages = {
  'index.html': {
    phrases: ['Kehan Pang', 'About Me', 'Data-Centric AI', 'Data Quality, Knowledge Discovery, and Model Reliability', 'Research Interests', 'Education &amp; Experience', 'News', 'Experience', '2019', 'CMC', 'First Prize', '2020.09', 'Innovation Program', 'Municipal Project Award', '2023.12', '2024.07', 'TODS · J.', 'Accepted', '2024.08', 'KDD · Conf.', 'Publications', 'Contact', 'On this page', 'CCF-A Conference', 'CCF-A Journal', 'Fiction Writing', 'Beihang University', 'No. 37 Xueyuan Road', 'Haidian District, Beijing, China'],
    cv: '/cv.pdf',
    advisor: 'Prof. Wenfei Fan (CAS Academician)'
  },
  'zh/index.html': {
    phrases: ['庞可涵', '关于我', '以数据为中心的人工智能', '数据质量、知识发现与模型可靠性', '研究方向', '教育与经历', 'News', '科研与实习', '2019', '全国大学生数学竞赛', '一等奖', '2020.09', '创新创业训练计划', '市级项目奖', '2023.12', '2024.07', 'TODS · J.', 'Accepted', '2024.08', 'KDD · Conf.', '学术成果', '联系方式', '本页目录', 'CCF-A 类会议', 'CCF-A 类期刊', '樊文飞院士', '创作', '北京市海淀区学院路37号', '北京航空航天大学 Beihang University'],
    cv: '/简历.pdf',
    advisor: '樊文飞院士'
  },
  'ja/index.html': {
    phrases: ['Kehan Pang', 'プロフィール', 'データ中心型AI（Data-Centric AI）', 'データ品質・知識発見・モデル信頼性', '研究分野', '学歴・経歴', 'News', '研究・インターン経験', '2019', '全国大学生数学競技会', '一等賞', '2020.09', 'イノベーションプログラム', '市級プロジェクト賞', '2023.12', '2024.07', 'TODS · J.', 'Accepted', '2024.08', 'KDD · Conf.', '研究業績', '連絡先', '目次', 'CCF-A 会議', 'CCF-A ジャーナル', '小説・二次創作', '中国北京市海淀区学院路37号', '北京航空航天大学（Beihang University）'],
    cv: '/cv.pdf',
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
  'index.html': ['Data-Centric AI', 'Data Quality, Knowledge Discovery, and Model Reliability'],
  'zh/index.html': ['以数据为中心的人工智能', '数据质量、知识发现与模型可靠性'],
  'ja/index.html': ['データ中心型AI（Data-Centric AI）', 'データ品質・知識発見・モデル信頼性']
}

const aboutEducationTerms = {
  'index.html': 'Before joining Beihang',
  'zh/index.html': '本科就读于北京邮电大学',
  'ja/index.html': '北京郵電大学（Beijing University of Posts and Telecommunications）'
}

const educationEntries = {
  'index.html': [
    ['Beijing University of Posts and Telecommunications', 'Sep. 2018 – Jul. 2022', 'School of Computer Science · Computer Science and Technology · B.Eng.', 'GPA: 3.7 / 4.0 · Rank: 30 / 396 (Top 7.6%)'],
    ['Beihang University', 'Sep. 2022 – Apr. 2027 (Expected)', 'School of Computer Science and Engineering · Software Engineering · Ph.D. Student', 'Research: Data-Centric AI, Graph Data Mining, Graph Data Quality, and Graph Knowledge Reasoning']
  ],
  'zh/index.html': [
    ['北京邮电大学 Beijing University of Posts and Telecommunications', '2018.09 – 2022.07', '计算机学院 · 计算机科学与技术 · 工学学士', 'GPA：3.7 / 4.0 · 专业排名：30 / 396（前 7.6%）'],
    ['北京航空航天大学 Beihang University', '2022.09 – 2027.04（预计）', '计算机学院 · 软件工程 · 博士研究生', '研究方向：以数据为中心的人工智能、图数据挖掘、图数据质量与图知识推理']
  ],
  'ja/index.html': [
    ['北京郵電大学（Beijing University of Posts and Telecommunications）', '2018.09 – 2022.07', 'コンピュータサイエンス学院 · コンピュータ科学技術 · 工学学士', 'GPA：3.7 / 4.0 · 専攻順位：30 / 396（上位 7.6%）'],
    ['北京航空航天大学（Beihang University）', '2022.09 – 2027.04（予定）', 'コンピュータサイエンス学院 · ソフトウェア工学 · 博士課程', '研究分野：データ中心型AI、グラフデータマイニング、グラフデータ品質、グラフ知識推論']
  ]
}

const hobbies = {
  'index.html': ['Sleeping', 'Guitar', 'Fiction Writing'],
  'zh/index.html': ['睡觉', '吉他', '创作'],
  'ja/index.html': ['睡眠', 'ギター', '小説・二次創作']
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
  for (const advisorUrl of ['https://homepages.inf.ed.ac.uk/wenfei/', 'https://scse.buaa.edu.cn/info/1388/10436.htm']) {
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
  for (const advisorUrl of ['https://homepages.inf.ed.ac.uk/wenfei/', 'https://scse.buaa.edu.cn/info/1388/10436.htm']) {
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
  assert.strictEqual((html.match(/class="education-range /g) || []).length, 2, `${filename} does not contain exactly two education ranges`)
  assert.strictEqual((html.match(/class="education-range__topline"/g) || []).length, 2, `${filename} does not keep both school names and dates on the first line`)
  assert.strictEqual((html.match(/class="education-range__secondary"/g) || []).length, 2, `${filename} does not render both Education second lines`)
  assert.strictEqual((html.match(/class="education-range__meta"/g) || []).length, 2, `${filename} does not render both Education third lines`)
  const timelineHtml = html.slice(html.indexOf('id="timeline"'), html.indexOf('id="publications"'))
  assert(!timelineHtml.includes('<small>') && !timelineHtml.includes('education-range__unit'), `${filename} still renders detached school abbreviations or units`)
  for (const [institution, period, secondary, meta] of educationEntries[filename]) {
    assert(timelineHtml.includes(`<h3>${institution}</h3> <time>${period}</time>`), `${filename} does not keep ${institution} and its date together`)
    assert(timelineHtml.includes(secondary), `${filename} is missing the second Education line for ${institution}`)
    assert(timelineHtml.includes(meta), `${filename} is missing the third Education line for ${institution}`)
  }
  for (const hobby of hobbies[filename]) assert(html.includes(hobby), `${filename} is missing hobby ${hobby}`)
  if (filename === 'zh/index.html') assert(!html.includes('小说与同人创作'), 'Chinese page still contains the retired hobby wording')
  assert.strictEqual((html.match(/class="news-event /g) || []).length, 11, `${filename} does not contain exactly eleven News events`)
  assert.strictEqual((html.match(/class="news-event__date"/g) || []).length, 11, `${filename} does not render every News date on its own line`)
  assert.strictEqual((html.match(/class="news-event__text"/g) || []).length, 11, `${filename} does not render every News event on its own line`)
  assert.strictEqual((html.match(/class="news-event__status"/g) || []).length, 11, `${filename} does not render every News status on its own line`)
  assert.strictEqual((html.match(/class="experience-range /g) || []).length, 2, `${filename} does not contain exactly two experience ranges`)
  assert.strictEqual((html.match(/class="unified-timeline__axis"/g) || []).length, 1, `${filename} does not contain exactly one main timeline axis`)
  assert(!html.includes('milestone-track'), `${filename} still contains the retired milestone timeline`)
  assert(!html.includes('education-track'), `${filename} still contains the retired education timeline`)
  assert(!html.includes('work-track'), `${filename} still contains the retired work timeline`)
  assert(!html.includes('Important Milestones') && !html.includes('重要节点') && !html.includes('主な歩み'), `${filename} still labels a separate milestone band`)
  assert(!html.includes('Academic Homepage'), `${filename} still contains the old hero eyebrow`)
  assert(!html.includes('class="hero'), `${filename} still contains the old hero`)
  assert(!html.includes('section-index'), `${filename} still contains section numbers`)
  assert(!html.includes('数据中心'), `${filename} contains the incorrect translation of data-centric`)

  const occurrences = value => html.split(value).length - 1
  assert.strictEqual(occurrences(`href="${expected.cv}"`), 2, `${filename} does not route both CV links correctly`)
  assert.strictEqual(occurrences('href="https://github.com/KehanPang"'), 2, `${filename} does not include GitHub in both header and rail`)
  assert.strictEqual(occurrences('href="https://scholar.google.com/citations?user=b3XVG_oAAAAJ"'), 2, `${filename} does not include Scholar in both header and rail`)
  assert.strictEqual(occurrences('href="https://orcid.org/0009-0006-4086-1421"'), 1, `${filename} has an incorrect ORCID link`)
  assert(!html.includes(expected.cv === '/cv.pdf' ? 'href="/简历.pdf"' : 'href="/cv.pdf"'), `${filename} contains the wrong locale CV`)

  for (const publicationId of ['pub-tods-2024-entity-linking', 'pub-kdd-2024-meld', 'pub-tods-2024-graph-errors', 'pub-icde-2025-label-imputation', 'pub-sigmod-2025-gpu-graph-cleaning', 'pub-icde-2026-gnn-negatives', 'pub-kdd-2026-influence-functions']) {
    assert(html.includes(`id="${publicationId}"`), `${filename} is missing publication anchor ${publicationId}`)
    assert(html.includes(`href="#${publicationId}"`), `${filename} does not link Timeline News to ${publicationId}`)
  }

  const timelineBlock = timelineHtml
  const timelineEvent = target => {
    const match = timelineBlock.match(new RegExp(`<a href="${target}"[\\s\\S]*?</a>`))
    assert(match, `${filename} is missing Timeline event ${target}`)
    return match[0]
  }
  const linkingEntitiesNews = timelineEvent('#pub-tods-2024-entity-linking')
  const graphErrorsNews = timelineEvent('#pub-tods-2024-graph-errors')
  for (const value of ['2023.12', 'TODS · J.', 'Accepted']) assert(linkingEntitiesNews.includes(value), `${filename} has incorrect Linking Entities News metadata`)
  for (const value of ['2024.07', 'TODS · J.', 'Accepted']) assert(graphErrorsNews.includes(value), `${filename} has incorrect Making It Tractable News metadata`)
  assert(!timelineBlock.includes('2024.12'), `${filename} still uses the old TODS publication month`)
  assert.strictEqual((timelineBlock.match(/news-event--publication/g) || []).length, 7, `${filename} does not contain seven publication News events`)
  assert.strictEqual((timelineBlock.match(/class="news-event__status">Accepted/g) || []).length, 7, `${filename} does not use Accepted for every publication News event`)
  for (const localizedMetadata of [' · 会议', ' · 期刊', ' · 会議', '>Published<', '>接收<', '>发表<', '>採択<', '>掲載<']) {
    assert(!timelineBlock.includes(localizedMetadata), `${filename} contains inconsistent publication News metadata: ${localizedMetadata}`)
  }
  if (filename === 'index.html') assert(!timelineBlock.includes('Math Competition'), 'English Timeline does not use CMC exclusively')
  if (filename === 'zh/index.html') assert(!timelineBlock.includes('>CMC<') && !timelineBlock.includes('>数学竞赛<'), 'Chinese Timeline abbreviates the national competition')
  if (filename === 'ja/index.html') assert(!timelineBlock.includes('>CMC<') && !timelineBlock.includes('数学コンテスト') && !timelineBlock.includes('中国大学生数学コンテスト'), 'Japanese Timeline does not use the requested competition name')
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
for (const required of ['data-theme=dark', '--paper:#f1f2f3', '--paper:#181a1e', '.profile-rail', '.unified-timeline__axis', '.news-event__label', '.news-event__status', '.news-event--award-subtle', '.publication-anchor', 'rotate(-20deg)', 'overflow-x:auto', 'scrollbar-width:none', '.page-toc', 'position:sticky', 'scroll-margin-top', 'prefers-reduced-motion']) {
  assert(css.includes(required), `theme CSS is missing ${required}`)
}
for (const forbidden of ['@keyframes', 'animation:', 'backdrop-filter']) {
  assert(!css.includes(forbidden), `the site still contains ${forbidden}`)
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
for (const legacyPath of ['/jottings/', '/novels/', '/technology/', '/knowledge/', '/about/']) {
  assert(!sitemap.includes(legacyPath), `sitemap contains legacy route: ${legacyPath}`)
}

const englishCv = path.join(dist, 'cv.pdf')
const chineseCv = path.join(dist, '简历.pdf')
for (const filename of [englishCv, chineseCv]) {
  assert.strictEqual(fs.readFileSync(filename).subarray(0, 5).toString(), '%PDF-', `${filename} is not a valid PDF`)
}
assert.strictEqual(digest(englishCv), digest(path.join(projectRoot, 'cv.pdf')), 'the published English CV differs from blog/cv.pdf')
assert.strictEqual(digest(chineseCv), digest(path.join(projectRoot, '简历.pdf')), 'the published Chinese CV differs from blog/简历.pdf')

for (const retiredCv of ['cv/kehan-pang-cv-en.pdf', 'cv/kehan-pang-cv-zh.pdf', 'kehan-pang-cv.pdf']) {
  assert(!relativeFiles.includes(retiredCv), `retired CV copy remains: ${retiredCv}`)
  assert(!searchable.includes(`/${retiredCv}`), `a page still links the retired CV path: /${retiredCv}`)
}

const packageJson = fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
const cvSyncScript = fs.readFileSync(path.join(projectRoot, 'scripts/sync-cv.sh'), 'utf8')
assert(!packageJson.includes('latexmk'), 'package scripts still invoke LaTeX')
assert(!cvSyncScript.includes('latexmk'), 'CV synchronization still invokes LaTeX')
assert(cvSyncScript.includes('$PROJECT_ROOT/cv.pdf'), 'CV synchronization does not read blog/cv.pdf')
assert(cvSyncScript.includes('$PROJECT_ROOT/简历.pdf'), 'CV synchronization does not read blog/简历.pdf')
assert(cvSyncScript.includes('$DIST_DIR/cv.pdf'), 'CV synchronization does not publish /cv.pdf')
assert(cvSyncScript.includes('$DIST_DIR/简历.pdf'), 'CV synchronization does not publish /简历.pdf')

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
for (const required of ['メール', '予備メール', 'コンピュータサイエンス', 'データ中心型AI（Data-Centric AI）', '全国大学生数学競技会', '学部奨学金', '学業奨学金', 'IEEE ICDE 外部査読者']) {
  assert(japaneseHtml.includes(required), `Japanese page is missing localized wording: ${required}`)
}

console.log(`Validated ${htmlFiles.length} HTML pages, three localized About sections, one shared time axis with eleven three-line News events and seven publication anchors including two distinct TODS links, root-routed source-identical CVs, image.png favicons, animated 404, themes, page TOC, and legacy-route removal.`)
