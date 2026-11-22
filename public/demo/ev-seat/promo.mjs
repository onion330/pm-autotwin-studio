// 경북TP 제안 홍보 페이지 — 바로 눌러 보는 시연 (예시 데이터 · 직접 그린 3D · 외부 요청 없음)
import * as THREE from 'three';
import { OrbitControls } from './vendor/three/jsm/OrbitControls.js';
import { RoomEnvironment } from './vendor/three/jsm/RoomEnvironment.js';
import { DUR, FS, LIMIT, EVENTS, PARTS, getRun, idx } from './data.mjs';

const Q = new URLSearchParams(location.search), CAP = Q.has('cap');
const $ = s => document.querySelector(s);
const RUN = { base: 'EX-398', v1: 'EX-412', v2: 'EX-419' };
const SPF = { 30: 0.72, 40: 1, 60: 1.5 };             // 속도에 따른 진동 배율(예시)
const WIN = { bump: [7.4, 10.2], regen: [11.4, 15.0], all: [0, DUR] };
const SCN = { bump: '과속방지턱', regen: '회생제동', all: '30초 전체' };
const S = { sc: Q.get('sc') || 'bump', sp: +(Q.get('sp') || 40), ver: Q.get('v') || 'v1', view: Q.get('view') || 'out', t: 0, pick: Q.get('pick') || null };
S.t = +(Q.get('t') || (WIN[S.sc][0] + 1.2));
const PNAME = Object.fromEntries(PARTS.map(p => [p.key, p.name]));
const PART_ROLE = { lumbar: '파워 럼버서포트 · 허리를 받치는 부품', cushion: '방석 · 엉덩이·허벅지로 진동이 들어오는 곳', back: '등판 · 시트 프레임에 붙은 등받이', rail: '시트 레일 · 바닥과 시트를 잇는 첫 관문', head: '머리 받침', floor: '차체 바닥' };
const PART_COL = { rail: '#5B6B80', cushion: '#00A8E0', back: '#0068B0', lumbar: '#F08A24', head: '#86A9CF' };
const fmt = (v, d = 2) => v.toFixed(d);
const f = () => SPF[S.sp];
const val = (run, k, j) => run.rms[k][j] * f();
function meanW(run, k) { const [a, b] = WIN[S.sc]; let s = 0, n = 0; for (let j = idx(a); j <= idx(b); j++) { s += run.rms[k][j]; n++; } return s / n * f(); }
function overW(run) { const [a, b] = WIN[S.sc]; let c = 0, on = false; for (let j = idx(a); j <= idx(b); j++) { const o = run.rms.lumbar[j] * f() > LIMIT; if (o && !on) c++; on = o; } return c; }
const evAt = t => EVENTS.find(e => t >= e.t0 && t <= e.t1);

// ───────── 3D ─────────
const canvas = $('#c'), stage = $('#stage');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: CAP });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); renderer.toneMapping = THREE.ACESFilmicToneMapping;
const scene = new THREE.Scene(); scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 200);
const controls = new OrbitControls(camera, canvas); controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 1.2; controls.maxDistance = 9; controls.enableZoom = false;
scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c8da, 1.4)); const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(-3, 6, 4); scene.add(sun);
const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.05, ...o });
function rbox(w, h, d, r) {
  const s = new THREE.Shape(), x = -w / 2 + r, y = -h / 2 + r, W = w - 2 * r, H = h - 2 * r;
  s.moveTo(x, y - r); s.lineTo(x + W, y - r); s.quadraticCurveTo(x + W + r, y - r, x + W + r, y); s.lineTo(x + W + r, y + H); s.quadraticCurveTo(x + W + r, y + H + r, x + W, y + H + r); s.lineTo(x, y + H + r); s.quadraticCurveTo(x - r, y + H + r, x - r, y + H); s.lineTo(x - r, y); s.quadraticCurveTo(x - r, y - r, x, y - r);
  const g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.001, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r * 0.9, bevelSegments: 4, curveSegments: 6 }); g.translate(0, 0, -(d - 2 * r) / 2); g.computeVertexNormals(); return g;
}
function buildSeat(ghost) {
  const g = new THREE.Group(), parts = {}, M = k => ghost ? mat('#C9D5E2', { transparent: true, opacity: 0.28, depthWrite: false }) : mat(PART_COL[k]);
  const add = (k, m, p) => { m.userData.part = k; (parts[k] ||= []).push(m); p.add(m); return m; };
  for (const sx of [-0.19, 0.19]) add('rail', new THREE.Mesh(rbox(0.05, 0.05, 0.58, 0.012), M('rail')), g).position.set(sx, 0.03, 0);
  const cush = add('cushion', new THREE.Mesh(rbox(0.52, 0.13, 0.5, 0.045), M('cushion')), g); cush.position.set(0, 0.19, 0.02);
  const bk = new THREE.Group(); bk.position.set(0, 0.25, -0.22); bk.rotation.x = -0.2; g.add(bk);
  add('back', new THREE.Mesh(rbox(0.5, 0.64, 0.11, 0.045), M('back')), bk).position.set(0, 0.33, -0.02);
  const lum = add('lumbar', new THREE.Mesh(rbox(0.36, 0.17, 0.055, 0.022), M('lumbar')), bk); lum.position.set(0, 0.17, 0.055);
  add('head', new THREE.Mesh(rbox(0.27, 0.17, 0.09, 0.04), M('head')), bk).position.set(0, 0.76, -0.02);
  return { g, parts, bk, lum, cush };
}
const RAMP = ['#2F6FD0', '#33B6D8', '#8FD06A', '#F4C430', '#F08A24', '#E0393E'].map(c => new THREE.Color(c));
function heat(v) { const x = Math.max(0, Math.min(0.9999, v / 1.6)) * (RAMP.length - 1), i = Math.floor(x); return RAMP[i].clone().lerp(RAMP[i + 1], x - i); }

