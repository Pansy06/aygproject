import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//把三级组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import Vuex from 'vuex'
import store from './store'
import VueLazyload from 'vue-lazyload'
import img from '@/assets/images/choosed.png'

import '@/mock/mockServe'
import '../node_modules/swiper/css/swiper.css'
import {reqGetSearchList } from '@/api'
import { Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  load:img
})

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
