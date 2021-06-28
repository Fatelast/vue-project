<template>
  <div class="spec-preview">
    <img :src="img.imgUrl" :alt="img.imgName" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <!-- 根据data中的数据设置图片的定位 -->
      <img
        :src="img.imgUrl"
        :alt="img.imgName"
        :style="{ left: bigImgLeft, top: bigImgTop }"
      />
    </div>
    <div class="mask" :style="{ left: maskLeft, top: maskTop }"></div>
  </div>
</template>

<script>
// import _ from 'lodash'//完整引入,体积太大
import { throttle } from 'lodash' //按需引入
export default {
  name: 'Zoom',
  props: {
    img: {
      type: Object,
      //设置默认值,否则会报错
      default: () => ({}),
    },
  },
  data() {
    return {
      maskLeft: 0,
      maskTop: 0,
      bigImgLeft: 0,
      bigImgTop: 0,
    }
  },
  methods: {
    handleMove: throttle(function (e) {
      const eventWidth = 400
      const eventHeight = 400
      const maskWidth = 200
      const maskHeight = 200
      //计算mask的位置
      let left = e.offsetX - maskWidth / 2 // 当前鼠标位置距离元素左上角的左边距离
      let top = e.offsetY - maskHeight / 2

      //边界判断
      if (left < 0) left = 0
      if (left > eventWidth / 2) left = eventWidth / 2
      if (top < 0) top = 0
      if (top > eventHeight / 2) top = eventHeight / 2

      //设置大图和小图的位置
      this.bigImgLeft = -2 * left + 'px'
      this.bigImgTop = -2 * top + 'px'
      this.maskLeft = left + 'px'
      this.maskTop = top + 'px'
    }, 1000 / 60),
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>