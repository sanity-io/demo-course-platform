import { SanityDocumentLike } from "sanity";
type Size = "desktop" | "mobile";
type _IframeOptions1 = {
    url: string | ((document: SanityDocumentLike) => unknown);
    defaultSize?: Size;
    reload?: {
        revision?: boolean;
        button?: boolean;
    };
};
type IframeProps = {
    document: {
        displayed: SanityDocumentLike;
    };
    options: _IframeOptions1;
};
declare function Iframe(props: IframeProps): JSX.Element;
export default IframeComponent;
export type IframeOptions = _IframeOptions1;

//# sourceMappingURL=index.d.ts.map
