import { HeaderToolbarMenu, IDataHuDesignerOption } from '../IDataHuDesignerOption';
declare class http {
    static option: IDataHuDesignerOption;
    static request(method: any, data: any, disabledError?: boolean): Promise<any>;
    static showToolbarMenu(...menus: Array<HeaderToolbarMenu>): boolean;
}
export default http;
