var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.height =height;
canvas.width = width;
var collide = {
    x:undefined,
    y:undefined
}
var ctx = canvas.getContext("2d");
var colors = ["#34738f","#122f3d","#be3e2b","#ed8a45","#f6de6c"];
canvas.addEventListener("mousemove",function(e){
    collide.x = e.clientX;
    collide.y = e.clientY;
});
function circle(x,y,radius,dx,dy,color){
    this.dx=dx;this.dy=dy;
    this.x =x;this.y = y;
    this.r = radius;
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI , true);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    this.move = function(){
        var nextx = this.x+radius+this.dx;var prevx = this.x-radius+this.dx;
        var nexty = this.y+radius+this.dy;var prevy = this.y-radius+this.dy;
        if(this.x <= collide.x+100 && this.x>= collide.x-100 && this.y <= collide.y+100 && this.y>= collide.y-100){
            if(this.r<=100)
            this.r+=5;
        }
        else{
            if(this.r>radius)this.r -= 5;
        }
        if(nextx >= canvas.width || prevx<= 0){
            this.dx=-this.dx;
        }
        if(nexty >= canvas.height || prevy<= 0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}
var circles=[];
for(var i=0;i<=300;i++){
    var radius = parseInt((Math.random()*30)+20);
    radius=10;
    var x = parseInt(Math.random() * (width-(radius*2)))+radius;
    var y = parseInt(Math.random() * (height-(radius*2)))+radius;
    var dx = (Math.random()-0.5)*5;
    var dy = (Math.random()-0.5)*5;
    var color = parseInt(Math.random()*colors.length);
    var cir = new circle(x,y,radius,dx,dy,colors[color]);
    circles.push(cir);
}
animate();
function animate(){
    ctx.clearRect(0,0,width,height);
    circles.forEach(cir =>cir.move());
    requestAnimationFrame(animate);
}