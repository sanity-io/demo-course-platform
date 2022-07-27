import { Rule } from "@sanity/types";
import { FieldDefinition } from "sanity";
type Language = {
    id: string;
    title: string;
};
type AllowedType = 'string' | 'number' | 'boolean' | 'text';
type ArrayConfig = {
    name: string;
    type: AllowedType;
    languages: Language[];
    title?: string;
    group?: string;
    hidden?: boolean | (() => boolean);
    readOnly?: boolean | (() => boolean);
    validation?: Rule | Rule[];
};
export function internationalizedArray(config?: ArrayConfig): FieldDefinition;

//# sourceMappingURL=index.d.ts.map
