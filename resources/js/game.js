import Timer from './gameLib/class/timer.js';
import { createLevel } from './gameLib/factories/factory.js';
import { setupKeyboard } from './gameLib/factories/input.js';

import { colliderView, snapCollider, drawGrid, colliderBarre } from './gameLib/factories/debug.js';


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

    playing   = true;
    end       = false;
    totalTime = 0;
    lastSec   = 0;
    sec       = 0;

    timer.start();
  }
}

async function init(callBack){

  const level = await createLevel(`${CONF.gamePath}dist/${CONF.mode}.json`, { width: layer1.width, height: layer1.height, onReady });

  timer = new Timer( freq);

  if (level.conf.debug){

    level.render.pushOnLayer( 'layer2', drawGrid( level.conf, { width: layer1.width, height: layer1.height }));
    level.render.pushOnLayer( 'layer2', colliderView( level.entities));
    level.render.pushOnLayer( 'layer2', snapCollider( level.entities));
    level.render.pushOnLayer( 'layer2', colliderBarre( level.entities));

  }

  const input = setupKeyboard( level.entities);
  input.listenTo(window);

  timer.onStart = () => {
    level.event.emit('level.start');
  };

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
      playing = false;
      timer.stop();
      level.reset();
      level.event.emit('level.timeout');
    }

    level.update( freq);
  }

  callBack({
    on   : level.event.on,
    send : level.send.bind( level),
    play
  });

  playing = false;
  level.event.emit('level.ready');

  level.event.on( 'level.died',()=>{
    playing = false;
    timer.stop();
    level.reset();
  });

}

window.Game = init;


