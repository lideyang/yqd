<template>
  <div class="publish-layer publish-index-layer">
    <container :leftStatus="false" title="信息披露">
      <ul class="menu am-text-center am-cf">
        <li v-for="item in navBar" @click="onClickNavBar(item.router)">
          <div class="wn-icon" :class="item.icon"></div>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </container>
    <footerMenu :status="2"/>
  </div>
</template>

<script>
  import footerMenu from '@layout/footerMenu'
  import container from '@layout/container'
  import navBar from '@/utils/publishNavBar'
  export default {
    name: "publishIndex",
    components: {
      container,
      footerMenu
    },
    data() {
      return {
        navBar: navBar
      }
    },
    methods: {
      onClickNavBar(url) {
        this.$router.push('/publish/' + url)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/css/icon/publish/index.css";
  @import "~@/style/less/views/publish/index";
</style>
