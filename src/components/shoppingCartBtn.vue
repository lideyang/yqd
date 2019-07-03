<template>
  <a href="javascript:;" class="toTop" @click="onClickLinkHandle"
     @touchstart="handleTouchstart"
     @touchmove.prevent.stop='handleTouchMove'
     @touchend="handleTouchEnd">
    <i class="icon-font icon-gwc"></i>
    <span v-if="isLogin&&num" class="am-badge am-radius am-badge-danger">{{num}}</span>
  </a>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    props: {
      num: {
        type: Number,
        default: 0
      },
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        source: {
          x: 0,
          y: 0
        }
      }
    },
    computed: {},
    methods: {
      onClickLinkHandle() {
        if (this.isLogin) {
          this.$router.push('/product/shoppingCart')
        } else {
          this.$router.push('/account/login')
        }
      },
      handleTouchstart(e) {

      },
      handleTouchMove(e) {
        let odiv = e.currentTarget;        //获取目标元素
        if (e.touches.length == 1) {
          console.log(e.touches[0].clientY)
          //odiv.style.left = e.touches[0].clientX + 'px';
          let maxTop = document.body.clientHeight
          if (e.touches[0].clientY < window.innerHeight - 125 && e.touches[0].clientY > 90) {
            odiv.style.top = e.touches[0].clientY + 'px';
          }

        }

      },
      handleTouchEnd(e) {

      }
    }
  }
</script>
<style scoped lang="less">
  @import "~@/style/less/amaze/variables";

  .toTop {
    position: fixed;
    bottom: 1.2rem;
    right: .35rem;
    z-index: 100;
    width: .5rem;
    height: .5rem;
    padding: .1rem;
    border-radius: 50%;
    text-align: center;
    background-color: @global-primary;
    line-height: 1;

    i {
      color: #fff;
      font-size: .3rem;
    }

    .am-badge {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
