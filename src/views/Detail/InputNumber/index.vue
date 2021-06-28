<template>
  <div class="controls">
    <input
      autocomplete="off"
      class="itxt"
      :value="currentCount"
      @blur="handleCount"
      @keydown.enter="handleCount"
    />
    <a
      :class="{
        plus: true,
        disabled: currentCount === max,
      }"
      @click="add"
      >+</a
    >
    <a
      :class="{
        mins: true,
        disabled: currentCount === min,
      }"
      @click="mins"
      >-</a
    >
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    // 有最小值和最大值
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentCount: this.count,
    }
  },
  methods: {
    handleCount(e) {
      //更新数据
      this.currentCount = e.target.value
    },
    add() {
      if (this.currentCount === this.max) return
      this.currentCount++
    },
    mins() {
      if (this.currentCount === this.min) return
      this.currentCount--
    },
  },
  watch: {
    // 失去焦点或按回车键触发
    //当currentCount改变时,根据情况修正其值
    currentCount(currentCount, oldCount) {
      const { min, max } = this
      //输入后的currentCount是字符串,将其转为数字
      currentCount = +currentCount
      // 输入非数字内容，变成之前的值
      if (Number.isNaN(currentCount)) currentCount = oldCount
      //小数情况取整
      currentCount = Math.floor(currentCount)
      // 输入小于最小值，变成最小值
      // 输入大于最大值，变成最大值
      if (currentCount < min) currentCount = min
      if (currentCount > max) currentCount = max
      //更新组件中的值
      this.currentCount = currentCount
      //更新外部的count值
      this.$emit('input', currentCount)
    },
  },
}
</script>

<style lang='less' scoped>
.controls {
  width: 48px;
  position: relative;
  float: left;
  margin-right: 15px;

  .itxt {
    width: 38px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    border-right: 0;
    text-align: center;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -8px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
  }

  .plus {
    right: -8px;
  }
}
</style>