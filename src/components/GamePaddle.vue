<template>
  <div class="paddle" ref="paddle" :style="{ top: `${posY}px`, left: `${posX}px`, height: `${height}px`, width: `${width}px`}"></div>
</template>

<script>
export default {
  props: ['posX', 'posY', 'height', 'width'],
  ref: ["paddle"]
}
</script>

<style scoped>
.paddle {
  position: absolute;
  background-color:#168fff;
  border-radius: 0%;
}
</style>
