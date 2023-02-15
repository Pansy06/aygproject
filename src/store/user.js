import {reqGetCode, reqUserInfo, reqUserLogin, reqUserRegister,reqLogOut} from '@/api'

const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}

}
const mutations = {
    GETCODE(state,data){
        state.code=data
    },
    USERLOGIN(state,data){
        state.token = data
    },
    GETUSERINFO(state,data){
        state.userInfo = data
    },
    CLEAR(state){
        state.token = '',
        state.userInfo = {};
        localStorage.removeItem('TOKEN')
    }

}
const actions ={
    async getCode({commit},phone){
        let res = await reqGetCode(phone)
        if(res.code==200){
            commit('GETCODE',res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({commit},user){
        let res = await reqUserRegister(user)
        console.log('userRegister',res)
        if(res.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin({commit},data){
        let res = await reqUserLogin(data)
        console.log('userlogin',res)
        if(res.code==200){
            commit('USERLOGIN',res.data.token)
            localStorage.setItem('TOKEN',res.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}){
        let res = await reqUserInfo()
        console.log('getUserInfo',res)
        if(res.code==200){
            commit('GETUSERINFO',res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogout({commit}){
        //向服务器发请求清除后台token
        let res = await reqLogOut()
        if(res.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }

}
const getters ={

}

export default{
    state,
    actions,
    mutations,
    getters
}