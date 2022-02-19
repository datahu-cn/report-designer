import { BaseComponent, BaseComponentOption } from '@datahu/component-base';
declare class RichTextComponentOption extends BaseComponentOption {
    static controls: never[];
    /**
     * 富文本 JSON数据
     */
    data: any;
}
export declare class RichTextComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: RichTextComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
