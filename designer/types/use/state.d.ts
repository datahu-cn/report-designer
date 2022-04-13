import { ComputedRef, WritableComputedRef } from 'vue';
import { I18nStrings } from '../i18n';
import { PackageManager } from './PackageManager';
import { ITableDefinition, IColumnDefinition, IChartDefinition } from '@datahu/core';
export declare enum DragTargetType {
    column = "column",
    field = "field",
    filter = "filter",
    chart = "chart"
}
export declare class DragContext {
    target: any;
    from: any;
    type: DragTargetType;
    dropTarget: any;
    hoverField: any;
}
export interface IState {
    loaded: boolean;
    loading: boolean;
    store: any;
    pkg: PackageManager;
    components: any;
    emptyChartComponent: any;
    filePath?: string;
    createEmpty: boolean;
    defaultCompanyId?: number;
    /**
     * 打开预览
     */
    preview: boolean;
    /**
     * 显示登录框
     */
    login: boolean;
    /**
     * 进入登录弹出框时的提示信息
     */
    loginEnd: any;
    /**
     * 发布弹出框
     */
    publish: boolean;
    selectedTable?: ITableDefinition;
    selectedColumn?: IColumnDefinition;
    focusItem: any;
    focusDropPanel: any;
    copyedCharts: Array<IChartDefinition>;
    formatPainterChart: IChartDefinition | null;
    root: any;
    dragContext: DragContext;
    openLink: any;
    usedata: any;
    viewMode: any;
    zoomRate: number;
    showEditRelationship: boolean;
}
export declare function openLink(url: string): Promise<void>;
export declare function initThemes(): void;
export declare function loadStore(): Promise<void>;
export declare function loadPkg(): Promise<void>;
export declare function loadPkgFromPath(recenty: any): Promise<void>;
export declare function newPkg(): Promise<void>;
export declare function useState(): IState;
export declare function resetState(): void;
export declare function useLanguage(): WritableComputedRef<string>;
export declare function useI18n(): ComputedRef<I18nStrings>;
export declare function useAntLocale(): ComputedRef<any>;
export declare function findChartComponent(type: string): any;
