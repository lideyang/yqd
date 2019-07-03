<template>
  <div class="product-auto-confirm-layer">
    <container title="委托出借确认">
      <div class="am-container product-confirm" id="productConfirm">
        <div class="am-g item">
          <div class="title">
            <ul>
              <li class="tips">
                <h3 @click="onClickTipsHandle">流动性风险提示<i class="icon-font am-fr"
                                                         :class="tipsStatus?'icon-arrow-down-new':'icon-bottom'"></i>
                </h3>
                <p v-show="tipsStatus">
                  委托期满，未到期的债权授权平台发起债权转让，平台不承诺
                  债权转让成功，未能成功转让的债权，出借人需持有相应借款
                  项目直至到期。
                </p>
              </li>
              <li>
                {{productInfo.title}}
              </li>
              <li>
                委托出借范围：企链贷/三农贷/优车贷/微花贷/微企贷
              </li>
            </ul>
          </div>
          <div class="product-confirm-money">
            <div class="am-g item">
              <div class="am-u-sm-12 am-text-muted">
                剩余可委托金额： <span class="am-text-default">{{productInfo.remainAmount|formatCurrency}}元</span>
              </div>
            </div>
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
              <am-checkbox v-model="params.agreeAutoTransfer">
                <span class="vertical-align">委托期满，授权平台将未到期债权自动发起债权转让</span>
              </am-checkbox>
            </div>
            <div class="am-u-sm-12">
              <am-checkbox v-model="params.agreeAgreement">
                <span class="vertical-align">阅读并同意</span>
                <a class="am-text-primary vertical-middle"
                   :href="'/contract/entrust?assetsId='+params.prdId">《委托出借协议》</a>
                <a class="am-text-primary vertical-middle" href="/contract/entrust-risk">《风险及禁止性行为提示书》</a>
                <a class="am-text-primary vertical-middle" href="/contract/liquidity">《流动性风险提示书》</a>
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
        tipsStatus: false,
        accountAmt: 0,
        productInfo: {
          minAmount: 0,
          maxAmount: 0,
          remainAmount: 0,
          prdPeriodStr: '',
          prdRate: 0,
          awardRate: 0,
          prdStatus: '3',
          prdPeriod: 1,
          periodUnit: 1,
          title: ''
        },
        voucherList: [],
        ticketList: [],
        coupon: {
          income: 0,
          type: 0,
          limit: 0
        },
        params: {
          prdId: '',
          amount: '',
          agreeAutoTransfer: false,
          agreeAgreement: false
        },
        submitBtn: {
          disable: true,
          loading: false
        },
        isShowCouponListLayer: false,
        assessStatusModalVisible: false,
        tipsVisible: false,
        rechargeConfirmVisible: false
      }
    },
    created() {
      api.GetProductAutoConfirm().then(response => {
        if (response.success) {
          this.accountAmt = response.accountVo.availableAmt
          this.productInfo.minAmount = response.bean.minAmount
          this.productInfo.maxAmount = response.bean.maxAmount
          this.productInfo.remainAmount = response.bean.remainAmount
          this.productInfo.prdPeriodStr = response.bean.prdPeriodStr
          this.productInfo.prdRate = response.bean.prdRate
          this.productInfo.awardRate = response.bean.awardRate
          this.productInfo.prdStatus = response.bean.prdStatus
          this.productInfo.prdPeriod = response.bean.prdPeriod
          this.productInfo.periodUnit = response.bean.periodUnit
          this.productInfo.title = response.bean.fontStr
          this.params.amount = response.investAmt
          this.params.prdId = response.bean.prdId
          let voucherList = []
          let ticketList = []
          if (response.vouchers.length) {
            voucherList = response.vouchers.map(item => {//计算红包收益
              item.useId = ""
              return item
            })
          }
          if (response.ticket) {
            ticketList = response.ticket.map(item => {
              item.useId = ""
              return item
            })
          }
          this.voucherList = voucherList
          this.ticketList = ticketList
          this.doCountCouponIncome(this.investAmount)//计算红包收益
        } else {
          this.setUserID('false')
          this.$router.push('/product/auto')
        }
      })
    },
    mounted() {
      setBodyStyleBg('#f9f9f9')
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
          return calculateIncome(this.investAmount, rate, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), 2)
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
        return !(this.params.agreeAgreement && this.params.agreeAutoTransfer)
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
      onClickTipsHandle() {
        this.tipsStatus = !this.tipsStatus
      },
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
          let award = calculateIncome(investAmt, item.awardAmount, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), 2)
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
            let award = calculateIncome(this.investAmount, coupon.awardAmount, Number(this.productInfo.prdPeriod), Number(this.productInfo.periodUnit), 2)
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
        this.voucherList.forEach(item => {
          if (item.useId) {
            couponIds.push(item.awardDtlId)
          }
        })
        this.ticketList.forEach(item => {
          if (item.useId) {
            couponIds.push(item.awardDtlId)
          }
        })
        api.SubmitProductAutoConfirm({
          prdId: this.params.prdId,
          amount: this.investAmount,
          quitType: this.params.agreeAutoTransfer ? '1' : '0',
          couponIdStr: couponIds.join(',')
        }).then(response => {
          if (response.success) {
            let obj = Object.assign({}, response.data)
            obj.investAmount = this.investAmount
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

<style lang="less" scoped>
  @import "~@/style/less/views/product/autoConfirm";
</style>
