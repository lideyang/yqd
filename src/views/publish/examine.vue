<template>
  <div class="publish-layer publish-examine-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <publish-title class="title">审核信息</publish-title>
        <ul class="am-text-center">
          <li>
            <a href="/public/doc/2018key_report.pdf">
              <img src="@/assets/publish/examine1.png"/>
              <span><strong>审核报告已出具</strong></span>
            </a>
          </li>
          <li>
            <a href="/public/doc/2018_report2.pdf">
              <img src="@/assets/publish/examine2.png"/>
              <span><strong>审查报告已出具</strong></span>
            </a>
          </li>
          <li>
            <a href="/public/doc/2018_report.pdf">
              <img src="@/assets/publish/examine3.png"/>
              <span>
                <strong>审计报告已出具</strong>
              </span>
            </a>
          </li>
        </ul>
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
  import {mapActions, mapGetters} from "vuex"

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
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('审核信息'))
    },
    data() {
      return {
        yearIndex: 0,
        yearArr: ['2019', '2018', '2017', '2016']
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
