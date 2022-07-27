var $k7rGe$reactjsxdevruntime = require("react/jsx-dev-runtime");
var $k7rGe$react = require("react");
var $k7rGe$sanityui = require("@sanity/ui");
var $k7rGe$sanityicons = require("@sanity/icons");
var $k7rGe$usehooksts = require("usehooks-ts");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $244e63ca53592e4d$export$2e2bcd8739ae039);





const $f4b318483f84cb22$var$sizes = {
    desktop: {
        width: `100%`,
        height: `100%`,
        maxHeight: `100%`
    },
    mobile: {
        width: 414,
        height: `100%`,
        maxHeight: 736
    }
};
const $f4b318483f84cb22$var$DEFAULT_SIZE = `desktop`;
function $f4b318483f84cb22$var$Iframe(props) {
    const { document: sanityDocument , options: options  } = props;
    const { url: url , defaultSize: defaultSize = $f4b318483f84cb22$var$DEFAULT_SIZE , reload: reload  } = options;
    const [displayUrl, setDisplayUrl] = (0, $k7rGe$react.useState)(url && typeof url === "string" ? url : ``);
    const [iframeSize, setIframeSize] = (0, $k7rGe$react.useState)($f4b318483f84cb22$var$sizes?.[defaultSize] ? defaultSize : $f4b318483f84cb22$var$DEFAULT_SIZE);
    const input = (0, $k7rGe$react.useRef)(null);
    const iframe = (0, $k7rGe$react.useRef)(null);
    const { displayed: displayed  } = sanityDocument;
    const [, copy] = (0, $k7rGe$usehooksts.useCopyToClipboard)();
    function handleCopy() {
        if (!input?.current?.value) return;
        copy(input.current.value);
    }
    function handleReload() {
        if (!iframe?.current) return;
        // Funky way to reload an iframe without CORS issuies
        // eslint-disable-next-line no-self-assign
        iframe.current.src = iframe.current.src;
    }
    // Reload on new revisions
    (0, $k7rGe$react.useEffect)(()=>{
        if (reload?.revision) handleReload();
    }, [
        displayed._rev,
        reload?.revision
    ]);
    // Set initial URL and refresh on new revisions
    (0, $k7rGe$react.useEffect)(()=>{
        const getUrl = async ()=>{
            const resolveUrl = typeof url === "function" ? await url(displayed) : ``;
            // Only update state if URL has changed
            if (resolveUrl !== displayUrl && resolveUrl && typeof resolveUrl === "string") setDisplayUrl(resolveUrl);
        };
        if (typeof url === "function") getUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        displayed._rev
    ]);
    if (!displayUrl || typeof displayUrl !== "string") return /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.ThemeProvider), {
        children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
            padding: 5,
            align: "center",
            justify: "center",
            children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Spinner), {}, void 0, false, {
                fileName: "src/Iframe.tsx",
                lineNumber: 119,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/Iframe.tsx",
            lineNumber: 118,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/Iframe.tsx",
        lineNumber: 117,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.ThemeProvider), {
        children: [
            /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)("textarea", {
                style: {
                    position: `absolute`,
                    pointerEvents: `none`,
                    opacity: 0
                },
                ref: input,
                value: displayUrl,
                readOnly: true,
                tabIndex: -1
            }, void 0, false, {
                fileName: "src/Iframe.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
                direction: "column",
                style: {
                    height: `100%`
                },
                children: [
                    /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Card), {
                        padding: 2,
                        borderBottom: true,
                        children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
                            align: "center",
                            gap: 2,
                            children: [
                                /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
                                    align: "center",
                                    gap: 1,
                                    children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Button), {
                                        fontSize: [
                                            1
                                        ],
                                        padding: 2,
                                        tone: "primary",
                                        mode: iframeSize === "mobile" ? "default" : "ghost",
                                        icon: (0, $k7rGe$sanityicons.MobileDeviceIcon),
                                        onClick: ()=>setIframeSize(iframeSize === "mobile" ? "desktop" : "mobile")
                                    }, void 0, false, {
                                        fileName: "src/Iframe.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/Iframe.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Box), {
                                    flex: 1,
                                    children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Text), {
                                        size: 0,
                                        textOverflow: "ellipsis",
                                        children: displayUrl
                                    }, void 0, false, {
                                        fileName: "src/Iframe.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/Iframe.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
                                    align: "center",
                                    gap: 1,
                                    children: [
                                        reload?.button ? /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Button), {
                                            fontSize: [
                                                1
                                            ],
                                            padding: 2,
                                            icon: (0, $k7rGe$sanityicons.UndoIcon),
                                            title: "Reload",
                                            "aria-label": "Reload",
                                            onClick: ()=>handleReload()
                                        }, void 0, false, {
                                            fileName: "src/Iframe.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Button), {
                                            fontSize: [
                                                1
                                            ],
                                            icon: (0, $k7rGe$sanityicons.CopyIcon),
                                            padding: [
                                                2
                                            ],
                                            title: "Copy",
                                            "aria-label": "Copy",
                                            onClick: ()=>handleCopy()
                                        }, void 0, false, {
                                            fileName: "src/Iframe.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Button), {
                                            fontSize: [
                                                1
                                            ],
                                            icon: (0, $k7rGe$sanityicons.LeaveIcon),
                                            padding: [
                                                2
                                            ],
                                            text: "Open",
                                            tone: "primary",
                                            onClick: ()=>window.open(displayUrl)
                                        }, void 0, false, {
                                            fileName: "src/Iframe.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/Iframe.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/Iframe.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/Iframe.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Card), {
                        tone: "transparent",
                        padding: iframeSize === "mobile" ? 2 : 0,
                        style: {
                            height: `100%`
                        },
                        children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)((0, $k7rGe$sanityui.Flex), {
                            align: "center",
                            justify: "center",
                            style: {
                                height: `100%`
                            },
                            children: /*#__PURE__*/ (0, $k7rGe$reactjsxdevruntime.jsxDEV)("iframe", {
                                ref: iframe,
                                title: "preview",
                                style: $f4b318483f84cb22$var$sizes[iframeSize],
                                frameBorder: "0",
                                src: displayUrl
                            }, void 0, false, {
                                fileName: "src/Iframe.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/Iframe.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/Iframe.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/Iframe.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/Iframe.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
var $f4b318483f84cb22$export$2e2bcd8739ae039 = $f4b318483f84cb22$var$Iframe;


var $244e63ca53592e4d$export$2e2bcd8739ae039 = (0, $f4b318483f84cb22$export$2e2bcd8739ae039);


//# sourceMappingURL=index.js.map
