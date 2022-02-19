import { ChartHandler } from './ChartHandler';
interface IChartState {
    currentPage: string;
    chartHandler: ChartHandler;
    unit: string;
    pageHistories: Array<string>;
}
export declare function setContext(state: any, i18n: any, language: any): void;
export declare function getContext(): any;
export declare function gotoPage(id: string): void;
export declare function goBack(): 1 | 0;
export declare function userChartState(): IChartState;
export declare function findChartComponent(type: string): any;
export {};
