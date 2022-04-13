import { PackageManager } from './PackageManager';
import { ComputedRef, WritableComputedRef } from 'vue';
import { I18nStrings } from './i18n';
import { IChartDefinition } from '@datahu/core';
export declare enum DragTargetType {
    column = "column",
    field = "field",
    filter = "filter",
    chart = "chart"
}
export declare class DragContext {
    target: any;
    from: any;
    type: DragTargetType | undefined;
    dropTarget: any;
}
export declare function openLink(url: string): Promise<void>;
interface IState {
    pkg: PackageManager;
    components: any;
    preview: boolean;
    loaded: boolean;
    focusItem: any;
    focusDropPanel: any;
    copyedCharts: Array<IChartDefinition>;
    root: any;
    dragContext: DragContext;
    openLink: any;
}
export declare function initThemes(): void;
export declare function initState(): Promise<void>;
export declare function useState(): IState;
export declare function useLanguage(): WritableComputedRef<string>;
export declare function useI18n(): ComputedRef<I18nStrings>;
export {};
