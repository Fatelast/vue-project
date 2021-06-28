import reqSearchGoodsList from "../../api/search";
const state = {
  goodsList: [], // 商品列表
  trademarkList: [], // 品牌列表
  attrsList: [], // 属性列表
  total: 0, // 给分页器使用
};

// 存储只读的计算属性数据
const getters = {};

// 间接更新的方法（往往发送请求）
const actions = {
  async searchGoodsList({ commit }, options) {
    // options就是搜索条件，调用时传入
    try {
      const res = await reqSearchGoodsList.reqSearchGoodsList(options);
      commit("SEARCH_GOODS_LIST", res);
    } catch (e) {
      console.log(e);
    }
  },
};

// 直接更新的方法
const mutations = {
  SEARCH_GOODS_LIST(state, res) {
    state.total = res.total;
    state.goodsList = res.goodsList;
    state.attrsList = res.attrsList;
    state.trademarkList = res.trademarkList;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
