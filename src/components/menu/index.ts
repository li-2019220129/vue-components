import menu from './src/index.vue'
import { App } from 'vue'
import infiniteMenu from './src/menu'
export default {
  install(app: App) {
    app.component('m-menu',menu)
    app.component('m-infinite-menu',infiniteMenu)
  },
}
