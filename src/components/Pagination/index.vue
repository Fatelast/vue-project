<template>
  <div class="pagination">
    <!-- 上一页按钮 ,当前页码为1时则禁用-->
    <button
      @click="myCurrentPage--"
      :class="{ disabled: myCurrentPage === 1 }"
      :disabled="myCurrentPage === 1"
    >
      &lt;
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="myCurrentPage = 1">
      1
    </button>

    <!-- 当中间显示的页码数最小大于2时才显示 -->
    <button v-show="startEnd.start > 2">...</button>

    <!-- 中间显示的个数为5个 ，当前页数改变时，会触发startEnd，从而中间显示的页数也会改变，只有一页时，不会显示-->
    <button
      v-for="item in startEnd.end - startEnd.start + 1"
      :key="item"
      :class="{
        //给当前页码添加动态样式
        active: myCurrentPage === getCurrentValue(item),
      }"
      @click="myCurrentPage = getCurrentValue(item)"
    >
      {{ getCurrentValue(item) }}
    </button>

    <!-- 当中间显示的页码数最大小于totalPages - 1时才显示 -->
    <button v-show="startEnd.end < totalPages - 1">...</button>

    <!-- 只有一页时不显示 -->
    <button
      :class="{
        active: myCurrentPage === totalPages,
      }"
      @click="myCurrentPage = totalPages"
      v-show="totalPages > 1"
    >
      {{ totalPages }}
    </button>
    <!-- 下一页按钮 ,当前页码为总页数时则禁用-->
    <button
      @click="myCurrentPage++"
      :class="{ disabled: myCurrentPage === totalPages }"
      :disabled="myCurrentPage === totalPages"
    >
      &gt;
    </button>

    <!-- 改变每页条数 -->
    <select v-model="myPageSize" class="pageSize-select">
      <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
        每页 {{ pageSize }} 条
      </option>
    </select>

    <div class="total-count">共{{ total }}条</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      myCurrentPage: this.currentPage,
      myPageSize: this.pageSize,
      isEmited: false,
    }
  },
  props: {
    // 中划线命名的属性，传递数据时，会自动转换小驼峰命名法
    'current-page': {
      type: Number,
      default: 1,
    },
    'page-size': {
      type: Number,
      default: 5,
    },
    'page-sizes': {
      type: Array,
      // 数组默认值，必须写成函数形式
      default: () => [5, 10, 15, 20],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //总页数
    totalPages() {
      return Math.ceil(this.total / this.myPageSize)
    },
    startEnd() {
      const { totalPages, myCurrentPage } = this

      //先判断总页数小等于1页在判断小等于7页，不同情况返回不同的start、end值
      //end-start+1 为遍历渲染的中间页码的个数
      if (totalPages <= 1) {
        return {
          //
          start: 1,
          end: 0,
        }
      }
      if (totalPages <= 7) {
        return {
          start: 2,
          end: totalPages - 1,
        }
      }

      //总页数大于7时，start值为当前页码-2，且最小为2(此情况为当前页码靠前时发生)
      let start = myCurrentPage - 2
      if (start < 2) {
        start = 2
      }
      //end值设置为start+4，使得中间显示页码数为5
      let end = start + 4
      //此时当end值超过总页数-1，则重置end值，并修改start的值(此情况为当前页码靠后时发生)
      if (end > totalPages - 1) {
        end = totalPages - 1
        start = end - 4
      }

      return {
        start,
        end,
      }
    },
  },
  watch: {
    //监视当前页码，改变时触发Search组件中的自定义事件，并传入新的当前页码
    myCurrentPage(currentPage) {
      //防止因pageSize改变而发送请求
      if (this.isEmited) {
        // 打开开关
        this.isEmited = false
        return
      }
      this.$emit('current-change', currentPage)
    },
    //监视每页条数，改变时触发Search组件中的自定义事件，并传入新的每页条数
    //问题：当当前页码为后几页时，此时改变每页条数，由于myCurrentPage没有改变，且超出总页数，导致页面没有数据
    //解决：修改当前页码，重新发送请求
    myPageSize(pageSize) {
      //修改页码时会触发监视属性，导致发送多次请求
      //设置开关
      if (this.myCurrentPage > this.totalPages) {
        //修改当前页码
        this.myCurrentPage = this.totalPages
        //关闭开关
        this.isEmited = true
      }
      //只是更新当前Pagination组件的当前页码数据，用来发送请求的pageNo没有改变，将最新的页码数据传入以发送请求
      this.$emit('size-change', pageSize, this.myCurrentPage)
    },
  },
  methods: {
    //对结构进行优化而封装的方法
    getCurrentValue(item) {
      return item + this.startEnd.start - 1
    },
  },
}
</script>
<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    outline: none;
    border: none;
    margin: 0 5px;
    width: 30px;
    height: 30px;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
    cursor: pointer;
    &.active {
      background-color: #409eff;
      color: #fff;
    }
    &.disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.pageSize-select {
  appearance: none;
  /*移除轮廓样式*/
  outline: none;
  /*移除点击元素时出现的高亮颜色*/
  border: rem(1) solid #ebebeb;
  border: none;
  width: rem(100);
  height: rem(50);
  line-height: rem(50);
  /*设置一个块元素首行文本内容之前的缩进量，防止紧紧靠在边上*/
  text-indent: rem(4);
  background-color: transparent;
  direction: rtl;
}
.total-count {
  line-height: 31px;
  margin-left: 5px;
}
</style>