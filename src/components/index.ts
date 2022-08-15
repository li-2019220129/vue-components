import {App} from 'vue'
import chooseArea from './chooseArea'
import chooseSelcon from './chooseSelcon'
import trend from './trend'
import notification from './notification'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import form from './form'
import modelFrom from './modalForm'
import tabel from './tabel'
import calendar from './calendar'
const component = [
  chooseArea,
  chooseSelcon,
  trend,
  notification,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modelFrom,
  tabel,
  calendar
] 
export default {
  install(app:App){
    component.forEach(item=>{
      app.use(item)
    })
  }
}