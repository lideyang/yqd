<template>
  <div class="product-auto-layer product-transfer-layer">
    <div class="am-tabs">
      <ul ref="tabsMenu" class="am-tabs-nav am-nav am-nav-tabs">
        <li><a @click="$router.push('/product/auto')">易智投</a></li>
        <li><a @click="$router.push('/product/single')">散标出借</a></li>
        <li class="am-active"><a @click="$router.push('/product/transfer')">债权转让</a></li>
      </ul>
      <div class="am-tabs-bd am-tabs-bd-ofv">
        <div class="am-tab-panel am-in am-active am-fade bulk-standard" :style="{height:listHeight}">
          <div class="list-order" ref="listOrder">
            <div class="am-dropdown" @click="onClickDefaultOrderHandle">
              <button class="am-btn am-btn-default am-dropdown-toggle" :class="{active:this.orderType===0}">默认排序
              </button>
            </div>
            <div class="am-dropdown dropdown-month" @click="onClickLimitOrderHandle">
              <button class="am-btn am-btn-default am-dropdown-toggle" :class="{active:this.orderType===1}">
                借款期限
                <span class="icon-font icon-shang" :class="{active:this.orderType===1&&this.orderASC==='ASC'}"></span>
                <span class="icon-font icon-xia" :class="{active:this.orderType===1&&this.orderASC==='DESC'}"></span>
              </button>
            </div>
            <div class="am-dropdown dropdown-type" @click="onClickRateOrderHandle">
              <button class="am-btn am-btn-default am-dropdown-toggle" :class="{active:this.orderType===2}">
                利率
                <span class="icon-font icon-shang" :class="{active:this.orderType===2&&this.orderASC==='ASC'}"></span>
                <span class="icon-font icon-xia" :class="{active:this.orderType===2&&this.orderASC==='DESC'}"></span>
              </button>
            </div>
            <div class="am-dropdown dropdown-filter" @click="onClickFilterHandle">
              <button class="am-btn am-btn-default am-dropdown-toggle" :class="{'filter-active':!filterParamsIsEmpty}">
                筛选
                <span class="icon-font icon-shaixuan"></span>
              </button>
            </div>
          </div>
          <div ref="mescroll" class="product-list mescroll">
            <ul id="productTableList">
              <li v-for="item in list" v-cloak class="transfer" :class="{gray:item.applyStatus==3}"
                  @click="onclickLinkUrlHandle(item)">
                <div class="am-g title">
                  <badge :type="item.prdType"/>
                  <span class="name">{{item.loanTitle}}</span>
                  <span v-if="item.awardRate>0" class="jiaxi-icon">
                      奖励
                    </span>
                </div>
                <div class="am-g invest">
                  <div class="rate-col am-fl">
                    <p class="rate am-text-nowrap am-text-secondary">
                      {{item.loanRate}}<span>%</span>
                      <span v-if="item.awardRate>0">+{{item.awardRate}}%</span>
                    </p>
                    <p class="am-text-muted">{{item.repayMode}}</p>
                  </div>
                  <div class="info am-fl am-text-center">
                    <p class="am-text-default am-text-lg">
                      <span class="day">{{item.remainDaysStr}}</span>
                    </p>
                    <p class="am-text-muted">
                      剩余期限
                    </p>
                  </div>
                  <div class="am-u-sm-4 am-text-center status">
                    <template v-if="item.applyStatus=='2'">
                      <p class="title-tips am-text-lg">{{item.transferPrice|formatCurrency}} 元</p>
                      <p class="am-text-muted">转让总价</p>
                    </template>
                    <template v-if="item.applyStatus=='3'">
                      <p class="am-btn btn-disabled am-round">转让成功</p>
                    </template>

                  </div>
                </div>
              </li>
            </ul>
            <div v-show="list.length<10&&filterParamsIsEmpty" v-cloak class="examine-tips">
              <i class="icon-font icon-information"></i>优质项目正在审核中，敬请期待~
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--债权筛选  -->
    <div class="filter-dropdown-content" v-show="filterModalVisible">
      <div class="over-flow">
        <h3 class="am-text-primary">借款期限</h3>
        <div class="btn" data-type="loanPeriod">
          <a class="am-btn opt-btn" :class="params.loanPeriod==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(1)">3个月以内</a>
          <a class="am-btn opt-btn" :class="params.loanPeriod==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(2)">3-6个月</a>
          <a class="am-btn opt-btn" :class="params.loanPeriod==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(3)">7-12个月</a>
          <a class="am-btn opt-btn" :class="params.loanPeriod==4?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(4)">12个月以上</a>
        </div>
        <hr/>
        <h3 class="am-text-primary">标的类型</h3>
        <div class="btn" data-type="prdType">
          <a class="am-btn opt-btn" :class="params.prdType===0?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(0)">企链贷</a>
          <a class="am-btn opt-btn" :class="params.prdType==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(1)">微农贷</a>
          <a class="am-btn opt-btn" :class="params.prdType==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(2)">微花贷</a>
          <a class="am-btn opt-btn" :class="params.prdType==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(3)">乐保贷</a>
          <a class="am-btn opt-btn" :class="params.prdType==4?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(4)">优车贷</a>
          <a class="am-btn opt-btn" :class="params.prdType==5?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterClassHandle(5)">微企贷</a>
        </div>
        <hr/>
        <h3 class="am-text-primary">转让金额</h3>
        <div class="btn" data-type="transferPriceSign">
          <a class="am-btn opt-btn" :class="params.transferPriceSign==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(1)">1000元以内</a>
          <a class="am-btn opt-btn" :class="params.transferPriceSign==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(2)">1000~5000元</a>
          <a class="am-btn opt-btn" :class="params.transferPriceSign==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(3)">5000-1万元</a>
          <a class="am-btn opt-btn" :class="params.transferPriceSign==4?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(4)">1万元-3万元</a>
          <a class="am-btn opt-btn" :class="params.transferPriceSign==5?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(5)">3万元-5万元</a>
          <a class="am-btn opt-btn" :class="params.transferPriceSign==6?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(6)">5万元以上</a>
        </div>
        <hr/>
        <h3 class="am-text-primary">还款方式</h3>
        <div class="btn" data-type="repayMode">
          <a class="am-btn opt-btn" :class="params.repayMode===0?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayModeHandle(0)">等额本息</a>
          <a class="am-btn opt-btn" :class="params.repayMode==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayModeHandle(1)">等额本金</a>
          <a class="am-btn opt-btn" :class="params.repayMode==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayModeHandle(2)">一次还本付息</a>
          <a class="am-btn opt-btn" :class="params.repayMode==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayModeHandle(3)">按月付息，到期还本</a>
        </div>
        <div class="am-text-right submit">
          <button type="button" class="am-btn am-btn-default am-btn-lg am-radius reset-btn"
                  @click="onClickFilterResetHandle">重置
          </button>
          <button @click="onClickFilterSubmitHandle" type="button"
                  class="am-btn am-btn-primary am-btn-lg am-radius filter-btn">确定
          </button>
        </div>
      </div>
    </div>
    <footerMenu ref="footerMenu" :status="1"/>
  </div>
