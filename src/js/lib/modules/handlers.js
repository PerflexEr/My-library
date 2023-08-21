import $ from "../core";

$.prototype.on = function(eventName , callBack) {
  if(!eventName || !callBack){
    return this[i]
  }
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName ,  callBack)  
  }
  return this
}

$.prototype.off = function (eventName, callBack) {
  if (!eventName || !callBack) {
    return this[i];
  }
  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, callBack);
  }
  return this;
};

$.prototype.click = function (handler) {
  if(handler){
    for (let i = 0; i < this.length; i++) {
      this[i].addEventListener("click", handler);
    }
  }else{
    this[i].click()
  }
  return this;
};
