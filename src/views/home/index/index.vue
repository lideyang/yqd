<template>
  <div class="home-layer">
    <!--内容开始-->
    <div class="am-container">
      <!--banner-->
      <am-slider class="home-banner" v-if="bannerShow">
        <template v-if="banners.length">
          <am-slider-item v-for="item in banners"><img @click="onClickBannerLinkHandle(item)" :src="item.imgUrl"/>
          </am-slider-item>
        </template>
        <template v-else>
          <am-slider-item><img src="@/assets/banner/home_banner.png"/></am-slider-item>
        </template>
      </am-slider>
      <!--公告-->
      <div class="notice">
        <a class="more" href="/article/notice/"><i class="icon-font icon-more am-text-default"></i></a>
        <div class="am-g">
          <div class="am-u-sm-1">
            <i class="icon-font icon-laba1 am-text-primary"></i>
          </div>
          <div class="am-u-sm-11 list">
            <notice-roll v-if="notices.length" :contentArr="notices">
            </notice-roll>
          </div>
        </div>
      </div>
      <!--menu-->
      <div class="am-g header-menu am-text-center">
        <div class="am-u-sm-10 am-u-sm-centered">
          <div v-if="isLogin" class="am-u-sm-4">
            <a @click="$router.push('/recommend/info')">
              <i class="ball"><!--图标--></i>
              <p>推荐奖励</p>
            </a>
          </div>
          <div v-else class="am-u-sm-4 my-coupons">
            <a href="/event/novice">
              <i class="ball"></i>
              <p>新手红包</p>
            </a>
          </div>
          <div class="am-u-sm-4">
            <a href="/static/depositoryInfo">
              <i class="ball"><!--图标--></i>
              <p>银行存管</p>
            </a>
          </div>
          <div class="am-u-sm-4">
            <a href="/static/companyList">
              <i class="ball"><!--图标--></i>
              <p>上市背景</p>
            </a>
          </div>
        </div>
      </div>
      <!--首页标的-->
      <!--易智投  -->
      <div v-if="bean" class="home-product-info">
        <h4 v-if="isNovice" class="target-prdname am-text-primary">新手专享<span class="target-prdno">限首次出借，限额3万</span></h4>
        <h4 v-else class="target-prdname am-text-primary">易智投<span class="target-prdno">{{bean.fontStr}}</span></h4>
        <p class="am-text-muted am-text-sm">协议约定年化利率
          <v-popover>
            <i v-tooltip class="icon-font icon-wenhao pop-show"></i>
            <template slot="popover">
              此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准
            </template>
          </v-popover>
        </p>
        <p class="rate am-text-secondary"><span class="target-rate span-rate">
          {{bean.prdRate}}%<template v-if="bean.awardRate>0">+{{bean.awardRate}}%</template>
        </span>
          <span class="target-award-rate-div span-rate"></span>
        </p>
        <div class="detail am-text-center am-g">
          <div class="am-u-sm-6">
            <strong class="target-month">{{bean.prdPeriodStr}}</strong>
            <p class="am-text-muted">委托期限</p>
          </div>
          <div class="am-u-sm-6">
            <strong><span class="target-min">{{bean.minAmount|formatCurrency}}</span>元</strong>
            <p class="am-text-muted">最低委托金额</p>
          </div>
        </div>
        <a v-if="bean.prdStatus=='3'" class="am-btn am-btn-secondary am-btn-block am-round am-btn-xl invest-btn link-btn"
           @click="$router.push({path:'/product/auto',query:{defineId:bean.defineId}})">委托出借
        </a>
        <div v-else-if="bean.prdStatus=='2'" class="am-btn btn-disabled am-round invest-btn">
          {{bean.publishTime|formatDateToSecond}}开启
        </div>
        <div v-else class="am-btn btn-disabled am-round invest-btn">
          已满额
          <p>每日17:00后发布</p>
        </div>
      </div>
      <div v-else-if="loan" class="home-product-info">
        <h4 class="target-prdname am-text-primary">优质项目<span class="target-prdno">{{loan.loanTitle}}</span></h4>
        <p class="am-text-muted am-text-sm">协议约定年化利率
          <v-popover>
            <i v-tooltip class="icon-font icon-wenhao pop-show"></i>
            <template slot="popover">
              此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准
            </template>
          </v-popover>
        </p>
        <p class="rate am-text-secondary">
          <span class="target-rate span-rate">
          {{loan.prdRate}}%<template v-if="loan.awardRate>0">+{{loan.awardRate}}%</template>
          </span>
          <span class="target-award-rate-div span-rate"></span>
        </p>
        <div class="detail am-text-center am-g">
          <div class="am-u-sm-6">
            <strong class="target-month">{{loan.loanPeriodStr}}</strong>
            <p class="am-text-muted">项目期限</p>
          </div>
          <div class="am-u-sm-6">
            <strong><span class="target-min">{{loan.minAmt|formatCurrency}}</span>元</strong>
            <p class="am-text-muted">最低委托金额</p>
          </div>
        </div>
        <a class="am-btn am-btn-secondary am-btn-block am-round am-btn-xl invest-btn link-btn" @click="$router.push(`/product/detail/${loan.loanId}`)">立即出借</a>
      </div>
      <!--信披-->
      <div class="am-g xinpi-layer am-text-center">
        <div class="am-u-sm-6">
          <a class="boxer" href="/static/data">
            <i class="icon-font icon-ptyy am-text-primary"></i>
            <p class="am-text-muted">运营数据</p>
          </a>
        </div>
        <div class="am-u-sm-6">
          <a class="boxer" href="/static/hegui">
            <i class="icon-font icon-hgjc am-text-primary"></i>
            <p class="am-text-muted">合规进程</p>
          </a>
        </div>
      </div>
      <p class="am-text-center am-text-muted">
        <i class="icon-font icon-aqhg- vertical-middle"></i>
        <span class="vertical-middle">资金已由新网银行存管，安全更合规</span>
      </p>
      <!--客服热线-->
      <div class="am-g kefu am-text-center">
        <p class="am-text-primary">
          客服热线 <a class="am-text-primary" :href="`tel:${serviceTelephone}`">{{serviceTelephone}}</a>
        </p>
        <p class="am-text-muted time">
          服务时间 {{serviceTime}}
        </p>
      </div>
      <!--app下载-->
      <div class="bottom-download-app am-text-center">
        <p class="title">了解更多精选产品</p>
        <p>
          <a :href="download" class="am-btn btn-download am-round">下载亿钱贷 APP</a>
        </p>
      </div>
    </div>
    <footerMenu/>
  </div>
