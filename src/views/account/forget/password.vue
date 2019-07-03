<template>
  <div class="account-layer forget-pwd-layer">
    <container title="重置登录密码">
      <div class="am-panel am-panel-default reg-panel pwd-panel">
        <div class="am-panel-bd">
          <form class="am-form am-form-horizontal" ref="updatewTradePwdForm" method="post" onautocomplete="off"
                action="/secure/findPwd/setLoginPwd">
            <div data-am-widget="titlebar" class="am-titlebar am-titlebar-default">
              <h2 class="am-titlebar-title ">
                重置登录密码
              </h2>
            </div>
            <div class="am-form-group">
              <input class="am-form-field" data-vv-scope="mobile" onautocomplete="off" v-validate="'required|mobile'" maxlength="11" type="tel"
                     pattern="[0-9]*"
                     name="userMobile" v-model="form.userMobile" placeholder="请输入手机号">
            </div>
            <div class="am-form-group code" style="position: relative;">
              <input class="am-form-field" maxlength="6" type="tel" pattern="[0-9]*" v-validate="'required|digits:6'"
                     v-model="form.verifyCode" name="verifyCode"
                     placeholder="请输入6位数字验证码">
              <count-down-btn ref="sendCodeBtn" @onClick="onClickSendCodeHandle" text="获取验证码"></count-down-btn>
            </div>
            <div class="am-form-group msg" :class="{show:errors.any()}">
              <p class="am-text-danger">{{errors.all()[0]}}</p>
            </div>
            <div class="am-form-group">
              <am-button :loading="submitBtn.disable" loading-text="登录中..." @click="onClickSubmitBtn"
                         class="am-btn am-btn-secondary am-round am-btn-block am-btn-xl">登录
              </am-button>
            </div>
          </form>
        </div>
      </div>
    </container>
    <validator-modal :is-show="isShowCodeValidatorLayer" :mobile="form.mobile" :is-sign="false"
                     @onValidatorResult="onValidatorResult"></validator-modal>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import formErrorTips from "@components/form/formErrorTips"
  import validatorModal from "@components/validatorModal"
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import countDownBtn from "@components/common/countDownBtn"
  import '@/utils/validate'
  import api from '@api'
  import {Validator} from "vee-validate"

  Validator.localize({
    zh_CN: {
      attributes: {
        userMobile: "手机号码",
        verifyCode: "验证码"
      }
    }
  });
  export default {
    name: "forgetPassword",
    components: {
      container,
      formErrorTips,
      validatorModal,
      countDownBtn
    },
    data() {
      return {
        form: {
          userMobile: '',
          verifyCode: ''
        },
        submitBtn: {
          disable: false
        },
        isShowCodeValidatorLayer: false,
      }
    },
    created() {

    },
    mounted() {
      setBodyBg('main-bg')
    },
    methods: {
      onClickSubmitBtn() {
        this.$validator.validateAll().then((result) => {
          console.log(result);
          if (result) {
            this.submitBtn.disable = true
            api.ForgetPwd(this.form).then(response => {
              if (response.success) {
                this.$refs.updatewTradePwdForm.submit();
              } else {
                this.$notify({
                  message: response.msg,
                  type: 'warning'
                });
                this.submitBtn.disable = false
              }
            })
          }
        });
      },
      onClickSendCodeHandle() {
        this.$validator.validate('mobile.*').then((result) => {
          console.log(result)
          if (result) {
            this.isShowCodeValidatorLayer = true
          }
        })
      },
      onValidatorResult(data) {//返回验签结果
        let result = data;
        if (result.code === 0) {
          api.ForgetPwdSendCode(Object.assign(result, {mobile: this.form.userMobile})).then(response => {//发送短信验证
            if (response.success) {
              this.$refs.sendCodeBtn.startCount()//开始倒计时
            } else {
              this.$notify({
                message: response.msg,
                type: 'warning'
              });
            }
            this.isShowCodeValidatorLayer = false;
          })
        } else {
          this.$notify({
            message: '验签失败',
            type: 'warning'
          });
        }
      },
    },
    beforeDestroy() {
      removeBodyBg('main-bg')
    },
  }
</script>

<style lang="less">
  @import "~@/style/less/views/account/forgetPwd";
</style>
