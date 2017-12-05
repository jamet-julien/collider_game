import Render           from '../factories/render.js';
import {EntityCollider} from '../class/collider.js';


export default class Level{

    constructor( { width = 720, height = 480}){

      this.render         = Render({width,height});
      this.dataWorld      = {};
      this.entities       = [];
      this.conf           = {};

      this.entityCollider = new EntityCollider( this.entities);
    }

    update( freq){

      this.entities.map( (entity) =>{
        entity.update( freq);
      });

      this.entities.map((entity) => {
        this.entityCollider.check( entity);
      });

      this.entities.map((entity) => {
        entity.finalize();
      });

    }

}