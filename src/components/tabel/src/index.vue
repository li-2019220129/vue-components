<template>
  <div class="container">
    <el-table
      :element-loading-text="elementLoadingText"
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :height="height"
      @row-click="rowClick"
    >
      <template v-for="(item, index) in options" :key="index">
        <el-table-column
          v-if="!item.action"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
          <template #default="scope">
            <template v-if="scope.row.rowEdit">
              <el-input v-model="scope.row[item.prop]" size="small" />
            </template>
            <template v-else>
              <template v-if="scope.$index + scope.column.id === current">
                <div class="flex">
                  <el-input v-model="scope.row[item.prop!]" clearable />
                  <div
                    style="display: flex; align-item: center"
                    @click.stop="clickEditCell"
                  >
                    <slot name="editdCell" :scope="scope">
                      <div class="flex-icon">
                        <el-icon
                          class="icon-svg"
                          @click="checkClick(scope)"
                          :size="16"
                          color="green"
                          ><Check
                        /></el-icon>
                        <el-icon
                          @click="closeClick(scope)"
                          class="icon-svg"
                          :size="16"
                          color="red"
                          ><Close
                        /></el-icon>
                      </div>
                    </slot>
                  </div>
                </div>
              </template>
              <template v-else>
                <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                <span v-else>{{ scope.row[item.prop] }}</span>
                <el-icon
                  @click.stop="editClick(scope)"
                  :size="17"
                  class="icon"
                  v-if="item.editable"
                >
                  <component :is="editIcon"></component>
                </el-icon>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
          <template #default="scope">
            <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit">
            </slot>
            <slot v-else :scope="scope" name="action"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div
      class="pagination"
      :style="{ 'justify-content': paginationAlignCom }"
      v-if="pagination"
    >
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { TableOptions } from './type'
import { PropType, computed, ref, onMounted, watch } from 'vue'
const current = ref('')
const tableData = ref<any[]>([])
const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  height:{
    type:String
  },
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  editIcon: {
    type: String,
    default: 'Edit',
  },
  isEditRow: {
    type: Boolean,
    default: false,
  },
  editRowIndex: {
    type: String,
    default: '',
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 40]
    },
  },
})
const emits = defineEmits([
  'close',
  'check',
  'update:editRowIndex',
  'sizeChange',
  'currentChange',
])
const loading = computed(() => !props.data || !props.data.length)
tableData.value = cloneDeep(props.data)
const cloneEditRowIndex = ref(props.editRowIndex)
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val)
    tableData.value.forEach((item) => {
      item.rowEdit = false
    })
  },
  { deep: true }
)
// watch(()=>props.editRowIndex,(val)=>{
//   console.log(12122)
//   val && (cloneEditRowIndex.value = val)
// })
onMounted(() => {
  tableData.value.forEach((item) => {
    item.rowEdit = false
  })
})
const paginationAlignCom = computed(() => {
  let align = props.paginationAlign
  return align === 'left'
    ? 'flex-start'
    : align === 'center'
    ? 'center'
    : 'flex-end'
})
const editClick = (scope: any) => {
  current.value = scope.$index + scope.column.id
}
const clickEditCell = () => {
  current.value = ''
}

const checkClick = (scope: any) => {
  emits('check', scope)
}
const closeClick = (scope: any) => {
  emits('close', scope)
}
const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
}
const rowClick = (row: any, column: any) => {
  if (column.label === props.options.find((item) => item.action)?.label) {
    if (props.isEditRow && props.editRowIndex === 'edit') {
      tableData.value.forEach((item) => {
        if (item !== row) item.rowEdit = false
      })
      row.rowEdit = !row.rowEdit
    }
    if (!row.rowEdit) emits('update:editRowIndex', '')
  }
}
</script>

<style lang="less" scoped>
.icon {
  position: relative;
  top: 3.9px;
  margin-left: 10px;
  cursor: pointer;
}
.flex {
  display: flex;
  &-icon {
    align-items: center;
    display: flex;
    .icon-svg {
      cursor: pointer;
      margin-left: 6px;
    }
  }
}
.pagination {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px 0 0;
  box-sizing: border-box;
}
</style>
