<template>
  <div class="recharge-layer">
    <container title="充值" right-text="充值记录" @onClickRightBtn="onClickTitleText">
      <!--银行卡信息-->
      <div v-if="authCertificate" class="am-g bank-card-layer">
        <div class="am-u-sm-3 am-text-center bank-logo">
          <img v-if="form.bankCode" :src="require('@/assets/bank/icon/'+form.bankCode+'.png')"/>
        </div>
        <div class="am-u-sm-9">
          <h2 class="">{{form.bankName}}（尾号{{form.bankNo}}）</h2>
          <p>单笔<span class="am-text-secondary">{{form.singleAmount|formatAmountUnit}}</span><span class="split">|</span>单日{{form.signleDayAmount|formatAmountUnit}}
          </p>
        </div>
      </div>
      <!--充值面板-->
      <form class="recharge-form">
        <div class="input">
          <div class="am-form-group">
            <label class="am-text-muted">充值金额</label>
          </div>
          <div class="am-form-group money-group">
            <label>￥</label>
            <input type="tel" v-model="form.amount" v-validate="rechargeValidate" class="am-form-field money-txt"
                   maxlength="12" name="amount" :placeholder="rechargeInputPlaceholder"/>
            <formErrorTips :status="errors.has('amount')">{{ errors.first('amount') }}</formErrorTips>
          </div>
        </div>
        <p class="amount-info">
          <span class="am-text-muted">可用余额(元)：</span>{{account}}
        </p>
        <am-button @click="onClickSubmitBtn" :loading="submitBtn.disable" loading-text="请等待..."
                   custom-class="am-btn-secondary am-round am-btn-block am-btn-xl submit-btn">下一步
        </am-button>
        <p class="am-text-muted am-text-center am-text-xs tips">对充值后未出借的资金提现，将收取5元/笔的提现费</p>
      </form>
      <div class="am-text-center bottom">
        <img src="@/assets/user/recharge/czqt.png"/>
        <p class="am-text-muted">资金已由新网银行存管，安全更合规 </p>
      </div>
    </container>
    <!--提交新网充值form-->
    <form ref="xwForm" class="am-form info-form" id="xwform" method="post" :action="xwForm.action">
      <input v-for="(val,key,i) in xwForm.postMap" type="hidden" :name="key" :value="val"/>
    </form>
    <!--开通存管modal-->
    <depository-modal @visibleChange="onChangeDepositoryModalVisible" :is-click-show="!authCertificate"
                      :modalVisible="depositoryModalVisible"></depository-modal>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import formErrorTips from "@components/form/formErrorTips"
  import depositoryModal from "@components/common/depositoryModal"
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import api from '@api'
  import {formatAmountUnit} from '@/utils/utils'
  import '@/utils/validate'
  import {Validator} from "vee-validate";
  import {mapGetters, mapActions} from "vuex";

  Validator.localize({
    zh_CN: {
      attributes: {
        amount: "充值金额",
      }
    }
  });
  export default {
    name: "recharge",
    data() {
      return {
        account: "",
        form: {
          bankId: "",
          bankName: "",
          bankCode: "",
          loanMaxLimit: '',
          isInvest: false,
          singleAmount: '',
          remainderDayAmount: '',
          signleDayAmount: '',
          channelStatus: '',
          rechargeQuotaAmtStr: 100,
          amount: ''
        },
        submitBtn: {
          disable: false
        },
        xwForm: {
          action: '',
          postMap: {}
        },
        authCertificate: false,
        depositoryModalVisible: false
      }
    },
    components: {
      container,
      formErrorTips,
      depositoryModal
    },
    created() {
      setBodyBg('gray-bg');

    },
    computed: {
      rechargeInputPlaceholder() {
        return '请输入充值金额' + this.form.rechargeQuotaAmtStr
      },
      rechargeValidate() {
        return 'required|integer|rechargeSingleStroke:' + this.form.singleAmount+'|rechargeSingleDay:'+this.form.signleDayAmount+','+this.form.remainderDayAmount
      }
    },
    mounted() {
      api.RechargeInfo().then(response => {
        let data = response;
        if (data.authCertificate) {
          this.authCertificate = data.authCertificate;
          this.form.bankId = data.bankId
          this.form.bankCode = data.bankCode;
          this.form.bankName = data.bankName;
          this.form.bankNo = data.bankAccount.substring(data.bankAccount.length - 4, data.bankAccount.length);
          this.form.limit = data.limit;
          this.form.isInvest = data.isInvest
          this.form.singleAmount = data.singleAmount
          this.form.remainderDayAmount = data.remainderDayAmount
          this.form.signleDayAmount = data.signleDayAmount
          this.form.rechargeQuotaAmtStr = data.rechargeQuotaAmtStr
          this.form.channelStatus = data.channelStatus
        } else {
          this.depositoryModalVisible = true
        }
        this.account = data.availableAmt;
      })
      //this.depositoryModalVisible=true;
    },
    destroyed() {
      removeBodyBg('gray-bg')
    },
    filters: {
      CN_Date(value) {
        if (!value) return ''
        let Date = value.split('/');
        return Date[0] + '年' + Date[1] + '月' + Date[2] + '日'
      },
      formatAmountUnit
    },
    methods: {
      onClickTitleText() {
        this.$router.push({path: '/user/rechargeRecord'})
      },
      onClickSubmitBtn() {
        if (this.authCertificate) {
          this.$validator.validateAll().then((result) => {
            console.log(result);
            if (result) {
              this.submitBtn.disable = true;
              api.SubmitRecharge(this.form).then(response => {
                if (response.success) {
                  this.xwForm.action = response.jsonData.postUrl
                  let postMap = response.jsonData.postMap
                  for (let key in postMap) {
                    this.$set(this.xwForm.postMap, key, postMap[key])
                  }
                  setTimeout(() => {
                    console.log(this.xwForm.postMap)
                    this.$refs.xwForm.submit()
                  }, 500)
                } else {
                  this.$notify({
                    message: response.msg,
                    type: 'warning'
                  });
                  this.submitBtn.loading = true;
                }
              }).catch(({data}) => {

              })
            } else {

            }
          });
        } else {
          this.$notify({
            message: '请先绑定银行卡',
            type: 'warning'
          });
        }
      },
      onChangeDepositoryModalVisible(visible) {
        this.depositoryModalVisible = visible
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/user/recharge.less";
</style>
