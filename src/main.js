import Timer from './class/timer.js';
import { createLevel } from './factories/factory.js';

import { colliderView, snapCollider, drawGrid } from './factories/debug.js';


const board = document.getElementById('canvas'),
      ctx   = board.getContext('2d');


async function init(){

  const level = await createLevel( './ressource/conf.json', { width: board.width, height: board.height });

  let time = new Timer( 1 / 60);

  if (level.conf.debug){
    level.render.push( drawGrid( level.conf, { width: board.width, height: board.height }));
    level.render.push( colliderView( level.entities));
    level.render.push( snapCollider( level.entities));
  }

  time.draw = (deltaTime) => {
    level.render.draw( ctx, deltaTime);
  }

  time.update = ( freq) => {
    level.update( freq);
  }

  time.start();

}

init();



