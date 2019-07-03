<template>
  <div class="activity-june-share-layer">
    <div class="banner">
      <img src="@/assets/active/june/banner2.png"/>
    </div>
    <div class="share-info">
      <div class="am-g info">
        <div class="am-u-sm-4">
          <strong>{{likeCount}}</strong>
          <p>集财运(人)</p>
        </div>
        <div class="am-u-sm-4">
          <strong>{{recomCount}}</strong>
          <p>已注册(人)</p>
        </div>
        <div class="am-u-sm-4">
          <strong><span>￥</span>{{receiveAmt}}</strong>
          <p>已领取奖励</p>
        </div>
      </div>
      <div class="tips">
        总可领取奖励
        <v-popover>
          <i v-tooltip class="icon-font icon-info_2"></i>
          <template slot="popover">
            总可领取奖励 = 当前财运卡个数 * 5元
          </template>
        </v-popover>
        <span>￥{{maxReceiveAmt}}</span>
      </div>
    </div>
    <a v-if="!isLogin" href="/spa/account/login?callbackUrl=/spa/activity/juneShare" class="login-btn">点击登录 查看详细信息</a>
    <div class="friend-reload" v-if="friendReloadList.length">
      <div class="title">
        好友记录
      </div>
      <table>
        <tr v-for="item in friendReloadList">
          <td>{{item.nickName}}</td>
          <td>{{item.isReg|isReg}}</td>
          <td>{{item.likeTime|formatDateToDay}}</td>
        </tr>
      </table>
    </div>
    <div class="title">活动规则</div>
    <div class="opt">
      <ul>
        <li>
          1、邀请5个好友#集财运#，且1个好友注册，可获得5元现金，现金份数 = 财运卡张数
          <br/>
          注：若有10好友点赞1好友注册，则仍只可累计获得5元奖励
        </li>
        <li>2、拥有财运卡后可转发此页面给好友，完成5个好友页面点赞且1个好友注册，可获得5元现金奖励</li>
        <li>3、总可领取奖励 = 当前财运卡个数 * 5元</li>
        <li>4、好友通过该分享页面注册，自动建立推荐关系，享受推荐奖励</li>
        <li>5、每个微信ID只能为一个好友点赞</li>
      </ul>
    </div>
    <div class="share-layer">
      <div class="share-btn" @click="onClickHeaderBtn">立即分享领奖</div>
    </div>
    <!--分享提示遮罩-->
    <share-tips :showTips="shareTipsVisible" @onchangeVisible="onClickShareVisible"></share-tips>
  </div>
</template>

<script>
  import Vue from "vue"
  import {toJson, formatDateToDay, isWX} from '@/utils/utils'
  import {Confirm} from "@components/amaze/components/confirm"
  import {Pagination} from "@components/amaze/components/pagination"
  import shareTips from '@components/shareTips'
  import api from '@api'
  import VueClipboard from 'vue-clipboard2'
  import wx from 'weixin-js-sdk';

  Vue.use(VueClipboard)
  export default {
    name: "june",
    components: {
      'am-confirm': Confirm,
      'am-pagination': Pagination,
      shareTips,
    },
    props: {
      token: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        recomCount: '--',
        code: '',
        likeCount: '--',
        maxReceiveAmt: '--',
        receiveAmt: '--',
        shareTipsVisible: false,
        isLogin: false,
        friendReloadList: [],
        shareTitle: '收到一张财运卡，6月财运爆棚',
        shareImg: `http://${window.location.host}/src/assets/logo-w.png`,
        realName: ''
      }
    },
    filters: {
      formatDateToDay,
      awardTypeFilter(awardType) {
        let awardTypeInt = parseInt(awardType)
        switch (awardTypeInt) {
          case 2:
            return "红包"
          case 4:
            return "现金"
          case 3:
            return "加息券"
          case 7:
            return "财运卡"
        }
      },
      isReg(value) {
        if (value == "1") {
          return '点赞并注册'
        } else {
          return '已点赞'
        }
      }
    },
    watch: {},
    computed: {
      listBtnText() {
        return this.count == 5 ? '明日再来' : '点击领取'
      },
      awardTypeText() {
        switch (this.awardType) {
          case 2:
            return "元红包"
          case 4:
            return "元现金"
          case 3:
            return "%加息券"
          case 7:
            return "财运卡"
        }
      },
      noLuckTipsText() {
        switch (this.luckCode) {
          case "0":
            return "您暂无抽奖机会哦"
          case "2":
            return "未抽到奖品，再接再厉"
        }
      },
      shareLink() {
        return `http://${window.location.host}/spa/activity/juneShareLand?code=${this.code}`
      },
      shareDesc() {
        return `为我的财运卡增加财运值，6月财运爆棚`
      }
    },
    created() {
      api.GetJuneLikesList().then(response => {
        if (response.success) {
          this.recomCount = response.data.recomCount
          this.code = response.data.code
          this.likeCount = response.data.likeCount
          this.maxReceiveAmt = response.data.maxReceiveAmt
          this.receiveAmt = response.data.receiveAmt
          this.friendReloadList = response.data.record
          this.isLogin = true
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
          } else {

          }
        } else {
          this.isLogin = false
        }
      })
    },
    mounted() {
      //this.isShowModal5 = true
    },
    methods: {
      onClickHeaderBtn() {
        if (this.isLogin) {
          //微信分享按钮
          if (isWX()) {
            this.shareTipsVisible = true
          } else {
            this.$copyText(this.shareLink).then((e) => {
              this.$notify({
                message: '已复制链接，请将链接发送给微信好友',
                type: 'success'
              });
            }, (e) => {
              this.$notify({
                message: e,
                type: 'warning'
              });
            })
          }
        } else {
          this.$notify({
            message: '请先登录',
            type: 'warning'
          });
        }
      },
      onClickShareVisible(visible) {
        this.shareTipsVisible = visible
      },
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/juneShare";
</style>
