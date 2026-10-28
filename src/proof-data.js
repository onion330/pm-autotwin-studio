/* ───────────────────────────────────────────
   검증 기록 · 산업별 입구 · 자주 묻는 질문 (한·영·일)
   숫자는 위키 숫자와-표현-기준 2번 표 안의 값만, 조건과 함께.
   링크는 위키 게시글-링크(한국어 → KR 글, 영어·일본어 → EN 글).
   새 검증 글이 나오면 EVIDENCE 맨 위에 한 건 추가.
   ─────────────────────────────────────────── */

export const EVIDENCE = [
    {
        id: 'usd-to-usd',
        date: '2026.10.13',
        title: {
            ko: 'USD → USD 재최적화, 기어모터 1모델',
            en: 'USD → USD re-optimization, one gearmotor model',
            ja: 'USD → USD 再最適化、ギアモーター1モデル',
        },
        rows: [
            { k: { ko: '꼭짓점', en: 'Vertices', ja: '頂点' }, v: '386,078 → 104,243', d: '−73%' },
            { k: { ko: '용량', en: 'File size', ja: '容量' }, v: '9.45 MB → 3.87 MB' },
            { k: { ko: '처리', en: 'Run time', ja: '処理' }, v: { ko: '23초', en: '23 s', ja: '23秒' } },
        ],
        kept: {
            ko: '이름 267/267, 인스턴스 52/52, 머티리얼 연결 156/156, 사용자 속성 364/364 원본과 일치',
            en: 'Names 267/267, instances 52/52, material bindings 156/156, custom attributes 364/364 match the original',
            ja: '名前 267/267、インスタンス 52/52、マテリアル割り当て 156/156、カスタム属性 364/364 が原本と一致',
        },
        cond: {
            ko: '1모델, 사내 1차 검증, 제품 배포 전',
            en: 'One model, first internal check, before product release',
            ja: '1モデル、社内一次検証、製品リリース前',
        },
        links: {
            post: { ko: 'https://www.linkedin.com/feed/update/urn:li:activity:7515667661285134337/', en: 'https://lnkd.in/p/gMfFrtir' },
            video: { ko: 'https://youtu.be/prcJCsnZokY', en: 'https://youtu.be/4hLxiAdhqcc' },
        },
    },
    {
        id: 'large-ifc',
        date: '2026.09.25',
        title: {
            ko: '대용량 IFC 1.91GB 변환 (Beta)',
            en: 'Large IFC, 1.91 GB (Beta)',
            ja: '大容量IFC 1.91GB 変換（Beta）',
        },
        rows: [
            { k: { ko: '용량', en: 'File size', ja: '容量' }, v: '1.91 GB → 240 MB' },
            { k: { ko: '폴리곤', en: 'Polygons', ja: 'ポリゴン' }, v: { ko: '8,139만 → 3,000만', en: '81.39M → 30M', ja: '8,139万 → 3,000万' } },
            { k: { ko: '처리', en: 'Run time', ja: '処理' }, v: { ko: '3시간 20분 → 약 20분', en: '3 h 20 min → about 20 min', ja: '3時間20分 → 約20分' } },
        ],
        kept: null,
        cond: {
            ko: '1파일, 베타, CPU 서버. 같은 부재 인스턴싱과 여러 색은 아직 지원하지 않음',
            en: 'One file, beta, CPU server. Instancing of identical parts and multi-color not yet supported',
            ja: '1ファイル、ベータ、CPUサーバー。同一部材のインスタンス化と多色は未対応',
        },
        links: {
            post: { ko: 'https://lnkd.in/p/grNV2NHc', en: 'https://lnkd.in/p/gPGpwBZ7' },
            video: { en: 'https://youtu.be/oVf4B2sF2IQ' },
        },
    },
    {
        id: 'ahu',
        date: '2026.08.29',
        title: {
            ko: 'Revit 공조기(AHU) IFC → OpenUSD (Beta)',
            en: 'Revit air handling unit (AHU), IFC → OpenUSD (Beta)',
            ja: 'Revit 空調機（AHU）IFC → OpenUSD（Beta）',
        },
        rows: [
            { k: { ko: '정점', en: 'Vertices', ja: '頂点' }, v: { ko: '128만 → 84,427', en: '1.28M → 84,427', ja: '128万 → 84,427' }, d: '−93%' },
            { k: { ko: '용량', en: 'File size', ja: '容量' }, v: '42.9 MB → 6.52 MB' },
            { k: { ko: '처리', en: 'Run time', ja: '処理' }, v: { ko: '9.38초', en: '9.38 s', ja: '9.38秒' } },
        ],
        kept: {
            ko: '전압 208V, 체적 42.59027㎥ 등 속성값이 원본과 일치',
            en: 'Property values such as voltage 208 V and volume 42.59027 m³ match the original',
            ja: '電圧208V、体積42.59027㎥などの属性値が原本と一致',
        },
        cond: {
            ko: '1파일, IFC → OpenUSD 한 방향',
            en: 'One file, one direction (IFC → OpenUSD)',
            ja: '1ファイル、IFC → OpenUSDの一方向',
        },
        links: {
            post: { ko: 'https://lnkd.in/p/d9TcvUKY', en: 'https://lnkd.in/p/dm-vEdJt' },
            video: { en: 'https://youtu.be/8GhZvnR1Xgw' },
            forum: 'https://forums.developer.nvidia.com/t/verifying-ifc-property-preservation-after-ifc-to-openusd-conversion-one-ahu-test/385083',
        },
    },
    {
        id: 'vram',
        date: '2026.08.03',
        title: {
            ko: '대형 모델 VRAM·FPS',
            en: 'Large model, VRAM and FPS',
            ja: '大型モデルのVRAM・FPS',
        },
        rows: [
            { k: { ko: '용량', en: 'File size', ja: '容量' }, v: '1.10 GB → 529.88 MB' },
            { k: { ko: 'VRAM', en: 'VRAM', ja: 'VRAM' }, v: '5.3 → 4.3 GiB' },
            { k: { ko: 'FPS', en: 'FPS', ja: 'FPS' }, v: '38.46 → 51.91', d: '+35%' },
        ],
        kept: null,
        cond: {
            ko: 'RTX 3060 Ti, 특정 파일 1건',
            en: 'RTX 3060 Ti, one specific file',
            ja: 'RTX 3060 Ti、特定ファイル1件',
        },
        links: {
            post: { ko: 'https://lnkd.in/p/d4VWsqw9', en: 'https://lnkd.in/p/dTf3Ae_j' },
            video: { en: 'https://youtu.be/g7WYurDyvXg' },
        },
    },
    {
        id: 'gearbox',
        date: '2026.07.11',
        title: {
            ko: '기어박스 STEP → OpenUSD (Beta)',
            en: 'Gearbox STEP → OpenUSD (Beta)',
            ja: 'ギアボックス STEP → OpenUSD（Beta）',
        },
        rows: [
            { k: { ko: '폴리곤', en: 'Polygons', ja: 'ポリゴン' }, v: '831,790 → 236,654', d: '−72%' },
            { k: { ko: '정점', en: 'Vertices', ja: '頂点' }, v: '488,669 → 150,654', d: '−69%' },
            { k: { ko: '용량', en: 'File size', ja: '容量' }, v: '5.84 MB → 2.44 MB', d: '−58%' },
            { k: { ko: '처리', en: 'Run time', ja: '処理' }, v: { ko: '6.4초', en: '6.4 s', ja: '6.4秒' } },
        ],
        kept: {
            ko: '부품 이름과 ISO 나사 이름, 어셈블리 계층',
            en: 'Part names, ISO screw names and assembly hierarchy',
            ja: '部品名、ISOねじ名、アセンブリ階層',
        },
        cond: {
            ko: '단일 어셈블리. 모델: "Gearmotor for hobby motor 3V" by Ezekiel Hirshhorn (GrabCAD)',
            en: 'Single assembly. Model: "Gearmotor for hobby motor 3V" by Ezekiel Hirshhorn (GrabCAD)',
            ja: '単一アセンブリ。モデル: "Gearmotor for hobby motor 3V" by Ezekiel Hirshhorn（GrabCAD）',
        },
        links: {
            post: { ko: 'https://lnkd.in/p/d6Hhz9-e', en: 'https://lnkd.in/p/diW9C7rt' },
            video: { en: 'https://youtu.be/INwdCngPv6U' },
            credit: 'https://grabcad.com/library/gearmotor-for-hobby-motor-3v-motor-has-unfixed-yet-issues-1',
        },
    },
];

