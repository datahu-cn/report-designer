import { IControl, SourceCode, ITableDefinition, ITableQueryPager } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { OracleHelper } from './OracleHelper';
export declare class OracleDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    oracleClient: string;
}
export declare class OracleDataSource extends BaseDataSource {
    helper?: OracleHelper;
    constructor(language: string, config?: OracleDataSourceOption);
    config: OracleDataSourceOption;
    icon: string;
    sourceCode: SourceCode;
    supportPager: boolean;
    getTables(pager: ITableQueryPager | null): Promise<any>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
