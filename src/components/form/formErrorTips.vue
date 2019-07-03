<template>
  <div v-show="status" class="am-form-group am-text-danger msg" style="display: block;">
    <span class="vertical-middle">
      <slot/>
    </span>
  </div>
</template>

<script>
  export default {
    name: "StepProgress",
    props: {
      status: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-error-tips{
    margin:0;
    margin:.05rem 0 0;
  }
</style>