const car = new THREE.Group(); scene.add(car);
{
  const p = [[-2.3, 0.42], [-2.36, 0.95], [-2.18, 1.08], [-1.98, 1.6], [0.55, 1.66], [1.28, 1.08], [2.2, 0.98], [2.36, 0.62], [2.26, 0.42]];
  const sh = new THREE.Shape(); sh.moveTo(...p[0]); p.slice(1).forEach(q => sh.lineTo(...q)); sh.closePath();
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.72, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 3 }); geo.rotateY(-Math.PI / 2); geo.translate(0.86, 0, 0);
  car.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: '#8EC3EE', transparent: true, opacity: 0.09, roughness: 0.15, depthWrite: false, side: THREE.DoubleSide })));
  car.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), new THREE.LineBasicMaterial({ color: '#0068B0', transparent: true, opacity: 0.55 })));
  const wg = new THREE.CylinderGeometry(0.36, 0.36, 0.24, 32); wg.rotateZ(Math.PI / 2);
  for (const x of [-0.84, 0.84]) for (const z of [-1.45, 1.45]) { const w = new THREE.Mesh(wg, mat('#2A3748', { transparent: true, opacity: 0.28, depthWrite: false })); w.position.set(x, 0.36, z); car.add(w); }
  const fl = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.03, 3.9), mat('#BFD5EA', { transparent: true, opacity: 0.55 })); fl.position.y = 0.3; car.add(fl);
}
const subj = buildSeat(false); subj.g.position.set(-0.42, 0.315, -0.72); car.add(subj.g);
const fronts = []; for (const [x, z] of [[0.42, -0.72], [-0.42, 0.38], [0.42, 0.38]]) { const s = buildSeat(true); s.g.position.set(x, 0.315, z); car.add(s.g); if (z > 0) fronts.push(s.g); }
const rider = new THREE.Group(); {
  const m = new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.33, depthWrite: false, roughness: 0.9 }), cap = (r, l) => new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 6, 14), m);
  const torso = cap(0.15, 0.32); torso.position.set(0, 0.62, -0.13); torso.rotation.x = -0.2; rider.add(torso);
  const hd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 16), m); hd.position.set(0, 1.0, -0.2); rider.add(hd);
  for (const x of [-0.1, 0.1]) { const th = cap(0.07, 0.34); th.rotation.x = Math.PI / 2; th.position.set(x, 0.32, 0.1); rider.add(th); const sh = cap(0.06, 0.32); sh.position.set(x, 0.12, 0.3); rider.add(sh); }
  rider.position.copy(subj.g.position); car.add(rider);
}
const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: '#E8EEF5', roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.002; scene.add(ground);
const lane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 80), new THREE.MeshStandardMaterial({ color: '#AEB9C6', roughness: 1 })); lane.rotation.x = -Math.PI / 2; scene.add(lane);
const dashes = []; for (let i = 0; i < 16; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 2.2), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); d.rotation.x = -Math.PI / 2; d.position.set(1.8, 0.002, 0); scene.add(d); dashes.push(d); }
const bump = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 32; const x = c.getContext('2d'); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#1E2A38' : '#F4C430'; x.fillRect(i * 32, 0, 32, 32); }
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 3.4, 24, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c) })); m.rotation.z = Math.PI / 2; m.scale.set(1, 1, 0.22); const g = new THREE.Group(); g.add(m); g.scale.y = 0.25; scene.add(g); return g; })();
function mkHalo() { const g = new THREE.Group(); for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.19, 48), new THREE.MeshBasicMaterial({ color: '#E0393E', transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false })); m.userData.k = i / 3; g.add(m); } return g; }
const halo = mkHalo(); subj.bk.add(halo); halo.position.set(0, 0.17, 0.09);
// 진동 전달 경로
const flowTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d'); x.fillStyle = '#004B85'; x.fillRect(0, 0, 64, 8); x.fillStyle = '#00A8E0'; x.fillRect(0, 0, 22, 8); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 1); return t; })();
const pathPts = { floor: new THREE.Vector3(-0.72, 0.33, -0.36), rail: new THREE.Vector3(-0.61, 0.38, -0.47), back: new THREE.Vector3(-0.42, 0.85, -0.97), lumbar: new THREE.Vector3(-0.42, 0.66, -0.86) };
const pathMesh = (() => { const c = new THREE.CatmullRomCurve3([pathPts.floor, pathPts.rail, new THREE.Vector3(-0.5, 0.62, -0.88), pathPts.lumbar.clone().add(new THREE.Vector3(0, 0, 0.08))], false, 'catmullrom', 0.3);
  const m = new THREE.Mesh(new THREE.TubeGeometry(c, 80, 0.016, 10), new THREE.MeshBasicMaterial({ map: flowTex, transparent: true, opacity: 0.95 }));
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.09, 16), new THREE.MeshBasicMaterial({ color: '#E0393E' })); cone.position.copy(c.getPoint(1)); cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), c.getTangent(1));
  const g = new THREE.Group(); g.add(m, cone); car.add(g); return g; })();

