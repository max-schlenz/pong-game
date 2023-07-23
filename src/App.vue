<template>
	<GameField />
</template>

<script>
	import GameField from './components/GameField.vue'
	export default {
		components: {
			GameField
		}
	}
</script>


<style>
#app {
	display: flex;
	justify-content: center;
	align-items: center;
	/* padding: 40px; */
	margin: 0;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

body {
	color: white;
	background-color: #181818; /* Change this to your desired color */
}
</style>
