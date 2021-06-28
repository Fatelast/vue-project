//默认暴露的模块不能进行解构
//原因是默认暴露，暴露的是一个default属性，属性上才有暴露的内容
//将默认暴露出的default属性重命名为home
// import { default as home } from "./home";

//分别暴露、统一暴露另一种引入
// import * as home from "./home";

//相当于 import { default as home } from "./home";
//export {home}
export { default as home } from "./home";
export { default as reqGetBanners } from "./listContainer";
export { default as reqFloor } from "./reqFloor";
export { default as search } from "./search";
/*相当于暴露 {
    home,
    user
}*/
