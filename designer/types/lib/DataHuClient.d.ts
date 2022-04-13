export interface IDataHuClientOption {
    getData: string | Function;
    language?: string;
}
export declare class DataHuClient {
    static Components: any;
    private app;
    private root;
    private state;
    private option;
    constructor(option?: IDataHuClientOption);
    render(el: string | Element, filePath: string): void;
    useState(): {
        filePath: string;
    };
}
