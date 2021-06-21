<template>
  <header class="header">
    <div class="header-top">
      <p>
        尚品汇欢迎您！请
        <router-link to="/login" class="header-top-login">登录</router-link>
        <router-link to="/register">免费注册</router-link>
      </p>
      <nav class="header-top-nav">
        <router-link to="/">我的订单</router-link>
        <router-link to="/">我的购物车</router-link>
        <router-link to="/">我的尚品汇</router-link>
        <router-link to="/">尚品汇会员</router-link>
        <router-link to="/">企业采购</router-link>
        <router-link to="/">关注尚品汇</router-link>
        <router-link to="/">合作招商</router-link>
        <router-link to="/">商家后台</router-link>
      </nav>
    </div>
    <div class="header-bottom">
      <router-link to="/"><img src="./logo.png" alt="" /></router-link>
      <form action="" class="header-bottom-form" @submit.prevent="goSearch">
        <input type="text" class="header-bottom-ipt" v-model="keyword" />
        <button class="header-bottom-btn">搜索</button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    goSearch() {
      this.$router.history.push({
        name: 'Search',
      })
    },
  },
}
</script>

<style lang='less'>
/**
  less嵌套问题
  1.代码体积大
  2.浏览器解析css样式性能差：从右往左解析
*/
.header {
  height: 100px;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  background-color: #eaeaea;
  font-size: 12px;
  padding: 10px 20px;
  box-sizing: border-box;
  p {
    margin: 0;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  .header-top-login {
    padding-right: 5px;
    border-right: 1px solid #333;
    margin-right: 5px;
  }
  .header-top-nav {
    a {
      border-right: 1px solid #333;
      padding-right: 5px;
      margin-left: 7px;
      &:last-child {
        border: none;
      }
    }
  }
}
.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  img {
    height: 100%;
    width: 100%;
  }
  .header-bottom-form {
    display: flex;
    align-items: center;
  }
}
.header-bottom-ipt {
  width: 450px;
  border: 1px solid #ea4a36;
  outline: none;
  height: 22px;
  padding: 4px 5px;
  font-size: 14px;
}
.header-bottom-btn {
  width: 80px;
  height: 32px;
  color: #fff;
  background-color: #ea4a36;
  border: none;
}
</style>