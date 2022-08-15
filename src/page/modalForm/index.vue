<template>
  <div class="container">
    <el-button type="primary" @click="openForm">open</el-button>
    <modal-form
      :options="options"
      title="编辑用户"
      width="50%"
      :on-success="handleSuccess"
      :on-change="handleChange"
      v-model:showModal="showModal"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="margin-left: 10px; font-size: 12px; color: #ccc">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer="{ form }">
        <el-button @click="cancel">关闭</el-button>
        <el-button type="primary" @click="confim(form)">提交</el-button>
      </template>
    </modal-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FormOptions, FormInstance } from '../../components/form/src/types/type'
const showModal = ref(false)
const options = ref<FormOptions[]>([])
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
        trigger: 'change',
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
const openForm = () => {
  showModal.value = true
}
const cancel = () => {
  showModal.value = false
}
const confim = (form: any) => {
  let model = form.getFormDate()
  form.validate()((valid: boolean) => {
    if (valid) {
      let model = form.getFormDate()
      console.log(model)
      ElMessage.success('验证成功')
    } else {
      ElMessage.error('验证失败')
    }
  })
}
let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
const eventHandle = (e: boolean) => {
  showModal.value = e
}
</script>
 
<style lang="less" scoped></style>
