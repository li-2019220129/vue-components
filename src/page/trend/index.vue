<template>
  <div class="container">
    <div class="flex">
      <trend class="trend" :text="textOne" reverse>12121</trend>
      <trend class="trend" :text="textOne" type="down" reverse></trend>
    </div>
    <br />
    <div class="flex">
      <trend class="trend" :text="textOne"></trend>
      <trend
        class="trend"
        :text="textOne"
        downColor="green"
        type="down"
      ></trend>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const textOne = ref('营业额')
const textTwo = ref('销售额')
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  .trend {
    margin-right: 10px;
  }
}
</style>
