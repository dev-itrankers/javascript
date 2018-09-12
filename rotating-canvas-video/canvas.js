var canvas = document.querySelector("canvas");
window.ctx = canvas.getContext("2d");
var video = document.querySelector("video");
var width=500,height=500;
navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(function(mediaStream){
  video.srcObject=mediaStream;
  video.play();
});
var angle = 1;
// setInterval(function(){
//   if(angle<360)++angle;
//   else angle=0;
// },100)
function playCanvas(){
  return setInterval(function(){
    if(angle<360)angle+=10;
    else angle=0;
    ctx.drawImage(video,0,0,width,height);
    var imageData = ctx.getImageData(0,0,width,height);
    imageData = clone(imageData);
    ctx.putImageData(imageData,0,0);
    var image = new Image();
    image.src = canvas.toDataURL("image/jpg");
    setTimeout(function(){
      ctx.clearRect(0,0,width,height);
      ctx.save();
      ctx.translate(parseInt(width/2),parseInt(height/2));
      ctx.rotate(angle*Math.PI/180);    
      ctx.drawImage(image,-width/2,-height/2,width,height);
      ctx.restore();
    },0);
  },16)
}
function draw(imageData){
    
}
function red(imageData){
  for(let i=0;i<imageData.data.length;i+=4){
    imageData.data[i+0]=imageData.data[i+0]+100//r
    imageData.data[i+1]=imageData.data[i+1]-100//g
    imageData.data[i+2]=imageData.data[i+2]*0.10//b
    // imageData.data[i+3]//a
  }
  return imageData;
}
function clone(imageData){
  for(let i=0;i<imageData.data.length;i+=4){
    imageData.data[i-200]=imageData.data[i+0]//r
    imageData.data[i]=imageData.data[i+1]//g
    imageData.data[i+250]=imageData.data[i+2]//b
  }
  return imageData;
}
video.addEventListener("canplay",function(e){
  width=500;
  canvas.width = width;
  height = 500;
  canvas.height = height;
  playCanvas();
});
