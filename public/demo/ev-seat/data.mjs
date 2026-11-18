// 경북TP 시범 화면 — 예시 데이터 생성기 (실제 시험 값 아님)
// 같은 전기차 · 같은 구간(과속방지턱 + 회생제동) · 뒷좌석 시트 허리 받침 기준선 / v1 / v2

export const DUR = 30;          // 초
export const FS = 100;          // 화면용 표본 (Hz)
const SIM_FS = 1000;            // 계산용
export const LIMIT = 1.0;       // 기준(예시) m/s² — 실제 기준은 경북TP가 정함

export const EVENTS = [
  { key: 'bump', name: '과속방지턱', t0: 8.0, t1: 9.2 },
  { key: 'regen', name: '회생제동', t0: 12.0, t1: 14.2 },
];

export const PARTS = [
  { key: 'floor', name: '차체 바닥' },
  { key: 'rail', name: '시트 레일' },
  { key: 'cushion', name: '방석' },
  { key: 'back', name: '등판' },
  { key: 'lumbar', name: '허리 받침' },
  { key: 'head', name: '머리 받침' },
];

// 허리 받침 버전별 특성 (예시)
const LUMBAR = {
  base: { f: 5.2, z: 0.22, k: 0.95 },  // 양산 시트(기준선)
  v1:   { f: 5.6, z: 0.10, k: 1.15 },  // 새 허리 받침 v1 시작품
  v2:   { f: 6.4, z: 0.42, k: 0.80 },  // 개선 v2
};

export const RUNS = [
  { id: 'EX-396', ver: 'base', verName: '양산(기준선)', date: '1주차', speed: 40, road: '과속방지턱+회생제동', seed: 11 },
  { id: 'EX-398', ver: 'base', verName: '양산(기준선)', date: '1주차', speed: 40, road: '과속방지턱+회생제동', seed: 12 },
  { id: 'EX-410', ver: 'v1', verName: '허리 받침 v1', date: '2주차', speed: 40, road: '과속방지턱+회생제동', seed: 21 },
  { id: 'EX-412', ver: 'v1', verName: '허리 받침 v1', date: '2주차', speed: 40, road: '과속방지턱+회생제동', seed: 22 },
  { id: 'EX-417', ver: 'v2', verName: '허리 받침 v2', date: '3주차', speed: 40, road: '과속방지턱+회생제동', seed: 31 },
  { id: 'EX-419', ver: 'v2', verName: '허리 받침 v2', date: '3주차', speed: 40, road: '과속방지턱+회생제동', seed: 32 },
  { id: 'EX-402', ver: 'base', verName: '양산(기준선)', date: '1주차', speed: 30, road: '요철로', seed: 41, other: true },
];

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// 2차 공진 필터 (스프링-질량) : y'' + 2ζω y' + ω² y = k ω² x
function resonate(x, f, z, k) {
  const w = 2 * Math.PI * f, dt = 1 / SIM_FS; let y = 0, v = 0; const out = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) { const a = k * w * w * x[i] - 2 * z * w * v - w * w * y; v += a * dt; y += v * dt; out[i] = y; }
  return out;
}
// 변위 → 가속도 (화면은 가속도 m/s²)
function accel(y) { const n = y.length, a = new Float32Array(n), dt = 1 / SIM_FS; for (let i = 1; i < n - 1; i++) a[i] = (y[i + 1] - 2 * y[i] + y[i - 1]) / (dt * dt); return a; }

function speedAt(t, v0) { // km/h
  if (t < 12) return v0;
  if (t < 14.2) return v0 - (v0 * 0.45) * ((t - 12) / 2.2);
  if (t < 18) return v0 * 0.55;
  return Math.min(v0, v0 * 0.55 + (t - 18) * 2.2);
}
export function regenAt(t) { return t >= 12 && t < 14.2 ? 1 : 0; }

