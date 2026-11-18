// 경북TP 시범 화면 — 예시 데이터 · 직접 만든 3D(외부 모델 없음) · 외부 요청 없음
import * as THREE from 'three';
import { OrbitControls } from './vendor/three/jsm/OrbitControls.js';
import { RoomEnvironment } from './vendor/three/jsm/RoomEnvironment.js';
import { DUR, FS, LIMIT, EVENTS, PARTS, RUNS, SENSORS, getRun, idx, spectrum } from './data.mjs';

const Q = new URLSearchParams(location.search);
const CAP = Q.has('cap');
const S = {
  step: Q.get('step') || 'hero', t: +(Q.get('t') || 12.7), playing: false, rate: 1,
  run: 'EX-412', base: 'EX-398', v2: 'EX-419', color: 'heat', path: true, rider: false,
};
const PNAME = Object.fromEntries(PARTS.map(p => [p.key, p.name]));
const PART_COL = { floor: '#8A9BB0', rail: '#5B6B80', cushion: '#00A8E0', back: '#0068B0', lumbar: '#F08A24', head: '#86A9CF' };
const $ = s => document.querySelector(s);
const fmt = (v, d = 2) => v.toFixed(d);
const pct = v => (v >= 0 ? '+' : '−') + Math.abs(Math.round(v * 100)) + '%';

// ───────── 색 ─────────
const RAMP = ['#2F6FD0', '#33B6D8', '#8FD06A', '#F4C430', '#F08A24', '#E0393E'].map(c => new THREE.Color(c));
function heat(v) { // v: m/s² RMS → 색 (0 ~ 1.6)
  const x = Math.max(0, Math.min(0.9999, v / 1.6)) * (RAMP.length - 1), i = Math.floor(x);
  return RAMP[i].clone().lerp(RAMP[i + 1], x - i);
}

// ───────── 통계 ─────────
function meanIn(run, key, t0 = 0, t1 = DUR) { const r = run.rms[key]; let s = 0, n = 0; for (let j = idx(t0); j <= idx(t1); j++) { s += r[j]; n++; } return s / n; }
function maxIn(run, key, t0 = 0, t1 = DUR) { const r = run.rms[key]; let m = 0; for (let j = idx(t0); j <= idx(t1); j++) m = Math.max(m, r[j]); return m; }
const evAt = t => EVENTS.find(e => t >= e.t0 && t <= e.t1);

// ───────── 3D ─────────
const canvas = $('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 200);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 1; controls.maxDistance = 14;
scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c8da, 1.4));
const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(-3, 6, 4); scene.add(sun);

function rbox(w, h, d, r) { // 둥근 상자
  const s = new THREE.Shape(), x = -w / 2 + r, y = -h / 2 + r, W = w - 2 * r, H = h - 2 * r;
  s.moveTo(x, y - r); s.lineTo(x + W, y - r); s.quadraticCurveTo(x + W + r, y - r, x + W + r, y); s.lineTo(x + W + r, y + H);
  s.quadraticCurveTo(x + W + r, y + H + r, x + W, y + H + r); s.lineTo(x, y + H + r); s.quadraticCurveTo(x - r, y + H + r, x - r, y + H); s.lineTo(x - r, y); s.quadraticCurveTo(x - r, y - r, x, y - r);
  const g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.001, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r * 0.9, bevelSegments: 4, curveSegments: 6 });
  g.translate(0, 0, -(d - 2 * r) / 2); g.computeVertexNormals(); return g;
}
const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.05, ...o });

// 시트 하나 (부품별 메시) — 원점 = 바닥
function buildSeat(ghost = false) {
  const g = new THREE.Group(), parts = {}, sensors = [];
  const M = k => ghost ? mat('#C9D5E2', { transparent: true, opacity: 0.28, depthWrite: false }) : mat(PART_COL[k]);
  const add = (k, mesh, parent) => { mesh.userData.part = k; (parts[k] ||= []).push(mesh); parent.add(mesh); return mesh; };
  for (const sx of [-0.19, 0.19]) { const m = add('rail', new THREE.Mesh(rbox(0.05, 0.05, 0.58, 0.012), M('rail')), g); m.position.set(sx, 0.03, 0); }
  const cush = add('cushion', new THREE.Mesh(rbox(0.52, 0.13, 0.5, 0.045), M('cushion')), g); cush.position.set(0, 0.19, 0.02);
  const bk = new THREE.Group(); bk.position.set(0, 0.25, -0.22); bk.rotation.x = -0.2; g.add(bk);
  const back = add('back', new THREE.Mesh(rbox(0.5, 0.64, 0.11, 0.045), M('back')), bk); back.position.set(0, 0.33, -0.02);
  const lum = add('lumbar', new THREE.Mesh(rbox(0.36, 0.17, 0.055, 0.022), M('lumbar')), bk); lum.position.set(0, 0.17, 0.055);
  const head = add('head', new THREE.Mesh(rbox(0.27, 0.17, 0.09, 0.04), M('head')), bk); head.position.set(0, 0.76, -0.02);
  if (!ghost) {
    const sg = new THREE.SphereGeometry(0.017, 16, 12);
    const put = (part, parent, p) => { const m = new THREE.Mesh(sg, mat('#fff', { emissive: '#000' })); m.position.copy(p); m.userData.part = part; parent.add(m); sensors.push(m); };
    const sp = { floor: [], rail: [], cushion: [], back: [], lumbar: [], head: [] };
    [[-0.3, 0.33], [0.3, 0.33], [-0.3, -0.36], [0.3, -0.36]].forEach(([x, z]) => put('floor', g, new THREE.Vector3(x, 0.005, z)));
    [[-0.19, 0.25], [0.19, 0.25], [-0.19, -0.25], [0.19, -0.25]].forEach(([x, z]) => put('rail', g, new THREE.Vector3(x, 0.065, z)));
    [[-0.15, 0.17], [0.15, 0.17], [0, 0.03], [-0.15, -0.12], [0.15, -0.12], [0, 0.22]].forEach(([x, z]) => put('cushion', g, new THREE.Vector3(x, 0.262, z + 0.02)));
    [[-0.16, 0.55], [0.16, 0.55], [0, 0.40], [0, 0.62]].forEach(([x, y]) => put('back', bk, new THREE.Vector3(x, y, 0.04)));
    [[-0.12, 0.17], [0.12, 0.17], [0, 0.2], [0, 0.13]].forEach(([x, y]) => put('lumbar', bk, new THREE.Vector3(x, y, 0.088)));
    [[-0.08, 0.77], [0.08, 0.77]].forEach(([x, y]) => put('head', bk, new THREE.Vector3(x, y, 0.03)));
  }
  return { g, parts, sensors, bk, lum, cush };
}

