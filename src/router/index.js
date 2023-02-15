import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupeOrder from '@/pages/Center/groupOrder'

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//配置路由
const router = new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: "/register",
            component: ()=>import('@/pages/Register'),
            meta: {
                show: false
            }
        },
        {
            path: "/login",
            component: ()=>import('@/pages/Login'),
            meta: {
                show: false
            }
        },
        {
            path: "/search/:keyword?",
            name: 'search',
            component: ()=>import('@/pages/Search'),
            meta: {
                show: true
            }
        },
        {
            path: "*",
            redirect: "/home"
        },
        {
            path: "/detail/:skuId",
            component: Detail,
            meta: {
                show: true
            }
        },
        {
            path: '/addCartSuccess',
            component: AddCartSuccess,
            meta: { show: true },
            name: 'addCartSuccess'
        },
        {
            path: '/shopCart',
            component: ShopCart,
            name: 'shopCart',
            meta: { show: true }
        },
        {
            path:'/trade',
            component:Trade,
            name:'trade',
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopCart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/pay',
            component:Pay,
            name:'pay',
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path =='/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/paySuccess',
            component:PaySuccess,
            meta:{show:true}            
        },
        {
            path:'/center',
            component:Center,
            meta:{show:true},
            children:[{
                path:'myorder',
                component:MyOrder
            },{
                path:'grouporder',
                component:GroupeOrder
            },{
                path:'/center',
                redirect:'/center/myorder'
            }],
            
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == '/register') {
            next('/');
        } else {
            if (name) {
                next();
            } else {
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效重新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }

    }
});

export default router;