<template>
  <div class="activity-may-layer">
    <div class="main-content">
      <div class="red-layer am-text-center">
        <p class="am-text-center tips">待收本金满1000元可领,今日剩余可领数量为<span>{{5-count}}</span>个</p>
        <ul id="redList">
          <li v-for="(item,index) in list">
            <i class="wn-icon num" :class="'wn-icon-'+index"></i>
            <i class="wn-icon wn-icon-pan"></i>
            <p>{{item.limit}}</p>
            <a class="btn" :class="count===5?'btn-disabled':'btn-link'" href="javascript:;" @click="onClickReceive(item)">{{listBtnText}}</a>
          </li>
        </ul>
      </div>
      <div class="double-layer am-text-center" :class="{double:isLogin&hasDouble}">
        <p class="tips">周期一个月</p>
        <p class="">您的返现金额（元）</p>
        <p class="repay-amount">{{awardAmt}}</p>
        <p v-if="isLogin&hasDouble" class="double-amount">+{{doubleAmt}}（翻倍奖励）</p>
        <p class="year-amount">年化出借金额：￥{{yearAmt}}</p>
        <a class="btn" :class="isLogin&hasDouble?'btn-disabled':'btn-link'" @click="onClickDoubleBtn">{{doubleBtnText}}</a>
        <p class="bottom">邀请好友返现可翻倍一次，最高100元</p>
      </div>
    </div>
    <div class="opt">
      <h4 class="">返现规则</h4>
      <ul>
        <li>1）活动期间出借的金额（债权转让除外），获得年化出借金额一个月3.6%的返现，返现周期1个月。</li>
        <li>2）返现金额=年化出借金额*3.6%/12。</li>
        <li>3）活动期间邀请1个好友注册并出借满1000元（债权转让除外），在返现金额的基础上可获得最高100元的翻倍，限翻倍1次。
          举例：当前我的返现金额为50元，活动期间邀请1人出借满1000元，则可实现翻倍，则可获得50+50的返现，也可以在返现金额满100后再翻倍，则可返现100+100元。
        </li>
        <li>4）返现金额在活动结束后7个工作日发放</li>
        <li>
          5）活动时间：2019年5月1日-2019年5月31日<br/>
          年化出借计算方式：<br/>
          1）易智投/每月付息到期还本/一次性还本付息：年化=出借金额*(期限/12)<br/>
          2）等额本息项目<br/>
          期限≤3个月：年化=出借金额*(期限/12)*0.7<br/>
          3个月＜期限≤6个月：年化=出借金额*(期限/12)*0.6<br/>
          期限＞6个月：年化=出借金额*(期限/12)*0.55<br/>
          说明：若是天标，则换算成月，月=项目天数/30<br/>
          每笔出借换算的年化金额保留两位小数，两位小数后面位舍去。
        </li>
      </ul>
    </div>
    <div class="copy-right">
      <p>© 2019 亿钱贷 | All rights reserved </p>
      <p>深圳市亿钱贷电子商务有限公司 <a href="http://www.miit.gov.cn/" rel="noopener noreferrer" target="_blank">粤ICP备14041671号-1</a>
      </p>
      <p>市场有风险，出借需谨慎</p>
    </div>
    <am-modal class="activity-may-tips-modal am-text-center" @visible-change="onChangeModalVisible"
              :isShow="isShowModal" :closeBtn="false" :width="600">
      <am-modal-body>
        <template v-if="status===1||status===2">
          <h2>返现到家</h2>
          <p class="am-text-left tips">活动期间邀请1人注册且出借满1000元，可获得最高100元的翻倍奖励</p>
          <p class="am-text-left tips" v-if="status===2">
            您已经成功邀请了好友注册，但TA尚未出借满1000元，赶紧通知他去出借吧。
          </p>
          <a class="btn btn-link" @click="onRecommendHandle">邀请好友</a>
        </template>
        <template v-else-if="hasDouble">
          <h2>翻倍成功</h2>
          <p>恭喜您总共获得{{totalReward}}元奖励</p>
          <a class="btn btn-link" @click="onClickCloseModal">我知道了</a>
        </template>
        <template v-else-if="!hasDouble">
          <h2>返现到家</h2>
          <p class="tips">只能翻倍一次哦，最高可翻倍100元，返现奖励满100更划算</p>
          <a class="btn btn-link" @click="onProductListHandle">继续出借</a>
          <a class="btn btn-link" @click="onClickGoOnBtn">继续翻倍</a>
        </template>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal2 am-text-center" @visible-change="onChangeModal2Visible"
              :isShow="isShowModal2" :closeBtn="false" :width="6.88" cssUnit="rem">
      <am-modal-body>
        <h2>恭喜您领取成功</h2>
        <p>您今日已经领取了<strong class="am-text-danger">{{count}}</strong>张</p>
        <p class="tips">还可以领取<strong class="am-text-danger">{{5-count}}</strong>张</p>
        <a @click.prevent="isShowModal2=false">好的</a>
      </am-modal-body>
    </am-modal>
    <am-confirm :is-show.sync="confirmVisible" @confirm="onProductListHandle">
      <h4>今日领取奖励券已达到上限，去出借赚取收益吧。</h4>
    </am-confirm>
  </div>

