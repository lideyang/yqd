<template>
  <div>
    <am-modal class="open-modal" :isShow="modalVisible" @visible-change="onChangeVisible" :width="320">
      <am-modal-body>
        <div class="open-modal-layer am-text-center">
          <div class="logo">
            <img src="@/assets/depository/login_vs.png" />
          </div>
          <div class="content">
            <h3>账户升级为新网银行存管账户</h3>
            <p>亿钱贷已接入新网银行资金存管，您的充值、出借、提现等资金操作均需开通存管账户后才能进行。</p>
          </div>
          <a href="/member/depository/form" class="am-btm am-btn-primary am-round am-btn-block am-btn-xl open-btn">开通存管账户</a>
        </div>
      </am-modal-body>
    </am-modal>
    <!--透明层用户点击显示开通存管-->
    <div v-if="isClickShow" @click="onChangeVisible(true)" class="am-dimmer" style="z-index: 999;"></div>
  </div>
</template>

<script>
  export default {
    name: "depositoryModal",
    props: {
      modalVisible: {
        type: Boolean,
        default: false
      },
      isClickShow: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      onChangeVisible(visible){
        this.$emit('visibleChange',visible)
      }
    }
  }
</script>

<style lang="less" scoped>
  /*存管modal*/
  .open-modal{
    .open-modal-layer{
      padding:.35rem 0;
      .logo{
        padding:0 0 .25rem;
        margin:0 .1rem .3rem;
        border-bottom:1px solid #ececec;
        img{
          width:1.6rem;
        }
      }
      .content{
        h3{
          font-size: 16px;
          margin:0 0 .2rem;
        }
        p{
          margin:0 0 .05rem;
          padding:0 .3rem;
          text-align: left;
        }
      }
      .open-btn{
        width:2.4rem;
        height: .4rem;
        line-height: .4rem;
        margin:.15rem auto;
      }
    }
  }
</style>
