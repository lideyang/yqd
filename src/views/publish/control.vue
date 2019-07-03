<template>
  <div class="publish-layer publish-control-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <publish-title class="title">风控管理架构</publish-title>
        <div class="banner">
          <img src="@/assets/publish/control_banner.png" />
        </div>
        <div class="strategy">
          <publish-title class="title">风控策略</publish-title>
          <div class="list opt">
            <ul class="am-cf">
              <li>
                <div class="wn-icon wn-icon-1"></div>
                <p>初审立项</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-2"></div>
                <p>实地尽调</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-3"></div>
                <p>风险审查</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-4"></div>
                <p>上会审议</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-5"></div>
                <p>确认合作</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-6"></div>
                <p>定期评估</p>
              </li>
            </ul>
            <div class="title"><span>合作机构</span></div>
          </div>
          <div class="list per">
            <ul class="am-cf">
              <li>
                <div class="wn-icon wn-icon-7"></div>
                <p>提交申请</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-8"></div>
                <p>信用评估</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-9"></div>
                <p>人工复核</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-10"></div>
                <p>发布标的</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-11"></div>
                <p>撮合交易</p>
              </li>
              <li>
                <div class="wn-icon wn-icon-12"></div>
                <p>贷后跟踪</p>
              </li>
            </ul>
            <div class="title"><span>借款人</span></div>
          </div>
          <ul class="info">
            <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
              <div class="am-u-sm-3 icon">
                <div class="wn-icon wn-icon-13"></div>
              </div>
              <div class="am-u-sm-9">
                <p><strong>专业团队</strong></p>
                <p class="am-text-muted">公司组建了涵盖传统金融与互金大数据领域的资深专业团队，建立多层次风控审核制度，严守项目风控底线</p>
              </div>
            </li>
            <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
              <div class="am-u-sm-3 icon">
                <div class="wn-icon wn-icon-14"></div>
              </div>
              <div class="am-u-sm-9">
                <p><strong>多维度评估</strong></p>
                <p class="am-text-muted">从多维度对合作机构股东背景、经营财务、增信措施等方面进行多维度综合评估，采用评审专家表决制， 集体审议，独立表决。</p>
              </div>
            </li>
            <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
              <div class="am-u-sm-3 icon">
                <div class="wn-icon wn-icon-15"></div>
              </div>
              <div class="am-u-sm-9">
                <p><strong>小额分散</strong></p>
                <p class="am-text-muted">遵循小额分散原则，对借款人信用情况、生产情况、财务情况、资金用途、还款能力等方面进行综合评估，确保推荐资产优质合规。</p>
              </div>
            </li>
            <li class="am-g animation-hide" v-animate="{name:'flipInX',delay:.1,duration:.8}">
              <div class="am-u-sm-3 icon">
                <div class="wn-icon wn-icon-16"></div>
              </div>
              <div class="am-u-sm-9">
                <p><strong>贷后跟踪</strong></p>
                <p class="am-text-muted">贷后管理团队采用非现场检查+现场抽查形式对未到期项目持续跟踪管理，做好定期报告、及时披露、兑付提醒、突发状况预警等工作</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="grade">
          <publish-title class="title">风险分级</publish-title>
          <ul>
            <li class="animation-hide" v-animate="{name:'zoomIn',delay:.1,duration:.8}">
              <img src="@/assets/publish/control_list1.png" />
              <div class="info">
                <p><strong>资产项目风险分级</strong></p>
                <p>亿钱贷平台对每一个发标资产根据其资产保障措施、合作机构资信、借款人资信及其他风险补偿指标，核定借款项目综合风险分级，风险分级结果分为WR1（保守型）、WR2（稳健型）、WR3（平衡型）、WR4（积极型）四种类型，匹配至不同风险偏好的出借人。</p>
              </div>
            </li>
            <li class="animation-hide" v-animate="{name:'zoomIn',delay:.1,duration:.8}">
              <img src="@/assets/publish/control_list2.png" />
              <div class="info">
                <p><strong>出借人风险分级</strong></p>
                <p>亿钱贷平台根据风险评估结果对出借人实行分级管理，并设置可动态调整的出借限额和出借标的限制，合格出借人需要具备相应风险识别能力和风险承担能力。风险分级结果分为保守型、稳健型、平衡型、积极型四种类型，匹配至不同借款项目风险等级。</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="system">
          <publish-title class="title">技术保障</publish-title>
          <div class="am-g list">
            <div class="am-u-sm-6 animation-hide" v-animate="{name:'slideInLeft',delay:.1,duration:.8}">
              <div class="icon">
                <div class="wn-icon wn-icon-17"></div>
              </div>
              <p class="am-text-center"><strong>多重防火墙加固隔离</strong></p>
              <p class="am-text-muted am-text-xs">
                采用DDOS、WAF、硬件三重防火墙隔离病毒，全方位抵御网络非法入侵。
              </p>
            </div>
            <div class="am-u-sm-6 animation-hide" v-animate="{name:'slideInRight',delay:.1,duration:.8}">
              <div class="icon">
                <div class="wn-icon wn-icon-18"></div>
              </div>
              <p class="am-text-center"><strong>云端数据备份</strong></p>
              <p class="am-text-muted am-text-xs">
                采用阿里云服务器分布式计算系统强大的容灾机制，24小时不间断数据备份，确保数据零丢失。
              </p>
            </div>
            <div class="am-u-sm-6 animation-hide" v-animate="{name:'slideInLeft',delay:.1,duration:.8}">
              <div class="icon">
                <div class="wn-icon wn-icon-19"></div>
              </div>
              <p class="am-text-center"><strong>SSL证书加密</strong></p>
              <p class="am-text-muted am-text-xs">
                通过SSL证书认证加密保证用户数据的安全传输，并采用256位数据加密技术，严防窃取账户信息，确保业务数据安全性及信息敏感性。
              </p>
            </div>
            <div class="am-u-sm-6 animation-hide" v-animate="{name:'slideInRight',delay:.1,duration:.8}">
              <div class="icon">
                <div class="wn-icon wn-icon-20"></div>
              </div>
              <p class="am-text-center"><strong>信息系统三级保护</strong></p>
              <p class="am-text-muted am-text-xs">
                采用国家信息安全等级三级认证标准及各种合适的物理、电子和管理方面的措施来保护数据，以实现对数据安全的严密保护。
              </p>
            </div>
          </div>
        </div>
        <div class="law">
          <publish-title class="title">法律支持</publish-title>
          <div class="animation-hide" v-animate="{name:'bounceIn',delay:.1,duration:.8}">
            <img src="@/assets/publish/control_list3.png" />
            <p class="am-text-default" style="margin-bottom: .6rem;">
              与国内知名的律师事务所达成长期战略合作伙伴关系华商律所担任平台常年法务顾问，为平台及用户提供专业规范的信息服务和权威的法律依据与保障。
            </p>
          </div>
          <div class="animation-hide" v-animate="{name:'bounceIn',delay:.1,duration:.8}">
            <img src="@/assets/publish/control_list4.png" />
            <p class="am-text-default">
              公司组建了法律服务部门，对行业合规要求与风险防范进行全方位梳理把关，确保平台运营合法合规。
            </p>
          </div>
        </div>
      </div>
    </container>
    <sign/>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import scrollTop from '@components/scrollTop'
  import {mapActions, mapGetters} from "vuex";
  import scrollAnimate from '@/utils/directive/scrollAnimate'
  import Vue from 'vue'
  Vue.use(scrollAnimate)
  export default {
    name: "companyProfile",
    components: {
      container,
      sign,
      "publishNavBar": navBar,
      "publishTitle": title,
      scrollTop
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus'])
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('风险控制'))
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/css/icon/publish/control.css";
  @import "~@/style/less/views/publish/control";
  @import "../../style/css/animation";
</style>