</template>

<script>
  import container from '@layout/container'
  import footerMenu from '@layout/footerMenu'
  import badge from "@components/icon/badge"
  import {setBodyStyleBg, removeBodyStyleBg} from '@/utils/setBodyBg'
  import {mapActions, mapGetters, mapState} from "vuex"
  import api from '@api'
  import dayjs from 'dayjs'
  import MeScroll from 'mescroll.js'
  import {
    formatCurrency,
    toJson
  } from '@/utils/utils'

  export default {
    name: "productTransfer",
    components: {
      container,
      footerMenu,
      badge,
    },
    data() {
      return {
        list: [],
        listHeight: '',
        orderType: 0,
        orderASC: '',
        params: {
          loanPeriod: '',
          prdType: '',
          transferPriceSign: '',
          repayMode: '',
          screen: 1
        },
        filterModalVisible: false,
        assessStatus: this.$store.state.user.assessStatus,
        assessStatusModalVisible: false,
        addCartBallVisible: false,
        addBtn: {
          X: 0,
          Y: 0
        }
      }
    },
    computed: {
      ...mapGetters(['isLogin']),
      ...mapState({
        shoppingCartCount: state => state.shoppingCart.shoppingCartCount
      }),
      orderParams() {
        if (this.orderType === 0) {
          return {
            sort: ''
          }
        } else if (this.orderType === 1 && this.orderASC === 'ASC') {
          return {
            sort: 4
          }
        } else if (this.orderType === 1 && this.orderASC === 'DESC') {
          return {
            sort: 3
          }
        } else if (this.orderType === 2 && this.orderASC === 'ASC') {
          return {
            sort: 2
          }
        } else {
          return {
            sort: 1
          }
        }
      },
      filterParamsIsEmpty() {
        return this.params.loanPeriod == '' && this.params.prdType == '' && this.params.transferPriceSign == '' && this.params.repayMode == ''
      }
    },
    created() {

    },
    mounted() {
      setBodyStyleBg('#f5f9fb')
      let winHeight = document.documentElement.clientHeight
      let tabsMenuHeight = this.$refs.tabsMenu.clientHeight
      let listOrderHeight = this.$refs.listOrder.clientHeight
      let footerMenuHeight = this.$refs.footerMenu.$el.clientHeight
      console.log(winHeight - tabsMenuHeight - listOrderHeight - footerMenuHeight + 'px')
      this.listHeight = winHeight - tabsMenuHeight - footerMenuHeight + 'px'
      //创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
        up: {
          callback: this.upCallback,
          //isBounce: false,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10, //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "productTableList", //父布局的id (1.3.5版本支持传入dom元素)
            icon: require("@/assets/icon/no_data.png"), //图标,默认null,支持网络图
            tip: "暂无记录~", //提示
          }
        }
      });
    },
    beforeDestroy() {
      removeBodyStyleBg()
    },
    filters: {
      formatCurrency,
      hourFormater(value) {
        return dayjs(value).format('hh:ss')
      },
      loanStatusText(value) {
        switch (value) {
          case 5:
            return '放款中'
          case 6:
            return '放款中'
          default:
            return '已还清'
        }
      }
    },
    methods: {
      ...mapActions(['setShoppingCartCount']),
      upCallback(page = {num: 1, size: 10}) {
        //联网请求
        api.GetProductTransferList(Object.assign(
          {
            pageNo: page.num,
            pageSize: page.size
          }, this.orderParams, this.params
        )).then((response) => {
          //请求的列表数据
          this.doSetListData(toJson(response), page);
        }).catch((e) => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      doSetListData(data, page = {num: 1}) {
        if (page.num == 1) {//如果是第一页需手动制空列表
          this.list = []
        }
        this.list = this.list.concat(data.data);
        console.log(this.list)
        //数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          console.log(this.list.length)
          this.mescroll.endBySize(data.data.length, data.count);
        })
      },
      onClickDefaultOrderHandle() {
        this.orderType = 0
        this.orderASC = ''
        this.upCallback()
      },
      onClickLimitOrderHandle() {
        this.orderType = 1
        if (this.orderASC == '' || this.orderASC == 'DESC') {
          this.orderASC = 'ASC'
        } else {
          this.orderASC = 'DESC'
        }
        this.upCallback()
      },
      onClickRateOrderHandle() {
        this.orderType = 2
        if (this.orderASC == '' || this.orderASC == 'ASC') {
          this.orderASC = 'DESC'
        } else {
          this.orderASC = 'ASC'
        }
        this.upCallback()
      },
      onclickLinkUrlHandle(item) {
        location.href = '/transfer/detail/' + item.transferApplyId
      },
      onClickFilterHandle() {
        this.filterModalVisible = true
      },
      onClickFilterLimitHandle(value) {
        this.params.loanPeriod = value
      },
      onClickFilterClassHandle(value) {
        this.params.prdType = value
      },
      onClickFilterRepayHandle(value) {
        this.params.transferPriceSign = value
      },
      onClickFilterRepayModeHandle(value) {
        this.params.repayMode = value
      },
      onClickFilterResetHandle() {
        this.params.loanPeriod = ''
        this.params.prdType = ''
        this.params.transferPriceSign = ''
        this.params.repayMode = ''
        this.upCallback()
        this.filterModalVisible = false
      },
      onClickFilterSubmitHandle() {
        this.upCallback()
        this.filterModalVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/list.less";
</style>
