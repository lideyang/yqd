<template>
  <div class="product-success-layer">
    <container title="出借成功">
      <template v-slot:left>
        <a @click="onClickHeaderNextBtn" href="javascript:;;">
          <i class="am-header-icon icon-font icon-prev"></i>
          返回
        </a>
      </template>
      <div class="content">
        <p class="icon am-text-center"><i class="icon-font icon-right am-text-success"></i></p>
        <div class="process am-cf">
          <img class="am-fl" src="@/assets/product/success_split.png"/>
          <ul class="am-fl">
            <li>
              <h3>成功出借{{info.investAmount|formatCurrency}}元</h3>
              <p class="am-text-muted">{{info.investTime}}</p>
            </li>
            <li>
              <h3>开始计息</h3>
              <p class="am-text-muted">一般满标放款当天起息，以实际为准</p>
            </li>
            <li>
              <h3>收回本息</h3>
              <p class="am-text-muted">{{info.prdPeriodStr}},预期收益{{info.expectIncome|formatCurrency}}元</p>
            </li>
          </ul>
        </div>
        <div class="am-g btn">
          <div class="am-u-sm-6">
            <a class="am-btn btn-secondary am-btn-xl am-block am-round" href="/member/invest/hold-list">查看资产</a>
          </div>
          <div class="am-u-sm-6">
            <a class="am-btn am-btn-secondary am-btn-xl am-block am-round" @click="$router.push('/product/auto')">继续出借</a>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import {mapState} from "vuex"
  import api from '@api'
  import {
    formatCurrency,
    formatDateToDay,
    formatDateToSecond
  } from '@/utils/utils'

  export default {
    name: "success",
    components: {
      container
    },
    computed: {
      ...mapState({
        info: state => state.product.success,
      })
    },
    created() {
      // api.ProductSuccessInfo().then(response => {
      //   if (response.success) {
      //     this.investAmount = response.data.investAmount
      //     this.expectIncome = response.data.expectIncome
      //     this.currentTime = response.data.currentTime
      //     this.prdPeriodStr = response.data.prdPeriodStr
      //   } else {
      //
      //   }
      // })
      console.log(this.info.investAmount)
      if (!this.info.investAmount) {
        //this.$router.push('/product/auto')
      }
    },
    filters: {
      formatCurrency,
      formatDateToDay,
      formatDateToSecond
    },
    data() {
      return {
        investAmount: 0,
        expectIncome: 0,
        currentTime: 0,
        prdPeriodStr: ''
      }
    },
    methods: {
      onClickHeaderNextBtn() {
        this.$router.push('/user/center')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/success.less";
</style>
