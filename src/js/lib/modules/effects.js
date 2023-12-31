import $ from "../core";

$.prototype.animateOverTime = function(duration, callBack , final) {
  let timeStart
  function _animateOverTime(time) {
    if(!timeStart){
      timeStart = time
    }

    let timeElapsed = time - timeStart
    let complection = Math.min(timeElapsed / duration , 1)

    callBack(complection)

    if(timeElapsed < duration){
      requestAnimationFrame(_animateOverTime)
    }else{
      if(typeof(final) == 'function'){
        final()
      }
    }
  }

  return _animateOverTime
}

$.prototype.fadeIn = function(duration,display = 'block',fin) {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = display

    const _fadeIn = (complection) => {
      this[i].style.opacity = complection
    }

    const ani = this.animateOverTime(duration, _fadeIn , fin )
    requestAnimationFrame(ani)
  }

  return this
}

$.prototype.fadeOut = function (duration, fin) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = (complection) => {
      this[i].style.opacity = 1 - complection
      if(complection == 1){
        this[i].style.display = 'none';
      }
    };

    const ani = this.animateOverTime(duration, _fadeOut, fin);
    requestAnimationFrame(ani);
  }

  return this;
};

$.prototype.fadeToggle = function(duration,display,fin){
  for (let i = 0; i < this.length; i++) {
    if(window.getComputedStyle(this[i]).display === 'none'){
      this.fadeIn(duration, display , fin);
    }else{
      this.fadeOut(duration, fin);
    }
  }
}