<template>
  <div class="paddle" :style="{ top: `${posY}px`, left: `${posX}px`, height: `${height}px`, width: `${width}px`}"></div>
</template>

<script>
export default {
  props: ['posX', 'posY', 'height', 'width'],
}
</script>

<style scoped>
.paddle {
  position: absolute;
  border-radius: 0px;
  background: #005a9b;
  box-shadow: 
    -7px 0 15px rgba(0, 166, 255, 0.9), 
    -2px 0 10px rgba(0, 0, 0, 0.5), 
    inset 1px 1px 1px rgba(255, 255, 255, 0.1), 
    inset -1px -1px 1px rgba(0, 0, 0, 0.4), 
    inset 1px 0 1px rgba(255, 255, 255, 0.2), 
    inset -1px 0 1px rgba(0, 0, 0, 0.25);
}
</style>
