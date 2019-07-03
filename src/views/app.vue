<template>
  <div class="layout-layer" id="layoutLayer">
    <my-loading :status="loading"></my-loading>
    <transition name="fadeIn">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {Toast} from "@components/amaze/components/toast"
  import Loading from "@components/common/loading"

  export default {
    name: "app",
    components: {
      "am-toast": Toast,
      "my-loading": Loading
    },
    data() {
      return {
        prevPath: ''
      }
    },
    created() {

    },
    computed: {
      ...mapGetters(["loading", "getUserID"])
    }
  }

</script>

<style lang="less">
  @import "~@/style/less/global";

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fadeIn-enter-active {
    animation-name: fadeIn;
    animation-duration: .5s;
  }
</style>
