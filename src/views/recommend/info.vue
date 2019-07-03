<template>
  <div class="recommend-info-layer">
    <container title="推荐奖励">
      <div class="content">
        <p class="am-text-right rule-btn">
          <span @click="$router.push('/recommend/rule')">活动规则</span>
        </p>
        <div class="boxer">
          <div class="my-recommend-layer am-text-center">
            <h3 class="am-text-secondary">{{allAmt|formatCurrency}}</h3>
            <p>累计奖励(元)</p>
            <div class="am-g info">
              <div class="am-u-sm-6" style="border-right: 1px solid #eaeaea">
                <h4 class="am-text-secondary">{{todayAmt|formatCurrency}}</h4>
                <p>昨日奖励(元)</p>
              </div>
              <div class="am-u-sm-6">
                <h4 class="am-text-secondary">{{investCount}}/{{recomCount}}</h4>
                <p>已出借/已注册（人）</p>
              </div>
            </div>
          </div>
          <div v-if="userType=='1'" class="inside-rem">
            <a><img src="@/assets/recommend/info/icon.png">内部员工推荐活动</a>
          </div>
          <div class="am-text-center am-text-default iphone-tips">
            <template v-if="isMax">
              <template v-if="isMax=='0'">
                <p>当前推荐人待收本金之和为<span class="">{{planAmt|formatCurrency}}</span>元</p>
                <p>还差<span class="am-text-secondary">{{diff}}</span>元即可享受年化<span class="am-text-secondary">{{awardRate}}%</span>现金奖励
                </p>
              </template>
              <template v-else>
                您当前已享受年化<span class="text-warning"><b>{{awardRate}}%</b></span>现金奖励，<br/>达到最高等级
              </template>
            </template>
            <template v-else-if="noaward">
              您当前账户待收不足<span class="text-warning">5,000.00</span>元，<br/>暂时无法领取推荐奖励，请速速充值~
            </template>
          </div>
          <!--推荐详情-->
          <div class="am-tabs" data-am-tabs="{noSwipe: 1}" id="myRecommendTabs">
            <ul class="am-tabs-nav am-nav am-nav-tabs">
              <li :class="{'am-active':tabsIndex===0}"><a @click="onClickTabsHandle(0)">我的邀请奖励</a></li>
              <li :class="{'am-active':tabsIndex===1}"><a @click="onClickTabsHandle(1)">我的邀请好友</a></li>
            </ul>

            <div class="am-tabs-bd">
              <div class="am-tab-panel" :class="{'am-active':tabsIndex===0}">
                <table class="am-table am-table-bordered am-text-center">
                  <thead>
                  <tr>
                    <th>奖励金额(元)</th>
                    <th>日期</th>
                    <th>奖励类型</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in awardList">
                    <td>{{item.awardMoney|formatCurrency}}</td>
                    <td>{{item.awardDate|formatDateToDay}}</td>
                    <td>{{item|formatAwardType}}</td>
                  </tr>
                  </tbody>
                </table>
                <am-pagination v-if="awardPageTotal>10" align="center" :total="awardPageTotal" :page-size="10"
                               v-model="awardPageIndex" :show-page-btn-count="3"></am-pagination>
              </div>
              <div class="am-tab-panel" :class="{'am-active':tabsIndex===1}">
                <table class="am-table am-table-bordered am-text-center">
                  <thead>
                  <tr>
                    <th>姓名</th>
                    <th>被推荐人账号</th>
                    <th>注册时间</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in myFriendList">
                    <td>{{item.realName||'未实名'}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.createTime|formatDateToSecond}}</td>
                  </tr>
                  </tbody>
                </table>
                <am-pagination v-if="myFriendPageTotal>10" align="center" :total="myFriendPageTotal" :page-size="10"
                               v-model="myFriendPageIndex" :show-page-btn-count="3"></am-pagination>
              </div>
            </div>
          </div>
          <!--<p class="am-text-center am-text-muted">推荐关系：{{end|formatDateToDay}}到期</p>-->
          <img @click="onClickExplainHandle" class="banner2" src="@/assets/recommend/info/banner2.png"/>
          <p class="am-text-center am-text-default recommend-tips">
            您的专属推荐码：<span class="am-text-secondary">{{recomCode}}</span>或<span class="am-text-secondary">{{userMobile}}</span>
          </p>
          <button @click="onclickShareBtnHandle" class="recommend-btn" type="button">立即邀请</button>
        </div>
      </div>
    </container>
    <share-action :share-link="shareLink" ref="shareAction"></share-action>
  </div>
</template>

