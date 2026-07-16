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
    'nav.company': '포켓메모리',
    'nav.demo': '무료 사용하기',
    // HERO
    'hero.badge': '⚡ PHYSICAL AI 국가전략 시대',
    'hero.title.1': 'Physical AI 시대,',
    'hero.title.2': '시뮬레이션이 중요합니다.',
    'hero.title.3': '그 시뮬레이션 시간의 73%가,',
    'hero.title.4': '3D 데이터 준비(전처리)에 소모됩니다.',
    'hero.subtitle.tagline': '원형을 지키면서, 가장 쉽게 가벼워지는 방법.',
    'hero.subtitle': '무거운 CAD 파일, 1분 만에 가벼운 ‘자산’이 됩니다.',
    'hero.cta.primary': '무료 사용하기',
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
    'studio.feature.opt.tag': 'GNN OPTIMIZATION',
    'studio.feature.opt.title': '상용 엔진이 멈추는 초대용량,<br />오토트윈은 막힘없이 돌파합니다.',
    'studio.feature.opt.desc': '1GB 이상의 Full-Assembly 산업 도면도 분할 없이 한 번에.<br />기존 툴 대비 <strong>4.1배 빠른 속도</strong>로 전처리 병목을 해소합니다.',
    'studio.opt.label.before': 'BEFORE (Original)',
    'studio.opt.label.after': 'AFTER (Optimized)',
    'studio.opt.slider.hint': '드래그하여 비교하세요',
    'studio.feature.opt.format': 'PLY · USD · STP · STL · GLB · FBX 등 6종 포맷 임포트 및 크로스 변환 지원',
    'studio.feature.opt.metadata': '계층 구조 · 태그 · 재질 등 메타데이터 무손실 보존 (Lossless Metadata Preservation)',
    'studio.feature.ply.tag': 'SCAN DATA GATEWAY',
    'studio.feature.ply.title': '초대용량 3D 스캔 데이터(PLY),<br />가상 환경과 AI를 향한 필수 관문',
    'studio.feature.ply.desc': '렌더링을 멈추게 하는 수십 GB의 거대한 현실 환경(스캔) 데이터.<br />PM 오토트윈은 단순 무작위 삭제를 넘어, 원본의 <strong>뼈대와 형상을 완벽히 보존</strong>하며 용량을 <strong>1/10로 압축</strong>하는 \'지능형 최적화 게이트웨이\'\ub97c 제공합니다.',
    'studio.ply.gauge.label': '지능형 압축률',
    'studio.ply.badge': 'Omniverse · AI Ready',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '"그 파일 어디 있죠?"<br />대시보드에서 바로 꺼내 쓰세요.',
    'studio.feature.mgr.desc': '기껏 가볍게 만든 3D 데이터, 담당자 외장하드에 방치하실 건가요? 오토트윈 스튜디오의 \'에셋 매니저\'는 전사적 3D 자산의 중앙 보관소입니다. 썸네일과 태그 검색으로 마케터도, 영업사원도 필요한 에셋을 1초 만에 찾아 즉시 실무에 투입하세요.',
    'studio.feature.mgr.list1': 'End-to-End 자산 운영 · PM Hub 중앙 관리',
    'studio.feature.mgr.list2': '최적화 이력·실시간 피드백·보안 공유 링크로 B2B 협업 극대화',
    'studio.feature.mgr.list3': '설치 없이 브라우저에서 3D 모델 즉시 확인·검토',
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
    'pain.benefit.1.title': '글로벌 리딩 툴 대비 평균 4.4배 빠른 결과',
    'pain.benefit.1.desc': '업로드에서 실시간 자산까지, 글로벌 리딩 툴 대비 평균 4.4배 빠른 결과 도출 <small>*Car engine(132MB) 파일 기준, 2026.02 자체 벤치마크</small>',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': '전문가 개입 제로',
    'pain.benefit.2.desc': '파라미터 세팅·반복 테스트 없이, 비전문가도 드래그 앤 드롭 한 번이면 끝',
    'pain.benefit.3.tag': 'OPEX 절감',
    'pain.benefit.3.title': '인건비 중심 비용 혁신',
    'pain.benefit.3.desc': '서버비가 아닌 고급 인력의 시간을 절약 — 기업의 가장 큰 비용 항목 해결',
    'pain.stat1.desc': '3D 데이터 준비가<br />프로젝트 시간에 차지<sup>*1</sup>',
    'pain.stat2.desc': '개발 공정 품질 이슈의<br />원인이 3D 데이터<sup>*2</sup>',
    'pain.stats.sources': '*1 Siemens Tech-Clarity &nbsp;/&nbsp; *2 McKinsey &amp; Company',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': '같은 최적화율, 우리는<br /><em>원형</em>을 지킵니다.',
    'precision.desc': '같은 60% 경량화를 해도 결과는 다릅니다.<br />PM AutoTwin은 <strong>97.64/100</strong>, 글로벌 리딩 툴은 <strong>80.98/100</strong>.<br />자체 검증 툴 <strong>\'PM OmniMetric\'</strong>이 변환 전후의 원형보존율을 소수점까지 정량 측정합니다.',
    'precision.image.alt': '글로벌 리딩 툴 vs PM AutoTwin 정밀도 비교',
    'precision.image.left': '글로벌 리딩 툴',
    'precision.image.right': 'PM AutoTwin',
    'precision.competitor.label': '글로벌 리딩 툴',
    'precision.score.competitor': '글로벌 리딩 툴 원형보존 점수',
    'precision.score.pm': 'PM AutoTwin 원형보존 점수',
    'precision.kpi1.title': '원형보존 종합점수 (Fidelity Score)',
    'precision.kpi1.badge': '+16.66점 우수',
    'precision.kpi2.title': '텍스처 보존율 (Texture Visual Score)',
    'precision.kpi2.badge': '+45.29%p 우수',
    'precision.kpi3.title': '구조 무결성 (PNWE — Non-Watertight)',
    'precision.kpi3.badge': '1,031× 안전',
    'precision.bottom.badge': '🏅 압도적 원형 보존율',
    'precision.disclaimer': '*동일 60% 최적화 조건, PM OmniMetric 분석 리포트(2026.06.17) 기준',
    'precision.cta': '내 파일로 직접 확인해보기',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': '우리 회사 환경에 딱 맞는<br />방식으로 <em>도입</em>하세요.',
    'zero.desc': '당장 접속해서 쓸 수 있는 빠르고 가벼운 SaaS, 외부 유출을 원천 차단하는 대기업 내부망용 온프레미스,<br />귀사의 서비스에 직접 붙여 자동화하는 전처리 API까지. 원하시는 모든 인프라를 지원합니다.',
    'zero.deploy.saas': '10분 만에 세팅 · 즉시 사용',
    'zero.deploy.onprem': '에어갭 보안망 · 사내 서버',
    'zero.deploy.api': '전처리 파이프라인 · 확장',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': '글로벌 3D의 잣대,<br />오토트윈이 품질의<br /><em>기준</em>을 제안합니다.',
    'trust.desc': '어떤 3D가 진짜 \'잘 만들어진\' 데이터인지 헷갈리셨나요?<br /><br />오토트윈은 국제표준화기구 IEEE에 <strong>3D 품질 측정 및 최적화 표준(P3079.5/6) 제안을 준비하고 있습니다.</strong><br />아직 아무도 정의하지 않은 3D 품질의 기준,<br />그 첫 제안자가 되기 위한 과정입니다.<br /><br />전 세계가 주목하는 차세대 표준 프로젝트에 귀사의 데이터를 맡기세요.',
    'trust.ieee.label': 'IEEE P3079.5/6',
    'trust.ieee.title': 'Standard Proposal in Preparation',
    'trust.ieee.sub': '표준 제안 준비 중',
    'trust.ieee.stat1.label': '3D 품질 측정 표준(안)',
    'trust.ieee.stat2.label': '3D 최적화 표준(안)',
    'trust.ieee.stat3.num': 'PAR 제출 준비 중',
    'trust.ieee.stat3.label': '표준 프로젝트 제안 준비',
    'trust.results.title': '기술은 <em>숫자</em>로 증명됩니다',
    'trust.result1.company': '현대자동차 HMGICS',
    'trust.result1.desc': '물류 디지털 트윈',
    'trust.result1.kpi1': '경량화',
    'trust.result1.kpi2': '렌더링↑',
    'trust.result2.company': 'SK에코플랜트',
    'trust.result2.desc': '배터리 하우징 초경량화',
    'trust.result2.kpi1': '경량화',
    'trust.result2.kpi2': '처리시간',
    'trust.result3.year': '2025 과학기술정보통신부',
    'trust.result3.title': '장관상 수상',
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    'trust.results.disclaimer': '※ 본 성과는 해당 기업과의 프로젝트 수행 과정에서 포켓메모리의 기술력을 적용하고 실무적으로 검증한 사례를 바탕으로 구성되었습니다.',
    // VIDEO
    'video.title': '직접 확인하세요, <em>15초의 마법</em>',
    'video.desc': '복잡한 3D 모델이 클릭 한 번으로 최적화되는 과정을 영상으로 확인하세요.',
    // AUTOTWIN LITE BANNER
    'autotwin.banner.title': '효율적 비용으로 빠르게 3D 최적화만 필요하다면?',
    'autotwin.banner.desc': 'SaaS 기반 경량화 전문 서비스 — 더 편하게, 더 합리적으로.',
    'autotwin.banner.cta': '오토트윈 무료로 시작하기',
    'autotwin.popup.title': 'PM AutoTwin',
    'autotwin.popup.subtitle': 'SaaS 기반 3D 최적화 서비스',
    'autotwin.popup.desc': '불필요한 기능 없이, 3D 최적화에만 집중한 경량 SaaS 서비스입니다.<br />원클릭으로 빠르게 경량화하고, 합리적인 가격으로 이용하세요.',
    'autotwin.popup.feat1': '⚡ 원클릭 자동 최적화',
    'autotwin.popup.feat2': '💰 합리적인 가격',
    'autotwin.popup.feat3': '☁️ SaaS — 설치 없이 즉시 사용',
    'autotwin.popup.cta': '무료로 시작하기',
    // CTA
    'cta.title': "당신의 3D 데이터가 <em>'자본'</em>으로<br />바뀌는 시간, <em>단 1분.</em>",
    'cta.desc': 'PM 오토트윈 스튜디오가 정식 오픈했습니다. 지금 무료로 시작하세요.',
    'cta.desc.enterprise': 'On-Premise · Enterprise 도입을 검토 중이신가요?<br />전담 컨설턴트가 귀사 환경에 맞는 최적의 구성을 제안드립니다.',
    'cta.btn.primary': '무료 사용하기',
    'cta.btn.ghost': '다시 탐색하기',
    'cta.form.label': '🚀 도입 문의',
    'cta.form.badge': 'CONTACT US',
    'cta.form.title': '비즈니스 혁신을 위한 첫걸음',
    'cta.form.subtitle': '궁금하신 프로젝트나 견적 문의를 남겨주시면 맞춤형 상세 제안서를 보내드립니다.',
    'cta.form.name.label': '이름 / 회사명 <span class="required">*</span>',
    'cta.form.name.placeholder': '이름 / 회사명',
    'cta.form.company.label': '회사 / 기관명',
    'cta.form.company.placeholder': '회사 / 기관명',
    'cta.form.email.label': '이메일 <span class="required">*</span>',
    'cta.form.email.placeholder': '이메일 주소',
    'cta.form.phone.label': '연락처 <span class="required">*</span>',
    'cta.form.phone.placeholder': '연락처',
    'cta.form.message.label': '문의 내용 <span class="required">*</span>',
    'cta.form.message.placeholder': '궁금하신 내용을 자유롭게 작성해주세요',
    'cta.form.consent': '<a href="/privacy.html" target="_blank">개인정보 수집 및 이용</a>에 동의합니다. (이름, 이메일, 연락처, 회사명, 문의내용을 상담 목적으로 수집합니다)',
    'cta.form.submit': '상담 신청하기',
    'cta.form.success': '✅ 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.',
    'cta.form.error': '❌ 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
    // FOOTER
    'footer.tagline': 'Automated 3D Optimization for the Future.',
    'footer.product': 'Product',
    'footer.product.features': '주요 기능',
    'footer.product.cases': '적용 사례',
    'footer.product.pricing': '요금제',
    'footer.product.enterprise': '엔터프라이즈',
    'footer.legal': '법적 고지',
    'footer.legal.privacy': '개인정보 처리방침',
    'footer.legal.terms': '서비스 이용약관',
    'footer.copyright': '© 2026 <a href="https://www.pocketmemory.co.kr/" target="_blank" class="footer__pm-link">POCKET MEMORY</a> Inc. All rights reserved.',
    'hero.footnote': '*Sandia National Labs 연구 기준 / 경량 샘플 파일 기준 최대 처리 속도',
    'studio.feature.opt.footnote.gnn': '* Vertex-GNN: 사전학습 신경망이 아닌, 그래프 신경망(GNN) 방법론에서 착안해 독자 개발한 최적화 엔진입니다.',
    'studio.feature.opt.footnote.ply': '*PLY PLY 포맷 변환 기능은 연구개발 중입니다.',
    'footer.tel': 'Tel: 02-2088-1855',
    'footer.address': 'Address: 서울특별시 영등포구 문래동6가 33 에이스엔에스타워 1216호',
    'seo.title': 'PM AutoTwin Studio — 무거운 3D 데이터, 클릭 한 번으로 가벼운 \'자산\'이 됩니다.',
    'seo.description': 'PM AutoTwin Studio는 독자적 GNN 알고리즘과 IEEE 표준이 결합된 글로벌 3D 자산 관리 OS입니다. 98% 폴리곤 최적화, 82% 원형 보존, 15초 처리.',
    'seo.keywords': 'PM AutoTwin, 3D 최적화, 디지털 트윈, GNN, IEEE, 3D 자산 관리, POCKET MEMORY, 포켓메모리, digital twin, 3D optimization, mesh optimization',
    'seo.og.title': 'PM AutoTwin Studio — 3D 자산 관리 OS',
    'seo.og.description': '독자적 GNN 알고리즘과 IEEE 표준이 결합된 글로벌 3D 자산 관리 OS. 98% 폴리곤 최적화, 82% 원형 보존.',
    'studio.feature.usd.tag': 'OPENUSD PIPELINE',
    'studio.feature.usd.title': 'CAD에서 Omniverse까지,<br />단 하나의 파이프라인으로 연결합니다.',
    'studio.feature.usd.desc': 'NVIDIA Omniverse나 Isaac Sim을 위한 필수 관문. 무거운 설계 CAD 파일을 시뮬레이션에 맞춰 경량화하고 OpenUSD로 변환하는 복잡한 전처리를 하나의 프로세스로 통합했습니다.',
    'studio.feature.usd.metric.poly': 'Polygons: 831,790 → 236,654 (-72%)',
    'studio.feature.usd.metric.vert': 'Vertices: 488,669 → 150,654 (-69%)',
    'studio.feature.usd.metric.size': 'File Size: 5.84 MB → 2.44 MB (-58%)',
    'studio.feature.usd.metric.time': 'Time: 6.4초',
    'studio.feature.usd.list1': 'STEP · FBX · OBJ · GLB의 AI 최적화와 동시에 계층 보존 OpenUSD로 출력',
    'studio.feature.usd.list2': '모든 서브어셈블리 및 개별 파트 명칭의 완벽한 무손실 유지',
    'studio.feature.usd.footnote': '*USD 출력은 현재 Beta 기능이며, 단일 어셈블리 테스트 기준 결과입니다.',
    'studio.usd.badge': 'NVIDIA Omniverse · OpenUSD Beta',
  },

  en: {
    // NAV
    'nav.problem': 'Problem',
    'nav.precision': 'Precision',
    'nav.usability': 'Usability',
    'nav.trust': 'Trust',
    'nav.company': 'Pocket Memory',
    'nav.demo': 'Try Free',
    // HERO
    'hero.badge': 'Physical AI needs light data. Yours isn\'t.',
    'hero.title.1': 'Heavy 3D files',
    'hero.title.2': 'become lightweight assets',
    'hero.title.3': 'in just',
    'hero.title.4': '<em>1 minute.</em>',
    'hero.subtitle.tagline': 'Shape fidelity matters. Light data wins.',
    'hero.subtitle': 'Did you know? If shape fidelity drops, your simulation fails — silently.',
    'hero.cta.primary': 'Start Free',
    'hero.cta.ghost': 'Enterprise Inquiry',
    'hero.scroll': 'SCROLL TO EXPLORE',
    // STUDIO
    'studio.badge.name': 'AutoTwin Studio',
    'studio.title': "Beyond optimization,<br />a 3D Asset Management OS.<br />The birth of <em>'PM AutoTwin Studio'</em>",
    'studio.desc': 'AutoTwin has evolved from a simple optimizer into a powerful platform.<br />From <strong>AI 3D Generation</strong> that instantly creates 3D models,<br />to an <strong>Asset Manager</strong> that lets every employee search and use assets.<br />Command every step of 3D — from creation to delivery — in one studio.',
    'studio.pipe.1.title': 'AI 3D Gen',
    'studio.pipe.1.desc': 'Text/Image → 3D Model',
    'studio.pipe.2.title': 'Vertex-GNN Optimize',
    'studio.pipe.2.desc': 'One-click auto-reduction',
    'studio.pipe.3.title': 'Asset Manager',
    'studio.pipe.3.desc': 'Enterprise 3D asset mgmt',
    'studio.feature.gen.tag': 'AI 3D GENERATION',
    'studio.feature.gen.title': 'Need a 3D asset?<br />Generate it instantly with AI.',
    'studio.feature.gen.desc': 'Digital twins require not just high-precision CAD models, but also lightweight assets like fire extinguishers and signs. Redesigning every time drives up costs. With AutoTwin Studio\'s generative AI, create 3D assets on-demand and optimize them on the spot.',
    'studio.feature.opt.tag': 'VERTEX-GNN OPTIMIZATION',
    'studio.feature.opt.title': 'Ultra-large files that stall commercial engines?<br />AutoTwin breaks through effortlessly.',
    'studio.feature.opt.desc': 'Full-Assembly industrial drawings over 1GB, processed in one shot without splitting.<br /><strong>4× faster processing</strong> on average than existing tools. <small>*Based on 1.56GB file</small>',
    'studio.opt.label.before': 'BEFORE (Original)',
    'studio.opt.label.after': 'AFTER (Optimized)',
    'studio.opt.slider.hint': 'Drag to compare',
    'studio.feature.opt.format': '6-format I/O: PLY · USD · STP · STL · GLB · FBX import & cross-conversion',
    'studio.feature.opt.metadata': 'Lossless Metadata Preservation — hierarchy, tags & materials intact',
    'studio.feature.ply.tag': 'SCAN DATA GATEWAY',
    'studio.feature.ply.title': 'Massive 3D scan data (PLY),<br />the essential gateway to virtual environments & AI',
    'studio.feature.ply.desc': 'Tens of GB of real-world scan data that freezes renderers.<br />PM AutoTwin goes beyond random decimation—it <strong>perfectly preserves the skeleton and geometry</strong> while <strong>compressing volume by 10×</strong>, delivering an \'Intelligent Optimization Gateway.\'',
    'studio.ply.gauge.label': 'INTELLIGENT COMPRESSION',
    'studio.ply.badge': 'Omniverse · AI Ready',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '"Where\'s that file?"<br />Grab it from the dashboard instantly.',
    'studio.feature.mgr.desc': 'Don\'t let optimized 3D data collect dust on someone\'s hard drive. AutoTwin Studio\'s Asset Manager is a centralized repository for enterprise 3D assets. With thumbnail and tag search, marketers and sales reps can find the asset they need in 1 second.',
    'studio.feature.mgr.list1': 'End-to-End asset operations · PM Hub centralized management',
    'studio.feature.mgr.list2': 'Optimization history · real-time feedback · secure share links for B2B collaboration',
    'studio.feature.mgr.list3': 'Instant 3D model preview & review in browser — no install required',
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
    'pain.benefit.1.title': 'Average 4.4× faster results than global leading tools',
    'pain.benefit.1.desc': 'From upload to real-time asset — Average 4.4× faster results than global leading tools <small>*Based on Car engine(132MB) file, 2026.02 internal benchmark</small>',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': 'Zero expert intervention',
    'pain.benefit.2.desc': 'No parameter tuning or repeated tests — even non-experts just drag & drop',
    'pain.benefit.3.tag': 'OPEX SAVINGS',
    'pain.benefit.3.title': 'Labor-cost-driven savings',
    'pain.benefit.3.desc': 'Save expensive human hours, not just server costs — solving enterprise\'s largest expense',
    'pain.stat1.desc': '3D data prep work<br />dominates project time<sup>*1</sup>',
    'pain.stat2.desc': '3D data issues cause<br />development quality risks<sup>*2</sup>',
    'pain.stats.sources': '*1 Siemens Tech-Clarity &nbsp;/&nbsp; *2 McKinsey &amp; Company',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': 'Same optimization rate, we preserve<br />the <em>original</em> shape.',
    'precision.desc': 'Even with the same 60% reduction, results differ.<br />PM AutoTwin achieves <strong>97.64/100</strong>, while the global leading tool scores <strong>80.98/100</strong>.<br />Our proprietary tool <strong>\'PM OmniMetric\'</strong> quantifies shape preservation to the decimal point.',
    'precision.image.alt': 'Global Leading Tool vs PM AutoTwin Precision Comparison',
    'precision.image.left': 'Global Leading Tool',
    'precision.image.right': 'PM AutoTwin',
    'precision.competitor.label': 'Global Leading Tool',
    'precision.score.competitor': 'Global Leading Tool Fidelity Score',
    'precision.score.pm': 'PM AutoTwin Fidelity Score',
    'precision.kpi1.title': 'Fidelity Score (Overall)',
    'precision.kpi1.badge': '+16.66 Superior',
    'precision.kpi2.title': 'Texture Visual Score',
    'precision.kpi2.badge': '+45.29%p Superior',
    'precision.kpi3.title': 'Structure Integrity (PNWE)',
    'precision.kpi3.badge': '1,031× Safer',
    'precision.bottom.badge': '🏅 Overwhelming Shape Preservation',
    'precision.disclaimer': '*Based on identical 60% reduction, PM OmniMetric Analysis Report (2026.06.17)',
    'precision.cta': 'Verify directly with my file',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': 'Deploy it <em>your way</em>,<br />perfectly suited to your environment.',
    'zero.desc': 'Fast & light SaaS for instant access, air-gapped on-premise for enterprise security,<br />or preprocessing API to plug into your pipeline. We support every infrastructure.',
    'zero.deploy.saas': '10-min setup · Instant use',
    'zero.deploy.onprem': 'Air-gap security · On-site server',
    'zero.deploy.api': 'Pipeline integration · Scalable',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': 'The global 3D benchmark.<br />AutoTwin proposes the<br /><em>standard</em> for quality.',
    'trust.desc': 'Confused about what makes \'good\' 3D data?<br /><br />AutoTwin is <strong>preparing a proposal for the 3D Quality Measurement & Optimization Standard (P3079.5/6) to IEEE</strong>.<br />We aim to be the first to define the standard that no one has yet defined.<br /><br />Entrust your data to the next-generation standard project the world is watching.',
    'trust.ieee.label': 'IEEE P3079.5/6',
    'trust.ieee.title': 'Standard Proposal in Preparation',
    'trust.ieee.sub': 'Preparing to Propose Standard',
    'trust.ieee.stat1.label': '3D Quality Standard (Draft)',
    'trust.ieee.stat2.label': '3D Optimization Standard (Draft)',
    'trust.ieee.stat3.num': 'PAR Submission in Prep',
    'trust.ieee.stat3.label': 'Standard Proposal in Preparation',
    'trust.results.title': 'Technology proven by <em>numbers</em>',
    'trust.result1.company': 'Hyundai Motor HMGICS',
    'trust.result1.desc': 'Logistics digital twin',
    'trust.result1.kpi1': 'Reduction',
    'trust.result1.kpi2': 'Rendering↑',
    'trust.result2.company': 'SK ecoplant',
    'trust.result2.desc': 'Battery housing ultra-optimization',
    'trust.result2.kpi1': 'Reduction',
    'trust.result2.kpi2': 'Processing',
    'trust.result3.year': '2025 Ministry of Science & ICT',
    'trust.result3.title': "Minister's Award",
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    'trust.results.disclaimer': '※ These results are based on cases where Pocket Memory\'s technology was applied and practically validated during project execution with the respective companies.',
    // VIDEO
    'video.title': 'See it in action, <em>15-second magic</em>',
    'video.desc': 'Watch how complex 3D models are optimized with a single click.',
    // AUTOTWIN LITE BANNER
    'autotwin.banner.title': 'Need fast, affordable 3D optimization only?',
    'autotwin.banner.desc': 'SaaS-based lightweight optimization service — Simpler and smarter.',
    'autotwin.banner.cta': 'Start AutoTwin Free',
    'autotwin.popup.title': 'PM AutoTwin',
    'autotwin.popup.subtitle': 'SaaS-based 3D Optimization Service',
    'autotwin.popup.desc': 'A lightweight SaaS service focused purely on 3D optimization.<br />One-click quick optimization at a reasonable price.',
    'autotwin.popup.feat1': '⚡ One-click Auto Optimization',
    'autotwin.popup.feat2': '💰 Affordable Pricing',
    'autotwin.popup.feat3': '☁️ SaaS — No Install, Instant Use',
    'autotwin.popup.cta': 'Get Started Free',
    // CTA
    'cta.title': "Your 3D data becomes <em>'capital'</em><br />in just <em>1 minute.</em>",
    'cta.desc': 'PM AutoTwin Studio is now officially open. Start free today.',
    'cta.desc.enterprise': 'Considering On-Premise or Enterprise deployment?<br />Our dedicated consultants will propose the optimal configuration for your environment.',
    'cta.btn.primary': 'Start Free',
    'cta.btn.ghost': 'Explore Again',
    'cta.form.label': '🚀 Contact Us',
    'cta.form.badge': 'CONTACT US',
    'cta.form.title': 'The First Step to Innovation',
    'cta.form.subtitle': 'Share your project details and we\'ll send you a customized proposal.',
    'cta.form.name.label': 'Name <span class="required">*</span>',
    'cta.form.name.placeholder': 'Full Name',
    'cta.form.company.label': 'Company / Organization',
    'cta.form.company.placeholder': 'Company Name',
    'cta.form.email.label': 'Email <span class="required">*</span>',
    'cta.form.email.placeholder': 'Email Address',
    'cta.form.phone.label': 'Phone <span class="required">*</span>',
    'cta.form.phone.placeholder': 'Phone Number',
    'cta.form.message.label': 'Message <span class="required">*</span>',
    'cta.form.message.placeholder': 'Tell us about your project or inquiry',
    'cta.form.consent': 'I agree to the <a href="/privacy.html" target="_blank">collection and use of personal information</a>. (Name, email, phone, company, and message are collected for consultation purposes)',
    'cta.form.submit': 'Submit Inquiry',
    'cta.form.success': '✅ Your request has been submitted! We\'ll contact you shortly.',
    'cta.form.error': '❌ Submission failed. Please try again later.',
    // FOOTER
    'footer.tagline': 'Automated 3D Optimization for the Future.',
    'footer.product': 'Product',
    'footer.product.features': 'Key Features',
    'footer.product.cases': 'Use Cases',
    'footer.product.pricing': 'Pricing',
    'footer.product.enterprise': 'Enterprise',
    'footer.legal': 'Legal',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.terms': 'Terms of Service',
    'footer.copyright': '© 2026 <a href="https://www.pocketmemory.co.kr/" target="_blank" class="footer__pm-link">POCKET MEMORY</a> Inc. All rights reserved.',
    'hero.footnote': '*Based on Sandia National Labs research / Max processing speed for lightweight sample file',
    'studio.feature.opt.footnote.gnn': '* Vertex-GNN: An optimization engine developed in-house, inspired by Graph Neural Network (GNN) methodology rather than a pre-trained neural network.',
    'studio.feature.opt.footnote.ply': '*PLY PLY format conversion is under R&D.',
    'footer.tel': 'Tel: +82-2-2088-1855',
    'footer.address': 'Address: ACE N.S Tower #1216, 33 Munrae-dong 6-ga, Yeongdeungpo-gu, Seoul, Korea',
    'seo.title': 'PM AutoTwin Studio — Lightweight 3D assets in 1 minute.',
    'seo.description': 'PM AutoTwin Studio is a global 3D asset management OS combining a proprietary GNN algorithm and IEEE standards. 98% polygon optimization, 82% shape preservation, 15s processing.',
    'seo.keywords': 'PM AutoTwin, 3D optimization, digital twin, GNN, IEEE, 3D asset management, POCKET MEMORY, digital twin, mesh optimization',
    'seo.og.title': 'PM AutoTwin Studio — 3D Asset Management OS',
    'seo.og.description': 'Global 3D asset management OS combining a proprietary GNN algorithm and IEEE standards. 98% polygon optimization, 82% shape preservation.',
    'studio.feature.usd.tag': 'OPENUSD PIPELINE',
    'studio.feature.usd.title': 'From CAD to Omniverse:<br />Connected in a single, simple pipeline.',
    'studio.feature.usd.desc': 'A crucial gateway for NVIDIA Omniverse & Isaac Sim. We unified the complex workflow of CAD conversion, mesh decimation, and OpenUSD export into a single, seamless step.',
    'studio.feature.usd.metric.poly': 'Polygons: 831,790 → 236,654 (-72%)',
    'studio.feature.usd.metric.vert': 'Vertices: 488,669 → 150,654 (-69%)',
    'studio.feature.usd.metric.size': 'File Size: 5.84 MB → 2.44 MB (-58%)',
    'studio.feature.usd.metric.time': 'Time: 6.4s',
    'studio.feature.usd.list1': 'AI optimization of STEP / FBX / OBJ / GLB with instant OpenUSD schema mapping',
    'studio.feature.usd.list2': 'Complete sub-assembly and part names retained without loss',
    'studio.feature.usd.footnote': '*USD output is currently a Beta feature, based on a single assembly test.',
    'studio.usd.badge': 'NVIDIA Omniverse · OpenUSD Beta',
  },

  ja: {
    // NAV
    'nav.problem': '課題',
    'nav.precision': '精度',
    'nav.usability': '使いやすさ',
    'nav.trust': '信頼',
    'nav.company': 'ポケットメモリー',
    'nav.demo': '無料で使う',
    // HERO
    'hero.badge': 'フィジカルAI時代、重い3Dデータがボトルネックに',
    'hero.title.1': '重い3Dファイルを、',
    'hero.title.2': 'たった1分で',
    'hero.title.3': '軽量な',
    'hero.title.4': '<em>「資産」</em>に変換。',
    'hero.subtitle.tagline': '原型保存率が低いと、シミュレーションは失敗します。ご存知でしたか？',
    'hero.subtitle': '原型保存率が低いと、シミュレーションは失敗します。ご存知でしたか？',
    'hero.cta.primary': '無料で使う',
    'hero.cta.ghost': 'エンタープライズ導入相談',
    'hero.scroll': 'SCROLL TO EXPLORE',
    // STUDIO
    'studio.badge.name': 'AutoTwin Studio',
    'studio.title': "最適化を超え、<br />3Dアセット管理OSへ。<br /><em>「PM AutoTwin Studio」</em>の誕生",
    'studio.desc': '容量を削減するだけだったAutoTwinが圧倒的な進化を遂げました。<br />必要な3Dモデルを即座に生成する<strong>AI 3D生成</strong>から、<br />変換ファイルを全社員が検索・利用できる<strong>アセットマネージャー</strong>まで。<br />3Dの最初から最後まで、一つのスタジオで完璧に指揮しましょう。',
    'studio.pipe.1.title': 'AI 3D生成',
    'studio.pipe.1.desc': 'テキスト/画像 → 3Dモデル',
    'studio.pipe.2.title': 'Vertex-GNN最適化',
    'studio.pipe.2.desc': 'ワンクリック自動軽量化',
    'studio.pipe.3.title': 'アセットマネージャー',
    'studio.pipe.3.desc': '全社3Dアセット管理',
    'studio.feature.gen.tag': 'AI 3D GENERATION',
    'studio.feature.gen.title': '必要な3Dアセット、<br />AIで即座に生成。',
    'studio.feature.gen.desc': 'デジタルツインには高精度CADモデルだけでなく、消火器や看板などの軽量アセットも必要です。その度にデザインすればコストが急増します。AutoTwin Studioの生成AIで必要な3Dを即座に作り、その場で最適化しましょう。',
    'studio.feature.opt.tag': 'VERTEX-GNN OPTIMIZATION',
    'studio.feature.opt.title': '商用エンジンが止まる超大容量も、<br />AutoTwinは詰まることなく突破します。',
    'studio.feature.opt.desc': '1GB以上のFull-Assembly産業図面も分割なしで一度に。<br />既存ツール比<strong>平均 4倍高速処理</strong>で前処理のボトルネックを解消します。<small>*1.56GBファイル基準</small>',
    'studio.opt.label.before': 'BEFORE（オリジナル）',
    'studio.opt.label.after': 'AFTER（最適化済み）',
    'studio.opt.slider.hint': 'ドラッグして比較',
    'studio.feature.opt.format': '6種フォーマット対応: PLY · USD · STP · STL · GLB · FBX インポートおよびクロス変換',
    'studio.feature.opt.metadata': '階層構造・タグ・マテリアル等のメタデータを無損失保存 (Lossless Metadata Preservation)',
    'studio.feature.ply.tag': 'SCAN DATA GATEWAY',
    'studio.feature.ply.title': '超大容量3Dスキャンデータ(PLY)、<br />仮想環境とAIへの必須ゲートウェイ',
    'studio.feature.ply.desc': 'レンダリングを止める数十GBの巨大な現実環境（スキャン）データ。<br />PM AutoTwinは単純なランダム削除を超え、原本の<strong>骨格と形状を完璧に保存</strong>しながら容量を<strong>1/10に圧縮</strong>する「インテリジェント最適化ゲートウェイ」を提供します。',
    'studio.ply.gauge.label': 'インテリジェント圧縮率',
    'studio.ply.badge': 'Omniverse · AI Ready',
    'studio.feature.mgr.tag': '3D ASSET MANAGER',
    'studio.feature.mgr.title': '「あのファイルどこ？」<br />ダッシュボードからすぐ取り出せます。',
    'studio.feature.mgr.desc': 'せっかく軽量化した3Dデータを担当者の外付けHDDに放置しますか？AutoTwin Studioの「アセットマネージャー」は全社3Dアセットの中央保管庫です。サムネイルとタグ検索でマーケターも営業も必要なアセットを1秒で見つけ、即実務に投入できます。',
    'studio.feature.mgr.list1': 'End-to-Endアセット運用 · PM Hub中央管理',
    'studio.feature.mgr.list2': '最適化履歴・リアルタイムフィードバック・セキュア共有リンクでB2Bコラボレーション最大化',
    'studio.feature.mgr.list3': 'インストール不要、ブラウザで3Dモデルを即座に確認・レビュー',
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
    'pain.benefit.1.title': 'グローバルリーディングツール比平均4.4倍高速な結果',
    'pain.benefit.1.desc': 'アップロードからリアルタイムアセットまで、グローバルリーディングツール比平均4.4倍高速な結果を導出 <small>*Car engine(132MB)ファイル基準、2026.02自主ベンチマーク</small>',
    'pain.benefit.2.tag': 'ZERO-TOUCH',
    'pain.benefit.2.title': '専門家介入ゼロ',
    'pain.benefit.2.desc': 'パラメータ設定・繰り返しテスト不要、非専門家もドラッグ&ドロップで完了',
    'pain.benefit.3.tag': 'OPEX削減',
    'pain.benefit.3.title': '人件費中心のコスト革新',
    'pain.benefit.3.desc': 'サーバー費ではなく高級人材の時間を節約 — 企業最大のコスト項目を解決',
    'pain.stat1.desc': '3Dデータの準備作業が<br />プロジェクト時間を占有<sup>*1</sup>',
    'pain.stat2.desc': '開発工程の品質問題の<br />原因が3Dデータ<sup>*2</sup>',
    'pain.stats.sources': '*1 Siemens Tech-Clarity &nbsp;/&nbsp; *2 McKinsey &amp; Company',
    // PRECISION
    'precision.eyebrow': 'PM OMNIMETRIC',
    'precision.title': '同じ最適化率、私たちは<br /><em>原型</em>を守ります。',
    'precision.desc': '同じ60%軽量化でも結果は異なります。<br />PM AutoTwinは<strong>97.64/100</strong>、グローバルリーディングツールは<strong>80.98/100</strong>。<br />自社検証ツール<strong>「PM OmniMetric」</strong>が変換前後の原型保存率を小数点まで定量測定します。',
    'precision.image.alt': 'グローバルリーディングツール vs PM AutoTwin 精度比較',
    'precision.image.left': 'グローバルリーディングツール',
    'precision.image.right': 'PM AutoTwin',
    'precision.competitor.label': 'グローバルリーディングツール',
    'precision.score.competitor': 'グローバルリーディングツール 原型保存スコア',
    'precision.score.pm': 'PM AutoTwin 原型保存スコア',
    'precision.kpi1.title': '原型保存総合スコア (Fidelity Score)',
    'precision.kpi1.badge': '+16.66点 優秀',
    'precision.kpi2.title': 'テクスチャ保存率 (Texture Visual Score)',
    'precision.kpi2.badge': '+45.29%p 優秀',
    'precision.kpi3.title': '構造完全性 (PNWE — Non-Watertight)',
    'precision.kpi3.badge': '1,031× 安全',
    'precision.bottom.badge': '🏅 圧倒的な原型保存率',
    'precision.disclaimer': '*同一60%最適化条件、PM OmniMetric分析レポート（2026.06.17）基準',
    'precision.cta': '自分のファイルで直接確認する',
    // ZERO
    'zero.eyebrow': 'FLEXIBLE DEPLOYMENT',
    'zero.title': '御社の環境にぴったり合う<br />方式で<em>導入</em>してください。',
    'zero.desc': 'すぐに接続して使える軽快なSaaS、外部漏洩を完全遮断する大企業内部網用オンプレミス、<br />御社のサービスに直接接続して自動化する前処理APIまで。すべてのインフラを支援します。',
    'zero.deploy.saas': '10分セットアップ · 即時利用',
    'zero.deploy.onprem': 'エアギャップセキュリティ · 社内サーバー',
    'zero.deploy.api': '前処理パイプライン · 拡張',
    // TRUST
    'trust.eyebrow': 'GLOBAL STANDARD',
    'trust.title': 'グローバル3Dの基準、<br />AutoTwinが品質の<br /><em>スタンダード</em>を提案します。',
    'trust.desc': 'どの3Dが本当に「良い」データか迷っていませんか？<br /><br />AutoTwinは国際標準化機構IEEEに<strong>3D品質測定・最適化標準（P3079.5/6）の提案を準備しています。</strong><br />まだ誰も定義していない3D品質の基準、<br />その最初の提案者となるための過程です。<br /><br />世界が注目する次世代標準プロジェクトに御社のデータをお任せください。',
    'trust.ieee.label': 'IEEE P3079.5/6',
    'trust.ieee.title': '標準提案 準備中',
    'trust.ieee.sub': '標準提案準備中',
    'trust.ieee.stat1.label': '3D品質測定標準（案）',
    'trust.ieee.stat2.label': '3D最適化標準（案）',
    'trust.ieee.stat3.num': 'PAR提出準備中',
    'trust.ieee.stat3.label': '標準プロジェクト提案準備',
    'trust.results.title': '技術は<em>数字</em>で証明されます',
    'trust.result1.company': '現代自動車 HMGICS',
    'trust.result1.desc': '物流デジタルツイン',
    'trust.result1.kpi1': '軽量化',
    'trust.result1.kpi2': 'レンダリング↑',
    'trust.result2.company': 'SKエコプラント',
    'trust.result2.desc': 'バッテリーハウジング超軽量化',
    'trust.result2.kpi1': '軽量化',
    'trust.result2.kpi2': '処理時間',
    'trust.result3.year': '2025年 科学技術情報通信部',
    'trust.result3.title': '大臣賞受賞',
    'trust.result3.tag': "MINISTER'S AWARD FOR SCIENCE & ICT",
    'trust.results.disclaimer': '※ 本成果は、各企業とのプロジェクト過程においてポケットメモリーの技術を適用し、実務的に検証した事例を基に構成されています。',
    // VIDEO
    'video.title': '実際に確認してください、<em>15秒の魔法</em>',
    'video.desc': '複雑な3Dモデルがワンクリックで最適化される過程を動画でご覧ください。',
    // AUTOTWIN LITE BANNER
    'autotwin.banner.title': '効率的なコストで素早く3D最適化だけ必要ですか？',
    'autotwin.banner.desc': 'SaaSベースの軽量化専門サービス — より手軽に、よりスマートに。',
    'autotwin.banner.cta': 'AutoTwin無料で始める',
    'autotwin.popup.title': 'PM AutoTwin',
    'autotwin.popup.subtitle': 'SaaSベースの3D最適化サービス',
    'autotwin.popup.desc': '不要な機能なし、3D最適化に特化した軽量SaaSサービスです。<br />ワンクリックで素早く軽量化し、合理的な価格でご利用いただけます。',
    'autotwin.popup.feat1': '⚡ ワンクリック自動最適化',
    'autotwin.popup.feat2': '💰 合理的な価格',
    'autotwin.popup.feat3': '☁️ SaaS — インストール不要、即時利用',
    'autotwin.popup.cta': '無料で始める',
    // CTA
    'cta.title': "あなたの3Dデータが<em>「資本」</em>に<br />変わる時間、<em>たった1分。</em>",
    'cta.desc': 'PM AutoTwin Studioが正式オープンしました。今すぐ無料で始めましょう。',
    'cta.desc.enterprise': 'オンプレミス・エンタープライズ導入をご検討中ですか？<br />専任コンサルタントが御社の環境に最適な構成をご提案いたします。',
    'cta.btn.primary': '無料で使う',
    'cta.btn.ghost': 'もう一度探索する',
    'cta.form.label': '🚀 導入お問い合わせ',
    'cta.form.badge': 'CONTACT US',
    'cta.form.title': 'ビジネス革新への第一歩',
    'cta.form.subtitle': 'プロジェクトやお見積りのお問い合わせをいただければ、カスタム提案書をお送りします。',
    'cta.form.name.label': 'お名前 <span class="required">*</span>',
    'cta.form.name.placeholder': 'お名前',
    'cta.form.company.label': '会社 / 組織名',
    'cta.form.company.placeholder': '会社名',
    'cta.form.email.label': 'メール <span class="required">*</span>',
    'cta.form.email.placeholder': 'メールアドレス',
    'cta.form.phone.label': 'お電話 <span class="required">*</span>',
    'cta.form.phone.placeholder': '電話番号',
    'cta.form.message.label': 'お問い合わせ内容 <span class="required">*</span>',
    'cta.form.message.placeholder': 'ご質問やプロジェクトについて自由にご記入ください',
    'cta.form.consent': '<a href="/privacy.html" target="_blank">個人情報の収集・利用</a>に同意します。（氏名、メール、電話番号、会社名、お問い合わせ内容を相談目的で収集します）',
    'cta.form.submit': '相談を申請する',
    'cta.form.success': '✅ 申請が完了しました！早急にご連絡いたします。',
    'cta.form.error': '❌ 送信に失敗しました。しばらくしてから再度お試しください。',
    // FOOTER
    'footer.tagline': 'Automated 3D Optimization for the Future.',
    'footer.product': 'Product',
    'footer.product.features': '主要機能',
    'footer.product.cases': '適用事例',
    'footer.product.pricing': '料金プラン',
    'footer.product.enterprise': 'エンタープライズ',
    'footer.legal': '法的事項',
    'footer.legal.privacy': 'プライバシーポリシー',
    'footer.legal.terms': '利用規約',
    'footer.copyright': '© 2026 <a href="https://www.pocketmemory.co.kr/" target="_blank" class="footer__pm-link">POCKET MEMORY</a> Inc. All rights reserved.',
    'hero.footnote': '*Sandia National Labsの研究基準 / 軽量サンプルファイル基準の最大速度',
    'studio.feature.opt.footnote.gnn': '* Vertex-GNN: 事前学習されたニューラルネットワークではなく、グラフニューラルネットワーク(GNN)の手法に着想を得て独自開発した最適化エンジンです。',
    'studio.feature.opt.footnote.ply': '*PLY PLYフォーマットの変換機能は研究開発中です。',
    'footer.tel': 'Tel: +82-2-2088-1855',
    'footer.address': 'Address: 韓国ソウル特別市永登浦区文来洞6街33 ACE N.Sタワー1216号',
    'seo.title': 'PM AutoTwin Studio — 重い3Dデータをワンクリックで軽量な「資産」へ。',
    'seo.description': 'PM AutoTwin Studioは、独自のGNNアルゴリズムとIEEE標準が統合されたグローバル3Dアセット管理OSです。 98%ポリゴン最適化、82%原型保存、15秒処理。',
    'seo.keywords': 'PM AutoTwin, 3D最適化, デジタルツイン, GNN, IEEE, 3Dアセット管理, POCKET MEMORY, mesh optimization',
    'seo.og.title': 'PM AutoTwin Studio — 3Dアセット管理OS',
    'seo.og.description': '独自のGNNアルゴリズムとIEEE標準が統合されたグローバル3Dアセット管理OS。98%ポリゴン最適化、82%原型保存過ど。',
    'studio.feature.usd.tag': 'OPENUSD PIPELINE',
    'studio.feature.usd.title': 'CADからOmniverseまで、<br />単一のパイプラインで接続します。',
    'studio.feature.usd.desc': 'NVIDIA OmniverseやIsaac Simに不可欠なゲートウェイ。重い設計CADファイルをシミュレーションに適合させて軽量化し、OpenUSDへと変換する複雑な前処理を1つのシームレスなプロセスに統合しました。',
    'studio.feature.usd.metric.poly': 'Polygons: 831,790 → 236,654 (-72%)',
    'studio.feature.usd.metric.vert': 'Vertices: 488,669 → 150,654 (-69%)',
    'studio.feature.usd.metric.size': 'File Size: 5.84 MB → 2.44 MB (-58%)',
    'studio.feature.usd.metric.time': 'Time: 6.4秒',
    'studio.feature.usd.list1': 'STEP · FBX · OBJ · GLBのAI最適化と同時に、階層構造を保持したOpenUSDを出力',
    'studio.feature.usd.list2': 'すべてのサブアセンブリおよび個体パート名の完全なロスレス維持',
    'studio.feature.usd.footnote': '*USD出力は現在ベータ版機能であり、単一アセンブリのテスト基準結果です。',
    'studio.usd.badge': 'NVIDIA Omniverse · OpenUSD Beta',
  }
};

