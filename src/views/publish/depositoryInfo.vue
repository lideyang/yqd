<template>
  <div class="publish-layer publish-depository-info-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <!-- 头部开始 -->
        <img class="banner" src="@/assets/depository/info/banner.png"/>
        <div class="boxer">
          <div class="wn-icon wn-icon-split">存管的好处</div>
          <ul>
            <li>
              <div class="icon am-fl">
                <div class="wn-icon wn-icon-icon1"></div>
              </div>
              <div class="info am-fl">
                <h4>账户独立</h4>
                <p class="am-text-muted">为用户开设专门的独立子账户，账户信息由银行保管</p>
              </div>
            </li>
            <li>
              <div class="icon am-fl">
                <div class="wn-icon wn-icon-icon2"></div>
              </div>
              <div class="info am-fl">
                <h4>资金隔离</h4>
                <p class="am-text-muted">用户资金和平台资金完全隔离，由存管银行进行分账管理与监督</p>
              </div>
            </li>
            <li>
              <div class="icon am-fl">
                <div class="wn-icon wn-icon-icon3"></div>
              </div>
              <div class="info am-fl">
                <h4>交易安全</h4>
                <p class="am-text-muted">资金交易环节均在存管银行系统进行，每笔交易均经用户授权</p>
              </div>
            </li>
          </ul>
          <img class="from" src="/public/images/depository/info/form.png"/>
        </div>
        <div class="guide">
          <div class="wn-icon wn-icon-split2"><span>银行存管操作指引</span></div>
          <div class="nav">
            <div class="wn-icon wn-icon-arrow-l am-fl" @click="onClickGuidePrev"></div>
            <span>Step<span>{{sliderIndex+1}}</span>:<span>{{sliderText}}</span></span>
            <div class="wn-icon wn-icon-arrow-r am-fr" @click="onClickGuideNext"></div>
          </div>
          <div class="guide-layer">
            <am-slider ref="guideSlider" class="guide-slider" :height="372" :auto-play="false" :direction-nav="false"
                       @onChange="onGuideChangeHandle">
              <am-slider-item>
                <img src="@/assets/depository/info/1.png"/>
              </am-slider-item>
              <am-slider-item>
                <img src="@/assets/depository/info/2.png"/>
              </am-slider-item>
              <am-slider-item>
                <img src="@/assets/depository/info/3.png"/>
              </am-slider-item>
              <am-slider-item>
                <img src="@/assets/depository/info/4.png"/>
              </am-slider-item>
              <am-slider-item>
                <img src="@/assets/depository/info/5.png"/>
              </am-slider-item>
            </am-slider>
          </div>
        </div>
        <div class="question">
          <div class="wn-icon wn-icon-split2"><span>银行存管常见问题</span></div>
          <ul>
            <li>
              <h3><i class="icon-font icon-wenhao1"></i>为什么要接入银行存管？</h3>
              <p class="am-text-muted">
                在P2P所有的用户保护措施中，存管是安全级别最高、技术含量最高、也是最难实现的一项。存管的核心原理是将平台和用户资金进行隔离，您出借的资金不再进入平台控制的账户，借款人和出借人之间的交易发生在双方的银行账户之间，平台无法触碰用户资金。
              </p>
            </li>
            <li>
              <h3><i class="icon-font icon-wenhao1"></i>为什么选择新网银行？ </h3>
              <p class="am-text-muted">
                新网银行于2016年6月份获得中国银监会筹建批复，注册资本为30亿元，由新希望集团、小米等股东发起设立，其中新希望集团出资9亿元，占股30%；小米出资8.85亿元，占股29.5%。新网银行定位为新一代互联网银行，致力于通过互联网技术为消费者和小微企业提供定制化的金融服务，也是继腾讯旗下微众银行、阿里旗下网商银行的全国第三家互联网银行。
              </p>
            </li>
            <li>
              <h3><i class="icon-font icon-wenhao1"></i>新网银行如何保障亿钱贷出借人的资金与交易安全？ </h3>
              <p class="am-text-muted">
                您的信息和资金由新网银行存管，平台不直接经手您的资金，也无权动用您在银行存管系统的资金。你通过银行存管账户出借成功后，资金将直接进入借款人账户。新网银行会对全交易流程进行核查，使借贷双方的债权关系清晰明确，保障您的资金安全。
              </p>
            </li>
            <li>
              <h3><i class="icon-font icon-wenhao1"></i>开户/激活时默认开通授权业务自动投标是什么？ </h3>
              <p class="am-text-muted">
                授权业务”是指用户授权互联网金融平台代为进行相关业务操作，平台指令将视为用户的真实意思表示， 用户对此予以接受和认可授权后，用户可在授权期限及授权金额范围内进行授权投标/授权还款/授权缴费等业务。当授权期限过期，或出借/还款/缴费等金额超过授权金额范围时，用户需重新授权。
                开户/激活后可手动取消授权业务，如果账户有未到期易智投项目则不可取消，取消授权业务将无法进行出借。
              </p>
            </li>
          </ul>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import {mapActions, mapGetters} from "vuex"
  import {Slider, SliderItem} from '@components/amaze/components/slider'

  const guideText = ['注册', '开通存管账户', '充值', '出借', '提现']
  export default {
    name: "companyProfile",
    components: {
      container,
      "publishNavBar": navBar,
      "publishTitle": title,
      'am-slider': Slider,
      'am-slider-item': SliderItem,
    },
    data() {
      return {
        sliderIndex: 0
      }
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText']),
      sliderText() {
        return guideText[this.sliderIndex]
      }
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
      onGuideChangeHandle(index) {
        this.sliderIndex = index
      },
      onClickGuidePrev() {
        this.$refs['guideSlider'].prevHandle()
      },
      onClickGuideNext() {
        this.$refs['guideSlider'].nextHandle()
      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('银行存管'))
    },
    mounted() {

    },
    destroyed() {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/css/icon/publish/depository/info.css";
  @import "~@/style/less/views/publish/depositoryInfo";
</style>
