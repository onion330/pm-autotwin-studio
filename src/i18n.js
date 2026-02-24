/* ═══════════════════════════════════════════════════════════
   PM AutoTwin Studio — i18n (한국어 / English / 日本語)
   ═══════════════════════════════════════════════════════════ */

const translations = {
  ko: {
    // NAV
    'nav.problem': 'Problem',
    'nav.precision': '정밀도',
    'nav.usability': '사용성',
    'nav.trust': '신뢰',
    'nav.demo': '무료 데모',
    // HERO
    'hero.badge': 'GLOBAL 3D ASSET MANAGEMENT OS',
    'hero.title.1': '무거운 3D 파일,',
    'hero.title.2': '1분 만에 가벼운',
    'hero.title.3': "<em>'자산'</em>이 됩니다.",
    'hero.subtitle': '더 이상 3D 전문 디자이너에게 매번 변환을 부탁할 필요 없습니다.<br />마케터도, 기획자도 <strong>드래그 한 번</strong>이면 끝.<br />웹과 모바일에 당장 올릴 수 있도록 오토트윈이 알아서 최적화합니다.',
    'hero.cta.primary': '무료로 내 3D 파일 최적화해보기',
    'hero.cta.ghost': '엔터프라이즈 도입 문의',
    'hero.scroll': 'SCROLL TO EXPLORE',
    // STUDIO
    'studio.badge.name': 'AutoTwin Studio',
    'studio.title': "최적화를 넘어,<br />3D 자산 관리 OS로.<br /><em>'PM 오토트윈 스튜디오'</em>의 탄생",
    'studio.desc': '단순히 용량을 줄여주던 오토트윈이 압도적인 진화를 마쳤습니다.<br />필요한 3D 모델을 즉시 만들어내는 <strong>AI 3D 생성</strong>부터,<br />변환된 파일을 전 직원이 쉽게 검색하고 꺼내 쓰는 <strong>에셋 매니저</strong>까지.<br />이제 3D의 처음과 끝을 하나의 스튜디오에서 완벽하게 지휘하세요.',
    'studio.pipe.1.title': 'AI 3D 생성',
    'studio.pipe.1.desc': '텍스트/이미지 → 3D 모델',
    'studio.pipe.2.title': 'GNN 최적화',
    'studio.pipe.2.desc': '원클릭 자동 경량화',
    'studio.pipe.3.title': '에셋 매니저',
    'studio.pipe.3.desc': '전사적 3D 자산 관리',
    'studio.feature.gen.tag': 'AI 3D GENERATION',
    'studio.feature.gen.title': '필요한 3D 에셋,<br />AI로 즉시 생성하세요.',
    'studio.feature.gen.desc': '디지털트윈에는 고정밀 CAD 모델뿐 아니라 소화기, 표지판 같은 가벼운 에셋도 필요합니다. 그때마다 새로 디자인하면 비용이 치솟죠. 오토트윈 스튜디오의 생성 AI로 필요한 3D를 즉시 만들고, 그 자리에서 바로 최적화하세요.',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '"그 파일 어디 있죠?"<br />대시보드에서 바로 꺼내 쓰세요.',
    'studio.feature.mgr.desc': '기껏 가볍게 만든 3D 데이터, 담당자 외장하드에 방치하실 건가요? 오토트윈 스튜디오의 \'에셋 매니저\'는 전사적 3D 자산의 중앙 보관소입니다. 썸네일과 태그 검색으로 마케터도, 영업사원도 필요한 에셋을 1초 만에 찾아 즉시 실무에 투입하세요.',
    'studio.tag.marketing': '#마케팅용',
    'studio.tag.mobileweb': '#모바일웹',
    'studio.tag.cad': '#CAD원본',
    'studio.tag.rendering': '#렌더링',
    // PAIN
    'pain.title': '3D 최적화는 디지털트윈 자산화의<br />숨은 <em class="em-red">병목</em>입니다.',
    'pain.desc': '반복 작업과 검증이 일정과 비용을 잠식합니다. 그래서 <strong>자동화</strong>가 필요합니다.',
    'pain.ring.schedule': '일정 점유율',
    'pain.ring.schedule.sub': 'OPTIMIZATION WORKLOAD SHARE',
    'pain.ring.budget': '예산 점유율',
    'pain.ring.budget.sub': 'OPTIMIZATION COST SHARE',
    'pain.note': '수동 최적화는 복잡한 자산의 경우 수시간에서 수일 소요 ⓘ',
    'pain.solution': "오토트윈 스튜디오는 이 반복 최적화를<br /><em>'원클릭 워크플로우'</em>로 줄입니다.",
    'pain.benefit.1.tag': 'TIME-TO-VALUE',
    'pain.benefit.1.title': '가치 도달 시간 10배 단축',
    'pain.benefit.1.desc': '업로드에서 실시간 자산까지, 경쟁사 대비 10배 빠른 결과 도출',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': '전문가 개입 제로',
    'pain.benefit.2.desc': '파라미터 세팅·반복 테스트 없이, 비전문가도 드래그 앤 드롭 한 번이면 끝',
    'pain.benefit.3.tag': 'OPEX 절감',
    'pain.benefit.3.title': '인건비 중심 비용 혁신',
    'pain.benefit.3.desc': '서버비가 아닌 고급 인력의 시간을 절약 — 기업의 가장 큰 비용 항목 해결',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': '같은 최적화율, 우리는<br /><em>원형</em>을 지킵니다.',
    'precision.desc': "같은 70% 경량화를 해도 결과는 다릅니다.<br />PM AutoTwin은 <strong>더 빠른 속도</strong>와 <strong>독보적인 원형보존율</strong>을 동시에 달성합니다.<br />자체 검증 툴 <strong>'PM OmniMetric'</strong>이 변환 전후의 원형보존율을 소수점까지 정량 측정합니다.",
    'precision.image.alt': '경쟁사 vs PM AutoTwin 정밀도 비교',
    'precision.image.left': '경쟁사 에러',
    'precision.image.right': 'PM AutoTwin',
    'precision.bar1.title': '"용량 줄이면 깨지지 않나요?" — 직접 수치로 확인하세요.',
    'precision.bar1.label1': '경쟁사',
    'precision.bar1.label2': 'PM AutoTwin',
    'precision.bar1.badge': '3.3× 비 정밀',
    'precision.bar2.title': '데이터 무결성 (PNWE)',
    'precision.bar2.badge': '✓ 100× 안전',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': '우리 회사 환경에 딱 맞는<br />방식으로 <em>도입</em>하세요.',
    'zero.desc': '당장 접속해서 쓸 수 있는 빠르고 가벼운 SaaS, 외부 유출을 원천 차단하는 대기업 내부망용 온프레미스,<br />귀사의 서비스에 직접 붙여 자동화하는 전처리 API까지. 원하시는 모든 인프라를 지원합니다.',
    'zero.deploy.saas': '10분 만에 세팅 · 즉시 사용',
    'zero.deploy.onprem': '에어갭 보안망 · 사내 서버',
    'zero.deploy.api': '전처리 파이프라인 · 확장',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': '글로벌 3D의 잣대,<br />오토트윈이 품질의<br /><em>기준</em>을 만듭니다.',
    'trust.desc': '어떤 3D가 진짜 \'잘 만들어진\' 데이터인지 헷갈리셨나요?<br />오토트윈은 국제표준화기구 IEEE의 부의장사로서 글로벌 3D 품질 측정 기준(PAR 제안)을 직접 설계하고 있습니다.<br />전 세계가 신뢰할 표준 엔진에 귀사의 데이터를 맡기세요.',
    'trust.ieee.label': 'IEEE P3079.6',
    'trust.ieee.title': 'Official Reference SW',
    'trust.ieee.sub': '국제 표준 공식 참조 소프트웨어',
    'trust.ieee.stat1.label': '3D 품질 측정 표준',
    'trust.ieee.stat2.label': '3D 최적화 표준',
    'trust.ieee.stat3.num': '부의장사',
    'trust.ieee.stat3.label': 'IEEE WG 리더십',
    'trust.results.title': '기술은 <em>숫자</em>로 증명됩니다',
    'trust.result1.company': '현대자동차 HMGICS',
    'trust.result1.desc': '로봇 암 디지털 트윈',
    'trust.result1.kpi1': '경량화',
    'trust.result1.kpi2': '렌더링↑',
    'trust.result2.company': 'SK에코플랜트',
    'trust.result2.desc': '배터리 하우징 초경량화',
    'trust.result2.kpi1': '경량화',
    'trust.result2.kpi2': '처리시간',
    'trust.result3.year': '2025 과학기술정보통신부',
    'trust.result3.title': '장관상 수상',
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    // CTA
    'cta.title': "당신의 3D 데이터가 <em>'자본'</em>으로<br />바뀌는 시간, <em>단 1분.</em>",
    'cta.desc': 'PM 오토트윈 스튜디오의 데모 신청 가능합니다.',
    'cta.btn.primary': '기업 맞춤형 데모 신청하기',
    'cta.btn.ghost': '다시 탐색하기',
    // FOOTER
    'footer.copyright': '© 2025 PocketMemory Inc. All rights reserved.',
  },

  en: {
    // NAV
    'nav.problem': 'Problem',
    'nav.precision': 'Precision',
    'nav.usability': 'Usability',
    'nav.trust': 'Trust',
    'nav.demo': 'Free Demo',
    // HERO
    'hero.badge': 'GLOBAL 3D ASSET MANAGEMENT OS',
    'hero.title.1': 'Heavy 3D files,',
    'hero.title.2': 'lightweight assets',
    'hero.title.3': "in just <em>1 minute.</em>",
    'hero.subtitle': 'No more asking 3D specialists for every conversion.<br />Marketers & planners—just <strong>one drag & drop</strong>.<br />AutoTwin automatically optimizes for web & mobile deployment.',
    'hero.cta.primary': 'Optimize my 3D file for free',
    'hero.cta.ghost': 'Enterprise Inquiry',
    'hero.scroll': 'SCROLL TO EXPLORE',
    // STUDIO
    'studio.badge.name': 'AutoTwin Studio',
    'studio.title': "Beyond optimization,<br />a 3D Asset Management OS.<br />The birth of <em>'PM AutoTwin Studio'</em>",
    'studio.desc': 'AutoTwin has evolved from a simple optimizer into a powerful platform.<br />From <strong>AI 3D Generation</strong> that instantly creates 3D models,<br />to an <strong>Asset Manager</strong> that lets every employee search and use assets.<br />Command every step of 3D — from creation to delivery — in one studio.',
    'studio.pipe.1.title': 'AI 3D Gen',
    'studio.pipe.1.desc': 'Text/Image → 3D Model',
    'studio.pipe.2.title': 'GNN Optimize',
    'studio.pipe.2.desc': 'One-click auto-reduction',
    'studio.pipe.3.title': 'Asset Manager',
    'studio.pipe.3.desc': 'Enterprise 3D asset mgmt',
    'studio.feature.gen.tag': 'AI 3D GENERATION',
    'studio.feature.gen.title': 'Need a 3D asset?<br />Generate it instantly with AI.',
    'studio.feature.gen.desc': 'Digital twins require not just high-precision CAD models, but also lightweight assets like fire extinguishers and signs. Redesigning every time drives up costs. With AutoTwin Studio\'s generative AI, create 3D assets on-demand and optimize them on the spot.',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '"Where\'s that file?"<br />Grab it from the dashboard instantly.',
    'studio.feature.mgr.desc': 'Don\'t let optimized 3D data collect dust on someone\'s hard drive. AutoTwin Studio\'s Asset Manager is a centralized repository for enterprise 3D assets. With thumbnail and tag search, marketers and sales reps can find the asset they need in 1 second.',
    'studio.tag.marketing': '#Marketing',
    'studio.tag.mobileweb': '#MobileWeb',
    'studio.tag.cad': '#CAD-Source',
    'studio.tag.rendering': '#Rendering',
    // PAIN
    'pain.title': '3D optimization is the hidden<br /><em class="em-red">bottleneck</em> of digital twin adoption.',
    'pain.desc': 'Repetitive work and validation eat into timelines and budgets. That\'s why you need <strong>automation</strong>.',
    'pain.ring.schedule': 'Schedule Share',
    'pain.ring.schedule.sub': 'OPTIMIZATION WORKLOAD SHARE',
    'pain.ring.budget': 'Budget Share',
    'pain.ring.budget.sub': 'OPTIMIZATION COST SHARE',
    'pain.note': 'Manual optimization can take hours to days for complex assets ⓘ',
    'pain.solution': "AutoTwin Studio reduces repetitive optimization<br />to a <em>'one-click workflow'</em>.",
    'pain.benefit.1.tag': 'TIME-TO-VALUE',
    'pain.benefit.1.title': '10× faster time-to-value',
    'pain.benefit.1.desc': 'From upload to real-time asset — 10× faster results than competitors',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': 'Zero expert intervention',
    'pain.benefit.2.desc': 'No parameter tuning or repeated tests — even non-experts just drag & drop',
    'pain.benefit.3.tag': 'OPEX SAVINGS',
    'pain.benefit.3.title': 'Labor-cost-driven savings',
    'pain.benefit.3.desc': 'Save expensive human hours, not just server costs — solving enterprise\'s largest expense',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': 'Same optimization rate, we preserve<br />the <em>original</em> shape.',
    'precision.desc': "Even with the same 70% reduction, results differ.<br />PM AutoTwin achieves <strong>faster speed</strong> and <strong>unmatched shape preservation</strong> simultaneously.<br />Our proprietary tool <strong>'PM OmniMetric'</strong> quantifies shape preservation to the decimal point.",
    'precision.image.alt': 'Competitor vs PM AutoTwin Precision Comparison',
    'precision.image.left': 'Competitor Error',
    'precision.image.right': 'PM AutoTwin',
    'precision.bar1.title': '"Won\'t it break when compressed?" — See the numbers.',
    'precision.bar1.label1': 'Competitor',
    'precision.bar1.label2': 'PM AutoTwin',
    'precision.bar1.badge': '3.3× more precise',
    'precision.bar2.title': 'Data Integrity (PNWE)',
    'precision.bar2.badge': '✓ 100× safer',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': 'Deploy it <em>your way</em>,<br />perfectly suited to your environment.',
    'zero.desc': 'Fast & light SaaS for instant access, air-gapped on-premise for enterprise security,<br />or preprocessing API to plug into your pipeline. We support every infrastructure.',
    'zero.deploy.saas': '10-min setup · Instant use',
    'zero.deploy.onprem': 'Air-gap security · On-site server',
    'zero.deploy.api': 'Pipeline integration · Scalable',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': 'The global 3D benchmark.<br />AutoTwin sets the<br /><em>standard</em> for quality.',
    'trust.desc': 'Confused about what makes \'good\' 3D data?<br />AutoTwin, as IEEE Vice Chair, is directly designing the global 3D quality measurement standard (PAR proposal).<br />Trust your data to the standard engine the world relies on.',
    'trust.ieee.label': 'IEEE P3079.6',
    'trust.ieee.title': 'Official Reference SW',
    'trust.ieee.sub': 'International Standard Reference Software',
    'trust.ieee.stat1.label': '3D Quality Standard',
    'trust.ieee.stat2.label': '3D Optimization Standard',
    'trust.ieee.stat3.num': 'Vice Chair',
    'trust.ieee.stat3.label': 'IEEE WG Leadership',
    'trust.results.title': 'Technology proven by <em>numbers</em>',
    'trust.result1.company': 'Hyundai Motor HMGICS',
    'trust.result1.desc': 'Robot arm digital twin',
    'trust.result1.kpi1': 'Reduction',
    'trust.result1.kpi2': 'Rendering↑',
    'trust.result2.company': 'SK ecoplant',
    'trust.result2.desc': 'Battery housing ultra-optimization',
    'trust.result2.kpi1': 'Reduction',
    'trust.result2.kpi2': 'Processing',
    'trust.result3.year': '2025 Ministry of Science & ICT',
    'trust.result3.title': "Minister's Award",
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    // CTA
    'cta.title': "Your 3D data becomes <em>'capital'</em><br />in just <em>1 minute.</em>",
    'cta.desc': 'PM AutoTwin Studio demo is available for request.',
    'cta.btn.primary': 'Request Custom Enterprise Demo',
    'cta.btn.ghost': 'Explore Again',
    // FOOTER
    'footer.copyright': '© 2025 PocketMemory Inc. All rights reserved.',
  },

  ja: {
    // NAV
    'nav.problem': '課題',
    'nav.precision': '精度',
    'nav.usability': '使いやすさ',
    'nav.trust': '信頼',
    'nav.demo': '無料デモ',
    // HERO
    'hero.badge': 'GLOBAL 3D ASSET MANAGEMENT OS',
    'hero.title.1': '重い3Dファイルを、',
    'hero.title.2': 'たった1分で軽量な',
    'hero.title.3': "<em>「資産」</em>に変換。",
    'hero.subtitle': '3D専門デザイナーに毎回変換を依頼する必要はありません。<br />マーケターも企画者も<strong>ドラッグ一回</strong>で完了。<br />WebとモバイルにすぐアップできるようAutoTwinが自動最適化します。',
    'hero.cta.primary': '無料で3Dファイルを最適化する',
    'hero.cta.ghost': 'エンタープライズ導入相談',
    'hero.scroll': 'SCROLL TO EXPLORE',
    // STUDIO
    'studio.badge.name': 'AutoTwin Studio',
    'studio.title': "最適化を超え、<br />3Dアセット管理OSへ。<br /><em>「PM AutoTwin Studio」</em>の誕生",
    'studio.desc': '容量を削減するだけだったAutoTwinが圧倒的な進化を遂げました。<br />必要な3Dモデルを即座に生成する<strong>AI 3D生成</strong>から、<br />変換ファイルを全社員が検索・利用できる<strong>アセットマネージャー</strong>まで。<br />3Dの最初から最後まで、一つのスタジオで完璧に指揮しましょう。',
    'studio.pipe.1.title': 'AI 3D生成',
    'studio.pipe.1.desc': 'テキスト/画像 → 3Dモデル',
    'studio.pipe.2.title': 'GNN最適化',
    'studio.pipe.2.desc': 'ワンクリック自動軽量化',
    'studio.pipe.3.title': 'アセットマネージャー',
    'studio.pipe.3.desc': '全社3Dアセット管理',
    'studio.feature.gen.tag': 'AI 3D GENERATION',
    'studio.feature.gen.title': '必要な3Dアセット、<br />AIで即座に生成。',
    'studio.feature.gen.desc': 'デジタルツインには高精度CADモデルだけでなく、消火器や看板などの軽量アセットも必要です。その度にデザインすればコストが急増します。AutoTwin Studioの生成AIで必要な3Dを即座に作り、その場で最適化しましょう。',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '「あのファイルどこ？」<br />ダッシュボードからすぐ取り出せます。',
    'studio.feature.mgr.desc': 'せっかく軽量化した3Dデータを担当者の外付けHDDに放置しますか？AutoTwin Studioの「アセットマネージャー」は全社3Dアセットの中央保管庫です。サムネイルとタグ検索でマーケターも営業も必要なアセットを1秒で見つけ、即実務に投入できます。',
    'studio.tag.marketing': '#マーケティング用',
    'studio.tag.mobileweb': '#モバイルWeb',
    'studio.tag.cad': '#CAD元データ',
    'studio.tag.rendering': '#レンダリング',
    // PAIN
    'pain.title': '3D最適化はデジタルツイン資産化の<br />隠れた<em class="em-red">ボトルネック</em>です。',
    'pain.desc': '繰り返し作業と検証がスケジュールとコストを侵食します。だから<strong>自動化</strong>が必要です。',
    'pain.ring.schedule': 'スケジュール占有率',
    'pain.ring.schedule.sub': 'OPTIMIZATION WORKLOAD SHARE',
    'pain.ring.budget': '予算占有率',
    'pain.ring.budget.sub': 'OPTIMIZATION COST SHARE',
    'pain.note': '手動最適化は複雑なアセットの場合、数時間から数日かかります ⓘ',
    'pain.solution': "AutoTwin Studioはこの繰り返し最適化を<br /><em>「ワンクリックワークフロー」</em>に短縮します。",
    'pain.benefit.1.tag': 'TIME-TO-VALUE',
    'pain.benefit.1.title': '価値到達時間を10倍短縮',
    'pain.benefit.1.desc': 'アップロードからリアルタイムアセットまで、競合比10倍速い結果',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': '専門家介入ゼロ',
    'pain.benefit.2.desc': 'パラメータ設定・繰り返しテスト不要、非専門家もドラッグ&ドロップで完了',
    'pain.benefit.3.tag': 'OPEX削減',
    'pain.benefit.3.title': '人件費中心のコスト革新',
    'pain.benefit.3.desc': 'サーバー費ではなく高級人材の時間を節約 — 企業最大のコスト項目を解決',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': '同じ最適化率、私たちは<br /><em>原型</em>を守ります。',
    'precision.desc': "同じ70%軽量化でも結果は異なります。<br />PM AutoTwinは<strong>より速い速度</strong>と<strong>独自の原型保存率</strong>を同時に達成します。<br />自社検証ツール<strong>「PM OmniMetric」</strong>が変換前後の原型保存率を小数点まで定量測定します。",
    'precision.image.alt': '競合 vs PM AutoTwin 精度比較',
    'precision.image.left': '競合エラー',
    'precision.image.right': 'PM AutoTwin',
    'precision.bar1.title': '「容量を減らすと壊れませんか？」— 数値で確認。',
    'precision.bar1.label1': '競合',
    'precision.bar1.label2': 'PM AutoTwin',
    'precision.bar1.badge': '3.3× より精密',
    'precision.bar2.title': 'データ完全性 (PNWE)',
    'precision.bar2.badge': '✓ 100× 安全',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': '御社の環境にぴったり合う<br />方式で<em>導入</em>してください。',
    'zero.desc': 'すぐに接続して使える軽快なSaaS、外部漏洩を完全遮断する大企業内部網用オンプレミス、<br />御社のサービスに直接接続して自動化する前処理APIまで。すべてのインフラを支援します。',
    'zero.deploy.saas': '10分セットアップ · 即時利用',
    'zero.deploy.onprem': 'エアギャップセキュリティ · 社内サーバー',
    'zero.deploy.api': '前処理パイプライン · 拡張',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': 'グローバル3Dの基準、<br />AutoTwinが品質の<br /><em>スタンダード</em>を作ります。',
    'trust.desc': 'どの3Dが本当に「良い」データか迷っていませんか？<br />AutoTwinはIEEE副議長社として、グローバル3D品質測定基準（PAR提案）を直接設計しています。<br />世界が信頼する標準エンジンに御社のデータをお任せください。',
    'trust.ieee.label': 'IEEE P3079.6',
    'trust.ieee.title': 'Official Reference SW',
    'trust.ieee.sub': '国際標準公式参照ソフトウェア',
    'trust.ieee.stat1.label': '3D品質測定標準',
    'trust.ieee.stat2.label': '3D最適化標準',
    'trust.ieee.stat3.num': '副議長社',
    'trust.ieee.stat3.label': 'IEEE WGリーダーシップ',
    'trust.results.title': '技術は<em>数字</em>で証明されます',
    'trust.result1.company': '現代自動車 HMGICS',
    'trust.result1.desc': 'ロボットアームデジタルツイン',
    'trust.result1.kpi1': '軽量化',
    'trust.result1.kpi2': 'レンダリング↑',
    'trust.result2.company': 'SKエコプラント',
    'trust.result2.desc': 'バッテリーハウジング超軽量化',
    'trust.result2.kpi1': '軽量化',
    'trust.result2.kpi2': '処理時間',
    'trust.result3.year': '2025年 科学技術情報通信部',
    'trust.result3.title': '大臣賞受賞',
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    // CTA
    'cta.title': "あなたの3Dデータが<em>「資本」</em>に<br />変わる時間、<em>たった1分。</em>",
    'cta.desc': 'PM AutoTwin Studioのデモ申請が可能です。',
    'cta.btn.primary': 'カスタムエンタープライズデモを申請',
    'cta.btn.ghost': 'もう一度探索する',
    // FOOTER
    'footer.copyright': '© 2025 PocketMemory Inc. All rights reserved.',
  }
};

let currentLang = 'ko';

export function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('pm-autotwin-lang', lang);
  document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'ko';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = translations[lang][key];
    if (val === undefined) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

export function getLang() {
  return currentLang;
}

export function initI18n() {
  const saved = localStorage.getItem('pm-autotwin-lang');
  const browserLang = navigator.language.slice(0, 2);
  const lang = saved || (['ko', 'en', 'ja'].includes(browserLang) ? browserLang : 'ko');

  // Setup language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  setLang(lang);
}
