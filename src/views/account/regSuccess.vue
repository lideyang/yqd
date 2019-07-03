<template>
    <div class="reg-success-layer am-text-center" :style="{height: computeHeight}">
      <div class="wn-icon wn-icon-6"></div>
      <h1>888现金红包</h1>
      <p>已经发送到您的亿钱贷账户</p>
      <a class="down-load-btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqiandai.p2p">下载 App 使用红包</a>
    </div>
</template>

<script>
    export default {
      name: "regSuccess",
      mounted(){
        this.computeHeight=window.screen.height+'px'
      },
      data(){
          return {
            computeHeight:''
          }
      }
    }
</script>

<style lang="less">
  @import "../../style/css/sprite/land.css";
  .reg-success-layer{
    background: linear-gradient(to bottom,#a458fe,#557bfa);
    padding:1rem 0 0;
    color:#fff;
    height: 100%;
    h1{
      font-size: 28px;
      margin:.2rem 0 0;
    }
    p{
      margin:0;
    }
    .down-load-btn{
      margin:.4rem auto 0;
      display: block;
      width:2.6rem;
      height: .5rem;
      line-height: .5rem;
      background-color: #f36d4f;
      border-radius: .4rem;
      border:none;
      text-align: center;
      font-size:14px;
      font-weight: bold;
      color:#fff;
    }
  }
</style>
