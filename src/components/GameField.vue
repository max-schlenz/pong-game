<template>
	<div class="field" ref="gameField">
		<p>Ball Position: X: {{ ballX }} Y: {{ ballY }}</p>
		<p>Ball Dimensions: Width: {{ ballWidth }}, Height: {{ ballHeight }}</p>
		<p>Ball Direction: DX: {{ ballDX }}, DY: {{ ballDY }}</p>
		<p>Paddle Position: X: {{ paddleX }}, Y: {{ paddleY }}</p>
		<p>Paddle Dimensions: Width: {{ paddleWidth }}, Height: {{ paddleHeight }}</p>
		<p>Paddle Movement: isMovingUp: {{ isMovingUp }}, isMovingDown: {{ isMovingDown }}</p>
		<p>Game Status: isPaused: {{ isPaused }}</p>
		<p>Mouse Position: X: {{ mouseX }}, Y: {{ mouseY }}</p>
		<p>Hit Count: {{ hitCount }} Ball Speed : {{ ballSpeed }} </p>
		<GameBall :posX="ballX" :posY="ballY" :width="ballWidth" :height="ballHeight" />
		<GamePaddle ref="paddle" :posX="paddleX" :posY="paddleY" :height="paddleHeight" :width="paddleWidth" />
	</div>
</template>

<script>
import GamePaddle from './GamePaddle.vue'
import GameBall from './GameBall.vue'

export default {
  name: 'App',
  components: {
	GameBall, 
	GamePaddle
  },
  mounted() {
	this.fieldWidth = this.$refs.gameField.clientWidth;
	this.fieldHeight = this.$refs.gameField.clientHeight;
	this.update();
  },
  data() {
	return {
		hitCount: 5,
		ballSpeed: 10,
		ballX: 500,
		ballY: 200,
		ballWidth: 15,
		ballHeight: 15,
		paddleSpeed: 7,
		paddleX: 5,
		paddleY: 100,
		paddleWidth: 15,
		paddleHeight: 120,
		isMovingUp: false,
		isMovingDown: false,
		isPaused: false,
		ballDX: 3,
		ballDY: 0,
		mouseX: null,
		mouseY: null,
		fieldWidth: null,
		fieldHeight: null
	}
  },
  methods: {
	resetGame() {
		this.hitCount = 0;
		this.ballSpeed = 1;
		this.ballX = 500,
		this.ballY = 200;
		this.paddleX = 5;
		this.paddleY = 100;
		this.isMovingUp = false;
		this.isMovingDown = false;
	},

	update() {
		if (this.isPaused)
		{
			requestAnimationFrame(this.update);
			return ;
		}
		this.movePaddle()
		this.moveBall();
		// this.checkGameOver();
		requestAnimationFrame(this.update);
	},

	movePaddle() {
		if (this.isMovingUp)
		{
			if (this.paddleY > this.paddleSpeed)
				this.paddleY -= this.paddleSpeed;
			else
				this.paddleY = 0;
		}
		else if (this.isMovingDown)
		{
			if (this.paddleY >= (this.fieldHeight - this.paddleHeight - 1))
				this.paddleY = this.fieldHeight - this.paddleHeight;
			else
				this.paddleY += this.paddleSpeed;
		}
	},

	updateMousePosition(event) {
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;
	},

	// checkGameOver() {
	// 	// if ((this.ballX + this.ballWidth < this.paddleX + this.paddleWidth) &&
	// 	// 	(this.ballY + this.ballHeight < this.paddleY + this.paddleHeight) ||
	// 	// 	(this.ballY > this.paddleY))
	// 	// ;
	// 	// console.log(window.innerWidth);
	// 	if (this.ballX < 10)// || this.ballX > window.innerWidth - 20)
	// 		this.resetGame();
	// },

	moveBallDir() {
		let paddleMid = this.paddleY + (this.paddleHeight / 2);
		let ballMid = this.ballY + (this.ballHeight / 2);
		let paddleHitLocation = (ballMid - paddleMid) / (this.paddleHeight / 2);
		let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;
		this.ballSpeed = Math.sqrt(this.ballDX * this.ballDX + this.ballDY * this.ballDY) + this.hitCount;

		this.ballDX = -this.ballSpeed * Math.cos(bounceAngle);
		this.ballDY = this.ballSpeed * Math.sin(bounceAngle);
		this.ballDX = -this.ballDX;
		
		this.ballX = this.paddleX + this.paddleWidth; //fix ball sometimes glitching into paddle
		this.hitCount++;
	},

	moveBall() {
		// Before updating ballX and ballY, predict the next position
		let nextBallX = this.ballX + this.ballDX;
		let nextBallY = this.ballY + this.ballDY;

		if (nextBallX < 0) // || nextBallY + this.ballHeight > this.fieldHeight) {
			this.resetGame();

		else if (nextBallX + this.ballWidth > this.fieldWidth)
			this.ballDX = -this.ballDX;

		else if (nextBallY + this.ballHeight > this.fieldHeight)
			this.ballDY = -this.ballDY;

		else if ((nextBallX + this.ballWidth >= this.paddleX) &&
			(nextBallX < this.paddleX + this.paddleWidth) &&
			(nextBallY + this.ballHeight >= this.paddleY) &&
			(nextBallY < this.paddleY + this.paddleHeight)) {
				this.moveBallDir();
		}
		else {
			this.ballX = nextBallX;
			this.ballY = nextBallY;
		}
	},

	keyHookDown(e) {
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
		}
	},
	
	keyHookUp(e) {
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
	window.addEventListener('keydown', this.keyHookDown);
	window.addEventListener('keyup', this.keyHookUp);
	window.addEventListener('mousemove', this.updateMousePosition);
  }
}
</script>

<style scoped>
.field {
    width: 800px;
    height: 600px;
    position: relative;
    background-color: transparent;
    border-radius: 0%;
    box-sizing: border-box;
    border: 10px solid #979797;
    box-shadow: 
        inset -2px -2px 5px #cdcdcd,
        inset 2px 2px 5px #cdcdcd;
}

</style>

