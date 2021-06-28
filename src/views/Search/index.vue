<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 搜索条件 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- keyword -->
            <li class="with-x" v-show="$route.params.keyword">
              {{ $route.params.keyword }}<i @click="delKeyword">×</i>
            </li>
            <!-- categoryName -->
            <li class="with-x" v-show="$route.query.categoryName">
              {{ $route.query.categoryName }}<i @click="delCategoryName">×</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-show="options.trademark">
              {{ options.trademark.split(':')[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <!-- props -->
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="index"
            >
              {{ `${prop.split(':')[2]}:${prop.split(':')[1]}`
              }}<i @click="delProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索条件选择器 
            props
            自定义事件
        -->
        <SearchSelector @search="search" :options="options" />

        <!-- 商品列表 -->
        <div class="details clearfix">
          <!-- 商品列表头部：排序功能 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{
                    //为1时，激活active样式
                    active: order.orderName === '1',
                  }"
                  @click="setOrder('1')"
                >
                  <a
                    ><span>综合</span
                    ><span
                      v-show="order.orderName === '1'"
                      :class="[
                        //动态类名，切换排序图标的样式
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    ></span
                  ></a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: order.orderName === '2' }"
                  @click="setOrder('2')"
                >
                  <a
                    ><span>价格</span
                    ><span
                      v-show="order.orderName === '2'"
                      :class="[
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表详情 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link
                      :to="{
                        name: 'Detail',
                        params: {
                          id: good.id,
                        },
                      }"
                    >
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <Pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="options.pageNo"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="options.pageSize"
              :total="total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TypeNav from '../../components/TypeNav'
import Pagination from '../../components/Pagination'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  components: {
    TypeNav,
    SearchSelector,
    Pagination,
  },
  data() {
    return {
      // 搜索条件
      options: {
        props: [],
        trademark: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 5,
      },
    }
  },
  computed: {
    ...mapState('search', ['goodsList', 'total']),
    order() {
      // 例如：['1', 'desc'] [orderName, orderType]
      const [orderName, orderType] = this.options.order.split(':')
      return {
        orderName,
        orderType,
      }
    },
  },
  methods: {
    ...mapActions('search', ['searchGoodsList']),
    //设置默认值，防止不传参时导致报错
    search(newOptions = {}) {
      //SearchSelector组件中调用search时可能传入的是trademark或prop数据

      const options = {
        //合并新旧筛选条件(重复属性名，新的会覆盖旧的)
        ...this.options,
        ...newOptions, // prop和trademark
      }

      // 发送请求需要的参数是props， 传入的是prop
      if (newOptions.prop) {
        options.props.push(newOptions.prop)
        // 删除多余的属性
        delete options.prop
      }
      //更新，将最新的筛选条件存储起来
      this.options = options
      //发送请求，传入最新的搜索条件
      this.searchGoodsList({
        //包含合并后的props和trademark
        ...options,
        //路由参数和query参数
        ...this.$route.query,
        ...this.$route.params,
      })
    },

    /*
      问题：当页面的搜索条件发生变化（query、params、删除条件）
      不会重新搜索
      解决：
        1. 当 query、params 发生变化，重新搜索  
          监视$route
        2. 删除条件
          手动调用搜索方法
    */
    delKeyword() {
      //清除params参数
      this.$router.history.push({
        //不传params参数
        name: 'Search',
        query: this.$route.query,
      })
    },
    delCategoryName() {
      this.$router.history.push({
        // 不传query参数
        name: 'Search',
        params: this.$route.params,
      })
    },
    delTrademark() {
      //清空trademark
      this.options.trademark = ''
      this.search()
    },
    delProp(index) {
      //根据下标删除props中的prop数据
      this.options.props.splice(index, 1)
      this.search()
    },
    //设置排序
    setOrder(orderName) {
      if (this.order.orderName === orderName) {
        //再次点击，如果点击的相同的orderName，orderType要取反
        this.options.order = `${orderName}:${
          this.order.orderType === 'asc' ? 'desc' : 'asc'
        }`
      } else {
        // 如果点击的是不同的orderName,orderType默认为desc
        this.options.order = `${orderName}:desc`
      }
      this.search()
    },
    //当前页码改变触发的事件，传入最新的当前页码，重新发送请求
    handleCurrentChange(pageNo) {
      this.search({ pageNo })
    },
    //每页页码数量改变触发的事件，传入最新的每页页码数量，重新发送请求
    handleSizeChange(pageSize, pageNo) {
      this.search({ pageNo, pageSize })
    },
  },
  //开始就要触发一次，否则没有数据
  mounted() {
    this.search()
  },
  watch: {
    $route() {
      this.search()
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        height: 66px;
        overflow: hidden;
      }
    }
  }
}
</style>