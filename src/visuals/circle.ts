import { CreateSvgObject, styleFromObject } from "../helper";
import { IPoint, ITransformParameters, NodeName, TypeConstant } from "../interface";
import { Point } from "../pointDefs";
import { transformArray2Window } from "../transform";
import { Visual } from "./visual";

export class Circle extends Visual{
    r: number;
    create(): HTMLElement {
        let e: HTMLElement;
        const stl = this.style2String();
        const c: IPoint = this.points[0];
        e = CreateSvgObject(NodeName.circle, {
            cx: c.x, cy: c.y, r: this.r
        });
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
        this.type=TypeConstant.circle;
        this.points = transformArray2Window([src.center,new Point(src.center.x+src.r,src.center.y)], tp);
        this.r=Point.dlzka(this.points[0],this.points[1]);
        this.style
        this.style = (src.style) ? src.style : undefined
    }
}