</template>

<script>
  import footerMenu from '@layout/footerMenu.vue'
  import {Slider, SliderItem} from "@components/amaze/components/slider"
  import noticeRoll from '@components/noticeRoll'
  import {mapActions, mapGetters, mapState} from "vuex"
  import {
    formatCurrency,
    formatDateToSecond
  } from '@/utils/utils'
  import api from '@api'

  export default {
    name: 'Index',
    components: {
      noticeRoll,
      footerMenu,
      'am-slider': Slider,
      'am-slider-item': SliderItem
    },
    data() {
      return {
        bannerShow: false,
        banners: [],
        bean: "",
        download: "http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqiandai.p2p",
        isNovice: false,
        loan: "",
        notices: [],
        serviceTelephone: "400-090-9968",
        serviceTime: "9:00-18:00"
      }
    },
    filters: {
      formatCurrency,
      formatDateToSecond
    },
    computed: {
      ...mapGetters([
        'isLogin',
      ]),
    },
    created() {
      api.GetHomeInfo().then(response => {
        if (response.userId) {
          this.setUserID('ok')
        } else {
          this.setUserID('false')
        }
        this.banners = response.banners
        this.bannerShow = true
        this.bean = response.bean
        //this.download = response.download
        this.isNovice = response.isNovice
        this.loan = response.loan
        this.notices = response.notices
        this.serviceTelephone = response.serviceTelephone
        this.serviceTime = response.serviceTime
      })
    },
    methods: {
      ...mapActions(['setUserID']),
      onClickBannerLinkHandle(item) {
        if (item.linkUrl) {
          window.location.href = item.linkUrl
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~@components/amaze/styles/variables";

  .home-layer {
    background: linear-gradient(180deg, #f3f3f3 0, #e2e3e3);

    .home-banner {
      height: 2.18rem !important;
    }

    .download-app {
      padding: 0.1rem;
      background-color: #fff;

      .logo {
        img {
          width: 2rem;
          max-width: 100%;
        }

        .logo-text {
          width: 1.2rem;
          font-size: 12px;
          margin: 0px 0 0 5px;

          p {
            margin: 0;
            line-height: 1.2;
          }
        }
      }
    }

    .header-menu {
      line-height: 1.4;
      padding: .1rem 0;
      background-color: #fff;

      .ball {
        display: block;
        width: .5rem;
        height: .5rem;
        padding: .07rem 0 0;
        margin: 0 auto .06rem;
        background: url(../../../assets/home_info_list.png) no-repeat;
        background-size: cover;

      }

      .am-u-sm-4:nth-child(2) {
        .ball {
          background-position: -1.95rem 0;
        }
      }

      .am-u-sm-4:nth-child(3) {
        .ball {
          background-position: -2.9rem 0;
        }
      }

      .my-coupons {
        .ball {
          background-position: -1rem 0;
        }
      }

      .my-coupons-active {
        .ball {
          width: .72rem;
          background-position: -1rem 0;
        }

        p {
          text-align: left;
          padding: 0 0 0 .15rem;
        }
      }

      p {
        color: #534838;
        margin: 0;
        font-size: 12px;
      }
    }

    .notice {
      position: relative;
      padding: .05rem .15rem;
      line-height: 1.3;
      background-color: #fff;

      .list {
        height: .2rem;
        line-height: .2rem;
        overflow: hidden;
        padding: .01rem 0 0 0;
      }

      .more {
        position: absolute;
        top: .01rem;
        right: .08rem;
        font-size: 20px;
        z-index: 999;
      }

      .icon-laba {
        font-size: 18px;
      }
    }

    .home-product-info {
      position: relative;
      background: #fff;
      box-shadow: 0 5px 9px 2px rgba(26, 111, 255, 0.05);
      margin: .1rem 0 0;
      padding: .1rem 0 .2rem;

      &.no-login {
        margin-bottom: 1.3rem;
      }

      .new-hard-icon {
        position: absolute;
        top: 0rem;
        right: .3rem;
        width: .48rem;
      }

      .new-hard-tips {
        height: .26rem;
        line-height: .24rem;
        border: 2px solid #ffd570;
        background-color: #fefae2;
        color: #7a552b;
        width: 1.8rem;
        margin: 0 auto .2rem;
        font-weight: bold;
        border-radius: 6px;
      }

      .target-prdname {
        padding: 0 0 .1rem;
        margin: 0 .15rem .2rem;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #ececec;

        span {
          color: #999;
          font-size: 12px;
          margin: 0 0 0 5px;
        }
      }

      i {
        font-size: 14px;
        color: #888;
        margin: 0 0 0 .03rem;
      }

      p {
        text-align: center;
        margin: 0;

        &.rate {
          line-height: 1.4;

          span {
            font-size: 24px;

            &.span-rate {
              font-size: 40px;
            }
          }
        }
      }

      .detail {
        padding: .1rem .2rem;
        margin: 0 0 .1rem;
        color: #666;

        strong {
          font-size: 16px;
        }

        span.split {
          color: #b28850;
          margin: 0 .2rem;
        }

        p {
          font-size: 12px;
        }
      }

      .invest-btn {
        margin: 0 auto .1rem;
        width: 80%;
        display: block;
      }
    }

    .xinpi-layer {
      margin: .2rem .1rem;

      .boxer {
        margin: 0 .07rem;
        padding: .1rem 0;
        background-color: #fff;
        border-radius: 8px;
        display: block;

        i {
          font-size: 22px;
        }

        p {
          margin: .05rem 0 0;
          font-size: 15px;
        }
      }
    }

    .kefu {
      padding: .12rem 0;
      margin: 0 0 .1rem;

      p {
        margin: 0;

        &.time {
          font-size: 12px;
        }
      }
    }

    .bottom-download-app {
      width: 2.6rem;
      margin: 0 auto .7rem;
      padding: .2rem 0;
      border-top: 1px dotted #cacaca;
      color: #000;

      p {
        margin: 0;

        &.title {
          margin: 0 0 .06rem;
        }
      }
    }
  }
</style>
