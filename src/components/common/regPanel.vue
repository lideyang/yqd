<template>
  <div class="reg-panel code-panel">
    <div v-if="tipsText" class="tips">{{tipsText}}</div>
    <form class="am-form am-form-horizontal reg-form" autocomplete="off" novalidate="novalidate">
      <div class="am-form-group">
        <div class="am-u-sm-12">
          <input class="am-form-field reg" :value="mobile" maxlength="6" type="tel" readonly name="mobile"
                 placeholder="请输入手机号码">
        </div>
      </div>
      <div class="am-form-group">
        <div class="am-u-sm-12">
          <input class="am-form-field reg" maxlength="20" v-model="form.userPassword"
                 v-validate="'required|max:20|min:8'"
                 type="password" autocomplete="new-password" name="userPassword" placeholder="请设置密码">
        </div>
      </div>
      <div v-if="!isFirstCode" class="am-form-group code">
        <div class="am-u-sm-12">
          <input class="am-form-field reg" v-model="form.captcha" v-validate="'required|max:5|min:5'" maxlength="5"
                 name="captcha" placeholder="请输入图形验证码">
          <img class="cod-pic" @click="doUpdateCodePic" :src="codePicUrl"/>
        </div>
      </div>
      <div class="am-form-group code">
        <div class="am-u-sm-12">
          <input class="am-form-field reg" v-model="form.phoneCode" v-validate="'required|max:6|min:6'" maxlength="6" type="tel"
                 pattern="[0-9]*" name="phoneCode" placeholder="请输入手机验证码">
          <count-down-btn ref="sendCodeBtn" :start="isStartCountDown" @onClick="onClickSendCodeBtn" @onEnd="onSendCodeBtnEnd"></count-down-btn>
        </div>
      </div>
      <div style="display: none" class="am-form-group">
        <div class="am-u-sm-12">
          <input class="am-form-field reg" v-model="form.recommendCode" v-validate="'max:11'" maxlength="11"
                 name="recommendCode" placeholder="请输入推荐码(选填)">
        </div>
      </div>
      <div class="am-form-group agreement">
        <am-checkbox v-model="form.agree">
          <span class="vertical-align">我已阅读并同意</span>
          <a class="am-text-primary vertical-align" href="/contract/zhuce">《亿钱贷注册协议》</a>
          <a class="am-text-primary vertical-align" href="/contract/debt-risk">《风险及禁止性行为提示书》</a>
        </am-checkbox>
      </div>
      <div class="am-form-group msg">
        <p v-show="errors.any()" class="am-text-danger"><i class="icon-font icon-error"></i>{{errors.all()[0]}}</p>
      </div>
      <am-button :disabled="submitBtn.disable" @click="onClickSubmitBtn" class="reg-link">立即注册，领取福利</am-button>
    </form>
  </div>
</template>

<script>
  import "@/utils/ali_validate"
  import '@/utils/validate'
  import {toJson} from "@/utils/utils"
  import countDownBtn from "@components/common/countDownBtn"
  import api from '@api'
  import {Validator} from "vee-validate";
  import CountDownBtn from "@/components/common/countDownBtn";
  import { mapState,mapActions } from "vuex";
  Validator.localize({
    zh_CN: {
      attributes: {
        userPassword: "登录密码",
        phoneCode: "数字验证码",
        captcha: '图形验证码',
        recommendCode: '推荐码'
      }
    }
  });
  export default {
    name: "validatorModal",
    components: {CountDownBtn},
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      mobile: {
        type: String,
        default: ''
      },
      tipsText: {
        type: String,
        default: ''
      },
      params:{
        type:Object,
        default:{}
      }
    },
    computed: mapState({
      isStartCountDown: state => state.reg.isStartCountDown
    }),
    component: {
      countDownBtn
    },
    data() {
      return {
        isFirstCode: true,
        form: {
          recommendCode: this.params.code||"",
          phoneCode: '',
          userPassword: '',
          captcha: '',
          agree: false,
        },
        submitBtn: {
          disable: false
        },
        codePicUrl: '/txjcaptcha.svl'
      }
    },
    mounted(){
      console.log(this.params)
      if(this.isStartCountDown){
        this.$refs.sendCodeBtn.startCount();
      }
    },
    methods: {
      ...mapActions(['setStartCountDownState']),
      onClickSubmitBtn() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if(!this.form.agree){
              this.$notify({
                message: '请勾选同意注册协议',
                type: 'warning'
              });
              return
            }
            this.submitBtn.disable = true;
            let params=Object.assign(this.form,this.params)//合并传参
            api.Register(params).then(response => {
              let result=toJson(response)
              console.log(result)
              if (result.success) {
                this.$emit('regResult','success');
              } else {
                this.$notify({
                  message: result.msg,
                  type: 'warning'
                });
              }
              this.submitBtn.disable = false;
            }).catch(({data}) => {

            })
          } else {

          }
        });
      },
      onClickSendCodeBtn() {
        this.isFirstCode = false;
        this.$validator.validate('captcha').then(result => {
          if (!result) {//没有填写图形验证码
            this.$notify({
              message: this.errors.first('captcha'),
              type: 'warning'
            });
            return
          }
          api.GetRegisterCode({//提交发送短信
            captcha: this.form.captcha
          }).then(response => {
            if (response.success) {
              this.setStartCountDownState(true);
              this.$refs.sendCodeBtn.startCount();
            } else {
              this.$notify({
                message: response.msg,
                type: 'warning'
              });
            }
            this.doUpdateCodePic();//更新验证码
          })
        })
      },
      onSendCodeBtnEnd() {
        this.setStartCountDownState(false)
      },
      doUpdateCodePic() {
        let src = this.codePicUrl;
        if (src.indexOf('?') > 0) {
          src = src.substring(0, src.indexOf('?'));
        }
        this.codePicUrl = src + '?r=' + Math.random();
      }
    }
  }
</script>

<style lang="less" scoped>
  .reg-panel {
    padding: 0 0 .5rem;

    .tips {
      border-radius: 8px 8px 0 0;
      background-color: #fff9a1;
      padding: .1rem .2rem;
    }

    .reg-form {
      padding: .1rem .2rem;

      .am-form-group {
        margin: 0;

        &.agreement {
          margin: .1rem 0;

          .am-checkbox-inline {
            padding-top: 0;

            input {
              margin-top: 0;
            }

            i {
              font-size: 20px;
            }
          }
        }

        &.code {
          .cod-pic {
            position: absolute;
            right: 0;
            top: .1rem;
            width: 1rem;
          }
        }

        &.msg {
          height: 20px;

          p {
            margin: 0;

            i {
              margin: 0 .05rem 0 0
            }
          }
        }

        .am-form-field {
          padding: .15rem .05rem;
          border-color: #bfbfbf !important;
          background-color: #fff;
        }

        a.re-send-btn {
          position: absolute;
          top: .12rem;
          right: .1rem;
        }

        .am-checkbox-inline {
          font-size: 12px;
        }
      }
    }

    .reg-link {
      margin: .3rem auto 0;
      padding: 0;
      display: block;
      width: 2.6rem;
      height: .5rem;
      line-height: .5rem;
      background-color: #f36d4f;
      border-radius: .4rem;
      border: none;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
</style>