// 차체 (반투명) + 바퀴 + 바닥판
const car = new THREE.Group(); scene.add(car);
{
  const p = [[-2.3, 0.42], [-2.36, 0.95], [-2.18, 1.08], [-1.98, 1.6], [0.55, 1.66], [1.28, 1.08], [2.2, 0.98], [2.36, 0.62], [2.26, 0.42]];
  const sh = new THREE.Shape(); sh.moveTo(p[0][0], p[0][1]); p.slice(1).forEach(q => sh.lineTo(q[0], q[1])); sh.closePath();
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.72, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 3 });
  geo.rotateY(-Math.PI / 2); geo.translate(0.86, 0, 0);
  const shell = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: '#8EC3EE', transparent: true, opacity: 0.09, roughness: 0.15, depthWrite: false, side: THREE.DoubleSide }));
  car.add(shell);
  car.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), new THREE.LineBasicMaterial({ color: '#0068B0', transparent: true, opacity: 0.55 })));
  const wg = new THREE.CylinderGeometry(0.36, 0.36, 0.24, 32); wg.rotateZ(Math.PI / 2);
  for (const x of [-0.84, 0.84]) for (const z of [-1.45, 1.45]) { const w = new THREE.Mesh(wg, mat('#2A3748', { roughness: 0.8, transparent: true, opacity: 0.28, depthWrite: false })); w.position.set(x, 0.36, z); car.add(w); }
  const floor = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.03, 3.9), mat('#BFD5EA', { transparent: true, opacity: 0.55 })); floor.position.set(0, 0.3, 0); car.add(floor);
}
const subj = buildSeat(); subj.g.position.set(-0.42, 0.315, -0.72); car.add(subj.g);
const fronts = []; for (const [x, z] of [[0.42, -0.72], [-0.42, 0.38], [0.42, 0.38]]) { const s = buildSeat(true); s.g.position.set(x, 0.315, z); car.add(s.g); if (z > 0) fronts.push(s.g); }
// 탑승자 (흐린 사람 모양)
const rider = new THREE.Group(); {
  const m = new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.33, depthWrite: false, roughness: 0.9 });
  const cap = (r, l) => new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 6, 14), m);
  const torso = cap(0.15, 0.32); torso.position.set(0, 0.62, -0.13); torso.rotation.x = -0.2; rider.add(torso);
  const hd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 16), m); hd.position.set(0, 1.0, -0.2); rider.add(hd);
  for (const x of [-0.1, 0.1]) { const th = cap(0.07, 0.34); th.rotation.x = Math.PI / 2; th.position.set(x, 0.32, 0.1); rider.add(th); const sh = cap(0.06, 0.32); sh.position.set(x, 0.12, 0.3); rider.add(sh); }
  rider.position.copy(subj.g.position); car.add(rider);
}

// 길 (움직이는 차선·과속방지턱)
const road = new THREE.Group(); scene.add(road);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: '#E8EEF5', roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.001; scene.add(ground);
const lane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 60), new THREE.MeshStandardMaterial({ color: '#AEB9C6', roughness: 1 })); lane.rotation.x = -Math.PI / 2; scene.add(lane);
const dashes = []; for (let i = 0; i < 12; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 2.2), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); d.rotation.x = -Math.PI / 2; d.position.set(1.8, 0.002, 0); road.add(d); dashes.push(d); }
const bump = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 32; const x = c.getContext('2d'); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#1E2A38' : '#F4C430'; x.fillRect(i * 32, 0, 32, 32); }
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 3.4, 24, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c) }));
  m.rotation.z = Math.PI / 2; m.scale.set(1, 1, 0.22); const g = new THREE.Group(); g.add(m); g.scale.y = 0.25; road.add(g); return g; })();

// 진동 전달 경로 (바닥 → 레일 → 방석 → 허리 받침)
const pathGroup = new THREE.Group(); scene.add(pathGroup);
const flowTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d'); x.fillStyle = '#004B85'; x.fillRect(0, 0, 64, 8); x.fillStyle = '#00A8E0'; x.fillRect(0, 0, 22, 8); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 1); return t; })();
let pathMesh = null, pathCone = null; const pathPts = { floor: new THREE.Vector3(), rail: new THREE.Vector3(), cushion: new THREE.Vector3(), lumbar: new THREE.Vector3() };
function rebuildPath() {
  car.updateMatrixWorld(true);
  subj.sensors[0].getWorldPosition(pathPts.floor); pathPts.floor.x += 0.0;
  subj.sensors[4].getWorldPosition(pathPts.rail); subj.sensors[16].getWorldPosition(pathPts.cushion); subj.sensors[20].getWorldPosition(pathPts.lumbar);
  const lift = v => v.clone().add(new THREE.Vector3(-0.05, 0.02, 0.05));
  const pts = [lift(pathPts.floor), lift(pathPts.rail), lift(pathPts.cushion), lift(pathPts.lumbar).add(new THREE.Vector3(0, -0.02, 0.06))];
  const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.3);
  if (pathMesh) { pathGroup.remove(pathMesh); pathMesh.geometry.dispose(); }
  pathMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.016, 10), new THREE.MeshBasicMaterial({ map: flowTex, transparent: true, opacity: 0.95 }));
  pathGroup.add(pathMesh);
  if (!pathCone) { pathCone = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.09, 16), new THREE.MeshBasicMaterial({ color: '#E0393E' })); pathGroup.add(pathCone); }
  const end = curve.getPoint(1), tan = curve.getTangent(1); pathCone.position.copy(end); pathCone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tan);
}

// 허리 받침 경고 파동 (후킹용 강조)
function mkHalo() { const g = new THREE.Group(); for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.19, 48), new THREE.MeshBasicMaterial({ color: '#E0393E', transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false })); m.userData.k = i / 3; g.add(m); } return g; }
function haloTick(h, on, now) { h.visible = on; if (!on) return; h.children.forEach(m => { const ph = ((CAP ? 0.15 : now / 1400) + m.userData.k) % 1; m.scale.setScalar(1 + ph * 2.2); m.material.opacity = 0.55 * (1 - ph); }); }
const haloS = mkHalo(); subj.bk.add(haloS); haloS.position.set(0, 0.17, 0.09);
// 비교용 시트 두 개 (차 밖)
const cmp = new THREE.Group(); scene.add(cmp); cmp.visible = false;
const cmpA = buildSeat(), cmpB = buildSeat(); cmpA.g.position.set(-0.42, 0, 0); cmpB.g.position.set(0.42, 0, 0); cmp.add(cmpA.g, cmpB.g);
const haloA = mkHalo(); cmpA.bk.add(haloA); haloA.position.set(0, 0.17, 0.09); const haloB = mkHalo(); cmpB.bk.add(haloB); haloB.position.set(0, 0.17, 0.09);
const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.03, 64), mat('#FFFFFF')); plate.position.y = -0.016; cmp.add(plate);

