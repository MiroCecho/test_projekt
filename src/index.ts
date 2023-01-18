import { IPoint } from "./interface";
import { Point } from "./pointDefs";

const btTest: HTMLElement = document.getElementById("btTest") as any;

const spocitajDlzku = (bb: IPoint[]): number => {
  let dl: number = 0;

  for (let i = 1; i < bb.length; i++) {
    dl += Point.dlzka(bb[i - 1], bb[i]);
    if(i==4){
      console.log("AAA");
    }
  }
  return dl;
}


btTest?.addEventListener("click", () => {
  fetch("http://localhost:3000/drawing/1")
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      const points: IPoint[] = data.visuals.find(f => f.type === 1).points;
      const dl: number = spocitajDlzku(points);
    }
    );
})

const aa: HTMLElement = document.getElementById("btBody") as any;

aa.addEventListener("click", () => {
  let a: IPoint;
  a = new Point(7.222447, 8.45436355);
  let b: IPoint = Point.ExactPoint(a, 2)
  console.log(b.toString());

})

