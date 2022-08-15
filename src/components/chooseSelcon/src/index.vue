<template>
  <div class="container">
    <el-button @click="handleClick" type="primary"><slot></slot></el-button>
    <!-- 不能直接用v-model,因为v-model会把props的数据进行修改，所以拆开就来然后让父组件来改就没问题 -->
    <!-- <el-dialog v-model="dialogVisible" :title="title"> 111 </el-dialog> -->
    <el-dialog
      :modelValue="dialogVisible"
      @update:modelValue="eventHandle"
      :title="title"
    >
      <icon-item @editShowClose="handleShowClose"></icon-item>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import iconItem from '../../../cpn/icon-item.vue'
const props = defineProps<{
  dialogVisible: boolean
  title: string
}>()
const emit = defineEmits(['update:dialogVisible', 'eventHandle'])
const handleClick = () => {
  editDialogShow(true)
}
const handleShowClose = () => {
  editDialogShow(false)
}
const eventHandle = (e: boolean) => {
  emit('eventHandle', e)
}
const editDialogShow = (state:boolean) => {
  emit('update:dialogVisible', state)
}
</script>

<style lang="less" scoped>
.container {
  ::v-deep(.el-dialog) {
    min-width: 400px;
    margin: 20px auto;
  }
  ::v-deep(.el-dialog__body) {
    height: 400px;
    overflow-y: scroll;
  }
}
</style>
