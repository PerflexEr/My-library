import $ from "../core";

$.prototype.html = function(content) {
  for (let i = 0; i < this.length; i++) {
    if(content){
      this[i].innerHTML = content
    }else{
      return this[i].innerHTML
    }
  }
  return this
}

$.prototype.eq = function (i) {
  const swap = this[i]
  const objectLength = Object.keys(this).length
  for (let i = 0; i < objectLength; i++) {
    delete(this[i])
  }
  this[0] = swap
  this.length = 1

  return this;
};

$.prototype.index = function () {
  const parent = this[0].parentNode
  const childs = [...parent.children]
  const findMyIndex = (item) => {
    return item === this[0]
  }
  return childs.findIndex(findMyIndex)
};

$.prototype.find = function (selector) {
  let numberOfItems = 0
  let counter = 0
  const copyObject = Object.assign({} , this)
  
  for (let i = 0; i < copyObject.length; i++) {
    const array = copyObject[i].querySelectorAll(selector)
    if(array.length == 0){
      continue
    }
    for (let j = 0; j < array.length; j++) {
      this[counter] = array[j]
      counter++
    }

    numberOfItems += array.length
  }

  this.length = numberOfItems
  const objectLength = Object.keys(this).length;

  for (; numberOfItems < objectLength; numberOfItems++) {
    delete this[numberOfItems];
  }
  return this
};

$.prototype.closest = function(selector) {
  let counter = 0
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].closest(selector)
    if(this[i] !== null){
      counter++
    }else{
      console.error(`No closest item by ${selector}`);
      counter--
      return undefined
    }
  }
  const objectLength = Object.keys(this).length;
  for (; counter < objectLength; counter++) {
    delete this[counter];
  }
  this.length = this.length
  return this
}

$.prototype.siblings = function() {
  let numberOfItems = 0;
  let counter = 0;

  const copyObject = Object.assign({}, this);

  for (let i = 0; i < copyObject.length; i++) {
    const array = copyObject[i].parentNode.children;

    for (let j = 0; j < array.length; j++) {
      if (copyObject[i] == array[j]) {
        continue;
      }
      this[counter] = array[j];
      counter++;
    }

    numberOfItems += array.length - 1;
  }

  this.length = numberOfItems;
  const objectLength = Object.keys(this).length;

  for (; numberOfItems < objectLength; numberOfItems++) {
    delete this[numberOfItems];
  }
  return this;
};