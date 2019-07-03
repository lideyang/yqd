<template>
  <div class="my-repayment-list-layer">
    <headerMenu :status="rePayStatus" @change="onChangeRepayStatus"></headerMenu>
    <div class="am-g total-info am-text-center">
      <div class="am-u-sm-6">
        总{{repayStatusText}}本金：<strong>{{totalInfo.rePay|formatCurrency}}</strong>
      </div>
      <div class="am-u-sm-6">
        <span>总{{repayStatusText}}收益</span>
        <strong>：{{totalInfo.income}}</strong>
      </div>
    </div>
    <div class="list-layer">
      <div class="btn-group-layer">
        <div class="btn-group am-cf">
          <a class="am-btn am-btn-lg" @click="onChangeProductType(2)"
             :class="{active:productType===2}">易智投</a>
          <a class="am-btn am-btn-lg" @click="onChangeProductType(1)"
             :class="{active:productType===1}">散标资产</a>
          <i @click="onClickTips" class="icon-font icon-wenhao1 am-text-muted icon"></i>
        </div>
      </div>
      <!--滑动区域-->
      <div ref="mescroll" class="mescroll">
        <!--展示上拉加载的数据列表-->
        <ul id="dataList" class="data-list" v-cloak>
          <li v-for="list in timeDayItem">
            <div class="am-g title">
              <div class="am-u-sm-6 am-text-default">
                <strong>{{list.day|CN_Date}}</strong>
              </div>
              <div class="am-u-sm-6 am-text-secondary am-text-right">
                当日{{repayStatusText}}金额:{{list.rePayTotal|formatCurrency}}
              </div>
            </div>
            <div class="am-g item" v-for="item in list.list" @click="onLinkUrl(item)">
              <div class="am-u-sm-10">
                <p class="name">
                  <badge v-if="item.investType=='1'" :type="item.prdType"/>
                  <strong>{{item|proName}}</strong>
                </p>
                <div class="am-g income">
                  <div class="am-u-sm-6 am-text-default">
                    <span class="am-text-muted">本金</span><strong>{{item.principal|formatCurrency}}元</strong>
                  </div>
                  <div class="am-u-sm-6 am-text-secondary">
                    <span class="am-text-muted">收益</span><strong>{{item.allIncome|formatCurrency}}元</strong>
                  </div>
                </div>
              </div>
              <div class="am-u-sm-2">
                <i class="icon-font icon-next am-fr"></i>
                <span class="am-fr am-text-primary pro" v-if="productType===1">{{item.period}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--tips-->
    <am-alert :is-show.sync="tipsVisible" submit-btn-text="我知道了">
      <p class="am-text-left">&nbsp;&nbsp;&nbsp;&nbsp;易智投服务到期日并不代表实际回款时间，实际回款时间以全部债权退出完成时间为准。</p>
      <p class="am-text-left">&nbsp;&nbsp;&nbsp;&nbsp;易智投的预期回款金额不代表最终收益，最终收益以实际结算金额为准。</p>
    </am-alert>
  </div>
</template>

<script>
  import headerMenu from "@components/myRepayment/headerMenu"
  import {Alert} from "@components/amaze/components/alert"
  import badge from "@components/icon/badge"
  import {formatCurrency} from '@/utils/utils'
  import api from '@api'
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import dayjs from 'dayjs'
  import MeScroll from 'mescroll.js'

  export default {
    data() {
      return {
        markArr: [],
        currentChoseTime: "",
        currentItem: [],
        rePayStatus: 1,
        productType: 2,
        totalInfo: {
          rePay: 0,
          income: 0
        },
        tipsVisible: false,
        timeDayItem: []
      };
    },
    created() {
      setBodyBg('gray-bg')
    },
    destroyed() {
      removeBodyBg('gray-bg')
    },
    mounted() {
      //创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        down: {
          use: false
        },
        up: {
          callback: this.upCallback,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10, //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "dataList", //父布局的id (1.3.5版本支持传入dom元素)
            icon: require("@/assets/icon/no_data.png"), //图标,默认null,支持网络图
            tip: "暂无回款记录~", //提示
          }
        }
      });
    },
    components: {
      headerMenu,
      'am-alert': Alert,
      badge
    },
    computed: {
      repayStatusText() {
        return this.rePayStatus === 1 ? '待收' : '已收'
      }
    },
    watch: {},
    filters: {
      CN_Date(value) {
        if (!value) return ''
        let Date = value.split('/');
        return Date[0] + '年' + Date[1] + '月' + Date[2] + '日'
      },
      proName(item) {
        if (item.investType == "3") {
          return '易智投'
        }
        return item.prdName
      },
      formatCurrency
    },
    methods: {
      //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page) {
        //联网请求
        this.doGetRePayData({
          pageNo: page.num,
          pageSize: page.size
        }).then((response) => {
          //请求的列表数据
          this.doSetListData(response, page);
        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      doGetRePayData(page = {num: 1, size: 10}) {
        let params = Object.assign(page, {
          status: this.rePayStatus,
          investType: this.productType,
        })
        return api.GetMyRepaymentList(params)
      },
      doSetListData(data, page = {num: 1}) {
        if (page.num == 1) {//如果是第一页需手动制空列表
          this.timeDayItem = []
        }

        this.timeDayItem = this.timeDayItem.concat(this.doGetDayList(data.calendars));
        this.totalInfo.rePay = data.amount;
        this.totalInfo.income = data.income;
        console.log(this.totalInfo.rePay)
        let count = 0
        data.calendars.forEach(list => {
          count += list.repayList.length
        })
        //数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          console.log(data.calendars.length)
          console.log(count)
          this.mescroll.endBySize(count, data.count);
        })
      },
      doGetDayList(repayData) {
        let dayObj = {};
        let dayArr = [];
        repayData.forEach(list => {
          list.repayList.forEach(item => {
            let time = dayjs(item.settleDate);//格式化取时间
            let dayTime = time.format('YYYY/MM/DD');
            if (!dayObj[dayTime]) {//赋值每天标的的数组对象 //去重
              dayObj[dayTime] = [];
            }
            dayObj[dayTime].push(item);
          })
        })
        console.log(dayObj)
        for (let day in dayObj) {
          let list = dayObj[day];
          let rePayTotal = 0;//今日总待收
          list.forEach(item => {
            rePayTotal += item.allIncome + item.principal;//今日待收
          })
          console.log(rePayTotal)
          dayArr.push({//返回新结构每日收益数组
            day,
            list,
            rePayTotal
          })
        }
        return dayArr
      },
      onLinkUrl(item) {
        if (item.investType == "1") {
          if (item.debtStatus == "3") {
            window.location.href = '/member/transfer/info/' + item.prdId
          } else {
            window.location.href = '/member/invest/invest-details/' + item.loanId + '/' + item.prdId
          }
        } else {
          window.location.href = '/member/plan/autobidDetail/' + item.prdId
        }
      },
      onChangeRepayStatus(status) {
        this.rePayStatus = status;//修改还款状态
        this.doGetRePayData().then((response) => {
          //请求的列表数据
          this.doSetListData(response);
        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      onChangeProductType(type) {
        this.productType = type;//修改还款状态
        this.doGetRePayData().then((response) => {
          //请求的列表数据
          this.doSetListData(response);

        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      onClickTips() {
        this.tipsVisible = true
      }
    }
  };
</script>

<style lang="less">
  @import "~@/style/less/views/user/myRepayment/list.less";
</style>
