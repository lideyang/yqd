<template>
  <div class="shopping-cart-list-layer" v-show="isShowPage">
    <container title="购物车">
      <div ref="mescroll" class="mescroll" :style="{height:mescrollHeight}">
        <div class="content" v-if="shoppingCartList.length">
          <ul id="dataList" class="data-list" v-cloak>
            <shopping-cart-list :key="item.loanId" v-for="(item,index) in shoppingCartList" :item="item"
                                @onChangeTotalIncome="onChangeItemTotalIncomeHandle"
                                @onChangeInvestAmt="onChangeInvestAmtHandle"
                                @onDeleteProductItem="onClickDeleteBtn" @onChangeCouponIncome="onChangeItemCouponIncome"
                                @onShowCouponActionLayer="onShowCouponActionLayerHandle"
                                @onChangeValidator="onChangeItemAmountValidatorHandle"
            >
            </shopping-cart-list>
          </ul>
          <!--认购-->
          <div id="subscription" class="am-navbar subscription-btn">
            <div class="am-g">
              <div class="am-u-sm-6">
                <strong class="am-text-danger">总出借金额:￥{{totalInvestAmt|formatCurrency}}</strong>
              </div>
              <div class="am-u-sm-6 am-text-right">
                总预期收益：{{totalIncomeAmt|formatCurrency}}
              </div>
            </div>
            <div class="am-g">
              <div class="am-u-sm-12">
                可用余额：{{availableAmt|formatCurrency}}
                <a class="recharge-btn" v-if="isShowRecharge" @click="$router.push('/user/recharge')">充值</a>
              </div>
            </div>
            <a class="am-btn am-btn-secondary am-block btn-pay"
               @click="onClickSubmitBtn">确认支付({{shoppingCartList.length}})</a>
          </div>
        </div>
        <div class="empty-layer am-text-center" v-else>
          <img src="@/assets/product/shopping_cart_empty.png"/>
          <p>您的购物车暂无出借信息</p>
          <a @click="$router.push('/product/single')" class="am-btn btn-secondary am-round am-block am-btn-xl">去出借</a>
        </div>
      </div>
    </container>
    <coupon-action-list v-show="isShowCouponListLayer" :productInfo="currentItem" :voucher-list="voucherList"
                        :ticket-list="ticketList"
                        @onCancelAllChoose="onCancelCouponChooseHandle"
                        @onCloseLayer="onCloseCouponListHandle"
                        @changeCoupon="onChangeCouponHandle"
    >
    </coupon-action-list>

  </div>
</template>

