<template>
  <div class="recommend-explain-layer am-text-center">
    <div class="banner">
      <!--活动时间：2019年6月15日-2019年12月31日-->
    </div>
    <p class="tips">好友注册后自动发放10元红包，数量上不封顶
      <v-popover>
        <i class="icon-font icon-wenhao"></i>
        <template slot="popover">
          好友注册后，系统给推荐人自动发放10元红包，出借90天及以上项目金额满1000元可用
        </template>
      </v-popover>
    </p>
    <p>
      <i class="wn-icon wn-icon-red"></i>
    </p>
    <p class="recommend-btn">
      <a class="" @click.prevent="onClickHeaderBtn">马上邀请</a>
    </p>
    <p>
      <i class="wn-icon wn-icon-title2"></i>
    </p>
    <p class="tips title2-tips">推荐的单个好友注册后30个自然日内，累计出借达到相应的金额（出借期限≥3个月或90天），可获得相应的现金奖励</p>
    <p class="rule-link">
      <a @click="$router.push('/recommend/rule')">规则详情>></a>
    </p>
    <div class="card">
      <p class="star">
        <i class="wn-icon wn-icon-star"></i>
      </p>
      <div class="wn-icon wn-icon-card">￥50</div>
      <span class="section">10,000元≤累计出借额＜30,000元</span>
    </div>
    <div class="card">
      <p class="star">
        <i class="wn-icon wn-icon-star"></i><i class="wn-icon wn-icon-star"></i>
      </p>
      <div class="wn-icon wn-icon-card">￥50</div>
      <span class="section">30,000元≤累计出借额＜50,000元</span>
    </div>
    <div class="card">
      <p class="star">
        <i class="wn-icon wn-icon-star"></i><i class="wn-icon wn-icon-star"></i><i class="wn-icon wn-icon-star"></i>
      </p>
      <div class="wn-icon wn-icon-card">￥100</div>
      <span class="section">累计出借额≥50,000元</span>
    </div>
    <p>
      <i class="wn-icon wn-icon-title3"></i>
    </p>

    <p class="tips title2-tips">推荐用户出借，可获得被推荐人待收本金年化x%的现金奖励</p>
    <p class="rule-link">
      <a @click="$router.push('/recommend/rule')">规则详情>></a>
    </p>
    <div class="panel">
      <div class="wn-icon wn-icon-panel">
        <p class="opt">好友待收本金年化</p>
        <p>奖励<strong>0.4%</strong></p>
      </div>
      <span class="section">被推荐人待收之和<50,000元</span>
    </div>
    <div class="panel">
      <div class="wn-icon wn-icon-panel">
        <p class="opt">好友待收本金年化</p>
        <p>奖励<strong>0.6%</strong></p>
      </div>
      <span class="section">50,000元≤被推荐人待收之和<200,000元</span>
    </div>
    <div class="panel">
      <div class="wn-icon wn-icon-panel">
        <p class="opt">好友待收本金年化</p>
        <p>奖励<strong>0.8%</strong></p>
      </div>
      <span class="section">被推荐人待收之和≥200,000元</span>
    </div>

    <div class="example">
      <p>那么我可获得</p>
      <p>10万 x 0.6% ÷ 360 x 180 = <span>300</span> 元</p>
    </div>
    <p class="recommend-btn recommend-btn2">
      <a class="" @click.prevent="onClickHeaderBtn">马上邀请</a>
    </p>
    <img src="/src/assets/recommend/explain/bottom.png" class="bottom">
    <!--分享提示遮罩-->
    <share-action :share-link="shareLink" ref="shareAction"></share-action>
  </div>
</template>

<script>
  import Vue from "vue"
  import VueClipboard from 'vue-clipboard2'
  import wx from 'weixin-js-sdk'
  import {isWX} from '@/utils/utils'
  import api from '@api'
  import shareAction from '@components/shareAction'
  import {mapGetters} from "vuex"

  Vue.use(VueClipboard)
  export default {
    name: "recommendExplain",
    components: {
      shareAction
    },
    data() {
      return {
        shareTitle: '送您888元新手专属奖励金',
        shareImg: `http://${window.location.host}/src/assets/logo-w.png`,
        shareTipsVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
      ]),
      shareDesc() {
        return `您的好友${this.realName}喊你一起赚收益啦，平台上市背景+专业合规，快快上车~`
      },
      shareLink() {
        return `http://${window.location.host}/spa/account/land?code=${this.$route.query.code}`
      },
    },
    created() {
      if (isWX()) {
        let url = encodeURIComponent(location.href.split('#')[0]);
        let token = {};
        let _wxData = {};
        api.GetWXToken({url: url}).then(data => {
          if (typeof data == 'undefined' || data == null) {
            token = {};
          } else {
            token = data.token;
          }
          token.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
          //token.debug = true
          wx.config(token);
          wx.ready(() => {
            wx.onMenuShareTimeline({
              title: this.shareTitle, // 分享标题
              desc: this.shareDesc, // 分享描述
              link: this.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.shareImg
            });
            wx.onMenuShareAppMessage({
              title: this.shareTitle, // 分享标题
              desc: this.shareDesc, // 分享描述
              link: this.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.shareImg // 分享图标
            });
          });
        })
      }
    },
    methods: {
      onClickHeaderBtn(visible) {
        this.$refs.shareAction.show()
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/recommend/explain";
</style>
