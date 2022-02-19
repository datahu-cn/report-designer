import { BaseComponent, BaseComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class GridCellComponentOption {
    static controls: never[];
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
    style: StyleComponentOption;
}
declare class GridLayoutComponentOption extends BaseComponentOption {
    static controls: never[];
    cells: Array<GridCellComponentOption>;
}
export declare class GridLayoutComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: GridLayoutComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
