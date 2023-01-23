import { CreateSvgObject, PathFromPoints, styleFromObject } from "../helper";
import { ITransformParameters, NodeName, TypeConstant } from "../interface";
import { transformArray2Window } from "../transform";
import { Visual } from "./visual";

export class Line extends Visual{
    create(): HTMLElement {
        let e: HTMLElement;
        const d: string = PathFromPoints(this.points);
        const stl = this.style2String();
        e = CreateSvgObject(NodeName.path, { d });
        if (stl) {
            e.setAttribute("style", stl);
        }
        return e;
    }
    style2String(): string {
        return this.style ? styleFromObject(this.style) : "";
    }
    constructor(src:any,tp:ITransformParameters){
        super();
        this.type=TypeConstant.line;
        this.points = transformArray2Window(src.points, tp);
        this.range=src.range;
        this.style
        this.style = (src.style) ? src.style : undefined
    }
}
