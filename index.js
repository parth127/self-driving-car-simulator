//create a canvas element and adjust its size
const canvas = document.getElementById("myCanvas");

canvas.width = 300;

// Create a new stage and point it at our canvas:
const ctx = canvas.getContext("2d");

//create a car object
const car = new Car(150, 150, 30, 50);
car.draw(ctx);

//animate the car

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  car.draw(ctx);
  requestAnimationFrame(animate);
}
