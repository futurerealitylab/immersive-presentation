
import { ImprovedNoise } from "../math/improvedNoise.js";
import { CG } from "../core/CG.js";
import { m, renderList } from "../core/renderList.js";
import { viewMatrix } from "./renderListScene.js";
import { airfont } from "../core/airfont.js";

let msg = 'Pixels turn into\nideas in the air', np, P;
{
   let total = 0;
   for (let i = 0 ; i < msg.length ; i++)
      total += airfont.strokeLength(msg.substring(i, i+1));
   np = Math.floor(70 * total);
   P = CG.particlesCreateMesh(np);
}

export let demoKen = time => {
    let mix = (a,b,t) => a + t * (b - a);
    let R = [], x = 0, y = 3;
    let t = .5 + .5 * Math.sin(time / 3);
    CG.random(0);
    for (let i = 0 ; i < msg.length ; i++) {
       let ch = msg.substring(i, i+1);
       let ns = 50 * airfont.strokeLength(ch);
       for (let n = 0 ; n < ns ; n++) {
          let xy = airfont.eval(n / ns, ch);
	  let rx = CG.random(), ry = CG.random(), rz = CG.random();
          R.push([mix(0.5 * x + xy[0], 1 + 6 * rx, t),
	          mix(1.5 * y + xy[1], 2.4 + 1.5 * ry, t),
		  mix(0, 3 * rz - 1.5, t), .03,
		  i/msg.length, CG.random(), 1 - i/msg.length]);
       }
       x++;
       if (ch == '\n') {
          x = 0;
	  y--;
       }
    }
    CG.particlesSetPositions(P, R, CG.matrixMultiply(viewMatrix[0], m.value()));
    m.save();
       m.translate(-.35,1.5,-.5);
       renderList.mMesh(P).size(.1).color([10,10,10]);
    m.restore();

    m.save();
       m.translate(0,1.5 + .5 * Math.sin(3 * time),-1);
       if (Math.floor(time) % 10 < 5)
          renderList.mCube().size(.2).turnY(time).color([0,1,0]);
       else
          renderList.mCylinder().size(.2).turnY(time).color([1,0,0]);
    m.restore();
}
