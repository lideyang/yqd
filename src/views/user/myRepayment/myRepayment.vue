<template>
  <div class="my-repayment-layer">
    <container title="我的回款" icon="fz" @onClickRightBtn="onClickTitleIcon">
      <calendar
        ref="Calendar"
        :markDate="markArr"
        @choseDay="clickDay"
        @changeMonth="changeDate"
      ></calendar>
      <!--      <p class="tips am-text-danger am-text-center">提醒:实际收款日为到期后的三个工作日内</p>-->
      <div class="total-layer am-text-center am-g">
        <div class="am-u-sm-3">
          <p class="am-text-xs">今日待收</p>
          <strong class="am-text-default">{{todayRePay}}</strong>
        </div>
        <div class="am-u-sm-3">
          <p class="am-text-xs">今日已收</p>
          <strong class="am-text-default">{{todayAlreadyPay}}</strong>
        </div>
        <div class="am-u-sm-3">
          <p class="am-text-xs">本月待收</p>
          <strong class="am-text-default">{{currentMonthRepay}}</strong>
        </div>
        <div class="am-u-sm-3">
          <p class="am-text-xs">本月已收</p>
          <strong class="am-text-default">{{currentMonthAlreadyPay}}</strong>
        </div>
      </div>
      <div v-if="currentItem.length" class="re-pay-list-layer">
        <div class="am-g time">
          <div class="am-u-sm-6">
            {{currentChoseTime|CN_Date}}
            <v-popover placement="top">
              <i class="icon-font icon-wenhao1"></i>
              <template slot="popover">
                <p>易智投服务到期日并不代表实际回款时间，实际回款时间已全部债权退出完成时间为准。</p>
                <p>易智投的预期回款金额不代表实际收益，实际收益基于其匹配出借标的收益总和，于到期日当天进行结算。</p>
              </template>
            </v-popover>
          </div>
          <div class="am-u-sm-6 am-text-right">
            <span class="am-btn btn-secondary am-btn-xs am-radius">共{{currentItem.length}}笔</span>
          </div>
        </div>
        <div v-if="rePayList.length" class="pay-list re-pay-list">
          <div class="am-g list" v-for="item in rePayList" @click="onLinkUrl(item)">
            <div class="am-u-sm-9">
              <p class="am-text-default am-text-nowrap name">
                <badge :type="item.prdType"/>
                {{item.prdName}}
              </p>
              <div class="am-g income">
                <div class="am-u-sm-6 am-text-nowrap am-text-dark">
                  <span class="am-text-muted">本金</span><strong>{{item.principal|formatCurrency}}元</strong>
                </div>
                <div class="am-u-sm-6 am-text-nowrap am-text-dark">
                  <span class="am-text-muted">收益</span><strong>{{item.allIncome}}元</strong>
                </div>
              </div>
            </div>
            <div class="am-u-sm-3 am-text-center status">
              <button class="am-btn am-btn-secondary am-btn-xs am-radius status-btn">待回款</button>
              <i class="icon-font icon-next am-text-muted"></i>
            </div>
          </div>
        </div>
        <div v-if="alreadyPayList.length" class="pay-list already-pay-list">
          <div class="am-g list" v-for="item in alreadyPayList" @click="onLinkUrl(item)">
            <div class="am-u-sm-9">
              <p class="am-text-default am-text-nowrap name">
                <badge :type="item.prdType"/>
                {{item.prdName}}
              </p>
              <div class="am-g income">
                <div class="am-u-sm-6 am-text-nowrap am-text-dark">
                  <span class="am-text-muted">本金</span><strong>{{item.principal|formatCurrency}}元</strong>
                </div>
                <div class="am-u-sm-6 am-text-nowrap am-text-dark">
                  <span class="am-text-muted">收益</span><strong>{{item.allIncome}}元</strong>
                </div>
              </div>
            </div>
            <div class="am-u-sm-3 am-text-center status">
              <button class="am-btn btn-disabled2 am-btn-xs am-radius status-btn">已回款</button>
              <i class="icon-font icon-next am-text-muted"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="am-text-center no-data">
        <img src="@/assets/icon/no_data.png"/>
        <p>当日无回款记录~</p>
      </div>
    </container>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import calendar from "@components/common/calendar"
  import badge from "@components/icon/badge"
  import {formatCurrency} from '@/utils/utils'
  import api from '@api'
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import dayjs from 'dayjs'

  let timeDayItem = {};//每天的标的数据
  let monthDayItem = {}//每月的标的数据
  export default {
    data() {
      return {
        markArr: [],//所有有回款的日期
        currentChoseTime: "",//当前选中时间
        currentItem: [],//存储当日列表数据
        currentMonth: '',
        today: ''
      };
    },
    components: {
      calendar,
      container,
      badge
    },
    computed: {
      rePayList() {//当日待收列表计算
        return this.currentItem && this.currentItem.filter(item => item.investStatus !== "4");
      },
      alreadyPayList() {//当日已收列表计算
        return this.currentItem && this.currentItem.filter(item => item.investStatus === "4");
      },
      todayRePay() {//今日待收计算
        return this.rePayList && this.rePayList.reduce((value, item) => {
          return item.principal + item.allIncome + value;
        }, 0).toFixed(2);
      },
      todayAlreadyPay() {//今日已收
        return this.alreadyPayList && this.alreadyPayList.reduce((value, item) => {
          return item.principal + item.allIncome + value;
        }, 0).toFixed(2);
      },
      currentMonthRepay() {//当月待收
        console.log('当月', this.currentMonth)
        if (monthDayItem[this.currentMonth]) {
          return monthDayItem[this.currentMonth].filter(item => item.investStatus !== "4").reduce((value, item) => {
            return item.principal + item.allIncome + value;
          }, 0).toFixed(2);
        }
        return "0"
      },
      currentMonthAlreadyPay() {//当月已收
        if (monthDayItem[this.currentMonth]) {
          return monthDayItem[this.currentMonth].filter(item => item.investStatus === "4").reduce((value, item) => {
            return item.principal + item.allIncome + value;
          }, 0).toFixed(2);
        }
        return "0"
      }
    },
    watch: {
      currentChoseTime(value) {
        let choseTime = timeDayItem[value];//选中某天,有值切换状态
        if (choseTime) {
          this.currentItem = choseTime;
        } else {
          this.currentItem = [];
        }
      }
    },
    filters: {
      CN_Date(value) {//显示中国日期
        if (!value) return ''
        let Date = value.split('/');
        return Date[0] + '年' + Date[1] + '月' + Date[2] + '日'
      },
      formatCurrency
    },
    methods: {
      clickDay(date) {//点击日历选中时间
        this.currentChoseTime = date;
      },
      async changeDate(date) {//左右切换月份
        console.log('左右切换月份', date);
        await this.doGetMonthDate(date);
        this.currentMonth = dayjs(date).format('YYYY/M')
        if (this.currentMonth === dayjs(this.today).format('YYYY/M')) {//当前切换的月份等于今日的月份，选中今日
          this.currentChoseTime = this.today
        }else{
          let firstDay=32
          this.markArr.forEach(item=>{
            let timeArr=item.split('/');
            let month=timeArr[0]+'/'+timeArr[1]
            let day=timeArr[2]
            if(month===this.currentMonth){
              if(day<firstDay){//找出当月最小有回款的日期
                firstDay=day
              }
            }
          })
          console.log(firstDay)
          if(firstDay===32){//如果当前切换的月份没有回款选中
            firstDay=1//选着一号
          }
          let choseTime=this.currentMonth+'/'+firstDay
          this.doSetTime(choseTime)
        }
        //this.currentChoseTime = date;
        //this.doSetTime(date);
      },
      doSetTime(data) {
        this.$refs.Calendar.ChoseDay(data); //跳到12月12日选中12月12日
      },
      doGetMarkTime(repayData) {
        let markTimeArr = [];
        timeDayItem={}
        monthDayItem={}//初始重置数据
        repayData.forEach(item => {//格式化取时间
          let time = dayjs(item.settleDate);
          let dayTime = time.format('YYYY/M/D');
          let monthTime = time.format('YYYY/M');
          markTimeArr.push(dayTime);
          if (!timeDayItem[dayTime]) {//赋值每天标的的数组对象
            timeDayItem[dayTime] = [];
          }
          timeDayItem[dayTime].push(item);
          if (!monthDayItem[monthTime]) {//赋值每月标的的数组对象
            monthDayItem[monthTime] = []
          }
          monthDayItem[monthTime].push(item);
        })
        //去重
        this.markArr = Array.from(new Set(markTimeArr));
        console.log('标记回款日期:' + this.markArr)
        console.log('月份数据:', monthDayItem)
        console.log('天回款数据', timeDayItem)
      },
      async doGetMonthDate(time = '') {
        let currentTime = dayjs(time).format('YYYY-MM-DD');
        return api.GetMyRepayment({
          date: currentTime
        }).then((response) => {
          //console.log(response.data)
          this.doGetMarkTime(response);
        })
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
      onClickTitleIcon() {
        this.$router.push({path: '/user/myRepaymentList'})
      }
    },
    async created() {
      setBodyBg()//设置背景色
      this.today = dayjs().format('YYYY-MM-DD')
      await this.doGetMonthDate(this.today)//先请求数据再赋值当前选中时间
      this.currentChoseTime = this.today
      this.currentMonth = dayjs().format('YYYY/M')//设置当月
    },
    destroyed() {
      removeBodyBg()
    }
  };
</script>

<style lang="less">
  @import "~@/style/less/views/user/myRepayment/index.less";
</style>
