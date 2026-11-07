/* 검증 기록·산업별 입구·FAQ의 HTML을 만드는 순수 함수 (브라우저·빌드 둘 다 사용).
   빌드 때 이 결과를 index.html에 미리 넣어 AI 검색 로봇도 읽게 한다(vite.config.js).
   문구 원본은 proof-data.js — 여기서 문구를 바꾸지 않는다. */

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

export function buildSections(lang, open = []) {
  const t = (o) => esc(tx(o, lang));
  const ko = lang === 'ko' ? ' pf-ko' : '';
  return {
    evidence: { cls: `section pf pf-evidence${ko}`, html: `
    <div class="container pf-evidence__grid">
      <div class="pf-evidence__intro">
        <h2 class="pf-h2" id="evidence-title">${t(UI.evidenceTitle)}</h2>
        <p class="pf-lead">${t(UI.evidenceDesc)}</p>
      </div>
      <div class="pf-receipts">${EVIDENCE.map((i) => receipt(i, lang)).join('')}</div>
    </div>` },
    industries: { cls: `section pf pf-industries${ko}`, html: `
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
    </div>` },
    faq: { cls: `section pf pf-faq${ko}`, html: `
    <div class="container pf-faq__grid">
      <h2 class="pf-h2">${t(UI.faqTitle)}</h2>
      <div class="pf-faq__list">
        ${FAQ.map((f, i) => `
          <details class="pf-faq__item"${open[i] ? ' open' : ''}>
            <summary>${t(f.q)}</summary>
            <p>${t(f.a)}</p>
          </details>`).join('')}
      </div>
    </div>` },
  };
}

// AI 검색용 FAQ 구조화 정보
export function faqJsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: tx(f.q, lang), acceptedAnswer: { '@type': 'Answer', text: tx(f.a, lang) } })),
  };
}
