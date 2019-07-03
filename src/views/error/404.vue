<template>
  <div class="page-404-layer">
    <container title="404错误">
      <div class="content am-text-center">
        <img src="@/assets/404.png" />
        <p>抱歉，您访问的页面不存在</p>
        <a class="am-btn am-btn-primary" href="/">返回首页</a>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "companyProfile",
    components: {
      container
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
    },
    created() {

    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="less" scoped>
  .page-404-layer{
    .content{
      padding:.8rem 0 0;
      img{
        width:2.75rem;
        margin:0 0 .3rem;
      }
      a{
        margin:1rem 0 0;
      }
    }
  }
</style>
