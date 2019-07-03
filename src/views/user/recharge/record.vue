<template>
  <div class="recharge-record-layer">
    <container title="充值记录">
      <div class="total-recharge am-text-right">
        <span class="am-text-muted">充值总金额(元)：</span><strong
        class="text-gray">{{totalAmount|formatCurrency(true)}}</strong>
      </div>
      <!--滑动区域-->
      <div ref="mescroll" class="mescroll">
        <ul id="dataList">
          <li v-for="item in list">
            <div class="am-g" @click="onTriggerList(item)">
              <div class="am-u-sm-6">
                <h4 :class="'am-text-'+statusClass(item.orderStatus)">{{item.orderStatusCn}}</h4>
                <p class="am-text-muted">{{item.createTime|formatDateToSecond}}</p>
              </div>
              <div class="am-u-sm-6 am-text-right">
                <strong class="text-gray">{{item.amt|formatCurrency(true)}}</strong>
                <p><i class="am-text-default icon-font" :class="item.isOpen?'icon-arrow-down-new':'icon-bottom'"></i>
                </p>
              </div>
            </div>
            <div class="am-g detail" v-show="item.isOpen">
              <div class="am-u-sm-6">
                <p class="am-text-muted">充值银行</p>
              </div>
              <div class="am-u-sm-6 am-text-right">
                <strong class="text-gray">{{item.cardBankName}}({{item.cardNoLastFour}})</strong>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </container>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import {formatDateToSecond, formatCurrency} from '@/utils/utils'
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import api from '@api'
  import MeScroll from 'mescroll.js'

  export default {
    name: "rechargeRecord",
    data() {
      return {
        totalAmount: 0,
        list: []
      }
    },
    components: {
      container
    },
    computed: {},
    filters: {
      formatDateToSecond,
      formatCurrency
    },
    created() {
      setBodyBg('gray-bg')
      api.GetRechargeTotalAmount().then(response => {//总金额
        //let result = toJson(response)
        this.totalAmount = response.rechargeAmtSum
      }).catch(result => {

      })
    },
    mounted() {
      //创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
        up: {
          callback: this.upCallback,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10, //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "dataList", //父布局的id (1.3.5版本支持传入dom元素)
            icon: require("@/assets/icon/no_data.png"), //图标,默认null,支持网络图
            tip: "暂无相关数据~", //提示
          }
        }
      });
    },
    methods: {
      onTriggerList(item) {
        item.isOpen = !item.isOpen;
      },
      statusClass(value) {
        console.log(value)
        switch (value) {
          case 'SUCCEED':
            return 'success'
          case 'PROCESSING':
            return 'primary'
          case 'FAILURE':
            return 'danger'
          case 'CANCEL':
            return 'muted'
        }
      },
      doSetListData(page, append) {
        //联网请求
        api.GetRechargeRecord({
          pageNo: page.num
        }).then(response => {
          //let result = toJson(response)
          let newList = response.result.map(item => {
            let obj = {};
            obj.isOpen = false
            obj.amt = item.amt;
            obj.createTime = item.createTime
            obj.orderStatus = item.orderStatus
            obj.orderStatusCn = item.orderStatusCn
            obj.cardBankName = item.cardBankName
            obj.cardNoLastFour = item.cardNoLastFour
            return obj
          });
          console.log(page.num)
          if (page.num == 1) {//如果是第一页需手动制空列表
            this.list = []
          }
          this.list = this.list.concat(newList);
          //数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            console.log(response.totalCount)
            this.mescroll.endBySize(this.list.length, response.totalCount);
          })
        }).catch(result => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })

      },
      upCallback(page) {
        this.doSetListData(page, true)
      }
    },
    destroyed() {
      removeBodyBg('gray-bg')
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/user/rechargeRecord.less";
</style>
