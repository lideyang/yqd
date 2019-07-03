<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/wh_banner.png" class="banner"/>
      <div class="wn-info">
        <h3 class="am-text-center">微花贷简介</h3>
        <p class="tips">微花贷主要针对具有良好信用记录和稳定收入来源的客户群体，在有特定的消费场景和明确借款用途下，为其提供小额资金分期的信息撮合服务。</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-1"></i><p>选择与有分期业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="wh-kh-layer">
        <h3 class="am-text-center">借款客户</h3>
        <p class="am-text-center tips">客户背景</p>
        <ul class="title am-cf">
          <li class="am-g animation-hide" v-animate="{name:'fadeInDown',delay:.1,duration:.8}">
            <div class="am-u-sm-5 am-text-center">
              <i class="wn-icon wn-icon-26"></i>
            </div>
            <div class="am-u-sm-7">
              <p>本人主动申请且具有</p>
              <p>良好的信用记录和还款能力</p>
            </div>
          </li>
          <li class="am-g animation-hide" v-animate="{name:'bounceIn',delay:.1,duration:.8}">
            <div class="am-u-sm-5 am-text-center">
              <i class="wn-icon wn-icon-28"></i>
            </div>
            <div class="am-u-sm-7">
              <p>借款用途合规、明确，</p>
              <p>借款人年龄符合我司要求</p>
            </div>
          </li>
          <li class="am-g animation-hide" v-animate="{name:'fadeInUp',delay:.1,duration:.8}">
            <div class="am-u-sm-5 am-text-center">
              <i class="wn-icon wn-icon-27"></i>
            </div>
            <div class="am-u-sm-7">
              <p>限制高风险行业和</p>
              <p>高风险地区，优化客户群体</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="ql-use-layer wh-use-layer">
        <h3 class="am-text-center">助贷机构准入条件</h3>
        <ul>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide"><p>合作机构持续运营时间长</p><p>实缴资本和财务状况符合我司准入要求</p></div></li>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide"><p>拥有独立的风控体系</p><p>具有大数据风控审查能力</p><p>并拥有完整的各项业务流程</p></div></li>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide"><p>助贷机构或助贷机构的产品</p><p>在第三方评级优良</p></div></li>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide"><p>企业经营状况良好</p><p>底层资产优质、可靠</p></div></li>
        </ul>
      </div>
      <div class="mechanism-layer wh">
        <h3 class="am-text-center">合作机构</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-46"></i></p>
            <p data-am-scrollspy="{animation: 'scale-up'}">
              2012年起源于国际金融中心上海的北外滩，是一家致力于推动消费和金融行业进入移动化、智能化的科技公司。华兴资本、唯品会、红杉资本、蓝湖资本等风投背景，累计注册用户数超过3000万，多场景线上获客，通过大数据风控系统为金融机构提供助贷支持。
            </p>
          </li>
        </ul>
      </div>
      <div class="wh-hr"><div class="split"></div></div>
      <div class="standard-layer wh">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-29"></i>
            <h4>借款期限</h4>
            <p>1个月-24个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-30"></i>
            <h4>还款方式</h4>
            <p>等额本息</p>
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
