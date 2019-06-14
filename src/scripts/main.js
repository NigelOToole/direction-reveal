import DirectionReveal from './direction-reveal.js';

// Swing animation (Default)
const directionRevealSwing = DirectionReveal({
  selector: '.direction-reveal--demo-swing'
});

// Slide animation with all options specified
const directionRevealSlide = DirectionReveal({
  selector: '.direction-reveal--demo-slide',
  itemSelector: '.direction-reveal__card',
  animationName: 'slide',
  enableTouch: true,
  touchThreshold: 250
});


// Slide & push
const directionRevealSlidePush = DirectionReveal({
  selector: '.direction-reveal--demo-slide-push',
  animationName: 'slide'
});

// Roll out
const directionRevealRollOut = DirectionReveal({
  selector: '.direction-reveal--demo-roll-out',
  animationName: 'roll-out'
});

// Rotate
const directionRevealRotate = DirectionReveal({
  selector: '.direction-reveal--demo-rotate',
  animationName: 'rotate'
});

// Flip
const directionRevealFlip = DirectionReveal({
  selector: '.direction-reveal--demo-flip',
  animationName: 'flip'
});

  document.querySelector('#test').addEventListener('directionChange', (event) => { 
    console.log(event.detail.state + ' ' + event.detail.direction);
  });
