<template>
  <div class="content" :class="{code:step!==1}">
    <transition name="slide-left" v-if="step===1">
      <div>
        <div class="form-layer">
          <form class="reg-form am-text-center">
            <!-- 滑块验证 -->
            <input type='hidden' id='csessionid' name='csessionid'/>
            <input type='hidden' id='sig' name='sig'/>
            <input type='hidden' id='token' name='token'/>
            <input type='hidden' id='scene' name='scene'/>
            <input type="hidden" id="slidercode" name="slidercode" value="false"/>
            <input type="tel" id="phone" v-model="form.mobile" v-validate="'required|mobile'" class="reg am-text-center" name="phone" placeholder="请输入手机号码" maxlength="11"/>
            <button @click.prevent="onClickRegBtn" class="reg-link">立即注册，领取福利</button>
          </form>
        </div>
        <div class="info-layer am-text-center">
          <div class="am-g">
            <div class="am-u-sm-6">
              <div class="wn-icon wn-icon-1"></div>
              <h4>上市背景</h4>
              <p>A股上市公司控股</p>
            </div>
            <div class="am-u-sm-6">
              <div class="wn-icon wn-icon-2"></div>
              <h4>银行存管</h4>
              <p>新网银行资金存管</p>
            </div>
          </div>
          <div class="am-g">
            <div class="am-u-sm-6">
              <div class="wn-icon wn-icon-3"></div>
              <h4>合规运营</h4>
              <p>拥抱监管，合规发展</p>
            </div>
            <div class="am-u-sm-6">
              <div class="wn-icon wn-icon-4"></div>
              <h4>风险管理</h4>
              <p>多重风控优质资产</p>
            </div>
          </div>
        </div>
        <div class="product-layer">
          <strong class="am-text-center text-primary tips">优质项目 自由选择</strong>
          <ul>
            <li>
              <div class="am-g title">
                <div class="am-u-sm-6">
                  <h1>易智投</h1>
                </div>
                <div class="am-u-sm-6 right am-text-right">
                  自动匹配 分散出借
                </div>
              </div>
              <div class="am-g info am-text-center">
                <div class="am-u-sm-6">
                  <div class="barge">新手专享一个月</div>
                  <div class="rate text-primary">12<span>%</span></div>
                  <p class="am-text-default">协议约定年化率</p>
                </div>
                <div class="am-u-sm-6">
                  <h4 class="am-text-default">委托期限</h4>
                  <p class="text-primary" style="margin:0 0 .2rem;">30天</p>
                  <h4 class="am-text-default">起投金额</h4>
                  <p class="text-primary">1000元</p>
                </div>
              </div>
              <div class="bottom am-text-center" @click="onClickToTop">
                立即委托
              </div>
            </li>
            <li class="last">
              <div class="am-g title">
                <div class="am-u-sm-6">
                  <h1>优质散标</h1>
                </div>
                <div class="am-u-sm-6 right am-text-right">
                  多种选择 方便灵活
                </div>
              </div>
              <div class="am-g info am-text-center">
                <div class="am-u-sm-6">
                  <div class="barge2 text-primary">微花贷</div>
                  <div class="rate text-primary">8<span>%</span></div>
                  <p class="am-text-default">协议约定年化率</p>
                </div>
                <div class="am-u-sm-6">
                  <h4 class="am-text-default">委托期限</h4>
                  <p class="text-primary" style="margin:0 0 .2rem;">30天</p>
                  <h4 class="am-text-default">起投金额</h4>
                  <p class="text-primary">100元</p>
                </div>
              </div>
              <div class="bottom am-text-center" @click="onClickToTop">
                立即出借
              </div>
            </li>
          </ul>
        </div>
        <div class="opt am-text-center">
          <h2 class="tips text-primary">简单四步,新手壕赚888元</h2>
          <ul class="text-primary">
            <li class="wn-icon wn-icon-5">
              <h4>01</h4>
              <div class="wn-icon wn-icon-888"></div>
              <p>30秒快速注册</p>
              <p>赚888元红包</p>
            </li>
            <li class="wn-icon wn-icon-5">
              <h4>02</h4>
              <div class="wn-icon wn-icon-logo"></div>
              <p>开通新网银行存管</p>
              <p>资金有保障</p>
            </li>
            <li class="wn-icon wn-icon-5">
              <h4>03</h4>
              <div class="wn-icon wn-icon-money"></div>
              <p>选择合适出借项目</p>
              <p>专享12%约定</p>
              <p>年化利率</p>
            </li>
            <li class="wn-icon wn-icon-5">
              <h4>04</h4>
              <div class="wn-icon wn-icon-earn"></div>
              <p>出借立返享收益</p>
            </li>
          </ul>
          <button @click="onClickToTop" class="reg-link">立即注册，领取福利</button>
        </div>
        <div class="copy-right">
          <p>© 2019 All Rights Reserved | 深圳市亿钱贷电子商务有限公司</p>
          <p><a href="http://www.miit.gov.cn/" rel="noopener noreferrer"
                target="_blank">粤ICP备14041671号-1</a> | 市场有风险，出借需谨慎</p>
        </div>
        <validator-modal :is-show="isShowCodeValidatorLayer" :mobile="form.mobile"
                         @onValidatorResult="onValidatorResult"></validator-modal>
        <reg-modal :mobile="form.mobile" :params="params" :tips-text="regTipsText" :is-show="regModalVisible"
                   @regResult="doRegResult" @visible-change="onChangeRegModalVisible"></reg-modal>
      </div>
    </transition>
    <transition name="slide-left" v-else>
    </transition>
  </div>

