<template>
  <div
    class="swiper-container"
    ref="swiper"
    @mouseenter="swiper.autoplay.stop()"
    @mouseleave="swiper.autoplay.start()"
  >
    <div class="swiper-wrapper">
      <!-- 
        1. src下面所有资源要引入才会被打包，才会被解析
        2. 异步资源webpack是不会打包的
        导致：4张轮播图图片没有打包进来
        解决：可以将4张轮播图图片放public下面
          public下面的所有资源不管有没有引入使用，都会被打包进来
       -->
      <div class="swiper-slide" v-for="img in imageList" :key="img.id">
        <img :src="img.imgUrl" :alt="img.id" />
      </div>
    </div>
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
//npm i swiper@5  swiper6只支持vue3
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Carousel',
  props: {
    imageList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    imageList: {
      handler(imageList) {
        // 问题：第一个轮播图触发两次，第一次触发没有意义，第一次没有数据
        if (!imageList.length) return

        //数据得到了，但是并没有渲染成DOM元素
        //等待数据渲染成DOM元素
        //this$nextTick接收一个回调作为参数，会等待DOM元素渲染完成后触发回调
        this.$nextTick(() => {
          this.swiper = new Swiper(this.$refs.swiper, {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true, //无缝轮播
            autoplay: true, //自动轮播
          })
        })
      },
      //一上来就触发watch
      immediate: true,
    },
  },
  /*
      新的问题：图片是异步加载回来的，所以轮播图图片也是异步渲染好的
              mounted触发时是初始化渲染完成，
              此时请求还未完成，所以轮播图图片还未生成DOM结构
              new Swiper就没办法生成轮播图
      总结原因：new Swiper时轮播图图片还没有，没法渲染轮播图
      解决：
        1. 等异步数据imageList回来
          使用watch监视属性：一旦数据发生变化时会触发
          当imageList由空数组变成有值的时候就会触发，此时刚好就有数据了
      问题2: watch中new Swiper还是不行
      总结原因：更新DOM是异步的，数据更新了，并不代表页面也更新了
      解决：$nextTick 保证等页面更新后再触发，只会触发一次
    */
  // 一定要保证先生成DOM元素，再new Swiper轮播图才会生效
  // 将元素选择器改成DOM元素
  //   this.swiper = new Swiper(this.$refs.swiper, {
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },
  //     loop: true, // 无缝轮播
  //     autoplay: true, // 自动轮播
  //   });
  // this.swiper上是一个数组，里面有三个swiper实例
  // 问题：将来有三个轮播图，都是swiper-container，导致获取swiper是三个
  // console.log(this.swiper);
}
</script>

<style>
</style>