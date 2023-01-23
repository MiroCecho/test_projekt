import { getSize } from "./helper";
import { IPoint } from "./interface";
import { Point } from "./pointDefs";

export class PlatnoResize {
    platno: HTMLElement;
    spendlik: HTMLElement;
    infoSize: HTMLElement;
    body:HTMLElement;

    resizeEvents() {
        let ptPlatno: IPoint;
        let btPosition: IPoint;
        let move: boolean = false;
        this.spendlik.style.display="";
        const reset= ()=>{
            this.spendlik.style.backgroundColor = "";
            move = false;
            this.spendlik.style.cursor = "nwse-resize";
        }
        this.spendlik.addEventListener("pointerdown", () => {
            this.spendlik.style.backgroundColor = "yellow";
            ptPlatno = getSize(this.platno);
            btPosition = new Point(this.spendlik.offsetLeft, this.spendlik.offsetTop);
            move = true;
            this.spendlik.style.cursor = "grab";
        })
        this.body.addEventListener("pointermove", (e: PointerEvent) => {
            if (move) {
                const dt: IPoint = new Point(e.movementX, e.movementY);
                btPosition=btPosition.AddPoint(dt);
                ptPlatno=ptPlatno.AddPoint(dt);
                this.spendlik.setAttribute("style",`left:${btPosition.x}px;top:${btPosition.y}px`)
                this.spendlik.style.cursor = "grabbing";
                this.spendlik.style.backgroundColor = "orange";
                this.platno.setAttribute("style",`width:${ptPlatno.x}px;height:${ptPlatno.y}px;`);
                this.infoSize.innerText = "Rozmery plátna: šírka:" + ptPlatno.x + "; výška:" + ptPlatno.y;
            }
        })
        this.spendlik.addEventListener("pointerup", () => {
            reset();
        })
        this.spendlik.addEventListener("pointerleave", () => {
          reset();
        })
    }

    constructor(platno: HTMLElement,
        spendlik: HTMLElement,
        infoSize: HTMLElement) {
        this.infoSize = infoSize;
        this.platno = platno;
        this.spendlik = spendlik;
        this.spendlik.style.cursor = "nwse-resize";
        this.body=document.getElementsByTagName("body")[0];
        this.resizeEvents();
    }
}