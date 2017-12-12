import { indexToXY } from "../utils/math.js";


export function createDataWorld( image, { width = 468, resolution = 30, dpi = 1 }){

      let _image  = image,
      _coordinate = new Map();


    /**
     * 
     * @param {*} zoom 
     */
    function _getData( zoom){

      let data = [];

      const buffer = document.createElement('canvas');
      buffer.width  = _image.width * zoom;
      buffer.height = _image.height * zoom;

      const context = buffer.getContext('2d');
      context.drawImage(
         _image,
        0, 0,
         _image.width,
         _image.height,
        0, 0,
        buffer.width, buffer.height
      );

      const pixel = context.getImageData(0, 0, buffer.width, buffer.height).data,
            len   = pixel.length;
      let i = 0, j = 0;

      for (; j < len; j += 4, i++) {
        pixel[j+3] == 0 && data.push( i);
      }

      return { 
        data,
        buffer,
        width  : buffer.width,
        height : buffer.height
      };
    }

    /**
     * 
     * @param {*} param0 
     */
    async function analyse({ zoom , resolution, dpi}){

      const { data, width, height, buffer} =  _getData( zoom);

      let   mapW   = Math.ceil( width / resolution),
            mapH   = Math.ceil( height / resolution),
          mapLen   = (mapW * mapH)+1;


      return new Promise( (resolve) => {

        for(;mapLen--;){
          let [_x, _y] = indexToXY( mapLen, mapW);
          let pos = { x : _x * resolution, y : _y * resolution},
             name = `${pos.x} ${pos.y}`;
           _coordinate.set( name, []);
        }

        resolve({ width, height, buffer});

      }).then(({ width, height, buffer})=>{

        let total = 0;

        for( let i = 0; i < data.length; i++){

          let num     = data[i],
              [x, y]  = indexToXY( num, width),
              subData = [], 
              pos     = {},
              name    = '',
              arr;
          
          if ((x % dpi) != 0 || (y % dpi) != 0){
            continue;
          }

          pos.x = Math.floor( x/resolution) * resolution;
          pos.y = Math.floor( y/resolution) * resolution;

          name = `${pos.x} ${pos.y}`;

          x += Math.round( Math.random() * 3);
          y += Math.round( Math.random() * 3);

          if ( _coordinate.has( name)){
            total++;
            _coordinate.get( name).push( { x, y, died : false, color : `#FFF` });
          }
        }

        return {
          width,
          total,
          height,
          buffer,
          coordinate    :  _coordinate,
          
          getCell       : function ( pos){
            let name = `${pos.x} ${pos.y}`;

            if (this.coordinate.has( name)){
              return this.coordinate.get( name);
            }

            return [];
          },

          getCellList: function (posList) {

            let pixelList = posList.map((pos) => {
              return this.getCell( pos);
            });
            return ( posList.length) ? pixelList : [];
          },

          getCoordonate : function* (){
            for (let [name, particules] of this.coordinate){
              if ( particules.length){
                yield* particules;
              }
            }
          }
        }

      });

    }

   

  return analyse({ zoom: (width/_image.width), resolution, dpi});

};
