import { IControl, SourceCode, ITableDefinition } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { RestfulHelper } from './RestfulHelper';
export declare class RestfulDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    url: string;
    resultField: string;
    resultType: string;
    method: string;
    openAuth: boolean;
    authMode: string;
    username: string;
    password: string;
    requestBody: string;
    params: Array<any>;
    headers: Array<any>;
}
export declare class RestfulDataSource extends BaseDataSource {
    helper?: RestfulHelper;
    constructor(language: string, config?: RestfulDataSourceOption);
    config: RestfulDataSourceOption;
    icon: string;
    title: string;
    description: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
