<template>
  <div class="ball" :style="{ top: `${posY}px`, left: `${posX}px`, dir: `0`, width: `${width}px`, height: `${height}px`}"></div>
</template>

<script>
export default {
  props: ['posX', 'posY', 'dir', 'width', 'height']
}
</script>

<style scoped>
.ball {
  position: absolute;
  background-color: #9b1313;
  border-radius: 50%;
}
</style>
