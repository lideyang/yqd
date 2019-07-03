<template>
  <li class="shopping-list" :class="item.loanStatus==='2'?'':'disabled'">
    <div class="am-g title">
      <div class="am-u-sm-7 am-text-truncate">
        <badge :type="item.prdType"/>
        {{item.loanTitle}}
      </div>
      <div class="am-u-sm-4 am-text-nowrap">
        <strong>
          {{item.platRate}}%<span v-if="item.awardRate">+{{item.awardRate}}%</span>/{{item.loanPeriod}}{{item.periodStr}}</strong>
      </div>
      <div class="am-u-sm-1 am-text-right" @click="onClickDeleteBtn(item.loanId)">
        <i class="icon-font icon-close am-text-muted"></i>
      </div>
    </div>
    <div class="am-g money">
      <div class="am-u-sm-6">
        <div class="am-form-group field-boxer">
          <label>￥</label>
          <input class="form-field" :disabled="item.loanStatus!=='2'" name="amount"
                 v-validate="item.investAmtValid" @input="onChangeInvestAmtHandle($event.target.value,item)"
                 :value="item.investAmt"/>
          <formErrorTips class="am-text-nowrap"
                         :status="errors.has('amount')">{{ errors.first('amount') }}
          </formErrorTips>
        </div>
      </div>
      <div class="am-u-sm-6 am-text-right choose-coupon"
           :class="doCountCouponText==='暂无可用优惠券'?'am-text-muted':'am-text-secondary'"
           @click="onClickShowCouponLayer(item)">
        {{doCountCouponText}}<i class="icon-font icon-next"></i>
      </div>
    </div>
    <div class="am-g tips">
      <div class="am-u-sm-7">
        剩余可投(元):{{item.remainderAmt|formatCurrency}}
        <span class="am-text-default" v-if="item.loanStatus!=='2'">已满标</span>
      </div>
      <div class="am-u-sm-5 am-text-right">
        预期收益(元):{{doCountTotalIncome|formatCurrency}}
      </div>
    </div>
  </li>
</template>

