<template>
  <div class="container">
    <my-form
      ref="form"
      label-width="120px"
      :options="options"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="margin-left: 10px; font-size: 12px; color: #ccc">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </my-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormInstance } from '../../components/form/src/types/type'
import { cloneDeep } from 'lodash'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
let options = ref<FormOptions[]>([])
let form = ref()
interface scope {
  form: FormInstance
  model: any
}
//模拟异步请求
options.value = [
  {
    type: 'input',
    value: '',
    prop: 'username',
    label: '用户名',
    attrs: {
      clearable: true,
    },
    // rules: [
    //   {
    //     required: true,
    //     message: 'Please input Activity name',
    //     trigger: 'blur',
    //   },
    //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    // ],
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    attrs: {
      showPassword: true,
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      {
        min: 10,
        max: 15,
        message: 'Length should be 10 to 5',
        trigger: 'blur',
      },
    ],
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur',
      },
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1',
      },
      {
        type: 'option',
        label: '主管',
        value: '2',
      },
      {
        type: 'option',
        label: '员工',
        value: '3',
      },
    ],
  },
  {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'like',
    children: [
      {
        type: 'checkbox',
        value: '1',
        label: '足球',
      },
      {
        type: 'checkbox',
        value: '2',
        label: '排球',
      },
      {
        type: 'checkbox',
        value: '3',
        label: '篮球',
      },
    ],
  },
  {
    type: 'radio-group',
    value: [],
    label: '爱好',
    prop: 'food',
    children: [
      {
        type: 'radio',
        value: '1',
        label: '蛋糕',
      },
      {
        type: 'radio',
        value: '2',
        label: '炸鸡',
      },
      {
        type: 'radio',
        value: '3',
        label: '薯条',
      },
    ],
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3,
    },
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur',
      },
    ],
  },
]

const submitForm = (scope: scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      console.log(scope.model)
      ElMessage.success('表单提交成功')
    } else {
      ElMessage.error('表单填写有误')
    }
  })
}
const resetForm = (scope: scope) => {
  form.value.resetFields()
}
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}
</script>

<style lang="less" scoped>
</style>
