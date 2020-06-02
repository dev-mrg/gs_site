const canvas = document.getElementById('cc');
const c = canvas.getContext('2d');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

// colors
const colors = [
  'rgba(200,10,10,0.8)',
  'rgba(150,25,25,0.7)',
  // '#FFF6E5',
  'rgba(10,10,200,0.7)'
];

// events
window.addEventListener('mousemove', ({x, y}) => mouse = {x, y});
window.addEventListener('touchmove', ({x, y}) => mouse = {x, y});
window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  canvas.width = windowWidth;
  canvas.height = windowHeight;

  init();
});

window.addEventListener('click', () => {
  init();
});

// utils
const randomRange = (min, max) => {
  return Math.floor( Math.random() * (max - min + 1) + min );
};

const randomColor = () => {
  return colors[ Math.floor(  Math.random() * colors.length ) ];
};

// Circle
class Particle {
  constructor(x, y, radius, color) {
    this._x = x;
    this._y = y;

    this.x = this._x;
    this.y = this._y;

    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;

    this.lastMouse = {x: this.x, y: this.y};
  }

  draw() {
    c.beginPath();
    c.shadowBlur=3;
      c.shadowOffsetX=0;
      c.shadowOffsetY=-6;
      c.shadowColor='white'
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(this.lastPoint.x, this.lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    this.lastPoint = {x: this.x, y: this.y};
    this.distanceFromCenter = {x: randomRange(40, 50), y: randomRange(40, 50)};

    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.5;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.5;

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;

    this.draw();
  }
};

let particles;
const init = () => {
  particles = [];

  for (var i = 0, len = 50; i < len; i++) {
    const radius = (Math.random() * 2) + 1;
    const x = windowWidth / 2;
    const y = windowHeight / 2;
    const color = randomColor();

    particles.push( new Particle(x, y, radius, color) );
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = 'rgba(100, 2, 2, 0.002)';
 c.shadowBlur=5;
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => p.update());
}

init();
animate();