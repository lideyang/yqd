<template>
  <div class="publish-title am-text-center">
    <strong class="am-text-xl"><slot></slot></strong>
  </div>
</template>

<script>
  export default {
    name: "publishTitle"
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/amaze/variables";
  .publish-title {
    width: 240px;
    height: 35px;
    margin:0 auto;
    background: url('../../assets/publish/title_bg.png') no-repeat center bottom;
    background-size: contain;
    color:@global-primary;
    strong{

    }
  }
</style>
