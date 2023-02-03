import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//重写push和replace方法
// let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
// VueRouter.prototype.push = function(location,resolve,reject){
//     if(resolve&&reject){
//         originPush.call(this,location,resolve,reject)
//     }else{
//         originPush.call(this,()=>{},()=>{})
//     }
// }
// VueRouter.prototype.replace = function(location,resolve,reject){
//     if(resolve&&reject){
//         originReplace.call(this,location,resolve,reject)
//     }else{
//         originReplace.call(this,()=>{},()=>{})
//     }
// }
const VueRouterPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//配置路由
export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                show:true
            }
        },
        {
            path:"/register",
            component:Register,
            meta:{
                show:false
            }
        },
        {
            path:"/login",
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:"/search?",
            component: Search,
            meta:{
                show:true
            }
        },
        {
         path:"*",
         redirect:"/home" 
        }
    ]
})