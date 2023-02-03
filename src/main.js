import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//把三级组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Vuex from 'vuex'
import store from './store'
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
