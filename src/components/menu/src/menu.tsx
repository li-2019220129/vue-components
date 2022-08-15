import { defineComponent, PropType,useAttrs } from 'vue'
import { MenuItem } from './types'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default defineComponent({
  props:{
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default:''
    },
    router:{
      type:Boolean,
      default:false
    }
  },
  setup(props){
    console.log(props.data);
    let attrs = useAttrs()
    let renderMenus = (data:MenuItem[])=>{
      return data.map((item:MenuItem)=>{
        item.i = (ElementPlusIconsVue as any)[item.icon!] 
          let slots = {
            title:()=>{
              return <>
                <el-icon>
                { item.i ?< item.i />:''} 
                </el-icon>
                <span>{item.name}</span>
              </>
            }
          }
          if(item.children || item.children!?.length){
            return (
              <el-sub-menu index={item.index} v-slots={slots}>
                {renderMenus(item.children!)}
              </el-sub-menu>
            )
          }
          return (
            <el-menu-item index={item.index}>
                <el-icon>
              {  item.i ?< item.i />:''} 
              </el-icon>
              <span>{item.name}</span>
            </el-menu-item>
          )
      })
    }
    return ()=>{
      return (
        <el-menu {...attrs} default-active={props.defaultActive} router={props.router}>
          {renderMenus(props.data)}
        </el-menu>
      )
    }
  }
})