import { BaseComponent, BaseComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class SplitComponentOption {
    static controls: never[];
    direction: string;
    rows: Array<string>;
    style: StyleComponentOption;
}
declare class SplitLayoutComponentOption extends BaseComponentOption {
    static controls: never[];
    split: SplitComponentOption;
}
export declare class SplitLayoutComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: SplitLayoutComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