</template>

<script>
  import container from "@components/layout/container"
  import formErrorTips from "@components/form/formErrorTips"
  import validatorModal from "@components/validatorModal"
  import regModal from "@components/common/regModal"
  import sessionStore from '@/utils/sessionStore'
  import api from '@api'
  import '@/utils/validate'
  import {Validator} from "vee-validate";
  import {mapActions} from "vuex";

  Validator.localize({
    zh_CN: {
      attributes: {
        phone: "手机号码",
        userPassword: "登录密码"
      }
    }
  });
  export default {
    name: "recharge",
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        form: {
          mobile: '',
          userPassword: ''
        },
        submitBtn: {
          disable: false
        },
        step: 1,
        isShowCodeValidatorLayer: false,
        regModalVisible: false,
        recommendName: '',
        recommendCode: this.$route.query.code||'',
        params: this.$route.query
      }
    },
    components: {
      container,
      formErrorTips,
      validatorModal,
      regModal
    },
    created() {
      if (this.recommendCode) {
        api.GetRecommendRealName(this.recommendCode).then(response => {
          this.recommendName = response.realName
        })
      }
    },
    mounted() {
      //this.setStartCountDownState(true);
      //this.regModalVisible=true
      console.log(this.recommendCode)
    },
    destroyed() {

    },
    computed: {
      regTipsText() {
        if (this.recommendName) {
          return '您的好友' + this.recommendName + '邀请您一起来出借，并赠送您新手专属红包'
        }
        return ''
      }
    },
    filters: {},
    methods: {
      ...mapActions(['setStartCountDownState']),
      onClickRegBtn() {
        this.$validator.validateAll().then((result) => {
          console.log(result);
          if (result) {
            api.CheckUserName({account: this.form.mobile}).then(response => {
              let data = response.data;
              if (response.success) {
                this.isShowCodeValidatorLayer = true
              } else {
                this.$notify({
                  message: response.msg,
                  type: 'warning'
                });
              }
            }).catch(({data}) => {

            })
          } else {
            this.$notify({
              message: this.errors.all()[0],
              type: 'warning'
            });
          }
        });
        console.log(this.errors.any())
      },
      onValidatorResult(data) {//返回验签结果
        let result = data;
        if (result.success) {
          api.GetRegisterCode({captcha: ''}).then(response => {//发送短信验证
            if (response.success) {
              this.setStartCountDownState(true);//设置开始倒计时，必须在前面，因为modal还没加载
              this.regModalVisible = true;
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
            message: result.msg,
            type: 'warning'
          });
        }
      },
      onChangeRegModalVisible(visible) {
        this.regModalVisible = visible
      },
      onClickToTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      doRegResult(status) {
        this.$router.push({path: '/account/regSuccess'})
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/account/land.less";
  @import "../../style/css/sprite/land.css";
</style>
