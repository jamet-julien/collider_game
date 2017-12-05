

export default class Timer{

    constructor( freq = 1/60){
        this.draw         = ()=>{};
        this.update       = ()=>{};
        this.cumulateTime = 0;
        this.lastTick     = 0;
        this.play         = true;

        this.proxyLaunch = ( time)=>{

          this.cumulateTime += (time - this.lastTick)/1000;

          if( this.cumulateTime > 1){
            this.cumulateTime = 1;
          }

          while( this.cumulateTime > freq){
              this.update( freq);
              this.cumulateTime -= freq;
          }
          
          this.lastTick = time;

          this.draw( this.cumulateTime);
          this.play && this._launch();

        }

    }

    _launch(){
      requestAnimationFrame( this.proxyLaunch);
    }

    start(){
      this._launch();
    }

    stop(){
        this.play = false;
    }
}