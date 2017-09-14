
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

    let position = getPosition(item);

    // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
    let x = (e.pageX - position.x - (w / 2) * (w > h ? (h / w) : 1));
    let y = (e.pageY - position.y - (h / 2) * (h > w ? (w / h) : 1));
    
    // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3).  See https://stackoverflow.com/a/3647634 for a full explanation.
    let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    console.table([x, y, w, h, e.pageX, e.pageY, item.offsetLeft, item.offsetTop, position.x, position.y]);
  
    return d;
  };

  // https://www.kirupa.com/html5/get_element_position_using_javascript.htm
  function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft + el.clientLeft);
        yPos += (el.offsetTop + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft + el.clientLeft);
        yPos += (el.offsetTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
    
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
