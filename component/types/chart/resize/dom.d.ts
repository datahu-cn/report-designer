export declare function matchesSelectorToParentElements(el: any, selector: any, baseNode: any): boolean;
export declare function getComputedSize($el: any): number[];
export declare function addEvent(el: any, event: any, handler: any): void;
export declare function removeEvent(el: any, event: any, handler: any): void;
export declare function elementContains(container: HTMLElement, target: HTMLElement, excludeClass: string): boolean | undefined;
export declare function pxToPercent(position: any, parentWidth: any, parentHeight: any): {
    left: number;
    top: number;
    width: string | number;
    height: string | number;
};
export declare function percentToPx(position: any, parentWidth: any, parentHeight: any): {
    left: number;
    top: number;
    width: string | number;
    height: string | number;
};
