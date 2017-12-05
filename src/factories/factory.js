import { loadJson, loadImage } from "../utils/loader.js";
import { createDataWorld}      from "./worlddata.js";
import { createDestructible}   from "./element/destructible.js";
import { createBall}           from "./element/balls.js";
import Level                   from "../class/level.js";

export function createLevel(pathName, { width, height}){

  return loadJson( pathName).then( (conf)=>Promise.all([

      conf,
      loadImage( conf.image)

  ])).then(([conf, image]) => Promise.all([
      conf, 
      image, 
      createDataWorld(
        image, {
          zoom      : conf.setting.zoom,
          resolution: conf.resolution,
          dpi       : conf.setting.dpi
        }
      )
  ])).then( ([ conf, image, dataWorld]) => {

    let level           = new Level({ width, height });
    let factoryDestruct = createDestructible( conf, dataWorld);
    let factoryBall     = createBall(conf, { width, height });
  
//destrible
    let destruct   = factoryDestruct();

    level.conf = conf;
    level.entities.push( destruct);
    level.render.push( destruct.draw);

//destroyer
    conf.balls.map( (obj)=>{

      let ball  = factoryBall( obj);

      level.entities.push( ball);
      level.render.push( ball.draw);
      
    })
    
    return level;
  });

}

