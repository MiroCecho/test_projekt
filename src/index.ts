import { FileUpload } from "./file-upload";
import { CreateSvgObject } from "./helper";
import { IPoint, ITransformParameters, NodeName } from "./interface";
import { Point } from "./pointDefs";
import { SvgRenderer } from "./svgRenderer";
import { Circle } from "./visuals/circle";
import { Visual } from "./visuals/visual";

const btTest: HTMLElement = document.getElementById("btTest") as any;

var renderer:SvgRenderer;
var fileupload:FileUpload;

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
  let svg = new String(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="500px"  style="padding: 20px;"> <g fill="none" width="100%" height="100%"><g transform="translate(20 10) scale(1)"> <path d="`);
  console.log(ret);
  let a=0,b=0,c=0,d=0,start1=0,start2=0,end1=0,end2=0;

  for (let i = 1; i < bb.length; i++) {
    if(i==1){
      a=ret[i-1].x;
      b=ret[i-1].y;
      c=ret[i].x;
      d=ret[i].y;
      start1=a;
      start2=b;
    }else{
      a+=ret[i-1].x;
      b+=ret[i-1].y;
      c=ret[i].x;
      d=ret[i].y;
      end1=a+c;
      end2=b+d;
    }
    // let text1 = ret[i-1].x.toString();
    // let text2 = ret[i-1].y.toString();
    // let text3 = ret[i].x.toString();
    // let text4 = ret[i].y.toString();
    svg += ` M ${a} ${b} l ${c} ${d} `;
    
  }
  svg += `" stroke="red" stroke-width="3" width="100%" height="100%" /> <circle cx="${start1}" cy="${start2}" r="5" style="fill: coral;" /> <circle cx="${end1}" cy="${end2}" r="5" style="fill: coral;" /> </g></g> </svg>`;
  console.log(svg);

  ht.innerHTML = svg;
  // const box = document.getElementById('box');
  // box?.append(ht);
}

export const loaded = () =>{
  fetch("http://localhost:3000/drawing/1")
    .then(response => response.json())  
    .then((data) => {
      if(renderer){
        renderer.scale2Fit();
        renderer.renderer();
      } else{
        renderer=new SvgRenderer(data);
      }
    }
    );
}

loaded();

btTest?.addEventListener("click", () => {
  fetch("http://localhost:3000/drawing/1")
    .then(response => response.json())  
    .then((data) => {
      if(renderer){
        renderer.scale2Fit();
        renderer.renderer();
      } else{
        renderer=new SvgRenderer(data);
      }
    }
    );
})

const aa: HTMLElement = document.getElementById("btBody") as any;

aa.addEventListener("click", () => {
  // let a: IPoint;
  // a = new Point(7.222447, 8.45436355);
  // let b: IPoint = Point.ExactPoint(a, 2)
  // console.log(b.toString());
  let x,y;
  
  const platn: HTMLElement = document.getElementById("box") as any;
  // platn.addEventListener("click",(event)=>{
  //     x = event.clientX;
  //     y = event.clientY;
  //     console.log(x,y);
  // });
  platn.addEventListener("click",getClickPosition,false);

})

function getClickPosition(e){
  let xPos = e.clientX;
  let yPos = e.clientY;
  let b: IPoint;
  let tp:ITransformParameters;
  b = new Point(xPos,yPos);
  console.log(xPos,yPos);
  
  fetch("http://localhost:3000/drawing/1")
  .then(response => response.json())  
  .then((data) => {
    if(renderer){
      renderer.scale2Fit();
      renderer.renderer();
    } else{
      fileupload=new FileUpload(data);
    }
  }
  );

  // fileupload.resizeFromScreen(b,tp);
  
  // fetch("http://localhost:3000/drawing/1",{
  //   method: `POST`,
  //   body: jSobj,
  // }).then(res => res.json())
  // .then(data =>console.log(data))
  // .catch(err => {
  //   console.log(err);
  // })
  

  // let cir = new Circle();
  
  // cir.points[0].x=xPos;
  // cir.points[0].y=yPos;
}

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

const cc: HTMLElement = document.getElementById("create") as any;

cc.addEventListener("click",()=>{
  let e:HTMLElement = vytvorenObj();
  console.log(e);
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

// const d1:HTMLElement = document.getElementById("d1") as any;
// const d2:HTMLElement = document.getElementById("d2") as any;

// const dragAndMove = () => {

// }