import { IControl, SourceCode, ITableDefinition, ITableQueryPager } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { PostgresqlHelper } from './PostgresqlHelper';
export declare class PostgresqlDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: boolean;
    sslCa: string;
    sslKey: string;
    sslCert: string;
    sslRejectUnauthorized: boolean;
}
export declare class PostgresqlDataSource extends BaseDataSource {
    helper?: PostgresqlHelper;
    constructor(language: string, config?: PostgresqlDataSourceOption);
    config: PostgresqlDataSourceOption;
    icon: string;
    sourceCode: SourceCode;
    supportPager: boolean;
    getTables(pager: ITableQueryPager | null): Promise<any>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
