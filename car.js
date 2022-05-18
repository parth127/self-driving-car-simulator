//create a car class
class Car {
  constructor(positionX, positionY, width, height) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
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
