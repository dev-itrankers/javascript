var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.height =height;
canvas.width = width;

var ctx = canvas.getContext("2d");
var colors = ["#34738f","#122f3d","#be3e2b","#ed8a45","#f6de6c"];
function circle(x,y,radius,dx,dy,color){
    this.dx=dx;this.dy=1;
    this.x =x;this.y = y;
    this.r = radius;
    this.dir = 1;
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
        if(nextx >= canvas.width || prevx<= 0){
            this.dx=-this.dx;
        }
        
        // if(nexty>= canvas.height){
        //     this.draw();
        //     return;    
        // };
        // if(this.bool) return;
        if(this.y+this.dy+radius>canvas.height){
            this.dy=-this.dy;
            this.dir=-1;
            var height = canvas.height-y;
            height = height+(height*0.10);
            y = height;
        }
        else if(this.dy==0){
            this.dy=1;
            this.dir=1;   
        }
        if(this.dy==0){
            // if((this.x)<(canvas.width/2)){
                // this.x-=Math.abs(this.dx);
            // }
            // else{
            if(this.x+this.r+this.dx>650-radius){
                this.x+=Math.abs(this.dx);
            }
            else if(this.x-this.r-Math.abs(this.dx)<0+radius){
                this.x-=Math.abs(this.dx);
            }
            else{
                this.x+=this.dx;
            }
        }else{
            this.x+=this.dx;
        }
        this.dy = this.dy+(this.dy*0.10*this.dir);
        this.dy = Math.ceil(this.dy)
        this.y+=this.dy;
        this.y = Math.ceil(this.y);
        this.draw();
    }
}
var circles=[];
var i=0;
var xArr = [30,width-40];
document.body.addEventListener("click",function(){
    circles=[];
    i=0;
    init();
})
function init(){
    if(++i<400) requestAnimationFrame(init);
    var radius = parseInt((Math.random()*10)+10);
    // var x = parseInt(Math.random() * (width-(radius*2)))+radius;
    // var y = parseInt(Math.random() * (height-200-(radius*2)))+radius;
    var x = xArr[parseInt(Math.random()*2)];
    var y = height*0.35;
    var dx = ((Math.random())*30)+10;
    var dy = (Math.random()-0.5)*5;
    var color = parseInt(Math.random()*colors.length);
    var cir = new circle(x,y,radius,dx,dy,colors[color]);
    circles.push(cir);
    
}
// init();
animate();
function animate(){
    ctx.clearRect(0,0,width,height);
    circles.forEach(cir =>cir.move());
    requestAnimationFrame(animate);
}