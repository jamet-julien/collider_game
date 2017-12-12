

export function loadImage( pathName){

  return new Promise(( resolve)=>{
      const image = new Image();
      image.addEventListener('load', ()=>{
        resolve(image);
      });
      image.src = pathName;
  });

}


export function sendData( obj) {

  let url = window.CONF.url,
    opt = {},
    entete = {
      crossDomain : true,
      method      : 'POST',
      credentials : 'same-origin',
      headers     : {
        'Cache-Control' : 'no-cache',
        'Content-Type'  : 'application/x-www-form-urlencoded'
      }
    };

  opt.body = getQueryString( obj);

  return fetch(url, Object.assign( entete, opt))
        .then((result) => result.json());
};


export function loadJson( pathName){

  return new Promise( (resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.onreadystatechange = function stateChange(){
      if( this.readyState == 4 && this.status == "200"){
        resolve( JSON.parse( this.responseText));
      }
    };
    xhr.open('GET', pathName, true);
    xhr.send();
  });

}