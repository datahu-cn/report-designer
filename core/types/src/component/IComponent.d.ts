import { IControl } from '../control';
import 'reflect-metadata';
export declare function ComponentControl(control: IControl): (target: any, propertyKey: string) => void;
export interface IComponent {
    isLayout: boolean;
    language: string;
    icon: string;
    title: string;
    description: string;
    option: any;
    getControls(): Array<IControl>;
    getComponent(): any;
    setOption(option: any): void;
}
