import { IControl, IDataSource, SourceCode, ITableDefinition } from '@datahu/core';
import { CDataHelper, ICDataConfig } from './CDataHelper';
export declare class CDataDataSource implements IDataSource {
    language: string;
    helper: CDataHelper;
    disableNew: boolean;
    constructor(language: string, config?: object);
    getControls(): IControl[];
    controls: IControl[];
    config: ICDataConfig;
    icon: string;
    title: string;
    description: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
