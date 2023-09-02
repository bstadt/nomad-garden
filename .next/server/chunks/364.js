"use strict";
exports.id = 364;
exports.ids = [364];
exports.modules = {

/***/ 9364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   meta: () => (/* binding */ meta)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(586);
/*@jsxRuntime automatic @jsxImportSource react*/ 

const meta = {
    title: "Axiomatizing the Ambiguity of Goodness",
    description: "From the minor arcana, the two of swords indicates you are facing a challenging decision, and are unclear about which option to take",
    thumbnail: "two_of_swords.webp",
    date: "Sep 2, 2023"
};
function _createMdxContent(props) {
    const _components = Object.assign({
        p: "p",
        ul: "ul",
        li: "li"
    }, (0,next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__/* .useMDXComponents */ .a)(), props.components);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "I want to be a good person.\nI imagine most people want to be good as well.\nThe challenge comes when trying to pin down what exactly it means to be good."
            }),
            "\n",
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "We could start by listing some actions that we believe are unambiguously good.\nOur list might include actions like charity, honesty, and pacifism.\nHowever, we can construct contexts where the “unambiguous goodness” of these actions is called into question.\nWould you consider it good to make a charitable donation to an opposing political party? Would you reveal your best friend’s secret on the grounds of honesty? Would you restrain yourself from using violence to defend your child from assault?"
            }),
            "\n",
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "Each of these situations presents a tension between your moral responsibility to the world at large and your moral responsibility to a privileged party.\nIn the case of the donation, you forgo charity and privilege your chosen political party.\nWhen you keep the secret, you privilege your best friend over the inquirer.\nWhen you use violence to protect your child, you privilege their safety over the safety of the aggressor.\nIn all of these cases, you impose your own notion of goodness onto the world."
            }),
            "\n",
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "We can axiomatize the tension present in all of the above situations.\nConsider the following definitions:"
            }),
            "\n",
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ul, {
                children: [
                    "\n",
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                        children: "UG: (Unambiguous Goodness) There is an unambiguous meaning of the word good"
                    }),
                    "\n",
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                        children: "O: (Optimism) People do what they call good"
                    }),
                    "\n",
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                        children: "C: (Conflict) There are conflicts between people in the world"
                    }),
                    "\n"
                ]
            }),
            "\n",
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "I propose that:\n$$ O \\cap C \\implies \\not UG $$"
            }),
            "\n",
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "Proof:\nC implies that a conflict between two (or more) people exists.\nO implies the people on both sides of this conflict are trying to be good.\nIf UG, then there would be no conflict, since both sides could swiftly resolve any potential conflict using their shared unambiguous notion of goodness.\nSince there is conflict, we must not have UG."
            })
        ]
    });
}
function MDXContent(props = {}) {
    const { wrapper: MDXLayout } = Object.assign({}, (0,next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__/* .useMDXComponents */ .a)(), props.components);
    return MDXLayout ? react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MDXLayout, Object.assign({}, props, {
        children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_createMdxContent, props)
    })) : _createMdxContent(props);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MDXContent);


/***/ })

};
;