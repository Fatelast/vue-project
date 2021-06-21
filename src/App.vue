<template>
  <div>
    <router-view></router-view>
    <!-- <Footer v-if="isShowFooter" /> -->
    <Footer v-if="!$route.meta.isHideFooter" />
    <!-- <button @click="btn">aa</button> -->
  </div>
</template>
<script>
// import request from './utils/request'
export default {
  name: 'App',
  computed: {
    isShowFooter() {
      const { path } = this.$route
      return path !== '/login' && path !== '/register'
    },
  },
  methods: {
    /* 测试请求
    btn() {
      request({
        url: 'http://39.98.123.211/api/user/passport/login',
        method: 'post',
        data: {
          phone: '14200000000',
          password: '111111',
        },
      }).catch((err) => {
        console.log(err)
      })
    }, */
  },
}
</script>

<style lang="less">
</style>
