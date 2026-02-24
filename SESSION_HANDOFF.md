# PM AutoTwin Studio — 작업 핸드오프 문서
> **마지막 세션**: 2026-02-22 (토)  
> **프로젝트 경로**: `C:\Users\POCKETMEMORY\.gemini\antigravity\scratch\pm-autotwin-studio`  
> **로컬 서버**: `npm run dev` → `http://localhost:621`

---

## 📁 프로젝트 구조 (핵심 파일)

| 파일 | 역할 |
|------|------|
| `index.html` | 메인 랜딩페이지 전체 HTML (모든 섹션) |
| `src/style.css` | 전체 CSS (~2,600 lines) |
| `src/main.js` | Three.js 3D 엔진 + 스크롤 애니메이션 + 모든 인터랙션 (~790 lines) |
| `public/engine_opt.glb` | 최적화 와이어프레임 GLB (cyan) |
| `public/engine_heavy.glb` | 원본 와이어프레임 GLB (red/orange) |
| `public/heatmap.png` | PM OmniMetric 비교 이미지 |

---

## 🎬 페이지 섹션 순서 (위→아래)

1. **Hero** (`#hero`) — 3D 파티클 → 엔진 조립 → 스캔라인 애니메이션
2. **Studio Evolution** (`#studio`) — NEW 배지 + 파이프라인(01→02→03) + AI 생성/에셋매니저 카드
3. **Pain** (`#pain`) — 33%/25% 링 차트 + 혜택 카드 3개
4. **Precision** (`#precision`) — PM OmniMetric 비교 이미지 + 오차율 바 차트
5. **Zero** (`#zero`) — SaaS/On-Premise/API 배포 카드
6. **Trust** (`#trust`) — IEEE P3079.6 중앙 카드 + P3079.5/부의장사 stats + KPI 카드 3개
7. **CTA** (`#cta`) — 최종 전환 버튼

---

## ✅ 오늘 완료한 작업 목록

### Hero 3D 애니메이션
- [x] 파티클 chaos → 엔진 조립 → 스캔라인 → done 4단계 구현
- [x] 스캔라인 기준 위=CYAN(최적화) / 아래=RED(원본) 분리
- [x] `heavyClip` 클리핑 복원 (chaos 후반 crossfade로 제거된 것 scan phase에서 복원)
- [x] 와이어프레임 크로스페이드 (chaos 75~100%에서 점진적 등장)

### Studio Evolution 섹션 (신규 생성)
- [x] "NEW AutoTwin Studio" 배지 (펄스 글로우)
- [x] 3단계 파이프라인: AI 3D 생성 → GNN 최적화 → 에셋 매니저 (순차 등장)
- [x] AI 3D 생성 카드: 프롬프트 실시간 타이핑 데모 + 3D 큐브 스핀
- [x] 에셋 매니저 카드: 갤러리 그리드 + 태그 필터
- [x] 제목: "최적화를 넘어, 3D 자산 관리 OS로"
- [x] 설명: 디지털트윈 관점 (소화기/표지판 같은 가벼운 에셋 필요성)

### Pain 섹션
- [x] 제목: "3D 최적화는 **디지털트윈 자산화**의 숨은 병목"
- [x] "오토트윈 스튜디오는 이 반복 최적화를 원클릭 워크플로우로 줄입니다"
- [x] 33%/25% 링 차트 애니메이션 강화: 스트로크 10 + 글로우 drop-shadow + ringGlow 키프레임 + 카운팅 시 cyan 색 + 스케일 팝

### Precision 섹션
- [x] "AI-POWERED OPTIMIZATION" → **PM OMNIMETRIC** eyebrow
- [x] 제목: "용량 줄이면 깨지지 않나요? 수치로 직접 확인하세요."
- [x] 'PM옴니 매트릭' → **PM OmniMetric** (영문)
- [x] 맨밑 Chamfer 공식 **삭제**

### Zero 섹션
- [x] SaaS / On-Premise / API 배포 카드 Trust에서 이동
- [x] 배포 카드 **가운데 정렬** (max-width: 700px)
- [x] 기존 비교 패널 (기존 3D 도구 터미널 vs 오토트윈 드롭존) **완전 삭제**
- [x] 하단 대시보드 이미지 + 역할행(마케터/기획자 등) **삭제**

### Trust 섹션
- [x] IEEE 카드 **화면 중앙** 배치
- [x] P3079.5 / P3079.6 / 부의장사 골드 stat 배지 추가
- [x] "기술은 **숫자**로 증명됩니다" em 강조
- [x] KPI 카드 호버 글로우 효과
- [x] SaaS/OnPrem/API 배포 카드 **제거** (Zero로 이동)

### CTA 섹션
- [x] "현대, 삼성 등 대한민국 1등 기업들이 이미 검증한" 텍스트 **삭제**

---

## 🔧 기술 구현 상세

### 3D 엔진 (`main.js`)
- Three.js + GLTFLoader + OrbitControls
- 스크롤 기반 4-phase 시스템: `chaos` → `scan` → `done`
- `scrollProgress = scrollY / innerHeight` (0~1)
- 파티클 시스템: `BufferGeometry` + `Points`, `assemblyBlend`로 랜덤↔엔진 위치 보간
- 스캔라인: `ctx.scanPlane` (수평선) + `ctx.heavyClip` / `ctx.optClip` (클리핑 플레인)
- 와이어프레임: `engine_heavy.glb` (원본/red), `engine_opt.glb` (최적화/cyan)

### 링 차트 애니메이션 (`initRingCharts()`)
- SVG circle `stroke-dasharray: 534` / `stroke-dashoffset` 제어
- `IntersectionObserver` (threshold: 0.3)로 뷰포트 진입 시 트리거
- 숫자 카운트업: `requestAnimationFrame` + `easeOutCubic`
- 카운팅 중 `.counting` 클래스 → cyan 색 + scale(1.05)

### Studio 파이프라인 (`initStudioPrompt()`)
- 프롬프트 타이핑: 3개 문구 순환 (타이핑→삭제→다음)
- 파이프라인: `IntersectionObserver`로 진입 시 01→02→03 순차 등장

---

## 🚨 주의사항 (다음 세션 참고)

1. **스캔라인 클리핑**: `heavyWireframe`에 chaos 후반 `clippingPlanes = []` 설정 후, scan에서 반드시 `[ctx.heavyClip]`로 복원해야 함
2. **data-reveal**: 전역 CSS `[data-reveal]` opacity:0 → `.revealed` opacity:1 트랜지션. JS `initReveals()`가 IntersectionObserver로 처리
3. **폰트**: Space Grotesk, JetBrains Mono, Noto Sans KR (Google Fonts CDN)
4. **배포 카드 CSS**: `.trust__deploy-card` 클래스를 Zero 섹션에서도 사용 중 (Trust CSS 공유)

---

## 📋 향후 개선 가능 사항

- [ ] 모바일 반응형 최적화 (현재 데스크톱 중심)
- [ ] Studio 섹션 파이프라인 연결선 애니메이션 (화살표가 빛나며 흐르는 효과)
- [ ] PM OmniMetric 이미지에 호버 시 비교 슬라이더 인터랙션
- [ ] Trust KPI 링 차트에도 카운트업 애니메이션 강화
- [ ] 실 제품 스크린샷/영상 교체
- [ ] SEO meta 태그 / OG 이미지 설정
- [ ] Vercel 배포 설정
