
/** 
  Direction aware content reveals.

  @param {Object} Options object.
  @param {string} selector Container element selector.
  @param {string} itemSelector Item element selector.
  @param {string} animationName Animation CSS class.
*/

const DirectionReveal = function({
  selector: selector = '.direction-reveal',
  itemSelector: itemSelector = '.direction-reveal__card',
  animationName: animationName = 'swing'
} = {}) {

  const containers = document.querySelectorAll(selector);
  

  const _getDirection = function (e, item) {
    // Width and height of current item
    let w = item.offsetWidth;
    let h = item.offsetHeight;

    // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
    let x = (e.pageX - item.offsetLeft - (w / 2) * (w > h ? (h / w) : 1));
    let y = (e.pageY - item.offsetTop - (h / 2) * (h > w ? (w / h) : 1));

    // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3).  See https://stackoverflow.com/a/3647634 for a full explanation.
    let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  
    return d;
  };
  
  const _translateDirection = switchcase({
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left'
  })('top');
  

  const _addClass = function (e, state) {
    let currentItem = e.currentTarget;
    let direction = _getDirection(e, currentItem);
    let directionString = _translateDirection(direction);

    // Remove current animation classes and add current one.
    let currentCssClasses = currentItem.className.split(' ');
    let filteredCssClasses = currentCssClasses.filter((cssClass) => (!cssClass.startsWith(animationName))).join(' ');
    currentItem.className = filteredCssClasses;
    currentItem.classList.add(`${animationName}--${state}-${directionString}`);
  };

  
  const _bindEvents = function (containerItem) {
    const items = containerItem.querySelectorAll(itemSelector);
    
    items.forEach((item) => {
                        
      item.addEventListener('mouseenter', function (e) {
        _addClass(e, 'in');
      });
    
      item.addEventListener('mouseleave', function (e) {
        _addClass(e, 'out');
      });

    });
  };


  const init = function () {

    if (containers.length) {
      containers.forEach((containerItem) => {
        _bindEvents(containerItem);
      });
    }
    else {
      return;
    }

  };

  // Init is called by default
  init();


  // Reveal API
  return {
    init
  };
};

export default DirectionReveal;


// Better switch cases - https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d
export const switchcase = cases => defaultCase => key =>
key in cases ? cases[key] : defaultCase;
