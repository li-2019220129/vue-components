<template>
  <el-form
    ref="formRef"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item :label="item.label" :prop="item.prop">
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
        >
          <template v-if="item.children && item.children.length">
            <component
              v-for="(child, i) in item.children"
              :key="i"
              :is="`el-${child.type}`"
              :value="child.value"
              :label="child.label"
            ></component>
          </template>
        </component>
        <el-upload
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
          v-bind="item.uploadAttrs"
          v-if="item.type === 'upload'"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div v-if="item.type === 'editor'" style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 200px; overflow-y: hidden"
            v-model="valueHtml"
            @onChange="handleChange"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="footer" :form="formRef" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {
  onMounted,
  PropType,
  ref,
  watch,
  shallowRef,
  onBeforeUnmount,
  nextTick,
} from 'vue'
import { FormOptions, FormInstance } from './types/type'

const model = ref<any>({})
const formRef = ref<FormInstance | null>()
const rules = ref<any>({})
const editorRef = shallowRef()
const valueHtml = ref('')
const toolbarConfig = {}
const mode = 'default'
const editorConfig = { placeholder: '请输入内容...' }

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
})
const handleChange = (editor: any) => {
  let editorItem = props.options.find((item) => item.type === 'editor')!
  model.value[editorItem.prop!] = editor.children[0].children[0].text
}
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
let emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed',
])
let init = () => {
  if (!props.options.length) return
  let m: any = {}
  let r: any = {}
  props.options.forEach((item) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
    if (item.type === 'editor') {
      setTimeout(() => {
        const editor = editorRef.value
        if (editor == null) return
        console.log(editor.insertText, item.value)
        console.log(editor.insertText(item.value))
      })
    }
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}
const resetFields = () => {
  formRef.value!.resetFields()
  if (props.options.length) {
    let editorItem = props.options.find((item) => item.type === 'editor')!
    console.log(editorRef.value, editorItem.value)
    valueHtml.value = editorItem.value
  }
}
const validate = ()=>{
  return formRef.value?.validate
}
const getFormDate=()=>{
  return model.value
}
defineExpose({
  resetFields,
  validate,
  getFormDate
})
onMounted(() => {
  init()
})
//options数据更新时要重新加载
watch(
  () => props.options,
  () => {
    init()
  },
  {
    deep: true,
  }
)
// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  console.log(1212121)
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  console.log('2323232323')
  emits('on-error', { err, file, fileList })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
</script>

<style lang="less" scoped></style>
