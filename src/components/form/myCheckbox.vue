<template>
  <div class="my-checkbox">
    <i v-if="status" class="am-text-secondary my-checkbox checked icon-font icon-right"></i>
    <i v-else class="my-checkbox"></i>
  </div>
</template>

<script>
  export default {
    name: "myCheckbox",
    props: {
      status: {
        default: false,
        type: Boolean
      }
    }
  }
</script>

<style scoped>

</style>