// 라벨
const labels = new Map();
function lab(id, v3, html, cls) { let e = labels.get(id); if (!e) { e = document.createElement('div'); $('#labels').appendChild(e); labels.set(id, e); } e.className = 'lab ' + (cls || ''); e.innerHTML = html;
  const p = v3.clone().project(camera), r = canvas.getBoundingClientRect(); e.style.left = ((p.x + 1) / 2 * r.width) + 'px'; e.style.top = ((1 - p.y) / 2 * r.height) + 'px'; e.style.display = p.z < 1 ? '' : 'none'; e.dataset.u = '1'; }

// 카메라
const VIEWS = { out: { pos: [-2.45, 2.25, 0.95], tgt: [-0.28, 0.66, -0.8] }, rider: { pos: [-0.42, 1.42, -0.86], tgt: [-0.3, 0.55, 6] } };
function setView() { const v = VIEWS[S.view]; camera.position.set(...v.pos); controls.target.set(...v.tgt);
  const narrow = camera.aspect < 1.25;
  if (S.view === 'out') { if (narrow) camera.position.sub(controls.target).multiplyScalar(Math.min(1.7, 1.35 / camera.aspect)).add(controls.target); else camera.position.x -= 0.35; }
  controls.update(); controls.enabled = S.view === 'out'; }
function resize() { const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height);
  // 넓은 화면: 판정 카드 자리를 비우려고 시점을 왼쪽으로
  camera.setViewOffset(r.width, r.height, r.width > 900 ? r.width * 0.13 : 0, 0, r.width, r.height); camera.updateProjectionMatrix(); }

// 부품 누르기
const ray = new THREE.Raycaster(), pickables = Object.values(subj.parts).flat();
canvas.addEventListener('pointerdown', e => { canvas._d = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', e => { const d = canvas._d; if (!d || Math.hypot(e.clientX - d[0], e.clientY - d[1]) > 6) return; const r = canvas.getBoundingClientRect();
  ray.setFromCamera({ x: (e.clientX - r.left) / r.width * 2 - 1, y: -(e.clientY - r.top) / r.height * 2 + 1 }, camera); const h = ray.intersectObjects(pickables, false)[0];
  S.pick = h ? h.object.userData.part : null; ui(); });

