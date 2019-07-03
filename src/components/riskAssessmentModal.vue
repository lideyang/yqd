<template>
  <div class="bank-card-modal">
    <p class="am-text-center">
      <img src="@/assets/product/confirm_fxpc_icon.png" />
    </p>
    <h2 class="am-text-center">您尚未完成风险评估</h2>
    <p>风险评估旨在了解您对风险的承受能力，帮助您降低风险。</p>
    <p class="am-text-center pc-link"><a class="text-one-primary am-text-lg" href="/member/auth/risk-ass">开始评估</a></p>
  </div>
</template>

<script>
  export default {
    name: "riskAssessmentModal",
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isShow(curVal) {
        this.$emit('visible-change', curVal);
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .bank-card-modal {
    position: relative;
    padding: .4rem .3rem .6rem;
    width: 2.8rem;
    margin: 0 auto;

    .pc-link {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    img {
      width: .6rem;
    }
  }
</style>
