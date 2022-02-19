import { BaseComponent, BaseComponentOption, DataOperationComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class TableStyleComponentOption {
    static controls: never[];
    showSeqence: boolean;
    border: string | boolean;
    showHeader: boolean;
    showFooter: boolean;
    stripe: boolean;
    resizable: boolean;
    rowStyle: StyleComponentOption;
    footerText: string;
    footerRowStyle: StyleComponentOption;
    rowBackgroundColor: string;
    rowColor: string;
}
export declare class ColumnStyleComponentOption {
    static controls: never[];
    fields: Array<string>;
    show: boolean;
    order: number;
    columnGroups: Array<string>;
    sortable: boolean;
    defaultSort: string | null;
    filter: boolean;
    width: string;
    cellType: string;
    summary: string;
    mergeColumn: boolean;
    showOverflow: string;
    fixed: string;
    headerCellStyle: StyleComponentOption;
    cellStyle: StyleComponentOption;
    cellBackgroundColor: string;
    cellColor: string;
}
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
}
declare class TableGroupComponentOption {
    static controls: never[];
    type: string;
    groupField: Array<string>;
    treeParentField: string;
    treeField: string;
    groupRowStyle: StyleComponentOption;
}
declare class DataTableComponentOption extends BaseComponentOption {
    static controls: never[];
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tableStyle: TableStyleComponentOption;
    columnStyles: Array<ColumnStyleComponentOption>;
    tableGroup: TableGroupComponentOption;
}
export declare class DataTableComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: DataTableComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
