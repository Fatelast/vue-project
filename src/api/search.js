import request from "../utils/request";

// ๆ็ดขๅๅ
export default {
  reqSearchGoodsList(data) {
    return request({
      method: "POST",
      url: "/list",
      data,
    });
  },
};