export const INDUSTRIES = [
    {
        id: 'shipbuilding',
        name: { ko: '조선·플랜트', en: 'Shipbuilding & plant', ja: '造船・プラント' },
        line: {
            ko: '무거워서 잘 열리지 않는 설비 3D를 다룹니다. 1.91GB IFC를 240MB로 줄인 시험과 대형 모델의 VRAM·FPS 시험을 공개했습니다(각 1파일, 조건은 기록에).',
            en: 'For equipment models too heavy to open well. We published a test cutting a 1.91 GB IFC to 240 MB and a VRAM and FPS test on a large model (one file each, conditions on the records).',
            ja: '重くて開きにくい設備3Dを扱います。1.91GBのIFCを240MBにしたテストと、大型モデルのVRAM・FPSテストを公開しました（各1ファイル、条件は記録に記載）。',
        },
        evidence: ['large-ifc', 'vram'],
    },
    {
        id: 'bim',
        name: { ko: 'BIM·건설', en: 'BIM & construction', ja: 'BIM・建設' },
        line: {
            ko: 'Revit에서 내보낸 IFC를 OpenUSD(Beta)로 바꾼 뒤, 속성값이 원본과 같은지 하나씩 대조해 공개했습니다(공조기 1파일).',
            en: 'We converted IFC exported from Revit to OpenUSD (Beta) and published a value-by-value check of its properties against the original (one AHU file).',
            ja: 'Revitから書き出したIFCをOpenUSD（Beta）に変換し、属性値が原本と同じかを一つずつ照合して公開しました（空調機1ファイル）。',
        },
        evidence: ['ahu', 'large-ifc'],
    },
    {
        id: 'robotics',
        name: { ko: '로봇·피지컬 AI', en: 'Robotics & physical AI', ja: 'ロボット・フィジカルAI' },
        line: {
            ko: 'CAD 어셈블리를 OpenUSD(Beta)로 바꾸면서 부품 이름과 계층이 남는지 시험했습니다(기어박스 1건). 원본과의 구조 대조 결과는 요청하시면 보여 드립니다.',
            en: 'We tested whether part names and hierarchy survive when a CAD assembly is converted to OpenUSD (Beta) (one gearbox). On request, we share the structure comparison against the original.',
            ja: 'CADアセンブリをOpenUSD（Beta）に変換する際、部品名と階層が残るかをテストしました（ギアボックス1件）。原本との構造照合結果はご要望に応じてお見せします。',
        },
        evidence: ['gearbox', 'usd-to-usd'],
    },
    {
        id: 'platform',
        name: { ko: '플랫폼·SI', en: 'Platforms & integrators', ja: 'プラットフォーム・SI' },
        line: {
            ko: '이미 있는 파이프라인에 3D 전처리를 붙이는 방식(Unity 연동, REST API)을 글로 소개했습니다. 연동 범위는 문의해 주세요.',
            en: 'We have written about attaching 3D preprocessing to an existing pipeline (Unity integration, REST API). Ask us about the scope for your case.',
            ja: '既存のパイプラインに3D前処理を組み込む方法（Unity連携、REST API）を投稿で紹介しています。連携範囲はお問い合わせください。',
        },
        evidence: [],
        link: {
            label: { ko: 'Unity 연동과 REST API 글', en: 'Unity integration and REST API post', ja: 'Unity連携とREST APIの投稿' },
            url: { ko: 'https://lnkd.in/p/dgwQnQyU', en: 'https://lnkd.in/p/dDPcsc-t' },
        },
    },
];

