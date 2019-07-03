<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/wq_banner.png" class="banner"/>
      <div class="wn-info">
        <h3 class="am-text-center">微企贷简介</h3>
        <p class="tips">微企贷是针对具有稳定经营记录与收入来源的中、小、微企业，在有明确生产经营的借款用途下，为其提供小额借款的信息撮合服务。</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-1"></i><p>选择与有中、小、微企业经营贷业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="wq-kh-layer">
        <div class="boxer">
          <h3 class="am-text-center">借款客户</h3>
          <p class="am-text-center tips">客户背景</p>
          <div class="title animation-hide" v-animate="{name:'heartBeat',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-53"></i>
            <p>各行业有稳定经营能力与收入来源的个体<br/>工商户与私营企业主等中、小、微客群。</p>
          </div>
          <ul class="list am-cf">
            <li class="am-g animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
              <div class="am-u-sm-2 am-text-center">
                <i class="wn-icon wn-icon-50"></i>
              </div>
              <div class="am-u-sm-10" data-am-scrollspy="{animation: 'slide-right'}">
                <p>身份：具有完全民事行为能力的中华人民共和国公民（不包括港澳台），年龄在18-65周岁；</p>
              </div>
            </li>
            <li class="am-g animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}">
              <div class="am-u-sm-2 am-text-center">
                <i class="wn-icon wn-icon-51"></i>
              </div>
              <div class="am-u-sm-10" data-am-scrollspy="{animation: 'slide-right'}">
                <p>工作：企业法定代表人或实际控制人、个体工商户户主等；</p>
              </div>
            </li>
            <li class="am-g animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
              <div class="am-u-sm-2 am-text-center">
                <i class="wn-icon wn-icon-52"></i>
              </div>
              <div class="am-u-sm-10" data-am-scrollspy="{animation: 'slide-right'}">
                <p>企业：经营稳定，财务状况良好，有稳定的还款来源且已真实连续经营6个月以上；</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="wq-use-layer">
        <h3 class="am-text-center">借款用途</h3>
        <p class="am-text-center tips">中小微企经营性借款</p>
        <div class="icon animation-hide" v-animate="{name:'bounceIn',delay:.1,duration:.8}"><p>包括但不限于：<br/>
          经营材料采买、货物周转、<br/>
          售货支出等</p>
        </div>
        <h3 class="am-text-center">助贷机构准入条件</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"><div class="table"><p>合作机构持续运营多年;</p><p>经营状况良好</p></div></li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"><div class="table"><p>拥有完善的风控体系和业务流程</p><p>具有较强的抗风险能力</p></div></li>
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"><div class="table"><p>合作机构整体资产状况表现良好</p><p>未出现重大不良风险</p></div></li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"><div class="table"><p>企业内控制度完善</p><p>符合我司相关准入条件</p></div></li>
        </ul>
      </div>
      <div class="mechanism-layer wq">
        <h3 class="am-text-center">合作机构</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-54"></i></p>
            <p>
              深圳市中安信业创业投资有限公司成立于2003年10月，是中国小额信贷技术服务行业的领军企业。十几年来，公司通过其微贷技术服务协助银行等金融机构为小微企业主、个体商户及工薪阶层提供快速简便、免抵押、免担保的小额信贷服务。
            </p>
          </li>
        </ul>
      </div>
      <div class="wq-hr"><div class="split"></div></div>
      <div class="standard-layer wq">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-55"></i>
            <h4>借款期限</h4>
            <p>1个月-24个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-56"></i>
            <h4>还款方式</h4>
            <p>等额本息,先息后本</p>
          </li>
        </ul>
      </div>
      <!--客服热线-->
      <div class="am-g kefu am-text-center">
        <p class="am-text-primary">
          客服热线 <a class="am-text-primary" :href="'tel:'+serviceTel">{{serviceTel}}</a>
        </p>
        <p class="am-text-muted time">
          服务时间 {{serviceTime}}
        </p>
      </div>
    </container>
    <sign/>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import {mapActions, mapGetters} from "vuex";
  import scrollAnimate from '@/utils/directive/scrollAnimate'
  import Vue from 'vue'

  Vue.use(scrollAnimate)
  export default {
    name: "companyProfile",
    components: {
      container,
      sign,
      "publishNavBar": navBar
    },
    data() {
      return {
        serviceTel: this.$store.state.common.serviceTel,
        serviceTime: this.$store.state.common.serviceTime
      }
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
    },
    created() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('项目介绍'))
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/css/icon/publish/product/introduce.css";
  @import "~@/style/less/views/publish/product";
  @import "../../../style/css/animation";
</style>
