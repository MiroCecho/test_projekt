import { Round } from "./helper";
import { IBox } from "./interface";
import { Point } from "./pointDefs";

export class RangeManager {
    static rangeByPoints(b: Point[], realPosition: boolean): IBox{
        const length: number = b.length;
        const rg: IBox = { origin: new Point(), width: 0, height: 0 };
        if (b.length < 0) {
          throw new Error("Range undefined");
        }
        if (length < 2) {
          rg.origin = b[0];
          rg.width = rg.height = 0;
          return rg;
        }
        const origin: Point = new Point(b[0].x, b[0].y);
        const oB: Point = origin.Clone();
        for (let i: number = 1; i < length; i++) {
          const n: Point = b[i];
          if (n.x < origin.x) {
            origin.x = n.x;
          }
          if (n.x > oB.x) {
            oB.x = n.x;
          }
          if (n.y < origin.y) {
            origin.y = n.y;
          }
          if (n.y > oB.y) {
            oB.y = n.y;
          }
        }
        const width: number = Round(oB.x - origin.x, 4);
        const height: number = Round(oB.y - origin.y, 4);
        if (realPosition === true) {
          origin.y += height;
        }
        rg.origin = origin;
        rg.width = width;
        rg.height = height;
        return rg;
    }
    static rangeByRanges(bb: IBox[]): IBox {
        bb = bb.filter(f => (f));
        const b: Point[] = new Array<Point>();
        bb.forEach((box: IBox) => {
          b.push(box.origin);
          b.push(new Point(box.origin.x + box.width, box.origin.y - box.height));
        });
        return this.rangeByPoints(b, true);
      }

}