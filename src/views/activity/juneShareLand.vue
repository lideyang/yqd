<template>
  <div class="activity-june-share-layer activity-june-share-land-layer">
    <div class="banner">
      <h2>好友{{realName}},希望您</h2>
      <h1>为ta助力#集财运#</h1>
      <a :href="oauthUrl" class="login-btn">
        点击助力<img src="@/assets/active/june/likes.png"/>
      </a>
    </div>
    <div class="friend-reload">
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
  </div>
</template>

<script>
  import {formatDateToDay} from '@/utils/utils'
  import {Confirm} from "@components/amaze/components/confirm"
  import {Pagination} from "@components/amaze/components/pagination"
  import api from '@api'

  export default {
    name: "june",
    components: {
      'am-confirm': Confirm,
      'am-pagination': Pagination,
    },
    props: {
      token: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        jcyCount: '--',
        isRegCount: '--',
        rewardReceive: '--',
        totalReward: '--',
        shareTipsVisible: false,
        code: this.$route.query.code,
        realName: '',
        friendReloadList: [],
        oauthUrl: ''
      }
    },
    filters: {
      formatDateToDay,
      isReg(value) {
        if (value == "1") {
          return '助力并注册'
        } else {
          return '已助力'
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
        return `http://${window.location.host}/spa/account/land?code=${this.code}`
      },
      shareDesc() {
        return `您的好友${this.realName}喊你一起赚收益啦，平台上市背景+专业合规，快快上车~`
      }
    },
    created() {
      if (this.code) {
        api.GetJuneShareLikesList({
          code: this.code
        }).then(response => {
          this.realName = response.data.realName
          this.oauthUrl = response.data.oauthUrl
          this.friendReloadList = response.data.record
        })
      } else {
        this.$router.push({
          path: '/account/login', query: {
            callbackUrl:'/spa/activity/june'
          }
        })
      }
    },
    mounted() {
      //this.isShowModal5 = true
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/juneShare";
</style>
