//create a canvas element and adjust its size
const canvas = document.getElementById("myCanvas");

canvas.width = 300;

// Create a new stage and point it at our canvas:
const ctx = canvas.getContext("2d");

//Create a new road object
const road = new Road(canvas.width / 2, canvas.width * 0.925);

//create a car object
const car = new Car(road.getLaneCenter(1), 150, 30, 50, "KEYS");
car.draw(ctx);

// create traffice for the road

const traffic = [new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2)];

//animate the car

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.positionY + canvas.height * 0.7);

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  }

  car.draw(ctx, "blue");

  ctx.restore();
  requestAnimationFrame(animate);
}
