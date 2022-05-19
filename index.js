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
const car = new Car(road.getLaneCenter(1), 150, 30, 50, "AI");
car.draw(carCtx);

// create traffic for the road

const traffic = [new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2)];

//animate the car

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -car.positionY + carCanvas.height * 0.7);

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  car.draw(carCtx, "blue");

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate);
}
