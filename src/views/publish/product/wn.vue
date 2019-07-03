<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img src="@/assets/about/wn_banner.png" class="banner"/>
      <div class="wn-info">
        <h3 class="am-text-center">微农贷简介</h3>
        <p class="tips">微农贷主要服务于农业全产业链，在产、供、销环节中的各农企、农户等优质涉农新型经营主体，为缓解三农领域资金支持不足的现况而提供的资金信息撮合服务。</p>
        <ul>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i
            class="wn-icon wn-icon-1"></i>
            <p>选择与有涉农业务的助贷机构进行业务合作，助贷机构为资产推荐方，将符合我司标准的客户推荐到我司平台；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i
            class="wn-icon wn-icon-2"></i>
            <p>由我司平台再次进行筛选、甄别，通过我司审查的优质资产将在平台发布信息；</p></li>
          <li v-animate="{name:'bounceIn',delay:.1,duration:.8}" class="am-cf"><i
            class="wn-icon wn-icon-3"></i>
            <p>平台对出借人、借款人提供信息撮合服务；</p></li>
        </ul>
      </div>
      <div class="kh-layer">
        <h3 class="am-text-center">借款客户</h3>
        <p class="am-text-center tips">客户背景</p>
        <ul class="title am-cf">
          <li v-animate="{name:'flipInY',delay:.1,duration:.8}" class="animation-hide">
            <i class="wn-icon wn-icon-5"></i>
            <p>专业种植大户、<br/>家庭承包农场</p>
          </li>
          <li v-animate="{name:'flipInY',delay:.1,duration:.8}" class="animation-hide">
            <i class="wn-icon wn-icon-6"></i>
            <p>农民合作社等<br/>新型农业经营主体</p>
          </li>
          <li v-animate="{name:'flipInY',delay:.1,duration:.8}" class="animation-hide">
            <i class="wn-icon wn-icon-4"></i>
            <p>各地农业加工生产型<br/>龙头企业</p>
          </li>
          <li v-animate="{name:'flipInY',delay:.1,duration:.8}" class="animation-hide">
            <i class="wn-icon wn-icon-57"></i>
            <p>三农贸易经营商</p>
          </li>
        </ul>
        <p class="am-text-center tips">准入条件</p>
        <ul class="condition">
          <li class="am-animation-delay-1 animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
            <p>种植、养殖类：</p>
            <p>具有完全民事行为能力的中华人民共和国公民（不包括港澳台）；</p>
            <p>种植、养殖达到一定规模且多年从事相关行业，对行业有一定的认知度；</p>
            <p>拥有真实的贷款目的和稳定的收入来源，还款能力充足。</p>
          </li>
          <li class="am-animation-delay-1 animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
            <p>加工、贸易类：</p>
            <p>企业运营时间长且稳定，整体财务状况良好；</p>
            <p>企业及法人代表拥有良好的信用记录；</p>
            <p>企业无相关不良诉讼或在执行案件。</p>
          </li>
        </ul>
      </div>
      <div class="use-layer">
        <h3 class="am-text-center">借款用途</h3>
        <p class="am-text-center">包括但不限于</p>
        <div class="opt-layer">
          <div class="wn-icon wn-icon-7 animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"></div>
          <div class="wn-icon wn-icon-8 animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}"></div>
          <div class="wn-icon wn-icon-9 animation-hide" v-animate="{name:'flipInY',delay:.1,duration:.8}"></div>
          <div class="wn-icon wn-icon-10 animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"></div>
          <div class="wn-icon wn-icon-11 animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}"></div>
        </div>
        <p class="am-text-center">等农业生产经营与农产品贸易流通场景</p>
      </div>
      <div class="mechanism-layer">
        <h3 class="am-text-center">合作机构</h3>
        <ul>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-43"></i>
            </p>
            <p data-am-scrollspy="{animation: 'scale-up'}">
              智通担保成立与2007年,为专注于专业市场及农产品贸易方面的专业担保公司。公司专注农产品贸易融资7年，拥有丰富的农产品资产资源，资源布局多个一、二级大型农批市场。
            </p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeIn',delay:.1,duration:.8}">
            <p class="am-text-center"><i class="wn-icon wn-icon-44"></i>
            </p>
            <p data-am-scrollspy="{animation: 'scale-up'}">
              盛进小贷加入深圳市小额贷款行业协会，且为小额贷款短期定向融资工具试点单位。企业在深圳开设多个分行，并积极拓展全国市场。公司2017年总放款金额超过54000万元，较2016年上升118%。合作方智通担保为专注于专业市场及农产品贸易方面的专业担保公司。公司专注农产品贸易融资7年，拥有丰富的农产品资产资源，资源布局多个一、二级大型农批市场。
            </p>
          </li>
        </ul>
      </div>
      <div class="standard-layer">
        <h3 class="am-text-center">项目标准</h3>
        <ul class="am-cf">
          <li class="animation-hide" v-animate="{name:'fadeInLeft',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-14"></i>
            <h4>借款期限</h4>
            <p>1个月-24个月</p>
          </li>
          <li class="animation-hide" v-animate="{name:'fadeInRight',delay:.1,duration:.8}">
            <i class="wn-icon wn-icon-15"></i>
            <h4>还款方式</h4>
            <p>先息后本</p>
            <p>允许借款人提前全额还款</p>
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
