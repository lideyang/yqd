<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/yc_banner.png" class="banner"/>
      <div class="wn-info">
        <h3 class="am-text-center">优车贷简介</h3>
        <p class="tips">优车贷主要针对企业或个人名下拥有合法车辆的车主。提供名下车辆作为抵押物，依据车辆资产价值，为其快速取得资金的信息撮合服务。</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-1"></i>
            <p>选择与有车贷业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-2"></i>
            <p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-3"></i>
            <p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="yc-kh-layer">
        <h3 class="am-text-center">借款客户</h3>
        <p class="am-text-center tips">客户背景</p>
        <ul class="title am-cf">
          <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
            <div class="am-u-sm-4 am-text-center">
              <i class="wn-icon wn-icon-31"></i>
            </div>
            <div class="am-u-sm-8" data-am-scrollspy="{animation: 'slide-top'}">
              <p>车辆在个人或公司名下且经过</p>
              <p>第三方合理评估、报价</p>
            </div>
          </li>
          <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
            <div class="am-u-sm-4 am-text-center">
              <i class="wn-icon wn-icon-32"></i>
            </div>
            <div class="am-u-sm-8">
              <p>有稳定收入来源的工薪、</p>
              <p>自雇人士和企业</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="yc-use-layer">
        <h3 class="am-text-center">助贷机构准入条件</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"><i
            class="wn-icon wn-icon-33"></i>
            <p>合作机构持续运营多年，经营状况良好</p></li>
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"><i
            class="wn-icon wn-icon-34"></i>
            <p>有建立完善的风控体系和贷后管理工作流程</p></li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"><i
            class="wn-icon wn-icon-35"></i>
            <p>市场开拓能力强，资产质量较为优秀</p></li>
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"><i
            class="wn-icon wn-icon-36"></i>
            <p>车辆相关业务发展良好,未出现重大不良情况</p></li>
        </ul>
      </div>
      <div class="mechanism-layer yc">
        <h3 class="am-text-center">合作机构</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-49"></i></p>
            <p>
              公司以汽车金融为主入口，致力于打造汽车全产业链的综合性服务平台。实际控制人系知名P2P车贷平台“钱吧”创始人，平台是目前山东地区业绩和风控最好的车贷平台之一，在全国车贷行业排名前四，集团综合实力与盈利能力较强。截至2018年10月，平台累计成交额超过38亿。
            </p>
          </li>
        </ul>
      </div>
      <div class="yc-hr">
        <div class="split"></div>
      </div>
      <div class="standard-layer yc">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-37"></i>
            <h4>借款期限</h4>
            <p>1个月-24个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-38"></i>
            <h4>还款方式</h4>
            <p>先息后本，等额本息</p>
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
