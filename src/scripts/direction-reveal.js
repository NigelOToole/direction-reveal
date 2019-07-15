/**
  Direction aware content reveals.

  @param {Object} object - Container for all options.
    @param {string} selector - Container element selector.
    @param {string} itemSelector - Item element selector.
    @param {string} animationName - Animation CSS class.
    @param {string} animationPostfixEnter - Animation CSS class postfix for enter event.
    @param {string} animationPostfixLeave - Animation CSS class postfix for leave event.
    @param {boolean} enableTouch  - Adds touch event to show content on first click then follow link on the second click.
    @param {integer} touchThreshold - Touch length must be less than this to trigger reveal which prevents the event triggering if user is scrolling.
*/


const DirectionReveal = function ({
  selector: selector = '.direction-reveal',
  itemSelector: itemSelector = '.direction-reveal__card',
  animationName: animationName = 'swing',
  animationPostfixEnter: animationPostfixEnter = 'enter',
  animationPostfixLeave: animationPostfixLeave = 'leave',
  enableTouch: enableTouch = true,
  touchThreshold: touchThreshold = 250
  } = {}) {

  const containers = document.querySelectorAll(selector);
  let touchStart;


  // Utilities - https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d
  const addEventListenerMulti = function (element, events, fn) {
    events.forEach((e) => element.addEventListener(e, fn));
  };
  
  const switchCase = cases => defaultCase => key => key in cases ? cases[key] : defaultCase;

  const fireEvent = (item, eventName, eventDetail) => {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: eventDetail,
    });

    item.dispatchEvent(event);
  };


  // Get direction data based on element and pointer positions
  const getDirection = function (e, item) {
    // Width and height of current item
    let w = item.offsetWidth;
    let h = item.offsetHeight;
    let position = getPosition(item);

    // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
    let x = (e.pageX - position.x - (w / 2)) * (w > h ? (h / w) : 1);
    let y = (e.pageY - position.y - (h / 2)) * (h > w ? (w / h) : 1);

    // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3). - https://stackoverflow.com/a/3647634
    let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    // console.table([x, y, w, h, e.pageX, e.pageY, item.offsetLeft, item.offsetTop, position.x, position.y]);

    return d;
  };


  // Gets an elements position - https://www.kirupa.com/html5/get_element_position_using_javascript.htm
  const getPosition = function (el) {
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
  };


  const translateDirection = switchCase({
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left'
  })('top');


  // Updates direction and toggles classes
  const updateDirection = function (e, action) {
    let currentItem = e.currentTarget;
    let direction = getDirection(e, currentItem);
    let directionString = translateDirection(direction);

    // Remove current animation classes and adds current action/direction.
    let currentCssClasses = currentItem.className.split(' ');
    let filteredCssClasses = currentCssClasses.filter((cssClass) => (!cssClass.startsWith(animationName))).join(' ');
    currentItem.className = filteredCssClasses;
    currentItem.classList.add(`${animationName}--${action}-${directionString}`);

    let eventDetail = { action: action, direction: directionString };
    fireEvent(currentItem, 'directionChange', eventDetail);
  };


  const bindEvents = function (containerItem) {
    const items = containerItem.querySelectorAll(itemSelector);

    items.forEach((item) => {

      addEventListenerMulti(item, ['mouseenter', 'focus'], (e) => {
        updateDirection(e, animationPostfixEnter);
      });

      addEventListenerMulti(item, ['mouseleave', 'blur'], (e) => {
        updateDirection(e, animationPostfixLeave);
      });


      if (enableTouch) {

        item.addEventListener('touchstart', (e) => {
          touchStart = +new Date;
        }, { passive: true });

        item.addEventListener('touchend', (e) => {
          let touchTime = +new Date - touchStart;

          if (touchTime < touchThreshold && !item.className.includes(`${animationName}--${animationPostfixEnter}`)) {
            e.preventDefault();

            resetVisible(e, items, updateDirection(e, animationPostfixEnter));
          }
        });

      }

    });
  };


  const resetVisible = function (e, items, callback) {

    items.forEach((item) => {
      let currentCssClasses = item.className;

      if(currentCssClasses.includes(`${animationName}--${animationPostfixEnter}`) && item !== e.currentTarget) {
        item.className = currentCssClasses.replace(`${animationName}--${animationPostfixEnter}`, `${animationName}--${animationPostfixLeave}`);
      }
    });

    callback;
  };


  const init = function () {

    if (containers.length) {
      containers.forEach((containerItem) => {
        bindEvents(containerItem);
      });
    }
    else {
      return;
    }

  };


  // Self init
  init();


  // Reveal API
  return {
    init
  };
};

export default DirectionReveal;
