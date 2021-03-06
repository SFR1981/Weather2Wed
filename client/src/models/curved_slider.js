document.addEventListener('DOMContentLoaded', ()=> {
const curvedSlider = function(){
  this.data = null;
}

// This model is responsible for tracing out the SVG (scalable vector graphic) date input slider which takes the form of a quadratic curve complete with a selector ring which is used to set the desired date. This way, dates can be entered through a single user action (dragging the selector ring) instead of scrolling through a calendar, simplifying the use of the app.


// Defines the parameters of the quadratic curve along which the selector ring will travel
const quadraticCurve = {
  x: 0,
  y: -50,
  controlPointX: 350,
  controlPointY: -150,
  endPointX: 700,
  endPointY: -50
}
let percentageAlongCurve = 0.50 // Point on the curve where the selector ring sits initially

// Creates HTML elements for the curve and selector ring
const quadraticCurveElement = document.querySelector('#curve')
const ringElement = document.querySelector('#ring')

// Returns the X and Y coordinates at the stated percentage along the curve
const getBezierQuadraticEquationXYCoordsAtPercent = (quadraticCurve, percentageAlongCurve) => {
  let x = Math.pow(1 - percentageAlongCurve, 2) * quadraticCurve.x + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * quadraticCurve.controlPointX + Math.pow(percentageAlongCurve, 2) * quadraticCurve.endPointX
  let y = Math.pow(1 - percentageAlongCurve, 2) * quadraticCurve.y + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * quadraticCurve.controlPointY + Math.pow(percentageAlongCurve, 2) * quadraticCurve.endPointY

  return { x, y }
}

const plotQuadraticCurve = () => {
  //Sets attributes of the SVG path element, where M means 'moveto' and Q denotes a quadratic Bézier equation
  quadraticCurveElement.setAttribute(
    'd',
    `M${quadraticCurve.x},${quadraticCurve.y} Q${quadraticCurve.controlPointX},${quadraticCurve.controlPointY} ${quadraticCurve.endPointX},${quadraticCurve.endPointY}`
  )
}

// Automatically moves the selector ring in response to user input
const updateSelectorRingPositionUponInput = percentageAlongCurve => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(quadraticCurve, percentageAlongCurve)

// Mapping the value of the range input to the dates in one year based on the Julian calendar, using UNIX time

  const seconds = 1514818906 + percentageAlongCurve * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   if (date == 3) {
    var formattedDate = `${date}rd of ${month}`
} else if (date == 2) {
    var formattedDate = `${date}nd of ${month}`
}
else if (date == 1) {
    var formattedDate = `${date}st of ${month}`
}
else if (date == 21) {
    var formattedDate = `${date}st of ${month}`
}
else if (date == 31) {
    var formattedDate = `${date}st of ${month}`
}
else if (date == 22) {
    var formattedDate = `${date}nd of ${month}`
}
else if (date == 23) {
    var formattedDate = `${date}rd of ${month}`
}
  else {
    var formattedDate = `${date}th of ${month}`
}
   // const formattedDate = `${date} ${month}`;

  // Prints out the date currently selected (but not necessarily submitted) below the curved date slider input, providing feedback to the user
  document.querySelector('#value').textContent = formattedDate;


  document.querySelector('#value').style.webkitAnimationPlayState = "paused";
  document.querySelector('#value').style.animationPlayState = "paused";

  ringElement.setAttribute('cx', position.x)
  ringElement.setAttribute('cy', position.y)
}


// Defines the default (i.e. starting) position of the selector ring and displays an explanatory prompt to the user telling them how to set the date
const initialSelectorRingPosition = percentageAlongCurve => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(quadraticCurve, percentageAlongCurve) //Finds the coordinates of the ring's starting position

  document.querySelector('#value').textContent = "Slide to check your wedding date";

  ringElement.setAttribute('cx', position.x) //Sets selector ring X position
  ringElement.setAttribute('cy', position.y) //Sets selector ring Y position
}

// Updates the position of the selector ring in response to the user clicking and dragging it
const moveSelectorRing = e => {
  percentageAlongCurve = e.target.value / 31536000
  updateSelectorRingPositionUponInput(percentageAlongCurve)
}

// Adds an event listener which updates the ring selector's position whenever the input value of the date range changes (i.e. when the user slides between different dates)
const rangeElement = document.querySelector('#range')
rangeElement.value = percentageAlongCurve * 100
rangeElement.addEventListener('input', moveSelectorRing)


// Initializes the curve and selector ring, the latter being updated constantly in response to user input
plotQuadraticCurve()
initialSelectorRingPosition(percentageAlongCurve)

})
