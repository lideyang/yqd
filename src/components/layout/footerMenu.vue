<template>
  <!--底部菜单-->
  <div data-am-widget="navbar" class="am-navbar am-cf">
    <ul class="am-navbar-nav am-cf am-avg-sm-4">
      <li>
        <a id="nav_index" href="/" :class="{active:status===0}">
          <i class="icon-font icon-home"></i>
          <span class="am-navbar-label">首页</span>
        </a>
      </li>
      <li>
        <a id="nav_invest" @click="$router.push('/product/auto')" :class="{active:status===1}">
          <i class="icon-font icon-case"></i>
          <span class="am-navbar-label">出借</span>
        </a>
      </li>
      <li>
        <a id="nav_xinpi" @click="$router.push('/publish/home')" :class="{active:status===2}">
          <i class="icon-font icon-info_1"></i>
          <span class="am-navbar-label">信披</span>
        </a>
      </li>
      <li>
        <a id="nav_member" @click="isLogin?$router.push('/user/center'):$router.push('/account/login')" :class="{active:status===3}">
          <i class="icon-font icon-my-account"></i>
          <span class="am-navbar-label">我的</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"

  export default {
    name: "footerMenu",
    props: {
      status: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
      ]),
    }
  }
</script>
<style lang="less">

</style>