// ───────── 라벨 ─────────
const labelsEl = $('#labels'); const labels = new Map();
function label(id, cls) { if (!labels.has(id)) { const e = document.createElement('div'); e.className = 'lab ' + (cls || ''); labelsEl.appendChild(e); labels.set(id, e); } return labels.get(id); }
function placeLabel(id, v3, html, cls) {
  const e = label(id, cls); e.className = 'lab ' + (cls || ''); e.innerHTML = html;
  const p = v3.clone().project(camera), r = canvas.getBoundingClientRect();
  e.style.left = ((p.x + 1) / 2 * r.width) + 'px'; e.style.top = ((1 - p.y) / 2 * r.height) + 'px'; e.style.display = p.z < 1 ? '' : 'none'; e.dataset.used = '1';
}

// ───────── 카메라 ─────────
const VIEWS = {
  car: { pos: [-2.45, 2.25, 0.95], tgt: [-0.28, 0.66, -0.8] },
  rider: { pos: [-0.42, 1.42, -0.86], tgt: [-0.3, 0.55, 6] },
  cmp: { pos: [0.0, 1.5, 2.75], tgt: [0, 0.62, -0.05] },
};
function setView(k) { const v = VIEWS[k]; camera.position.set(...v.pos); controls.target.set(...v.tgt);
  if (k !== 'rider' && camera.aspect < 1.2) { const f = Math.min(1.6, 1.3 / camera.aspect); camera.position.sub(controls.target).multiplyScalar(f).add(controls.target); }
  controls.update(); controls.enabled = k !== 'rider'; }
function resize() { const r = canvas.parentElement.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix(); }

// ───────── 3D 상태 반영 ─────────
function colorSeat(seat, run, t, mode = S.color) {
  const j = idx(t);
  for (const [k, arr] of Object.entries(seat.parts)) for (const m of arr) {
    if (mode === 'part') { m.material.color.set(PART_COL[k]); m.material.emissive.set('#000'); continue; }
    const v = run.rms[k][j]; m.material.color.copy(heat(v));
    m.material.emissive.copy(v > LIMIT ? new THREE.Color('#E0393E').multiplyScalar(0.35 + 0.25 * Math.sin(performance.now() / 120)) : new THREE.Color('#000'));
  }
  for (const s of seat.sensors) { const v = run.rms[s.userData.part][j]; s.material.color.copy(heat(v)); s.material.emissive.copy(heat(v)).multiplyScalar(0.6); s.scale.setScalar(1 + Math.min(1.4, v)); }
}
function shakeSeat(seat, run, t, amp = 1) {
  const j = idx(t);
  seat.cush.position.y = 0.19 + run.acc.cushion[j] * 0.006 * amp;
  seat.lum.position.z = 0.055 + run.acc.lumbar[j] * 0.006 * amp;
  seat.bk.rotation.x = -0.2 + run.acc.back[j] * 0.004 * amp;
}

function update3D() {
  const run = getRun(S.run), t = S.t, j = idx(t);
  const inCar = ['hero', 's1', 's2'].includes(S.step);
  car.visible = road.visible = lane.visible = inCar; cmp.visible = !inCar;
  pathGroup.visible = inCar && S.path && !S.rider && S.step !== 's1';
  rider.visible = inCar && !S.rider; fronts.forEach(g => g.visible = !S.rider);
  for (const e of labels.values()) e.dataset.used = '';
  if (inCar) {
    const v = run.speed[j] / 3.6;
    let dist = 0; for (let i = 0; i < j; i++) dist += run.speed[i] / 3.6 / FS;
    dashes.forEach((d, i) => { d.position.z = 30 - ((dist + i * 5) % 60); });
    bump.position.z = 1.45 - (dist - distAt(run, 8.3));
    car.position.y = run.acc.floor[j] * 0.004 * (CAP ? 0 : 1);
    car.rotation.x = run.regen[j] ? -0.012 * Math.sin((t - 12) * 2.2) : 0;
    shakeSeat(subj, run, t, CAP ? 0 : 1); haloTick(haloS, S.step !== 's1' && !S.rider && run.rms.lumbar[j] > LIMIT, performance.now());
    colorSeat(subj, run, t, S.step === 's1' ? 'part' : S.color);
    if (S.step === 's1') { const k = CAP ? 24 : Math.floor((performance.now() / 90) % 40); subj.sensors.forEach((s, i) => { s.material.color.set(i < k ? '#0F9D58' : '#9AB0C6'); s.material.emissive.set(i < k ? '#0F9D58' : '#000').multiplyScalar(0.5); s.scale.setScalar(1.5); }); }
    if (pathGroup.visible) { rebuildPath(); flowTex.offset.x = -(performance.now() / 600) % 1; }
    car.updateMatrixWorld(true);
    // 라벨
    const lp = new THREE.Vector3(); subj.lum.getWorldPosition(lp);
    if (!S.rider && S.step !== 's1') {
      const lv = run.rms.lumbar[j], over = lv > LIMIT, ev = evAt(t);
      placeLabel('callout', lp.clone().add(new THREE.Vector3(-0.05, 0.42, 0.12)), `허리 받침 ${fmt(lv)} m/s²<small>${over ? '기준 밖' : '기준 안'} · ${fmt(t, 1)}초${ev ? ' ' + ev.name : ''}</small>`, 'big' + (over ? '' : ' ok'));
      if (pathGroup.visible) for (const [k, nk] of [['floor', 'floor'], ['rail', 'rail'], ['cushion', 'back']]) placeLabel('p_' + k, pathPts[k].clone().add(new THREE.Vector3(-0.16, 0.04, 0.1)), `${PNAME[nk]} ${fmt(run.rms[nk][j])}`, 'path');
    }
    if (S.step === 's1' && !S.rider) {
      const pos = new THREE.Vector3();
      [[20, 'CH21 허리_가운데'], [10, 'CH11 방석_가운데'], [4, 'CH05 레일_좌앞'], [0, 'CH01 바닥_좌앞'], [16, 'CH17 등판_가운데']].forEach(([i, txt]) => { subj.sensors[i].getWorldPosition(pos); placeLabel('s' + i, pos.clone().add(new THREE.Vector3(0, 0.05, 0)), '✓ ' + txt); });
    }
  } else {
    const a = getRun(S.run), b = getRun(S.v2);
    const tt = S.step === 's4' ? 13.2 : t;
    colorSeat(cmpA, a, tt, 'heat'); colorSeat(cmpB, b, tt, 'heat');
    shakeSeat(cmpA, a, tt, CAP || S.step === 's4' ? 0 : 1); shakeSeat(cmpB, b, tt, CAP || S.step === 's4' ? 0 : 1);
    haloTick(haloA, (S.step === 's4' ? meanIn(a, 'lumbar', 12, 14.2) : a.rms.lumbar[idx(tt)]) > LIMIT, performance.now()); haloTick(haloB, (S.step === 's4' ? meanIn(b, 'lumbar', 12, 14.2) : b.rms.lumbar[idx(tt)]) > LIMIT, performance.now());
    cmp.updateMatrixWorld(true);
    const pa = new THREE.Vector3(), pb = new THREE.Vector3(); cmpA.g.getWorldPosition(pa); cmpB.g.getWorldPosition(pb);
    placeLabel('ta', pa.clone().add(new THREE.Vector3(0, 1.22, -0.3)), `허리 받침 v1 <span style="font-weight:500;color:#4B5D72">· ${S.run}</span>`, 'title v1');
    placeLabel('tb', pb.clone().add(new THREE.Vector3(0, 1.22, -0.3)), `허리 받침 v2 <span style="font-weight:500;color:#4B5D72">· ${S.v2}</span>`, 'title v2');
    const la = new THREE.Vector3(), lb = new THREE.Vector3(); cmpA.lum.getWorldPosition(la); cmpB.lum.getWorldPosition(lb);
    const va = S.step === 's4' ? meanIn(a, 'lumbar', 12, 14.2) : a.rms.lumbar[idx(tt)], vb = S.step === 's4' ? meanIn(b, 'lumbar', 12, 14.2) : b.rms.lumbar[idx(tt)];
    const sub = S.step === 's4' ? '회생제동 구간 평균' : fmt(tt, 1) + '초';
    placeLabel('ca', la.clone().add(new THREE.Vector3(0, 0.3, 0.08)), `${fmt(va)} m/s²<small>${va > LIMIT ? '기준 밖' : '기준 안'} · ${sub}</small>`, 'big' + (va > LIMIT ? '' : ' ok'));
    placeLabel('cb', lb.clone().add(new THREE.Vector3(0, 0.3, 0.08)), `${fmt(vb)} m/s²<small>${vb > LIMIT ? '기준 밖' : '기준 안'} · ${sub}</small>`, 'big' + (vb > LIMIT ? '' : ' ok'));
  }
  for (const e of labels.values()) if (!e.dataset.used) e.style.display = 'none';
  // 탑승자 시점 화면
  const hud = $('#riderHud'); hud.hidden = !(S.rider && inCar);
  if (S.rider && inCar) {
    const lv = run.rms.lumbar[j];
    hud.innerHTML = `<div class="vig" style="--a:${Math.max(0, Math.min(0.55, (lv - 0.4) * 0.5)).toFixed(2)}"></div><div class="meter">뒷좌석 왼쪽 · 허리에 느끼는 진동<b>${fmt(lv)} m/s²</b>${lv > LIMIT ? '<span style="color:#FF9A9D;font-weight:700">기준 밖</span>' : '기준 안'} · ${fmt(t, 1)}초${evAt(t) ? ' · ' + evAt(t).name : ''}<div class="m"><i style="width:${Math.min(100, lv / 1.6 * 100)}%"></i></div></div>`;
    const sh = CAP ? 0 : run.acc.lumbar[j] * 0.0025; camera.position.set(VIEWS.rider.pos[0] + sh * 0.3, VIEWS.rider.pos[1] + sh, VIEWS.rider.pos[2]);
  }
}
const distCache = new Map();
function distAt(run, t) { const k = run.run.id + t; if (!distCache.has(k)) { let d = 0; for (let i = 0; i < idx(t); i++) d += run.speed[i] / 3.6 / FS; distCache.set(k, d); } return distCache.get(k); }

