

export function loadImage( pathName){

  return new Promise(( resolve)=>{
      const image = new Image();
      image.addEventListener('load', ()=>{
        resolve(image);
      });
      image.src = pathName;
  });

}

function useFetch( obj){

  let url = CONF.url,
    opt = {},
    entete = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

  opt.body = getQueryString(obj);

  return fetch(url, Object.assign(entete, opt))
    .then((result) => result.json());

}


export function sendData( obj) {

 return new Promise((resolve) => {

    const xhr = new XMLHttpRequest();

    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function stateChange() {

      if (this.readyState == 4 && this.status == "200") {
        resolve( JSON.parse( this.responseText));
      }

    };
    
    xhr.open( 'POST', CONF.url, true);
    xhr.send( getQueryString( obj));
    
  });
};

function getQueryString( object) {
  return Object.keys( object).map(function (item) {
    return (typeof object[item] == "string") ? [
      encodeURIComponent(item),
      '=',
      encodeURIComponent(object[item])
    ].join('') : [
      encodeURIComponent(item),
      '=',
      encodeURIComponent(JSON.stringify(object[item]))
    ].join('');
  }).join('&');
}


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