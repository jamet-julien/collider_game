import Render           from '../factories/render.js';
import {EntityCollider} from '../class/collider.js';
import Event            from '../class/event.js';
import { sendData }     from '../utils/loader.js';
//import sha1 from 'crypto-js/sha1';


export default class Level{

    constructor( { width = 720, height = 480}){

      this.render    = Render({width,height});
      this.dataWorld = {};
      this.entities  = [];
      this.conf      = {};

      this.onReset = ()=>{};

      this.time         = 0;
      this.palier       = 0;
      this.palierPasted = false;

      this.event    = Event;
      this.lifeInit = 0;
      this.life     = 0;
      this.locked   = false;

      this.lastCollide = 0;

      this.entityCollider = new EntityCollider( this.entities);

      this.event.on( 'ball.died', this.onBallDied.bind( this));
      this.event.on( 'destructible.collide', this.onDestructibleCollide.bind( this));
    
    }

    onDestructibleCollide( [por]){

      let collide = Math.round(por * 100);

      if( collide != this.lastCollide){

        this.event.emit('level.collide', [collide]);
        
        if (!this.palierPasted && collide >= this.palier) {
          this.palierPasted = true;
          this.event.emit('level.palierPasted', [collide]);
        }

        if (por == 1){
          this.event.emit('level.allCollide', [collide]);
        }

      }

      this.lastCollide = collide;

    }

    _validScore( _score) {
      return true;
    }
    
    _getToken(_score) {

      let oJson = {
        _s: window.CONF.referrerid || 0,
        _c: _score,
        _k: 'SOSHBB'
      },
        sMessage    = JSON.stringify(oJson),
        sTmpMessage = JSON.stringify(Object.assign(oJson, { _k: 'S0SHBB' }));

      return this._validScore( _score) ?
        sMessage.toString() :
        sTmpMessage.toString();
    }

    send( formData) {

      if (this.locked) {
        return;
      } else {
        this.locked = true;
      }

      let obj = {
        score,
        token: this._getToken(score)
      }

      return sendData( window.CONF.url, Object.assign( formData, obj)).then(objResult => {

        this.locked = false;
        this.event.emit('level.sending', objResult);

      }).catch((objResult) => {

        this.locked = false;
        this.event.emit('level.sending', objResult);

      });
    }

    onBallDied(){
      this.life--;

      if (this.life <= 0) {
        this.event.emit( 'level.died', [this.life]);
      }
    }

    reset(){
      
      this.life         = this.lifeInit;
      this.lastCollide  = 0;
      this.palierPasted = false;

      this.entities.map((entity) => {
        entity.reset();
      });

      this.onReset();

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