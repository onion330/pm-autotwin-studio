/* ═══════════════════════════════════════════════════════════
   Legal Pages — i18n (Privacy & Terms)
   ═══════════════════════════════════════════════════════════ */

let currentLang = 'ko';

export function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('pm-autotwin-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = translations[lang]?.[key];
        if (val === undefined) return;
        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = val;
        } else {
            el.textContent = val;
        }
    });

    // Show/hide language-specific content blocks
    document.querySelectorAll('[data-lang-content]').forEach(el => {
        el.style.display = el.getAttribute('data-lang-content') === lang ? 'block' : 'none';
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

export function initLegalI18n() {
    const saved = localStorage.getItem('pm-autotwin-lang');
    const browserLang = navigator.language.slice(0, 2);
    const lang = saved || (['ko', 'en', 'ja'].includes(browserLang) ? browserLang : 'ko');

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });

    setLang(lang);
}

const translations = {
    ko: {
        'header.back': '← 메인으로',
        'footer.copyright': '© 2025 <a href="https://www.pocketmemory.co.kr/" target="_blank">POCKET MEMORY</a> Inc. All rights reserved.',
    },
    en: {
        'header.back': '← Back to Main',
        'footer.copyright': '© 2025 <a href="https://www.pocketmemory.co.kr/" target="_blank">POCKET MEMORY</a> Inc. All rights reserved.',
    },
    ja: {
        'header.back': '← メインへ',
        'footer.copyright': '© 2025 <a href="https://www.pocketmemory.co.kr/" target="_blank">POCKET MEMORY</a> Inc. All rights reserved.',
    },
};