export const FAQ = [
    {
        q: { ko: '변환하면 부품 이름과 계층, 속성이 남나요?', en: 'Do part names, hierarchy and properties survive the conversion?', ja: '変換すると部品名・階層・属性は残りますか？' },
        a: {
            ko: '공개한 시험(공조기 1파일, 기어박스 1어셈블리, USD 1모델)에서는 원본과 대조해 남은 것을 확인했습니다. 파일마다 결과가 다를 수 있어 위 검증 기록에 조건을 함께 적었습니다.',
            en: 'In the tests we published (one AHU file, one gearbox assembly, one USD model) we checked the result against the original. Results can differ by file, so each record above lists its conditions.',
            ja: '公開したテスト（空調機1ファイル、ギアボックス1アセンブリ、USD1モデル）では原本と照合して残ったものを確認しました。ファイルにより結果は異なるため、上の検証記録に条件を併記しています。',
        },
    },
    {
        q: { ko: 'Revit(.rvt)이나 Inventor 파일을 바로 넣을 수 있나요?', en: 'Can I upload Revit (.rvt) or Inventor files directly?', ja: 'Revit（.rvt）やInventorのファイルをそのまま入れられますか？' },
        a: {
            ko: '직접 읽지는 못합니다. Revit은 IFC로, Inventor는 STEP으로 내보낸 파일을 넣어 주세요.',
            en: 'Not directly. Export Revit to IFC and Inventor to STEP, then use those files.',
            ja: '直接は読み込めません。RevitはIFC、InventorはSTEPで書き出したファイルをお使いください。',
        },
    },
    {
        q: { ko: 'OpenUSD 출력은 정식 기능인가요?', en: 'Is OpenUSD output a released feature?', ja: 'OpenUSD出力は正式機能ですか？' },
        a: {
            ko: '아직 Beta입니다. 결과를 공개할 때도 Beta라고 함께 적고 있습니다.',
            en: 'It is still in beta, and we label it that way wherever we publish results.',
            ja: 'まだBetaです。結果を公開する際もBetaと明記しています。',
        },
    },
    {
        q: { ko: '아주 큰 IFC 파일도 되나요?', en: 'Can it handle very large IFC files?', ja: '非常に大きなIFCファイルも扱えますか？' },
        a: {
            ko: '설치형에 대용량 IFC 옵션(Beta, CPU)이 있습니다. 2GB 파일에 메모리 20~25GB 정도가 필요하고, 3GB까지 처리를 확인했습니다. 그보다 크면 메모리가 걸림돌이 됩니다.',
            en: 'The on-premises version has a large-IFC option (beta, CPU). A 2 GB file needs roughly 20–25 GB of RAM, and we have confirmed files up to 3 GB; beyond that, memory becomes the limit.',
            ja: 'インストール版に大容量IFCオプション（Beta、CPU）があります。2GBのファイルにメモリ20〜25GB程度が必要で、3GBまで処理を確認しています。それ以上はメモリが制約になります。',
        },
    },
    {
        q: { ko: '파일을 회사 밖으로 보낼 수 없는 환경인데요.', en: 'Our files cannot leave our network.', ja: 'ファイルを社外に出せない環境です。' },
        a: {
            ko: '사내 PC에 설치하는 방식이 있어 파일이 밖으로 나가지 않습니다. 다만 시작할 때 인터넷 인증이 필요하고, 완전한 폐쇄망은 별도로 협의합니다.',
            en: 'An on-premises install keeps files on your machines. It still needs an internet check at sign-in; fully air-gapped setups are arranged case by case.',
            ja: '社内PCにインストールする方式があり、ファイルは外に出ません。ただし起動時にインターネット認証が必要で、完全な閉域網は別途ご相談となります。',
        },
    },
    {
        q: { ko: 'CFD·FEA 해석 입력으로 쓸 수 있나요?', en: 'Can the output be used as CFD or FEA input?', ja: 'CFD・FEA解析の入力に使えますか？' },
        a: {
            ko: '현재는 시각화와 시뮬레이션용입니다. 해석 입력 용도는 아직 확인되지 않았습니다.',
            en: 'Today it is for visualization and simulation. Use as analysis input has not been verified yet.',
            ja: '現在は可視化とシミュレーション用です。解析入力としての用途はまだ確認されていません。',
        },
    },
    {
        q: { ko: '우리 서비스에 붙여서 쓸 수 있나요?', en: 'Can we build it into our own service?', ja: '自社サービスに組み込めますか？' },
        a: {
            ko: 'Unity 연동과 REST API로 붙이는 방식을 글로 소개한 적이 있습니다. 어떤 범위까지 연동할 수 있는지는 사용하시는 환경을 듣고 답드리겠습니다.',
            en: 'We have shown integration through Unity and a REST API in a published post. How far it can go depends on your setup, so tell us about it and we will answer.',
            ja: 'Unity連携とREST APIによる組み込み方法を投稿で紹介しています。どこまで連携できるかは、ご利用環境を伺ったうえでお答えします。',
        },
    },
    {
        q: { ko: '무엇이 남았는지 리포트로 받을 수 있나요?', en: 'Can we get a report of what was kept?', ja: '何が残ったかをレポートで受け取れますか？' },
        a: {
            ko: '요청하시면 원본과 대조한 리포트를 드립니다. 형상 비교는 별도 도구인 PM OmniMetric으로 측정합니다.',
            en: 'On request, we provide a report comparing the result with the original. Shape is measured with PM OmniMetric, a separate tool.',
            ja: 'ご要望に応じて原本と照合したレポートをお渡しします。形状比較は別ツールのPM OmniMetricで測定します。',
        },
    },
];
