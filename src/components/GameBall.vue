<template>
  <div class="ball" 
    :style="{
      top: `${y}px`,
      left: `${x}px`,
      width: `${wid}px`,
      height: `${hgt}px`
    }"
  >
</div>
</template>

<script>

export default {
  props: ['posX', 'posY', 'width', 'height', 'fieldWidth', 'fieldHeight', 'socket'],
  data() {
    return {
      x: 500,
      y: 200,
      wid: 15,
      hgt: 15,
      speed: 5,
      dx: 4,
      dy: 3
    }
  },

//   watch: {
//     x(newX) {
//       this.socket.emit('ballX', newX);
//     },

//     y(newY) {
//       this.socket.emit('ballY', newY);
//     }
//   },
  
methods: {

resetBall() {
  this.x=500;
  this.y=200;
  this.wid=15;
  this.hgt=15;
  this.speed=5;
  this.dx=3;
  this.dy=2;
},

moveBallDir(paddleY, paddleHeight, paddle) {
	let paddleMid = paddleY + (paddleHeight / 2);
	let ballMid = this.y + (this.hgt / 2);
	let paddleHitLocation = (ballMid - paddleMid) / (paddleHeight / 2);
	let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;

	if (paddle == "A")
		   this.dx = -this.speed * Math.cos(bounceAngle);
	else
		this.dx = this.speed * Math.cos(bounceAngle);
	this.dy = this.speed * Math.sin(bounceAngle);
	this.dx = -this.dx;

	this.speed++;
	},

handleBallCollision(paddleX, paddleY, paddleWidth, paddleHeight, paddle) {
	if (paddle == "A"){
		if ((this.nextBallX < paddleX + paddleWidth) &&
			(this.nextBallY + this.hgt >= paddleY) &&
			(this.nextBallY < paddleY + paddleHeight))
			return true;
		return false;
	}
	else {
		if ((this.nextBallX + this.wid >= paddleX) && 
			(this.nextBallY <= paddleY + paddleHeight) &&
			(this.nextBallY + this.hgt >= paddleY))
			return true;
		return false;
	}
},

moveBall(paddleAX, paddleAY, paddleBX, paddleBY, paddleWidth, paddleHeight) {
	this.nextBallX = this.x + this.dx;
	this.nextBallY = this.y + this.dy;
	if ((this.nextBallX < 0) ) // || nextBallY + this.wid > this.fieldWidth)
		return false;
	if (this.nextBallX - 1 <= 0){
		this.dx = -this.dx;
	}
	if (this.nextBallX + this.wid > this.fieldWidth)
		this.dx = -this.dx;
	if (this.nextBallY + this.hgt > this.fieldHeight || this.nextBallY < 0)
		this.dy = -this.dy;
	if (this.handleBallCollision(paddleAX, paddleAY, paddleWidth, paddleHeight, "A")){
		this.moveBallDir(paddleAY, paddleHeight, "A");
		this.x = paddleAX + paddleWidth;
	}
	else if (this.handleBallCollision(paddleBX, paddleBY, paddleWidth, paddleHeight, "B")){
		this.moveBallDir(paddleBY, paddleHeight, "B");
		this.x = paddleBX - paddleWidth;
	}
	else {
		this.x = this.nextBallX;
		this.y = this.nextBallY;
	}
	return true;
}
}
}
</script>

<style scoped>
.ball {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, #5fcfff, #005a9b 50%, #0066ff);
  border-radius: 50%;
  /* box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.856); */
  /* box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.6); */
}
</style>
