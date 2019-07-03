<template>
  <!--transition标签 按钮出现附带动画-->
  <transition name="fadeIn">
    <a href="javascript:;" class="toTop" @click="backTop" v-show="backToTop">
      <i class="icon-font icon-fanhuidingbu"></i>
    </a>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        backToTop: false,
      }
    },
    methods: {
      backTop() {
        let back = setInterval(() => {
          if (document.body.scrollTop || document.documentElement.scrollTop) {
            document.body.scrollTop -= 100;
            document.documentElement.scrollTop -= 100;
          } else {
            clearInterval(back);
          }
        });
      },
      scrollToTop() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        let browserHeight = window.outerHeight;
        if (scrollTop > browserHeight) {
          this.backToTop = true
        } else {
          this.backToTop = false
        }
      }
    },
    mounted() {
      window.addEventListener("scroll", this.scrollToTop);
    },
    destroyed() {
      let targetScroll = document.getElementById("layoutLayer")
      targetScroll.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style scoped lang="less">
  .toTop {
    position: fixed;
    bottom: 50px;
    right: 30px;
    z-index: 100;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    text-align: center;
    background-color: #fff;
    line-height: 1;
    i {
      color: #999;
      font-size: 48px;
    }
  }
</style>
