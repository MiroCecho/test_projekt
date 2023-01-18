import { NodeName } from "./interface";
const svgNs: string = "http://www.w3.org/2000/svg";

   export const CreateSvgObject=(name: NodeName, j: any):HTMLElement=>{
          const nod: string = NodeName[name];
          const e: Element = document.createElementNS(svgNs, nod);
          let key: string;
          // tslint:disable-next-line:forin
          for (key in j) {
            e.setAttribute(key, j[key]);
          }
          return (e as HTMLElement);
    }