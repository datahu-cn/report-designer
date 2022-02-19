import { IControl, IDataSource, SourceCode, ITableDefinition } from '@datahu/core';
import { IMysqlConfig, MysqlHelper } from './MysqlHelper';
export declare class MysqlDataSource implements IDataSource {
    language: string;
    helper: MysqlHelper;
    constructor(language: string, config?: object);
    getControls(): IControl[];
    controls: IControl[];
    config: IMysqlConfig;
    icon: string;
    title: string;
    description: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
