var $dyHF6$sanity = require("sanity");
var $dyHF6$reactjsxdevruntime = require("react/jsx-dev-runtime");
var $dyHF6$react = require("react");
var $dyHF6$sanityform = require("sanity/form");
var $dyHF6$sanityui = require("@sanity/ui");
var $dyHF6$sanityicons = require("@sanity/icons");
var $dyHF6$styledcomponents = require("styled-components");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $7594066088192472$exports = {};

$parcel$export($7594066088192472$exports, "internationalizedArray", () => $7594066088192472$export$bec7eb13daf35f0e);





var $acfbfc6ee2363807$exports = {};

$parcel$export($acfbfc6ee2363807$exports, "Table", () => $acfbfc6ee2363807$export$54ec01a60f47d33d, (v) => $acfbfc6ee2363807$export$54ec01a60f47d33d = v);
$parcel$export($acfbfc6ee2363807$exports, "TableRow", () => $acfbfc6ee2363807$export$b05581f4e764e162, (v) => $acfbfc6ee2363807$export$b05581f4e764e162 = v);
$parcel$export($acfbfc6ee2363807$exports, "TableCell", () => $acfbfc6ee2363807$export$1e4baea7053fc0e3, (v) => $acfbfc6ee2363807$export$1e4baea7053fc0e3 = v);




// Wrappers required because of bug with passing down "as" prop
// https://github.com/styled-components/styled-components/issues/2449
// Table
const $acfbfc6ee2363807$var$TableWrapper = (props = {})=>{
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Box), {
        as: "table",
        ...props
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, undefined);
};
const $acfbfc6ee2363807$var$StyledTable = (0, ($parcel$interopDefault($dyHF6$styledcomponents)))($acfbfc6ee2363807$var$TableWrapper)(()=>(0, $dyHF6$styledcomponents.css)`
      display: table;
      width: 100%;

      &:not([hidden]) {
        display: table;
      }
    `);
function $acfbfc6ee2363807$export$54ec01a60f47d33d(props) {
    const { children: children , ...rest } = props;
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)($acfbfc6ee2363807$var$StyledTable, {
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
// Row
const $acfbfc6ee2363807$var$RowWrapper = (props = {})=>{
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Card), {
        as: "tr",
        ...props
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, undefined);
};
const $acfbfc6ee2363807$var$StyledRow = (0, ($parcel$interopDefault($dyHF6$styledcomponents)))($acfbfc6ee2363807$var$RowWrapper)(()=>(0, $dyHF6$styledcomponents.css)`
      display: table-row;

      &:not([hidden]) {
        display: table-row;
      }
    `);
function $acfbfc6ee2363807$export$b05581f4e764e162(props) {
    const { children: children , ...rest } = props;
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)($acfbfc6ee2363807$var$StyledRow, {
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, this);
}
// Cell
const $acfbfc6ee2363807$var$CellWrapper = (props = {})=>{
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Box), {
        as: "td",
        ...props
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, undefined);
};
const $acfbfc6ee2363807$var$StyledCell = (0, ($parcel$interopDefault($dyHF6$styledcomponents)))($acfbfc6ee2363807$var$CellWrapper)(()=>(0, $dyHF6$styledcomponents.css)`
      display: table-cell;

      &:not([hidden]) {
        display: table-cell;
      }
    `);
function $acfbfc6ee2363807$export$1e4baea7053fc0e3(props) {
    const { children: children , ...rest } = props;
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)($acfbfc6ee2363807$var$StyledCell, {
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "src/components/Table.tsx",
        lineNumber: 87,
        columnNumber: 10
    }, this);
}






