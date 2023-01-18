import { IPoint } from "./interface";

export class Point implements IPoint {
  static PointFromObject(o: any): Point {
      return new Point(o.x, o.y);
  }
  static PointsFromObjects(oo: any): IPoint[] {
      const ret: IPoint[] = [];
      const h:number = oo.length;
      for (let i: number = 0; i < h; i++) {
          ret.push(Point.PointFromObject(oo[i]));
      }
      return ret;
  }
  static dlzka(p1:IPoint,p2:IPoint):number{
    let ret:number;
    let a:number;
    let b:number;
    a=p2.x-p1.x;
    b=p2.y-p1.y;
    ret=Math.sqrt( a*a+b*b);
    return ret;
  }
  static ExactPoint(b: IPoint, r: number = 0):IPoint {
      return new Point(parseFloat(b.x.toFixed(r)), parseFloat(b.y.toFixed(r)));
  }
  static Rotate(origin: Point, angle: number, b: Point): Point {
      if (angle === 0) {
          return b.Clone();
      }
      const s: number = Math.sin(angle);
      const c: number = Math.cos(angle);
      const p: Point = new Point(b.x - origin.x, b.y - origin.y);
      const x: number = p.x * c - p.y * s;
      const y: number = p.x * s + p.y * c;
      return new Point(origin.x + x, origin.y + y);
  }
  static String2Points(t: string): Point[] {
      const res: any = t.match(/-?\d+(\.\d+)?/g);
      const length: number = res.length;
      let i: number = 0;
      const ret: Point[] = [];
      while (i < length) {
          const p: Point = new Point(
              Number.parseFloat(res[i]),
              Number.parseFloat(res[i + 1])
          );
          ret.push(p);
          i += 2;
      }
      return ret;
  }
   Clone(): IPoint {
      return new Point(this.x, this.y);
  }
  SubtractPoint(point: IPoint): IPoint {
      return new Point(this.x - point.x, this.y - point.y);
  }
  AddPoint(point: IPoint): IPoint {
      return new Point(point.x + this.x, point.y + this.y);
  }
  x: number = 0;
  y: number = 0;
  toString(): string {
      return this.y < 0 ? this.x + "" + this.y : this.x + " " + this.y;
  }
  constructor(x?: number, y?: number) {
      this.x = x === undefined ? 0 : x;
      this.y = y === undefined ? 0 : y;
  }
}