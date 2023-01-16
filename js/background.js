const numPoints = 200;
const fps = 60;
const colors = ["#2998e6", "#743ad5"];
const edgeDist = 100;

function runBackground(){

  var canvas = document.getElementById("bg-anim");
  var crect = canvas.getBoundingClientRect();
  canvas.width = crect.width;
  canvas.height = crect.height;
  var ctx = canvas.getContext("2d");

  function fillCircle (x,y,r) {
    ctx.beginPath();
    ctx.arc (x,y,r,0,2*Math.PI);
    ctx.fill();
  }

  function connectDot(d1, d2, opacity){
    ctx.globalAlpha = opacity;
    var grad= ctx.createLinearGradient(d1.x, d1.y, d2.x, d2.y);
    grad.addColorStop(0, d1.c);
    grad.addColorStop(1, d2.c);
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(d1.x,d1.y);
    ctx.lineTo(d2.x,d2.y);

    ctx.stroke();
  }

  class Dot{

    constructor(x, y, vx, vy, c, o){
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      
      this.c = c;
      this.o = o;
      
      this.r = Math.random() * 2;
      
    }
    
    update(){
      this.x += this.vx;
      this.y += this.vy;
      
      if(this.x < -edgeDist) this.x = canvas.width + edgeDist;
      if(this.x > canvas.width + edgeDist) this.x = -edgeDist;
      if(this.y < -edgeDist) this.y = canvas.height + edgeDist;
      if(this.y > canvas.height + edgeDist) this.y = -edgeDist;
    }
    
    draw(){
      ctx.fillStyle = this.c;
      ctx.globalAlpha = this.o;
      fillCircle(this.x, this.y, this.r);
    }
    
    distance(d2){
      return Math.sqrt((this.x - d2.x)**2 + (this.y - d2.y)**2);
    }

  }

  points = [];
  for(var i = 0; i < numPoints; i++){
    var color = colors[Math.round(Math.random() * (colors.length - 1))];
    points.push(
      new Dot(
        Math.random() * (canvas.width + 2 * edgeDist) - edgeDist,
        Math.random() * (canvas.height + 2 * edgeDist) - edgeDist,
        Math.random()*2-1,
        Math.random()*2-1,
        color,
        Math.random()
      )
    );
  }

  function animate() {
    //ctx.fillStyle = "#1F2123";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(dot => {
      dot.update();
      points.forEach(dot2 => {
        var dist = dot.distance(dot2);
        if(dist < edgeDist){
          o = (1-(dist / edgeDist))**2;
          connectDot(dot, dot2, o);
        }
      });
    });
    points.forEach(dot => {
      dot.draw();
    });

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000 / fps);
  }
  animate();

}

document.addEventListener('DOMContentLoaded', runBackground, false);
