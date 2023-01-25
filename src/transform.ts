import { Round } from "./helper";
import { IPoint, ITransformParameters } from "./interface";
import { Point } from "./pointDefs";

export const transform2Window=(b: IPoint, trf: ITransformParameters, r?: number): IPoint=> {
    if (!r) {
      r = 1;
    }
    const x: number = Round((b.x - trf.bb.x) * trf.scl + trf.trl.x, r);
    const y: number = Round((b.y - trf.bb.y) * -trf.scl + trf.trl.y, r);
    return new Point(x, y);
  }
 export const transformArray2Window=(bb: IPoint[], trf: ITransformParameters, r?: number): IPoint[]=> {
    const ret: IPoint[] = [];
    bb.forEach(b => {
      ret.push(transform2Window(b, trf, r))
    });
    return ret;
  }
  export const transformFromWindow=(b: IPoint, trf: ITransformParameters, r?: number): IPoint=> {
    if (!r) {
      r = 1;
    }
    const x: number = Round((b.x -  trf.trl.x) / trf.scl + trf.bb.x, r);
    const y: number = Round((b.y -  trf.trl.y) / -trf.scl + trf.bb.y, r);
    return new Point(x, y);
  }