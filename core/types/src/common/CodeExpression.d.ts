export declare class CodeExpression {
    code: string;
    isFunction: boolean;
    args: any;
    codeFunction?: Function;
    constructor(code: string, args: any | Array<any>, isFunction?: boolean);
    getCodeFunction(): any;
    run(...values: Array<any>): any;
    static runCode(code: string, args?: any | Array<any>, ...values: Array<any>): any;
    static runCodes(codes: Array<string>, args?: any | Array<any>, ...values: Array<any>): any[];
}
