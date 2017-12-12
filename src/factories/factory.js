import { loadJson, loadImage } from "../utils/loader.js";
import { createDataWorld}      from "./worlddata.js";
import { createDestructible}   from "./element/destructible.js";
import { createBall}           from "./element/balls.js";
import { createBarre}           from "./element/barre.js";
import Level                   from "../class/level.js";
import { createSprite}         from "./spritesheet.js";

export function createLevel(pathName, { width, height, onReady}){

  return loadJson( pathName).then( (conf)=>Promise.all([

      conf,
      loadImage( conf.destroyImage),
      loadImage( conf.crashImage)

  ])).then(([conf, destroyImage, crashImage]) => Promise.all([
      conf, 
      destroyImage, 
      createSprite( crashImage),
      createDataWorld(
        destroyImage, {
          width,
          resolution : conf.resolution,
          dpi        : conf.setting.dpi
        }
      )
    ])).then(([conf, destroyImage, getCrash, dataWorld]) => {

    let level           = new Level({ width, height });
    level.time          = conf.time;
    
    let factoryDestruct = createDestructible(conf, dataWorld, getCrash);
    let factoryBall     = createBall( conf, { width, height });

      let factoryBarre = createBarre( conf, { widthScene: width, heightScene: height });

    onReady( level);

  
//destructible
    let destruct = factoryDestruct( level.event);

    level.conf = conf;
    level.entities.push( destruct);

    if (level.conf.debug){
      level.render.pushOnLayer( 'layer2', destruct.drawDebug);
    }else{
      level.render.pushOnLayer( 'layer1', destruct.draw);
    }

    conf.barre.map( (obj) =>{
      let barre = factoryBarre( obj, level.event);
      level.entities.push(barre);
      level.render.pushOnLayer('layer2', barre.draw);
    });



//destroyer
    conf.balls.map( (obj)=>{

      let ball = factoryBall( obj, level.event);

      level.entities.push( ball);
      level.lifeInit++;
      level.render.pushOnLayer( 'layer1', ball.drawPaint);
      level.render.pushOnLayer( 'layer2', ball.draw);
      
    });

    level.life = level.lifeInit;
    
    if( !level.conf.debug) {
      level.render.drawOnce( 'layer1', destruct.drawInit);
    }

    return level;
  });

}