<script>
  import Vue from 'vue'
  import container from '@layout/container'
  import api from '@api'
  import shoppingCartList from "@components/shoppingCartList"
  import couponActionList from "@components/couponActionList"
  import {
    formatCurrency,
    formatDateToDay
  } from '@/utils/utils'
  import {mapActions, mapState} from "vuex"
  import MeScroll from '@/utils/mescroll'
  import {Toast} from '@components/amaze/components/toast'
  import {Validator} from "vee-validate"

  Vue.use(Toast)
  export default {
    name: "shoppingCart",
    components: {
      container,
      shoppingCartList,
      couponActionList
    },
    data() {
      return {
        isShowPage: false,
        shoppingCartList: [],
        availableAmt: 0,
        mescrollHeight: 0,
        currentItem: {},
        isShowCouponListLayer: false
      }
    },
    created() {
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight
      this.mescrollHeight = winHeight - 45 + 'px'
      console.log(this.mescrollHeight)
      //创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {use: false},
        down: {
          callback: this.doGetShoppingCartList
        }
      });
    },
    computed: {
      ...mapState({
        voucherList: state => state.shoppingCart.voucherList,
        ticketList: state => state.shoppingCart.ticketList,
        shoppingCartCount: state => state.shoppingCart.shoppingCartCount
      }),
      totalInvestAmt() {//总出借金额
        return this.shoppingCartList.reduce((value, item) => {
          return parseFloat(item.investAmt) + parseFloat(value);
        }, 0)
      },
      totalIncomeAmt() {//总收益
        return this.shoppingCartList.reduce((value, item) => {
          return parseFloat(item.totalIncome) + parseFloat(value);
        }, 0)
      },
      isShowRecharge() {//是否显示充值按钮
        if (this.totalInvestAmt > this.availableAmt) {
          return true
        }
        return false
      },
      countVoucherList() {

      }
    },
    filters: {
      formatCurrency,
      formatDateToDay
    },
    methods: {
      ...mapActions(['setCouponList', 'setResultList', 'doCancelChecked', 'setShoppingCartCount', 'doCancelChecked', 'setVoucherChecked', 'setTicketChecked', 'doCancelTicketChecked']),
      onClickSubmitBtn() {//提交认购
        console.log(Validator)
        let result = this.shoppingCartList.every(item => {
          return item.valid
        })
        if (result) {
          if (this.isShowRecharge) {
            this.$notify({
              type: 'warning',
              message: '可用余额不足，请充值～'
            })
          } else {
            let vos = []
            this.shoppingCartList.forEach(list => {
              let params = {
                amount: list.investAmt,
                loanId: list.loanId
              }
              let voucherList = []
              let ticketList = []
              this.voucherList.forEach(item => {
                if (item.useId === params.loanId) {
                  voucherList.push(item.awardDtlId)
                }
              })
              this.ticketList.forEach(item => {
                if (item.useId === params.loanId) {
                  ticketList.push(item.awardDtlId)
                }
              })
              params.couponIdsStr = voucherList.join(',')
              params.ticketId = ticketList.join(',')
              vos.push(params)
            })
            console.log(vos)
            this.$toast.open('正在支付中，请勿退出…', {delay: 0});
            api.shoppingCartInvest({
              vos: JSON.stringify(vos)
            }).then(response => {
              this.$toast.close()
              if (response.success) {
                this.setResultList({
                  list: response.data.result,
                  time: response.currentTime
                })
                this.$router.push('/product/shoppingCartSuccess')
              } else {
                this.$notify({
                  type: 'warning',
                  message: data.msg
                })
              }
            })
          }
        }
      },
      doGetShoppingCartList() {
        //请求的列表数据
        api.GetShoppingCartList().then(response => {
          if (response.success) {
            this.doSetListData(response)
            //数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              this.mescroll.endBySize(response.data.length);
            })
          } else {
            this.isShowPage = true//显示页面
          }
        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          //this.mescroll.endErr();
        })
      },
      doSetListData(data) {
        let shoppingCartList = []
        let voucherList = []
        if (data.data.voucherList) {
          voucherList = data.data.voucherList.map(item => {
            item.useId = ""
            return item
          })
        }

        let ticketList = []
        if (data.data.ticketList) {
          ticketList = data.data.ticketList.map(item => {
            item.useId = ""
            return item
          })
        }
        this.setCouponList({
          voucherList,
          ticketList
        })//设置vuex红包加息券

        data.data.buyCarts.forEach(item => {
          let itemObj = item
          itemObj.investAmt = itemObj.investAmt || 0 //当前项目出借金额
          itemObj.totalIncome = 0//总收益
          itemObj.couponIncome = 0//项目收益
          itemObj.couponType = 0//优惠券类型0为无，1为红包，2为加息券
          itemObj.investLimit = 0//占用的收益限额
          itemObj.valid = true
          let validText = 'required'
          if (item.remainderAmt >= 100) {
            validText += '|integer'
          }
          itemObj.investAmtValid = validText + '|num:0,' + item.remainderAmt//表单验证
          shoppingCartList.push(itemObj)
        })
        this.shoppingCartList = shoppingCartList//购物车列表数据
        this.availableAmt = data.data.availableAmt//余额
        this.isShowPage = true//显示页面
      },
      onChangeItemTotalIncomeHandle(item, totalIncome) {
        console.log(totalIncome)
        item.totalIncome = totalIncome//更新总收益
      },
      onChangeInvestAmtHandle(value, item) {
        item.investAmt = value
        //this.doCountCouponPackage(item, this.voucherList, this.ticketList)
      },
      onChangeItemCouponIncome(item, params) {
        item.investLimit = params.investLimit
        item.couponIncome = params.couponIncome
        item.couponType = params.couponType
      },
      onChangeCouponActionVisible(visible) {
        this.isShowCouponListLayer = visible
      },
      onShowCouponActionLayerHandle(item) {
        this.currentItem = item
        this.onChangeCouponActionVisible(true)
      },
      onClickDeleteBtn(loanid) {
        api.DeleteShoppingCart({loanIdsStr: loanid}).then(response => {
          this.$notify({
            message: response.msg,
            type: response.success ? 'success' : 'warning'
          });
          if (response.success) {
            let currentIndex = this.shoppingCartList.findIndex(item => {
              if (item.loanId === loanid) {
                return true
              }
            })
            this.shoppingCartList.splice(currentIndex, 1)
            this.doCancelChecked(loanid)
            this.setShoppingCartCount(response.data.itemCount)
            console.log(this.ticketList)
          }
        })
      },
      onClickShowCouponLayer(item) {
        this.currentItem = item
        this.isShowCouponListLayer = true
      },
      onCloseCouponListHandle() {
        this.isShowCouponListLayer = false
      },
      onCancelCouponChooseHandle() {
        this.doCancelChecked(this.currentItem.loanId)
        this.isShowCouponListLayer = false
      },
      onChangeCouponHandle(coupon) {
        if (coupon.awardType == '2') {//红包
          if (this.currentItem.investAmt >= coupon.limitAmount) {//可用才能选
            if (coupon.useId) {//有值表示取消当前勾选
              this.setVoucherChecked({
                awardDtlId: coupon.awardDtlId,
                loanId: ''
              })
            } else {
              if (this.currentItem.investLimit + coupon.awardAmount > this.currentItem.investAmt) {
                this.$notify({
                  type: 'warning',
                  message: '您选择的红包已超出出借金额'
                })
              } else {
                this.setVoucherChecked({
                  awardDtlId: coupon.awardDtlId,
                  loanId: this.currentItem.loanId//相等表示勾选了，取消
                })
              }
            }
          }
        } else {//加息券
          if (this.currentItem.investAmt >= coupon.limitAmount) {
            this.setTicketChecked({
              awardDtlId: coupon.awardDtlId,
              loanId: coupon.useId === this.currentItem.loanId ? '' : this.currentItem.loanId//相等表示勾选了，取消
            })
          } else {

          }
        }
      },
      onChangeItemAmountValidatorHandle(item, validator) {
        item.valid = validator
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/shoppingCart.less";
</style>
