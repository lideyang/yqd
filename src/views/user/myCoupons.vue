<template>
  <div class="my-coupons-layer">
    <container title="优惠券">
      <div class="am-tabs my-coupons-tabs">
        <ul class="am-tabs-nav am-nav am-nav-tabs">
          <li @click="onClickTabs(1)" :class="couponsType===1?'am-active':''"><a href="javascript:;"
                                                                                 class="am-text-center">红包</a></li>
          <li @click="onClickTabs(2)" :class="couponsType===2?'am-active':''"><a href="javascript:;"
                                                                                 class="am-text-center">奖励券</a></li>
        </ul>
        <p class="am-text-center" v-if="couponsStatus===1">
          您共使用<span class="am-text-warning">{{useCount}}</span>个优惠券，已为您多赚取<span class="am-text-warning">{{totalAmount}}</span>元
        </p>
        <div class="am-tabs-bd">
          <div class="am-tab-panel am-fade" :class="tabsLoading?'':'am-in am-active'">
            <div class="am-container product-choose-ticket">
              <div id="mescroll" ref="mescroll" class="product-choose-list mescroll">
                <ul ref="myCouponsList" v-cloak>
                  <li v-for="item in couponsList" :class="{gray:couponsStatus!==1}">
                    <div class="am-g invest">
                      <div class="am-u-sm-3 am-text-center icon" :class="{'icon-jiaxi':couponsType===2}">
                        <span class="am-text-danger am-text-nowrap num">{{awardAmountText(item.awardAmount)}}</span>
                        <i class="icon-red"></i>
                      </div>
                      <div class="am-u-sm-9 info">
                        <p class="title require">{{item.limitPeriodStr}}</p>
                        <p class="am-text-default am-text-sm">{{item.limitPeriodRemarkStr}}<br>{{item.actName}}</p>
                        <p class="am-text-muted am-text-sm day">有效期至：{{item.deadTimeYMDStr}}</p>
                      </div>
                    </div>
                    <img v-if="item.useStatus!=0||item.isValid!=1" class="use-icon" :src="item.useStatus|typeIconUrl">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-navbar">
        <ul class="am-avg-sm-2" :class="{'his-menu':couponsStatus===2}">
          <li>
            <a @click="onClickChangeStatus" href="javascript:;;" class="am-btn am-btn-default am-round">{{btnText}}</a>
          </li>
          <li>
            <a @click="$router.push('/product/auto')" class="am-btn am-btn-secondary am-round">
              立即出借
            </a>
          </li>
        </ul>
      </div>
    </container>
  </div>
</template>

<script>
  import container from "@/components/layout/container"
  import {formatDateToSecond, formatCurrency, toJson} from '@/utils/utils'
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import MeScroll from 'mescroll.js'
  import api from '@api'

  let isOpenTabs = [1];
  let mescrollArr = []
  export default {
    name: "index",
    data() {
      return {
        totalCount: 0,
        totalAmount: 0,
        useCount: 0,
        couponsList: [],
        couponsType: 1,//默认红包
        couponsStatus: 1,//默认可用
        tabsLoading:false
      }
    },
    components: {
      container
    },
    created() {
      setBodyBg('gray-bg')
    },
    mounted() {
      this.setScrollList({
        meScroll: this.$refs['mescroll'],
        empty: this.$refs['myCouponsList']
      }, {
        status: this.couponsStatus,
        awardType: this.couponsType
      })
    },
    filters: {
      formatCurrency,
      typeIconUrl(useStatus) {
        console.log(useStatus)
        if (useStatus == 1) {
          return require('@/assets/icon/used_red.png')
        }
        return require('@/assets/icon/expired_red.png')
      }
    },
    computed: {
      btnStatusText() {
        if (this.couponsStatus === 1) {
          return '历史记录'
        }
        return '查看可用'
      },
      btnTypeText() {
        if (this.couponsType === 1) {
          return '红包'
        }
        return '奖励券'
      },
      btnText() {
        if (this.couponsStatus === 1) {
          return this.btnTypeText + this.btnStatusText
        }
        return this.btnStatusText + this.btnTypeText
      }
    },
    watch: {
      couponsType(value) {
        this.doChangeStatus()
      },
      couponsStatus(value) {
        this.doChangeStatus()
      },
    },
    methods: {
      setScrollList(ref, params) {
        //创建MeScroll对象
        mescrollArr[ref.meScroll.id] = new MeScroll(ref.meScroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
          // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
          up: {
            callback: this.upCallback.bind(this),
            // 以下是一些常用的配置,当然不写也可以的.
            page: {
              num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
              size: 10, //每页数据条数,默认10
            },
            htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
            noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            empty: {
              //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
              warpId: ref.empty, //父布局的id (1.3.5版本支持传入dom元素)
              icon: require("@/assets/icon/no_data.png"), //图标,默认null,支持网络图
              tip: "暂无相关数据~", //提示
            }
          }
        });
      },
      //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        //联网请求
        api.GetCouponTicketList(Object.assign({pageNo: page.num}, {
          status: this.couponsStatus,
          awardType: this.couponsType + 1
        })).then(response => {
          let result = toJson(response);
          this.doSetListData(result, page);
          this.tabsLoading=false
          //数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endBySize(this.couponsList.length, result.count);
          })
        }).catch((e) => {
          this.tabsLoading=false
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        })
      },
      doSetListData(data, page) {
        if (page.num == 1) {//如果是第一页需手动制空列表
          this.couponsList = []
        }
        this.couponsList = this.couponsList.concat(data.data);
        this.totalCount = data.count
        this.totalAmount = data.coupon
        this.useCount = data.useCount
      },
      doChangeStatus() {
        mescrollArr['mescroll'].resetUpScroll(false)//刷新数据列表
      },
      onClickTabs(type) {
        this.tabsLoading=true//切换的时候先隐藏列表，不然页面红包奖励券状态有延迟
        this.couponsType = type
      },
      onClickChangeStatus() {
        this.couponsStatus = this.couponsStatus === 1 ? 2 : 1
      },
      awardAmountText(awardAmount){
        if (this.couponsType === 1) {
          return '￥'+formatCurrency(awardAmount,false)
        }
        return awardAmount+'%'
      }
    },
    destroyed() {
      removeBodyBg('gray-bg')
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/user/myCoupons.less";
</style>
