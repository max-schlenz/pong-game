<template>
	<p>Ball Position: X: {{ ballX }}, Y: {{ ballY }}</p>
	<p>Paddle Position: X: {{ paddleX }}, Y: {{ paddleY }}</p>
	<GameBall :posX="ballX" :posY="ballY" :width="ballWidth" :height="ballHeight" :dir="0" />
	<GamePaddle ref="paddle" :posX="paddleX" :posY="paddleY" :height="paddleHeight" :width="paddleWidth" />
	<!-- <GamePaddle ref="paddle1" :posX="paddle1X" :posY="paddle1Y" :height="paddle1Height" :width="paddle1Width" /> -->
	<!-- <GamePaddle ref="paddle2" :posX="paddle2X" :posY="paddle2Y" :height="paddle2Height" :width="paddle2Width" /> -->
	<!-- <GamePaddle ref="paddle" :posX="paddleX + 1060" :posY="paddleY" :height="paddleHeight" :width="paddleWidth" /> -->
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
		paddleX: 5,
		paddleY: 100,
		paddleWidth: 20,
		paddleHeight: 120,
		isMovingUp: false,
		isMovingDown: false,
		isPaused: false,
		ballDX: 3,
		ballDY: 2
	}
  },
  methods: {
	resetGame() {
		this.ballX = 500,
		this.ballY = 200;
		this.paddleX = 5;
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
		// console.log(window.innerWidth);
		if (this.ballX < 10)// || this.ballX > window.innerWidth - 20)
			this.resetGame();
	},

	moveBall() {
		this.ballX += this.ballDX;
		this.ballY += this.ballDY;

		if (this.ballX < 0 || this.ballX + this.ballWidth > window.innerWidth)
			this.ballDX = -this.ballDX;
	
		if (this.ballY < 0 || this.ballY + this.ballHeight > window.innerHeight)
			this.ballDY = -this.ballDY;

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
