<template>
  <div class="product-auto-confirm-layer">
    <container title="委托出借确认">
      <div class="am-container product-confirm" id="productConfirm">
        <div class="am-g item">
          <div class="title">
            <ul>
              <li>
                {{productInfo.title}}
              </li>
              <li>
                <strong>剩余可委托金额：{{productInfo.remainAmount|formatCurrency}}元</strong>
              </li>
            </ul>
          </div>
          <div class="product-confirm-money">
            <div class="am-g item">
              <div class="am-u-sm-12 am-text-muted">
                可用余额：<span class="am-text-default">{{accountAmt}}元</span>
                <span class="am-text-primary recharge-btn" v-show="isShowRechargeBtn"
                      @click="onClickRechargeHandle">充值</span>
              </div>
            </div>
          </div>
          <div class="am-g item invest-money">
            <div class="am-u-sm-10 money-li">
              <label class="am-text-muted">￥</label>
              <input v-model="params.amount" type="tel" name="money" :placeholder="investInputPlaceholder"
                     class="money vertical-middle">
            </div>
            <div class="am-u-sm-2 am-text-center max-invest">
              <span class="am-text-primary" @click="onClickMaxBtnHandle">全投</span>
            </div>
          </div>
          <div class="am-g item red">
            <div class="am-u-sm-6">
              <h3 class="am-text-muted">选择优惠券</h3>
              <v-popover>
                <i v-tooltip style="margin:0 0 0 2px" class="icon-font icon-information am-text-muted"></i>
                <template slot="popover">
                  平台自动匹配的红包/奖励券不保证符合您的最优选择，以您实际确认使用为准
                </template>
              </v-popover>
            </div>
            <div class="am-u-sm-6 am-text-right" @click="onClickShowCouponHandle">
              <span class="reward-text">{{doCountCouponText}}</span>
              <i class="icon-font icon-next am-text-muted"></i>
            </div>
          </div>
        </div>
        <div class="product-confirm-money">
          <div class="am-g item">
            <div class="am-u-sm-12 am-text-muted">
              预期收益：<span class="am-text-default">{{totalIncome}}元</span>
            </div>
          </div>
        </div>
        <div class="product-confirm-btn">
          <div class="am-g">
            <div class="am-u-sm-12">
              <am-checkbox v-model="params.agreeAgreement">
                <span class="vertical-align am-text-xs">阅读并同意</span>
                <a class="am-text-primary vertical-middle am-text-xs" :href="'/contract/exchange?assetsId='+params.prdId">《借款协议》</a><a class="am-text-primary am-text-xs vertical-middle" href="/contract/debt-risk">《风险及禁止性行为提示书》</a>
              </am-checkbox>
            </div>
          </div>
          <am-button :loading="submitBtn.loading" :disabled="submitBtnDisable" loading-text="请稍后..."
                     @click="onClickSubmitBtn"
                     class="am-btn am-btn-secondary am-radius am-btn-block am-btn-xl submit-btn">立即出借
          </am-button>
          <p class="am-text-center am-text-muted">市场有风险，出借需谨慎</p>
        </div>
      </div>
      <div class="am-container product-choose-ticket">
        <h2 class="am-titlebar-title" id="backConfirmBtn">
          <i class="icon-font icon-prev am-text-secondary"></i>
          <span class="am-text-secondary">返回出借页</span>
        </h2>
        <!--不使用优惠券-->
        <div class="am-g no-use-layer" id="noUseLayer">
          <div class="am-u-sm-11 info">
            不使用优惠券
          </div>
          <div class="am-u-sm-1 am-text-center choose">
            <i class="icon-font icon-right am-text-muted"></i>
          </div>
        </div>
        <ul class="product-choose-list" id="redboxList">
        </ul>

        <ul class="product-choose-list choose-jiaxi-list" id="jiaxiList">
        </ul>
      </div>
    </container>
    <!--红包-->
    <coupon-action-list v-show="isShowCouponListLayer" :productInfo="doCountProductInfoParams"
                        :voucher-list="voucherList" :ticket-list="ticketList"
                        @onCancelAllChoose="onCancelCouponChooseHandle"
                        @changeCoupon="onChangeCouponHandle" @onCloseLayer="onCloseCouponListHandle">
    </coupon-action-list>
    <!--风险提示-->
    <am-modal @visible-change="onChangeAssessStatusModalVisible" :isShow="assessStatusModalVisible" :closeBtn="false"
              :width="3" cssUnit="rem">
      <am-modal-body>
        <risk-assessment-modal></risk-assessment-modal>
      </am-modal-body>
    </am-modal>
    <!--风险提示-->
    <am-modal class="assess-limit-modal" @visible-change="onChangeAssessLimitModalVisible" :isShow="assessLimitModalVisible" :closeBtn="false"
              :width="3" cssUnit="rem">
      <p>您的风险承受能力为<span class="text-danger">{{riskType}}</span>，相对应的出借金额上限为<span class="text-danger">{{userAssessLimit}}万元</span>
      </p>
      <p>
        当前累计已出借<span class="text-danger">{{totalDue|formatCurrency}}元</span>,请修改出借金额或重新进行<a class="text-primary" href="/member/auth/risk-ass">风险评测</a>
      </p>
      <p style="margin:30px 0 0" class="am-text-center">
        <button class="am-btn am-btn-primary" @click="assessLimitModalVisible=false">我知道了</button>
      </p>
    </am-modal>
    <!--tips-->
    <am-alert :is-show.sync="tipsVisible" submit-btn-text="我知道了" @submit="onClickTipsAlertHandle">
      <p class="am-text-center">{{tipsText}}</p>
    </am-alert>
    <am-confirm :is-show.sync="rechargeConfirmVisible" @confirm="onClickRechargeHandle" confirmBtnText="去充值">
      <h4>{{'可用余额不足，仍需充值'+rechargeAmount+'元'}}</h4>
    </am-confirm>
  </div>
