import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodsInfo:{},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state,data){
        state.goodsInfo = data
    },
}
const actions ={
    async getGoodsInfo({commit},skuId){
        let res = await reqGetGoodsInfo(skuId)
        if(res.code===200){
            commit('GETGOODSINFO',res.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(res.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new ErrorEvent('fail'))
        }

    }

}
const getters ={
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }


}

export default{
    state,
    actions,
    mutations,
    getters
}