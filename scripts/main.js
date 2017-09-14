import DirectionReveal from './direction-reveal.js';

// Swing animation(Default)
const directionReveal = DirectionReveal({
  selector: '.direction-reveal--demo-swing'
});

// Swipe animation with all options specified
const directionRevealSlide = DirectionReveal({
  selector: '.direction-reveal--demo-slide',
  itemSelector: '.direction-reveal__card',
  animationName: 'slide'
});

// Bootstrap demo
const directionRevealBoostrap = DirectionReveal({
  selector: '.direction-reveal--demo-bootstrap'
});