</template>

<script>
  import container from '@layout/container'
  import footerMenu from '@layout/footerMenu'
  import riskAssessmentModal from "@components/riskAssessmentModal"
  import couponActionList from "@components/couponActionList"
  import {Alert} from "@components/amaze/components/alert"
  import {Confirm} from "@components/amaze/components/confirm"
  import depositoryModal from "@components/common/depositoryModal"
  import {setBodyStyleBg, removeBodyStyleBg} from '@/utils/setBodyBg'
  import {mapActions, mapGetters, mapState} from "vuex"
  import dayjs from 'dayjs'
  import api from '@api'
  import sessionStore from '@/utils/sessionStore'
  import {
    formatCurrency,
    calculateIncome,
    doCountAvailableCoupon,
    packageMaxValue,
    formatDateToSecond,
    toJson
  } from '@/utils/utils'

  export default {
    name: "productAuto",
    components: {
      container,
      footerMenu,
      riskAssessmentModal,
      depositoryModal,
      couponActionList,
      'am-alert': Alert,
      'am-confirm': Confirm,
    },
    data() {
      return {
        accountAmt: 0,
        productInfo: {
          minAmount: 0,
          maxAmount: 0,
          remainAmount: 0,
          prdRate: 0,
          awardRate: 0,
          prdPeriod: 1,
          periodUnit: 1,
          title: '',
          repayMode: 0
        },
        voucherList: [],
        ticketList: [],
        coupon: {
          income: 0,
          type: 0,
          limit: 0
        },
        params: {
          prdId: this.$route.params.id,
          amount: '',
          agreeAgreement: false
        },
        submitBtn: {
          disable: true,
          loading: false
        },
        isShowCouponListLayer: false,
        assessStatusModalVisible: false,
        tipsVisible: false,
        rechargeConfirmVisible: false,
        totalDue: 0,
        userAssessLimit: 0,
        riskType: '',
        assessLimitModalVisible: false
      }
    },
    created() {
      if (this.params.prdId) {
        api.GetProductSingleConfirm({
          loanId: this.params.prdId
        }).then(response => {
          if (response.success) {
            this.accountAmt = response.accountVo.availableAmt
            this.productInfo.minAmount = response.loan.minAmt
            this.productInfo.maxAmount = response.loan.maxAmt
            this.productInfo.remainAmount = response.loan.remainAmount
            this.productInfo.prdRate = response.loan.platRate
            this.productInfo.awardRate = response.loan.awardRate
            this.productInfo.prdPeriod = response.loan.loanPeriod
            this.productInfo.periodUnit = response.loan.loanPeriodUnit
            this.productInfo.title = response.loan.loanTitle
            this.productInfo.repayMode = response.loan.repayMode
            this.totalDue = response.totalDue
            this.userAssessLimit = response.userAssessLimit
            this.riskType = response.riskType
            let voucherList = []
            let ticketList = []
            if (response.voucherList && response.voucherList.length) {
              voucherList = response.voucherList.map(item => {//计算红包收益
                item.useId = ""
                return item
              })
            }
            if (response.ticketList && response.ticketList.length) {
              ticketList = response.ticketList.map(item => {
                item.useId = ""
                return item
              })
            }
            this.voucherList = voucherList
            this.ticketList = ticketList
            this.doCountCouponIncome(this.investAmount)//计算红包收益
          } else {
            this.setUserID('false')
            this.$router.push('/product/single')
          }
        })
      } else {
        this.setUserID('false')
        this.$router.push('/product/single')
      }
    },
    mounted() {
      setBodyStyleBg('#f9f9f9')
      //this.assessLimitModalVisible = true
    },
    beforeDestroy() {
      removeBodyStyleBg()
    },
    computed: {
      ...mapGetters([
        'isLogin',
      ]),
      ...mapState({
        assessStatus: state => state.user.assessStatus,
        amount: state => state.product.autoConfirm.amount
      }),
      investAmount() {
        return Number(this.params.amount)
      },
      investInputPlaceholder() {
        return `最低委托金额${this.productInfo.minAmount}元`
      },
      productDetailUrl() {
        return `/plan/detail/${this.params.prdId}`
      },
      doCountCouponText() {
        if (this.voucherList.some(item => {
          return item.useId
        })) {
          return `满${this.coupon.limit}返${this.coupon.income}`
        } else if (this.ticketList.some(item => {
          return item.useId
        })) {
          return `奖励${this.coupon.limit}%`
        } else {
          let availableVoucherList = doCountAvailableCoupon(this.voucherList, this.doCountProductInfoParams, false, true)
          let availableTicketList = doCountAvailableCoupon(this.ticketList, this.doCountProductInfoParams, false, true)
          if (!availableVoucherList.length && !availableTicketList.length) {
            return "暂无可用优惠券"
          } else {
            return `${availableVoucherList.length + availableTicketList.length}张可用优惠券`
          }
        }
      },
      doCountProductInfoParams() {
        let productInfo = {}
        productInfo.loanId = this.params.prdId
        productInfo.investAmt = this.investAmount
        productInfo.loanPeriodUnit = this.productInfo.periodUnit
        productInfo.loanPeriod = this.productInfo.prdPeriod
        return productInfo
      },
      isShowRechargeBtn() {
        return this.accountAmt < this.productInfo.minAmount || this.accountAmt < this.investAmount
      },
      productIncome() {
        if (this.investAmount) {
          let rate = this.productInfo.prdRate + this.productInfo.awardRate
          return calculateIncome(this.investAmount, rate, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), this.productInfo.repayMode)
        }
        return 0
      },
      totalIncome() {
        return (this.productIncome + this.coupon.income).toFixed(2)
      },
      tipsText() {
        if (this.investAmount < this.productInfo.minAmount) {
          return `最低委托金额为${this.productInfo.minAmount}元`
        } else if (this.investAmount > this.productInfo.remainAmount) {
          return '您输入的出借金额超过了剩余可出借金额，已为您自动调整至最大可出借金额'
        }
        return ''
      },
      rechargeAmount() {
        return Math.floor(this.investAmount) - Math.floor(this.accountAmt)
      },
      submitBtnDisable() {
        return !this.params.agreeAgreement
      }
    },
    watch: {
      'params.amount': {
        handler(value) {
          this.doCountCouponIncome(value)
        },
        deep: true
      },
    },
    filters: {
      formatCurrency,
      hourFormater(value) {
        return dayjs(value).format('HH:mm')
      },
    },
    methods: {
      ...mapActions(['setUserID', 'setUserAssessStatus', 'setConfirmSuccessInfo']),
      doCountCouponIncome(value) {
        let investAmt = Math.floor(value) || 0
        let maxTicketAmount = 0
        let maxTicket = null
        let maxVoucher = packageMaxValue(this.voucherList.map(item => {//最大能使用的红包金额
          return item.limitAmount
        }), this.voucherList.map(item => {
          return item.awardAmount
        }), investAmt)
        this.ticketList.forEach(item => {//最大能使用的加息券
          let award = calculateIncome(investAmt, item.awardAmount, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), this.productInfo.repayMode)
          if (award > maxTicketAmount) {
            maxTicketAmount = award
            maxTicket = item
          }
        })
        this.doClearCouponChoose()//先清空选中
        if (maxVoucher.value > maxTicketAmount) {//当红包大于加息券优惠
          maxVoucher.use.forEach((item, index) => {
            console.log(item)
            if (item) {//红包被命中则标记使用
              this.voucherList[index].useId = this.params.prdId
            }
          })
          this.coupon.income = maxVoucher.value
          this.coupon.limit = maxVoucher.limit
        } else if (maxTicketAmount > 0) {
          maxTicket.useId = this.params.prdId
          this.coupon.income = maxTicketAmount
          this.coupon.limit = maxTicket.awardAmount
        }
      },
      doClearCouponChoose() {
        this.ticketList.forEach(item => {
          item.useId = ''
        })
        this.voucherList.forEach(item => {
          item.useId = ''
        })
        this.coupon.income = 0
        this.coupon.limit = 0
      },
      onChangeAssessStatusModalVisible(visible) {
        this.assessStatusModalVisible = visible
      },
      onChangeAssessLimitModalVisible(visible) {
        this.assessLimitModalVisible = visible
      },
      onClickMaxBtnHandle() {
        if (this.accountAmt > this.productInfo.remainAmount) {
          this.params.amount = this.productInfo.remainAmount
        } else if (this.accountAmt > this.productInfo.minAmount) {
          this.params.amount = Math.floor(this.accountAmt)
        } else {
          this.params.amount = this.minAmount
        }
      },
      onChangeCouponHandle(coupon) {
        if (coupon.awardType == '2') {//红包
          if (coupon.useId) {//有值表示取消当前勾选
            coupon.useId = ''
            this.coupon.income = this.coupon.income - coupon.awardAmount //计算勾选后红包收益
            this.coupon.limit = this.coupon.limit - coupon.limitAmount //计算勾选后红包限制
          } else {
            if (this.coupon.limit + coupon.awardAmount > this.investAmount) {
              this.$notify({
                type: 'warning',
                message: '您选择的红包已超出出借金额'
              })
            } else {
              coupon.useId = this.params.prdId
              this.coupon.income = this.coupon.income + coupon.awardAmount//计算勾选后红包收益
              this.coupon.limit = this.coupon.limit + coupon.limitAmount //计算勾选后红包限制
            }
          }
        } else {//加息券
          if (coupon.useId) {//有值表示取消当前勾选
            coupon.useId = ''
            this.coupon.income = 0
            this.coupon.limit = 0
          } else {
            this.doClearCouponChoose()
            let award = calculateIncome(this.investAmount, coupon.awardAmount, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), this.productInfo.repayMode)
            coupon.useId = this.params.prdId
            this.coupon.income = award//计算勾选后红包收益
            this.coupon.limit = coupon.awardAmount //计算勾选后红包限制
          }
        }
      },
      onClickShowCouponHandle() {
        this.isShowCouponListLayer = true
      },
      onCloseCouponListHandle() {
        this.isShowCouponListLayer = false
      },
      onCancelCouponChooseHandle() {
        this.doClearCouponChoose()
        this.isShowCouponListLayer = false
      },
      onClickRechargeHandle() {
        sessionStore.set('rechangeAmount', this.rechargeAmount)
        window.location.href = "/member/account/recharge?amt=1"
      },
      onClickTipsAlertHandle() {
        this.params.amount = this.productInfo.remainAmount
      },
      onClickSubmitBtn() {
        if (!this.riskType) {
          this.assessStatusModalVisible = true
          return
        }
        if (this.investAmount + this.totalDue > this.userAssessLimit * 10000) {
          this.assessLimitModalVisible = true
          return
        }
        if (this.investAmount < this.productInfo.minAmount || this.investAmount > this.productInfo.remainAmount) {
          this.tipsVisible = true
          return
        }
        if (this.investAmount > this.accountAmt) {
          this.rechargeConfirmVisible = true
          return
        }
        this.submitBtn.loading = true
        let couponIds = []//勾选的红包优惠券
        let ticketStr = ''
        this.voucherList.forEach(item => {
          if (item.useId) {
            couponIds.push(item.awardDtlId)
          }
        })
        this.ticketList.forEach(item => {
          if (item.useId) {
            ticketStr = item.awardDtlId
          }
        })
        api.SubmitProductSingleConfirm({
          loanId: this.params.prdId,
          investAmount: this.investAmount,
          ticket: ticketStr,
          couponIdStr: couponIds.join(',')
        }).then(response => {
          let res = toJson(response)
          if (res.success) {
            let obj = {}
            obj.investAmount = res.data[0].investAmount
            obj.investTime = formatDateToSecond(res.data[0].currentTime)
            obj.expectIncome = res.data[0].expectIncome
            obj.prdPeriodStr = res.data[0].prdPeriodStr
            this.setConfirmSuccessInfo(obj)
            this.$router.push('/product/success')
          } else {
            this.$notify({
              message: response.msg,
              type: 'warning'
            });
            this.submitBtn.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/product/singleConfirm";
</style>
