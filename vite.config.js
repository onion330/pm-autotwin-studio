import { defineConfig } from 'vite';
import { resolve } from 'path';
import { buildSections, faqJsonLd } from './src/proof-render.js';

// 빌드 때 검증 기록·산업별·FAQ를 index.html에 미리 넣는다 (AI 검색 로봇은 자바스크립트를 돌리지 않음).
// 화면에서는 proof.js가 같은 내용으로 다시 그린다.
const prerenderProof = {
    name: 'prerender-proof',
    transformIndexHtml(html, ctx) {
        if (!ctx.filename.endsWith('index.html') || ctx.filename.includes('manual')) return html;
        const s = buildSections('ko');
        for (const id of ['evidence', 'industries', 'faq']) {
            html = html.replace(
                new RegExp(`<section id="${id}" class="[^"]*"([^>]*)></section>`),
                (_, attrs) => `<section id="${id}" class="${s[id].cls}"${attrs}>${s[id].html}</section>`,
            );
        }
        const ld = JSON.stringify(faqJsonLd('ko')).replace(/</g, '\\u003c');
        return html.replace('</head>', `  <script type="application/ld+json">${ld}</script>
</head>`);
    },
};

export default defineConfig({
    plugins: [prerenderProof],
    server: {
        host: true,
        port: 621,
        open: true,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                terms: resolve(__dirname, 'terms.html'),
            },
        },
    },
});