let currentLang = 'ko';

export function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('pm-autotwin-lang', lang);
  document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'ko';

  // SEO Title & Meta Description dynamic translation
  if (translations[lang]['seo.title']) {
    document.title = translations[lang]['seo.title'];
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang]['seo.description']) {
    metaDesc.setAttribute('content', translations[lang]['seo.description']);
  }
  const metaKey = document.querySelector('meta[name="keywords"]');
  if (metaKey && translations[lang]['seo.keywords']) {
    metaKey.setAttribute('content', translations[lang]['seo.keywords']);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && translations[lang]['seo.og.title']) {
    ogTitle.setAttribute('content', translations[lang]['seo.og.title']);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && translations[lang]['seo.og.description']) {
    ogDesc.setAttribute('content', translations[lang]['seo.og.description']);
  }

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

  // Handle placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = translations[lang][key];
    if (val !== undefined) el.placeholder = val;
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Handle conditional SNS links display based on lang
  document.querySelectorAll('[data-sns-lang]').forEach(el => {
    const allowedLangs = el.getAttribute('data-sns-lang').split(' ');
    if (allowedLangs.includes(lang)) {
      el.style.display = 'inline-flex';
    } else {
      el.style.display = 'none';
    }
  });
}

export function getLang() {
  return currentLang;
}

export function initI18n() {
  // 1순위: URL 경로 (/en → 영어, /jp → 일본어)
  const pathLang = detectLangFromPath();
  // 2순위: localStorage 저장값
  const saved = localStorage.getItem('pm-autotwin-lang');
  // 3순위: 브라우저 언어 (한국=ko, 일본=ja, 그 외 해외=en)
  const browserLang = navigator.language.slice(0, 2);
  const browserDetected = browserLang === 'ko' ? 'ko' : (browserLang === 'ja' ? 'ja' : 'en');
  const lang = pathLang || saved || browserDetected;

  // Setup language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  setLang(lang);
}

// URL 경로에서 언어 감지: /en → 'en', /jp → 'ja', /kr → 'ko'
function detectLangFromPath() {
  const path = window.location.pathname.replace(/\/$/, '').toLowerCase();
  if (path === '/en') return 'en';
  if (path === '/jp') return 'ja';
  if (path === '/kr') return 'ko';
  return null;
}
