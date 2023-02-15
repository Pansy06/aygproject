import {reqGetCartList, reqDeleteCartById, reqUpdateCheckedByid} from '@/api'

const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,data){
        state.cartList = data
    }
}
const actions ={
    async getCartList({commit}){
        let res = await reqGetCartList()
        if(res.code===200){
            commit('GETCARTLIST',res.data)
        }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
          return "ok";
        } else {
          return Promise.reject(new Error("fail"));
        }
      },
      async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
          return "ok";
        } else {
          return Promise.reject(new Error("fail"));
        }
      },
      deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
          let promise =
            item.isChecked == 1
              ? dispatch("deleteCartListBySkuId", item.skuId)
              : "";
          PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
      },
      updateAllCartIsChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
          let promise = dispatch("updateCheckedById", {
            skuId: item.skuId,
            isChecked,
          });
          promiseAll.push(promise);
        });
        //最终返回结果
        return Promise.all(promiseAll);
      },
}
const getters ={
    cartList(){
        return state.cartList[0] || {}
    },
}

export default{
    state,
    actions,
    mutations,
    getters
}