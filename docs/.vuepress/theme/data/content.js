export const links = {
  cvEn: '/cv.pdf',
  cvZh: '/简历.pdf',
  github: 'https://github.com/KehanPang',
  scholar: 'https://scholar.google.com/citations?user=b3XVG_oAAAAJ',
  orcid: 'https://orcid.org/0009-0006-4086-1421'
}

export const languages = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'zh', label: '中文', path: '/zh/' },
  { code: 'ja', label: '日本語', path: '/ja/' }
]

export const publications = [
  {
    id: 'pub-icde-2026-gnn-negatives',
    year: '2026',
    venue: 'ICDE 2026',
    ccfType: 'conference',
    title: 'Explaining GNN Negatives Globally and Locally',
    authors: ['Kehan Pang', 'Wenfei Fan', 'Min Xie', 'Dandan Lin'],
    details: '2026 IEEE 42nd International Conference on Data Engineering, pp. 1603–1616.',
    doi: '10.1109/ICDE65706.2026.00123',
    href: 'https://doi.org/10.1109/ICDE65706.2026.00123'
  },
  {
    id: 'pub-kdd-2026-influence-functions',
    year: '2026',
    venue: 'KDD 2026',
    ccfType: 'conference',
    title: 'Accelerating Influence Function Estimation for Large Language Models: A Practical Design',
    authors: ['Mengyi Yan', 'Yaoshu Wang', 'Guangyi Zhang', 'Kehan Pang', 'Haoyi Zhou'],
    details: 'Proceedings of the 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining, Vol. 2, pp. 5927–5938.',
    doi: '10.1145/3770855.3817953',
    href: 'https://doi.org/10.1145/3770855.3817953'
  },
  {
    id: 'pub-icde-2025-label-imputation',
    year: '2025',
    venue: 'ICDE 2025',
    ccfType: 'conference',
    title: 'Imputing Sparse and Noisy Labels for GNNs',
    authors: ['Wenfei Fan', 'Kehan Pang', 'Chao Tian'],
    details: '2025 IEEE 41st International Conference on Data Engineering, pp. 2295–2308.',
    doi: '10.1109/ICDE65448.2025.00174',
    href: 'https://doi.org/10.1109/ICDE65448.2025.00174'
  },
  {
    id: 'pub-sigmod-2025-gpu-graph-cleaning',
    year: '2025',
    venue: 'SIGMOD 2025',
    ccfType: 'conference',
    title: 'Rule-Based Graph Cleaning with GPUs on a Single Machine',
    authors: ['Wenchao Bai', 'Wenfei Fan', 'Shuhao Liu', 'Kehan Pang', 'Xiaoke Zhu', 'Jiahui Jin'],
    details: 'Proceedings of the ACM on Management of Data 3(3), Article 166, pp. 166:1–166:27.',
    doi: '10.1145/3725303',
    href: 'https://doi.org/10.1145/3725303'
  },
  {
    id: 'pub-tods-2024-graph-errors',
    year: '2024',
    venue: 'ACM TODS',
    ccfType: 'journal',
    title: 'Making It Tractable to Detect and Correct Errors in Graphs',
    authors: ['Wenfei Fan', 'Kehan Pang', 'Ping Lu', 'Chao Tian'],
    details: 'ACM Transactions on Database Systems 49(4), Article 16, pp. 16:1–16:75.',
    doi: '10.1145/3702315',
    href: 'https://doi.org/10.1145/3702315'
  },
  {
    id: 'pub-kdd-2024-meld',
    year: '2024',
    venue: 'KDD 2024',
    ccfType: 'conference',
    title: 'Efficient Mixture of Experts based on Large Language Models for Low-Resource Data Preprocessing',
    authors: ['Mengyi Yan', 'Yaoshu Wang', 'Kehan Pang', 'Min Xie', 'Jianxin Li'],
    details: 'Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining, pp. 3690–3701.',
    doi: '10.1145/3637528.3671873',
    href: 'https://doi.org/10.1145/3637528.3671873'
  },
  {
    id: 'pub-tods-2024-entity-linking',
    year: '2024',
    venue: 'ACM TODS',
    ccfType: 'journal',
    title: 'Linking Entities across Relations and Graphs',
    authors: ['Wenfei Fan', 'Ping Lu', 'Kehan Pang', 'Ruochun Jin', 'Wenyuan Yu'],
    details: 'ACM Transactions on Database Systems 49(1), Article 2, pp. 2:1–2:50.',
    doi: '10.1145/3639363',
    href: 'https://doi.org/10.1145/3639363'
  }
]

