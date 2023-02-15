import {reqAddressInfo, reqOrderInfo} from '@/api'

const state = {
    addressInfo:[],
    orderInfo:{}
}
const mutations = {
    ADDRESSINFO(state,data){
        state.addressInfo = data
    },
    GETORDERINFO(state,data){
        state.orderInfo = data
    }
}
const actions ={
    async addressInfo({commit}){
        let res = await reqAddressInfo()
        console.log('addressinfo',res)
        if(res.code==200){
            commit('ADDRESSINFO',res.data)
            return 'ok'
        }
    },
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()
        console.log('orderinfo',res)
        if(res.code==200){
            commit('GETORDERINFO',res.data)
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