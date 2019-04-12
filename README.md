# Direction Reveal

[Live demo](http://nigelotoole.github.io/direction-reveal/)

## Direction aware content reveals
This plugin detects which direction a user enters/exits a block, allowing you to reveal/hide content based on this direction.
The hidden content can animate in from the direction the user enters and animate out the direction the user leaves, allowing you to create interesting animation effects.



## Installation
```javascript
$ npm install direction-reveal --save-dev
```


## Usage

### Import

The script is an ES6(ES2015) module but a compiled version is included in the build as index.js. You can also copy scripts/direction-reveal.js into your own site if your build process can accommodate ES6 modules, Babel and Browserify are used in the demo site.

```javascript
import DirectionReveal from 'direction-reveal';

// Init with default setup
const directionRevealDemo = DirectionReveal();

// Init with all options at default setting
const directionRevealSwing = DirectionReveal({
  selector: '.direction-reveal',              // Container element selector.
  itemSelector: '.direction-reveal__card',    // Item element selector.
  animationName: 'swing',                     // Animation CSS class.
  enableTouch: true,                          // Adds touch event to show content on first click then follow link on the second click.
  touchThreshold: 250                         // Touch length must be less than this to trigger reveal which prevents the event triggering if user is scrolling.
});
```


### Markup

```html
<div class="direction-reveal">

  <a href="#" class="direction-reveal__card">
    <img src="images/image.jpg" alt="Image" class="img-fluid">

    <div class="direction-reveal__overlay direction-reveal__anim--in">
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

### Styles

Import the styles into your project directly from the node_modules as below or copy the styles into your own project, you will need styles/direction-reveal.scss, styles/_animations.scss and styles/_variables.scss. There is also a compiled CSS file you can use, styles/direction-reveal.css.

```html
@import "node_modules/direction-reveal/styles/direction-reveal.scss";
```

### Touch support
The plugin will detect touch support and reveal the hidden content on first click then follow link on the second click. This can be disabled with the option enableTouch.


### Browser support
Supports all modern browsers(Firefox, Chrome and Edge) released as of January 2018. For older browsers you may need to include polyfills for Nodelist.forEach and Element.classList.


## Demo site
Clone or download from Github.

```javascript
$ npm install
$ gulp serve
```


### License
MIT © Nigel O Toole
