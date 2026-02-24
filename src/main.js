/* ═══════════════════════════════════════════════════════════
   PM AutoTwin Studio — V8 Clipping Plane Scanline
   
   TWO wireframes + ClipPlane = physically split at scanline Y
   BELOW scanline: engine.glb RED/ORANGE dense wireframe  
   ABOVE scanline: optimize_engine.glb CYAN clean wireframe
   
   Phases:
   1. Chaos (0→0.32): scattered particles → assemble into engine shape
   2. Scan  (0.32→0.72): scanline sweeps, clipping planes split the two models
   3. Done  (0.72→1.0): fully optimized, fade out
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initI18n, getLang } from './i18n.js';

const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 12000 : 24000;
const MODEL_SCALE = 2.64;

function smoothStep(t) { const c = Math.max(0, Math.min(1, t)); return c * c * (3 - 2 * c); }
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

/* ─── Unified GLB processing ─── */
function processGLB(gltf) {
  const allVerts = [];
  const meshes = [];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(c => {
    if (c.isMesh && c.geometry) {
      meshes.push(c);
      const pos = c.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        v.applyMatrix4(c.matrixWorld);
        allVerts.push(v);
      }
    }
  });
  const bbox = new THREE.Box3();
  allVerts.forEach(v => bbox.expandByPoint(v));
  const center = new THREE.Vector3(); bbox.getCenter(center);
  const sz = new THREE.Vector3(); bbox.getSize(sz);
  const s = MODEL_SCALE / Math.max(sz.x, sz.y, sz.z);
  return { allVerts, meshes, center, s };
}

function sampleParticles(proc, count) {
  const { allVerts, center, s } = proc;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = allVerts[Math.floor(Math.random() * allVerts.length)];
    arr[i * 3] = (v.x - center.x) * s + (Math.random() - 0.5) * 0.004;
    arr[i * 3 + 1] = (v.y - center.y) * s + (Math.random() - 0.5) * 0.004;
    arr[i * 3 + 2] = (v.z - center.z) * s + (Math.random() - 0.5) * 0.004;
  }
  return arr;
}

function buildWireframeGroup(proc, color, edgeAngle, clipPlanes) {
  const { meshes, center, s } = proc;
  const group = new THREE.Group();
  meshes.forEach(child => {
    // Wireframe triangles (subtle fill)
    const wireMat = new THREE.MeshBasicMaterial({
      color, wireframe: true, transparent: true, opacity: 0.25,
      depthWrite: false, clippingPlanes: clipPlanes, clipShadows: true,
    });
    const wMesh = new THREE.Mesh(child.geometry.clone(), wireMat);
    wMesh.applyMatrix4(child.matrixWorld);
    group.add(wMesh);
    // Edge lines (structural outlines)
    const edges = new THREE.EdgesGeometry(child.geometry, edgeAngle);
    const eMat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.7,
      linewidth: 1, clippingPlanes: clipPlanes,
    });
    const lines = new THREE.LineSegments(edges, eMat);
    lines.applyMatrix4(child.matrixWorld);
    group.add(lines);
  });
  // Same transform as particles
  group.position.set(-center.x * s, -center.y * s, -center.z * s);
  group.scale.setScalar(s);
  return group;
}

function generateChaos(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    // Wider spread (1.0→8.0) for more dramatic filling of screen
    const r = 1.0 + Math.random() * 7.0;
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
    arr[i * 3 + 2] = r * Math.cos(phi) * 0.8;
  }
  return arr;
}