// ───────── 화면 반영 ─────────
let shown = { num: 0 };
function verdictHTML() {
  const run = getRun(RUN[S.ver]), base = getRun(RUN.base), v1 = getRun(RUN.v1), mine = meanW(run, 'lumbar'), ov = overW(run);
  let target, sign = '', desc, sub;
  if (S.ver === 'base') { target = mine; desc = '허리 받침 진동 (양산 시트)'; sub = `${SCN[S.sc]} · ${S.sp} km/h · 평균 m/s²`; }
  else if (S.ver === 'v1') { target = (mine / meanW(base, 'lumbar') - 1) * 100; desc = '허리 받침 진동 · 양산 대비'; sub = `${SCN[S.sc]} · ${S.sp} km/h · 같은 차·같은 구간`; }
  else { target = (mine / meanW(v1, 'lumbar') - 1) * 100; desc = '허리 받침 진동 · v1 대비'; sub = `${SCN[S.sc]} · ${S.sp} km/h · 부품 하나만 바꿈`; }
  return { target, isPct: S.ver !== 'base', good: ov === 0, ov, desc, sub };
}
function ui() {
  document.querySelectorAll('[data-sc]').forEach(b => b.classList.toggle('on', b.dataset.sc === S.sc));
  document.querySelectorAll('[data-sp]').forEach(b => b.classList.toggle('on', +b.dataset.sp === S.sp));
  document.querySelectorAll('[data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === S.ver));
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === S.view));
  const v = verdictHTML(); vd = v; if (CAP) shown.num = v.target;
  setView(); drawCard(); drawPart();
}
let vd = null;
function drawCard() {
  const v = vd, run = getRun(RUN[S.ver]), j = idx(S.t), n = shown.num;
  const numTxt = v.isPct ? (n >= 0 ? '+' : '−') + Math.abs(Math.round(n)) + '%' : fmt(n);
  $('#verdict').className = 'verdict' + (v.good ? ' good' : '');
  $('#verdict').innerHTML = `<div class="k"><span>전·후 검증 리포트 · 초안</span><span>예시</span></div><div class="num">${numTxt}</div><div class="d">${v.desc}<small>${v.sub}</small></div>
   <span class="pill">${v.good ? '예시 기준 안 ✓' : `예시 기준 밖 ${v.ov}곳`}</span>
   <div class="live"><span>지금 <b>${fmt(val(run, 'lumbar', j))}</b> m/s²</span><span>${evAt(S.t) ? evAt(S.t).name + ' 중' : '일반 주행'}</span></div>`;
}
function drawPart() {
  const pc = $('#partcard'); if (!S.pick) { pc.hidden = true; return; } pc.hidden = false;
  const run = getRun(RUN[S.ver]), base = getRun(RUN.base), k = S.pick, m = meanW(run, k), d = m / meanW(base, k) - 1;
  pc.innerHTML = `<b>${PNAME[k]}</b>${PART_ROLE[k]}<div class="v">${fmt(m)} <span style="font-size:14px;font-weight:600">m/s²</span></div><span style="color:${Math.abs(d) < 0.05 ? '#9FD8F0' : d > 0 ? '#FF9A9D' : '#7BE0A6'}">${Math.abs(d) < 0.05 ? '양산과 같음' : '양산 대비 ' + (d > 0 ? '+' : '−') + Math.abs(Math.round(d * 100)) + '%'}</span> · ${SCN[S.sc]} 평균`;
}
function drawSpark() {
  const c = $('#spark'), r = c.getBoundingClientRect(), dp = Math.min(devicePixelRatio || 1, 2); c.width = r.width * dp; c.height = r.height * dp; const x = c.getContext('2d'); x.setTransform(dp, 0, 0, dp, 0, 0);
  const W = r.width, H = r.height, L = 118, R = 14, T = 12, B = 20, [a, b] = WIN[S.sc], X = t => L + (W - L - R) * (t - a) / (b - a), ymax = 2.2, Y = v => H - B - (v / ymax) * (H - T - B);
  x.font = '700 13px Pretendard'; x.fillStyle = '#0E1B2B'; x.fillText('허리 받침 진동', 12, 30); x.font = '600 11.5px Pretendard'; x.fillStyle = '#4B5D72'; x.fillText('m/s² · ' + SCN[S.sc], 12, 47);
  x.fillStyle = '#4B5D72'; x.fillText(`${a.toFixed(0)}초`, L, H - 5); x.fillText(`${b.toFixed(0)}초`, W - R - 24, H - 5);
  for (const e of EVENTS) if (e.t1 > a && e.t0 < b) { x.fillStyle = 'rgba(224,57,62,.08)'; x.fillRect(X(Math.max(a, e.t0)), T, X(Math.min(b, e.t1)) - X(Math.max(a, e.t0)), H - T - B); }
  x.setLineDash([5, 4]); x.strokeStyle = '#E0393E'; x.beginPath(); x.moveTo(L, Y(LIMIT)); x.lineTo(W - R, Y(LIMIT)); x.stroke(); x.setLineDash([]); x.fillStyle = '#E0393E'; x.fillText('기준(예시)', W - R - 62, Y(LIMIT) - 4);
  const line = (run, col, w) => { x.strokeStyle = col; x.lineWidth = w; x.beginPath(); for (let j = idx(a); j <= idx(b); j += 2) { const px = X(j / FS), py = Y(run.rms.lumbar[j] * f()); j === idx(a) ? x.moveTo(px, py) : x.lineTo(px, py); } x.stroke(); };
  if (S.ver !== 'base') line(getRun(RUN[S.ver === 'v2' ? 'v1' : 'base']), '#B8C4D2', 1.6);
  line(getRun(RUN[S.ver]), S.ver === 'v2' ? '#0F9D58' : S.ver === 'v1' ? '#E0393E' : '#0068B0', 2.4);
  x.strokeStyle = '#0E1B2B'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(X(S.t), T); x.lineTo(X(S.t), H - B); x.stroke();
}

