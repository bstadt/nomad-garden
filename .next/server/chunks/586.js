"use strict";
exports.id = 586;
exports.ids = [586];
exports.modules = {

/***/ 586:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useMDXComponents)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.
// This file is required to use MDX in `app` directory.
function useMDXComponents(components) {
    return {
        // Apply styles to the common Markdown components
        p: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-lg leading-7 my-4",
                children: props.children
            }),
        h1: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "text-4xl font-bold mb-6 mt-8",
                children: props.children
            }),
        h2: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: "text-3xl font-semibold mb-5 mt-7",
                children: props.children
            }),
        h3: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "text-2xl font-semibold mb-4 mt-6",
                children: props.children
            }),
        h4: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                className: "text-xl font-semibold mb-3 mt-5",
                children: props.children
            }),
        ul: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                className: "list-disc list-inside my-4 ml-4",
                children: props.children
            }),
        ol: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ol", {
                className: "list-decimal list-inside my-4 ml-4",
                children: props.children
            }),
        li: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "mb-1",
                children: props.children
            }),
        a: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                className: "text-blue-500 hover:underline",
                ...props,
                children: props.children
            }),
        blockquote: (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("blockquote", {
                className: "border-l-4 pl-4 border-gray-300 italic my-4",
                children: props.children
            }),
        ...components
    };
}


/***/ })

};
;