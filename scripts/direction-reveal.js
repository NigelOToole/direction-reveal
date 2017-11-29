
/**
  Direction aware content reveals.

  @param {Object} object - Container for all options.
  @param {string} selector - Container element selector.
  @param {string} itemSelector - Item element selector.
  @param {string} animationName - Animation CSS class.
  @param {bollean} enableTouch  - Adds touch event to show content on first click then follow link on the second click.
  @param {integer} touchThreshold - Touch length must be less than this to trigger reveal which prevents the event triggering if user is scrolling.
*/

const DirectionReveal = function({
  selector: selector = '.direction-reveal',
  itemSelector: itemSelector = '.direction-reveal__card',
  animationName: animationName = 'swing',
  enableTouch: enableTouch = true,
  touchThreshold: touchThreshold = 250
  } = {}) {

  const containers = document.querySelectorAll(selector);
  let touchStart;


  const _getDirection = function (e, item) {
    // Width and height of current item
    let w = item.offsetWidth;
    let h = item.offsetHeight;
    let position = _getPosition(item);

    // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
    let x = (e.pageX - position.x - (w / 2) * (w > h ? (h / w) : 1));
    let y = (e.pageY - position.y - (h / 2) * (h > w ? (w / h) : 1));

    // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3).  See https://stackoverflow.com/a/3647634 for a full explanation.
    let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    // console.table([x, y, w, h, e.pageX, e.pageY, item.offsetLeft, item.offsetTop, position.x, position.y]);

    return d;
  };


  // https://www.kirupa.com/html5/get_element_position_using_javascript.htm
  const _getPosition = function (el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      xPos += (el.offsetLeft + el.clientLeft);
      yPos += (el.offsetTop + el.clientTop);

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

      _addEventListenerMulti(item, ['mouseenter', 'focus'], function(e) {
        _addClass(e, 'in');
      });

      _addEventListenerMulti(item, ['mouseleave', 'blur'], function(e) {
        _addClass(e, 'out');
      });

      if (enableTouch) {

        item.addEventListener('touchstart', function(e) {
          touchStart = +new Date;
        });

        item.addEventListener('touchend', function(e) {
          let touchTime = +new Date - touchStart;

          if (touchTime < touchThreshold && item.getAttribute('data-hover') === null) {
            e.preventDefault();
            item.setAttribute('data-hover', 'true');
            _addClass(e, 'in');
          }
        });

      }

    });
  };

  const _addEventListenerMulti = function (element, events, fn) {
    events.forEach((e) => element.addEventListener(e, fn));
  }


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
