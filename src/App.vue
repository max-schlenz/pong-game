<template>
  <img alt="Vue logo" src="./assets/logo.png">
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
		ballX: window.innerWidth,
		ballY: 200,
		ballWidth: 15,
		ballHeight: 15,
		paddleX: 10,
		paddleY: 100,
		paddleWidth: 25,
		paddleHeight: 140,
		isMovingUp: false,
		isMovingDown: false,
		dir: 0
	}
  },
  methods: {
	update() {
		if (this.isMovingUp && this.paddleY > 0)
			this.paddleY -= 10;
		else if (this.isMovingDown)
		{
			if (this.paddleY >= (window.innerHeight / 2 - this.paddleHeight / 2))
				this.paddleY = window.innerHeight / 2 - this.paddleHeight / 2;
			else
				this.paddleY += 10;
		}
		this.moveBall();
		requestAnimationFrame(this.update);
	},

	checkCol() {
		if ((this.ballX + this.ballHeight > this.paddleX) &&
		(this.ballX < this.paddleX + this.paddleHeight) &&
		(this.ballY + this.ballHeight > this.paddleY) &&
		(this.ballY < this.paddleY + this.paddleHeight))
			return true;
		return false;
	},

	checkDir() {
		if (this.ballX < this.paddleWidth + this.ballWidth)
			this.dir = 1;
		else if (this.ballX > window.innerWidth)
			this.dir = 0;
	},

	moveBall(){
		this.checkCol();
		this.checkDir();
		if (this.dir == 0)
			this.ballX -= 3;
		else
			this.ballX += 3;
	},

	movePaddle(e) {
		switch(e.key) {
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
				this.paddleWidth += 5;
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
  color: #0d68c4;
  margin-top: 60px;
}
</style>