/* ═══ INIT SCENE ═══ */
async function initScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.3, 6.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x050816, 1);
  renderer.localClippingEnabled = true; // CRITICAL for clip planes

  const loader = new GLTFLoader();

  // ── Clipping planes (updated every frame) ──
  // heavyClip: keeps y ≤ scanY (BELOW scanline)
  const heavyClip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 999);
  // optClip: keeps y ≥ scanY (ABOVE scanline)  
  const optClip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 999);

  // ── Master group (unified rotation) ──
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // ── Load engine.glb (HEAVY original — red, dense) ──
  let engineProc = null, enginePos = null, heavyWireframe = null;
  try {
    const gltf = await new Promise((r, e) => loader.load('/engine.glb', r, null, e));
    engineProc = processGLB(gltf);
    enginePos = sampleParticles(engineProc, PARTICLE_COUNT);
    // Dense wireframe: low edge angle = MORE lines = heavier look
    heavyWireframe = buildWireframeGroup(engineProc, 0xffaa33, 12, [heavyClip]);
    heavyWireframe.visible = false;
    masterGroup.add(heavyWireframe);
    console.log('✅ engine.glb —', engineProc.allVerts.length, 'verts, RED wireframe');
  } catch (e) { console.warn('⚠ engine.glb:', e); }

  // ── Load optimize_engine.glb (OPTIMIZED — cyan, clean) ──
  let optProc = null, optPos = null, optWireframe = null;
  try {
    const gltf = await new Promise((r, e) => loader.load('/optimize_engine.glb', r, null, e));
    optProc = processGLB(gltf);
    optPos = sampleParticles(optProc, PARTICLE_COUNT);
    // Clean wireframe: high edge angle = FEWER lines = cleaner look
    optWireframe = buildWireframeGroup(optProc, 0x00f3ff, 35, [optClip]);
    optWireframe.visible = false;
    masterGroup.add(optWireframe);
    console.log('✅ optimize_engine.glb —', optProc.allVerts.length, 'verts, CYAN wireframe');
  } catch (e) { console.warn('⚠ optimize_engine.glb:', e); }

  // Fallback
  if (!enginePos) {
    enginePos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      enginePos[i * 3] = (Math.random() - 0.5) * 3; enginePos[i * 3 + 1] = (Math.random() - 0.5) * 2; enginePos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
  }
  if (!optPos) optPos = new Float32Array(enginePos);

  // ── Y range from engine particles ──
  let minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = enginePos[i * 3 + 1];
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const yMargin = (maxY - minY) * 0.05;
  minY -= yMargin; maxY += yMargin;

  // ── Particles ──
  const chaosPos = generateChaos(PARTICLE_COUNT);
  const seeds = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) seeds[i] = Math.random() * Math.PI * 2;

  // Survival: 25% particles stay visible after optimization (75% disappear = dramatically sparser)
  const survives = new Uint8Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) survives[i] = Math.random() < 0.25 ? 1 : 0;

  // Color arrays
  const heavyCol = new Float32Array(PARTICLE_COUNT * 3);
  const cleanCol = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3, b = Math.random();
    // HEAVY: warm amber/gold palette (easier to see individual wires)
    if (b < 0.4) { heavyCol[i3] = 1.0; heavyCol[i3 + 1] = 0.65; heavyCol[i3 + 2] = 0.15; }       // amber
    else if (b < 0.7) { heavyCol[i3] = 0.95; heavyCol[i3 + 1] = 0.55; heavyCol[i3 + 2] = 0.1; }   // dark gold
    else if (b < 0.9) { heavyCol[i3] = 1.0; heavyCol[i3 + 1] = 0.78; heavyCol[i3 + 2] = 0.3; }    // light gold
    else { heavyCol[i3] = 1.0; heavyCol[i3 + 1] = 0.85; heavyCol[i3 + 2] = 0.5; }                  // warm white
    // CLEAN: saturated cyan/white
    const c = Math.random();
    if (c < 0.5) { cleanCol[i3] = 0.0; cleanCol[i3 + 1] = 0.9; cleanCol[i3 + 2] = 1.0; }
    else if (c < 0.8) { cleanCol[i3] = 0.3; cleanCol[i3 + 1] = 0.95; cleanCol[i3 + 2] = 1.0; }
    else { cleanCol[i3] = 0.95; cleanCol[i3 + 1] = 0.98; cleanCol[i3 + 2] = 1.0; }
  }

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const psizes = new Float32Array(PARTICLE_COUNT);
  const baseSize = isMobile ? 0.025 : 0.018;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = chaosPos[i3]; positions[i3 + 1] = chaosPos[i3 + 1]; positions[i3 + 2] = chaosPos[i3 + 2];
    colors[i3] = heavyCol[i3]; colors[i3 + 1] = heavyCol[i3 + 1]; colors[i3 + 2] = heavyCol[i3 + 2];
    psizes[i] = baseSize;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(psizes, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 0.9 } },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(vColor, smoothstep(0.5, 0.1, d) * uOpacity);
      }
    `,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  });

  const points = new THREE.Points(geo, mat);
  masterGroup.add(points);

  // ── Grid + ambient dust ──
  const grid = new THREE.GridHelper(24, 40, 0x0a1530, 0x0a1530);
  grid.position.y = -3; grid.material.opacity = 0.06; grid.material.transparent = true;
  scene.add(grid);

  const dustN = isMobile ? 250 : 450;
  const dP = new Float32Array(dustN * 3), dC = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dP[i * 3] = (Math.random() - 0.5) * 35; dP[i * 3 + 1] = (Math.random() - 0.5) * 20; dP[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    const br = 0.06 + Math.random() * 0.06; dC[i * 3] = br * 0.5; dC[i * 3 + 1] = br * 0.7; dC[i * 3 + 2] = br;
  }
  const dGeo = new THREE.BufferGeometry();
  dGeo.setAttribute('position', new THREE.BufferAttribute(dP, 3));
  dGeo.setAttribute('color', new THREE.BufferAttribute(dC, 3));
  scene.add(new THREE.Points(dGeo, new THREE.PointsMaterial({
    size: 0.02, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending
  })));

  // Helper vector for projecting 3D→screen coords
  const _projVec = new THREE.Vector3();

  return {
    scene, camera, renderer, masterGroup, points, geo, mat,
    chaosPos, enginePos, optPos, seeds, heavyCol, cleanCol,
    psizes, survives, baseSize,
    heavyWireframe, optWireframe, heavyClip, optClip,
    minY, maxY, _projVec,
  };
}

/* ═══ ANIMATION ═══ */
function startLoop(ctx) {
  let time = 0, scrollProg = 0, targetProg = 0;
  let timerFlashed = false; // track if 14s flash has fired
  const heroEl = document.getElementById('hero');
  const scanline = document.getElementById('heroScanline');
  const scanBeam = scanline?.querySelector('.hero__scanline-beam');
  const heroRing = document.getElementById('heroRing');
  const scanTimer = document.getElementById('scanTimer');
  const scanTimerWrap = scanTimer?.parentElement;
  const scanOneButton = document.getElementById('scanOneButton');

  function updateScroll() {
    const rect = heroEl.getBoundingClientRect();
    targetProg = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  // Force initial state
  scrollProg = 0; targetProg = 0;
  setTimeout(updateScroll, 100);

  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;
    scrollProg += (targetProg - scrollProg) * 0.025; // Very smooth lerp

    // ── PHASES ──
    const phase = scrollProg < 0.55 ? 'chaos' : (scrollProg < 0.85 ? 'scan' : 'done');
    const scanP = phase === 'scan' ? smoothStep((scrollProg - 0.55) / 0.30) : (phase === 'done' ? 1 : 0);
    const assemblyBlend = phase === 'chaos' ? smoothStep(scrollProg / 0.55) : 1.0;
    // Scanline Y: top → bottom of model
    const scanY = ctx.maxY - scanP * (ctx.maxY - ctx.minY);

    // ── UPDATE CLIPPING PLANES ──
    ctx.heavyClip.constant = scanY;
    ctx.optClip.constant = -scanY;

    // ── UI ──
    if (heroRing) heroRing.classList.toggle('active', phase === 'chaos' && scrollProg > 0.12);
    if (scanline && scanBeam) {
      if (phase === 'scan') {
        scanline.classList.add('active');
        ctx._projVec.set(0, scanY, 0);
        ctx._projVec.applyMatrix4(ctx.masterGroup.matrixWorld);
        ctx._projVec.project(ctx.camera);
        const screenY = (1 - ctx._projVec.y) / 2;
        const beamPct = Math.max(0, Math.min(100, screenY * 100));
        scanBeam.style.top = beamPct + '%';

        // Position info panels relative to beam
        const infoTop = document.getElementById('scanInfoTop');
        const infoBot = document.getElementById('scanInfoBottom');
        const badge = document.getElementById('scanBadge');
        if (infoTop) { infoTop.style.bottom = (100 - beamPct + 2) + '%'; infoTop.classList.add('visible'); }
        if (infoBot) { infoBot.style.top = (beamPct + 2) + '%'; infoBot.classList.add('visible'); }
        if (badge) { badge.style.top = beamPct + '%'; badge.classList.add('visible'); }

        // 14s timer: fast count using easeOut (reaches 14 by scanP ~0.5)
        if (scanTimer) {
          const fastP = Math.min(1, scanP * 2); // double speed
          const currentSec = Math.round((1 - Math.pow(1 - fastP, 3)) * 14);
          scanTimer.textContent = currentSec;
          if (currentSec >= 14 && !timerFlashed) {
            timerFlashed = true;
            scanTimerWrap?.classList.add('flash');
            setTimeout(() => scanTimerWrap?.classList.remove('flash'), 1200);
          }
        }
        if (scanP < 0.4) timerFlashed = false;

        // "One Button" text: center top, appears scanP 20%→50%, fades after
        if (scanOneButton) {
          if (scanP > 0.20 && scanP < 0.50) {
            scanOneButton.classList.add('visible');
            scanOneButton.classList.remove('fading');
          } else if (scanP >= 0.50 && scanP < 0.70) {
            scanOneButton.classList.remove('visible');
            scanOneButton.classList.add('fading');
          } else {
            scanOneButton.classList.remove('visible', 'fading');
          }
        }

        scanline.style.opacity = '1';
      } else {
        scanline.classList.remove('active');
        scanline.style.opacity = '0';
        if (scanOneButton) scanOneButton.classList.remove('visible', 'fading');
        const infoTop = document.getElementById('scanInfoTop');
        const infoBot = document.getElementById('scanInfoBottom');
        const badge = document.getElementById('scanBadge');
        if (infoTop) infoTop.classList.remove('visible');
        if (infoBot) infoBot.classList.remove('visible');
        if (badge) badge.classList.remove('visible');
      }
    }

    // ── WIREFRAME VISIBILITY (with crossfade from chaos) ──
    if (ctx.heavyWireframe) {
      if (phase === 'chaos' && assemblyBlend > 0.75) {
        // ═══ CROSSFADE: gradually reveal wireframe during late chaos ═══
        ctx.heavyWireframe.visible = true;
        const fadeIn = smoothStep((assemblyBlend - 0.75) / 0.25); // 0→1 over last 25%
        const op = 0.5 * fadeIn;
        ctx.heavyWireframe.children.forEach(c => {
          if (c.material) {
            c.material.opacity = c.isLineSegments ? op : op * 0.25;
            c.material.clippingPlanes = [];
          }
        });
      } else if (phase === 'scan') {
        ctx.heavyWireframe.visible = true;
        const op = 0.85 * (1 - scanP * 0.2);
        ctx.heavyWireframe.children.forEach(c => {
          if (c.material) {
            c.material.opacity = c.isLineSegments ? op : op * 0.4;
            c.material.clippingPlanes = [ctx.heavyClip]; // Keep BELOW scanline only
          }
        });
      } else if (phase === 'done') {
        ctx.heavyWireframe.visible = false;
      } else {
        ctx.heavyWireframe.visible = false;
      }
    }

    if (ctx.optWireframe) {
      if (phase === 'scan') {
        ctx.optWireframe.visible = true;
        const op = 0.7 * scanP;
        ctx.optWireframe.children.forEach(c => {
          if (c.material) {
            c.material.opacity = c.isLineSegments ? op : op * 0.35;
            c.material.clippingPlanes = [ctx.optClip]; // ALWAYS restore clip: ABOVE scanline only
          }
        });
      } else if (phase === 'done') {
        ctx.optWireframe.visible = true;
        const fadeP = (scrollProg - 0.85) / 0.15;
        const op = 0.7 * Math.max(0, 1 - fadeP * 1.5);
        ctx.optWireframe.children.forEach(c => {
          if (c.material) {
            c.material.opacity = c.isLineSegments ? op : op * 0.35;
            // Remove clip plane in done phase so full model shows
            c.material.clippingPlanes = [];
          }
        });
      } else {
        ctx.optWireframe.visible = false;
      }
    }

    // ── Global opacity ──
    if (phase === 'done') {
      const fadeP = (scrollProg - 0.85) / 0.15;
      ctx.mat.uniforms.uOpacity.value = 0.9 * Math.max(0, 1 - fadeP * 1.5);
    } else {
      ctx.mat.uniforms.uOpacity.value = 0.9;
    }

    // ── UPDATE PARTICLES ──
    const posA = ctx.geo.attributes.position;
    const colA = ctx.geo.attributes.color;
    const sizeA = ctx.geo.attributes.size;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const seed = ctx.seeds[i3] % 1;
      const engX = ctx.enginePos[i3], engY = ctx.enginePos[i3 + 1], engZ = ctx.enginePos[i3 + 2];
      const optX = ctx.optPos[i3], optY = ctx.optPos[i3 + 1], optZ = ctx.optPos[i3 + 2];

      let px, py, pz, cr, cg, cb, sz;

      if (phase === 'chaos') {
        // ═══ CHAOS → ASSEMBLY (dramatic morphing!) ═══
        // Wider stagger range = more wave-like, sequential assembly
        const stag = Math.max(0, Math.min(1, (assemblyBlend - seed * 0.55) / 0.45));
        const b = smoothStep(stag);

        // Strong wind/drift when still scattered
        const wind = (1 - b) * 0.7;
        const wx = Math.sin(ctx.seeds[i3] + time * 0.5) * wind;
        const wy = Math.cos(ctx.seeds[i3 + 1] + time * 0.35) * wind * 0.35;
        const wz = Math.sin(ctx.seeds[i3 + 2] + time * 0.4) * wind * 0.5;

        px = ctx.chaosPos[i3] + (engX - ctx.chaosPos[i3]) * b + wx;
        py = ctx.chaosPos[i3 + 1] + (engY - ctx.chaosPos[i3 + 1]) * b + wy;
        pz = ctx.chaosPos[i3 + 2] + (engZ - ctx.chaosPos[i3 + 2]) * b + wz;

        // Dramatic vortex swirl — wider, faster
        if (b < 0.7) {
          const swirlStrength = (1 - b) * 0.06;
          const swirlRadius = (1 - b) * 3.0;
          const angle = time * 0.7 + ctx.seeds[i3] * 1.5;
          px += Math.cos(angle) * swirlStrength * swirlRadius;
          py += Math.sin(angle * 0.7 + ctx.seeds[i3 + 1]) * swirlStrength * 0.5;
          pz += Math.sin(angle) * swirlStrength * swirlRadius;
        }

        // RED/ORANGE color throughout chaos
        cr = ctx.heavyCol[i3]; cg = ctx.heavyCol[i3 + 1]; cb = ctx.heavyCol[i3 + 2];
        // Particles shrink as they settle into wireframe (crossfade)
        const settleF = b > 0.85 ? smoothStep((b - 0.85) / 0.15) : 0;
        sz = ctx.baseSize * (1 + (1 - b) * 0.6) * (1 - settleF * 0.6);

      } else {
        // ═══ SCAN / DONE ═══
        // SHARP boundary — very narrow transition zone (1.5% of model height)
        const zone = (ctx.maxY - ctx.minY) * 0.015;
        const isAbove = engY > (scanY + zone);
        const isBelow = engY < (scanY - zone);
        // Blend only in the very thin transition strip
        const blend = Math.max(0, Math.min(1, (engY - scanY + zone) / (zone * 2)));

        if (phase === 'done' || isAbove) {
          // ABOVE SCANLINE → morph to optimize positions, CYAN, sparse
          const t = phase === 'done' ? 1.0 : blend;
          px = engX + (optX - engX) * t;
          py = engY + (optY - engY) * t;
          pz = engZ + (optZ - engZ) * t;
          // Almost no noise (clean/precise)
          px += Math.sin(time * 0.15 + i * 0.01) * 0.001;
          py += Math.cos(time * 0.12 + i * 0.013) * 0.001;

          // CYAN color — sharp transition
          cr = ctx.heavyCol[i3] + (ctx.cleanCol[i3] - ctx.heavyCol[i3]) * blend;
          cg = ctx.heavyCol[i3 + 1] + (ctx.cleanCol[i3 + 1] - ctx.heavyCol[i3 + 1]) * blend;
          cb = ctx.heavyCol[i3 + 2] + (ctx.cleanCol[i3 + 2] - ctx.heavyCol[i3 + 2]) * blend;

          // 75% of particles disappear (size → 0) = dramatically sparser mesh feel
          sz = ctx.survives[i]
            ? ctx.baseSize * (1 + blend * 0.3)
            : ctx.baseSize * Math.max(0, 1 - blend * 3);

        } else {
          // BELOW SCANLINE → stay at engine positions, RED, dense, noisy
          // Stronger noise for more chaotic/dense feel
          const noise = 0.06;
          px = engX + Math.sin(time * 0.8 + ctx.seeds[i3] * 5) * noise;
          py = engY + Math.cos(time * 0.6 + ctx.seeds[i3 + 1] * 4) * noise * 0.5;
          pz = engZ + Math.sin(time * 0.7 + ctx.seeds[i3 + 2] * 6) * noise;
          // PURE RED — absolutely no cyan bleed
          cr = ctx.heavyCol[i3]; cg = ctx.heavyCol[i3 + 1]; cb = ctx.heavyCol[i3 + 2];
          sz = ctx.baseSize * 1.1; // Slightly bigger = denser feel
        }

        // Scanline beam glow — narrower zone to prevent color bleed
        if (phase === 'scan') {
          const bd = Math.abs(engY - scanY);
          const bz = (ctx.maxY - ctx.minY) * 0.025; // Tighter glow zone
          if (bd < bz) {
            const g = 1 - bd / bz;
            // Only glow white at the very center of the beam
            const glowIntensity = g * g; // Quadratic falloff = sharper beam
            cr += (1 - cr) * glowIntensity * 0.85;
            cg += (1 - cg) * glowIntensity * 0.85;
            cb += (1 - cb) * glowIntensity * 0.85;
            sz = Math.max(sz, ctx.baseSize * (1 + glowIntensity * 2.0));
          }
        }
      }

      posA.array[i3] = px; posA.array[i3 + 1] = py; posA.array[i3 + 2] = pz;
      colA.array[i3] = cr; colA.array[i3 + 1] = cg; colA.array[i3 + 2] = cb;
      sizeA.array[i] = sz;
    }

    posA.needsUpdate = true; colA.needsUpdate = true; sizeA.needsUpdate = true;

    // Rotation
    ctx.masterGroup.rotation.y += (phase === 'chaos' ? 0.0006 : 0.0002);

    // Camera
    ctx.camera.position.x = Math.sin(time * 0.08) * 0.2;
    ctx.camera.position.y = 0.3 + Math.cos(time * 0.06) * 0.1;
    ctx.camera.position.z = 6.5 - scrollProg * 1.2;
    ctx.renderer.render(ctx.scene, ctx.camera);
  }

  window.addEventListener('resize', () => {
    ctx.camera.aspect = window.innerWidth / window.innerHeight;
    ctx.camera.updateProjectionMatrix();
    ctx.renderer.setSize(window.innerWidth, window.innerHeight);
  });
  animate();
}

/* ═══ INTERACTIVE UI (unchanged) ═══ */

function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  window.addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', window.scrollY > 60), { passive: true });
  toggle?.addEventListener('click', () => links.classList.toggle('active'));
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); links.classList.remove('active'); }
    });
  });
}

function initReveals() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains('revealed')) {
        setTimeout(() => e.target.classList.add('revealed'), parseInt(e.target.dataset.revealDelay || 0));
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.section, .hero').forEach(sec => {
    sec.querySelectorAll('[data-reveal]').forEach((el, idx) => { el.dataset.revealDelay = idx * 40; obs.observe(el); });
  });
}

function initHeroContentFade() {
  const content = document.querySelector('.hero__content');
  const hint = document.querySelector('.hero__scroll-hint');
  window.addEventListener('scroll', () => {
    const p = Math.max(0, -document.getElementById('hero').getBoundingClientRect().top / window.innerHeight);
    if (content) { content.style.opacity = Math.max(0, 1 - p * 2.5); content.style.transform = `translateY(${p * 40}px)`; }
    if (hint) hint.style.opacity = Math.max(0, 1 - p * 5);
  }, { passive: true });
}

function initHeroMetrics() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.hero__metric-fill').forEach(f => {
          f.style.setProperty('--target-width', f.dataset.width + '%');
          setTimeout(() => f.classList.add('animated'), 200);
        }); obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const m = document.getElementById('heroMetrics'); if (m) obs.observe(m);
}

function initRingCharts() {
  const circumference = 2 * Math.PI * 85; // r=85
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        // Animate ring strokes
        e.target.querySelectorAll('.pain__ring-fill').forEach((f, i) => {
          const pct = parseInt(f.dataset.percent);
          const offset = circumference - (pct / 100) * circumference;
          f.style.setProperty('--ring-offset', offset);
          setTimeout(() => f.classList.add('animated'), i * 200 + 100);
        });
        // Animate number count-up
        e.target.querySelectorAll('.pain__ring-value').forEach(v => {
          const target = parseInt(v.dataset.target);
          const ring = v.closest('.pain__ring');
          if (ring) ring.classList.add('counting');
          const duration = 2500;
          const startTime = performance.now();
          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            v.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else if (ring) setTimeout(() => ring.classList.remove('counting'), 300);
          }
          setTimeout(() => requestAnimationFrame(tick), 200);
        });
      }
    });
  }, { threshold: 0.3 });
  const el = document.querySelector('.pain__rings'); if (el) obs.observe(el);
}

function initBarCharts() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        e.target.querySelectorAll('.precision__bar-fill').forEach((f, i) => {
          f.style.setProperty('--target-width', f.dataset.width + '%');
          setTimeout(() => f.classList.add('animated'), i * 100 + 100);
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.precision__bars, .precision__metrics, .precision__compare, .precision__kpis').forEach(el => obs.observe(el));

  // Score decimal counter
  const scoreObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        e.target.querySelectorAll('[data-count-decimal]').forEach(el => {
          const target = parseFloat(el.dataset.countDecimal);
          const startTime = performance.now();
          const duration = 2200;
          function tick(now) {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (eased * target).toFixed(2);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.precision__hero-score, .precision__compare, .precision__floating-scores, .precision__score-row').forEach(el => {
    if (el) scoreObs.observe(el);
  });
}

function initKPIRings() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        e.target.querySelectorAll('.trust__kpi-ring').forEach((ring, i) => {
          const p = parseInt(ring.dataset.percent), m = parseInt(ring.dataset.max || 100), circ = 2 * Math.PI * 42, c = ring.querySelector('.trust__kpi-circle');
          if (c) { c.style.setProperty('--target-offset', circ - (p / m) * circ); setTimeout(() => c.classList.add('animated'), i * 120 + 100); }
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.trust__result-card').forEach(el => obs.observe(el));
}

function initDeployBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        const f = e.target.querySelector('.trust__deploy-fill');
        if (f) { f.style.setProperty('--target-width', f.dataset.width + '%'); setTimeout(() => f.classList.add('animated'), 150); }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.trust__deploy-card').forEach(el => obs.observe(el));
}

function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        const tgt = parseInt(e.target.dataset.count), st = performance.now();
        function tick(now) { const p = Math.min((now - st) / 1800, 1); e.target.textContent = Math.round(tgt * easeOutExpo(p)); if (p < 1) requestAnimationFrame(tick); }
        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

function initTypingAnimation() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        e.target.querySelectorAll('.zero__param-line').forEach(l => setTimeout(() => l.classList.add('typing'), parseInt(l.dataset.typingDelay || 0) + 200));
        const err = e.target.closest('.zero__panel')?.querySelector('.zero__error-msg');
        if (err) setTimeout(() => err.classList.add('visible'), 2200);
      }
    });
  }, { threshold: 0.3 });
  const b = document.getElementById('oldToolBody'); if (b) obs.observe(b);
}

function initProgressDemo() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        const d = document.getElementById('zerProgress'), f = document.getElementById('zeroFill'), l = document.getElementById('zeroLabel');
        if (d && f) {
          setTimeout(() => { d.classList.add('active'); f.classList.add('running'); }, 200);
          [{ time: 400, text: 'GNN 분석 중...' }, { time: 1200, text: 'Vertex 중요도 계산...' }, { time: 2000, text: '최적화 적용 중...' }, { time: 2800, text: '✅ 완료 — 82% 경량화!' }]
            .forEach(s => setTimeout(() => { if (l) l.textContent = s.text; }, s.time));
        }
      }
    });
  }, { threshold: 0.3 });
  const dz = document.getElementById('dropZone'); if (dz) obs.observe(dz);
}

function initTimelineAnimation() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        const p = e.target.querySelector('.pain__timeline-path-active');
        if (p) setTimeout(() => p.classList.add('animated'), 100);
        e.target.querySelectorAll('.pain__step').forEach((s, i) => setTimeout(() => s.classList.add('revealed'), i * 150 + 200));
      }
    });
  }, { threshold: 0.2 });
  const t = document.querySelector('.pain__timeline'); if (t) obs.observe(t);
}

function initStudioPrompt() {
  const el = document.getElementById('studioPromptText');
  if (!el) return;

  const phrasesMap = {
    ko: ['"산업용 엔진 3D 모델 생성해줘"', '"자동차 부품 CAD → 3D"', '"건축물 외관 모델링"'],
    en: ['"Generate an industrial engine 3D model"', '"Car parts CAD → 3D"', '"Building exterior modeling"'],
    ja: ['"産業用エンジン3Dモデルを生成"', '"自動車部品 CAD → 3D"', '"建築物外観モデリング"'],
  };

  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  let currentLangCache = getLang();

  function getPhrases() {
    return phrasesMap[getLang()] || phrasesMap.ko;
  }

  function tick() {
    // If language changed mid-animation, reset
    const nowLang = getLang();
    if (nowLang !== currentLangCache) {
      currentLangCache = nowLang;
      phraseIdx = 0;
      charIdx = 0;
      isDeleting = false;
    }

    const phrases = getPhrases();
    const phrase = phrases[phraseIdx % phrases.length];
    if (!isDeleting) {
      el.textContent = phrase.substring(0, charIdx++);
      if (charIdx > phrase.length) { setTimeout(() => { isDeleting = true; tick(); }, 2000); return; }
    } else {
      el.textContent = phrase.substring(0, charIdx--);
      if (charIdx < 0) { charIdx = 0; phraseIdx = (phraseIdx + 1) % phrases.length; isDeleting = false; }
    }
    setTimeout(tick, isDeleting ? 30 : 60);
  }
  // Start after section is visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { tick(); obs.disconnect(); }
  }, { threshold: 0.3 });
  const sec = document.getElementById('studio'); if (sec) obs.observe(sec);

  // Pipeline sequential highlight
  const steps = document.querySelectorAll('.studio__pipe-step');
  const arrows = document.querySelectorAll('.studio__pipe-arrow');
  const pipeObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !entries[0].target.dataset.animated) {
      entries[0].target.dataset.animated = 'true';
      steps.forEach((s, i) => {
        setTimeout(() => { s.style.opacity = '1'; s.style.transform = 'translateY(0)'; }, i * 300);
      });
      arrows.forEach((a, i) => {
        setTimeout(() => { a.style.opacity = '1'; }, i * 300 + 150);
      });
    }
  }, { threshold: 0.3 });
  const pipeline = document.querySelector('.studio__pipeline');
  if (pipeline) {
    steps.forEach(s => { s.style.opacity = '0'; s.style.transform = 'translateY(20px)'; s.style.transition = 'all 0.5s ease'; });
    arrows.forEach(a => { a.style.opacity = '0'; a.style.transition = 'opacity 0.4s ease'; });
    pipeObs.observe(pipeline);
  }
}

/* ═══ BOOT ═══ */
document.addEventListener('DOMContentLoaded', async () => {
  // Scroll to top to ensure chaos phase starts correctly
  window.scrollTo(0, 0);
  const ctx = await initScene();
  if (ctx) startLoop(ctx);
  initNav(); initReveals(); initHeroContentFade(); initHeroMetrics();
  initRingCharts(); initBarCharts(); initKPIRings(); initDeployBars();
  initCounters(); initTypingAnimation(); initProgressDemo(); initTimelineAnimation();
  initStudioPrompt();
  initI18n();
});
