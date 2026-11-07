/* ═══════════════════════════════════════════════════════════
   검증 기록(영수증) · 산업별 입구 · 자주 묻는 질문
   index.html의 #evidence / #industries / #faq 칸을 채운다.
   언어가 바뀌면(setLang이 <html lang>을 바꿈) 다시 그린다.
   내용은 proof-data.js (회사 홈페이지와 같은 원본, rd-reviewer 검토 끝)
   ═══════════════════════════════════════════════════════════ */

import './proof.css';
import { buildSections } from './proof-render.js';

function render(lang) {
  const ids = ['evidence', 'industries', 'faq'];
  const els = ids.map((id) => document.getElementById(id));
  if (els.some((e) => !e)) return;
  // 열려 있던 질문은 언어를 바꿔도 열린 채로
  const open = [...els[2].querySelectorAll('details')].map((d) => d.open);
  const s = buildSections(lang, open);
  ids.forEach((id, i) => {
    els[i].className = s[id].cls;
    els[i].innerHTML = s[id].html;
  });
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
