import { CreateSvgObject, Round, getDefaultTP, getSize } from "./helper";
import { IBox, IPoint, ITransformParameters, NodeName, TypeConstant } from "./interface";
import { PlatnoResize } from "./platnoResize";
import { Point } from "./pointDefs";
import { RangeManager } from "./rangeManager";
import { transform2Window } from "./transform";
import { Circle } from "./visuals/circle";
import { Line } from "./visuals/line";
import { Visual } from "./visuals/visual";

export class SvgRenderer {
    platno: HTMLElement;
    spendlik: HTMLElement;
    infoSize: HTMLElement;
    svg: HTMLElement;
    src: any;
    tp: ITransformParameters;
    rgOfAll: IBox;
    scale2Fit() {
        const rr: IBox[] = this.src.visuals.map(f => f.range);
        this.rgOfAll = RangeManager.rangeByRanges(rr);
        const platno: IPoint = getSize(this.platno);
        const window: IBox = { origin: new Point, width: platno.x, height: platno.y }
        this.tp = getDefaultTP(window, this.rgOfAll);
        this.infoSize.innerText = "Rozmery plátna: šírka:" + window.width + "; výška:" + window.height;
    }
    renderer() {
        this.svg.innerHTML = "";
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
        const addRange = (rg: IBox, stl: string) => {
            const org: IPoint = transform2Window(rg.origin, this.tp);
            const width: number = Round(rg.width * this.tp.scl, 0);
            const height: number = Round(rg.height * this.tp.scl, 0);
            const rect: HTMLElement = CreateSvgObject(NodeName.rect, { x: org.x, y: org.y, width, height, style: stl })
            g.appendChild(rect);
        }
        visuals.forEach((v: Visual) => {
            g.appendChild(v.create());
            addRange(v.range, "stroke:green;stroke-width:5;opacity:0.7;stroke-dasharray:4");
        });
        addRange(this.rgOfAll, "stroke:orange;stroke-width:8;opacity:0.3;stroke-dasharray:6 3");
        this.svg.appendChild(g);
    }
    constructor(src: any) {
        this.src = src;
        this.infoSize = document.getElementById("infoSize") as any;
        this.spendlik = document.getElementById("btResize") as any;
        this.platno = document.getElementById("box") as any;
        this.svg = this.platno.querySelector("svg") as any;
        this.scale2Fit();
        this.renderer();
        new PlatnoResize(this.platno, this.spendlik, this.infoSize);
    }
}