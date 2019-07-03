<template>
  <span class="am-badge am-radius" :class="'label-'+badgeType">{{badgeName}}</span>
</template>

<script>
  export default {
    name: "badge",
    props: {
      type: {
        type: String,
        default: 0
      }
    },
    computed: {
      badgeType(){
        switch (this.type) {
          case "0":
            return 'qn'
          case "1":
            return 'sn'
          case "2":
            return 'wh'
          case "3":
            return 'lb'
          case "4":
            return 'cb'
          case "5":
            return 'wq'
        }
      },
      badgeName(){
        switch (this.type) {
          case "0":
            return '企'
          case "1":
            return '农'
          case "2":
            return '微'
          case "3":
            return '保'
          case "4":
            return '车'
          case "5":
            return '商'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .am-badge{
    margin:0 .05rem 0 0;
  }
  /* label */
  .label-wh, .text-wh {
    background-color: #e35064;
  }

  .label-lb, .text-lb {
    background-color: #743f8f;
  }

  .label-qn, .text-qn {
    background-color: #a2753f;
  }

  .label-sn, .text-sn {
    background-color: #075c1f;
  }

  .label-cb, .text-cb {
    background-color: #4459a6;
  }

  .label-wq, .text-wq {
    background-color: #000d59;
  }

</style>
