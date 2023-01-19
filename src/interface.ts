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
export enum TypeConstant {
  line = 1,
  lines = 11,
  shp = 2,
  arc = 3,
  text = 40,
  redlinetext = 14,
  circle = 5,
  ellipse = 6,
  lineString = 7,
  solidHole = 9,
  cell = 10,
  reference = 20,
  link = 30
}
export interface IPoint {
  x: number;
  y: number;
  Clone(): IPoint;
  SubtractPoint(point: IPoint): IPoint;
  AddPoint(point: IPoint): IPoint;
  toString(): string;
}
export interface IBox{
  width:number;
  height:number;
  origin:IPoint;
}
export interface ITransformParameters {
  trl: IPoint;
  bb:IPoint;
  scl: number;
}