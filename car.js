//create a car class
class Car {
  constructor(positionX, positionY, width, height) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;

    this.controls = new Controls();
  }

  update() {
    if (this.controls.left) {
      this.positionX -= 2;
    }
    if (this.controls.right) {
      this.positionX += 2;
    }
    if (this.controls.forward) {
      this.positionY -= 2;
    }
    if (this.controls.reverse) {
      this.positionY += 2;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.positionX - this.width / 2,
      this.positionY - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