<script>
  import container from '@layout/container'
  import {Pagination} from "@components/amaze/components/pagination"
  import {mapState, mapActions} from "vuex"
  import api from '@api'
  import wx from 'weixin-js-sdk'
  import shareAction from '@components/shareAction'
  import {
    formatCurrency,
    formatDateToDay,
    formatDateToSecond,
    toJson,
    isWX
  } from '@/utils/utils'

  export default {
    name: "recommendInfo",
    components: {
      container,
      'am-pagination': Pagination,
      shareAction
    },
    data() {
      return {
        allAmt: 0,
        awardRate: 0.5,
        dueInAmt: 0,
        end: "",
        investCount: 0,
        isBetween: 1,
        isMax: "1",
        recomCode: "",
        recomCount: 1,
        shareData: {title: "", desc: ""},
        desc: "",
        title: "",
        start: '',
        todayAmt: 0,
        userMobile: '',
        diff: 0,
        noaward: '',
        userType: "0",
        planAmt: 0,
        wapUrl: "",
        awardList: [],
        awardPageIndex: 1,
        awardPageTotal: 1,
        myFriendList: [],
        myFriendPageIndex: 1,
        myFriendPageTotal: 1,
        tabsIndex: 0,
        tabsFirst: true,
        shareTipsVisible: false,
        shareTitle: '送您888元新手专属奖励金',
        actionsVisible: false
      }
    },
    computed: {
      ...mapState({
        realName: state => state.user.realName,
      }),
      shareImg() {
        return `${this.wapUrl}/src/assets/logo-w.png`
      },
      shareDesc() {
        return `您的好友${this.realName}喊你一起赚收益啦，平台上市背景+专业合规，快快上车~`
      },
      shareLink() {
        return `http://${window.location.host}/spa/account/land?code=${this.recomCode}`
      },
    },
    mounted() {
      //this.actionsVisible = true
    },
    created() {
      api.GetRecommendInfo().then(response => {
        if (response.success) {
          this.todayAmt = response.data.todayAmt
          this.allAmt = response.data.allAmt
          this.investCount = response.data.investCount
          this.recomCount = response.data.recomCount
          this.recomCode = response.data.recomCode
          this.phone = response.data.phone
          this.wapUrl = response.data.wapUrl
          this.end = response.data.end
          this.userMobile = response.data.userMobile
          this.isMax = response.data.isMax
          this.userType = response.data.userType
          this.awardRate = response.data.awardRate
          this.noaward = response.data.noaward
          this.planAmt = response.data.planAmt
          this.diff = response.data.diff
          this.setRealName(response.data.realName).then(() => {
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
          })
          api.GetRecommendMyReward({
            pageNo: 1,
            pageSize: 10
          }).then(response => {
            let data = toJson(response)
            this.awardList = data.data
            this.awardPageTotal = data.count
            console.log(this.awardList)
          })
        } else {
          //this.$router.push('/user/center')
        }
      })
    },
    filters: {
      formatCurrency,
      formatDateToDay,
      formatDateToSecond,
      formatAwardType(item) {
        if (item.awardType == '1') {
          return `好友待收本金之和的${item.awardRate}%`
        } else if (item.awardType == '2') {
          return `好友累计出借${formatCurrency(item.planAmt)}元`
        } else {
          return '推荐奖励'
        }
      }
    },
    watch: {
      awardPageIndex(value) {
        api.GetRecommendMyReward({
          pageNo: value,
          pageSize: 10
        }).then(response => {
          let data = toJson(response)
          this.awardList = data.data
          this.awardPageTotal = data.count
        })
      },
      myFriendPageIndex(value) {
        api.GetRecommendFriend({
          pageNo: value,
          pageSize: 10
        }).then(response => {
          let data = toJson(response)
          this.myFriendList = data.data
          this.myFriendPageTotal = data.count
        })
      }
    },
    methods: {
      ...mapActions(['setRealName']),
      onClickHeaderNextBtn() {
        this.$router.push('/user/center')
      },
      onClickTabsHandle(index) {
        this.tabsIndex = index
        if (this.tabsFirst) {
          this.tabsFirst = false
          api.GetRecommendFriend({
            pageNo: 1,
            pageSize: 10
          }).then(response => {
            let data = toJson(response)
            this.myFriendList = data.data
            this.myFriendPageTotal = data.count
          })
        }
      },
      onclickShareBtnHandle() {
        this.$refs.shareAction.show()
      },
      onClickExplainHandle() {
        window.location.href = `/spa/recommend/explain?code=${this.recomCode}`
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/recommend/info";
</style>
