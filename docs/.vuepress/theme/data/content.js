export const links = {
  cvEn: '/cv/kehan-pang-cv-en.pdf',
  cvZh: '/cv/kehan-pang-cv-zh.pdf',
  cvAlias: '/kehan-pang-cv.pdf',
  github: 'https://github.com/KehanPang',
  scholar: 'https://scholar.google.com/citations?user=b3XVG_oAAAAJ'
}

export const languages = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'zh', label: '中文', path: '/zh/' },
  { code: 'ja', label: '日本語', path: '/ja/' }
]

export const publications = [
  {
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
    sections: {
      about: 'About Me', publications: 'Publications', manuscripts: 'Manuscripts / Under Review',
      education: 'Education', experience: 'Experience', awards: 'Honors & Awards',
      service: 'Academic Service', patent: 'Patent', contact: 'Contact'
    },
    about: [
      'I am a Ph.D. student in the School of Computer Science and Engineering at Beihang University (September 2022 – April 2027, expected). I am advised by <a href="https://cs.pku.edu.cn/info/1008/2707.htm" target="_blank" rel="noopener noreferrer">Prof. Wenfei Fan</a> (CAS Academician) and <a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">Assoc. Prof. Ping Lu</a>.',
      'My research focuses on <strong>Graph Data Mining</strong>, <strong>Graph Data Quality</strong>, <strong>Graph Data Cleaning</strong>, <strong>Graph Knowledge Reasoning</strong>, and <strong>Data-centric AI</strong>. Related work also involves GNN explainability and large language models for data processing.',
      'Before joining Beihang, I received my B.Eng. in Computer Science and Technology from Beijing University of Posts and Telecommunications in July 2022.'
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
    education: [
      {
        institution: 'Beihang University',
        degree: 'Ph.D. Student in Software Engineering',
        unit: 'School of Computer Science and Engineering',
        period: 'Sep. 2022 – Apr. 2027 (Expected)',
        notes: [],
        advisorsLabel: 'Advisors:',
        advisors: [
          { name: 'Prof. Wenfei Fan (CAS Academician)', href: 'https://cs.pku.edu.cn/info/1008/2707.htm' },
          { name: 'Assoc. Prof. Ping Lu', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ]
      },
      { institution: 'Beijing University of Posts and Telecommunications', degree: 'B.Eng. in Computer Science and Technology', unit: '', period: 'Sep. 2018 – Jul. 2022', notes: ['GPA: 3.7 / 4.0', 'Rank: 30 / 396 (Top 7.6%)'] }
    ],
    experience: [
      { organization: 'Meituan', role: 'Algorithm Research Intern · Core Local Commerce / M17', period: 'Sep. 2024 – Jan. 2025', bullets: ['Evaluated and cleaned web data for foundation-model pre-training.', 'Deployed a local 7B model and conducted full-parameter fine-tuning.', 'The fine-tuned model reached approximately 96% of the GPT-4 baseline ROUGE-L on the web-cleaning task.'] },
      { organization: 'Shenzhen Institute of Computing Sciences', role: 'Research Intern', period: 'Jul. 2023 – Jan. 2024', bullets: ['Worked on graph data management and enhancement, GNN interpretability, graph computing, and low-resource LLM adaptation.'] }
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
    sections: {
      about: '关于我', publications: '学术成果', manuscripts: '在审稿件', education: '教育经历',
      experience: '科研与工作经历', awards: '荣誉与奖励', service: '学术服务', patent: '专利', contact: '联系方式'
    },
    about: [
      '我现为北京航空航天大学计算机学院软件工程专业博士研究生（2022 年 9 月入学，预计 2027 年 4 月毕业），导师为<a href="https://cs.pku.edu.cn/info/1008/2707.htm" target="_blank" rel="noopener noreferrer">樊文飞院士</a>和<a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">陆平副教授</a>。',
      '我的研究主要关注<strong>图数据挖掘</strong>、<strong>图数据质量</strong>、<strong>图数据清洗</strong>、<strong>图知识推理</strong>和<strong>Data-centric AI</strong>。相关工作也涉及 GNN 可解释性以及大语言模型在数据处理中的应用。',
      '本科就读于北京邮电大学计算机科学与技术专业，于 2022 年 7 月获得工学学士学位。'
    ],
    researchLabel: '研究方向',
    research: ['图数据挖掘', '图数据质量', '图知识推理'],
    mbtiLabel: 'MBTI',
    mbti: 'INTP',
    hobbiesLabel: '兴趣爱好',
    hobbies: ['睡觉', '吉他', '小说与同人创作'],
    publicationNote: '以下仅列出已经正式发表或录用的同行评审成果，书目信息以正式记录为准。',
    doiLabel: 'DOI',
    ccf: { conference: 'CCF-A 类会议', journal: 'CCF-A 类期刊' },
    manuscripts: [
      { title: 'OpenMind: Query-Time Diversification via Logical Rules', authors: ['Wenfei Fan', 'Kehan Pang', 'Dandan Lin'], status: '修改中' },
      { title: 'ComCE: Community-Aware Counterfactual Explanations for Graph Neural Network', authors: ['Kehan Pang', 'Dandan Lin'], status: '审稿中' }
    ],
    education: [
      {
        institution: '北京航空航天大学',
        degree: '软件工程专业 博士研究生',
        unit: '计算机学院',
        period: '2022.09 – 2027.04（预计）',
        notes: [],
        advisorsLabel: '导师：',
        advisors: [
          { name: '樊文飞院士', href: 'https://cs.pku.edu.cn/info/1008/2707.htm' },
          { name: '陆平副教授', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ]
      },
      { institution: '北京邮电大学', degree: '计算机科学与技术 工学学士', unit: '', period: '2018.09 – 2022.07', notes: ['GPA：3.7 / 4.0', '专业排名：30 / 396（前 7.6%）'] }
    ],
    experience: [
      { organization: '美团', role: '算法研究实习生 · 核心本地商业 / M17', period: '2024.09 – 2025.01', bullets: ['参与 foundation model 预训练所需网页数据的清洗与质量评估。', '完成本地 7B 模型部署和全参数 fine-tuning。', '微调模型在网页清洗任务上的 ROUGE-L 达到 GPT-4 基线的约 96%。'] },
      { organization: '深圳计算科学研究院', role: '科研实习生', period: '2023.07 – 2024.01', bullets: ['研究图数据管理与增强、GNN 可解释性、图计算以及低资源大模型适配。'] }
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
    sections: {
      about: 'プロフィール', publications: '研究業績', manuscripts: '投稿中・改訂中の原稿', education: '学歴',
      experience: '研究・職務経験', awards: '受賞歴', service: '学術活動', patent: '特許', contact: '連絡先'
    },
    about: [
      '北京航空航天大学（Beihang University）School of Computer Science and Engineering の博士課程に在籍しています（2022年9月入学、2027年4月修了予定）。指導教員は<a href="https://cs.pku.edu.cn/info/1008/2707.htm" target="_blank" rel="noopener noreferrer">Wenfei Fan 教授</a>（中国科学院院士）と<a href="https://scse.buaa.edu.cn/info/1388/10436.htm" target="_blank" rel="noopener noreferrer">Ping Lu 准教授</a>です。',
      '主な研究対象は、<strong>グラフデータマイニング</strong>、<strong>グラフデータ品質</strong>、<strong>グラフデータクリーニング</strong>、<strong>グラフ知識推論</strong>、および<strong>Data-centric AI</strong>です。関連して、GNNの説明可能性や大規模言語モデルを用いたデータ処理にも取り組んでいます。',
      '北京郵電大学（Beijing University of Posts and Telecommunications）コンピュータサイエンス・技術専攻を卒業し、2022年7月に工学学士号を取得しました。'
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
    education: [
      {
        institution: '北京航空航天大学',
        degree: 'ソフトウェア工学専攻 博士課程',
        unit: 'School of Computer Science and Engineering',
        period: '2022年9月 – 2027年4月（修了予定）',
        notes: [],
        advisorsLabel: '指導教員：',
        advisors: [
          { name: 'Wenfei Fan 教授（中国科学院院士）', href: 'https://cs.pku.edu.cn/info/1008/2707.htm' },
          { name: 'Ping Lu 准教授', href: 'https://scse.buaa.edu.cn/info/1388/10436.htm' }
        ]
      },
      { institution: '北京郵電大学', degree: 'コンピュータサイエンス・技術専攻 工学学士', unit: '', period: '2018年9月 – 2022年7月', notes: ['GPA：3.7 / 4.0', '順位：30 / 396（上位 7.6%）'] }
    ],
    experience: [
      { organization: 'Meituan（美団）', role: 'アルゴリズム研究インターン · Core Local Commerce / M17', period: '2024年9月 – 2025年1月', bullets: ['基盤モデルの事前学習に用いるWebデータのクリーニングと品質評価に従事。', 'ローカル環境に7Bモデルを導入し、全パラメータ・ファインチューニングを実施。', 'Webデータクリーニング課題において、ファインチューニング後のモデルはGPT-4ベースラインの約96%に相当するROUGE-Lを達成。'] },
      { organization: 'Shenzhen Institute of Computing Sciences', role: '研究インターン', period: '2023年7月 – 2024年1月', bullets: ['グラフデータ管理・拡張、GNNの説明可能性、グラフ計算、低リソース環境におけるLLM適応に関する研究に従事。'] }
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
    labelSeparator: '：',
    updated: '最終更新：2026'
  }
}
