//create a canvas element and adjust its size
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 300;

// Create a new stage and point it at our canvas:
const ctx = canvas.getContext("2d");

//create a car object
const car = new Car(100, 100, 30, 50);
car.draw(ctx);
