<template>
  <div class="xw-bind-help-layer">
    <div class="layer-tips">
      <div class="bg">
        <img src="@/assets/wx/help/step1.png" />
      </div>
      <div class="step-1 am-g">
        <div class="am-u-sm-6">项目回款</div>
        <div class="am-u-sm-6">提现到账</div>
        <div class="am-u-sm-6">充值到账</div>
        <div class="am-u-sm-6">出借成功</div>
      </div>
      <div class="step-2 am-g">
        <div class="am-u-sm-6">新手指引</div>
        <div class="am-u-sm-6">新手福利</div>
        <div class="am-u-sm-6">随时出借</div>
        <div class="am-u-sm-6">信息披露</div>
      </div>
    </div>
    <div class="layer-pro">
      <div class="bg">
        <img src="@/assets/wx/help/step2.png" />
      </div>
      <div class="tips">
        <p>①搜索并关注服务号“深南服务”</p>
        <p>②点击底部菜单栏，选择“绑定帐号”</p>
        <p>③登录平台帐号后，即可成功绑定</p>
        <p>①点击[我的账户]，选择[账户设置]</p>
        <p>②找到[绑定微信]一栏，点击[绑定]</p>
        <p>③按提示进行操作，即可成功绑定</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xwBindHelp"
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/xwBindHelp.less";
</style>
