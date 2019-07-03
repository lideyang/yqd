<template>
  <div class="user-setting-layer">
    <container title="账户设置">
      <!--内容开始-->
      <div class="am-panel am-panel-default setting-panel">
        <div class="header">
          <div class="am-g name">
            <div class="am-u-sm-2 am-text-center">
              <img src="http://58.221.193.236/pic/5b922442e4b0607cc777c47f" id="userPicUrl"/>
            </div>
            <div class="am-u-sm-10 mobile">
              <span>{{userName}}</span>
              <a v-if="isDefaultUsername" class="am-text-primary am-fr"
                 href="${tzp.getContextPath()}/member/account/changeUserName">修改></a>
            </div>
          </div>
        </div>
        <div class="am-g risk">
          <div class="am-u-sm-12">
            账户交易设置
          </div>
        </div>
        <div class="menu">
          <div class="list">
            <div class="am-g">
              <a :href="userSecurity.depositary?'javascript:;':'/member/depository/form'">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-gov3 am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>存管账户</h2>
                  <p><span
                    :class="userSecurity.depositary?'am-text-muted':'am-text-secondary'">{{isOpenDepositary}}</span></p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i v-if="!userSecurity.depositary" class="icon-font icon-next am-text-muted"></i>
                </div>
              </a>

            </div>
            <div class="am-g">
              <a :href="userSecurity.checkName?'javascript:;':'${tzp.getContextPath()}/member/depository/form'">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-real-verifty am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>实名认证</h2>
                  <p><span :class="userSecurity.checkName?'am-text-muted':'am-text-danger'">{{checkName}}</span></p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i v-if="!userSecurity.checkName" class="icon-font icon-information am-text-danger"></i>
                </div>
              </a>
            </div>
            <div class="am-g">
              <a :href="bankCardURL">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-card2 am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>银行卡管理</h2>
                  <p>
                    <template v-if="userSecurity.bindBank">
                      <span class="am-text-muted">{{bankName}} {{bankID}}</span>
                      <span v-if="userBank.changeStatus==1" class="am-text-primary" style="margin-left:.05rem">更换</span>
                    </template>
                    <template v-else>
                      <span class="am-text-danger">绑卡</span>
                    </template>
                  </p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i v-if="userSecurity.bindBank" class="icon-font icon-information am-text-danger"></i>
                </div>
              </a>
            </div>
            <div class="am-g">
              <a @click="onClickCancelAuto"
                 :href="userSecurity.authListStatus?'javascript:;':'${tzp.getContextPath()}/member/secure/author'">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-risk2 am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>授权业务</h2>
                  <p><span @click="onClickCancelAuto" class="am-text-muted">{{authorizationText}}</span></p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i v-if="!userSecurity.depositary" class="icon-font icon-information am-text-danger"></i>
                </div>
              </a>
            </div>
            <div class="am-g">
              <a href="/member/auth/risk-ass">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-test am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>风险评测</h2>
                  <p>
                       <span class="am-text-muted">{{RiskAssessmentStatus}}
                          {{RiskAssessmentType}}
                      </span>
                  </p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i class="icon-font icon-next am-text-muted"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="am-g risk">
          <div class="am-u-sm-12">
            系统设置
          </div>
        </div>
        <div class="menu">
          <div class="list">
            <div class="am-g">
              <a href="/member/secure/password/update">
                <div class="am-u-sm-2 am-text-center icon">
                  <i class="icon-font icon-pwd am-text-primary"></i>
                </div>
                <div class="am-u-sm-9">
                  <h2>登录密码</h2>
                  <p><span class="am-text-muted">修改</span></p>
                </div>
                <div class="am-u-sm-1 am-text-right">
                  <i class="icon-font icon-next am-text-muted"></i>
                </div>
              </a>
            </div>
            <div class="am-g" @click="onClickTradePwd">
              <div class="am-u-sm-2 am-text-center icon">
                <i class="icon-font icon-pwd-login am-text-primary"></i>
              </div>
              <div class="am-u-sm-9">
                <h2>交易密码</h2>
                <p v-if="userSecurity.password">
                  <a class="am-text-default " href="/member/secure/xwtrpwd?type=0">修改</a>
                  <span class="split">|</span>
                  <a class="am-text-default" href="/member/secure/xwtrpwd?type=1">重置</a>
                </p>
                <p v-else>
                  <span class="am-text-danger">设置密码</span>
                </p>
              </div>
              <div class="am-u-sm-1 am-text-right link">
                <a :href="userSecurity.password?'/member/secure/xwtrpwd?type=0':'/member/depository/form'">
                  <i class="icon-font am-text-danger" :class="userSecurity.password?'icon-next':'icon-information'"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-am-widget="navbar" class="am-navbar subscription-btn">
        <a @click="onClickLogoutBtn" class="am-btn btn-disabled am-btn-block am-btn-xl weixin-btn">安全退出</a>
      </div>
    </container>
    <am-confirm :is-show.sync="autoConfirmVisible" title="取消授权投标" cancel-btn-text="暂不取消" @cancel="cancelAutoHandle"
                @confirm="confirmAutoHandle">
      <p class="am-text-danger"><i class="icon-font icon-information"></i>取消授权之后将无法投标!</p>
      <p>确认要取消授权投标吗？</p>
    </am-confirm>
  </div>
