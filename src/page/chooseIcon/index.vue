<template>
  <div class="container">
    <choose-icon
      :title="title"
      v-model:dialogVisible="dialogVisible"
      @eventHandle="eventHandle"
    >
      <template #default> 选择图标 </template>
    </choose-icon>
  </div>
</template>

<script setup lang="ts">
import chooseIcon from '../../components/chooseSelcon/src/index.vue'
import { ref } from 'vue'
const title = ref('选择图标')
const dialogVisible = ref(false)
const eventHandle = (val: boolean) => {
  dialogVisible.value = val
}
</script>

<style lang="less" scoped></style>
