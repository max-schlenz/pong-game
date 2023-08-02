<template>
	<div class="paddle" :style="{
		top: `${y}px`,
		left: `${x}px`,
		height: `${hgt}px`,
		width: `${wid}px`
	}">
	</div>
</template>

<script>
export default {
	props: ['top', 'left', 'height', 'width', 'fieldHeight', 'socket'],
	data() {
		return {
			x: 1,
			y: 100,
			wid: 15,
			hgt: 120,
			speed: 7
		}
	},

	// watch: {
	// 	y(newY) {
	// 		this.socket.emit('paddleY', newY);
	// 	}
	// },

	methods: {
		getPaddleX() {
			return this.x;
		},

		getPaddleY() {
			return this.y;
		},

		setY(newY) {
			this.y = newY;
		},

		setX(newX) {
			this.x = newX;
		},

		getPaddleWidth() {
			return this.wid;
		},

		getPaddleHeight() {
			return this.hgt;
		},

		getPaddleSpeed() {
			return this.speed;
		},

		movePaddleUp() {
			if (this.y > this.speed)
				this.y -= this.speed;
			else
				this.y = 0;

			let data = {
				paddleX: this.x,
				paddleY: this.y,
				paddleWidth: this.wid,
				paddleHeight: this.hgt
			};
			
			this.socket.emit('paddleMove', data);
		},

		movePaddleDown() {
			if (this.y >= (this.fieldHeight - this.hgt - 1))
				this.y = this.fieldHeight - this.hgt;
			else
				this.y += this.speed;

			let data = {
				paddleX: this.x,
				paddleY: this.y,
				paddleWidth: this.wid,
				paddleHeight: this.hgt
			};

			this.socket.emit('paddleMove', data);
		}
	}
}

</script>

<style scoped>
.paddle {
	position: absolute;
	background: linear-gradient(to right, #0074D9, #0047AB);
	/* Gradient for depth */
	box-shadow:
		2px 3px 5px rgba(0, 174, 255, 0.5),
		/* Brighter cyan glow to the left */
		-3px 0 15px rgba(0, 0, 0, 0.3),
		/* Darker inner shadow on the left */
		inset 2px 3px 3px rgba(255, 255, 255, 0.2),
		inset -2px -3px 3px rgba(0, 0, 0, 0.5),
		inset 2px 0 5px rgba(255, 255, 255, 0.3),
		inset -2px 0 5px rgba(0, 0, 0, 0.3);
}
</style>
