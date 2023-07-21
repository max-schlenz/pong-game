<template>
	<p>Ball Position: X: {{ ballX }}, Y: {{ ballY }}</p>
	<p>Paddle Position: X: {{ paddleX }}, Y: {{ paddleY }}</p>
	<p>Paddle Dimensions: Width: {{ paddleWidth }}, Height: {{ paddleHeight }}</p>
	<p>Ball Direction: {{ dir }}</p>
  <GameBall :posX="ballX" :posY="ballY" :width="ballWidth" :height="ballHeight" :dir="0" />
  <GamePaddle ref="paddle" :posX="paddleX" :posY="paddleY" :height="paddleHeight" :width="paddleWidth" />
</template>

<script>
import GamePaddle from './components/GamePaddle.vue'
import GameBall from './components/GameBall.vue'

export default {
  name: 'App',
  components: {
	GameBall, 
	GamePaddle
  },
  mounted() {
	this.update();
  },
  data() {
	return {
		ballX: 500,
		ballY: 200,
		ballWidth: 15,
		ballHeight: 15,
		paddleX: 10,
		paddleY: 100,
		paddleWidth: 20,
		paddleHeight: 140,
		isMovingUp: false,
		isMovingDown: false,
		dir: false,
		isPaused: false,
		ballDX: 2,
		ballDY: 2
	}
  },
  methods: {
	resetGame() {
		this.ballX = 500,
		this.ballY = 200;
		this.paddleX = 10;
		this.paddleY = 100;
		this.isMovingUp = false;
		this.isMovingDown = false;
		this.dir = false;
		this.isPaused = false;
	},

	update() {
		if (this.isPaused)
		{
			requestAnimationFrame(this.update);
			return ;
		}
		if (this.isMovingUp)
		{
			if (this.paddleY > 5)
				this.paddleY -= 5;
			else
				this.paddleY = 0;
		}
		else if (this.isMovingDown)
		{
			if (this.paddleY >= (window.innerHeight - this.paddleHeight - 1))
				this.paddleY = window.innerHeight - this.paddleHeight;
			else
				this.paddleY += 5;
		}
		this.moveBall();
		this.checkGameOver();
		requestAnimationFrame(this.update);
	},

	checkGameOver() {
		// if ((this.ballX + this.ballWidth < this.paddleX + this.paddleWidth) &&
		// 	(this.ballY + this.ballHeight < this.paddleY + this.paddleHeight) ||
		// 	(this.ballY > this.paddleY))
		// ;
		if (this.ballX < 10)
			this.resetGame();
	},

	calcDir() {
		// let hitPosition = ((this.ballY - this.paddleY) / this.paddleHeight) * 2 - 1;

		// // maximum bounce angle can be 75 degrees (for more challenge, can be reduced)
		// let maxBounceAngle = 75 * Math.PI / 180; // convert to radians
		
		// // calculate bounce angle (this will be between -maxBounceAngle and maxBounceAngle)
		// let bounceAngle = hitPosition * maxBounceAngle;

		// // calculate new ball direction based on bounce angle
		// // Assuming ball speed remains constant, only direction changes
		// this.ballDX = this.ballSpeed * Math.cos(bounceAngle);
		// this.ballDY = this.ballSpeed * Math.sin(bounceAngle);
		// console.log(this.ballDX);
		// console.log(this.ballDY);
		return true;
	},

	checkCol() {
		// if (this.ballX < this.paddleX + this.paddleWidth &&
		// 	this.ballX + this.ballWidth > this.paddleX &&
		// 	this.ballY < this.paddleY + this.paddleHeight &&
		// 	this.ballY + this.ballHeight > this.paddleY)
		// 		return this.calcDir();
			return false;
	},

	checkDir() {
		if (this.checkCol())
			this.dir = !this.dir;
		else if (this.ballX > window.innerWidth / 2)
			this.dir = false;
	},

	moveBall() {
		// Update position based on velocities
		this.ballX += this.ballDX;
		this.ballY += this.ballDY;

		// Check for collision with boundaries and reverse direction if necessary
		if (this.ballX < 0 || this.ballX + this.ballWidth > window.innerWidth)
			this.ballDX = -this.ballDX;
	
		if (this.ballY < 0 || this.ballY + this.ballHeight > window.innerHeight)
			this.ballDY = -this.ballDY;

		// Check for collision with paddle and reverse direction if necessary
		// Assuming you have variables paddleX, paddleY, paddleWidth, paddleHeight defined
		if ((this.ballX + this.ballWidth >= this.paddleX) &&
			(this.ballX <= this.paddleX + this.paddleWidth) &&
			(this.ballY + this.ballHeight >= this.paddleY) &&
			(this.ballY <= this.paddleY + this.paddleHeight))
				this.ballDX = -this.ballDX;
		

	},

	movePaddle(e) {
		switch(e.key) {
			case 'p':
				this.isPaused = !this.isPaused;
				break;
			case 'ArrowUp':
				this.isMovingUp = true;
				break;
			case 'ArrowDown':
				this.isMovingDown = true;
				break;

			case 'w':
				this.ballY -= 10;
				break ;
			case 's':
				this.ballY += 10;
				break ;
			case 'a':
				this.ballX -= 10;
				break ;
			case 'd':
				this.ballX += 10;
				break ;
		}
	},

	stopmovePaddle(e) {
		switch(e.key) {
			case 'ArrowUp':
				this.isMovingUp = false;
				break;
			case 'ArrowDown':
				this.isMovingDown = false;
				break;
		}
	}
  },
  created() {
	window.addEventListener('keydown', this.movePaddle);
	window.addEventListener('keyup', this.stopmovePaddle);
	this.update();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