// ───────── 2D 그래프 ─────────
function mkCanvas(box) { const c = document.createElement('canvas'); box.appendChild(c); return c; }
function prep(c) { const r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); c.width = r.width * d; c.height = r.height * d; const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0); x.font = '600 12.5px Pretendard, sans-serif'; return [x, r.width, r.height]; }
const VCOL = { base: '#8A9BB0', v1: '#E0393E', v2: '#0F9D58' };

function drawLanes(c, runs, keys, opt = {}) {
  const [x, W, H] = prep(c); const L = 92, R = 14, T = 10, B = 22;
  const wts = [0.7, ...keys.map(k => k === 'lumbar' && keys.length > 2 ? 1.9 : 1)], tw = wts.reduce((a, b) => a + b, 0), unit = (H - T - B) / tw;
  const laneY = i => T + unit * wts.slice(0, i).reduce((a, b) => a + b, 0), laneH = i => unit * wts[i]; let lh = laneH(0);
  const X = t => L + (W - L - R) * t / DUR;
  // 구간 띠
  for (const e of EVENTS) { x.fillStyle = 'rgba(224,57,62,.07)'; x.fillRect(X(e.t0), T, X(e.t1) - X(e.t0), H - T - B); }
  // 속도
  const r0 = runs[0];
  x.fillStyle = '#4B5D72'; x.fillText('속도 km/h', 10, T + lh / 2 + 4);
  for (let j = 0; j < r0.regen.length; j += 2) if (r0.regen[j]) { x.fillStyle = 'rgba(0,168,224,.25)'; x.fillRect(X(j / FS), T + lh * 0.55, 2 * (W - L - R) / (DUR * FS) + 0.5, lh * 0.35); }
  line(x, r0.speed, v => T + lh * 0.9 - (v / 50) * lh * 0.75, X, '#0068B0', 2);
  keys.forEach((k, i) => {
    const y0 = laneY(i + 1); lh = laneH(i + 1); const ymax = opt.ymax || 1.8, Y = v => y0 + lh - 4 - (v / ymax) * (lh - 8);
    x.strokeStyle = '#EEF2F7'; x.beginPath(); x.moveTo(L, y0); x.lineTo(W - R, y0); x.stroke();
    x.fillStyle = '#0E1B2B'; x.font = '700 13.5px Pretendard'; x.fillText(PNAME[k] || k, 10, y0 + lh / 2 + 2);
    x.font = '600 12px Pretendard'; x.fillStyle = '#4B5D72'; x.fillText('m/s²', 10, y0 + lh / 2 + 17); x.font = '600 12.5px Pretendard';
    if (k === 'lumbar' || opt.limitAll) { x.setLineDash([5, 4]); x.strokeStyle = '#E0393E'; x.beginPath(); x.moveTo(L, Y(LIMIT)); x.lineTo(W - R, Y(LIMIT)); x.stroke(); x.setLineDash([]); x.fillStyle = '#E0393E'; x.fillText('기준 ' + LIMIT.toFixed(1) + ' (예시)', W - R - 92, Y(LIMIT) - 4); }
    for (const r of runs) {
      const col = opt.colors ? VCOL[r.run.ver] : (k === 'lumbar' ? '#E0393E' : '#0068B0');
      if (!opt.colors) { x.globalAlpha = 0.18; line(x, r.acc[k], v => Y(Math.abs(v)), X, col, 1); x.globalAlpha = 1; }
      line(x, r.rms[k], Y, X, col, opt.colors ? 2 : 2.2);
      if (k === 'lumbar' && !opt.colors) for (const [a, b] of r.over) { x.fillStyle = 'rgba(224,57,62,.18)'; x.fillRect(X(a), y0 + 2, X(b) - X(a), lh - 4); }
    }
  });
  // 시간 축
  x.fillStyle = '#4B5D72'; for (let s = 0; s <= DUR; s += 5) x.fillText(s + '초', X(s) - 8, H - 6);
  // 커서
  x.strokeStyle = '#0E1B2B'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(X(S.t), T); x.lineTo(X(S.t), H - B); x.stroke(); x.lineWidth = 1;
}
function line(x, arr, Y, X, col, w) { x.strokeStyle = col; x.lineWidth = w; x.beginPath(); const st = Math.max(1, Math.floor(arr.length / 1500)); for (let j = 0; j < arr.length; j += st) { const px = X(j / FS), py = Y(arr[j]); j ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); x.lineWidth = 1; }