export let BUMP = 0.003;
export const SCALE = { floor: 1.35, rail: 1.19, cushion: 2.12, back: 0.863, lumbar: 1.05, head: 0.389 };
export function _set(b, sc) { BUMP = b; Object.assign(SCALE, sc); cache.clear(); }
function makeRun(run) {
  const r = rng(run.seed), N = DUR * SIM_FS;
  // 노면 변위 입력 (m) : 거친 노면 + 과속방지턱 + 회생제동 시 차체 피치 출렁임
  const road = new Float32Array(N); let n1 = 0, n2 = 0;
  const ph = [r() * 6, r() * 6, r() * 6];
  for (let i = 0; i < N; i++) {
    const t = i / SIM_FS;
    n1 = 0.97 * n1 + 0.03 * (r() - 0.5); n2 = 0.8 * n2 + 0.2 * (r() - 0.5);
    let d = 0.0016 * n1 + 0.0002 * n2 + 0.00025 * Math.sin(2 * Math.PI * 3.1 * t + ph[0]) + 0.00015 * Math.sin(2 * Math.PI * 7.3 * t + ph[1]);
    if (run.other) d *= 1.6;
    if (!run.other) {
      // 과속방지턱: 앞바퀴 8.3초, 뒷바퀴 8.55초
      for (const tb of [8.3, 8.56]) { const u = (t - tb) / 0.16; if (u > 0 && u < 1) d += BUMP * Math.sin(Math.PI * u) ** 2; }
      // 회생제동: 감속 시작·끝의 출렁임 (피치) + 구동 모터 떨림
      if (t > 12 && t < 14.2) d += 0.006 * Math.sin(2 * Math.PI * 1.6 * (t - 12)) * Math.exp(-(t - 12) * 0.9) + 0.00045 * Math.sin(2 * Math.PI * 5.4 * t);
    }
    road[i] = d;
  }
  const L = LUMBAR[run.ver];
  const jit = 1 + (r() - 0.5) * 0.06;
  const disp = {};
  disp.floor = resonate(road, 1.4, 0.32, 1.0);            // 차체 (서스펜션 위)
  // 바닥 고주파 성분
  const fl2 = resonate(road, 11, 0.3, 0.25); for (let i = 0; i < N; i++) disp.floor[i] += fl2[i];
  disp.rail = resonate(disp.floor, 18, 0.25, 1.05);
  disp.cushion = resonate(disp.rail, 4.6, 0.3, 1.0);
  disp.back = resonate(disp.rail, 7.5, 0.25, 1.05);
  disp.lumbar = resonate(disp.back, L.f, L.z, L.k * jit);
  disp.head = resonate(disp.back, 9, 0.2, 1.1);
  const out = { run, t: [], speed: [], regen: [], acc: {}, rms: {} };
  const step = SIM_FS / FS, M = DUR * FS;
  for (const p of PARTS) {
    const a = accel(disp[p.key]); const s = new Float32Array(M);
    for (let j = 0; j < M; j++) s[j] = a[j * step] * SCALE[p.key];
    out.acc[p.key] = s;
    // 0.5초 이동 RMS
    const w = FS / 2, rm = new Float32Array(M); let acc2 = 0;
    for (let j = 0; j < M; j++) { acc2 += s[j] * s[j]; if (j >= w) acc2 -= s[j - w] * s[j - w]; rm[j] = Math.sqrt(Math.max(acc2, 0) / Math.min(j + 1, w)); }
    // 가운데 맞춤
    const rc = new Float32Array(M); for (let j = 0; j < M; j++) rc[j] = rm[Math.min(M - 1, j + w / 2)];
    out.rms[p.key] = rc;
  }
  for (let j = 0; j < M; j++) { const t = j / FS; out.t.push(t); out.speed.push(speedAt(t, run.speed)); out.regen.push(regenAt(t)); }
  // 요약
  out.peak = {}; out.mean = {};
  for (const p of PARTS) { let mx = 0, sm = 0; const rr = out.rms[p.key]; for (let j = 0; j < M; j++) { mx = Math.max(mx, rr[j]); sm += rr[j]; } out.peak[p.key] = mx; out.mean[p.key] = sm / M; }
  // 기준 밖 구간 (허리 받침)
  out.over = []; let st = -1; const lr = out.rms.lumbar;
  for (let j = 0; j < M; j++) { const o = lr[j] > LIMIT; if (o && st < 0) st = j; if ((!o || j === M - 1) && st >= 0) { if (j - st > 5) out.over.push([st / FS, j / FS]); st = -1; } }
  return out;
}

const cache = new Map();
export function getRun(id) { if (!cache.has(id)) cache.set(id, makeRun(RUNS.find(r => r.id === id))); return cache.get(id); }

export function idx(t) { return Math.max(0, Math.min(DUR * FS - 1, Math.round(t * FS))); }

// 짧은 창 주파수 (DFT, 0.5~25 Hz)
export function spectrum(run, key, t, win = 3) {
  const s = run.acc[key], i0 = idx(Math.max(0, t - win / 2)), i1 = Math.min(s.length, i0 + win * FS);
  const res = [];
  for (let f = 0.5; f <= 25; f += 0.25) {
    let re = 0, im = 0;
    for (let j = i0; j < i1; j++) { const hw = 0.5 - 0.5 * Math.cos(2 * Math.PI * (j - i0) / (i1 - i0)); const ph = 2 * Math.PI * f * j / FS; re += s[j] * hw * Math.cos(ph); im -= s[j] * hw * Math.sin(ph); }
    res.push([f, 2 * Math.sqrt(re * re + im * im) / (i1 - i0)]);
  }
  return res;
}

// 센서 24개 (자리 · 채널 · 표준 이름)
export const SENSORS = [
  ['floor', '바닥_좌앞'], ['floor', '바닥_우앞'], ['floor', '바닥_좌뒤'], ['floor', '바닥_우뒤'],
  ['rail', '레일_좌앞'], ['rail', '레일_우앞'], ['rail', '레일_좌뒤'], ['rail', '레일_우뒤'],
  ['cushion', '방석_앞좌'], ['cushion', '방석_앞우'], ['cushion', '방석_가운데'], ['cushion', '방석_뒤좌'], ['cushion', '방석_뒤우'], ['cushion', '방석_허벅지'],
  ['back', '등판_위좌'], ['back', '등판_위우'], ['back', '등판_가운데'], ['back', '등판_어깨'],
  ['lumbar', '허리_좌'], ['lumbar', '허리_우'], ['lumbar', '허리_가운데'], ['lumbar', '허리_모터'],
  ['head', '머리_좌'], ['head', '머리_우'],
].map(([part, std], i) => ({ ch: 'CH' + String(i + 1).padStart(2, '0'), part, std }));
