<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/lb_banner.png" class="banner" />
      <div class="wn-info">
        <h3 class="am-text-center">乐保贷简介</h3>
        <p class="tips">该项目主要针对群体为具有良好信用记录的个人和企业。在该群体向第三方机构提供不动产作为抵押且获取机构相应的增信(包括但不限于担保函，保函或借款保证保险)支持的基础上提供的信息撮合服务</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-1"></i><p>选择与有不动产抵押业务的第三方金融机构(类金融机构)合作，由其推荐借款客户到亿钱贷平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i class="wn-icon wn-icon-3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="lb-ms-layer">
        <h3 class="am-text-center">资产描述</h3>
        <div class="am-g animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}">
          <div class="am-u-sm-5 am-text-center">
            <img src="/src/assets/about/lb_pic1.png" />
          </div>
          <div class="am-u-sm-7">
            <strong>资产来源丰富</strong>
            <p>甄选北京等10座中心级城市进行不动产展业；</p>
          </div>
        </div>
        <div class="am-g animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}">
          <div class="am-u-sm-5 am-text-center">
            <img src="/src/assets/about/lb_pic2.png" />
          </div>
          <div class="am-u-sm-7">
            <strong>资产产权明晰</strong>
            <p>严筛司法、被执行等负面瑕疵记录；</p>
          </div>
        </div>
        <div class="am-g animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}">
          <div class="am-u-sm-5 am-text-center">
            <img src="/src/assets/about/lb_pic3.png" />
          </div>
          <div class="am-u-sm-7">
            <strong>评估价值客观</strong>
            <p>线上线下多维度综合评估资产域值；</p>
          </div>
        </div>
        <div class="am-g animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}">
          <div class="am-u-sm-5 am-text-center">
            <img src="/src/assets/about/lb_pic4.png" />
          </div>
          <div class="am-u-sm-7">
            <strong>抵押流程完备</strong>
            <p>区域团队协同机构实地办理产权登记；</p>
          </div>
        </div>
      </div>
      <div class="lb-kh-layer">
        <h3 class="am-text-center">借款客户</h3>
        <h3 class="am-text-center tips">准入条件</h3>
        <ul class="opt">
          <li class="animation-hide" v-animate="{name:'bounceInUp',delay:.1,duration:.8}">
            个人：具有持续稳定的收入来源，具备按期偿还贷款的能力；借款人具有良好的信用记录，未命中第三方征信查询黑名单。
          </li>
          <li class="animation-hide" v-animate="{name:'bounceInUp',delay:.1,duration:.8}">
            企业：企业、实际控制人及其法定代表人信用良好，未命中第三方数据黑名单。企业经营状态正常。
          </li>
        </ul>
      </div>
      <div class="lb-hr"><div class="split"></div></div>
      <div class="standard-layer lb">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-40"></i>
            <h4>借款期限</h4>
            <p>1个月-12个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-41"></i>
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
