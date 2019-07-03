<template>
  <div>
    <img class="small-img" @click="onClickShowBigImg" :src="imgSrc" />
    <!-- 遮罩层 -->
    <div v-show="showImg" @click="onClickHideBigImg()" class="img-layer"></div>
    <!-- 过渡动画放大图片 -->
    <transition name="fade">
      <div v-show="showImg" class="img-view" @click="onClickHideBigImg()">
        <div class="img">
          <img :src="bigImgSrc">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: ['imgSrc','bigImgSrc'],
    data() {
      return {
        showImg:false
      }
    },
    methods: {
      onClickShowBigImg() {
        this.showImg=true
      },
      onClickHideBigImg(){
        this.showImg=false
      }
    }
  }
</script>
<style scoped>
  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }

  .small-img{
    width:100%;
  }
  /* bigimg */

  .img-view {
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  /*遮罩层样式*/
  .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制图片大小，实现居中*/
  .img-view .img{
    padding:.2rem;
    height: 100%;
    overflow: auto;
  }
  .img-view .img img {

  }
</style>
