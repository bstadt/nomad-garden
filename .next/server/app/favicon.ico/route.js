"use strict";
(() => {
var exports = {};
exports.id = 155;
exports.ids = [155];
exports.modules = {

/***/ 4021:
/***/ ((module) => {

module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 4418:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./app/favicon.ico?__next_metadata_route__
var favicon_next_metadata_route_namespaceObject = {};
__webpack_require__.r(favicon_next_metadata_route_namespaceObject);
__webpack_require__.d(favicon_next_metadata_route_namespaceObject, {
  GET: () => (GET),
  dynamic: () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(514);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./app/favicon.ico?__next_metadata_route__


const contentType = "image/x-icon"
const buffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAqBJREFUOE+lk91Lk3EUx7/n93vc67O56XRaDFcxTYpmdFUWkXlnFxG9EHQZ5LqsP6EuiiDqKoLoIpIKoZugGy2oUITywkxQzPkSvkym0/lse7bn5cQGTUqCoHP9PZ/z5XvOIfxn0b/2M7MgIvtPPX2ZnLnDFnaTEIOKUAY72iKLZVG5YWE5fRgku0HcvVEwj5YKWhLAoGQ5IE3Xx3i8KUcjEzP220UvhZwWoqrJYZcxWedXpyAdx1d1GVrRJVYKEgtbzEuZPLV4TUS9Bvb5TN2n2Dfp/ViSH00Hqs6ckhEPO9iWDmIAtpWBZc5iLf2GV7L7yfKcBIQPbslIxDa1CuDx+BRk9hVs9zFAeNHScpaDboUARj77FEV9CHkty5nVdWLywnYdgeW/jN52FVUHjtQ1kLkE23kIzZFTHKrvoULuNQScKOT6UcjrvJ5ar4Ruec/A9F9Bos3YBsjNZ1C0fgCExug5bgz3Ul57AaM4BsCELnp4NdlHZM7DCN2G7YwjEdvYBpTJNWu3YHm6EI2cZp+SJG3jPohUsL0F23uXZ9M5EqVZ2K6OSmY7AOAihD6KSIg46G8nEioKW30AJEqOq5xM6yTyH8AyCHYcQKJ163cHZarMPkejZ4CDDRfIrV6CacxAiCA2S7UVgCN1vZwCSg33kGizdwJga2jmG9wUeUBCNlTXmylYFQBgQ2ZfwvJdRKJVA41MJNeefPfXbRqiIiZjHnvqDQ7Wxqtn7hQMJxf5a6pEa0VZhVYy+Pxt+rwB+fBHXtk1pymYz9Ug4PdwLEDU5DLR5LI46LTHi6XSJ03Lt2UN0TmXU9xl0ImwblWmMDONjicPsoJuArpV1Rtz1yhDgsSAQY53e8Nq6tfY4eFhtxIIdwpGFwQt//M3/u1rfwIXl048YffliwAAAABJRU5ErkJggg==", 'base64'
  )

function GET() {
  return new server.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ffavicon.ico%2Froute&name=app%2Ffavicon.ico%2Froute&pagePath=private-next-app-dir%2Ffavicon.ico&appDir=%2FUsers%2Fbrandon%2Froot%2Fnomad_garden%2Fapp&appPaths=%2Ffavicon.ico&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/favicon.ico/route","pathname":"/favicon.ico","filename":"favicon","bundlePath":"app/favicon.ico/route"},"resolvedPagePath":"next-metadata-route-loader?page=%2Ffavicon.ico%2Froute&isDynamic=0!/Users/brandon/root/nomad_garden/app/favicon.ico?__next_metadata_route__","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: favicon_next_metadata_route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/favicon.ico/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [697,218], () => (__webpack_exec__(4418)));
module.exports = __webpack_exports__;

})();