<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/ql_banner.png" class="banner" />
      <div class="wn-info">
        <h3 class="am-text-center">企链贷简介</h3>
        <p class="tips">企链贷主要针对供应链模式中核心企业、第三方物流企业、上下游小微企业与商户，为其在生产经营过程中的产品，原材料的采购、流通、销售等环节提供资金信息撮合服务。</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-1"></i><p>选择与有供应链贷款业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="ql-kh-layer">
        <h3 class="am-text-center">借款客户</h3>
        <p class="am-text-center tips">客户背景</p>
        <ul class="title am-cf">
          <li class="am-g animation-hide" v-animate="{name:'fadeInDown',delay:.1,duration:.8}">
            <div class="am-u-sm-6">
              <i class="wn-icon wn-icon-16"></i>
            </div>
            <div class="am-u-sm-6">
              <p>核心企业</p>
              <p>上下游小微企业</p>
            </div>
          </li>
          <li class="am-g animation-hide" v-animate="{name:'bounceIn',delay:.1,duration:.8}">
            <div class="am-u-sm-6">
              <i class="wn-icon wn-icon-17"></i>
            </div>
            <div class="am-u-sm-6">
              <p>知名品牌下游分销商</p>
              <p>或上游供应商</p>
            </div>
          </li>
          <li class="am-g animation-hide" v-animate="{name:'fadeInUp',delay:.1,duration:.8}">
            <div class="am-u-sm-6">
              <i class="wn-icon wn-icon-18"></i>
            </div>
            <div class="am-u-sm-6">
              <p>大型物流企业与运输企业</p>
              <p>优质承运商</p>
            </div>
          </li>
        </ul>
        <p class="am-text-center tips">准入条件</p>
        <ul class="condition">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <p class="vertical-middle">从事合法经营活动，符合国家产业政策和发展规划且经营实体多年，发展稳定</p>
            <i class="wn-icon wn-icon-19"></i>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-20"></i>
            <p class="vertical-middle">拥有良好的信用记录，无相关重大涉诉信息和失信行为</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <p class="vertical-middle">企业法定代表人或实际控制人从事相关行业工作多年，对行业有较深的认识度</p>
            <i class="wn-icon wn-icon-21"></i>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-22"></i>
            <p class="vertical-middle">有明确的借款用途和稳定的还款来源，符合我司对增信措施的要求</p>
          </li>
        </ul>
        <p class="am-text-center tips">交易场景</p>
        <div class="cj-layer animation-hide" v-animate="{name:'fadeInUp',delay:.1,duration:.8}">
          <i class="wn-icon wn-icon-23"></i>
          <p class="vertical-middle">企业生产经营性借款，包括生产物料采买、设备维护、加工流通等企业日常经营与商贸类场景所需。</p>
        </div>
      </div>
      <div class="ql-use-layer">
        <h3 class="am-text-center">助贷机构准入条件</h3>
        <ul>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide">合作机构持续运营时间长、实缴资本和财务状况符合我司准入要求</div></li>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide"><p>具有相关细分行业（如医药、工业品、食品、快消、物流等）的市场开发能力</p></div></li>
          <li><div v-animate="{name:'zoomIn',delay:.1,duration:.8}" class="table animation-hide">创始人团队背景深厚，从事金融相关行业多年，高管团队发展稳定、可靠</div></li>
        </ul>
      </div>
      <div class="mechanism-layer ql">
        <h3 class="am-text-center">合作机构</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-12"></i></p>
            <p data-am-scrollspy="{animation: 'scale-up'}">
              深圳本地深晖集团股东 ，是最早经深圳市政府金融办批准设立的小额贷款公司之一，全国首家开创信息化供应链融资业务模式的小贷公司，公司定位于“做小微企业的最佳融资合作伙伴”，重点发展“1+N”信息化供应链融资业务，已发展小微供应链客户逾1000
              家。
            </p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-13"></i></p>
            <p data-am-scrollspy="{animation: 'scale-up'}">
              网信集团是一家综合金融科技服务集团，总部位于北京，服务辐射全国。依托先锋集团10多年来为中小企业提供投融资服务的经验积累与客户沉淀，基于持续创新与不断升级的支付引擎、数据引擎与智能引擎三大支撑体系，服务资产管理、交易平台、财富管理三大业务系统，构建全面、高效、开放、智能、共享的金融科技生态系统，为用户提供“金融+科技+生活方式”全方位综合金融服务。
            </p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-45"></i></p>
            <p>
              深圳鑫科国际商业保理有限公司是由北大光华管理学院EMBA和北大汇丰商学院校友发起设立的国内规模最大的全国性专业商业保理公司之一。鑫科国际保理立足前海，背靠珠三角、沿海和内陆发达地区，面向粤港澳、海外，以供应链节点企业和金融机构为目标客户，专注于医疗、公用市政、物流、房地产、快消、电子等行业的保理业务。
            </p>
          </li>
        </ul>
      </div>
      <div class="ql-hr"><div class="split"></div></div>
      <div class="standard-layer ql">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-24"></i>
            <h4>借款期限</h4>
            <p>1个月-12个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-25"></i>
            <h4>还款方式</h4>
            <p>先息后本，等额本息，</p>
            <p>等额本金</p>
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
