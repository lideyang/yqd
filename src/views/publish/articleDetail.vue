<template>
  <div class="publish-layer publish-article-detail-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
    <publish-nav-bar></publish-nav-bar>
      <p class="title am-text-center am-text-lg am-text-secondary">{{detail.title}}</p>
      <p class="time am-text-center am-text-muted">{{detail.createTime|filterDate}}</p>
      <div class="content" v-html="detail.content">
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import api from '@api'
  import dayjs from 'dayjs'
  import localStore from '@/utils/localStore'
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
    filters: {
      filterDate(value) {
        return dayjs(value).format('YYYY-MM-DD')
      }
    },
    data(){
      return {
        detail:''
      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('平台公告'))
      api.GetArticleDetail({
        type:this.$route.params.type,
        uid:this.$route.params.id
      }).then(response=>{
        this.detail=response.detail
      })
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/publish/main";
</style>
