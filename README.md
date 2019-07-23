# Direction Reveal
### A plugin that detects the direction a user enters or leaves an element allowing you to reveal or hide content based on this direction.

### [View demo](http://nigelotoole.github.io/direction-reveal/)



## Installation
```javascript
$ npm install direction-reveal --save-dev
```


## Usage

### Import JS

The script is an ES6(ES2015) module but the compiled version is included in the build as "src/scripts/direction-reveal-umd.js". You can also copy "src/scripts/direction-reveal.js" into your own site if your build process can accommodate ES6 modules.

```javascript
import DirectionReveal from 'direction-reveal';

// Init with default setup
const directionRevealDemo = DirectionReveal();

// Init with all options at default setting
const directionRevealDefault = DirectionReveal({
  selector: '.direction-reveal',
  itemSelector: '.direction-reveal__card',
  animationName: 'swing',
  animationPostfixEnter: 'enter',
  animationPostfixLeave: 'leave',
  enableTouch: true,
  touchThreshold: 250
});
```

### Options
| Property                | Default                     | Type       | Description                                                                                       |
| ----------------------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `selector`              | '.direction-reveal'         | String     | Container element selector.                                                                       |
| `itemSelector`          | '.direction-reveal\_\_card' | String     | Item element selector.                                                                            |
| `animationName`         | 'swing'                     | String     | Animation class.                                                                                  |
| `animationPostfixEnter` | 'enter'                     | String     | Animation CSS class postfix for enter event.                                                      |
| `animationPostfixLeave` | 'leave'                     | String     | Animation CSS class postfix for leave event.                                                      |
| `enableTouch`           | true                        | Boolean    | Adds touch event to show content on first click then follow link on the second click.             |
| `touchThreshold`        | 250                         | Number(ms) | The touch length in ms to trigger the reveal, this is to prevent triggering if user is scrolling. |


### Import SASS

```scss
@import "node_modules/direction-reveal/src/styles/direction-reveal.scss";
```


### Markup

```html
<div class="direction-reveal">

  <a href="#" class="direction-reveal__card">
    <img src="images/image.jpg" alt="Image" class="img-fluid">

    <div class="direction-reveal__overlay direction-reveal__anim--enter">
      <h3 class="direction-reveal__title">Title</h3>
      <p class="direction-reveal__text">Description text.</p>
    </div>
  </a>

  ...
</div>
```


### Using other tags
The demos use &lt;a&gt; tags for the "direction-reveal__card" but a &lt;div&gt; can be used as below, specifying the tabindex ensures keyboard navigation works as expected. They can all have a value of 0 and will follow the source order of the divs.

```html
<div class="direction-reveal__card" tabindex="0">
  ...
</div>
```

### Inverted animations

Most of the animations above can be inverted so the overlay is visible by default and animates out on hover. Change the class 'direction-reveal__anim--enter' to 'direction-reveal__anim--leave' for this effect.

You can also add the class 'direction-reveal__anim--enter' or 'direction-reveal__anim--leave' to the image to animate it at the same time as overlay. This effect can be seen in the Slide & Push demo.

## Events

A 'directionChange' event is broadcast once a user enters/leaves an item with information about the action(enter,leave) and direction(top, right, bottom, left).

```javascript
document.querySelector('#test').addEventListener('directionChange', (event) => { 
  console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
});
```

## Compatibility

### Touch support
The plugin will detect touch support and reveal the hidden content on first click then follow link on the second click. This can be disabled with the option enableTouch.


### Browser support
Supports all modern browsers(Firefox, Chrome and Edge) released as of January 2018. For older browsers you may need to include polyfills for [Nodelist.forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach), [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and [Passive Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).



## Demo site
Clone or download from Github.

```javascript
$ npm install
$ gulp serve
```

### Credits

Inspired by a Codepen by [Noel Delgado](https://codepen.io/noeldelgado/pen/pGwFx), this [Stack overflow answer](https://stackoverflow.com/a/3647634), the article [Get an Element's position using javascript](https://www.kirupa.com/html5/get_element_position_using_javascript.htm) and [Images from Unsplash.](https://unsplash.com).


### License
MIT © Nigel O Toole
