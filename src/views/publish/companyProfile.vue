<template>
  <div class="publish-layer publish-company-profile-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <img class="logo" src="@/assets/publish/company_profile_logo.png" />
        <p>
          深圳市亿钱贷电子商务有限公司系深南金科股份有限公司旗下互联网金融平台，成立于2014年4月29日，实缴资本2000万元人民币。平台秉承合规运营，稳健发展的原则，
          致力于为供应链上下游企业、 新型农村经营主体、个人消费者、保险需求方等资金需求方和线上出借人之间构筑金融服务的桥梁，主打企链贷、微农贷、乐保贷、微花贷等产品，
          提升金融服务效率，配置优质金融资产。
        </p>
        <p>
          亿钱贷管理团队核心成员来自国内知名的传统金融机构和一线互金企业----工商银行、招商银行、交通银行、红岭创投、宜信等，既有传统金融的规范运营理念，
          又有金融科技的先进经验，在小微资产的获取和风控上，有着独到的理解和实践。技术团队自行开发的“神匣计划”项目深入农村普惠金融，对接农业大数据，
          为机构和个人出借者提供农村信贷资产。同时，该团队在区块链技术上也做了诸多尝试，并应用于供应链金融， 从技术手段上解决了供应链金融服务中心确权的效率问题，
          为供应链上下游提供更加高效的金融服务。
        </p>
        <publish-title class="title">业务流程</publish-title>
        <ul>
          <li class="am-cf">
            <div class="icon">
              <span class="num">01</span>
            </div>
            <div class="info">
              <strong>获取资产</strong>
              <p>合作机构推荐或合格借款人直接申请；</p>
            </div>
          </li>
          <li class="am-cf">
            <div class="icon">
              <span class="num">02</span>
            </div>
            <div class="info">
              <strong>风险评估</strong>
              <p>基于金融科技系统，</p>
              <p>审核合作机构/借款人信用；</p>
            </div>
          </li>
          <li class="am-cf">
            <div class="icon">
              <span class="num">03</span>
            </div>
            <div class="info">
              <strong>信息撮合</strong>
              <p>平台按照合规要求披露相关借款信息；</p>
            </div>
          </li>
          <li class="am-cf">
            <div class="icon">
              <span class="num">04</span>
            </div>
            <div class="info">
              <strong>资金出借</strong>
              <p>线上出借人自主判断风险收益，选择相应标的；</p>
            </div>
          </li>
          <li class="am-cf">
            <div class="icon">
              <span class="num">05</span>
            </div>
            <div class="info">
              <strong>还本付息</strong>
              <p>平台监控借款人资金使用运营情况及还款变化；</p>
            </div>
          </li>
        </ul>
        <big-img class="big-img" :img-src="require('@/assets/publish/company_profile_info.png')" :bigImgSrc="require('@/assets/publish/company_profile_info_big.jpg')" />
      </div>
    </container>
    <sign />
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import bigImg from '@components/bigImg'
  import { mapActions,mapGetters } from "vuex";
  export default {
    name: "companyProfile",
    components:{
      container,
      sign,
      "publishNavBar":navBar,
      "publishTitle":title,
      bigImg
    },
    computed:{
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods:{
      ...mapActions(['setCurrentNavBarStatus']),
      onClickBigImg(){

      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('公司简介'))
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