const distCache = new Map();
function distTo(run, t) { const k = run.run.id + Math.round(t * FS); if (!distCache.has(k)) { let d = 0; for (let i = 0; i < idx(t); i++) d += run.speed[i] / 3.6 / FS; distCache.set(k, d); } return distCache.get(k); }
function frame(now) {
  const run = getRun(RUN[S.ver]), j = idx(S.t), amp = CAP ? 0 : 1;
  const dist = distTo(run, S.t) * S.sp / 40;
  dashes.forEach((d, i) => d.position.z = 40 - ((dist + i * 5) % 80));
  bump.position.z = 1.45 - (dist - distTo(run, 8.3) * S.sp / 40);
  car.position.y = run.acc.floor[j] * 0.004 * amp * f(); car.rotation.x = run.regen[j] ? -0.012 * Math.sin((S.t - 12) * 2.2) * amp : 0;
  subj.cush.position.y = 0.19 + run.acc.cushion[j] * 0.006 * amp * f(); subj.lum.position.z = 0.055 + run.acc.lumbar[j] * 0.006 * amp * f(); subj.bk.rotation.x = -0.2 + run.acc.back[j] * 0.004 * amp * f();
  for (const [k, arr] of Object.entries(subj.parts)) for (const m of arr) { const v = val(run, k, j); m.material.color.copy(heat(v));
    const pk = S.pick === k; m.material.emissive.set(pk ? '#00A8E0' : v > LIMIT ? '#E0393E' : '#000').multiplyScalar(pk ? 0.35 + 0.2 * Math.sin(now / 160) : v > LIMIT ? 0.35 + 0.25 * Math.sin(now / 120) : 0); }
  const lv = val(run, 'lumbar', j), over = lv > LIMIT; halo.visible = over && S.view === 'out';
  halo.children.forEach(m => { const ph = ((CAP ? 0.15 : now / 1400) + m.userData.k) % 1; m.scale.setScalar(1 + ph * 2.2); m.material.opacity = 0.55 * (1 - ph); });
  const out = S.view === 'out'; pathMesh.visible = out; rider.visible = out; fronts.forEach(g => g.visible = out); flowTex.offset.x = -(now / 600) % 1;
  for (const e of labels.values()) e.dataset.u = '';
  if (out) { car.updateMatrixWorld(true); const lp = new THREE.Vector3(); subj.lum.getWorldPosition(lp);
    lab('call', lp.clone().add(new THREE.Vector3(-0.05, 0.42, 0.12)), `허리 받침 ${fmt(lv)} m/s²<small>${over ? '예시 기준 밖' : '예시 기준 안'} · ${evAt(S.t) ? evAt(S.t).name : '주행 중'}</small>`, 'big' + (over ? '' : ' ok'));
    lab('pf', pathPts.floor.clone().add(new THREE.Vector3(-0.1, 0.0, 0.12)), `바닥 ${fmt(val(run, 'floor', j))}`, 'path');
    lab('pb', pathPts.back.clone().add(new THREE.Vector3(-0.2, 0.1, 0.1)), `등판 ${fmt(val(run, 'back', j))} → 허리 ×${(val(run, 'lumbar', j) / Math.max(0.01, val(run, 'back', j))).toFixed(1)}`, 'path'); }
  for (const e of labels.values()) if (!e.dataset.u) e.style.display = 'none';
  const hud = $('#hud'); hud.hidden = out; if (!out) { hud.innerHTML = `<div class="vig" style="--a:${Math.max(0, Math.min(0.6, (lv - 0.4) * 0.55)).toFixed(2)}"></div>`; const sh = CAP ? 0 : run.acc.lumbar[j] * 0.003 * f(); camera.position.set(VIEWS.rider.pos[0] + sh * 0.3, VIEWS.rider.pos[1] + sh, VIEWS.rider.pos[2]); }
  renderer.render(scene, camera);
}

