<template>
  <div class="publish-layer publish-matters-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <table class="am-table am-table-bordered">
          <tbody><tr>
            <td>减资、合并、分立、解散或者申请破产</td>
            <td>无</td>
          </tr>
          <tr>
            <td>破产程序</td>
            <td>无</td>
          </tr>
          <tr>
            <td>停业、整顿、关闭</td>
            <td>无</td>
          </tr>
          <tr>
            <td>从业机构受到刑事处罚</td>
            <td>无</td>
          </tr>
          <tr>
            <td>从业机构受到重大行政处罚</td>
            <td>无</td>
          </tr>
          <tr>
            <td>重大诉讼或者仲裁事项</td>
            <td>无</td>
          </tr>
          <tr>
            <td style="padding:10px 15px">法定代表人、实际控制人与控股股东、董事、监事、高级管理人员涉及的重大诉讼或者仲裁事项或重大行政处罚</td>
            <td>无</td>
          </tr>
          <tr>
            <td>主要或全部业务陷入停顿</td>
            <td>无</td>
          </tr>
          <tr>
            <td>欺诈、损害出借人利益等其他重大事项</td>
            <td>无</td>
          </tr>
          <tr>
            <td style="padding:10px 15px">公司是否涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</td>
            <td>无</td>
          </tr>
          </tbody>
        </table>
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
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('重大事项'))
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
