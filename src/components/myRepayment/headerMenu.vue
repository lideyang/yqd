<template>
  <header data-am-widget="header" class="am-header am-header-default">
    <div class="am-header-left am-header-nav">
      <a @click="onClickNextBtn" href="javascript:;;">
        <i class="am-header-icon icon-font icon-prev"></i>
      </a>
    </div>
    <h1 class="am-header-title">
      <a :class="{active:this.status===1}" @click="onChangeStatus(1)">待回款</a>
      <a :class="{active:this.status===2}" @click="onChangeStatus(2)">已回款</a>
    </h1>
    <div class="am-header-right am-header-nav">
      <a @click.prevent="onCLickIcon">
        <i class="icon-font icon-date"></i>
      </a>
    </div>
  </header>
</template>

<script>
  export default {
    name: "headerMenu",
    props: {
      status: {
        type: Number,
        default: 0
      }
    },
    methods:{
      onChangeStatus(status){
        this.$emit("change",status)
      },
      onCLickIcon(){
        this.$router.push({ path: '/user/myRepayment'})
      },
      onClickNextBtn(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@components/amaze/styles/variables";

  .am-header-default {
    border-bottom:none;
    .am-header-title {
      width:100%;
      margin: 0 auto;
      text-align: center;
      a {
        display: inline-block;
        border-bottom:3px solid #fff;
        color:#cdcdcd;
        &:first-child{
          margin-right: .2rem;
        }
        &.active {
          color: @global-secondary;
          border-bottom-color:@global-secondary;
        }
      }
    }
  }
</style>
