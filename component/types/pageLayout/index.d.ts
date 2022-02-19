import { BaseComponent, BaseComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class PageContentComponentOption {
    static controls: never[];
    style?: StyleComponentOption;
    showTabWhenOnlyOne: boolean;
    tabType: string;
    tabPosition: string;
    tabBarStyle?: StyleComponentOption;
}
declare class PageLayoutComponentOption extends BaseComponentOption {
    static controls: never[];
    pageContent?: PageContentComponentOption;
}
export declare class PageLayoutComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    option: PageLayoutComponentOption;
    constructor(language: string);
    title: string;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
