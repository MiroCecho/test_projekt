import { CreateSvgObject } from "./helper";
import { IPoint, NodeName } from "./interface";
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

const ht = document.createElement('div') as any;

const drawPath = (bb: IPoint[]) => {
  const ret: IPoint[] = Point.PointsFromObjects(bb);
  let svg = new String(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"> <g fill="none" width="100%" height="100%"> <path d="`);
  console.log(ret);
  let a=0,b=0,c=0,d=0;

  for (let i = 1; i < bb.length; i++) {
    if(i==1){
      a=ret[i-1].x;
      b=ret[i-1].y;
      c=ret[i].x;
      d=ret[i].y;
    }else{
      a+=ret[i-1].x;
      b+=ret[i-1].y;
      c=ret[i].x;
      d=ret[i].y;
    }
    // let text1 = ret[i-1].x.toString();
    // let text2 = ret[i-1].y.toString();
    // let text3 = ret[i].x.toString();
    // let text4 = ret[i].y.toString();
    svg += ` M ${a} ${b} l ${c} ${d} `;
    
  }
  svg += `" stroke="red" stroke-width="3" width="100%" height="100%" /> </g> </svg>`;
  console.log(svg);

  ht.innerHTML = svg;
  const box = document.getElementById('box');
  box?.append(ht);
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

const vytvorenObj=():HTMLElement=>{
  let e:HTMLElement= CreateSvgObject(NodeName.line,{
    _id:777,
    x1:0,
    y1:0,
    x2:200,
    y2:300,
    style:"stroke:rgb(255,0,0);stroke-width:2"
  })
  return e;
}

aa.addEventListener("click", () => {
  let a: IPoint;
  a = new Point(7.222447, 8.45436355);
  let b: IPoint = Point.ExactPoint(a, 2)
  console.log(b.toString());

})

const bb:HTMLElement = document.getElementById("load") as any;

bb.addEventListener("click", () =>{
  fetch("http://localhost:3000/drawing/1")
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      const points: IPoint[] = data.visuals.find(f => f.type === 1).points;
      drawPath(points);
    }
    );
})