// ───────── 반복 ─────────
let last = performance.now(), lastUi = 0;
function loop(now) {
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  if (!CAP) { const [a, b] = WIN[S.sc]; S.t += dt * (S.sc === 'all' ? 1.5 : 0.8); if (S.t > b) S.t = a; }
  if (vd) { shown.num += (vd.target - shown.num) * Math.min(1, dt * 6); }
  controls.update(); frame(now);
  if (now - lastUi > 120) { lastUi = now; drawCard(); drawSpark(); if (S.pick) drawPart(); }
  requestAnimationFrame(loop);
}
document.querySelectorAll('[data-sc]').forEach(b => b.onclick = () => { S.sc = b.dataset.sc; S.t = WIN[S.sc][0]; ui(); });
document.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { S.sp = +b.dataset.sp; ui(); });
document.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { S.ver = b.dataset.v; ui(); });
document.querySelectorAll('[data-view]').forEach(b => b.onclick = () => { S.view = b.dataset.view; ui(); });
addEventListener('resize', () => { resize(); setView(); });

// 흐름 화면
const CAPS = { 1: '① 제안 화면: 데이터로거 파일의 센서를 표준 이름·3D 자리로 정리하는 화면', 2: '② 제안 화면: 같은 시간축으로 3D 시트 색·그래프·주파수를 함께 보는 화면', 3: '③ 제안 화면: 같은 차·같은 구간 시험을 골라 겹쳐 버전별 차이를 보는 화면', 4: '④ 제안 화면: v1 → v2 부품별 변화와 예시 기준 안/밖을 한 줄로 보여 주는 화면', 5: '⑤ 제안 화면: 부품기업이 묻는 4가지에 답하는 전·후 검증 리포트 초안' };
function step(i) { document.querySelectorAll('.st').forEach(b => b.classList.toggle('on', +b.dataset.i === i)); $('#shot').src = `img/step0${i}.jpg`; $('#shotCap').textContent = CAPS[i] + ' — 예시 데이터 화면'; }
document.querySelectorAll('.st').forEach(b => b.onclick = () => { step(+b.dataset.i); clearInterval(auto); });
step(1); const auto = CAP ? 0 : setInterval(() => { const n = +document.querySelector('.st.on').dataset.i % 5 + 1; step(n); }, 4200);

// 성과판 숫자 올라가기
const kp = document.querySelectorAll('.kpis b');
const countUp = () => kp.forEach(b => { const N = +b.dataset.n, suf = b.dataset.suf || '', t0 = performance.now(); const tick = n => { const p = CAP ? 1 : Math.min(1, (n - t0) / 1400), v = Math.round(N * (1 - Math.pow(1 - p, 3))); b.textContent = v.toLocaleString('ko-KR') + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
if (CAP || !('IntersectionObserver' in window)) countUp(); else { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { countUp(); io.disconnect(); } }, { threshold: 0.4 }); io.observe($('#kpi')); }

resize(); ui(); requestAnimationFrame(loop);
