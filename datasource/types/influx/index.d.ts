import { IControl, SourceCode, ITableDefinition } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { InfluxHelper } from './InfluxHelper';
export declare class InfluxDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    host: string;
    port: number;
    protocol: string;
    username: string;
    password: string;
    database: string;
    path: string;
}
export declare class InfluxDataSource extends BaseDataSource {
    helper?: InfluxHelper;
    constructor(language: string, config?: InfluxDataSourceOption);
    config: InfluxDataSourceOption;
    icon: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
