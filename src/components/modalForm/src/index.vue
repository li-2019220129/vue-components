<template>
  <div class="container">
    <el-dialog
      :modelValue="showModal"
      @update:modelValue="eventHandle"
      v-bind="$attrs"
    >
      <template #default>
        <my-form
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
          ref="form"
          :options="options"
          label-width="70px"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip> <slot name="uploadTip"></slot></template>
        </my-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form"> </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { FormOptions } from '../../form/src/types/type'
const props = defineProps({
  showModal: {
    type: Boolean,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  },
})
const form = ref()
const emits = defineEmits(['update:showModal'])
const eventHandle = (e: boolean) => {
  emits('update:showModal', e)
}
</script>

<style lang="less" scoped></style>
