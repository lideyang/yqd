<template>
  <am-modal class="reg-modal" :isShow="isShow" @visible-change="onChangeVisible" :closeBtn="false" :width="3.2" cssUnit="rem">
    <am-modal-body>
      <reg-panel :mobile="mobile" :params="params" :tips-text="tipsText" @regResult="onRegResult"></reg-panel>
    </am-modal-body>
  </am-modal>
</template>

<script>
  import regPanel from "@components/common/regPanel"

  export default {
    name: "validatorModal",
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      mobile: {
        type: String,
        default: ''
      },
      tipsText:{
        type: String,
        default: ''
      },
      params:{
        type:Object,
        default:{}
      }
    },
    components: {
      regPanel
    },
    watch: {
    },
    methods:{
      onChangeVisible(visible){
        this.$emit('visible-change', visible);
      },
      onRegResult(status){
        this.$emit('regResult',status);
      }
    }
  }
</script>

<style lang="less">
  .reg-modal {
    .am-modal-dialog{
      border-radius: 8px;
      background-color: #fff;
      .am-modal-bd{
        padding:0;
      }
    }
  }
</style>
