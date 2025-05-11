import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_8cTawadL.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BMNKl4Q5.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/a.zhurkin/Desktop/wordFlow/","cacheDir":"file:///Users/a.zhurkin/Desktop/wordFlow/node_modules/.astro/","outDir":"file:///Users/a.zhurkin/Desktop/wordFlow/dist/","srcDir":"file:///Users/a.zhurkin/Desktop/wordFlow/src/","publicDir":"file:///Users/a.zhurkin/Desktop/wordFlow/public/","buildClientDir":"file:///Users/a.zhurkin/Desktop/wordFlow/dist/client/","buildServerDir":"file:///Users/a.zhurkin/Desktop/wordFlow/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test.ts","pathname":"/api/test","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.CU_FrO91.css"}],"routeData":{"route":"/chapter/[id]","isIndex":false,"type":"page","pattern":"^\\/chapter\\/([^/]+?)\\/?$","segments":[[{"content":"chapter","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/chapter/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.CU_FrO91.css"}],"routeData":{"route":"/vocabulary","isIndex":false,"type":"page","pattern":"^\\/vocabulary\\/?$","segments":[[{"content":"vocabulary","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vocabulary.astro","pathname":"/vocabulary","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.CU_FrO91.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/a.zhurkin/Desktop/wordFlow/src/pages/chapter/[id].astro",{"propagation":"none","containsHead":true}],["/Users/a.zhurkin/Desktop/wordFlow/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/a.zhurkin/Desktop/wordFlow/src/pages/vocabulary.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/test@_@ts":"pages/api/test.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/vocabulary@_@astro":"pages/vocabulary.astro.mjs","\u0000@astro-page:src/pages/chapter/[id]@_@astro":"pages/chapter/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/a.zhurkin/Desktop/wordFlow/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BroN-40s.mjs","\u0000@astrojs-manifest":"manifest_BcKLEZOu.mjs","/Users/a.zhurkin/Desktop/wordFlow/src/components/ChapterScreen.tsx":"_astro/ChapterScreen.BdWqmYka.js","/Users/a.zhurkin/Desktop/wordFlow/src/components/Vocabulary":"_astro/Vocabulary.hZPa6FPY.js","/Users/a.zhurkin/Desktop/wordFlow/src/components/Welcome":"_astro/Welcome.Csq-z8gc.js","/Users/a.zhurkin/Desktop/wordFlow/src/components/Navigation":"_astro/Navigation.DJmFBAMR.js","/Users/a.zhurkin/Desktop/wordFlow/src/components/GlobalAudio.tsx":"_astro/GlobalAudio.DsCl6-ws.js","@astrojs/preact/client.js":"_astro/client.B1tb3QmN.js","/Users/a.zhurkin/Desktop/wordFlow/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.B2x3KGA9.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.CU_FrO91.css","/_astro/ChapterScreen.BdWqmYka.js","/_astro/GlobalAudio.DsCl6-ws.js","/_astro/Navigation.DJmFBAMR.js","/_astro/Vocabulary.hZPa6FPY.js","/_astro/Welcome.Csq-z8gc.js","/_astro/client.B1tb3QmN.js","/_astro/hooks.module.BHax5pmd.js","/_astro/jsxRuntime.module.BXRLK4zq.js","/_astro/preact.module.BkxX9n6Y.js","/_astro/signals.module.B2x3KGA9.js","/_astro/storage.dyqxtIRL.js","/audio/581.opus","/img/chapters/chapter-1.png","/img/chapters/chapter-2.webp","/img/start/startBack-0.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"PLYejWmHPLZZW1Ki3+TJ1wQ8KKVtq2Ch+PcprViAC9U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
