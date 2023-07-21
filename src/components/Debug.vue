<template>
  <div class="dbgwin" :style="{ top: `${posY}px`, left: `${posX}px`}"></div>
</template>

<script>
export default {
  props: ['posX', 'posY']
}
</script>

<style scoped>
.dbgwin {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color:#168fff;
  border-radius: 10%;
}
</style>
