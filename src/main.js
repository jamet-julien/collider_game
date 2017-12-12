import Timer from './class/timer.js';
import { createLevel } from './factories/factory.js';
import { setupKeyboard } from './factories/input.js';

import { colliderView, snapCollider, drawGrid, colliderBarre } from './factories/debug.js';


const layer1 = document.getElementById('layer1'),
      ctx1   = layer1.getContext('2d'),
      layer2 = document.getElementById('layer2'),
      ctx2   = layer2.getContext('2d');

let level, timer, end, totalTime, playing = true, lastSec = 0, sec = 0, freq = 1 / 60;

function onReady(level){
  
  level.render.addLayer( 'layer1', ctx1);
  level.render.addLayer( 'layer2', ctx2, ( function( width, height){
    return function( context, deltaTime){ context.clearRect( 0, 0, width, height); }
  })(layer1.width,layer1.height));

}


function play() {
  if (!playing) {
    timer.start();
    playing   = true;
    end       = false;
    totalTime = 0;
    lastSec   = 0;
    sec       = 0;
  }
}

async function init(callBack){

  const level = await createLevel('./ressource/conf.json', { width: layer1.width, height: layer1.height, onReady });

  timer = new Timer(freq);

  if (level.conf.debug){

    level.render.pushOnLayer( 'layer2', drawGrid( level.conf, { width: layer1.width, height: layer1.height }));
    level.render.pushOnLayer( 'layer2', colliderView( level.entities));
    level.render.pushOnLayer( 'layer2', snapCollider( level.entities));
    level.render.pushOnLayer( 'layer2', colliderBarre( level.entities));

  }



  const input = setupKeyboard( level.entities);
  input.listenTo(window);

  timer.draw = (deltaTime) => {
    level.render.draw( deltaTime);
  }

  timer.update = ( freq) => {

    totalTime += freq;

    sec = Math.round( totalTime);
    if (lastSec != sec) {
      lastSec = sec;
      level.event.emit( 'level.tick', [ level.time, lastSec / level.time]);
    }

    if (totalTime > level.time && !end) {
      //level.destroy();
      totalTime = 0;
      end       = true;
    }

    if (end && totalTime > 1) {
      timer.stop();
      level.event.emit('level.timeout');
      level.reset();
      playing = false;
    }

    level.update( freq);
  }

  callBack({
    on   : level.event.on,
    send : level.send,
    play
  });

  playing = false;
  level.event.emit('level.ready');

}

window.Game = init;

init((o) => {
  o.on( 'level.ready', () => {
    o.play();
  })

  o.on( 'level.died', () => {
   console.log( 'GAME OVER')
  })

  o.on('level.collide', ([por]) => {
    console.log(`${por}%`)
  })

  o.on('level.allCollide', () => {
    console.log('WIN !!')
  })
  
});



