<template>
	<div>
		<div class="field" ref="gameField">
			<div class="left-border"></div>
			<div class="right-border"></div>
			<GameBall ref="ball"
			:fieldHeight="fieldHeight"
			:fieldWidth="fieldWidth"
			:socket="socket"
			/>
			<GamePaddle ref="paddleA" 
			:fieldHeight="fieldHeight"
			:socket="socket"
			/>
			<GamePaddle ref="paddleB" 
			:fieldHeight="fieldHeight"
			:socket="socket"
			/>
		</div>
		<form @submit.prevent="connectToWS">
      <input type="text" v-model="serverIp" placeholder="Enter Server IP"/>
      <button type="submit">Connect</button>
    </form>
	</div>
</template>

<script>
import GamePaddle from './GamePaddle.vue'
import GameBall from './GameBall.vue'
import { io } from "socket.io-client";

export default {
  name: 'App',
  components: {
	GameBall, 
	GamePaddle
  },
  mounted() {
	this.fieldWidth = this.$refs.gameField.clientWidth;
	this.fieldHeight = this.$refs.gameField.clientHeight;

	setTimeout(() => {this.update();}, 200);
	this.$refs.paddleA.setX(1);
	this.$refs.paddleB.setX(this.fieldWidth - 15);
  },

  watch: {
	isMovingUp(newState){
		this.socket.emit('moveUp', newState);
	},

	isMovingDown(newState){
		this.socket.emit('moveDown', newState);
	}
	
  },

  data() {
	return {
		hitCount: 0,

		isMovingUp: false,
		isMovingDown: false,
		isPaused: false,

		mouseX: null,
		mouseY: null,
		fieldWidth: null,
		fieldHeight: null,

		socket: null,
		serverIp: null
	}
  },

  methods: {
	resetGame() {
		this.$refs.ball.resetBall()
		this.hitCount = 0;
		// this.ballSpeed = 1;
		// this.ballX = 500,
		// this.ballY = 200;
		// this.$refs.paddle.paddleX = 5;
		// this.$refs.paddle.paddleY = 100;
		this.isMovingUpA = false;
		this.isMovingDownA = false;

		this.isMovingUpB = false;
		this.isMovingDownB = false;
	},

	connectToWS() {
		if (this.socket)
			this.socket.close();
		this.socket = io(`http://${this.serverIp}:3000`, { transports: [ 'websocket' ]});

		this.socket.on("connect", () => {
			console.log("Connected to Server");
			this.socket.emit("message", "Hello");
		});

		// this.socket.on("moveUp", (data) => {
		// 	if (data)
		// 		this.isMovingUp = true;
		// 	else
		// 		this.isMovingUp = false;
		// });
		
		// this.socket.on("moveDown", (data) => {
		// 	if (data)
		// 		this.isMovingDown = true;
		// 	else
		// 		this.isMovingDown = false;
		// });
		this.socket.on('paddleAMove', (newPos) => {
			this.$refs.paddleA.setY(newPos);
		});

		this.socket.on('paddleBMove', (newPos) => {
			this.$refs.paddleB.setY(newPos);
		});
	},

	update() {
		if (this.isPaused)
		{
			requestAnimationFrame(this.update);
			return ;
		}

		if (this.$refs.paddleA && this.isMovingUp)
			this.$refs.paddleA.movePaddleUp();

		else if (this.$refs.paddleA && this.isMovingDown)
			this.$refs.paddleA.movePaddleDown();

		if (this.$refs.ball && this.$refs.paddleA)
		{
			if (!this.$refs.ball.moveBall(
				this.$refs.paddleA.getPaddleX(), 
				this.$refs.paddleA.getPaddleY(), 
				this.$refs.paddleA.getPaddleWidth(), 
				this.$refs.paddleA.getPaddleHeight()))
					this.resetGame();
		}

		requestAnimationFrame(this.update);
	},

	updateMousePosition(event) {
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;
	},

	checkGameOver() {
		// if ((this.ballX + this.ballWidth < this.$refs.paddle.paddleX + this.$refs.paddle.paddleWidth) &&
		// 	(this.ballY + this.ballHeight < this.$refs.paddle.paddleY + this.$refs.paddle.paddleHeight) ||
		// 	(this.ballY > this.$refs.paddle.paddleY))
		// ;
		// console.log(window.innerWidth);
		if (this.$refs.ball.ballX < 10)// || this.ballX > window.innerWidth - 20)
			this.resetGame();
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
		overflow: hidden; 
	}

	.field::before, .field::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
	}

	.field::before {
		top: 0;
	}

	.field::after {
		bottom: 0;
	}

	.left-border, .right-border {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background-image: linear-gradient(rgba(255, 255, 255, 0.5) 33%, rgba(0, 0, 0, 0) 0%);
		background-size: 100% 10px;
	}

	.left-border {
		left: 0;
	}

	.right-border {
		right: 0;
	}
</style>


