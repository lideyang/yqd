<template>
  <div class="product-auto-layer">
    <div class="am-tabs">
      <ul class="am-tabs-nav am-nav am-nav-tabs">
        <li class="am-active"><a @click="$router.push('/product/auto')">易智投</a></li>
        <li><a @click="$router.push('/product/single')">散标出借</a></li>
        <li><a @click="$router.push('/product/transfer')">债权转让</a></li>
      </ul>
      <div class="am-tabs-bd am-tabs-bd-ofv">
        <div class="am-tab-panel am-in am-active am-fade auto-pay">
          <form>
            <div class="form">
              <div class="am-g auto-info am-text-center">
                <div v-if="currentProduct.isNewserBid" class="am-u-sm-12 am-text-center btn-tip">
                  <a href="javascript:;" class="am-btn am-round btn-secondary">福利新手专享</a>
                  <p class="am-text-default">{{noviceTips}}</p>
                </div>
                <div class="am-u-sm-6">
                  <p class="rate am-text-secondary am-text-nowrap">
                    <span id="currentRateTxt"
                          class="target-rate span-rate">{{currentProduct.defaultRate}}%</span>
                    <span v-if="currentProduct.awardRate&&currentProduct.awardRate>0"
                          class="target-award-rate-div span-rate">+{{currentProduct.awardRate}}%</span>
                  </p>
                  <p class="am-text-muted">协议约定年化利率
                    <v-popover>
                      <i v-tooltip class="icon-font icon-wenhao pop-show"></i>
                      <template slot="popover">
                        此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准
                      </template>
                    </v-popover>
                  </p>
                </div>
                <div class="am-u-sm-6">
                  <strong class="target-month am-text-default">{{currentProduct.prdPeriodStr}}</strong>
                  <p class="am-text-muted">委托期限
                    <v-popover>
                      <i v-tooltip class="icon-font icon-wenhao pop-show"></i>
                      <template slot="popover">
                        委托期限指亿钱贷为出借人提供“易智投”出借服务的期限，委托出借的实际标的期限可能会超过委托期限，委托期满，未到期的可发起债权转让，平台不承诺债权转让成功
                      </template>
                    </v-popover>
                  </p>
                </div>
              </div>
              <!--产品期限-->
              <div class="am-g month" v-if="isLogin&&!currentProduct.isNewserBid">
                <div class="am-u-sm-12 am-text-left">
                  <a v-for="item in list" v-if="item.prdId" class="am-btn am-radius" @click="onClickMonthHandle(item)"
                     :class="params.prdId==item.prdId?'am-btn-secondary':'am-btn-default'">
                    {{item.prdPeriodStr}}
                    <p>{{item.defaultRate+item.awardRate+'%'}}</p>
                  </a>
                  <v-popover v-else>
                    <a class="am-btn am-radius btn-disabled">{{item.prdPeriodStr}}</a>
                    <template slot="popover">
                      已满标
                    </template>
                  </v-popover>
                </div>
              </div>
              <ul class="repay-info">
                <li>
                  剩余可委托金额(元)：<span class="target-remain gray">{{currentProduct.remainAmount|formatCurrency}}</span>
                </li>
                <li>
                  最低委托金额：(元)：<span class="gray">{{currentProduct.minAmount|formatCurrency}}</span>
                  <a v-if="isShowRechargeBtn" href="/member/account/recharge"
                     class="am-text-primary am-fr recharge-btn">充值</a>
                </li>
              </ul>
              <ul class="money-info">
                <li class="invest-li">
                  <p>委托金额：</p>
                  <p class="money-li">
                    <label>￥</label>
                    <input type="tel" name="amount" v-model="params.amount" :placeholder="investInputPlaceholder"
                           class="money vertical-middle"/>
                    <span class="vertical-middle max-invert am-text-primary am-fr"
                          @click="onClickMaxBtnHandle">全投</span>
                  </p>
                </li>
              </ul>
              <div class="am-g income-layer">
                <div class="am-u-sm-6 am-text-muted">
                  预期收益：<span class="am-text-default">{{productIncome}}元</span>
                </div>
                <div class="am-u-sm-6 am-text-muted">
                  可用余额：<span class="am-text-default">{{accountAmt}}元</span>
                </div>
              </div>
              <p v-if="isLogin&&currentProduct.prdStatus=='3'" class="am-text-center invest-btn">
                <button type="button" @click="onClickInvestBtnHandle"
                        class="am-btn am-btn-secondary am-btn-xl am-radius am-btn-block btn sub">
                  委托出借
                </button>
              </p>
              <p class="am-text-center">
                <a class="am-text-primary" :href="productDetailUrl">查看详情&gt;&gt;</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--转让金额-->
    <div>
      <form class="money-layer tips-layer" style="display: block">
        <a v-if="!isLogin" class="am-btn btn am-btn-secondary am-btn-block" @click="$router.push('/account/login')">委托请登录</a>
        <template v-if="currentProduct.prdStatus=='3'"></template>
        <div v-else-if="currentProduct.prdStatus=='2'" class="btn disabled big">
          {{currentProduct.publishTime|hourFormater}}开启
        </div>
        <div v-else class="btn disabled">
          已满额
          <p>每日17:00后发布</p>
        </div>
      </form>
    </div>
    <!--风险提示-->
    <!--风险提示-->
    <am-modal @visible-change="onChangeAssessStatusModalVisible" :isShow="assessStatusModalVisible" :closeBtn="false"
              :width="3" cssUnit="rem">
      <am-modal-body>
        <risk-assessment-modal></risk-assessment-modal>
      </am-modal-body>
    </am-modal>
    <!--开通存管modal-->
    <depository-modal @visibleChange="onChangeDepositoryModalVisible" :is-click-show="false"
                      :modalVisible="depositoryModalVisible"></depository-modal>
    <footerMenu :status="1"/>
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
    calculateIncome
  } from '@/utils/utils'

  export default {
    name: "productAuto",
    components: {
      container,
      footerMenu,
      riskAssessmentModal,
      depositoryModal,
      'am-alert': Alert,
      'am-confirm': Confirm,
    },
    data() {
      return {
        defineId: this.$route.query.defineId,
        list: [],
        noviceTips: '',
        isNovice: false,
        currentProduct: {
          minAmount: 0,
          maxAmount: 0,
          remainAmount: 0,
          isNewserBid: false,
          prdPeriodStr: '',
          defaultRate: 0,
          awardRate: 0,
          prdStatus: '3',
          publishTime: ''
        },
        params: {
          prdId: '',
          amount: ''
        },
        assessStatusModalVisible: false,
        depositoryModalVisible: false,
        tipsVisible: false,
        rechargeConfirmVisible: false
      }
    },
    created() {
      //api.Logout()
      api.GetProductAutoList({
        defineId: this.defineId
      }).then(response => {
        this.list = response.data.plans
        this.currentProduct = response.data.defaultPrd
        this.noviceTips = response.data.noviceTips
        this.isNovice = response.data.isNovice
        this.currentProduct.minAmount = response.data.defaultPrd.minAmount
        this.currentProduct.maxAmount = response.data.defaultPrd.maxAmount
        this.currentProduct.remainAmount = response.data.defaultPrd.remainAmount
        this.currentProduct.isNewserBid = response.data.defaultPrd.isNewserBid
        this.currentProduct.prdPeriodStr = response.data.defaultPrd.prdPeriodStr
        this.currentProduct.defaultRate = response.data.defaultPrd.defaultRate
        this.currentProduct.awardRate = response.data.defaultPrd.awardRate
        this.currentProduct.prdStatus = response.data.defaultPrd.prdStatus
        this.currentProduct.publishTime = response.data.defaultPrd.publishTime
        this.currentProduct.period = response.data.defaultPrd.period
        this.currentProduct.periodUnit = response.data.defaultPrd.periodUnit
        this.params.prdId = response.data.defaultPrd.prdId
        if (response.data.accountAmt != undefined) {
          this.setUserID('ok')
          this.setAccountAmt(response.data.accountAmt)
        } else {
          this.setUserID('false')
        }
        if (response.data.assessStatus) {
          this.setUserAssessStatus(true)
        } else {
          this.setUserAssessStatus(false)
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
        depositoryStatus: state => state.user.depositoryStatus,
        accountAmt: state => state.user.accountAmt
      }),
      investAmount() {
        return Number(this.params.amount)
      },
      investInputPlaceholder() {
        return `最低委托金额${this.currentProduct.minAmount}元`
      },
      productDetailUrl() {
        return `/plan/detail/${this.params.prdId}`
      },
      isShowRechargeBtn() {
        return this.accountAmt < this.currentProduct.minAmount || this.accountAmt < this.investAmount
      },
      productIncome() {
        if (this.investAmount) {
          let rate = this.currentProduct.defaultRate + this.currentProduct.awardRate
          return calculateIncome(this.investAmount, rate, Number(this.currentProduct.period), Number(this.currentProduct.periodUnit), 2)
        }
        return '--'
      },
      tipsText() {
        if (this.investAmount < this.currentProduct.minAmount) {
          return `最低委托金额为${this.currentProduct.minAmount}元`
        } else if (this.investAmount > this.maxInvest) {
          return '您输入的委托金额超过了易智投剩余可委托金额，已为您自动调整至最大可委托金额'
        }
        return ''
      },
      rechargeAmount() {
        return Math.floor(this.investAmount) - Math.floor(this.accountAmt)
      },
      maxInvest() {
        return this.currentProduct.remainAmount > this.currentProduct.maxAmount ? this.currentProduct.maxAmount : this.currentProduct.remainAmount
      }
    },
    filters: {
      formatCurrency,
      hourFormater(value) {
        return dayjs(value).format('HH:mm')
      },
    },
    methods: {
      ...mapActions(['setUserID', 'setUserAssessStatus', 'setStartCountDownState', 'setAccountAmt', 'setAutoConfirmAmount']),
      onClickMonthHandle(item) {
        let currentProduct = Object.assign({}, item)
        this.currentProduct = currentProduct
        this.params.prdId = currentProduct.prdId
      },
      onChangeAssessStatusModalVisible(visible) {
        this.assessStatusModalVisible = visible
      },
      onClickMaxBtnHandle() {
        if (this.isLogin) {
          if (this.accountAmt > this.maxInvest) {
            this.params.amount = this.maxInvest
          } else if (this.accountAmt < this.currentProduct.minAmount) {
            this.params.amount = this.currentProduct.minAmount
          } else {
            this.params.amount = Math.floor(this.accountAmt)
          }
        } else {
          this.$notify({
            message: '请先登录',
            type: 'warning'
          });
        }
      },
      onClickTipsAlertHandle() {
        if (this.investAmount < this.currentProduct.minAmount) {
          this.params.amount = this.currentProduct.minAmount
        } else if (this.investAmount > this.maxInvest) {
          this.params.amount = this.maxInvest
        }
      },
      onClickInvestBtnHandle() {
        if (!this.depositoryStatus) {
          this.depositoryModalVisible = true
          return
        }
        if (!this.assessStatus) {
          this.assessStatusModalVisible = true
          return
        }

        if (this.investAmount < this.currentProduct.minAmount || this.investAmount > this.maxInvest) {
          this.tipsVisible = true
          return
        }
        if (this.investAmount > this.accountAmt) {
          this.rechargeConfirmVisible = true
          return
        }
        api.SubmitProductAuto(this.params).then(response => {
          if (response.successed) {
            this.setStartCountDownState(this.currentProduct)
            this.setAutoConfirmAmount(this.investAmount)
            this.$router.push('/product/autoConfirm')
          } else {
            this.$notify({
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      onChangeDepositoryModalVisible(visible) {
        this.depositoryModalVisible = visible
      },
      onClickRechargeHandle() {
        sessionStore.set('rechangeAmount', this.rechargeAmount)
        window.location.href = "/member/account/recharge?amt=1"
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/list.less";
</style>
