<template>
  <div class="product-auto-layer">
    <div class="am-tabs">
      <ul ref="tabsMenu" class="am-tabs-nav am-nav am-nav-tabs">
        <li><a @click="$router.push('/product/auto')">易智投</a></li>
        <li class="am-active"><a @click="$router.push('/product/single')">散标出借</a></li>
        <li><a @click="$router.push('/product/transfer')">债权转让</a></li>
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
              <li v-for="item in list" v-cloak :class="{gray:item.loanStatus!=13&&item.loanStatus!=2}"
                  @click="$router.push('/product/detail/'+item.loanId)">
                <div class="am-g title">
                  <badge :type="item.prdType"/>
                  <span class="name">{{item.loanTitle}}</span>
                  <template v-if="item.loanStatus=='2'||item.loanStatus=='5'">
                    <span v-if="item.awardType==2" class="jiaxi-icon">
                      新手
                    </span>
                    <span v-if="item.awardRate>0&&item.awardType!=2" class="jiaxi-icon">
                      奖励
                    </span>
                  </template>
                </div>
                <div class="am-g invest">
                  <div class="rate-col am-fl">
                    <p class="rate am-text-nowrap am-text-secondary">
                      {{item.platRate}}<span>%</span>
                      <span v-if="item.awardRate>0">+{{item.awardRate}}%</span>
                    </p>
                    <p class="am-text-muted">{{item.repayModeStr}}</p>
                  </div>
                  <div class="info am-fl">
                    <p class="am-text-default">
                      <span class="day">{{item.loanPeriodStr}}</span>
                    </p>
                    <p class="am-text-muted" v-if="item.remainAmount!=0">
                      剩余可投{{item.remainAmount|formatCurrency}}元
                    </p>
                  </div>
                  <div class="am-fl am-text-left am-text-muted status">
                    <div v-if="item.loanStatus==2" class="icon-font icon-tjgwc am-text-center"
                         @click.stop.self="onClickAddShoppingCartHandle(item,$event)">

                    </div>
                    <div v-else-if="item.loanStatus==13" class="am-btn am-btn-secondary am-text-center am-btn-xs">
                      {{item.releaseTime|hourFormater}}开启
                    </div>
                    <span v-else
                          class="am-btn btn-disabled am-round am-btn-xs am-text-center">{{item.loanStatus|loanStatusText}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <div v-show="list.length<10&&filterParamsIsEmpty" v-cloak class="examine-tips"><i class="icon-font icon-information"></i>优质项目正在审核中，敬请期待~
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--散标筛选  -->
    <div class="filter-dropdown-content" v-show="filterModalVisible">
      <div class="over-flow">
        <h3 class="am-text-primary">借款期限</h3>
        <div class="btn" data-type="period">
          <a class="am-btn opt-btn" :class="params.period==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(1)">3个月以内</a>
          <a class="am-btn opt-btn" :class="params.period==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(2)">3-6个月</a>
          <a class="am-btn opt-btn" :class="params.period==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterLimitHandle(3)">7-12个月</a>
          <a class="am-btn opt-btn" :class="params.period==4?'am-btn-primary':'am-btn-default'"
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
        <h3 class="am-text-primary">剩余可投金额</h3>
        <div class="btn" data-type="investBalance">
          <a class="am-btn opt-btn" :class="params.investBalance==1?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(1)">1000元以内</a>
          <a class="am-btn opt-btn" :class="params.investBalance==2?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(2)">1000~5000元</a>
          <a class="am-btn opt-btn" :class="params.investBalance==3?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(3)">5000-1万元</a>
          <a class="am-btn opt-btn" :class="params.investBalance==4?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(4)">1万元-3万元</a>
          <a class="am-btn opt-btn" :class="params.investBalance==5?'am-btn-primary':'am-btn-default'"
             @click="onClickFilterRepayHandle(5)">3万元-5万元</a>
          <a class="am-btn opt-btn" :class="params.investBalance==6?'am-btn-primary':'am-btn-default'"
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
    <!--购物车动画-->
    <transition v-on:before-enter="addShoppingCartBeforeEnter" v-on:enter="addShoppingCartEnter"
                v-on:after-enter="addShoppingCartAfterEnter">
      <div ref="addCartBall" class="icon-font icon-tjgwc add-cart-ball" v-show="addCartBallVisible"></div>
    </transition>
    <!--购物车btn-->
    <shopping-cart-btn ref="shoppingCart" :isLogin="isLogin" :num="shoppingCartCount"></shopping-cart-btn>
    <!--风险提示-->
    <am-modal @visible-change="onChangeAssessStatusModalVisible" :isShow="assessStatusModalVisible" :closeBtn="false"
              :width="3" cssUnit="rem">
      <am-modal-body>
        <risk-assessment-modal></risk-assessment-modal>
      </am-modal-body>
    </am-modal>
  </div>
</template>

<script>
  import container from '@layout/container'
  import footerMenu from '@layout/footerMenu'
  import badge from "@components/icon/badge"
  import riskAssessmentModal from "@components/riskAssessmentModal"
  import shoppingCartBtn from '@components/shoppingCartBtn'
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
    name: "productSingle",
    components: {
      container,
      footerMenu,
      badge,
      shoppingCartBtn,
      riskAssessmentModal
    },
    data() {
      return {
        list: [],
        listHeight: '',
        orderType: 0,
        orderASC: '',
        params: {
          period: '',
          prdType: '',
          investBalance: '',
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
        return this.params.period == '' && this.params.prdType == '' && this.params.investBalance == '' && this.params.repayMode == ''
      }
    },
    created() {

    },
    mounted() {
      setBodyStyleBg('#f9f9f9')
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
        return dayjs(value).format('HH:mm')
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
        api.GetProductSingleList(Object.assign(
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
      onClickFilterHandle() {
        this.filterModalVisible = true
      },
      onClickFilterLimitHandle(value) {
        this.params.period = value
      },
      onClickFilterClassHandle(value) {
        this.params.prdType = value
      },
      onClickFilterRepayHandle(value) {
        this.params.investBalance = value
      },
      onClickFilterRepayModeHandle(value) {
        this.params.repayMode = value
      },
      onClickFilterResetHandle() {
        this.params.period = ''
        this.params.prdType = ''
        this.params.investBalance = ''
        this.params.repayMode = ''
        this.upCallback()
        this.filterModalVisible = false
      },
      onClickFilterSubmitHandle() {
        this.upCallback()
        this.filterModalVisible = false
      },
      onClickAddShoppingCartHandle(item, event) {
        if (this.isLogin) {
          if (this.assessStatus) {
            api.AddShoppingCart({
              loanId: item.loanId
            }).then(response => {
              if (response.success) {
                this.addBtn.X = event.clientX
                this.addBtn.Y = event.clientY
                this.$refs.addCartBall.style.left = this.addBtn.X + 'px'
                this.$refs.addCartBall.style.top = this.addBtn.Y + 'px'
                this.addCartBallVisible = true
                this.$notify({
                  type: 'success',
                  message: '已成功加入购物车，请尽快确认支付'
                })
                this.setShoppingCartCount(response.data.itemCount)
              } else {
                this.$notify({
                  type: 'waring',
                  message: response.msg
                })
              }

            })
          } else {
            this.assessStatusModalVisible = true
          }
        } else {
          this.$router.push({
            path: '/account/login', query: {
              callbackUrl:'/spa/product/single'
            }
          })
        }
      },
      addShoppingCartBeforeEnter(el) {
        el.style.transform = "translate(0,0)"
        el.style.transition = 'all .8s ease'
        el.style.opacity = `1`
      },
      addShoppingCartEnter(el, done) {
        let left = this.$refs.shoppingCart.$el.offsetLeft - this.addBtn.X + 15
        let top = this.$refs.shoppingCart.$el.offsetTop - this.addBtn.Y + 15
        el.offsetWidth;
        el.style.transform = `translate(${left}px, ${top}px)`
        el.style.opacity = `.5`
        // 这里的done 其实就是afterEnter这个函数,也就是说,done其实就是afterEnter这个函数的引用
        done();
      },
      addShoppingCartAfterEnter(el) {
        this.addCartBallVisible = false
      },
      onChangeAssessStatusModalVisible(visible) {
        this.assessStatusModalVisible = visible
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/list.less";
</style>
