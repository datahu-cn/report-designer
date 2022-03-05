import { IPackageDefinition } from './IPackageDefinition';
import { ITableDefinition } from '../common';
import { IChartDefinition } from './IPackageDefinition';
export declare class PackageHelper {
    static eachChartById(root: IChartDefinition, chartId: string, handle: Function): void;
    static runTableSourceCode(tables: Array<ITableDefinition>, definition: IPackageDefinition): ITableDefinition[];
    static getTablesById(definition: IPackageDefinition, ids: Array<string>): Array<ITableDefinition>;
    static getTablesByName(definition: IPackageDefinition, names: Array<string>): Array<ITableDefinition>;
    static eachChart(chart: IChartDefinition, handle: Function): void;
    static getCachePackage(definition: IPackageDefinition): IPackageDefinition | null;
}
