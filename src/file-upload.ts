import { CreateSvgObject, Round, getDefaultTP, getSize } from "./helper";
import { IBox, IPoint, ITransformParameters, NodeName, TypeConstant } from "./interface";
import { Point } from "./pointDefs";
import { RangeManager } from "./rangeManager";

export class FileUpload{
    platno: HTMLElement;
    infoSize: HTMLElement;
    src: any;
    tp: ITransformParameters;
    rgOfAll: IBox;
    
    scale2Fit() {
        const rr: IBox[] = this.src.visuals.map(f => f.range);
        this.rgOfAll = RangeManager.rangeByRanges(rr);
        const platno: IPoint = getSize(this.platno);
        const window: IBox = { origin: new Point, width: platno.x, height: platno.y }
        this.tp = getDefaultTP(window, this.rgOfAll);
    }

    resizeFromScreen(){

    }
    constructor(src: any) {
        this.src = src;
        this.infoSize = document.getElementById("infoSize") as any;
        this.platno = document.getElementById("box") as any;
        // this.svg = this.platno.querySelector("svg") as any;
        this.scale2Fit();
        this.resizeFromScreen();
    }
}