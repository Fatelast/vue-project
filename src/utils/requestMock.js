/*
  封装axios
  
    1.定义公共的请求地址前缀
    抽取公共代码：请求地址前缀
    2.发送请求，自动携带公共参数
    抽取公共代码：自动携带公共参数
    3.响应数据时可以直接获取到返回的data数据
    4.响应状态码200代表响应成功，不代表功能成功；
    功能是否成功，看响应数据data中的code
    code200则成功
    目的：then方法得到是就是功能成功，catch得到的是功能失败
    5.错误提示更加友好
    6.请求进度条提示

  axios拦截器
    请求拦截器
     - 发送请求，自动携带公共参数
    响应拦截器
     - 响应数据时直接获取到返回的data数据
     - then方法得到是就是功能成功，catch得到的是功能失败
     - 错误提示更加友好

    工作流程：请求拦截器 - 发送请求 - 响应拦截器 - then/catch
    默认：请求拦截器只触发成功的回调
        -->发送请求
          -->根据响应状态码来触发响应拦截器
            -->响应状态码2xx 触发响应拦截器成功回调
            -->响应状态码非2xx 触发响应拦截器失败回调
              -->看响应拦截器成功、失败回调的返回值决定then/catch触发
                -->如果函数报错或返回一个失败的Promise对象，触发catch
                -->否则触发then
 */
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const request = axios.create({
  baseURL: "/mock", //基础路径，baseURL+url
  timeout: 10000, //请求超时时间
  headers: {},
});
const errorMessage = {
  401: "未授权",
  403: "禁止访问",
  404: "请求地址未找到",
  500: "服务器故障",
};
//设置请求拦截器
request.interceptors.request.use(
  //成功回调(默认触发)

  (config) => {
    NProgress.start(); //进度条开始
    // console.log(config);
    //config就是请求配置对象，里面包含请求地址、请求参数、请求头等

    //添加公共请求参数
    config.headers.token = "token";

    //必须返回config，返回的config就是发送请求的配置对象
    return config;
  },
  //失败回调 一般不触发
  () => {}
);

//设置响应拦截器
request.interceptors.response.use(
  //成功回调(响应状态码2xx)
  (response) => {
    NProgress.done(); //进度条结束
    /*
    response.data{
      code:200,
      message,
      data,
      ok,
    }
  */
    //判断功能是否成功
    if (response.data.code === 200) {
      //没返回Promise，默认就是成功状态 -->触发then
      //使得能直接获取data数据
      return response.data.data;
    }
    //功能失败，返回失败的message -->触发catch
    return Promise.reject(response.data.message || "功能失败了");
  },

  //失败回调 响应状态码非2xx
  (error) => {
    NProgress.done(); //进度条结束
    //错误提示信息更加友好
    console.dir(error);
    console.log(error.message);
    //响应回来，但响应失败
    //401,403,404,500
    if (error.message.response) {
      // if (error.response.status === 404) {
      //   return Promise.reject("请求地址未找到");
      // } else if (error.response.status === 401) {
      //   return Promise.reject("未授权");
      // } else if (error.response.status === 403) {
      //   return Promise.reject("禁止访问");
      // } else if (error.response.status === 500) {
      //   return Promise.reject("服务器故障");
      // }
      return Promise.reject(errorMessage[error.response.status] || "未知错误 ");
    }
    if (error.message.indexOf("timeout") != -1) {
      //响应没有回来导致发生的错误
      return Promise.reject("网络超时");
    } else if (error.message.indexOf("Network Error") != -1) {
      return Promise.reject("网络断开连接");
    }
    return Promise.reject("未知错误!");
  }
);
export default request;
