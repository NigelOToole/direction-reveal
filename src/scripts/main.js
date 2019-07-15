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


// Add a listener to an item to monitor direction changes 

// document.querySelector('.direction-reveal--demo-swing .direction-reveal__card:first-child').addEventListener('directionChange', (event) => { 
//   console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
// });

// let eventTargets = document.querySelectorAll('.direction-reveal--demo-swing .direction-reveal__card');
// eventTargets.forEach((item) => {
//   item.addEventListener('directionChange', (event) => { 
//     console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
//     console.log(item);
//   });
// });
