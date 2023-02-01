const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var NodeName = /* @__PURE__ */ ((NodeName2) => {
  NodeName2[NodeName2["path"] = 0] = "path";
  NodeName2[NodeName2["line"] = 1] = "line";
  NodeName2[NodeName2["text"] = 2] = "text";
  NodeName2[NodeName2["tspan"] = 3] = "tspan";
  NodeName2[NodeName2["circle"] = 4] = "circle";
  NodeName2[NodeName2["ellipse"] = 5] = "ellipse";
  NodeName2[NodeName2["rect"] = 6] = "rect";
  NodeName2[NodeName2["g"] = 7] = "g";
  NodeName2[NodeName2["use"] = 8] = "use";
  NodeName2[NodeName2["defs"] = 9] = "defs";
  NodeName2[NodeName2["pattern"] = 10] = "pattern";
  NodeName2[NodeName2["clipPath"] = 11] = "clipPath";
  NodeName2[NodeName2["svg"] = 12] = "svg";
  return NodeName2;
})(NodeName || {});
var TypeConstant = /* @__PURE__ */ ((TypeConstant2) => {
  TypeConstant2[TypeConstant2["line"] = 1] = "line";
  TypeConstant2[TypeConstant2["lines"] = 11] = "lines";
  TypeConstant2[TypeConstant2["shp"] = 2] = "shp";
  TypeConstant2[TypeConstant2["arc"] = 3] = "arc";
  TypeConstant2[TypeConstant2["text"] = 40] = "text";
  TypeConstant2[TypeConstant2["redlinetext"] = 14] = "redlinetext";
  TypeConstant2[TypeConstant2["circle"] = 5] = "circle";
  TypeConstant2[TypeConstant2["ellipse"] = 6] = "ellipse";
  TypeConstant2[TypeConstant2["lineString"] = 7] = "lineString";
  TypeConstant2[TypeConstant2["solidHole"] = 9] = "solidHole";
  TypeConstant2[TypeConstant2["cell"] = 10] = "cell";
  TypeConstant2[TypeConstant2["reference"] = 20] = "reference";
  TypeConstant2[TypeConstant2["link"] = 30] = "link";
  return TypeConstant2;
})(TypeConstant || {});
class Point {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.x = x === void 0 ? 0 : x;
    this.y = y === void 0 ? 0 : y;
  }
  static PointFromObject(o) {
    return new Point(o.x, o.y);
  }
  static PointsFromObjects(oo) {
    const ret = [];
    const h = oo.length;
    for (let i = 0; i < h; i++) {
      ret.push(Point.PointFromObject(oo[i]));
    }
    return ret;
  }
  static dlzka(p1, p2) {
    let ret;
    let a;
    let b;
    a = p2.x - p1.x;
    b = p2.y - p1.y;
    ret = Math.sqrt(a * a + b * b);
    return ret;
  }
  static ExactPoint(b, r = 0) {
    return new Point(parseFloat(b.x.toFixed(r)), parseFloat(b.y.toFixed(r)));
  }
  static Rotate(origin, angle, b) {
    if (angle === 0) {
      return b.Clone();
    }
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const p2 = new Point(b.x - origin.x, b.y - origin.y);
    const x = p2.x * c - p2.y * s;
    const y = p2.x * s + p2.y * c;
    return new Point(origin.x + x, origin.y + y);
  }
  static String2Points(t) {
    const res = t.match(/-?\d+(\.\d+)?/g);
    const length = res.length;
    let i = 0;
    const ret = [];
    while (i < length) {
      const p2 = new Point(
        Number.parseFloat(res[i]),
        Number.parseFloat(res[i + 1])
      );
      ret.push(p2);
      i += 2;
    }
    return ret;
  }
  Clone() {
    return new Point(this.x, this.y);
  }
  SubtractPoint(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }
  AddPoint(point) {
    return new Point(point.x + this.x, point.y + this.y);
  }
  toString() {
    return this.y < 0 ? this.x + "" + this.y : this.x + " " + this.y;
  }
}
const svgNs = "http://www.w3.org/2000/svg";
const standardStyles = ["2 6", "8 3", "14 4", "10 4 4 4", "3 5", "6 3 2 3 2 3", "10 3 3 3"];
const CreateSvgObject = (name, j) => {
  const nod = NodeName[name];
  const e = document.createElementNS(svgNs, nod);
  let key;
  for (key in j) {
    e.setAttribute(key, j[key]);
  }
  return e;
};
const Round = (n, digits) => {
  if (digits === void 0) {
    digits = 2;
  }
  return parseFloat(n.toFixed(digits));
};
const getSize = (svgArea) => {
  return new Point(svgArea.clientWidth, svgArea.clientHeight);
};
const getDefaultTP = (window, range) => {
  let scl = window.width / range.width;
  const r = window.height / range.height;
  const trl = new Point();
  const bb2 = range.origin;
  if (r < scl) {
    scl = r;
    trl.x = Round((window.width - range.width * scl) / 2, 2);
  } else {
    trl.y = Round((window.height - range.height * scl) / 2, 2);
  }
  return { trl, scl, bb: bb2 };
};
const getLineStyle = (n) => {
  let r = "";
  if (n > 0) {
    r = standardStyles[n - 1];
  }
  return r;
};
const styleFromObject = (obj) => {
  const t = [];
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== void 0) {
      if (key === "stroke-dasharray") {
        t.push(key + ":" + getLineStyle(obj[key]));
      } else {
        let value = obj[key];
        t.push(key + ":" + value);
      }
    }
  }
  return t.join(";");
};
const PathFromPoints = (bb2, cutFirst = false) => {
  if (bb2 === void 0 || bb2.length === 0) {
    return "";
  }
  const MiniPath = (a, b) => {
    let d2 = "";
    const m = new Point(Round(a.x - b.x, 1), Round(a.y - b.y, 1));
    if (m.x === 0 && m.y !== 0) {
      d2 += "v" + m.y;
    } else if (m.x !== 0 && m.y === 0) {
      d2 += "h" + m.x;
    } else if (m.x !== 0 && m.y !== 0) {
      d2 += "l" + m.x + " " + m.y;
    }
    return d2;
  };
  const length = bb2.length;
  let d = cutFirst === true ? "" : "M" + bb2[0].toString();
  if (length > 1) {
    for (let i = 1; i < length; i++) {
      d += MiniPath(bb2[i], bb2[i - 1]);
    }
  }
  return d;
};
class PlatnoResize {
  resizeEvents() {
    let ptPlatno;
    let btPosition;
    let move = false;
    this.spendlik.style.display = "";
    const reset = () => {
      this.spendlik.style.backgroundColor = "";
      move = false;
    };
    this.spendlik.addEventListener("pointerdown", () => {
      this.spendlik.style.backgroundColor = "yellow";
      ptPlatno = getSize(this.platno);
      btPosition = new Point(this.spendlik.offsetLeft, this.spendlik.offsetTop);
      move = true;
      this.spendlik.style.cursor = "grab";
    });
    this.body.addEventListener("pointermove", (e) => {
      if (move) {
        const dt = new Point(e.movementX, e.movementY);
        btPosition = btPosition.AddPoint(dt);
        ptPlatno = ptPlatno.AddPoint(dt);
        this.spendlik.setAttribute("style", `left:${btPosition.x}px;top:${btPosition.y}px`);
        this.spendlik.style.cursor = "grabbing";
        this.spendlik.style.backgroundColor = "orange";
        this.platno.setAttribute("style", `width:${ptPlatno.x}px;height:${ptPlatno.y}px;`);
        this.infoSize.innerText = "Rozmery pl\xE1tna: \u0161\xEDrka:" + ptPlatno.x + "; v\xFD\u0161ka:" + ptPlatno.y;
      }
    });
    this.spendlik.addEventListener("pointerup", () => {
      reset();
    });
    this.spendlik.addEventListener("pointerleave", () => {
      reset();
    });
  }
  constructor(platno, spendlik, infoSize) {
    this.infoSize = infoSize;
    this.platno = platno;
    this.spendlik = spendlik;
    this.spendlik.style.cursor = "nwse-resize";
    this.body = document.getElementsByTagName("body")[0];
    this.resizeEvents();
  }
}
class RangeManager {
  static rangeByPoints(b, realPosition) {
    const length = b.length;
    const rg = { origin: new Point(), width: 0, height: 0 };
    if (b.length < 0) {
      throw new Error("Range undefined");
    }
    if (length < 2) {
      rg.origin = b[0];
      rg.width = rg.height = 0;
      return rg;
    }
    const origin = new Point(b[0].x, b[0].y);
    const oB = origin.Clone();
    for (let i = 1; i < length; i++) {
      const n = b[i];
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
    const width = Round(oB.x - origin.x, 4);
    const height = Round(oB.y - origin.y, 4);
    if (realPosition === true) {
      origin.y += height;
    }
    rg.origin = origin;
    rg.width = width;
    rg.height = height;
    return rg;
  }
  static rangeByRanges(bb2) {
    bb2 = bb2.filter((f) => f);
    const b = new Array();
    bb2.forEach((box) => {
      b.push(box.origin);
      b.push(new Point(box.origin.x + box.width, box.origin.y - box.height));
    });
    return this.rangeByPoints(b, true);
  }
}
const transform2Window = (b, trf, r) => {
  if (!r) {
    r = 1;
  }
  const x = Round((b.x - trf.bb.x) * trf.scl + trf.trl.x, r);
  const y = Round((b.y - trf.bb.y) * -trf.scl + trf.trl.y, r);
  return new Point(x, y);
};
const transformArray2Window = (bb2, trf, r) => {
  const ret = [];
  bb2.forEach((b) => {
    ret.push(transform2Window(b, trf, r));
  });
  return ret;
};
class Visual {
}
class Circle extends Visual {
  constructor(src, tp) {
    super();
    this.type = TypeConstant.circle;
    this.range = src.range;
    this.points = transformArray2Window([src.center, new Point(src.center.x + src.r, src.center.y)], tp);
    this.r = Point.dlzka(this.points[0], this.points[1]);
    this.style;
    this.style = src.style ? src.style : void 0;
  }
  create() {
    let e;
    const stl = this.style2String();
    const c = this.points[0];
    e = CreateSvgObject(NodeName.circle, {
      cx: c.x,
      cy: c.y,
      r: this.r
    });
    if (stl) {
      e.setAttribute("style", stl);
    }
    return e;
  }
  style2String() {
    return this.style ? styleFromObject(this.style) : "";
  }
}
class Line extends Visual {
  create() {
    let e;
    const d = PathFromPoints(this.points);
    const stl = this.style2String();
    e = CreateSvgObject(NodeName.path, { d });
    if (stl) {
      e.setAttribute("style", stl);
    }
    return e;
  }
  style2String() {
    return this.style ? styleFromObject(this.style) : "";
  }
  constructor(src, tp) {
    super();
    this.type = TypeConstant.line;
    this.points = transformArray2Window(src.points, tp);
    this.range = src.range;
    this.style;
    this.style = src.style ? src.style : void 0;
  }
}
class SvgRenderer {
  scale2Fit() {
    const rr = this.src.visuals.map((f) => f.range);
    this.rgOfAll = RangeManager.rangeByRanges(rr);
    const platno = getSize(this.platno);
    const window = { origin: new Point(), width: platno.x, height: platno.y };
    this.tp = getDefaultTP(window, this.rgOfAll);
    this.infoSize.innerText = "Rozmery pl\xE1tna: \u0161\xEDrka:" + window.width + "; v\xFD\u0161ka:" + window.height;
  }
  renderer() {
    this.svg.innerHTML = "";
    const visuals = [];
    this.src.visuals.forEach((e) => {
      let v;
      switch (e.type) {
        case TypeConstant.line:
          v = new Line(e, this.tp);
          visuals.push(v);
          break;
        case TypeConstant.circle:
          v = new Circle(e, this.tp);
          visuals.push(v);
          break;
      }
    });
    const g = CreateSvgObject(NodeName.g, {
      id: "grf",
      fill: "none",
      transform: ""
    });
    const addRange = (rg, stl) => {
      const org = transform2Window(rg.origin, this.tp);
      const width = Round(rg.width * this.tp.scl, 0);
      const height = Round(rg.height * this.tp.scl, 0);
      const rect = CreateSvgObject(NodeName.rect, { x: org.x, y: org.y, width, height, style: stl });
      g.appendChild(rect);
    };
    visuals.forEach((v) => {
      g.appendChild(v.create());
      addRange(v.range, "stroke:green;stroke-width:5;opacity:0.7;stroke-dasharray:4");
    });
    addRange(this.rgOfAll, "stroke:orange;stroke-width:8;opacity:0.3;stroke-dasharray:6 3");
    this.svg.appendChild(g);
  }
  constructor(src) {
    this.src = src;
    this.infoSize = document.getElementById("infoSize");
    this.spendlik = document.getElementById("btResize");
    this.platno = document.getElementById("box");
    this.svg = this.platno.querySelector("svg");
    this.scale2Fit();
    this.renderer();
    new PlatnoResize(this.platno, this.spendlik, this.infoSize);
  }
}
const btTest = document.getElementById("btTest");
var renderer;
const ht = document.createElement("div");
const drawPath = (bb2) => {
  const ret = Point.PointsFromObjects(bb2);
  let svg = new String(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"> <g fill="none" width="100%" height="100%"> <path d="`);
  console.log(ret);
  let a = 0, b = 0, c = 0, d = 0;
  for (let i = 1; i < bb2.length; i++) {
    if (i == 1) {
      a = ret[i - 1].x;
      b = ret[i - 1].y;
      c = ret[i].x;
      d = ret[i].y;
    } else {
      a += ret[i - 1].x;
      b += ret[i - 1].y;
      c = ret[i].x;
      d = ret[i].y;
    }
    svg += ` M ${a} ${b} l ${c} ${d} `;
  }
  svg += `" stroke="red" stroke-width="3" width="100%" height="100%" /> </g> </svg>`;
  console.log(svg);
  ht.innerHTML = svg;
  const box = document.getElementById("box");
  box == null ? void 0 : box.append(ht);
};
btTest == null ? void 0 : btTest.addEventListener("click", () => {
  fetch("http://localhost:3000/drawing/1").then((response) => response.json()).then(
    (data) => {
      if (renderer) {
        renderer.scale2Fit();
        renderer.renderer();
      } else {
        renderer = new SvgRenderer(data);
      }
    }
  );
});
const aa = document.getElementById("btBody");
aa.addEventListener("click", () => {
  let a;
  a = new Point(7.222447, 8.45436355);
  let b = Point.ExactPoint(a, 2);
  console.log(b.toString());
});
const bb = document.getElementById("load");
bb.addEventListener("click", () => {
  fetch("http://localhost:3000/drawing/1").then((response) => response.json()).then(
    (data) => {
      const points = data.visuals.find((f) => f.type === 1).points;
      drawPath(points);
    }
  );
});
//# sourceMappingURL=index.f2cecafe.js.map
