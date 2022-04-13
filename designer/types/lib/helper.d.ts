export declare class Helper {
    static get globalData(): any;
    static get(url: string, showError?: boolean, config?: any): Promise<any>;
    static post(url: string, data: any, showError?: boolean, config?: any): Promise<any>;
}
