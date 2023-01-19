import { IBox, IPoint, ITransformParameters, NodeName } from "./interface";
import { Point } from "./pointDefs";
const svgNs: string = "http://www.w3.org/2000/svg";
const standardStyles: string[] = ["2 6", "8 3", "14 4", "10 4 4 4", "3 5", "6 3 2 3 2 3", "10 3 3 3"];
export const CreateSvgObject = (name: NodeName, j: any): HTMLElement => {
    const nod: string = NodeName[name];
    const e: Element = document.createElementNS(svgNs, nod);
    let key: string;
    // tslint:disable-next-line:forin
    for (key in j) {
        e.setAttribute(key, j[key]);
    }
    return (e as HTMLElement);
}
export const Round = (n: number, digits?: number): number => {
    if (digits === undefined) {
        digits = 2;
    }
    return parseFloat(n.toFixed(digits));
}
export const getSize = (svgArea: HTMLElement): IPoint => {
    return new Point(svgArea.clientWidth, svgArea.clientHeight);
}
export const getDefaultTP=(window: IBox, range: IBox): ITransformParameters =>{
    let scl: number = window.width / range.width;
    const r: number = window.height / range.height;
    const trl: IPoint = new Point();
    const bb: IPoint = range.origin;
    if (r < scl) {
      scl = r;
      trl.x = Round((window.width - range.width * scl) / 2, 2);
    } else {
      trl.y = Round((window.height - range.height * scl) / 2, 2);
    }
    return { trl, scl, bb };
  }
  const getLineStyle=(n:number):string=>{
    let r:string="";
    if(n>0){
        r=standardStyles[n-1];
    }
    return r;
  }
  export const styleFromObject = (obj: any): string => {
    const t: string[] = [];
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        if (key === "stroke-dasharray") {
          t.push(key + ":" + getLineStyle(obj[key]));
        } else {
          let value = obj[key];
          t.push(key + ":" + value);
        }
      }
    }
    return t.join(";")
  }
 export const PathFromPoints = (bb: IPoint[], cutFirst: boolean = false): string => {
    if (bb === undefined || bb.length === 0) {
      return "";
    }
    const MiniPath = (a: IPoint, b: IPoint): string => {
        let d: string = "";
        const m: IPoint = new Point(Round(a.x - b.x, 1), Round(a.y - b.y, 1));
        if (m.x === 0 && m.y !== 0) {
          d += "v" + m.y;
        } else if (m.x !== 0 && m.y === 0) {
          d += "h" + m.x;
        } else if (m.x !== 0 && m.y !== 0) {
          d += "l" + m.x + " " + m.y;
        }
        return d;
      }
    const length: number = bb.length;
    let d: string = cutFirst === true ? "" : "M" + bb[0].toString();
    if (length > 1) {
      for (let i: number = 1; i < length; i++) {
        d += MiniPath(bb[i], bb[i - 1]);
      }
    }
    return d;
  }