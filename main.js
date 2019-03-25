let width=800
let r=Math.floor(width/120)-1
let margin=1
let height=(r+margin)*28
let cir=Math.PI*2
let inX=0
let inY=0
let num
let cxt
let beforeTime
let time
let vxMax=8
let vxMin=4
let vyMax=-4
let vyMin=4
let colors=['#f38181','#fce38a','#eaffd0','#95e1d3']
let g=0.5
let balls=[]
//let balls=[{x:0,y:0,vx:10,vy:0,g:4,color:'#005588'}]
window.addEventListener('load',function(){
  let canvas = document.getElementById('canvas')
  canvas.width=width
  canvas.height=height


  if(canvas.getContext){
    cxt=canvas.getContext('2d')
    setInterval(function(){
      renderTime()
      renderBalls()
      removeBalls()
    },40)
  }
})

function renderTime(){
  beforeTime=time
  time=new Date().toString().slice(16,24)
  cxt.clearRect(0,0,width,height)
  for(let i=0;i<time.length;i++){
    if(time[i]===':'){
      num=10
    }else {
      num=time[i]
    }
    inX=15*(r+margin)*i
    renderNum(inX,inY,num)
    if(beforeTime){
      if(time[i]!==beforeTime[i]){
        addBall(inX,inY,num)
      }
    }
  }
}
function renderNum(inX,inY,num){
  for(let i=0;i<digit[num].length;i++){
    for(let j=0;j<digit[num][i].length;j++){
      if(digit[num][i][j]){
        const x=inX+(2*j+1)*(r+margin)
        const y=inY+(2*i+1)*(r+margin)
        cxt.beginPath()
        cxt.fillStyle='#4aa0d5'
        cxt.arc(x,y,r,0,cir)
        cxt.closePath()
        cxt.fill()
      }
    }
  }
}
function renderBalls(){
  for(let i in balls){
    balls[i].x+=balls[i].vx
    balls[i].y+=balls[i].vy
    balls[i].vy+=balls[i].g
    if(balls[i].y>(height-r) && balls[i].vy>0){
      balls[i].vy=-balls[i].vy*0.8
    }
    cxt.beginPath()
    cxt.fillStyle=balls[i].color
    cxt.strokeStyle=balls[i].color
    cxt.arc(balls[i].x,balls[i].y,5,0,cir)
    cxt.closePath()
    if(balls[i].stroke){
      cxt.fill()
    } else{
      cxt.stroke()
    }
  }
}
//
function addBall(inX,inY,num){
  for(let i=0;i<digit[num].length;i++){
    for(let j=0;j<digit[num][i].length;j++){
      if(digit[num][i][j]){
        const x=inX+(2*j+1)*(r+margin)
        const y=inY+(2*i+1)*(r+margin)
        let ball={}
        ball.x=x
        ball.y=y
        ball.vx=Math.pow(-1,Math.floor(Math.random()*2))*Math.floor(Math.random()*(vxMax-vxMin+1)+vxMin)
        ball.vy=Math.floor(Math.random()*(vyMax-vyMin+1)+vxMin)
        ball.g=g
        ball.color=colors[Math.floor(Math.random() * colors.length)]
        ball.stroke=Math.floor(Math.random()*5)
        balls.push(ball)
      }
    }
  }
}
function removeBalls(){
  let cnt = 0
  for (var i = 0; i < balls.length; i++){
    if (balls[i].x + r > 0 && balls[i].x - r < width)
      balls[cnt] = balls[i]
      cnt++
  }
  while (balls.length > cnt) {
    balls.pop();
  }
}
