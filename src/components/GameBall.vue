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
  background: radial-gradient(circle at 30% 30%, #5fcfff, #005a9b 50%, #0066ff);
  border-radius: 50%;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.6);
}
</style>
