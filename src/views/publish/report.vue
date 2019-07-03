<template>
  <div class="publish-layer publish-report-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <publish-title class="title">运营报告</publish-title>
        <ul class="am-cf menu">
          <li class="am-text-center" v-for="(year,index) in yearArr" @click="onClickChangeYear(index)">
            <img v-if="yearIndex===index" src="@/assets/publish/report_icon.png"/>
            <span>{{year}}</span>
          </li>
        </ul>
        <ul class="opt am-cf">
          <li v-for="item in this.list">
            <a :href="item.contentFileLink">
              <img :src="item.bannerUrl"/>
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
  import {mapActions, mapGetters} from "vuex";
  import api from '@api'
  import {toJson} from '@/utils/utils'

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
      onClickChangeYear(index) {
        this.yearIndex = index
        this.setListDate()
      },
      setListDate(){
        api.GetReportList({
          year: this.yearArr[this.yearIndex]
        }).then(response => {
          let data = toJson(response)
          this.list = data.data;
        })
      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('运营报告'))
      this.setListDate()
    },
    data() {
      return {
        yearIndex: 0,
        yearArr: ['2019', '2018', '2017', '2016'],
        list: []
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
