// export interface List{
// avatar?:string,
// title?:string,
// desc?:string,
// time?:string,
// tag?:string,
// tagType?:''|'success'|'info'|'warning'|'danger'
// }

// export interface ListOptions{
//  title:string,
//  content:List[] 
// }
// 列表的每一项
export interface ListItem {
  // 头像
  avatar?: string,
  // 标题
  title?: string,
  // 描述
  desc?: string,
  // 时间
  time?: string,
  // 标签内容
  tag?: string,
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

// 列表
export interface ListOptions {
  title: string,
  content: ListItem[]
}

export interface ListFace{
  text:string,
  icon?:string 
 }