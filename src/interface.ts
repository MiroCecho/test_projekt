export enum NodeName {
  path,
  line,
  text,
  tspan,
  circle,
  ellipse,
  rect,
  g,
  use,
  defs,
  pattern,
  clipPath,
  svg
}
export interface IPoint {
  x: number;
  y: number;
  Clone(): IPoint;
  SubtractPoint(point: IPoint): IPoint;
  AddPoint(point: IPoint): IPoint;
  toString(): string;
}