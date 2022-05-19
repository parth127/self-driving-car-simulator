//create a carCanvas element and adjust its size
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 300;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 500;

// Create a new stage and point it at our carCanvas:
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

//Create a new road object
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.925);

//create a car object
//const car = new Car(road.getLaneCenter(1), 150, 30, 50, "AI");
const N = 100;
const cars = generateCars(N);

let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"));
}

// create traffic for the road

const traffic = [
  new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -350, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
];

//animate the car

animate();

//function to save the best car in localStorage
function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

//function to remove the best car from localStorage
function discard() {
  localStorage.removeItem("bestBrain");
}

//function to generate N number of cars to train the model
function generateCars(N) {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 150, 30, 50, "AI"));
  }

  return cars;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  //Code to find the best car
  bestCar = cars.find(
    (c) => c.positionY === Math.min(...cars.map((c) => c.positionY))
  );

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.positionY + carCanvas.height * 0.7);

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate);
}
