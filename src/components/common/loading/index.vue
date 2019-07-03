<template>
  <div class="my-loading" v-show="status">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <circle cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0.299156">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(90 16 16)" cx="16" cy="3" r="1.28891">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(135 16 16)" cx="16" cy="3" r="2.90187">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="2.44884">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(225 16 16)" cx="16" cy="3" r="1.20576">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="2.44884">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"></animate>
      </circle>
    </svg>
    <!--<span class="am-loading-text">加载中...</span>-->
  </div>
</template>

<script>
  export default {
    name: "my-loading",
    props: {
      status: {
        type: Boolean,
        default: false,
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/amaze/variables";
  .my-loading{
    position: fixed;
    top:50%;
    left:50%;
    margin:-.3rem 0 0 -.3rem;
    width:.6rem;
    fill: @global-primary;
    .am-animation-spin{
      i{
        font-size: 24px;
        margin:0 .05rem 0 0
      }
    }
  }
</style>
