/* ═══════════════════════════════════════════════════════════
   검증 기록(영수증) · 산업별 입구 · 자주 묻는 질문
   index.html의 #evidence / #industries / #faq 칸을 채운다.
   언어가 바뀌면(setLang이 <html lang>을 바꿈) 다시 그린다.
   내용은 proof-data.js (회사 홈페이지와 같은 원본, rd-reviewer 검토 끝)
   ═══════════════════════════════════════════════════════════ */

import './proof.css';
import { EVIDENCE, INDUSTRIES, FAQ } from './proof-data.js';

const UI = {
  evidenceTitle: { ko: '검증 기록', en: 'Verification log', ja: '検証記録' },
  evidenceDesc: {
    ko: '공개한 시험을 한 장씩 모았습니다. 원본과 대조한 기록에는 무엇이 남았는지 적었고, 모든 숫자는 각 기록에 적은 조건에서 나온 값입니다.',
    en: 'Each published test, one record at a time. Where we checked against the original, the record lists what was kept. Every figure holds only under the conditions on its record.',
    ja: '公開したテストを一件ずつまとめました。原本と照合した記録には残ったものを記し、数値はすべて各記録に記した条件でのものです。',
  },
  kept: { ko: '남은 것', en: 'Kept', ja: '残ったもの' },
  cond: { ko: '조건', en: 'Conditions', ja: '条件' },
  post: { ko: '링크드인 글', en: 'LinkedIn post', ja: 'LinkedIn投稿' },
  video: { ko: '영상', en: 'Video', ja: '動画' },
  videoEnOnly: { ko: '영상(영문)', en: 'Video', ja: '動画（英語）' },
  forum: { ko: 'NVIDIA 포럼 글', en: 'NVIDIA forum post', ja: 'NVIDIAフォーラム投稿' },
  credit: { ko: '원본 모델(GrabCAD)', en: 'Source model (GrabCAD)', ja: '元モデル（GrabCAD）' },
  industriesTitle: { ko: '산업별로 보기', en: 'By industry', ja: '業界別に見る' },
  related: { ko: '관련 기록', en: 'Related records', ja: '関連記録' },
  faqTitle: { ko: '자주 묻는 질문', en: 'Frequently asked questions', ja: 'よくある質問' },
};

const SHORT = {
  'usd-to-usd': { ko: 'USD → USD', en: 'USD → USD', ja: 'USD → USD' },
  'large-ifc': { ko: '대용량 IFC', en: 'Large IFC', ja: '大容量IFC' },
  ahu: { ko: '공조기 IFC', en: 'AHU IFC', ja: '空調機IFC' },
  vram: { ko: 'VRAM·FPS', en: 'VRAM and FPS', ja: 'VRAM・FPS' },
  gearbox: { ko: '기어박스 STEP', en: 'Gearbox STEP', ja: 'ギアボックスSTEP' },
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function tx(obj, lang) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.ko ?? '';
}

function pickLink(obj, lang) {
  if (!obj) return null;
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.en || obj.ko || null;
}

const link = (href, label) =>
  `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;

function receipt(item, lang) {
  const t = (o) => esc(tx(o, lang));
  const post = pickLink(item.links.post, lang);
  const video = pickLink(item.links.video, lang);
  const videoEnFallback = video && !item.links.video?.[lang] && lang !== 'en';

  const rows = item.rows.map((r) => `
      <div class="pf-line"><dt>${t(r.k)}</dt>
        <dd><span>${t(r.v)}</span>${r.d ? `<span class="pf-delta">${esc(r.d)}</span>` : ''}</dd></div>`).join('');

  const links = [
    post && link(post, tx(UI.post, lang)),
    video && link(video, tx(videoEnFallback ? UI.videoEnOnly : UI.video, lang)),
    item.links.forum && link(item.links.forum, tx(UI.forum, lang)),
    item.links.credit && link(item.links.credit, tx(UI.credit, lang)),
  ].filter(Boolean).join('');

  return `
    <article class="pf-receipt" id="evidence-${esc(item.id)}">
      <div class="pf-receipt__head">
        <h3>${t(item.title)}</h3>
        <time>${esc(item.date)}</time>
      </div>
      <dl class="pf-lines">${rows}</dl>
      ${item.kept ? `<p class="pf-kept"><span>${t(UI.kept)}</span>${t(item.kept)}</p>` : ''}
      <p class="pf-cond"><span>${t(UI.cond)}</span>${t(item.cond)}</p>
      <div class="pf-links">${links}</div>
    </article>`;
}

function render(lang) {
  const ev = document.getElementById('evidence');
  const ind = document.getElementById('industries');
  const faq = document.getElementById('faq');
  if (!ev || !ind || !faq) return;
  const t = (o) => esc(tx(o, lang));
  const ko = lang === 'ko' ? ' pf-ko' : '';

  ev.className = `section pf pf-evidence${ko}`;
  ev.innerHTML = `
    <div class="container pf-evidence__grid">
      <div class="pf-evidence__intro">
        <h2 class="pf-h2" id="evidence-title">${t(UI.evidenceTitle)}</h2>
        <p class="pf-lead">${t(UI.evidenceDesc)}</p>
      </div>
      <div class="pf-receipts">${EVIDENCE.map((i) => receipt(i, lang)).join('')}</div>
    </div>`;

  ind.className = `section pf pf-industries${ko}`;
  ind.innerHTML = `
    <div class="container">
      <h2 class="pf-h2">${t(UI.industriesTitle)}</h2>
      <div class="pf-industry-grid">
        ${INDUSTRIES.map((x) => `
          <div class="pf-industry">
            <h3>${t(x.name)}</h3>
            <p class="pf-industry__line">${t(x.line)}</p>
            <p class="pf-related"><span>${t(UI.related)}</span>
              ${x.evidence.map((id) => `<button type="button" data-evidence="${esc(id)}">${t(SHORT[id])}</button>`).join('')}
              ${x.link ? link(pickLink(x.link.url, lang), tx(x.link.label, lang)) : ''}
            </p>
          </div>`).join('')}
      </div>
    </div>`;

  // 열려 있던 질문은 언어를 바꿔도 열린 채로
  const open = [...faq.querySelectorAll('details')].map((d) => d.open);
  faq.className = `section pf pf-faq${ko}`;
  faq.innerHTML = `
    <div class="container pf-faq__grid">
      <h2 class="pf-h2">${t(UI.faqTitle)}</h2>
      <div class="pf-faq__list">
        ${FAQ.map((f, i) => `
          <details class="pf-faq__item"${open[i] ? ' open' : ''}>
            <summary>${t(f.q)}</summary>
            <p>${t(f.a)}</p>
          </details>`).join('')}
      </div>
    </div>`;
}

// 산업별 입구 → 해당 영수증으로 이동해 잠깐 표시
let flashTimer;
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-evidence]');
  if (!btn) return;
  const el = document.getElementById(`evidence-${btn.dataset.evidence}`);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  document.querySelectorAll('.pf-receipt.is-flash').forEach((n) => n.classList.remove('is-flash'));
  el.classList.add('is-flash');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => el.classList.remove('is-flash'), 1800);
});

const currentLang = () => (document.documentElement.lang || 'ko').slice(0, 2);
new MutationObserver(() => render(currentLang()))
  .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
render(currentLang());