</template>

<script>
  import Vue from 'vue'
  import footerMenu from '@layout/footerMenu.vue'
  import depositoryModal from "@components/common/depositoryModal"
  import {Confirm} from "@components/amaze/components/confirm"
  import container from "@components/layout/container"
  import {setBodyStyleBg, removeBodyStyleBg, setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import {formatCurrency} from '@/utils/utils'
  import api from '@api'
  import localStore from '@/utils/localStore'
  import dayjs from 'dayjs'

  Vue.component(Confirm.name, Confirm)
  export default {
    name: 'Index',
    components: {
      container,
      footerMenu,
      depositoryModal,
    },
    filters: {
      formatCurrency
    },
    data() {
      return {
        userName: "",
        isDefaultUsername: "",
        userSecurity: {
          depositary: false,
          checkName: false,
          bindBank: false,
          authListStatus: false
        },
        realName: "",
        realID: "",
        bankName: "",
        bankID: "",
        RiskAssessmentStatus: "",
        RiskAssessmentType: "",
        repay: "",
        isShowOpenModal: true,
        isRiskAssessment: false,
        cashingAmount: "",
        arrivingCoupon: "",
        userBank: {
          changeStatus: 1
        },
        autoConfirmVisible: false
      }
    },
    created() {
      setBodyBg('main-bg')
      setBodyStyleBg('#f5f9fb');
      console.log(localStore.get('isShowMoney'));
      if (localStore.get('isShowMoney') !== null) {//本地存储是否显示金额
        this.isShowMoney = localStore.get('isShowMoney')
      }
      api.GetSettingInfo().then(response => {
        let data = response.data;
        this.userName = localStore.get('userInfo').name;
        this.isDefaultUsername = data.isDefaultUsername;
        this.userSecurity = data.userSecurity;
        this.realName = data.realName;
        this.realID = data.realID;
        this.bankName = data.bankName;
        this.bankID = data.bankID;
        this.RiskAssessmentStatus = data.RiskAssessmentStatus;
        this.RiskAssessmentType = data.RiskAssessmentType;
        this.repay = data.repay;
        this.isShowOpenModal = data.isShowOpenModal;
        this.isRiskAssessment = data.isRiskAssessment;
        this.cashingAmount = data.cashingAmount;
        this.arrivingCoupon = data.arrivingCoupon;
        //每天只一次存管提示
        if (data.isShowOpenModal) {
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
      })
    },
    computed: {
      isOpenDepositary() {

        console.log(this.userSecurity.depositary)
        return this.userSecurity.depositary ? "已开通" : '立即开通'
      },
      checkName() {
        return this.userSecurity.checkName ? this.realName + "(" + this.realID + ")" : '去实名认证'
      },
      bankCardURL() {
        if (this.userSecurity.bindBank) {
          if (this.userBank.changeStatus === 1) {
            return '/member/secure/changeCard'
          }
          return '/member/auth/myBankCard'
        }
        return '/member/depository/form'
      },
      authorizationText() {
        return this.userSecurity.depositary ? "取消授权" : "开启授权"
      },
      tradePwdURL() {
        return '/member/secure/xwtrpwd?type=' + this.userSecurity.password ? '0' : '1'
      },
      yesDayIncomeText() {
        return this.isShowMoney ? this.yesDayIncome : '*****'
      },
      amountText() {
        return this.isShowMoney ? this.amount : '*****'
      },
      planRepayText() {
        return this.isShowMoney ? this.planRepay : '*****'
      },
      repayText() {
        return this.isShowMoney ? this.repay : '*****'
      }
    },
    methods: {
      onClickLogoutBtn() {
        api.Logout().then(response => {
          if (response.status) {
            localStore.set('userInfo', null);
            this.$route.push('/account/login')
          }
        })
      },
      onClickTradePwd() {

      },
      onClickCancelAuto() {
        this.autoConfirmVisible = true
      },
      cancelAutoHandle() {

      },
      confirmAutoHandle() {
        api.SetCancelAuto({
          bankId: this.bankID
        }).then(response => {
          if (response.status) {
            this.userSecurity.depositary=false;
            this.$notify({
              message: '这是一条提示信息',
              delay:300000000,
              type:'success'
            });
          } else {

          }
        })
      }
    },
    mounted() {
    },
    destroyed() {
      removeBodyStyleBg()
      removeBodyBg('main-bg')
    },
  }
</script>

<style lang="less">
  @import "~@/style/less/views/user/setting.less";
</style>
