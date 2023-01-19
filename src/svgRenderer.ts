import { CreateSvgObject, getDefaultTP, getSize } from "./helper";
import { IBox, IPoint, ITransformParameters, NodeName, TypeConstant } from "./interface";
import { Point } from "./pointDefs";
import { RangeManager } from "./rangeManager";
import { Circle } from "./visuals/circle";
import { Line } from "./visuals/line";
import { Visual } from "./visuals/visual";

export class SvgRenderer {
    platno: HTMLElement;
    svg: HTMLElement;
    src: any;
    tp: ITransformParameters;
    scale2Fit(rr: IBox[]) {
        const rg: IBox = RangeManager.rangeByRanges(rr);
        const platno: IPoint = getSize(this.platno);
        const window: IBox = { origin: new Point, width: platno.x, height: platno.y }
        this.tp = getDefaultTP(window, rg);
    }
    renderer() {
        const visuals: Visual[] = [];
        this.src.visuals.forEach(e => {
            let v: Visual;
            switch (e.type) {
                case TypeConstant.line:
                    v = new Line(e, this.tp);
                    visuals.push(v);
                    break;
                case TypeConstant.circle:
                    v = new Circle(e, this.tp);
                    visuals.push(v);
                    break;
            }
        })
        const g: HTMLElement = CreateSvgObject(NodeName.g, {
            id: "grf",
            fill: "none",
            transform: ""
        })
        visuals.forEach((v: Visual) => {
            g.appendChild(v.create());
        });
        this.svg.appendChild(g);
    }
    constructor(src: any) {
        this.src = src;
        this.platno = document.getElementById("box") as any;
        this.svg = this.platno.querySelector("svg") as any;
        this.scale2Fit(this.src.visuals.map(f => f.range));
        this.renderer();
    }
}