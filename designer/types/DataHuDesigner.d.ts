import { IState } from './use/state';
import { IDataHuDesignerOption } from './IDataHuDesignerOption';
export declare class DataHuDesigner {
    static Components: any;
    private app;
    private root;
    private option;
    private state;
    constructor(option: IDataHuDesignerOption);
    render(el: string | Element, filePath: string, createEmpty?: boolean, defaultCompanyId?: number): Promise<void>;
    useState(): IState;
}
