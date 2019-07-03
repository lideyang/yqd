<template>
  <div class="shareit" @click="onClickTips" v-if="showTips">
    <img class="arrow" src="@/assets/icon/share.png">
  </div>
</template>
<script>
  export default {
    props: ['showTips'],
    methods:{
      onClickTips(){
        this.$emit('onchangeVisible',false)
      }
    }
  }
</script>
<style lang="less" scoped>
  .shareit {
    -webkit-user-select: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    top: 0;
    left: 0;
    z-index: 9999;
    .text{
      position: absolute;
      top: 1.5rem;
      right: .1rem;
      color:#fff;
      font-size:20px;
    }
    img{
      position: absolute;
      top: .1rem;
      right: .1rem;
      max-width: 2.4rem;
    }
  }
</style>
