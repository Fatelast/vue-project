import request from "../utils/request";
export const reqGetGoodsDetail = (id) => {
  return request({
    method: "GET",
    url: `/item/${id}`,
  });
};
