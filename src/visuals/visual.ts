import { IBox, IPoint, ITransformParameters, TypeConstant } from "../interface";

export abstract class Visual{
    trf: ITransformParameters;
    style: any;
    points: IPoint[];
    level?: string;
    type: TypeConstant;
    range:IBox;
    abstract create(): HTMLElement;
    abstract style2String(): string;
}