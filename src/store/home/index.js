//home的小仓库
import { reqGetCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"
const state = {
    //home仓库中存储三级菜单的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList:[]
  };
  const mutations = {
    GETCATEGORYLIST(state, data) {
      state.categoryList = data;
    },
    GETBANNERLIST(state, data) {
      state.bannerList = data;
    },
    GETFLOORLIST(state,data){
       state.floorList = data;
    }
  };
  const actions = {
    async getCategoryList({ commit }) {
      let result = await reqGetCategoryList();
      if (result.code == 200) {
        commit("GETCATEGORYLIST", result.data);
      }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
      let result = await reqGetBannerList();
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data);
      }
    },
    //获取floor数据
    async getFloorList({ commit }) {
      let result = await reqGetFloorList();
      if (result.code == 200) {
        //提交mutation
        commit("GETFLOORLIST", result.data);
      }
    },
  };
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}
