import request from "../utils/requestMock";
export default {
  reqFloor() {
    return request({
      method: "get",
      url: "/floors",
    });
  },
};
