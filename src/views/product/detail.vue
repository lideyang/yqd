<template>
  <container title="项目详情" icon="share" @onClickRightBtn="onClickHeaderBtn">
    <template v-slot:left>
      <a @click="onClickHeaderNextBtn" href="javascript:;;">
        <i class="am-header-icon icon-font icon-prev"></i>
        返回
      </a>
    </template>
    <template v-slot:icon>
      <a id="wxShareBtn" href="#" :data-clipboard-text="shareLink">
        <i @click="onClickHeaderBtn" class="am-text-xl icon-font icon-fenxiang-black"></i>
      </a>
    </template>
    <div class="product-detail-layer" @touchstart="touchStart" @touchmove='touchMove'>
      <div class="am-container">
        <!--产品列表-->
        <div class="am-g product-detail">
          <div class="title-info">
            <div class="am-g">
              <div class="am-u-sm-12 rate-layer am-text-center">
                <p class="rate am-text-secondary">
                  <span class="rate-layout">
                    <span>{{loan.platRate}}</span>%
                    <template v-if="loan.awardRate&&loan.awardRate>0">
                      +{{loan.awardRate}}%
                    </template>
                     <template v-if="loan.awardRate&&loan.awardRate>0">
                      <i class="jiaxi-icon">奖励</i>
                    </template>
                  </span>
                </p>
                <p class="am-text-muted">
                  协议约定年化利率
                  <v-popover>
                    <i class="icon-font icon-wenhao1" v-tooltip></i>
                    <template slot="popover">
                      此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准
                    </template>
                  </v-popover>
                </p>
                <!--出借进度-->
                <div class="am-u-sm-12">
                  <div class="am-progress product-progress">
                    <div class="am-progress-bar-secondary" :style="{width:loan.percent+'%'}">
                      <span class="am-progress-bar-rate am-text-center">{{loan.percent}}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="am-g product-info-layer am-text-center">
              <div class="am-u-sm-4">
                <p class="month">
                  {{loan.loanPeriod}}
                  {{productLimitType}}
                </p>
                <p class="am-text-muted">借款期限</p>
              </div>
              <div class="am-u-sm-4">
                <p class="month">
                  {{loan.remainInestAmt|formatCurrency}}元
                </p>
                <p class="am-text-muted">剩余可投</p>
              </div>
              <div class="am-u-sm-4">
                <p class="month am-text-nowrap">
                  {{loan.repayModeStr}}
                </p>
                <p class="am-text-muted">回款方式</p>
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail-content">
          <div class="product-detail-main">
            <div class="am-g am-text-center product-progress">
              <div class="am-u-sm-3">
                <p><i class="icon-font icon-Beging"></i></p>
                <p>募集开始</p>
                <p class="am-text-muted">{{loan.releaseTime|formatDateToDay}}</p>
              </div>
              <div class="am-u-sm-3" :class="{'am-text-muted':(loan.loanStatus=='2' || loan.loanStatus=='13')}">
                <p><i class="icon-font icon-End"></i></p>
                <p>
                  <template v-if="loan.loanStatus=='2' || loan.loanStatus=='13'">
                    募集结束
                  </template>
                  <template v-else>
                    满标时间
                  </template>
                </p>
                <p class="am-text-muted">
                  <template v-if="loan.loanStatus=='2' || loan.loanStatus=='13'">
                    {{loan.assetsDeadline|formatDateToDay}}
                  </template>
                  <template v-else>
                    {{loan.fullTime|formatDateToDay}}
                  </template>
                </p>
                <i class="split icon-font icon-arrow"></i>
              </div>
              <div class="am-u-sm-3"
                   :class="{'am-text-muted':!(loan.loanStatus=='6' || loan.loanStatus=='7'||loan.loanStatus=='8'||loan.loanStatus=='9')}">
                <p><i class="icon-font icon-BegIntrest"></i></p>
                <p>开始计息</p>
                <p class="am-text-muted">
                  <template
                    v-if="loan.loanStatus=='6' || loan.loanStatus=='7'||loan.loanStatus=='8'||loan.loanStatus=='9'">
                    {{loan.interestDate|formatDateToDay}}
                  </template>
                  <template v-else>
                    放款当日起息
                  </template>
                </p>
                <i class="split icon-font icon-arrow"></i>
              </div>
              <div class="am-u-sm-3"
                   :class="{'am-text-muted':!(loan.loanStatus=='7'||loan.loanStatus=='8'||loan.loanStatus=='9')}">
                <p><i class="icon-font icon-PayInterest"></i></p>
                <p> 收回全部本息</p>
                <p class="am-text-muted">
                  {{settleTime}}
                </p>
                <i class="split icon-font icon-arrow"></i>
              </div>
              <div class="am-u-sm-12 am-text-right am-text-muted tips">
                *具体以实际日期为准
              </div>
            </div>
            <ul class="product-info">
              <li class="am-g title">
                <i class="icon-font icon-zzxx"></i>项目信息
              </li>
              <li class="am-g">
                <div class="am-u-sm-3 am-text-muted">
                  起投金额(元)
                </div>
                <div class="am-u-sm-9 am-text-right">
                  <strong>{{loan.minAmt}}</strong>
                </div>
              </li>
              <li class="am-g">
                <div class="am-u-sm-3 am-text-muted">
                  项目总额(元)
                </div>
                <div class="am-u-sm-9 am-text-right">
                  <strong>{{loan.loanAmt|formatCurrency}}</strong>
                </div>
              </li>
              <li class="am-g">
                <div class="am-u-sm-2 am-text-muted">
                  起息规则
                </div>
                <div class="am-u-sm-10 am-text-right">
                  <strong>一般满标当天放款起息，以实际为准</strong>
                </div>
              </li>
            </ul>
            <div class="am-tabs product-detail-tabs" v-if="isShowTabsLayer">
              <div class="tabs-list">
                <ul class="am-tabs-nav am-nav am-nav-tabs" :style="{width:nabBarTabsWidth+'px'}">
                  <li v-for="(item,index) in nabBarTabsList" :class="{'am-active':currentTabsIndex===index}"
                      :style="{width:nabBarTabsLiWidth+'px'}">
                    <a @click="onClickChangeTabs(index)">{{item}}</a>
                  </li>
                </ul>
              </div>
              <div class="am-tabs-bd">
                <template v-if="isLogin">
                  <div class="am-tab-panel am-fade" :class="currentTabsIndex===0?'am-in am-active':''">
                    <div class="page-title">
                      借款人信息
                    </div>
                    <div class="item-content">
                      <table class="am-table am-table-bordered">
                        <tbody>
                        <tr>
                          <td>借款人</td>
                          <td>
                            <template v-if="personFarm">{{personFarm.userNameStr}}</template>
                            <template v-if="companyScm">{{companyScm.companyNameStr}}</template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <template v-if="personFarm">学历</template>
                            <template v-else>行业</template>
                          </td>
                          <td>
                            <template v-if="personFarm">
                              {{personFarm.degree|degree}}
                            </template>
                            <template v-if="companyScm">
                              {{companyScm.industry}}
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <template v-if="personFarm">上年度经营收入</template>
                            <template v-else>上年度主营业务收入</template>
                          </td>
                          <td>
                            <template v-if="personFarm">
                              {{personFarm.cashIn}}
                            </template>
                            <template v-if="companyScm">
                              {{companyScm.cashIn}}
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            对外债务
                          </td>
                          <td>
                            <template v-if="personFarm">
                              {{personFarm.liabilities}}
                            </template>
                            <template v-if="companyScm">
                              {{companyScm.liabilities}}
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            借款前6个月内借款人征信报告中的逾期情况
                          </td>
                          <td>
                            <template v-if="personFarm">
                              {{personFarm.creditOverdue}}
                            </template>
                            <template v-if="companyScm">
                              {{companyScm.creditOverdue}}
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            其他网络借贷平台借款情况
                          </td>
                          <td>
                            <template v-if="personFarm">
                              {{personFarm.other}}
                            </template>
                            <template v-if="companyScm">
                              {{companyScm.other}}
                            </template>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <hr/>
                    <div class="page-title">
                      项目信息
                    </div>
                    <div class="item-content">
                      <table class="am-table am-table-bordered">
                        <tbody>
                        <tr>
                          <td>
                            项目分类
                          </td>
                          <td>
                            {{prdInfo.productName}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            借款金额
                          </td>
                          <td>
                            {{loan.loanAmt|formatCurrency}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            借款用途
                          </td>
                          <td>
                            {{loan.loanPurpose}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            借款期限
                          </td>
                          <td>
                            {{loan.loanPeriod}}{{loan.periodStr}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            标的年利率
                          </td>
                          <td>
                            {{loan.platRate|formatCurrency}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            还款方式
                          </td>
                          <td>
                            {{loan.repayModeDesc}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            还款来源
                          </td>
                          <td>
                            {{loan.repaySource}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            募集开始日期
                          </td>
                          <td>
                            {{loan.releaseTime|formatDateToDay}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            募集期
                          </td>
                          <td>
                            {{loan.raisePeriod}}天
                          </td>
                        </tr>
                        <tr>
                          <td>
                            起息日
                          </td>
                          <td>
                            <template
                              v-if="loan.loanStatus=='9' || loan.loanStatus=='6' || loan.loanStatus=='7' || loan.loanStatus=='8'">
                              {{loan.interestDate|formatCurrency}}
                            </template>
                            <template v-else>
                              满标放款后起息
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            项目介绍
                          </td>
                          <td>
                            {{loan.loanRemark}}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            担保措施
                          </td>
                          <td>
                            {{loan.assurePlan}}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <template v-if="ext">
                      <div class="page-title">
                        附加信息
                      </div>
                      <div class="item-content">
                        <table class="am-table am-table-bordered">
                          <tbody>
                          <tr>
                            <td>
                              车牌号
                            </td>
                            <td>
                              {{ext.plateNumberFuzzy}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              厂牌型号
                            </td>
                            <td>
                              {{ext.brandModelFuzzy}}
                            </td>
                          </tr>

                          <tr>
                            <td>
                              车架号
                            </td>
                            <td>
                              {{ext.frameNumberFuzzy}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              初登日期
                            </td>
                            <td>
                              {{ext.registrationTime|formatDateToDay}}
                            </td>
                          </tr>

                          <tr>
                            <td>
                              车辆评估价值
                            </td>
                            <td>
                              {{ext.evaluationValue}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              车身颜色
                            </td>
                            <td>
                              {{ext.carColor}}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <hr/>
                    </template>
                    <template v-if="picMap.length">
                      <div class="page-title">
                        附件材料
                      </div>
                      <div class="item-content">
                        <div class="am-slider am-slider-default am-slider-carousel">
                          <ul class="am-slides">
                            <li v-for="item in picMap"><img :src="item.fileLink" class="img-fluid"></li>
                          </ul>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="am-tab-panel am-fade" :class="currentTabsIndex===1?'am-in am-active':''">
                    <template v-if="guarantorStr">
                      <div class="page-title">
                        担保/回购方
                      </div>
                      <div class="item-content">
                        {{guarantorStr}}
                      </div>
                      <hr/>
                    </template>
                    <div class="page-title">
                      担保/回购方简介
                    </div>
                    <div class="item-content">
                      {{loan.guarantorIntroduction}}
                    </div>
                    <hr/>
                    <template v-if="riskControl">
                      <div class="page-title">
                        风险控制措施
                      </div>
                      <div class="item-content" v-html="riskControl.riskMeasure">

                      </div>
                      <hr/>
                    </template>
                    <template v-if="riskControl">
                      <div class="page-title">
                        风险提示
                      </div>
                      <div class="item-content" v-html="riskControl.reminder">
                      </div>
                      <hr/>
                    </template>
                    <template v-if="orgRisk">
                      <div class="page-title">
                        风险等级
                      </div>
                      <div class="item-content">
                        {{orgRisk.riskGradeStr}}
                      </div>
                      <hr/>
                    </template>
                  </div>
                  <div class="am-tab-panel am-fade record-list-layer"
                       :class="currentTabsIndex===2?'am-in am-active':''">
                    <div class="mescroll" ref="mescroll">
                      <div class="am-g record-list am-text-center">
                        <div class="am-g title">
                          <div class="am-u-sm-4">出借人</div>
                          <div class="am-u-sm-4">出借金额（元）</div>
                          <div class="am-u-sm-4">出借时间</div>
                        </div>
                        <div id="dataList" class="data-list" v-cloak>
                          <div class="am-g" v-for="item in recordList">
                            <div class="am-u-sm-4">{{item.starUserName}}</div>
                            <div class="am-u-sm-4">{{item.investAmt}}</div>
                            <div class="am-u-sm-4">{{item.investTime|formatDateToSecond}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="am-tab-panel am-fade record-list-layer"
                       :class="currentTabsIndex===3?'am-in am-active':''">
                    <div class="am-g record-list am-text-center">
                      <div class="am-g title">
                        <div class="am-u-sm-4">合约还款日期</div>
                        <div class="am-u-sm-4">还款金额（元）</div>
                        <div class="am-u-sm-4">状态</div>
                      </div>
                      <div class="data-list" v-cloak>
                        <div class="am-g" v-for="item in loanRepaymentPlans">
                          <div class="am-u-sm-4">{{item.periodEndTime|formatDateToDay}}</div>
                          <div class="am-u-sm-4">{{item.planPayPrincipalInterest|formatCurrency}}</div>
                          <div class="am-u-sm-4">{{item.repaymentStatusStr}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="am-tab-panel am-fade record-list-layer"
                       :class="currentTabsIndex===4?'am-in am-active':''">
                    <div class="page-title">
                      借款资金运用情况
                    </div>
                    <div class="item-content">
                      {{loanLatter.amtPurpose}}
                    </div>
                    <hr/>
                    <div class="page-title">
                      借款人经营状况及财务状况
                    </div>
                    <div class="item-content">
                      {{loanLatter.manageInfo}}
                    </div>
                    <hr/>
                    <div class="page-title">
                      借款人还款能力变化情况
                    </div>
                    <div class="item-content">
                      {{loanLatter.repayInfo}}
                    </div>
                    <hr/>
                    <div class="page-title">
                      借款人逾期情况
                    </div>
                    <div class="item-content">
                      {{loanLatter.overdueSituation}}
                    </div>
                    <hr/>
                    <div class="page-title">
                      借款人涉诉情况
                    </div>
                    <div class="item-content">
                      {{loanLatter.lawsuits}}
                    </div>
                    <hr/>
                    <div class="page-title">
                      借款人受行政处罚情况
                    </div>
                    <div class="item-content">
                      {{loanLatter.penalize}}
                    </div>
                    <hr/>

                    <div class="page-title">
                      其他可能影响借款人还款的重大信息
                    </div>
                    <div class="item-content">
                      {{loanLatter.other}}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="am-tab-panel am-fade am-in am-active">
                    <div class="login-layer">
                      <div class="table-cell">
                        <img src="/src/assets/icon/no_login.png?v=bbe14c9"/>
                        <p>详细信息请<a @click="$router.push('/account/login')">登录</a>后查看</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="more-info am-text-center am-text-muted" v-else>
              <img src="/src/assets/product/detail_arrow.png"/>
              向上滑动，查看更多信息
            </div>
          </div>
        </div>
      </div>
      <!--起投金额-->
      <div class="am-navbar subscription-btn" :class="voucherCount?'active':''">
        <div class="am-g">
          <div class="am-u-sm-6" v-if="submitBtnText==='立即出借'">
            <a class="am-btn am-btn-primary am-btn-block am-btn-lg" @click="onClickShoppingCart">
              加入购物车
            </a>
          </div>
          <div :class="submitBtnText==='立即出借'?'am-u-sm-6':'am-u-sm-12'">
            <a class="am-btn am-btn-block am-btn-lg invest-btn"
               :class="submitBtnText==='立即出借'?'am-btn-secondary':'btn-disabled'"
               @click="onClickSubmit">
              {{submitBtnText}}
              <p v-if="voucherCount" class="am-text-xs">有<span>{{voucherCount}}</span>个优惠券可用</p>
            </a>
          </div>
        </div>

      </div>
    </div>
    <input type="hidden" value="火速领福利，给自己涨工资！" id="shareDesc">
    <input type="hidden" value="${wapUrl!''}/public/images/logo-w.png" id="shareImg">
    <input type="hidden" :value="shareLink" id="shareLink">
    <!--购物车btn-->
    <shopping-cart-btn :isLogin="isLogin" :num="shoppingCartCount"></shopping-cart-btn>
    <!--分享提示遮罩-->
    <share-tips :showTips="shareTipsVisible" @onchangeVisible="onClickShareVisible"></share-tips>
    <!--风险评估-->
    <am-confirm :is-show.sync="confirmVisible" @confirm="onAssessStatusHandle" cancel-btn-text="我再看看"
                confirm-btn-text="去评测">
      <h4 v-if="riskTip">您风险评估已过期</h4>
      <h4 v-else>您尚未完成风险评估</h4>
      <p>风险评估旨在了解您对风险的承受能力，帮助您降低风险。</p>
    </am-confirm>
  </container>
</template>

<script>
  import Vue from "vue"
  import container from '@layout/container'
  import shareTips from '@components/shareTips'
  import {Confirm} from "@components/amaze/components/confirm"
  import shoppingCartBtn from '@components/shoppingCartBtn'
  import api from '@api'
  import {toJson, isWX} from '@/utils/utils'
  import {formatCurrency, formatDateToDay, formatDateToSecond} from '@/utils/utils'
  import {setBodyStyleBg, removeBodyStyleBg} from '@/utils/setBodyBg'
  import storage from '@/utils/sessionStore'
  import {mapActions, mapGetters, mapState} from "vuex"
  import MeScroll from 'mescroll.js'
  import VueClipboard from 'vue-clipboard2'
  import wx from 'weixin-js-sdk';

  Vue.use(VueClipboard)
  export default {
    name: "productDetail",
    components: {
      container,
      shareTips,
      shoppingCartBtn,
      'am-confirm': Confirm
    },
    data() {
      return {
        loanId: this.$route.params.id,
        loan: '',
        settleTime: '',
        loanLatter: '',
        currentTabsIndex: 0,
        userId: '',
        personFarm: '',
        companyScm: '',
        prdInfo: '',
        ext: '',
        picMap: [],
        guarantorStr: '',
        riskControl: '',
        orgRisk: '',
        recordListLoading: false,
        recordList: [],
        recordCount: 0,
        loanRepaymentPlans: [],
        shareDesc: '',
        shareTipsVisible: false,
        voucherCount: [],
        assessStatus: '',
        confirmVisible: false,
        riskTip: '',
        startY: 0,
        isShowTabsLayer: true
      }
    },
    computed: {
      ...mapGetters(['isLogin']),
      ...mapState({
        shoppingCartCount: state => state.shoppingCart.shoppingCartCount,
      }),
      productLimitType() {
        return this.loan.periodStr === "月" ? '个月' : this.loan.periodStr
      },
      nabBarTabsList() {
        let arr = ['项目详情', '风险评估', '出借记录']
        if (this.loan.loanStatus == '9' || this.loan.loanStatus == '6' || this.loan.loanStatus == '7' || this.loan.loanStatus == '8') {
          arr.push('还款计划')
        }
        if (this.loanLatter && this.loan.latterShow == '1' && ((this.loanLatter.amtPurpose != '') || (this.loanLatter.manageInfo != '') || (this.loanLatter.repayInfo != '') || (this.loanLatter.overdueSituation != '') || (this.loanLatter.lawsuits != '') || (this.loanLatter.penalize != '') || (this.loanLatter.other != ''))) {
          arr.push('贷后管理')
        }
        return arr
      },
      nabBarTabsWidth() {
        let docWidth = document.body.clientWidth;
        if (this.nabBarTabsList.length > 3) {
          return docWidth / 3 * this.nabBarTabsList.length
        }
        return docWidth
      },
      nabBarTabsLiWidth() {
        return this.nabBarTabsWidth / this.nabBarTabsList.length
      },
      shareTitle() {
        let platRate = parseFloat(this.loan.platRate)
        let awardRate = parseFloat(this.loan.awardRate)
        let totalRate = platRate
        if (awardRate && awardRate > 0) {
          totalRate += awardRate
        }
        return `年化${totalRate}%，别犹豫！`
      },
      shareLink() {
        return `${window.location.host}/spa/product/detail/${this.loan.loanId}`
      },
      shareImg() {
        return `${window.location.host}/src/assets/logo-w.png`
      },
      submitBtnText() {
        if (this.loan.loanStatus === "5") {
          return "放款中"
        } else if (this.loan.loanStatus === "6") {
          return "还款中"
        } else if (this.loan.loanStatus === "13") {
          let startTime = dayjs(this.loan.releaseTime).format('HH:mm')
          return `${startTime}开启`
        } else if (this.loan.loanStatus === "7") {
          return "已结清"
        }
        return '立即出借'
      }
    },
    filters: {
      formatCurrency,
      formatDateToDay,
      formatDateToSecond,
      degree(value) {
        switch (value) {
          case "0":
            return '小学'
          case "1":
            return '初中'
          case "2":
            return '高中'
          case "3":
            return '中专'
          case "4":
            return '大专'
          case "5":
            return '本科'
          case "6":
            return '硕士'
          case "7":
            return '博士'
          case "8":
            return '博士后'
          case "9":
            return '其它'
        }
      }
    },
    created() {
      setBodyStyleBg('#f9f9f9');
      api.GetProductDetailInfo(this.loanId).then(response => {
        this.loan = response.loan
        this.settleTime = response.settleTime
        this.loanLatter = response.loanLatter
        this.userId = response.userId
        this.setUserID(this.userId ? 'ok' : 'false')
        if (response.personFarm) {
          this.personFarm = response.personFarm
        }
        if (response.companyScm) {
          this.companyScm = response.companyScm
        }
        if (response.ext) {
          this.ext = response.ext
        }
        if (response.picMap) {
          this.picMap = response.picMap
        }
        this.prdInfo = response.prdInfo
        this.guarantorStr = response.guarantorStr
        this.riskControl = response.riskControl
        this.orgRisk = response.orgRisk
        this.loanRepaymentPlans = response.loanRepaymentPlans
        this.voucherCount = response.voucherCount | []
        this.assessStatus = response.assessStatus
        this.riskTip = response.riskTip
      }).then(() => {
        if (isWX()) {
          let url = encodeURIComponent(location.href.split('#')[0]);
          let token = {};
          let _wxData = {};
          api.GetWXToken({url: url}).then(data => {
            if (typeof data == 'undefined' || data == null) {
              token = {};
            } else {
              token = data.token;
            }
            token.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
            wx.config(token);
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: this.shareTitle, // 分享标题
                desc: "火速领福利，给自己涨工资！", // 分享描述
                imgUrl: this.shareImg
              });
              wx.onMenuShareAppMessage({
                title: this.shareTitle, // 分享标题
                desc: "火速领福利，给自己涨工资！", // 分享描述
                link: this.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareImg // 分享图标
              });
            });
          })
        }
      })
    },
    mounted() {

    },
    methods: {
      ...mapActions(['setUserID', 'setShoppingCartCount']),
      onClickHeaderBtn() {
        //微信分享按钮
        if (isWX()) {
          this.shareTipsVisible = true
        } else {
          this.$copyText(this.shareLink).then((e) => {
            this.$notify({
              message: '复制链接成功',
              type: 'success'
            });
            console.log(e)
          }, (e) => {
            this.$notify({
              message: e,
              type: 'warning'
            });
            console.log(e)
          })
        }
      },
      onClickChangeTabs(index) {
        this.currentTabsIndex = index
        if (index === 2 && !this.recordListLoading) {//加载一次出借记录
          this.recordListLoading = true
          this.doGetRecordList()
        }
      },
      doGetRecordList() {
        this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
          up: {
            callback: this.recordListUpCallback,
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
              tip: "暂无出借记录~", //提示
            }
          }
        })
      },
      recordListUpCallback(page) {
        //联网请求
        api.GetProductRecordList({
          pageNo: page.num,
          pageSize: page.size,
          id: this.loanId
        }).then((response) => {
          //请求的列表数据
          let data = toJson(response)
          if (page.num == 1) {//如果是第一页需手动制空列表
            this.recordList = []
          }
          this.recordCount = data.count
          this.recordList = this.recordList.concat(data.data)
          this.$nextTick(() => {
            this.mescroll.endBySize(data.data.length, data.count);
          })

        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      onClickShareVisible(visible) {
        this.shareTipsVisible = visible
      },
      onAssessStatusHandle() {
        window.location.href = "/member/auth/risk-ass"
      },
      onClickShoppingCart() {
        if (this.isLogin) {
          if (this.assessStatus) {
            api.AddShoppingCart({
              loanId: this.loanId,
              amt: this.loan.remainInestAmt
            }).then(response => {
              if (response.success) {
                this.$notify({
                  type: 'success',
                  message: '已成功加入购物车，请尽快确认支付'
                })
                this.setShoppingCartCount(response.data.itemCount)
              } else {
                this.$notify({
                  type: 'waring',
                  message: response.msg
                })
              }

            })
          } else {
            this.confirmVisible = true
          }
        } else {
          this.doLinkLoginPage()
        }
      },
      onClickSubmit() {
        if (this.isLogin) {
          this.$router.push(`/product/confirm/${this.loanId}`)
        } else {
          this.doLinkLoginPage()
        }
      },
      doLinkLoginPage() {
        this.$router.push({
          path: '/account/login', query: {
            callbackUrl: `/spa/product/detail/${this.loan.loanId}`
          }
        })
      },
      onClickHeaderNextBtn() {
        this.$router.push('/product/single')
      },
      touchStart(ev) {
        if (ev.touches.length == 1) { //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startY = ev.touches[0].clientY; // 记录开始位置
        }
      },
      touchMove(ev) {
        if (ev.touches.length == 1) {
          // 计算两次移动距离Y>X就不启动滑动动画,防止误滑
          let disY = this.startY - ev.touches[0].clientY
          if (Math.abs(disY) > 100) {
            this.isShowTabsLayer = true
          }
        }
      }
    },
    destroyed() {
      removeBodyStyleBg()
    }
  }
</script>

<style lang="less" scoped>

  @import "~@/style/less/views/product/detail.less";
</style>
