<template>
  <div class="publish-layer publish-hegui-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <img class="title" src="@/assets/publish/hegui_title.png" />
        <ul class="am-cf menu">
          <li class="am-text-center" :class="{active:currentIndex===index}" v-for="(year,index) in new Array(6)" @click="onClickChange(index)">
            <span>{{index+1}}</span>
          </li>
        </ul>
        <div class="banner" :class="{auto:currentIndex===2}" :style="{backgroundImage:'url('+require('@/assets/publish/heigui_banner'+(currentIndex+1)+'.png')+')'}">
          <h3 v-html="$options.filters.bannerTitle(currentIndex)"></h3>
          <p class="am-text-xs">{{currentIndex|bannerTips}}</p>
        </div>
      </div>
      <publish-title class="title">信披承诺函</publish-title>
      <img class="bottom-pic" src="@/assets/publish/heigui_main.png" />
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import { mapActions,mapGetters } from "vuex";
  const titleArr=[
    '合规争当排头兵：积极提交自查报告',
    `<p>资金存管银行</p><p class="am-text-default"><img src="${require('@/assets/publish/xwbank.png')}"/>首批通过测评的存管银行</p>`,
    '国内知名律所、会计所权威出具合规审查报告',
    '接入深圳市金融风险监测预警平台与中互金协会全国互联网金融登记披露服务平台',
    '设立自查备案小组，引领公司合规发展',
    '通过三级等保测评'
  ]
  const tipsArr=[
    '2018年9月30日，亿钱贷完成合规自查工作，正式向深圳市福田区金融工作部门提交《自查报告》，成为较早完成并提交自查报告的平台之一',
    '实现平台和用户资金进行隔离，确保用户债权债务关系清晰明确，充分保障资金安全。',
    '2018年4月、10月亿钱贷邀请广东华商律师事务所、中兴华会计师事务所、中兴财光华会计师事务所进行尽调，分别出具了《网络借贷信息中介机构验收备案申请之法律意见书》《合规情况审查报告》《截至2018年3月31日网络借贷信息中介机构重点环节业务经营情况专项检查报告》《国家互金协会十大问题专项审计报告》',
    '与相关监管部门、协会系统进行对接，如实报送相关数据，坚持平台合规运营。',
    '以周世平董事长为组长的亿钱贷“自查备案小组”引领公司全部门积极落实合规要求，有序开展自查、自审、自改工作。',
    '采用国家信息安全等级三级认证标准及各种合适的物理、电子和管理方面的措施来保护数据，以实现对数据安全的严密保护。'
  ]
  export default {
    name: "hegui",
    components:{
      container,
      "publishNavBar":navBar,
      "publishTitle": title
    },
    data(){
      return {
        currentIndex:0
      }
    },
    filters:{
      bannerTitle(index){
        return titleArr[index]
      },
      bannerTips(index){
        return tipsArr[index]
      }
    },
    computed:{
      ...mapGetters(['getCurrentNavBarText']),
    },
    methods:{
      ...mapActions(['setCurrentNavBarStatus']),
      onClickChange(index){
        this.currentIndex=index
      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('合规进程'))
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/publish/hegui";
</style>
