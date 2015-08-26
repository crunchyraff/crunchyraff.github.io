var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var col1 = '#660033';     //border
var col2 = '#754a7f';     //clock face
var col3 = '#a60027';     //hand
var col4 = '#ffd97b';     //warning
var col5 = '#e55029';
var secs = 0;
var mark = 0;
var timer = 0;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);
window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("click", checkKeyPressed, false);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  if(timer >= 85)
    ctx.fillStyle = col4;
  else
    ctx.fillStyle = col2;
  ctx.fill();
  ctx.strokeStyle = col1;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
  ctx.fillStyle = col3;
  ctx.fill();

}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 19; num++){
    ang = num * Math.PI / 9;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
//    ctx.fillText(num.toString(), 0, 0);
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.02, 0, 2*Math.PI);
    ctx.fillStyle = col5;
    ctx.fill();
//    ctx.fillText('.', 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);

  }
}

function drawTime(ctx, radius){
    var second = 0;
    // second
    timer = (timer + 1) % 90;
    secs = (secs + 1) % 90;
    // second=(second*Math.PI/45);
    second=(secs*Math.PI/45);
    drawHand(ctx, second, radius*0.72, radius*0.06);
    var markCalc = 0;
    markCalc=(mark*Math.PI/45);
    drawMark(ctx, markCalc)
}

function drawHand(ctx, pos, length, width) {
    ctx.strokeStyle = col3;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawMark(ctx, pos) {
    ctx.strokeStyle = col5;
    ctx.beginPath();
    ctx.lineWidth = radius*0.03;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -radius*0.7);
    ctx.stroke();
    ctx.rotate(-pos);
}

function checkKeyPressed(e) {
    mark = secs;
    timer = 0;
}
