<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <!-- 遍历生成小图列表 -->
      <div class="swiper-slide" v-for="(img, index) in imageList" :key="img.id">
        <!-- 点击某个图片时，将触发更新事件，更新当前图片下标 -->
        <img
          :class="{
            active: currentIndex === index,
          }"
          :src="img.imgUrl"
          :alt="img.imgName"
          @click="$emit('update:currentIndex', index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'ImageList',
  props: {
    imageList: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  watch: {
    imageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // 每页显示多少张图片
          slidesPerView: 5,
          // 下一页，一次滑动滑动多少张图片
          slidesPerGroup: 5,
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>