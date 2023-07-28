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
	
	watch: {
		x(newX) {
			if (this.socket)
				this.socket.emit('ballX', newX);
		},
		
		y(newY) {
			if (this.socket)
				this.socket.emit('ballY', newY);
		}
	},
	
	methods: {
		
		setX(newX) {
			this.x = newX;
		},

		setY(newY) {
			this.y = newY;
		},

		resetBall() {
			this.x=500;
			this.y=200;
			this.wid=15;
			this.hgt=15;
			this.speed=5;
			this.dx=3;
			this.dy=2;
		},
		
		moveBallDir(paddleX, paddleY, paddleWidth, paddleHeight) {
			let paddleMid = paddleY + (paddleHeight / 2);
			let ballMid = this.y + (this.hgt / 2);
			let paddleHitLocation = (ballMid - paddleMid) / (paddleHeight / 2);
			let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;
			
			this.dx = -this.speed * Math.cos(bounceAngle);
			this.dy = this.speed * Math.sin(bounceAngle);
			this.dx = -this.dx;
			
			this.x = paddleX + paddleWidth; //fix ball sometimes glitching into paddle
			this.speed++;
		},
		
		moveBall(paddleX, paddleY, paddleWidth, paddleHeight) {
			let nextBallX = this.x + this.dx;
			let nextBallY = this.y + this.dy;
			
			if ((nextBallX < 0) ) // || nextBallY + this.wid > this.fieldWidth)
				return false;
			
			else if (nextBallX + this.wid > this.fieldWidth)
			this.dx = -this.dx;
			
			else if (nextBallY + this.hgt > this.fieldHeight || nextBallY < 0)
			this.dy = -this.dy;
			
			else if ((nextBallX + this.wid >= paddleX) &&
				(nextBallX < paddleX + paddleWidth) &&
				(nextBallY + this.hgt >= paddleY) &&
				(nextBallY < paddleY + paddleHeight))
					this.moveBallDir(paddleX, paddleY, paddleWidth, paddleHeight);
			
			else {
				this.x = nextBallX;
				this.y = nextBallY;
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
