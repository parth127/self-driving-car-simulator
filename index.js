//create a canvas element and adjust its size
const canvas = document.getElementById("myCanvas");

canvas.width = 300;

// Create a new stage and point it at our canvas:
const ctx = canvas.getContext("2d");

//Create a new road object
const road = new Road(canvas.width / 2, canvas.width * 0.95);

//create a car object
const car = new Car(road.getLaneCenter(1), 150, 30, 50);
car.draw(ctx);

//animate the car

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.positionY + canvas.height * 0.7);

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate);
}
