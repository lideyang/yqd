<template>
  <div class="user-center-layer">
    <!--内容开始-->
    <div class="header">
      <div class="main">
        <div class="am-g name">
          <div class="am-u-sm-10">
            <a class="link-white" href="/member/secure/security">
              <img :src="headerPic"/>
              <span class="mobile">{{userNameText}}</span>
            </a>
          </div>
          <div class="am-u-sm-2 am-text-right">
            <a class="link-white" href="/static/more">更多</a>
          </div>
        </div>
        <div class="am-g assets">
          <div class="am-u-sm-12 link-layer total-invert">
            <a class="title" href="/member/account/userAssets">
              <p>
                <span class="vertical-middle">
                    总资产(元)
                </span>
                <i @click.prevent="onToggleShoeMoney" class="icon-font vertical-middle" :class="isShowMoney?'icon-eye-open':'icon-eye-close'"></i>
              </p>
              <h2>
               <span class="egg-status">
                   {{totalAmountText}}
                </span>
              </h2>
              <i class="icon-font icon-next"></i>
            </a>
          </div>
          <div class="am-u-sm-7 link-layer">
            <a class="title" href="javascript:;;">
              <p>
                <span>
                   累计收益(元)
                </span>
              </p>
              <h3>
                <span class="egg-status">
                  {{totalIncomeText}}
                </span>
              </h3>
            </a>
          </div>
          <div class="am-u-sm-5 link-layer">
            <a class="title" href="javascript:;;">
              <p>
                  <span>
                     昨日收益(元)
                  </span>
              </p>
              <h3>
                <span class="egg-status" data-amount="0.25">
                  {{yesDayIncomeText}}
                </span>
              </h3>
            </a>
          </div>
        </div>
      </div>
      <!--公告-->
      <div class="notice" v-if="cashingAmount||arrivingCoupon">
        <ul>
          <li class="use-red" v-if="cashingAmount">
            <i class="icon-font icon-laba"></i>您有<span class="am-text-danger">{{cashingAmount|formatCurrency}}</span>元提现资金正在处理中
          </li>
          <li class="use-red" v-if="arrivingCoupon">
            <i class="icon-font icon-laba"></i>您有<span class="am-text-danger">{{arrivingCoupon|formatCurrency}}</span>元红包现金，将在出借项目起息后到账
          </li>
        </ul>
      </div>
    </div>
    <!--是否完成风险评估-->
    <div class="am-g risk am-text-center" v-if="!assessStatus&&isShowRiskAssessLayer">
      <div class="am-u-sm-12">
        <i @click="isShowRiskAssessLayer=false" class="icon-font icon-close"></i>
        <p>您尚未完成风险承受能力评估</p>
        <a class="am-btn am-btn-secondary am-round btn-go" href="${tzp.getContextPath()}/member/auth/risk-ass">去评估</a>
      </div>
    </div>
    <div class="menu">
      <div class="list">
        <div class="am-g">
          <div class="am-u-sm-7 re-pay">
            <div class="re-pay-layer">
              <p>可用余额(元)：<strong class="egg-status">{{amountText}}</strong></p>
            </div>
          </div>
          <div class="am-u-sm-5 am-text-center recharge-layer">
            <a class="am-btn am-radius btn-disabled2" href="/member/account/cash">提现</a>
            <a class="am-btn am-btn-secondary am-radius" @click="$router.push('/user/recharge')" href="javascript:;">充值</a>
          </div>
        </div>
      </div>
      <div class="grid-layer">
        <div class="am-g">
          <div class="am-u-sm-6 grid">
            <a href="/member/plan/autobid">
              <div class="info-layer">
                <h2><i class="icon-font icon-take am-text-primary"></i><span class="am-text-default">我的易智投</span></h2>
                <p class="am-text-nowrap am-text-muted">
                  待收<span class="egg-status am-text-default">{{planRepayText}}</span>元
                </p>
              </div>
            </a>
          </div>
          <div class="am-u-sm-6 grid">
            <a href="/member/invest/hold-list">
              <div class="info-layer">
                <h2><i class="icon-font icon-invest2 am-text-primary"></i><span class="am-text-default">散标资产</span></h2>
                <p class="am-text-nowrap am-text-muted">
                  待收<span class="egg-status am-text-default">{{repayText}}</span>元
                </p>
              </div>
            </a>
          </div>
          <div class="am-u-sm-6 grid">
            <a @click.prevent="$router.push({path: '/user/myRepayment'})">
              <div class="info-layer">
                <h2 class="flow"><i class="icon-font icon-returned am-text-primary"></i><span class="am-text-default">我的回款</span>
                </h2>
              </div>
            </a>
          </div>
          <div class="am-u-sm-6 grid">
            <a href="/member/trade/index">
              <div class="info-layer">
                <h2 class="flow"><i class="icon-font icon-trsaction am-text-primary"></i><span class="am-text-default">交易流水</span>
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="list active">
        <ul class="am-avg-sm-3 am-thumbnails">
          <li>
            <a id="myTask" href="/task/list">
              <i class="icon-font icon-clipboard am-text-primary"></i>
              <h2><span class="vertical-middle">任务中心</span></h2>
              <span v-if="remainderAmt>0" class="am-badge am-round am-badge-danger tips">￥{{remainderAmt|formatCurrency}}</span>
              <span v-else class="am-badge am-round am-badge-danger tips">new</span>
            </a>
          </li>
          <li>
            <a @click.prevent="$router.push({path: '/user/myCoupons'})">
              <i class="icon-font icon-wallet am-text-primary"></i>
              <h2 class="flow">优惠券</h2>
              <span v-if="count>0" class="am-badge am-round am-badge-danger tips">{{count}}</span>
            </a>
          </li>
          <li>
            <a @click.prevent="onClickLinkRecommendHandle">
              <i class="icon-font icon-love-letter am-text-primary"></i>
              <h2>邀请有奖</h2>
              <span v-if="todayAmt>0" class="am-badge am-round am-badge-danger tips">+{{todayAmt|formatCurrency}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--客服热线-->
    <div class="am-g kefu am-text-center">
      <p class="am-text-primary tel">客服热线：<a class="am-text-primary" :href="'tel:'+serviceTelephone">{{serviceTelephone}}</a>
      </p>
      <p class="am-text-muted time">
        工作时间：周一至周五 {{serviceTime}}
      </p>
    </div>
    <p class="am-text-muted am-text-center xw-tips">资金已由新网银行存管，安全更合规</p>
    <footerMenu :status="3"/>
    <!--开通存管modal-->
    <depository-modal @visibleChange="onChangeDepositoryModalVisible" :modalVisible="depositoryModalVisible" :isClickShow="false"></depository-modal>
  </div>
</template>

<script>
  import footerMenu from '@layout/footerMenu.vue'
  import depositoryModal from "@components/common/depositoryModal"
  import container from "@components/layout/container"
  import {setBodyStyleBg, removeBodyStyleBg} from '@/utils/setBodyBg'
  import {formatCurrency, formatBigMoney} from '@/utils/utils'
  import api from '@api'
  import localStore from '@/utils/localStore'
  import dayjs from 'dayjs'
  import {mapActions, mapGetters, mapState} from "vuex"

  export default {
    name: 'Index',
    components: {
      container,
      footerMenu,
      depositoryModal
    },
    filters: {
      formatCurrency
    },
    data() {
      return {
        isShowMoney: true,
        totalAmount: '',
        totalIncome: '',
        yesDayIncome: '',
        amount: '',
        planRepay: '',
        repay: '',
        depositoryModalVisible: false,
        isShowRiskAssessLayer: true,
        cashingAmount: '',
        arrivingCoupon: '',
        todayAmt: 0,
        serviceTelephone: "",
        serviceTime: "",
        count: 0,
        remainderAmt: 0,
        headerPic: require('@/assets/icon/header.png')
      }
    },
    created() {
      setBodyStyleBg('#f9f9f9');
      console.log(localStore.get('isShowMoney'));
      if (localStore.get('isShowMoney') !== null) {//本地存储是否显示金额
        this.isShowMoney = localStore.get('isShowMoney')
      }
      api.GetUserCenter().then(response => {
        if (response.success) {
          let data = response.data;
          this.setUserName(data.nickName || '')
          this.setUserAssessStatus(data.isAssess)
          this.setUserDepositaryStatus(data.isDepositary)
          this.totalAmount = data.totalAsset;
          this.totalIncome = data.obtainIncome;
          this.yesDayIncome = data.yesterdayIncome;
          this.amount = data.availableAmt;
          this.planRepay = data.hplanPrinInter;
          this.repay = data.debtPrinInter;
          this.cashingAmount = data.cashingAmount;
          this.arrivingCoupon = data.arrivingCoupon;
          this.todayAmt = data.todayAmt;
          this.serviceTelephone = data.serviceTelephone;
          this.serviceTime = data.serviceTime;
          this.count = data.count;
          this.remainderAmt = data.remainderAmt;
          if (data.picUrl) {
            this.headerPic = data.picUrl
          }
          //每天只一次存管提示
          if (!this.depositoryStatus) {
            let storageTime = localStorage.getItem('todayIsShowModal')
            if (storageTime) {
              let currentDate = dayjs().format('YYYY/M/D');
              let storageTime = dayjs(storageTime).format('YYYY/M/D');
              if (storageTime != currentDate) {//判断时间是否是同一天
                localStorage.setItem('todayIsShowModal', currentDate);
                this.depositoryModalVisible = true;//显示存管灯箱
              }
            } else {
              localStorage.setItem('todayIsShowModal', dayjs());
              this.depositoryModalVisible = true;
            }
          }
        } else {
          this.setUserID('false')
          this.$router.push({
            path: '/account/login'
          })
        }
      })
    },
    computed: {
      ...mapState({
        userName: state => state.user.name,
        userMobile: state => state.user.mobile,
        assessStatus: state => state.user.assessStatus,
        depositoryStatus: state => state.user.depositoryStatus
      }),
      totalAmountText() {
        return this.isShowMoney ? formatBigMoney(this.totalAmount) : '*****'
      },
      totalIncomeText() {
        return this.isShowMoney ? formatBigMoney(this.totalIncome) : '*****'
      },
      yesDayIncomeText() {
        return this.isShowMoney ? formatBigMoney(this.yesDayIncome) : '*****'
      },
      amountText() {
        return this.isShowMoney ? formatBigMoney(this.amount) : '*****'
      },
      planRepayText() {
        return this.isShowMoney ? formatBigMoney(this.planRepay) : '*****'
      },
      repayText() {
        return this.isShowMoney ? formatBigMoney(this.repay) : '*****'
      },
      userNameText() {
        return this.userName || this.userMobile
      }
    },
    methods: {
      ...mapActions(['setUserName', 'setUserAssessStatus', 'setUserDepositaryStatus', 'setUserID']),
      onToggleShoeMoney() {
        this.isShowMoney = !this.isShowMoney;
        localStore.set('isShowMoney', this.isShowMoney)
      },
      onChangeDepositoryModalVisible(visible) {
        this.depositoryModalVisible = visible
      },
      onClickLinkRecommendHandle() {
        window.location.href = '/spa/recommend/info'
      }
    },
    mounted() {
    },
    destroyed() {
      removeBodyStyleBg()
    },
  }
</script>

<style lang="less">
  @import "~@/style/less/views/user/center.less";
</style>
