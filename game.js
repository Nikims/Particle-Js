updates = 0;
class Particle {
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  acellX = 0;
  acellY = 0;
  beenAliveFor = 0;

  applyForce(forceX, forceY) {
    this.acellX += forceX;
    this.acellY += forceY;
  }
  update() {
    this.beenAliveFor++;
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX += this.acellX;
    this.speedY += this.acellY;
    if (this.y > 500) {
      this.speedY = 0;
      this.speedX = 0;
    }
  }
  drawSelf() {
    context.fillRect(this.x, this.y, 5, 5);
  }
  constructor(source) {
    this.x = source.x;
    this.y = source.y;
    this.applyForce(0, 0.3);
  }
}

class ParticleSystem {
  source;
  particles = [];
  constructor(source) {
    this.source = source;
    for (let i = 0; i < 20 + Math.round(Math.random() * 80); i++) {
      this.particles.push(new Particle(this.source));
      this.particles[i].speedX = Math.random() * 10 - 5;
      this.particles[i].speedY = Math.random() * 10 - 5;
    }
  }
  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();

      if (
        this.particles[i].beenAliveFor >
        100 + Math.round(Math.random() * 20)
      ) {
        this.particles.splice(i, 1);
      }
    }
  }
  drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].drawSelf();
    }
  }
}
particleSystems = [];
function update() {
  for (i = 0; i < particleSystems.length; i++) {
    particleSystems[i].updateParticles();
  }
  updates++;
  if (updates % 10 == 0) {
    particleSystems.push(new ParticleSystem({ x: mouseX, y: mouseY }));
  }
}
function draw() {
  for (i = 0; i < particleSystems.length; i++) {
    particleSystems[i].drawParticles();
  }
}
