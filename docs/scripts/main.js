import DirectionReveal from './direction-reveal.js';

// Swing (Default)
const directionRevealSwing = DirectionReveal({
  selector: '.direction-reveal--demo-swing'
});


// Rotate (all options)
const directionRevealRotate = DirectionReveal({
  selector: '.direction-reveal--demo-rotate',
  itemSelector: '.direction-reveal__card',
  animationName: 'rotate',
  animationPostfixEnter: 'enter',
  animationPostfixLeave: 'leave',
  enableTouch: true,
  touchThreshold: 250
});


// Flip
const directionRevealFlip = DirectionReveal({
  selector: '.direction-reveal--demo-flip',
  animationName: 'flip'
});


// Slide 
const directionRevealSlide = DirectionReveal({
  selector: '.direction-reveal--demo-slide',
  animationName: 'slide'
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