const $aaf4d804384afd00$var$schemaExample = {
    languages: [
        {
            id: "en",
            title: "English"
        },
        {
            id: "no",
            title: "Norsk"
        }, 
    ]
};
function $aaf4d804384afd00$export$2e2bcd8739ae039() {
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Card), {
        tone: "caution",
        border: true,
        radius: 2,
        padding: 3,
        children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Stack), {
            space: 4,
            children: [
                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Text), {
                    children: [
                        "An array of language objects must be passed into the ",
                        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)("code", {
                            children: "internationalizedArray"
                        }, void 0, false, {
                            fileName: "src/components/Feedback.tsx",
                            lineNumber: 16,
                            columnNumber: 64
                        }, this),
                        " ",
                        "helper function, each with an ",
                        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)("code", {
                            children: "id"
                        }, void 0, false, {
                            fileName: "src/components/Feedback.tsx",
                            lineNumber: 17,
                            columnNumber: 41
                        }, this),
                        " and ",
                        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)("code", {
                            children: "title"
                        }, void 0, false, {
                            fileName: "src/components/Feedback.tsx",
                            lineNumber: 17,
                            columnNumber: 61
                        }, this),
                        " field. Example:"
                    ]
                }, void 0, true, {
                    fileName: "src/components/Feedback.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Card), {
                    padding: 2,
                    border: true,
                    radius: 2,
                    children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Code), {
                        size: 1,
                        language: "javascript",
                        children: JSON.stringify($aaf4d804384afd00$var$schemaExample, null, 2)
                    }, void 0, false, {
                        fileName: "src/components/Feedback.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/Feedback.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/Feedback.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/Feedback.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}


function $6a9b28384eb7074d$export$16423358d6ebe294(validations) {
    if (!validations.length) return `default`;
    const validationLevels = validations.map((v)=>v.level);
    if (validationLevels.includes("error")) return `critical`;
    else if (validationLevels.includes("warning")) return `caution`;
    return `default`;
}


function $7e790a73eaf2b445$export$2e2bcd8739ae039(props) {
    const { members: members , value: value , schemaType: schemaType , onChange: onChange  } = props;
    console.log(props);
    const readOnly = typeof schemaType.readOnly === "boolean" ? schemaType.readOnly : false;
    const { options: options  } = schemaType;
    const languages = (0, $dyHF6$react.useMemo)(()=>options?.languages ?? [], [
        options
    ]);
    const handleAddLanguage = (0, $dyHF6$react.useCallback)((languageId)=>{
        // Create new items
        const newItems = languageId ? [
            {
                _key: languageId
            }
        ] : languages.filter((language)=>value?.length ? !value.find((v)=>v._key === language.id) : true).map((language)=>({
                _key: language.id
            }));
        // Insert new items in the correct order
        const languagesInUse = value?.length ? value.map((v)=>v) : [];
        const insertions = newItems.map((item)=>{
            // What's the original index of this language?
            const languageIndex = languages.findIndex((l)=>item._key === l.id);
            // What languages are there beyond that index?
            const remainingLanguages = languages.slice(languageIndex + 1);
            // So what is the index in the current value array of the next language in the language array?
            const nextLanguageIndex = languagesInUse.findIndex((l)=>remainingLanguages.find((r)=>r.id === l._key));
            // Keep local state up to date incase multiple insertions are being made
            if (nextLanguageIndex < 0) languagesInUse.push(item);
            else languagesInUse.splice(nextLanguageIndex, 0, item);
            return nextLanguageIndex < 0 ? (0, $dyHF6$sanityform.insert)([
                item
            ], "after", [
                nextLanguageIndex
            ]) : (0, $dyHF6$sanityform.insert)([
                item
            ], "before", [
                nextLanguageIndex
            ]);
        });
        onChange([
            (0, $dyHF6$sanityform.setIfMissing)([]),
            ...insertions
        ]);
    }, [
        languages,
        onChange,
        value
    ]);
    const handleUnsetByKey = (0, $dyHF6$react.useCallback)((_key)=>{
        onChange((0, $dyHF6$sanityform.unset)([
            {
                _key: _key
            }
        ]));
    }, [
        onChange
    ]);
    const handleInnerValueChange = (0, $dyHF6$react.useCallback)((patchEvent, _key)=>{
        const inputValue = patchEvent.patches[0]?.value;
        const inputPath = [
            {
                _key: _key
            },
            `value`
        ];
        onChange(inputValue ? (0, $dyHF6$sanityform.set)(inputValue, inputPath) : (0, $dyHF6$sanityform.unset)(inputPath));
    }, [
        onChange
    ]);
    // TODO: This is lazy, reordering and re-setting the whole array – it could be surgical
    const handleRestoreOrder = (0, $dyHF6$react.useCallback)(()=>{
        if (!value?.length) return;
        // Create a new value array in the correct order
        // This would also strip out values that don't have a language as the key
        const updatedValue = value.reduce((acc, v)=>{
            const newIndex = languages.findIndex((l)=>l.id === v?._key);
            if (newIndex) acc[newIndex] = v;
            return acc;
        }, []).filter(Boolean);
        onChange((0, $dyHF6$sanityform.set)(updatedValue));
    }, [
        languages,
        onChange,
        value
    ]);
    const allKeysAreLanguages = (0, $dyHF6$react.useMemo)(()=>{
        return value?.every((v)=>languages.find((l)=>l?.id === v?._key));
    }, [
        value,
        languages
    ]);
    // Check languages are in the correct order
    const languagesOutOfOrder = (0, $dyHF6$react.useMemo)(()=>{
        if (!value?.length) return [];
        const languagesInUse = languages.filter((l)=>value.find((v)=>v._key === l.id));
        return value.map((v, vIndex)=>vIndex === languagesInUse.findIndex((l)=>l.id === v._key) ? null : v).filter(Boolean);
    }, [
        value,
        languages
    ]);
    const languagesAreValid = (0, $dyHF6$react.useMemo)(()=>languages?.length && languages.every((item)=>item.id && item.title), [
        languages
    ]);
    if (!languagesAreValid) return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $aaf4d804384afd00$export$2e2bcd8739ae039), {}, void 0, false, {
        fileName: "src/components/InternationalizedArrayInput.tsx",
        lineNumber: 140,
        columnNumber: 12
    }, this);
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Stack), {
        space: 2,
        children: [
            members?.length > 0 ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $acfbfc6ee2363807$exports.Table), {
                children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)("tbody", {
                    children: members.map((member)=>/*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $acfbfc6ee2363807$exports.TableRow), {
                            tone: member?.item?.validation?.length > 0 ? (0, $6a9b28384eb7074d$export$16423358d6ebe294)(member.item.validation) : undefined,
                            children: [
                                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $acfbfc6ee2363807$exports.TableCell), {
                                    style: {
                                        verticalAlign: "bottom"
                                    },
                                    children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Box), {
                                        paddingY: 3,
                                        paddingRight: 2,
                                        children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Label), {
                                            muted: true,
                                            size: 1,
                                            children: member.key
                                        }, void 0, false, {
                                            fileName: "src/components/InternationalizedArrayInput.tsx",
                                            lineNumber: 159,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/InternationalizedArrayInput.tsx",
                                        lineNumber: 158,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/InternationalizedArrayInput.tsx",
                                    lineNumber: 157,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $acfbfc6ee2363807$exports.TableCell), {
                                    paddingRight: 2,
                                    style: {
                                        width: `100%`
                                    },
                                    children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityform.MemberItem), {
                                        ...props,
                                        member: member
                                    }, void 0, false, {
                                        fileName: "src/components/InternationalizedArrayInput.tsx",
                                        lineNumber: 165,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/InternationalizedArrayInput.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $acfbfc6ee2363807$exports.TableCell), {
                                    style: {
                                        verticalAlign: "bottom"
                                    },
                                    children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Flex), {
                                        align: "center",
                                        justify: "flex-end",
                                        gap: 3,
                                        children: [
                                            member.item.validation.length > 0 ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Box), {
                                                paddingLeft: 2,
                                                children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityform.FormFieldValidationStatus), {
                                                    validation: member.item.validation
                                                }, void 0, false, {
                                                    fileName: "src/components/InternationalizedArrayInput.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/InternationalizedArrayInput.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Button), {
                                                mode: "ghost",
                                                icon: (0, $dyHF6$sanityicons.RemoveIcon),
                                                tone: "critical",
                                                disabled: typeof readOnly === "boolean" ? readOnly : false,
                                                onClick: ()=>handleUnsetByKey(member.key)
                                            }, void 0, false, {
                                                fileName: "src/components/InternationalizedArrayInput.tsx",
                                                lineNumber: 175,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/InternationalizedArrayInput.tsx",
                                        lineNumber: 168,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/InternationalizedArrayInput.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, member.key, true, {
                            fileName: "src/components/InternationalizedArrayInput.tsx",
                            lineNumber: 149,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "src/components/InternationalizedArrayInput.tsx",
                    lineNumber: 147,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/InternationalizedArrayInput.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this) : null,
            languagesOutOfOrder.length > 0 && allKeysAreLanguages ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Button), {
                tone: "caution",
                icon: (0, $dyHF6$sanityicons.RestoreIcon),
                onClick: ()=>handleRestoreOrder(),
                text: "Restore order of languages"
            }, void 0, false, {
                fileName: "src/components/InternationalizedArrayInput.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this) : null,
            value && value.length < languages.length ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Stack), {
                space: 2,
                children: [
                    /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Grid), {
                        columns: Math.min(languages.length, 5),
                        gap: 2,
                        children: languages.map((language)=>/*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Button), {
                                tone: "primary",
                                mode: "ghost",
                                fontSize: 1,
                                disabled: readOnly || Boolean(value?.find((item)=>item._key === language.id)),
                                text: language.id.toUpperCase(),
                                icon: (0, $dyHF6$sanityicons.AddIcon),
                                onClick: ()=>handleAddLanguage(language.id)
                            }, language.id, false, {
                                fileName: "src/components/InternationalizedArrayInput.tsx",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/InternationalizedArrayInput.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)((0, $dyHF6$sanityui.Button), {
                        tone: "primary",
                        mode: "ghost",
                        disabled: readOnly || value && value?.length >= languages?.length,
                        icon: (0, $dyHF6$sanityicons.AddIcon),
                        text: value?.length ? `Add missing languages` : `Add all languages`,
                        onClick: ()=>handleAddLanguage()
                    }, void 0, false, {
                        fileName: "src/components/InternationalizedArrayInput.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/InternationalizedArrayInput.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "src/components/InternationalizedArrayInput.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}


const $7594066088192472$var$CONFIG_DEFAULT = {
    name: `title`,
    type: `string`,
    languages: []
};
function $7594066088192472$export$bec7eb13daf35f0e(config = $7594066088192472$var$CONFIG_DEFAULT) {
    const { name: name , type: type , languages: languages  } = config;
    const configValidation = Array.isArray(config?.validation) ? config.validation : [
        config?.validation
    ];
    return (0, $dyHF6$sanity.defineField)({
        name: name,
        title: config?.title ?? undefined,
        group: config?.group ?? undefined,
        hidden: config?.hidden ?? undefined,
        readOnly: config?.readOnly ?? undefined,
        type: "array",
        components: {
            input: (0, $7e790a73eaf2b445$export$2e2bcd8739ae039)
        },
        options: {
            languages: languages
        },
        of: [
            {
                type: "object",
                fields: [
                    {
                        name: "value",
                        type: type
                    }, 
                ],
                preview: {
                    select: {
                        title: "value",
                        key: "_key"
                    },
                    prepare ({ title: title , key: key  }) {
                        return {
                            title: title,
                            subtitle: key.toUpperCase()
                        };
                    }
                }
            }, 
        ],
        validation: (Rule)=>[
                languages?.length ? Rule.max(languages.length) : null,
                Rule.custom((value, context)=>{
                    const { languages: contextLanguages  } = context?.type?.options ?? {};
                    const nonLanguageKeys = value?.length ? value.filter((item)=>!contextLanguages.find((language)=>item._key === language.id)) : [];
                    if (nonLanguageKeys.length) return {
                        message: `Array item keys must be valid languages registered to the field type`,
                        paths: nonLanguageKeys.map((item)=>({
                                _key: item._key
                            }))
                    };
                    const valuesByLanguage = value?.length ? value.filter((item)=>Boolean(item?._key)).reduce((acc, cur)=>{
                        if (acc[cur._key]) return {
                            ...acc,
                            [cur._key]: [
                                ...acc[cur._key],
                                cur
                            ]
                        };
                        return {
                            ...acc,
                            [cur._key]: [
                                cur
                            ]
                        };
                    }, {}) : {};
                    const duplicateValues = Object.values(valuesByLanguage).filter((item)=>item?.length > 1).flat();
                    if (duplicateValues.length) return {
                        message: "There can only be one field per language",
                        paths: duplicateValues.map((item)=>({
                                _key: item._key
                            }))
                    };
                    return true;
                }),
                ...configValidation, 
            ]
    });
}


$parcel$exportWildcard(module.exports, $7594066088192472$exports);


//# sourceMappingURL=index.js.map