<script>
  import badge from "@components/icon/badge"
  import formErrorTips from "@components/form/formErrorTips"
  import {
    formatCurrency,
    formatDateToDay,
    calculateIncome,
    doCountAvailableCoupon,
    packageMaxValue
  } from '@/utils/utils'
  import {mapActions, mapGetters, mapState} from "vuex"
  import '@/utils/validate'
  import {Validator} from "vee-validate"

  Validator.localize({
    zh_CN: {
      attributes: {
        amount: "出借金额"
      }
    }
  })
  export default {
    name: "couponList",
    props: {
      item: {
        default: {},
        type: Object
      }
    },
    components: {
      badge,
      formErrorTips,
    },
    data() {
      return {}
    },
    filters: {
      formatCurrency,
      formatDateToDay
    },
    created() {
      this.doCountCouponPackage()//计算红包收益
    },
    computed: {
      ...mapState({
        voucherList: state => state.shoppingCart.voucherList,
        ticketList: state => state.shoppingCart.ticketList,
      }),
      ...mapGetters(['currentCheckedVoucher']),
      doCountCouponText() {
        console.log('text', this.item.couponType)
        if (this.item.couponType === 1) {
          return `满${this.item.investLimit}返${this.item.couponIncome}`
        } else if (this.item.couponType === 2) {
          return `奖励${this.item.investLimit}%`
        } else {
          let availableVoucherList = doCountAvailableCoupon(this.voucherList, this.item, false, true)
          let availableTicketList = doCountAvailableCoupon(this.ticketList, this.item, false, true)
          if (!availableVoucherList.length && !availableTicketList.length) {
            return "暂无可用优惠券"
          } else {
            return `${availableVoucherList.length + availableTicketList.length}张可用优惠券`
          }
        }
      },
      doCountProductIncome() {//计算项目收益
        let rate = this.item.awardRate + this.item.platRate
        let income = calculateIncome(this.item.investAmt, rate, Number(this.item.loanPeriod), Number(this.item.loanPeriodUnit), Number(this.item.repayMode))//计算预计收益
        return income
      },
      doCountTotalIncome() {//计算总收益
        let totalIncome = this.doCountProductIncome + this.item.couponIncome
        console.log(totalIncome)
        this.$emit('onChangeTotalIncome', this.item, totalIncome)
        return totalIncome
      },
    },
    watch: {
      'errors': {
        handler(val) {
          this.$emit('onChangeValidator', this.item, !val.has('amount'))
        },
        deep: true
      },
      'item.investAmt': {
        handler(val) {
          if (val <= this.item.remainderAmt) {
            this.doCountCouponPackage()//计算红包收益
          } else {
            this.$emit('onChangeInvestAmt', this.item.remainderAmt, this.item)
          }
        },
        deep: true
      },
      voucherList: {
        handler(arr) {//更新红包加息收益
          let availableVoucher = doCountAvailableCoupon(arr, this.item, true, true, true)
          console.log('availableVoucherLength', availableVoucher.length)
          if (availableVoucher.length) {
            let investLimit = 0
            let couponIncome = 0
            availableVoucher.forEach(item => {
              investLimit += item.limitAmount
              couponIncome += item.awardAmount
            })
            console.log('voucherList:', couponIncome)
            this.$emit('onChangeCouponIncome', this.item, {
              investLimit: investLimit,
              couponIncome: couponIncome,
              couponType: 1
            })
          } else {
            let availableTicket = doCountAvailableCoupon(this.ticketList, this.item, true, true, true)
            if (!availableTicket.length) {
              this.$emit('onChangeCouponIncome', this.item, {
                investLimit: 0,
                couponIncome: 0,
                couponType: 0
              })
            }
          }
        },
        deep: true
      },
      ticketList: {
        handler(arr) {//更新加息券收益
          let availableTicket = doCountAvailableCoupon(arr, this.item, true, true, true)
          console.log('ticketList', availableTicket)
          if (availableTicket.length) {
            let investLimit = 0
            let couponIncome = 0
            availableTicket.forEach(item => {
              let awardAmount = item.awardAmount
              let award = calculateIncome(this.item.investAmt, awardAmount, Number(this.item.loanPeriod), Number(this.item.loanPeriodUnit), Number(this.item.repayMode))
              console.log('award', award)
              investLimit += item.awardAmount
              couponIncome += award
            })
            console.log('couponIncome', couponIncome)
            this.$emit('onChangeCouponIncome', this.item, {
              investLimit: investLimit,
              couponIncome: couponIncome,
              couponType: 2
            })
          } else {
            let availableVoucher = doCountAvailableCoupon(this.voucherList, this.item, true, true, true)
            if (!availableVoucher.length) {
              this.$emit('onChangeCouponIncome', this.item, {
                investLimit: 0,
                couponIncome: 0,
                couponType: 0
              })
            }
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(['setVoucherChecked', 'setTicketChecked', 'doCancelCurrentProductChecked']),
      onClickDeleteBtn(loadId) {
        this.$emit('onDeleteProductItem', loadId)
      },
      onChangeInvestAmtHandle(value, item) {
        this.$emit('onChangeInvestAmt', parseFloat(value || 0), item)
      },
      doCountCouponPackage() {
        let availableVoucher = doCountAvailableCoupon(this.voucherList, this.item, true, true, false)
        let availableTicket = doCountAvailableCoupon(this.ticketList, this.item, true, true, false)
        let investAmt = this.item.investAmt || 0
        let maxTicketAmount = 0
        let maxTicketId = ""
        let maxTicketAwardAmount = 0
        let maxVoucher = packageMaxValue(availableVoucher.map(item => {//最大能使用的红包金额
          return item.limitAmount
        }), availableVoucher.map(item => {
          return item.awardAmount
        }), parseInt(investAmt))
        let maxTicket = availableTicket.forEach(item => {//最大能使用的加息券
          let award = calculateIncome(investAmt, item.awardAmount, Number(this.item.loanPeriod), Number(this.item.loanPeriodUnit), Number(this.item.repayMode))
          if (award > maxTicketAmount) {
            maxTicketAmount = award
            maxTicketId = item.awardDtlId
            maxTicketAwardAmount = item.awardAmount
          }
        })
        this.doCancelCurrentProductChecked(this.item.loanId)
        if (maxVoucher.value > maxTicketAmount) {//当红包大于加息券优惠
          maxVoucher.use.forEach((item, index) => {
            console.log(item)
            if (item) {//红包被命中则标记使用
              console.log('change:', this.item.loanId)
              this.setVoucherChecked({
                awardDtlId: availableVoucher[index].awardDtlId,
                loanId: this.item.loanId
              })
            }
          })
          this.$emit('onChangeCouponIncome', this.item, {
            investLimit: maxVoucher.limit,
            couponIncome: maxVoucher.value,
            couponType: 1
          })
        } else if (maxTicketAmount > 0) {
          this.setTicketChecked({
            awardDtlId: maxTicketId,
            loanId: this.item.loanId
          })
          this.$emit('onChangeCouponIncome', this.item, {
            investLimit: maxTicketAwardAmount,
            couponIncome: maxTicketAmount,
            couponType: 2
          })
        } else {
          this.$emit('onChangeCouponIncome', this.item, {
            investLimit: 0,
            couponIncome: 0,
            couponType: 0
          })
        }
      },
      onClickShowCouponLayer() {
        if (this.item.loanStatus === '2' && this.doCountCouponText !== '暂无可用优惠券') {
          this.$emit('onShowCouponActionLayer', this.item)
        }
      }
    }
  }
</script>

<style lang="less">
  li.shopping-list {
    padding: .15rem .2rem;
    border-bottom: 1px solid #ececec;

    &.disabled {
      background-color: #eee;

      .field-boxer {
        .form-field {
          background-color: #eee;
        }
      }
    }

    .title, .money {
      margin: 0 0 .1rem;
    }

    .title {
      .icon-close {
        position: relative;
        top: -4px;
        display: inline-block;
        color: #ccc;
        font-size: 20px;
      }
    }

    .choose-coupon {
      padding: .05rem 0 0;
    }

    .field-boxer {
      position: relative;

      label {
        position: absolute;
        font-size: 16px;
        top: .06rem;
        left: .1rem;
      }

      .form-field {
        border: 1px solid #ccc;
        border-radius: 2px;
        flex: 1;
        padding: .05rem .05rem .05rem .3rem;
        margin: 0 0 .05rem;
        line-height: 1.6;
        font-size: 16px;
        color: #555;
        vertical-align: middle;
        background-color: #fff;
        width: 100%;

        &:focus {
          background-color: #fefffe;
          border-color: #3bb4f2;
          outline: 0;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(59, 180, 242, .3);
        }
      }
    }
  }
</style>
