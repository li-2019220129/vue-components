<template>
  <div class="container">
    <choose-city @choose="choose"></choose-city>
  </div>
</template>

<script setup lang="ts">
const choose = (val:any) => {
  console.log(val)
}
</script>

<style lang="less" scoped></style>
