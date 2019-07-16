(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.directionReveal = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

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
  var DirectionReveal = function DirectionReveal() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '.direction-reveal' : _ref$selector,
        _ref$itemSelector = _ref.itemSelector,
        itemSelector = _ref$itemSelector === void 0 ? '.direction-reveal__card' : _ref$itemSelector,
        _ref$animationName = _ref.animationName,
        animationName = _ref$animationName === void 0 ? 'swing' : _ref$animationName,
        _ref$animationPostfix = _ref.animationPostfixEnter,
        animationPostfixEnter = _ref$animationPostfix === void 0 ? 'enter' : _ref$animationPostfix,
        _ref$animationPostfix2 = _ref.animationPostfixLeave,
        animationPostfixLeave = _ref$animationPostfix2 === void 0 ? 'leave' : _ref$animationPostfix2,
        _ref$enableTouch = _ref.enableTouch,
        enableTouch = _ref$enableTouch === void 0 ? true : _ref$enableTouch,
        _ref$touchThreshold = _ref.touchThreshold,
        touchThreshold = _ref$touchThreshold === void 0 ? 250 : _ref$touchThreshold;

    var containers = document.querySelectorAll(selector);
    var touchStart; // Utilities - https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d

    var addEventListenerMulti = function addEventListenerMulti(element, events, fn) {
      events.forEach(function (e) {
        return element.addEventListener(e, fn);
      });
    };

    var switchCase = function switchCase(cases) {
      return function (defaultCase) {
        return function (key) {
          return key in cases ? cases[key] : defaultCase;
        };
      };
    };

    var fireEvent = function fireEvent(item, eventName, eventDetail) {
      var event = new CustomEvent(eventName, {
        bubbles: true,
        detail: eventDetail
      });
      item.dispatchEvent(event);
    }; // Get direction data based on element and pointer positions


    var getDirection = function getDirection(e, item) {
      // Width and height of current item
      var w = item.offsetWidth;
      var h = item.offsetHeight;
      var position = getPosition(item); // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.

      var x = (e.pageX - position.x - w / 2) * (w > h ? h / w : 1);
      var y = (e.pageY - position.y - h / 2) * (h > w ? w / h : 1); // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3). - https://stackoverflow.com/a/3647634

      var d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4; // console.table([x, y, w, h, e.pageX, e.pageY, item.offsetLeft, item.offsetTop, position.x, position.y]);

      return d;
    }; // Gets an elements position - https://www.kirupa.com/html5/get_element_position_using_javascript.htm


    var getPosition = function getPosition(el) {
      var xPos = 0;
      var yPos = 0;

      while (el) {
        xPos += el.offsetLeft + el.clientLeft;
        yPos += el.offsetTop + el.clientTop;
        el = el.offsetParent;
      }

      return {
        x: xPos,
        y: yPos
      };
    };

    var translateDirection = switchCase({
      0: 'top',
      1: 'right',
      2: 'bottom',
      3: 'left'
    })('top'); // Updates direction and toggles classes

    var updateDirection = function updateDirection(e, action) {
      var currentItem = e.currentTarget;
      var direction = getDirection(e, currentItem);
      var directionString = translateDirection(direction); // Remove current animation classes and adds current action/direction.

      var currentCssClasses = currentItem.className.split(' ');
      var filteredCssClasses = currentCssClasses.filter(function (cssClass) {
        return !cssClass.startsWith(animationName);
      }).join(' ');
      currentItem.className = filteredCssClasses;
      currentItem.classList.add("".concat(animationName, "--").concat(action, "-").concat(directionString));
      var eventDetail = {
        action: action,
        direction: directionString
      };
      fireEvent(currentItem, 'directionChange', eventDetail);
    };

    var bindEvents = function bindEvents(containerItem) {
      var items = containerItem.querySelectorAll(itemSelector);
      items.forEach(function (item) {
        addEventListenerMulti(item, ['mouseenter', 'focus'], function (e) {
          updateDirection(e, animationPostfixEnter);
        });
        addEventListenerMulti(item, ['mouseleave', 'blur'], function (e) {
          updateDirection(e, animationPostfixLeave);
        });

        if (enableTouch) {
          item.addEventListener('touchstart', function (e) {
            touchStart = +new Date();
          }, {
            passive: true
          });
          item.addEventListener('touchend', function (e) {
            var touchTime = +new Date() - touchStart;

            if (touchTime < touchThreshold && !item.className.includes("".concat(animationName, "--").concat(animationPostfixEnter))) {
              e.preventDefault();
              resetVisible(e, items, updateDirection(e, animationPostfixEnter));
            }
          });
        }
      });
    };

    var resetVisible = function resetVisible(e, items, callback) {
      items.forEach(function (item) {
        var currentCssClasses = item.className;

        if (currentCssClasses.includes("".concat(animationName, "--").concat(animationPostfixEnter)) && item !== e.currentTarget) {
          item.className = currentCssClasses.replace("".concat(animationName, "--").concat(animationPostfixEnter), "".concat(animationName, "--").concat(animationPostfixLeave));
        }
      });
      callback;
    };

    var init = function init() {
      if (containers.length) {
        containers.forEach(function (containerItem) {
          bindEvents(containerItem);
        });
      } else {
        return;
      }
    }; // Self init


    init(); // Reveal API

    return {
      init: init
    };
  };

  var _default = DirectionReveal;
  _exports["default"] = _default;
});