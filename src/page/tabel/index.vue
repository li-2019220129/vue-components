<template>
  <div class="container">
    <m-tabel
      @check="checkClick"
      @close="closeClick"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      elementLoadingText="加载中..."
      :data="tableData"
      :options="options"
      isEditRow
      :total="total"
      pagination
      height="430"
      v-model:editRowIndex="editRowIndex"
    >
      <template #nameSlot="{ scope }">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <template #action="{ scope }">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
      <template #editRow="{ scope }">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >确认</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >取消</el-button
        >
      </template>
      <!-- <template #editdCell="{ scope }">
        <div class="flex-icon">
          <el-button
            @click="confirm(scope)"
            class="icon"
            size="small"
            type="primary"
            >确定</el-button
          >
          <el-button
            @click="cancel(scope)"
            class="icon"
            size="small"
            type="danger"
            >取消</el-button
          >
        </div>
      </template> -->
    </m-tabel>
  </div>
</template>

<script setup lang="ts">
import { TableOptions } from '../../components/tabel/src/type'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const tableData = ref<any[]>([])
const editRowIndex = ref('')
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const getDate = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((item) => {
      tableData.value = item.data.data.rows
      total.value = item.data.data.total
    })
}
onMounted(() => {
  getDate()
})
const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    editable: true,
    width: '240',
  },
  {
    label: '名称',
    prop: 'name',
    slot: 'nameSlot',
    align: 'center',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    action: true,
  },
]
const handleEdit = (index: number, row: any) => {
  editRowIndex.value = 'edit'
}
const handleDelete = (index: number, row: any) => {}
const checkClick = (scope: any) => {}
const closeClick = (scope: any) => {}
const confirm = (scope: any) => {}
const cancel = (scope: any) => {}
const sizeChange = (val: number) => {
  pageSize.value = val
  console.log(pageSize.value)
  getDate()
}
const currentChange = (val: number) => {
  current.value = val
  getDate()
}
</script>

<style lang="less" scoped>
.flex-icon {
  display: flex;
  align-items: center;
  .icon {
    margin-left: 6px;
  }
}
</style>
