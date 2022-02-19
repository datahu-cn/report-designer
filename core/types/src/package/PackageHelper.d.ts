import { IPackageDefinition } from './IPackageDefinition';
import { IChartDefinition } from './IPackageDefinition';
export declare class PackageHelper {
    static eachChartById(root: IChartDefinition, chartId: string, handle: Function): void;
    static eachChart(chart: IChartDefinition, handle: Function): void;
    static getCachePackage(definition: IPackageDefinition): IPackageDefinition | null;
}
