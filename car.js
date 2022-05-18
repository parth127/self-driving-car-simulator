//create a car class
class Car {
  constructor(positionX, positionY, width, height) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.5;
    this.maxSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.positionX -= Math.sin(this.angle) * this.speed;
    this.positionY -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.positionX, this.positionY);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}
