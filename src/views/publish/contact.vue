<template>
  <div class="publish-layer publish-contact-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <img class="banner" src="@/assets/publish/contact_banner.png" />
      <div class="address">
        <p><strong>深圳市亿钱贷电子商务有限公司</strong></p>
        <p>公司地址：深圳市福田区益田路与福华三路交界东北深圳国际商会中心54-B单元</p>
        <p>电话号码:0755-82550710</p>
        <p>邮编：518000</p>
      </div>
      <div class="info server">
        <img class="icon" src="@/assets/publish/contact_title1.png" />
        <p><strong>客户服务</strong></p>
        <p>咨询/投诉/举报/联系电话：400-090-9968</p>
        <p>工作时间:周一至周五 09:00-18:00</p>
        <p>客服邮箱：<a href="mailto:kefu@yiqiandai.com">kefu@yiqiandai.com</a></p>
        <p>亿钱贷用户交流qq群：984531702</p>
        <p>微信公众号：yiqiandai</p>
      </div>
      <div class="info media">
        <img class="icon" src="@/assets/publish/contact_title2.png" />
        <p><strong>媒体关系</strong></p>
        <p>联系人：陈小姐</p>
        <p>联系方式：<a href="mailto:chenmei@yiqiandai.com">chenmei@yiqiandai.com</a></p>
      </div>
      <div class="info cooperation">
        <img class="icon" src="@/assets/publish/contact_title3.png" />
        <p><strong>市场合作</strong></p>
        <p>联 系 人：袁先生</p>
        <p>联系方式：<a href="mailto:yuanming@yiqiandai.com">yuanming@yiqiandai.com</a></p>
      </div>
    </container>
    <sign/>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "companyProfile",
    components: {
      container,
      sign,
      "publishNavBar": navBar,
      "publishTitle": title
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus'])
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('联系我们'))
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
