export interface TableOptions {
  //表头
  label: string
  //字段名称
  prop: string
  // 列宽度
  width?: string
  align?: 'left' | 'center' | 'right'
  slot?: string,
  action?:boolean,
  editable?:boolean
}