function drawSpectrum(c, runs, key = 'lumbar') {
  const [x, W, H] = prep(c); const L = 40, R = 12, T = 30, B = 24;
  const sp = runs.map(r => spectrum(r, key, S.t)); const mx = Math.max(0.05, ...sp.flat().map(p => p[1])) * 1.1;
  const X = f => L + (W - L - R) * f / 25, Y = v => H - B - (v / mx) * (H - T - B);
  x.fillStyle = '#0E1B2B'; x.font = '700 13.5px Pretendard'; x.fillText(`주파수 · ${PNAME[key]} (${fmt(S.t, 1)}초 앞뒤 3초)`, 10, 19); x.font = '600 12px Pretendard';
  x.fillStyle = 'rgba(240,138,36,.12)'; x.fillRect(X(4), T, X(8) - X(4), H - T - B); x.fillStyle = '#B5600F'; x.fillText('사람이 민감한 대역(예시)', X(8) + 6, H - B - 8);
  sp.forEach((s, i) => { const col = runs.length > 1 ? VCOL[runs[i].run.ver] : '#E0393E'; x.strokeStyle = col; x.lineWidth = 2.2; x.beginPath(); s.forEach(([f, v], j) => j ? x.lineTo(X(f), Y(v)) : x.moveTo(X(f), Y(v))); x.stroke();
    const pk = s.reduce((a, b) => b[1] > a[1] ? b : a); x.fillStyle = col; x.beginPath(); x.arc(X(pk[0]), Y(pk[1]), 4, 0, 7); x.fill(); x.font = '700 12.5px Pretendard'; x.fillText(pk[0].toFixed(1) + ' Hz', X(pk[0]) + 7, Y(pk[1]) + (i ? 14 : -4)); x.font = '600 12px Pretendard'; });
  x.fillStyle = '#4B5D72'; for (let f = 0; f <= 25; f += 5) x.fillText(f + ' Hz', X(f) - 10, H - 6);
}

function drawBars(c) {
  const [x, W, H] = prep(c); const runs = [getRun(S.base), getRun(S.run), getRun(S.v2)], keys = ['floor', 'rail', 'cushion', 'back', 'lumbar', 'head'];
  const L = 54, R = 16, T = 34, B = 30, gw = (W - L - R) / keys.length, bw = Math.min(46, gw / 4.2), mx = 1.25;
  const Y = v => H - B - (v / mx) * (H - T - B);
  x.fillStyle = '#0E1B2B'; x.font = '700 14px Pretendard'; x.fillText('부품별 진동 · 회생제동 구간(12.0~14.2초) 평균 RMS, m/s²', 12, 20);
  const leg = [['양산(기준선)', VCOL.base], ['허리 받침 v1', VCOL.v1], ['허리 받침 v2', VCOL.v2]]; let lx = W - 360; x.font = '600 13px Pretendard';
  leg.forEach(([n, col]) => { x.fillStyle = col; x.fillRect(lx, 10, 12, 12); x.fillStyle = '#0E1B2B'; x.fillText(n, lx + 17, 21); lx += 120; });
  x.setLineDash([5, 4]); x.strokeStyle = '#E0393E'; x.beginPath(); x.moveTo(L, Y(LIMIT)); x.lineTo(W - R, Y(LIMIT)); x.stroke(); x.setLineDash([]); x.fillStyle = '#E0393E'; x.fillText('기준 ' + LIMIT.toFixed(1) + ' (예시)', L + 4, Y(LIMIT) - 5);
  keys.forEach((k, i) => {
    const cx = L + gw * i + gw / 2; const vals = runs.map(r => meanIn(r, k, 12, 14.2));
    vals.forEach((v, n) => { const col = [VCOL.base, VCOL.v1, VCOL.v2][n]; x.fillStyle = col; const bx = cx + (n - 1.5) * bw + n * 3; x.fillRect(bx, Y(v), bw, H - B - Y(v)); x.fillStyle = '#0E1B2B'; x.font = '700 12.5px Pretendard'; x.fillText(v.toFixed(2), bx + 2, Y(v) - 5); });
    x.font = '700 14px Pretendard'; x.fillStyle = k === 'lumbar' ? '#B5600F' : '#0E1B2B'; x.fillText(PNAME[k], cx - x.measureText(PNAME[k]).width / 2, H - 9);
    if (k === 'lumbar') { const d = vals[2] / vals[1] - 1; x.fillStyle = '#0F9D58'; x.font = '800 17px Pretendard'; x.fillText('v1→v2 ' + pct(d), cx + 1.6 * bw + 8, Y(vals[2]) - 26); }
  });
}

