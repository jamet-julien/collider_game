import Timer from './class/timer.js';
import { createLevel } from './factories/factory.js';

import { colliderView, snapCollider, drawGrid, colliderBarre } from './factories/debug.js';


const layer1 = document.getElementById('layer1'),
      ctx1   = layer1.getContext('2d'),
      layer2 = document.getElementById('layer2'),
      ctx2   = layer2.getContext('2d');

function onReady(level){
  
  level.render.addLayer( 'layer1', ctx1);
  level.render.addLayer( 'layer2', ctx2, ( function( width, height){
    return function( context, deltaTime){ context.clearRect( 0, 0, width, height); }
  })(layer1.width,layer1.height));

}

async function init(){

  const level = await createLevel('./ressource/conf.json', { width: layer1.width, height: layer1.height, onReady });


  let time = new Timer( 1 / 60);

  if (level.conf.debug){
    level.render.pushOnLayer( 'layer2', drawGrid( level.conf, { width: layer1.width, height: layer1.height }));
    level.render.pushOnLayer( 'layer2', colliderView( level.entities));
    level.render.pushOnLayer( 'layer2', snapCollider( level.entities));
    level.render.pushOnLayer( 'layer2', colliderBarre( level.entities));
  }

  time.draw = (deltaTime) => {
    level.render.draw( deltaTime);
  }

  time.update = ( freq) => {
    level.update( freq);
  }

  time.start();

}

init();



