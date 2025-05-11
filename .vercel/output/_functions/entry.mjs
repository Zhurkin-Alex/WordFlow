import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_SjWO8Dfm.mjs';
import { manifest } from './manifest_PCQVF9wY.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/test.astro.mjs');
const _page2 = () => import('./pages/chapter/_id_.astro.mjs');
const _page3 = () => import('./pages/vocabulary.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/test.ts", _page1],
    ["src/pages/chapter/[id].astro", _page2],
    ["src/pages/vocabulary.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3dfa2cf6-9184-468a-b19a-0c841dd9724c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
