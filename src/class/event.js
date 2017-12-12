const Event = () => {

  const eventList = new Map();

  function emit(eventName, ...arg) {
    
    if (eventList.has(eventName)) {
      eventList.get(eventName).map(({ callback, scope }) => {
        let _scope = scope || window;
        callback.apply(_scope, arg);
      })
    }
  }

  function on(eventName, callback, scope = null) {
    if (eventList.has(eventName)) {
      eventList.get(eventName).push({ callback, scope })
    } else {
      eventList.set(eventName, [{ callback, scope }]);
    }
  }


  return {
    eventList,
    on,
    emit
  };

};



export default Event();