</template>

<script>
  import {formatCurrency, toJson} from '@/utils/utils'
  import {setViewport} from '@/utils/tool'
  import {Confirm} from "@components/amaze/components/confirm"
  import api from '@api'

  export default {
    name: "may",
    components: {
      'am-confirm': Confirm
    },
    data() {
      return {
        count: 0,//加息券领取数量
        awardAmt: 0,//返现金额
        doubleAmt: 0,//翻倍金额
        yearAmt: 0,
        status: 0,
        hasDouble: true,
        list: [],
        isShowModal: false,
        isShowModal2: false,
        confirmVisible: false,
        isLogin: false
      }
    },
    created() {
      setViewport(2)
      api.GetMayInfo().then(response => {
        let data = toJson(response)
        console.log(data)
        this.count = data.count
        this.list = data.rules
        if (data.doubleMap) {
          this.isLogin = true;
          this.awardAmt = data.doubleMap.awardAmt
          this.doubleAmt = data.doubleMap.doubleAmt
          this.yearAmt = data.doubleMap.yearAmt
          this.status = data.doubleMap.status
          this.hasDouble = data.doubleMap.hasDouble
        } else {
          this.isLogin = false;
        }
      })
    },
    computed: {
      totalReward() {
        return this.awardAmt + this.doubleAmt
      },
      doubleBtnText() {
        return this.isLogin&&this.hasDouble ? '已翻倍' : '我要翻倍'
      },
      listBtnText() {
        return this.count==5 ? '明日再来' : '点击领取'
      }
    },
    mounted() {

    },
    methods: {
      doLinkLoginURL() {
        setViewport(1)
        this.$router.push({
          path: '/account/login', query: {
            callbackUrl:'/spa/activity/may'
          }
        })
      },
      onClickReceive(item) {
        if (this.isLogin) {
          if (this.count < 5) {
            api.GetMayReward(item.ruleId).then(response => {
              if (response.success) {
                this.count = this.count + 1
                this.isShowModal2 = true
              } else {
                this.$notify({
                  message: response.msg,
                  type: 'warning'
                });
              }
            })
          } else {
            //this.confirmVisible = true
          }
        } else {
          this.doLinkLoginURL()
        }
      },
      onRecommendHandle() {
        window.location.href = '/event/recommend';
      },
      onProductListHandle() {
        window.location.href = '/product/index';
      },
      async onClickDoubleBtn() {
        if (this.isLogin) {
          if (!this.hasDouble) {
            if (this.status === 4) {//满足100翻倍奖励直接请求
              await this.doSubmitDouble()
            }
            this.isShowModal = true
          }
        } else {
          this.doLinkLoginURL()
        }
      },
      onClickCloseModal() {
        this.isShowModal = false
      },
      onChangeModalVisible(visible) {
        this.isShowModal = visible
      },
      onChangeModal2Visible(visible) {
        this.isShowModal2 = visible
      },
      async onClickGoOnBtn() {
        await this.doSubmitDouble()
      },
      async doSubmitDouble() {
        api.MayDouble().then(response => {
          if (response.success) {
            this.hasDouble = true
            this.doubleAmt = parseFloat(response.msg)
          } else {
            this.$notify({
              message: response.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    destroyed() {
      setViewport(1)
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/may.less";
  @import "../../style/css/icon/active/may.css";
</style>