export const content = {
  en: {
    localeName: 'English',
    skip: 'Skip to main content',
    navLabel: 'Profile links',
    languageLabel: 'Language',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    tocLabel: 'On this page',
    heroPrimary: 'Kehan Pang',
    heroSecondary: '庞可涵',
    role: 'Ph.D. Student',
    affiliation: 'School of Computer Science and Engineering',
    university: 'Beihang University',
    tagline: 'Research in graph data mining, graph data quality, and graph knowledge reasoning.',
    photoAlt: 'Portrait of Kehan Pang',
    railLinksLabel: 'Academic profile links',
    railLinks: { email: 'Email', cv: 'CV', scholar: 'Google Scholar', orcid: 'ORCID', github: 'GitHub' },
    sections: {
      about: 'About Me', publications: 'Publications', manuscripts: 'Manuscripts / Under Review',
      timeline: 'Education & Experience', awards: 'Honors & Awards',
      service: 'Academic Service', patent: 'Patent', contact: 'Contact'
    },
    about: [
      'I am a Ph.D. student in Software Engineering at the School of Computer Science and Engineering, Beihang University, advised by Prof. <a href="https://homepages.inf.ed.ac.uk/wenfei/" target="_blank" rel="noopener noreferrer">Wenfei Fan</a> (CAS Academician) and Assoc. Prof. <a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">Ping Lu</a>.',
      'My research centers on <strong>Data-Centric AI</strong>, with a focus on <strong>Data Quality, Knowledge Discovery, and Model Reliability</strong> in graph learning. My work spans entity alignment, data augmentation, graph association rule mining, and GNN explainability, while also exploring the use of LLMs for data processing and knowledge discovery.'
    ],
    researchLabel: 'Research Interests',
    research: ['Graph Data Mining', 'Graph Data Quality', 'Graph Knowledge Reasoning'],
    mbtiLabel: 'MBTI',
    mbti: 'INTP',
    hobbiesLabel: 'Hobbies',
    hobbies: ['Sleeping', 'Guitar', 'Fiction Writing'],
    publicationNote: 'Peer-reviewed and formally published or accepted work. Entries follow the official bibliographic record.',
    doiLabel: 'DOI',
    ccf: { conference: 'CCF-A Conference', journal: 'CCF-A Journal' },
    manuscripts: [
      { title: 'OpenMind: Query-Time Diversification via Logical Rules', authors: ['Wenfei Fan', 'Kehan Pang', 'Dandan Lin'], status: 'Under Revision' },
      { title: 'ComCE: Community-Aware Counterfactual Explanations for Graph Neural Network', authors: ['Kehan Pang', 'Dandan Lin'], status: 'Under Review' }
    ],
    timelineLabels: { education: 'Education', news: 'News', work: 'Experience' },
    education: [
      {
        institution: 'Beijing University of Posts and Telecommunications',
        period: 'Sep. 2018 – Jul. 2022',
        program: 'School of Computer Science · Computer Science and Technology · B.Eng.',
        meta: 'GPA: 3.7 / 4.0 · Rank: 30 / 396 (Top 7.6%)',
        tone: 'blue',
        start: 0,
        end: 44.7
      },
      {
        institution: 'Beihang University',
        period: 'Sep. 2022 – Apr. 2027 (Expected)',
        program: 'School of Computer Science and Engineering · Software Engineering · Ph.D. Student',
        tone: 'wine',
        start: 46.6,
        end: 100,
        advisorsLabel: 'Advisors: ',
        advisorSeparator: ', ',
        advisors: [
          { prefix: 'Prof. ', name: 'Wenfei Fan', suffix: ' (CAS Academician)', href: 'https://homepages.inf.ed.ac.uk/wenfei/' },
          { prefix: 'Assoc. Prof. ', name: 'Ping Lu', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ],
        researchLabel: 'Research: ',
        research: 'Data-Centric AI, Graph Data Mining, Graph Data Quality, and Graph Knowledge Reasoning'
      }
    ],
    news: [
      { date: '2019.12', event: 'CMC', status: 'First Prize', position: 14.5, side: 'upper', lane: 0, align: 'end', target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.02', event: 'MCM', status: 'Honorable Mention', position: 16.5, side: 'lower', lane: 0, align: 'end', target: '#honors', tone: 'red', kind: 'award' },
      { date: '2020.12', event: 'CMC', status: 'First Prize', position: 26.2, side: 'lower', lane: 1, target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.09', event: 'Innovation Program', status: 'Municipal Project Award', position: 23.3, side: 'upper', lane: 1, target: '#honors', tone: 'wine', kind: 'award-subtle' },
      { date: '2023.12', event: 'TODS · J.', status: 'Accepted', position: 61.2, side: 'upper', lane: 1, align: 'end', target: '#pub-tods-2024-entity-linking', tone: 'wine', kind: 'publication' },
      { date: '2024.07', event: 'TODS · J.', status: 'Accepted', position: 67.9, side: 'lower', lane: 0, align: 'end', target: '#pub-tods-2024-graph-errors', tone: 'wine', kind: 'publication' },
      { date: '2024.08', event: 'KDD · Conf.', status: 'Accepted', position: 68.9, side: 'upper', lane: 0, align: 'end', target: '#pub-kdd-2024-meld', tone: 'blue', kind: 'publication' },
      { date: '2025.05', event: 'ICDE · Conf.', status: 'Accepted', position: 77.7, side: 'upper', lane: 1, align: 'end', target: '#pub-icde-2025-label-imputation', tone: 'red', kind: 'publication' },
      { date: '2025.06', event: 'SIGMOD · Conf.', status: 'Accepted', position: 78.6, side: 'lower', lane: 1, align: 'end', target: '#pub-sigmod-2025-gpu-graph-cleaning', tone: 'blue', kind: 'publication' },
      { date: '2026.05', event: 'ICDE · Conf.', status: 'Accepted', position: 89.3, side: 'upper', lane: 0, align: 'end', target: '#pub-icde-2026-gnn-negatives', tone: 'wine', kind: 'publication' },
      { date: '2026.08', event: 'KDD · Conf.', status: 'Accepted', position: 92.2, side: 'lower', lane: 0, align: 'end', target: '#pub-kdd-2026-influence-functions', tone: 'red', kind: 'publication' }
    ],
    experience: [
      {
        organization: 'Shenzhen Institute of Computing Sciences',
        department: 'Fundamental Research Department',
        role: 'Research Intern',
        period: 'Jul. 2023 – Jan. 2024',
        detail: 'Conducted research on graph data quality, data augmentation, GNN explainability, and low-resource LLM adaptation; contributed to publications in ACM TODS and IEEE ICDE.',
        tone: 'blue', start: 56.3, end: 62.1, row: 0
      },
      {
        organization: 'Meituan',
        role: 'Algorithm Research Intern',
        unit: 'Core Local Commerce / M17',
        period: 'Sep. 2024 – Jan. 2025',
        detail: 'Developed web-data cleaning and evaluation methods for LLM pretraining and fully fine-tuned a local 7B model, achieving ROUGE-L at approximately 96% of the GPT-4 baseline and an approximately 6 percentage-point improvement over conventional methods on a human-annotated internal dataset.',
        tone: 'red', start: 69.9, end: 73.8, row: 1
      }
    ],
    awards: [
      'First Prize, Beijing Undergraduate Mathematics Competition, 2019 & 2020',
      'First Prize, Chinese Mathematics Competitions, 2019 & 2020',
      'Undergraduate Scholarship, Beijing University of Posts and Telecommunications, 2019–2021',
      'Academic Scholarship, School of Computer Science, Beihang University, 2022–2025',
      'Honorable Mention, Mathematical Contest in Modeling, 2020',
      'Beijing municipal-level Undergraduate Innovation and Entrepreneurship Training Program award, 2020'
    ],
    service: ['External Reviewer, IEEE ICDE, 2024–2026'],
    patentTitle: 'A Method, Apparatus, Device, and Medium for Graph Data Augmentation',
    patentStatus: 'Chinese invention patent application, 2025',
    contactLead: 'For research discussions and professional opportunities, please get in touch by email.',
    emailLabel: 'Email',
    alternativeEmailLabel: 'Alternative',
    addressLabel: 'Address',
    address: 'Beihang University, No. 37 Xueyuan Road, Haidian District, Beijing, China',
    addressLines: ['Beihang University', 'No. 37 Xueyuan Road', 'Haidian District, Beijing, China'],
    labelSeparator: ':',
    updated: 'Last updated: 2026'
  },
  zh: {
    localeName: '中文',
    skip: '跳转到主要内容',
    navLabel: '个人资料链接',
    languageLabel: '语言',
    themeToDark: '切换到深色模式',
    themeToLight: '切换到浅色模式',
    tocLabel: '本页目录',
    heroPrimary: '庞可涵',
    heroSecondary: 'Kehan Pang',
    role: '博士研究生',
    affiliation: '计算机学院',
    university: '北京航空航天大学',
    tagline: '研究图数据挖掘、图数据质量与图知识推理。',
    photoAlt: '庞可涵的个人照片',
    railLinksLabel: '学术资料链接',
    railLinks: { email: '邮箱', cv: 'CV', scholar: 'Google Scholar', orcid: 'ORCID', github: 'GitHub' },
    sections: {
      about: '关于我', publications: '学术成果', manuscripts: '在审稿件', timeline: '教育与经历',
      awards: '荣誉与奖励', service: '学术服务', patent: '专利', contact: '联系方式'
    },
    about: [
      '我目前是北京航空航天大学计算机学院软件工程专业博士研究生，导师为<a href="https://homepages.inf.ed.ac.uk/wenfei/" target="_blank" rel="noopener noreferrer">樊文飞</a>院士和<a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">陆平</a>副教授。',
      '我的研究围绕<strong>以数据为中心的人工智能</strong>展开，关注图学习中的<strong>数据质量、知识发现与模型可靠性</strong>问题，主要涉及实体对齐、数据增强、图关联规则挖掘与 GNN 可解释性，并探索 LLM 在数据处理与知识发现中的应用。'
    ],
    researchLabel: '研究方向',
    research: ['图数据挖掘', '图数据质量', '图知识推理'],
    mbtiLabel: 'MBTI',
    mbti: 'INTP',
    hobbiesLabel: '兴趣爱好',
    hobbies: ['睡觉', '吉他', '创作'],
    publicationNote: '以下仅列出已经正式发表或录用的同行评审成果，书目信息以正式记录为准。',
    doiLabel: 'DOI',
    ccf: { conference: 'CCF-A 类会议', journal: 'CCF-A 类期刊' },
    manuscripts: [
      { title: 'OpenMind: Query-Time Diversification via Logical Rules', authors: ['Wenfei Fan', 'Kehan Pang', 'Dandan Lin'], status: '修改中' },
      { title: 'ComCE: Community-Aware Counterfactual Explanations for Graph Neural Network', authors: ['Kehan Pang', 'Dandan Lin'], status: '审稿中' }
    ],
    timelineLabels: { education: '教育', news: 'News', work: '科研与实习' },
    education: [
      {
        institution: '北京邮电大学',
        period: '2018.09 – 2022.07',
        program: '计算机学院 · 计算机科学与技术 · 工学学士',
        meta: 'GPA：3.7 / 4.0 · 专业排名：30 / 396（前 7.6%）',
        tone: 'blue',
        start: 0,
        end: 44.7
      },
      {
        institution: '北京航空航天大学',
        period: '2022.09 – 2027.04（预计）',
        program: '计算机学院 · 软件工程 · 博士研究生',
        tone: 'wine',
        start: 46.6,
        end: 100,
        advisorsLabel: '导师：',
        advisorSeparator: '、',
        advisors: [
          { name: '樊文飞', suffix: ' 院士', href: 'https://homepages.inf.ed.ac.uk/wenfei/' },
          { name: '陆平', suffix: ' 副教授', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ],
        researchLabel: '研究方向：',
        research: '图数据挖掘 · 图数据质量 · 图知识推理',
        separateResearch: true
      }
    ],
    news: [
      { date: '2019.12', event: '全国大学生数学竞赛', status: '一等奖', position: 14.5, side: 'upper', lane: 0, align: 'end', target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.02', event: 'MCM', status: 'Honorable Mention', position: 16.5, side: 'lower', lane: 0, align: 'end', target: '#honors', tone: 'red', kind: 'award' },
      { date: '2020.12', event: '全国大学生数学竞赛', status: '一等奖', position: 26.2, side: 'lower', lane: 1, target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.09', event: '创新创业训练计划', status: '市级项目奖', position: 23.3, side: 'upper', lane: 1, target: '#honors', tone: 'wine', kind: 'award-subtle' },
      { date: '2023.12', event: 'TODS · J.', status: 'Accepted', position: 61.2, side: 'upper', lane: 1, align: 'end', target: '#pub-tods-2024-entity-linking', tone: 'wine', kind: 'publication' },
      { date: '2024.07', event: 'TODS · J.', status: 'Accepted', position: 67.9, side: 'lower', lane: 0, align: 'end', target: '#pub-tods-2024-graph-errors', tone: 'wine', kind: 'publication' },
      { date: '2024.08', event: 'KDD · Conf.', status: 'Accepted', position: 68.9, side: 'upper', lane: 0, align: 'end', target: '#pub-kdd-2024-meld', tone: 'blue', kind: 'publication' },
      { date: '2025.05', event: 'ICDE · Conf.', status: 'Accepted', position: 77.7, side: 'upper', lane: 1, align: 'end', target: '#pub-icde-2025-label-imputation', tone: 'red', kind: 'publication' },
      { date: '2025.06', event: 'SIGMOD · Conf.', status: 'Accepted', position: 78.6, side: 'lower', lane: 1, align: 'end', target: '#pub-sigmod-2025-gpu-graph-cleaning', tone: 'blue', kind: 'publication' },
      { date: '2026.05', event: 'ICDE · Conf.', status: 'Accepted', position: 89.3, side: 'upper', lane: 0, align: 'end', target: '#pub-icde-2026-gnn-negatives', tone: 'wine', kind: 'publication' },
      { date: '2026.08', event: 'KDD · Conf.', status: 'Accepted', position: 92.2, side: 'lower', lane: 0, align: 'end', target: '#pub-kdd-2026-influence-functions', tone: 'red', kind: 'publication' }
    ],
    experience: [
      {
        organization: '深圳计算科学研究院',
        department: '基础研究部',
        role: '实习研究员',
        period: '2023.07 – 2024.01',
        detail: '参与图数据治理与增强、图神经网络可解释性、图计算系统，以及大规模数据场景下大语言模型的低资源适配等方向的研究。期间产出多篇学术论文，发表于 TODS、ICDE 等 CCF-A 类期刊与会议。',
        tone: 'blue', start: 56.3, end: 62.1, row: 0
      },
      {
        organization: '美团',
        role: '算法研究实习生',
        unit: '核心本地商业 / M17',
        period: '2024.09 – 2025.01',
        detail: '参与基座大语言模型预训练网页数据的清洗与质量评估，并负责本地 7B 模型的部署与全量微调；在网页数据清洗任务上，微调后模型的 ROUGE-L 达到 GPT-4 基线的约 96%。',
        tone: 'red', start: 69.9, end: 73.8, row: 1
      }
    ],
    awards: [
      '北京市大学生数学竞赛一等奖，2019、2020',
      '全国大学生数学竞赛一等奖，2019、2020',
      '北京邮电大学本科生奖学金，2019–2021',
      '北京航空航天大学计算机学院学业奖学金，2022–2025',
      '美国大学生数学建模竞赛 Honorable Mention，2020',
      '北京市级大学生创新创业训练计划项目奖项，2020'
    ],
    service: ['IEEE ICDE 外部审稿人，2024–2026'],
    patentTitle: '一种图数据增强方法、装置、设备及介质',
    patentStatus: '中国发明专利申请，2025',
    contactLead: '欢迎通过邮件联系科研交流或职业合作事宜。',
    emailLabel: '邮箱',
    alternativeEmailLabel: '备用邮箱',
    addressLabel: '地址',
    address: '北京市海淀区学院路37号 北京航空航天大学',
    addressLines: ['北京市海淀区学院路37号', '北京航空航天大学'],
    labelSeparator: '：',
    updated: '最后更新：2026'
  },
  ja: {
    localeName: '日本語',
    skip: '本文へ移動',
    navLabel: 'プロフィールへのリンク',
    languageLabel: '言語',
    themeToDark: 'ダークモードに切り替える',
    themeToLight: 'ライトモードに切り替える',
    tocLabel: '目次',
    heroPrimary: 'Kehan Pang',
    heroSecondary: '庞可涵',
    role: '博士課程',
    affiliation: 'School of Computer Science and Engineering',
    university: '北京航空航天大学',
    tagline: 'グラフデータマイニング、グラフデータ品質、グラフ知識推論を研究しています。',
    photoAlt: 'Kehan Pang のポートレート',
    railLinksLabel: '研究者プロフィールへのリンク',
    railLinks: { email: 'メール', cv: 'CV', scholar: 'Google Scholar', orcid: 'ORCID', github: 'GitHub' },
    sections: {
      about: 'プロフィール', publications: '研究業績', manuscripts: '投稿中・改訂中の原稿', timeline: '学歴・経歴',
      awards: '受賞歴', service: '学術活動', patent: '特許', contact: '連絡先'
    },
    about: [
      '北京航空航天大学（Beihang University）の School of Computer Science and Engineering に所属し、博士課程に在籍しています。指導教員は<a href="https://homepages.inf.ed.ac.uk/wenfei/" target="_blank" rel="noopener noreferrer">Wenfei Fan</a> 教授（中国科学院院士）と<a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">Ping Lu</a> 准教授です。',
      '私の研究は<strong>データ中心型AI（Data-Centric AI）</strong>を軸とし、グラフ学習における<strong>データ品質・知識発見・モデル信頼性</strong>に関する課題に取り組んでいます。主な研究テーマは、エンティティアライメント、データ拡張、グラフアソシエーションルールマイニング、GNNの説明可能性であり、LLMを用いたデータ処理と知識発見についても研究しています。'
    ],
    researchLabel: '研究分野',
    research: ['グラフデータマイニング', 'グラフデータ品質', 'グラフ知識推論'],
    mbtiLabel: 'MBTI',
    mbti: 'INTP',
    hobbiesLabel: '趣味',
    hobbies: ['睡眠', 'ギター', '小説・二次創作'],
    publicationNote: '査読を経て正式に発表または採択された成果のみを掲載しています。書誌情報は正式記録に基づきます。',
    doiLabel: 'DOI',
    ccf: { conference: 'CCF-A 会議', journal: 'CCF-A ジャーナル' },
    manuscripts: [
      { title: 'OpenMind: Query-Time Diversification via Logical Rules', authors: ['Wenfei Fan', 'Kehan Pang', 'Dandan Lin'], status: '改訂中' },
      { title: 'ComCE: Community-Aware Counterfactual Explanations for Graph Neural Network', authors: ['Kehan Pang', 'Dandan Lin'], status: '査読中' }
    ],
    timelineLabels: { education: '学歴', news: 'News', work: '研究・インターン経験' },
    education: [
      {
        institution: '北京郵電大学',
        period: '2018.09 – 2022.07',
        program: 'コンピュータサイエンス学院 · コンピュータ科学技術 · 工学学士',
        meta: 'GPA：3.7 / 4.0 · 専攻順位：30 / 396（上位 7.6%）',
        tone: 'blue',
        start: 0,
        end: 44.7
      },
      {
        institution: '北京航空航天大学',
        period: '2022.09 – 2027.04（予定）',
        program: 'コンピュータサイエンス学院 · ソフトウェア工学 · 博士課程',
        tone: 'wine',
        start: 46.6,
        end: 100,
        advisorsLabel: '指導教員：',
        advisorSeparator: '、',
        advisors: [
          { name: 'Wenfei Fan', suffix: ' 教授（中国科学院院士）', href: 'https://homepages.inf.ed.ac.uk/wenfei/' },
          { name: 'Ping Lu', suffix: ' 准教授', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ],
        researchLabel: '研究分野：',
        research: 'グラフデータマイニング · グラフデータ品質 · グラフ知識推論',
        separateResearch: true
      }
    ],
    news: [
      { date: '2019.12', event: '全国大学生数学競技会', status: '一等賞', position: 14.5, side: 'upper', lane: 0, align: 'end', target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.02', event: 'MCM', status: 'Honorable Mention', position: 16.5, side: 'lower', lane: 0, align: 'end', target: '#honors', tone: 'red', kind: 'award' },
      { date: '2020.12', event: '全国大学生数学競技会', status: '一等賞', position: 26.2, side: 'lower', lane: 1, target: '#honors', tone: 'blue', kind: 'award-subtle' },
      { date: '2020.09', event: 'イノベーションプログラム', status: '市級プロジェクト賞', position: 23.3, side: 'upper', lane: 1, target: '#honors', tone: 'wine', kind: 'award-subtle' },
      { date: '2023.12', event: 'TODS · J.', status: 'Accepted', position: 61.2, side: 'upper', lane: 1, align: 'end', target: '#pub-tods-2024-entity-linking', tone: 'wine', kind: 'publication' },
      { date: '2024.07', event: 'TODS · J.', status: 'Accepted', position: 67.9, side: 'lower', lane: 0, align: 'end', target: '#pub-tods-2024-graph-errors', tone: 'wine', kind: 'publication' },
      { date: '2024.08', event: 'KDD · Conf.', status: 'Accepted', position: 68.9, side: 'upper', lane: 0, align: 'end', target: '#pub-kdd-2024-meld', tone: 'blue', kind: 'publication' },
      { date: '2025.05', event: 'ICDE · Conf.', status: 'Accepted', position: 77.7, side: 'upper', lane: 1, align: 'end', target: '#pub-icde-2025-label-imputation', tone: 'red', kind: 'publication' },
      { date: '2025.06', event: 'SIGMOD · Conf.', status: 'Accepted', position: 78.6, side: 'lower', lane: 1, align: 'end', target: '#pub-sigmod-2025-gpu-graph-cleaning', tone: 'blue', kind: 'publication' },
      { date: '2026.05', event: 'ICDE · Conf.', status: 'Accepted', position: 89.3, side: 'upper', lane: 0, align: 'end', target: '#pub-icde-2026-gnn-negatives', tone: 'wine', kind: 'publication' },
      { date: '2026.08', event: 'KDD · Conf.', status: 'Accepted', position: 92.2, side: 'lower', lane: 0, align: 'end', target: '#pub-kdd-2026-influence-functions', tone: 'red', kind: 'publication' }
    ],
    experience: [
      {
        organization: 'Shenzhen Institute of Computing Sciences',
        department: '基礎研究部',
        role: '研究インターン',
        period: '2023年7月 – 2024年1月',
        detail: 'グラフデータガバナンスと拡張、GNNの説明可能性、グラフ計算システム、大規模データ環境におけるLLMの低リソース適応に関する研究に従事しました。関連成果はACM TODSおよびIEEE ICDEで発表されています。',
        tone: 'blue', start: 56.3, end: 62.1, row: 0
      },
      {
        organization: 'Meituan（美団）',
        role: 'アルゴリズム研究インターン',
        unit: 'Core Local Commerce / M17',
        period: '2024年9月 – 2025年1月',
        detail: '基盤LLMの事前学習に用いるWebデータのクリーニングと品質評価を行い、ローカル7Bモデルの導入および全パラメータファインチューニングを実施しました。Webデータクリーニングタスクでは、ファインチューニング後のモデルがGPT-4ベースラインの約96%に相当するROUGE-Lを達成しました。',
        tone: 'red', start: 69.9, end: 73.8, row: 1
      }
    ],
    awards: [
      '北京市大学生数学コンテスト 一等賞（2019、2020年）',
      '中国大学生数学コンテスト 一等賞（2019、2020年）',
      '北京郵電大学 学部奨学金（2019–2021年）',
      '北京航空航天大学 コンピュータサイエンス学院 学業奨学金（2022–2025年）',
      'Mathematical Contest in Modeling, Honorable Mention（2020年）',
      '北京市大学生イノベーション・起業訓練プログラム 表彰（2020年）'
    ],
    service: ['IEEE ICDE 外部査読者（2024–2026年）'],
    patentTitle: 'A Method, Apparatus, Device, and Medium for Graph Data Augmentation',
    patentStatus: '中国における発明特許出願（2025年）',
    contactLead: '研究交流・採用に関するご連絡は、下記のメールアドレスまでお願いいたします。',
    emailLabel: 'メール',
    alternativeEmailLabel: '予備メール',
    addressLabel: '所在地',
    address: '中国北京市海淀区学院路37号 北京航空航天大学',
    addressLines: ['中国北京市海淀区学院路37号', '北京航空航天大学'],
    labelSeparator: '：',
    updated: '最終更新：2026'
  }
}
