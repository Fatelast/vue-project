import { reqGetGoodsDetail } from "../../api/detail";
const state = {
  goods: {
    // 初始化数据,否则会报错
    categoryView: {},
    skuInfo: {
      skuImageList: [],
    },
    spuSaleAttrList: [],
  },
};
const getters = {};
const actions = {
  async getGoodsDetail({ commit }, id) {
    try {
      const goods = await reqGetGoodsDetail(id);
      commit("GET_GOODS_DETAIL", goods);
    } catch (e) {
      console.log(e);
    }
  },
};
const mutations = {
  GET_GOODS_DETAIL(state, goods) {
    state.goods = goods;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
