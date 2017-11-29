import DirectionReveal from './direction-reveal.js';

// Swing animation(Default)
const directionRevealSwing = DirectionReveal({
  selector: '.direction-reveal--demo-swing'
});

// Slide animation with all options specified
const directionRevealSlide = DirectionReveal({
  selector: '.direction-reveal--demo-slide',
  itemSelector: '.direction-reveal__card',
  animationName: 'slide',
  enableTouch: true
});

// Rotate animation
const directionRevealRotate = DirectionReveal({
  selector: '.direction-reveal--demo-rotate',
  animationName: 'rotate'
});

// Bootstrap demo
const directionRevealBoostrap = DirectionReveal({
  selector: '.direction-reveal--demo-bootstrap'
});