function drawChannels(c) {
  const [x, W, H] = prep(c); const run = getRun(S.run), cols = 8, rows = 3, cw = (W - 12) / cols, ch = (H - 8) / rows;
  SENSORS.forEach((s, i) => {
    const cx = 6 + (i % cols) * cw, cy = 4 + Math.floor(i / cols) * ch;
    x.fillStyle = '#F5F8FC'; x.fillRect(cx + 3, cy + 3, cw - 6, ch - 6);
    x.fillStyle = '#0F9D58'; x.font = '800 12px Pretendard'; x.fillText('✓', cx + 10, cy + 20);
    x.fillStyle = '#0E1B2B'; x.font = '700 12.5px Pretendard'; x.fillText(`${s.ch} → ${s.std}`, cx + 24, cy + 20);
    const a = run.acc[s.part], mid = cy + ch / 2 + 10, sc = (ch / 2 - 18) / 2.2; x.strokeStyle = s.part === 'lumbar' ? '#E0393E' : '#0068B0'; x.lineWidth = 1; x.beginPath();
    for (let j = 0; j < a.length; j += 6) { const px = cx + 8 + (cw - 16) * j / a.length, py = mid - Math.max(-2.2, Math.min(2.2, a[j] * (1 + (i % 4) * 0.03))) * sc; j ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
  });
}

// ───────── 오른쪽 패널 ─────────
function chips(runId) {
  const r = getRun(runId).run, cls = r.ver === 'v1' ? '' : r.ver;
  return `<span class="chip id">시험 ${r.id}</span><span class="chip"><small>차량</small>전기 SUV(예시)</span><span class="chip"><small>구간</small>과속방지턱 + 회생제동</span><span class="chip"><small>속도</small>${r.speed} km/h</span><span class="chip"><small>좌석</small>뒷좌석 왼쪽 · 성인 1명</span><span class="chip ver ${cls}"><small>시트</small>${r.verName}</span><span class="chip"><small>시험 시기</small>${r.date}(예시)</span>`;
}
function cmpChips() { return `<span class="chip id">비교</span><span class="chip"><small>같은 차</small>전기 SUV(예시)</span><span class="chip"><small>같은 구간</small>과속방지턱 + 회생제동 · 40 km/h</span><span class="chip"><small>같은 자리</small>뒷좌석 왼쪽</span><span class="chip ver base">양산 ${S.base}</span><span class="chip ver">v1 ${S.run}</span><span class="chip ver v2">v2 ${S.v2}</span>`; }

function flowCard(run, t) {
  const j = idx(t), v = k => run.rms[k][j], g = (a, b) => v(b) / Math.max(0.01, v(a));
  const node = (k) => `<div class="node ${v(k) > LIMIT ? 'hot' : ''}"><b>${fmt(v(k))}</b><span>${PNAME[k]}</span></div>`;
  const arr = (a, b) => { const x = g(a, b); return `<div class="arr ${x > 1.4 ? 'up' : ''}">×${x.toFixed(1)}</div>`; };
  return `<div class="card"><h3>진동 전달 경로 · ${fmt(t, 1)}초 <em>m/s²</em></h3><div class="flow">${node('floor')}${arr('floor', 'rail')}${node('rail')}${arr('rail', 'back')}${node('back')}${arr('back', 'lumbar')}${node('lumbar')}</div>
  <div style="font-size:13.5px;color:#4B5D72;margin-top:8px">바닥에서 올라온 진동이 <b style="color:#E0393E">등판 → 허리 받침</b>에서 커집니다.</div></div>`;
}

function sideHTML() {
  const run = getRun(S.run), base = getRun(S.base), v2 = getRun(S.v2);
  const dUp = meanIn(run, 'lumbar') / meanIn(base, 'lumbar') - 1;
  const over = run.over.map(([a, b]) => `${a.toFixed(1)}~${b.toFixed(1)}초 ${evAt((a + b) / 2)?.name || ''}`).join(' · ');
  const attach = `<div class="attach"><div><b>원형 보존 리포트 함께 제공</b><br><span style="color:#4B5D72;font-size:13px">3D 시트 형상을 설계 원본과 대조한 근거 (시범 화면: 연결 전)</span></div></div>`;
  if (S.step === 'hero') return `
   <div class="card verdict"><h3>설계 소견 · 자동 초안 <em>담당자 확인 전</em></h3>
    <div class="headline"><div class="num">${pct(dUp)}</div><div class="desc">허리 받침 진동<small>양산 시트(${S.base}) 대비 · 같은 차·같은 구간</small></div></div>
    <ul class="rows">
     <li><span class="ic ok">✓</span><div>센서 자리 <b>24/24</b> 명세와 대조<small>3D 부품 위 좌표로 대조 (예시)</small></div></li>
     <li><span class="ic hot">!</span><div>기준 밖 <b>${run.over.length}곳</b><small>${over}</small></div></li>
     <li><span class="ic warn">▲</span><div>커지는 자리: <b>등판 → 허리 받침</b><small>5~6 Hz 부근에서 크게 흔들림</small></div></li>
     <li><span class="ic info">→</span><div>다음 확인 후보<small>허리 받침 지지 강성 · 모터 고정부 체결 (규칙 기반 후보)</small></div></li>
    </ul></div>${flowCard(run, S.t)}${attach}`;
  if (S.step === 's1') return `
   <div class="card"><h3>1. 시험 데이터 올리기</h3><div class="drop"><div class="file">CSV</div><div><b>EX-412_뒷좌석_v1.csv</b><small>데이터로거 원본 · 24채널 · 1,000 Hz · 30.0초 (예시)</small></div></div>
    <div class="bigok"><div class="num">24/24</div><span>센서를 표준 이름·3D 자리에 연결<small>형식 오류 0 · 단위 m/s² (예시 화면)</small></span></div></div>
   <div class="card"><h3>자동으로 읽은 시험 정보</h3><div class="filters" style="margin:0"><span>차량 <b>전기 SUV(예시)</b></span><span>구간 <b>과속방지턱+회생제동</b></span><span>속도 <b>40 km/h</b></span><span>좌석 <b>뒷좌석 왼쪽 · 성인 1명</b></span><span>시트 <b style="color:#A61B21">허리 받침 v1</b></span></div></div>
   <div class="card"><h3>쌓인 시험 <em>같은 차 · 같은 구간</em></h3><table class="t"><tr><th>시험</th><th>날짜</th><th>시트</th><th>상태</th></tr>
    ${RUNS.filter(r => !r.other).map(r => `<tr class="${r.id === S.run ? 'sel' : ''}"><td><b>${r.id}</b></td><td>${r.date}</td><td><span class="pill ${r.ver}">${r.verName}</span></td><td style="color:#0F9D58;font-weight:700">정리됨</td></tr>`).join('')}</table></div>`;
  if (S.step === 's2') {
    const j = idx(S.t), ev = evAt(S.t);
    const rows = PARTS.map(p => { const v = run.rms[p.key][j]; return `<tr><td><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${PART_COL[p.key]};margin-right:6px"></span>${p.name}</td><td class="n"><b>${fmt(v)}</b></td><td style="width:42%"><div style="height:9px;border-radius:5px;background:#EEF3F9"><div style="height:9px;border-radius:5px;width:${Math.min(100, v / 1.6 * 100)}%;background:#${heat(v).getHexString()}"></div></div></td></tr>`; }).join('');
    return `<div class="card"><h3>지금 이 순간 <em>${fmt(S.t, 1)}초</em></h3>
     <div style="display:flex;gap:10px;margin-bottom:10px"><span class="chip"><small>속도</small><b>${run.speed[j].toFixed(0)} km/h</b></span><span class="chip" style="${ev ? 'background:#FDECEC;color:#A61B21;font-weight:700' : ''}">${ev ? ev.name + ' 중' : '일반 주행'}</span></div>
     <table class="t"><tr><th>부품</th><th style="text-align:right">RMS m/s²</th><th></th></tr>${rows}</table></div>
     ${flowCard(run, S.t)}
     <div class="card"><h3>보는 방법</h3><div style="font-size:14px;line-height:1.55">재생 막대를 움직이면 <b>3D 시트 색 · 그래프 · 주파수</b>가 같은 시간으로 함께 움직입니다. <b>탑승자 시점</b>을 누르면 뒷좌석에 앉은 눈높이로 같은 순간을 봅니다.</div></div>`;
  }
  if (S.step === 's3') {
    const grp = v => RUNS.filter(r => r.ver === v && !r.other).map(r => getRun(r.id));
    const st = v => { const g = grp(v); return [g.length, g.reduce((s, r) => s + meanIn(r, 'lumbar'), 0) / g.length, Math.max(...g.map(r => r.peak.lumbar)), g.reduce((s, r) => s + r.over.length, 0) / g.length]; };
    const row = (v, n) => { const [c, m, p, o] = st(v); return `<tr><td><span class="pill ${v}">${n}</span></td><td class="n">${c}</td><td class="n"><b>${fmt(m)}</b></td><td class="n">${fmt(p)}</td><td class="n" style="color:${o ? '#E0393E' : '#0F9D58'};font-weight:700">${o ? o.toFixed(0) + '곳' : '0'}</td></tr>`; };
    return `<div class="card"><h3>3. 조건으로 골라 겹쳐 보기</h3><div class="filters"><span>차량 <b>전기 SUV(예시)</b></span><span>구간 <b>과속방지턱+회생제동</b></span><span>속도 <b>40 km/h</b></span><span>좌석 <b>뒷좌석 왼쪽</b></span></div>
     <table class="t"><tr><th></th><th>시험</th><th>시트</th></tr>${RUNS.map(r => `<tr><td><span class="chk ${r.other ? '' : 'on'}"></span></td><td><b>${r.id}</b> <span style="color:#4B5D72;font-size:12.5px">${r.other ? '요철로 · 30 km/h' : '같은 조건'}</span></td><td><span class="pill ${r.ver}">${r.verName}</span></td></tr>`).join('')}</table></div>
     <div class="card"><h3>허리 받침 · 시트 버전별 <em>m/s²</em></h3><table class="t"><tr><th>버전</th><th style="text-align:right">시험</th><th style="text-align:right">평균</th><th style="text-align:right">최대</th><th style="text-align:right">기준 밖</th></tr>${row('base', '양산')}${row('v1', 'v1')}${row('v2', 'v2')}</table>
     <div style="font-size:13.5px;color:#4B5D72;margin-top:8px">같은 조건 시험을 자동으로 모아 겹칩니다. 시험 횟수가 늘수록 판단이 단단해집니다.</div></div>`;
  }
  if (S.step === 's4') {
    const keys = ['floor', 'rail', 'cushion', 'back', 'lumbar', 'head'];
    const rows = keys.map(k => { const a = meanIn(base, k, 12, 14.2), b = meanIn(run, k, 12, 14.2), c = meanIn(v2, k, 12, 14.2), d = c / b - 1; return `<tr${k === 'lumbar' ? ' class="sel"' : ''}><td>${PNAME[k]}</td><td class="n">${fmt(a)}</td><td class="n" style="${b > LIMIT ? 'color:#E0393E;font-weight:750' : ''}">${fmt(b)}</td><td class="n">${fmt(c)}</td><td class="n ${Math.abs(d) < 0.05 ? '' : d < 0 ? 'dn' : 'up'}">${Math.abs(d) < 0.05 ? '변화 없음' : pct(d)}</td></tr>`; }).join('');
    const dl = meanIn(v2, 'lumbar', 12, 14.2) / meanIn(run, 'lumbar', 12, 14.2) - 1, db = meanIn(v2, 'lumbar') / meanIn(base, 'lumbar') - 1;
    return `<div class="card verdict good"><h3>4. 판정 · v1 → v2 <em>담당자 확인 전</em></h3>
     <div class="headline"><div class="num">${pct(dl)}</div><div class="desc">허리 받침 진동<small>회생제동 구간 · v1 대비 v2</small></div></div>
     <ul class="rows"><li><span class="ic ok">✓</span><div>기준 안 — 기준 밖 <b>${v2.over.length}곳</b><small>v1은 ${run.over.length}곳이었음</small></div></li>
     <li><span class="ic ok">✓</span><div>양산 시트보다도 <b>${pct(db)}</b><small>전체 30초 평균 기준</small></div></li>
     <li><span class="ic ok">✓</span><div>다른 부품 영향 없음<small>바닥·레일·방석·등판 변화 5% 안</small></div></li>
     <li><span class="ic info">→</span><div>다음 확인<small>속도 60 km/h · 요철로 조건 추가 시험 권장</small></div></li></ul></div>
     <div class="card"><h3>부품별 · 회생제동 구간 평균 <em>m/s²</em></h3><table class="t"><tr><th>부품</th><th style="text-align:right">양산</th><th style="text-align:right">v1</th><th style="text-align:right">v2</th><th style="text-align:right">v1→v2</th></tr>${rows}</table></div>`;
  }
  return '';
}

// ───────── 설계 소견서 ─────────
function reportHTML(img) {
  const base = getRun(S.base), v1 = getRun(S.run), v2 = getRun(S.v2);
  const m = (r, k) => meanIn(r, k, 12, 14.2), dl = m(v2, 'lumbar') / m(v1, 'lumbar') - 1;
  const bar = (n, v, col) => `<div><span>${n}</span><i style="width:${Math.min(100, v / 1.3 * 100)}%;background:${col}"></i><b>${fmt(v)}</b></div>`;
  return `<div class="paper">
   <div class="ph"><div><h1>설계 소견서 <span style="font-size:15px;color:#0068B0;font-weight:700">자동 초안</span><small>뒷좌석 시트 허리 받침 v2 · 같은 전기차 · 같은 구간(과속방지턱 + 회생제동) · 40 km/h</small></div>
    <div class="stamp">기준 안<small>담당자 확인 대기</small></div></div>
   <div class="sum"><div style="position:relative"><img src="${img}" alt="v1·v2 시트 진동 비교 3D"><span class="pill v1" style="position:absolute;left:12px;top:10px;font-size:14px">v1 · 기준 밖</span><span class="pill v2" style="position:absolute;right:12px;top:10px;font-size:14px">v2 · 기준 안</span></div>
    <div><h2 style="margin-top:0">한 줄 소견</h2><div class="q"><b>허리 받침을 v2로 바꾼 뒤, 회생제동 구간 진동이 ${pct(dl)} 줄었고 기준 안으로 들어왔습니다.</b> 다른 부품(바닥·레일·방석·등판)에는 영향이 없습니다.</div>
     <h2>부품기업이 묻는 4가지</h2><div class="q" style="font-size:14.5px">
      ① 어느 부품? — <b>허리 받침</b><br>② 언제? — <b>회생제동 12~14초, 과속방지턱 8~9초</b><br>③ 얼마나? — v1 ${fmt(m(v1, 'lumbar'))} → v2 <b>${fmt(m(v2, 'lumbar'))} m/s²</b><br>④ 믿어도 되나? — <b>센서 자리 24/24 대조 · 원형 보존 리포트 함께</b></div></div></div>
   <h2>허리 받침 · 회생제동 구간 평균 (m/s², 기준 ${LIMIT.toFixed(1)} — 예시)</h2>
   <div class="bars">${bar('양산', m(base, 'lumbar'), '#8A9BB0')}${bar('v1', m(v1, 'lumbar'), '#E0393E')}${bar('v2', m(v2, 'lumbar'), '#0F9D58')}</div>
   <h2>다음 확인 권장</h2><div class="q" style="font-size:14.5px">속도 60 km/h · 요철로 조건 추가 시험 → 같은 화면에서 자동 비교 · 내구 시험 뒤 재측정</div>
   <h2>첨부</h2><div class="q" style="font-size:14.5px">시험 원자료 6건(${RUNS.filter(r => !r.other).map(r => r.id).join(', ')}) · 원형 보존 리포트(3D·센서 자리 대조) · 3D 재현 링크</div>
   <div class="foot"><span>판정 기준은 시험 기관이 정합니다 · 이 문서는 자동 초안이며 담당자가 확인 후 발행</span><span>예시 데이터</span></div></div>`;
}

// ───────── 화면 전환 ─────────
const charts = $('#charts');
function layout() {
  const st = S.step; $('#app').classList.toggle('nobottom', st === 's5');
  document.querySelectorAll('#steps button').forEach(b => b.classList.toggle('on', b.dataset.step === st));
  $('#runbar').innerHTML = ['s3', 's4', 's5'].includes(st) ? cmpChips() : chips(S.run);
  const inCar = ['hero', 's1', 's2'].includes(st);
  $('#stageTools').style.display = inCar && st !== 's1' ? '' : 'none';
  $('#btnRider').classList.toggle('on', S.rider); $('#btnColor').classList.toggle('on', S.color === 'part'); $('#btnPath').classList.toggle('on', S.path);
  $('#legend').innerHTML = (S.color === 'part' && inCar) || st === 's1' ? `<div style="font-weight:700;margin-bottom:6px">시트 부품 (계측 단위)</div><div class="parts">${['cushion', 'back', 'lumbar', 'head', 'rail'].map(k => `<span style="--c:${PART_COL[k]}">${PNAME[k]}</span>`).join('')}</div>`
    : `<b>진동 세기</b> <span style="color:#4B5D72">RMS, m/s²</span><div class="bar"></div><div class="ticks"><span>0</span><span>0.4</span><span>0.8</span><span style="color:#E0393E;font-weight:700">1.0 기준(예시)</span><span>1.6</span></div>`;
  charts.innerHTML = ''; charts.className = '';
  if (st === 'hero') { const b = box(); }
  else if (st === 's1') box();
  else if (['s2', 's3'].includes(st)) { charts.className = 'two'; box(); box(); }
  else if (st === 's4') box();
  $('#transport').style.display = st === 's4' || st === 's1' ? 'none' : '';
  $('#bottom').style.gridTemplateRows = st === 's4' || st === 's1' ? '1fr' : '';
  const rep = $('#report'); rep.hidden = st !== 's5';
  if (st === 's5') { setView('cmp'); S.rider = false; const keep = S.step; S.step = 's4'; resize(); update3D(); renderer.render(scene, camera); const img = renderer.domElement.toDataURL('image/png'); S.step = keep; rep.innerHTML = reportHTML(img); }
  resize(); setView(S.rider && inCar ? 'rider' : inCar ? 'car' : 'cmp');
  drawAll(); $('#side').innerHTML = sideHTML();
  function box() { const d = document.createElement('div'); d.className = 'chartBox'; charts.appendChild(d); mkCanvas(d); return d; }
}
function drawAll() {
  const cs = charts.querySelectorAll('canvas'); const run = getRun(S.run);
  if (S.step === 'hero') drawLanes(cs[0], [run], ['floor', 'rail', 'back', 'lumbar']);
  if (S.step === 's1') drawChannels(cs[0]);
  if (S.step === 's2') { drawLanes(cs[0], [run], ['floor', 'rail', 'back', 'lumbar']); drawSpectrum(cs[1], [run]); }
  if (S.step === 's3') { const rs = RUNS.filter(r => !r.other).map(r => getRun(r.id)); drawLanes(cs[0], rs, ['lumbar', 'back'], { colors: true, ymax: 1.9 }); drawSpectrum(cs[1], [getRun(S.base), run, getRun(S.v2)]); }
  if (S.step === 's4') drawBars(cs[0]);
  $('#tNow').textContent = fmt(S.t, 1) + '초'; $('#tRange').value = S.t; $('#scrubFill').style.width = (S.t / DUR * 100) + '%';
}

// 재생 막대 구간 표시
$('#scrubEv').innerHTML = EVENTS.map(e => `<div class="ev" style="left:${e.t0 / DUR * 100}%;width:${(e.t1 - e.t0) / DUR * 100}%"><span>${e.name}</span></div>`).join('');

// ───────── 입력 ─────────
document.querySelectorAll('#steps button').forEach(b => b.onclick = () => { S.step = b.dataset.step; if (!['hero', 's1', 's2'].includes(S.step)) S.rider = false; layout(); });
$('#btnRider').onclick = () => { S.rider = !S.rider; layout(); };
$('#btnColor').onclick = () => { S.color = S.color === 'part' ? 'heat' : 'part'; layout(); };
$('#btnPath').onclick = () => { S.path = !S.path; layout(); };
$('#play').onclick = () => { S.playing = !S.playing; $('#play').textContent = S.playing ? '❚❚' : '▶'; if (S.playing && S.t >= DUR - 0.05) S.t = 0; };
$('#tRange').oninput = e => { S.t = +e.target.value; drawAll(); slowSide(true); };
document.querySelectorAll('#speedSel button').forEach(b => b.onclick = () => { S.rate = +b.dataset.r; document.querySelectorAll('#speedSel button').forEach(x => x.classList.toggle('on', x === b)); });
addEventListener('resize', () => { resize(); setView(S.rider && ['hero', 's1', 's2'].includes(S.step) ? 'rider' : ['hero', 's1', 's2'].includes(S.step) ? 'car' : 'cmp'); drawAll(); });
let lastSide = 0; function slowSide(force) { const n = performance.now(); if (force || n - lastSide > 250) { lastSide = n; $('#side').innerHTML = sideHTML(); } }

// ───────── 반복 ─────────
let last = performance.now(), lastDraw = 0;
function loop(now) {
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  if (S.playing) { S.t += dt * S.rate; if (S.t >= DUR) { S.t = DUR; S.playing = false; $('#play').textContent = '▶'; } if (now - lastDraw > 66) { drawAll(); lastDraw = now; } if (['hero', 's2'].includes(S.step)) slowSide(); }
  controls.update(); update3D(); renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
layout();
if (CAP) document.fonts.ready.then(() => layout());
requestAnimationFrame(loop);
if (Q.get('rider')) { S.rider = true; layout(); }
