<template>
  <div class="account-layer">
    <container title="微信绑定登录">
      <div class="am-panel am-panel-default reg-panel" style="height: 5.48rem">
        <div class="am-panel-bd">
          <div class="am-text-center wx-pic">
            <img src="@/assets/wx/login.png"/>
            <template v-if="wxName">
              <p>您的亿钱贷账号</p>
              <p>将与微信号 <span class="am-text-secondary">{{wxName}}</span>进行绑定</p>
            </template>
          </div>
          <form class="am-form" method="post" autocomplete="off" action="/secure/dologin">
            <div class="am-form-group form-icon reg-mobile">
              <i class="icon-left icon-font icon-account"></i>
              <input v-model="form.userLoginName" v-validate="'required|max:18'" autocomplete="new-password"
                     class="am-form-field" name="userLoginName" maxlength="18" type="text" placeholder="请输入手机号码或用户名">
            </div>
            <div class="am-form-group form-icon reg-mobile">
              <i class="icon-left icon-font icon-psw"></i>
              <input v-model="form.userPassword" v-validate="'required|max:20'" class="am-form-field" maxlength="20"
                     name="userPassword" autocomplete="password" type="password" placeholder="请输入您的登录密码">
            </div>
            <!--三次密码错误后-->
            <div v-if="isShowCode" class="am-form-group am-g form-icon code">
              <div class="am-u-sm-8">
                <i class="icon-left icon-font icon-msg"></i>
                <input class="am-form-field" v-validate="'required'" maxlength="5" name="captcha"
                       placeholder="请输入图形验证码">
              </div>
              <div class="am-u-sm-4 am-text-right">
                <img id="codePicBtn" src="/txjcaptcha.svl"/>
              </div>
            </div>
            <div class="am-form-group msg" :class="{show:errors.any()}">
              <p class="am-text-danger">{{errors.all()[0]}}</p>
            </div>
            <div class="am-form-group">
              <am-button :loading="submitBtn.disable" loading-text="登录中..." @click="onClickSubmitBtn"
                         class="am-btn am-btn-secondary am-round am-btn-block am-btn-xl">绑定登录
              </am-button>
            </div>
            <div class="am-g link">
              <div class="am-u-sm-6">
                <a href="/secure/register" class="am-text-primary">注册</a>
              </div>
              <div class="am-u-sm-6 am-text-right">
                <a @click="$router.push('/account/forget/pwd')" class="am-text-primary">忘记密码</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import formErrorTips from "@components/form/formErrorTips"
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import {setMaxDigits, RSAKeyPair, encryptedString} from '@/utils/safe'
  import sessionStore from '@/utils/sessionStore'
  import {isWX} from '@/utils/utils'
  import '@/utils/validate'
  import api from '@api'
  import {Validator} from "vee-validate";
  import {mapActions} from "vuex";

  Validator.localize({
    zh_CN: {
      attributes: {
        userLoginName: "手机号码或用户名",
        userPassword: "登录密码",
        captcha: '图形验证码'
      }
    }
  });
  let modulus = ''


  let exponent = ''
  export default {
    name: "recharge",
    data() {
      return {
        form: {
          userLoginName: '',
          userPassword: ''
        },
        submitBtn: {
          disable: false
        },
        isShowCode: false,
        wxName: this.$route.query.code ? decodeURI(this.$route.query.code) : false,
        isWx: isWX(),
        callbackUrl: this.$route.query.callbackUrl || '',
      }
    },
    components: {
      container,
      formErrorTips
    },
    created() {
      api.GetPwdEncryptionCode().then(response => {
        modulus = response.publicKeyMap.modulus
        exponent = response.publicKeyMap.exponent
      })
    },
    mounted(){
      setBodyBg('main-bg');
    },
    beforeDestroy(){
      removeBodyBg('main-bg')
    },
    filters: {},
    methods: {
      ...mapActions(['setUserID']),
      onClickSubmitBtn() {
        this.$validator.validateAll().then((result) => {
          console.log(result);
          if (result) {
            this.submitBtn.disable = true;
            setMaxDigits(130)
            let key = new RSAKeyPair(exponent, "", modulus)
            let result = encryptedString(key, this.form.userPassword)
            if (result) {
              api.Login({
                userLoginName: this.form.userLoginName,
                userPassword: result,
                bindWx: 1
              }).then(response => {
                if (response.successed) {
                  this.setUserID('ok')
                  //this.$router.push({path: '/user/center'})
                  this.$router.push('/user/center')
                } else {
                  this.$notify({
                    message: response.message,
                    type: 'warning'
                  });
                  if (response.captchaneed) {
                    this.isShowCode = true
                  } else {
                    this.isShowCode = false
                  }
                }
                this.submitBtn.disable = false;
              }).catch(({data}) => {

              })
            }
          }
        });
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/account/login.less";
</style>
