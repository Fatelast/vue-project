import request from "../utils/request";

// 搜索商品
export default {
  reqSearchGoodsList(data) {
    return request({
      method: "POST",
      url: "/list",
      data,
    });
  },
};
