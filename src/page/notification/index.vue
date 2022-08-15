<template>
  <div class="container">
    <div class="notifi">
      <notification :value="50">
        <template #default>
          <list-item
            @click-item="clickItem"
            @click-action="clickAction"
            :list="list"
            :actions="actions"
          ></list-item>
        </template>
      </notification>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItem from '../../cpn/list/list.vue'
import { list, actions } from './data'
const clickItem = (val: any) => {
  console.log(val)
}
const clickAction = (val: any) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.notifi {
  margin-top: 20px;
}
</style>
