import { IPackageDefinition, IConnectorDefinition, ITableDefinition, IChartDefinition, DataContext } from '@datahu/core';
import { IDataHuClientOption } from './DataHuClient';
export declare class PackageManager {
    definition: IPackageDefinition;
    dataContext: DataContext;
    language: string;
    option: IDataHuClientOption;
    constructor(definition: IPackageDefinition, language: string, option: IDataHuClientOption);
    init(): void;
    getChart(): IChartDefinition;
    getTheme(): string;
    refreshTableData(tables: Array<ITableDefinition>, force?: boolean): Promise<void>;
    refreshTableDataById(tableIds: Array<string>, force?: boolean): Promise<void>;
    refreshTableDataByName(tableNames: Array<string>, force?: boolean): Promise<void>;
    refreshAllTableData(force?: boolean): Promise<void>;
    resetData(): void;
    getConnector(id: any): IConnectorDefinition;
}
