import {jsxDEV as $gGrEF$jsxDEV} from "react/jsx-dev-runtime";
import {useState as $gGrEF$useState, useRef as $gGrEF$useRef, useEffect as $gGrEF$useEffect} from "react";
import {ThemeProvider as $gGrEF$ThemeProvider, Flex as $gGrEF$Flex, Spinner as $gGrEF$Spinner, Card as $gGrEF$Card, Button as $gGrEF$Button, Box as $gGrEF$Box, Text as $gGrEF$Text} from "@sanity/ui";
import {MobileDeviceIcon as $gGrEF$MobileDeviceIcon, UndoIcon as $gGrEF$UndoIcon, CopyIcon as $gGrEF$CopyIcon, LeaveIcon as $gGrEF$LeaveIcon} from "@sanity/icons";
import {useCopyToClipboard as $gGrEF$useCopyToClipboard} from "usehooks-ts";






const $b1fbe8f05b2a0ffa$var$sizes = {
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
const $b1fbe8f05b2a0ffa$var$DEFAULT_SIZE = `desktop`;
function $b1fbe8f05b2a0ffa$var$Iframe(props) {
    const { document: sanityDocument , options: options  } = props;
    const { url: url , defaultSize: defaultSize = $b1fbe8f05b2a0ffa$var$DEFAULT_SIZE , reload: reload  } = options;
    const [displayUrl, setDisplayUrl] = (0, $gGrEF$useState)(url && typeof url === "string" ? url : ``);
    const [iframeSize, setIframeSize] = (0, $gGrEF$useState)($b1fbe8f05b2a0ffa$var$sizes?.[defaultSize] ? defaultSize : $b1fbe8f05b2a0ffa$var$DEFAULT_SIZE);
    const input = (0, $gGrEF$useRef)(null);
    const iframe = (0, $gGrEF$useRef)(null);
    const { displayed: displayed  } = sanityDocument;
    const [, copy] = (0, $gGrEF$useCopyToClipboard)();
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
    (0, $gGrEF$useEffect)(()=>{
        if (reload?.revision) handleReload();
    }, [
        displayed._rev,
        reload?.revision
    ]);
    // Set initial URL and refresh on new revisions
    (0, $gGrEF$useEffect)(()=>{
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
    if (!displayUrl || typeof displayUrl !== "string") return /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$ThemeProvider), {
        children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
            padding: 5,
            align: "center",
            justify: "center",
            children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Spinner), {}, void 0, false, {
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
    return /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$ThemeProvider), {
        children: [
            /*#__PURE__*/ (0, $gGrEF$jsxDEV)("textarea", {
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
            /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
                direction: "column",
                style: {
                    height: `100%`
                },
                children: [
                    /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Card), {
                        padding: 2,
                        borderBottom: true,
                        children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
                            align: "center",
                            gap: 2,
                            children: [
                                /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
                                    align: "center",
                                    gap: 1,
                                    children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Button), {
                                        fontSize: [
                                            1
                                        ],
                                        padding: 2,
                                        tone: "primary",
                                        mode: iframeSize === "mobile" ? "default" : "ghost",
                                        icon: (0, $gGrEF$MobileDeviceIcon),
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
                                /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Box), {
                                    flex: 1,
                                    children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Text), {
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
                                /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
                                    align: "center",
                                    gap: 1,
                                    children: [
                                        reload?.button ? /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Button), {
                                            fontSize: [
                                                1
                                            ],
                                            padding: 2,
                                            icon: (0, $gGrEF$UndoIcon),
                                            title: "Reload",
                                            "aria-label": "Reload",
                                            onClick: ()=>handleReload()
                                        }, void 0, false, {
                                            fileName: "src/Iframe.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Button), {
                                            fontSize: [
                                                1
                                            ],
                                            icon: (0, $gGrEF$CopyIcon),
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
                                        /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Button), {
                                            fontSize: [
                                                1
                                            ],
                                            icon: (0, $gGrEF$LeaveIcon),
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
                    /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Card), {
                        tone: "transparent",
                        padding: iframeSize === "mobile" ? 2 : 0,
                        style: {
                            height: `100%`
                        },
                        children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)((0, $gGrEF$Flex), {
                            align: "center",
                            justify: "center",
                            style: {
                                height: `100%`
                            },
                            children: /*#__PURE__*/ (0, $gGrEF$jsxDEV)("iframe", {
                                ref: iframe,
                                title: "preview",
                                style: $b1fbe8f05b2a0ffa$var$sizes[iframeSize],
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
var $b1fbe8f05b2a0ffa$export$2e2bcd8739ae039 = $b1fbe8f05b2a0ffa$var$Iframe;


var $df9eabe9bda49ea8$export$2e2bcd8739ae039 = (0, $b1fbe8f05b2a0ffa$export$2e2bcd8739ae039);


export {$df9eabe9bda49ea8$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
