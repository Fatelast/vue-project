import request from "../utils/requestMock";
export default {
  reqGetBanners() {
    return request({
      method: "get",
      url: "/banners",
    });
  },
};
