<template>
  <div class="container">
    <choose-area @change="change"></choose-area>
  </div>
</template>

<script setup lang="ts">
const change = (val:any) => {
  console.log(val)
}
</script>

<style lang="less" scoped></style>
