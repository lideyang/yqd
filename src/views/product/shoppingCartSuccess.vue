<template>
  <div class="shopping-cart-success-layer">
    <container title="完成出借">
      <template v-slot:left>
        <a @click="onClickHeaderNextBtn" href="javascript:;;">
          <i class="am-header-icon icon-font icon-prev"></i>
          返回
        </a>
      </template>
      <div class="content">
        <div class="info am-text-center">
          <p class="icon"><i class="icon-font icon-right am-text-success"></i></p>
          <p class="tips">您已完成出借申请</p>
          <p>该笔申请：成功<span class="am-text-secondary">{{successInvestList.length}}</span>笔，失败<span
            class="am-text-secondary">{{failInvestList.length}}</span>笔</p>
          <p>总出借金额<span class="am-text-secondary">{{totalInvestAmt}}</span>元</p>
          <table class="am-table am-table-bordered list">
            <thead>
            <tr>
              <th>项目名称</th>
              <th>出借金额(元)</th>
              <th>出借状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in successInvestList">
              <td>{{item.prdName}}</td>
              <td>{{item.investAmount|formatCurrency}}</td>
              <td :class="item.successed?'am-text-success':'am-text-warning'">{{item.successed?'申请成功':'申请失败'}}</td>
            </tr>
            <tr v-for="item in failInvestList">
              <td>{{item.prdName}}</td>
              <td>{{item.investAmount|formatCurrency}}</td>
              <td :class="item.successed?'am-text-success':'am-text-warning'">{{item.successed?'申请成功':'申请失败'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="process am-cf">
          <img class="am-fl" src="@/assets/product/success_split.png" />
          <ul class="am-fl">
            <li>
              <h3>出借完成</h3>
              <p class="am-text-muted">{{currentTime|formatDateToSecond}}</p>
            </li>
            <li>
              <h3>开始计息</h3>
              <p class="am-text-muted">每个标的的满标放款时间，分别进行计息</p>
            </li>
            <li>
              <h3>收回本息</h3>
              <p class="am-text-muted">预期收益{{totalIncomeAmt|formatCurrency}}元</p>
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
  import api from '@api'
  import {
    formatCurrency,
    formatDateToSecond,
    formatDateToDay
  } from '@/utils/utils'
  import {mapActions, mapState} from "vuex"

  export default {
    name: "shoppingCartSuccess",
    components: {
      container
    },
    data() {
      return {}
    },
    created() {
    },
    mounted() {

    },
    computed: {
      ...mapState({
        shoppingCartList: state => state.shoppingCart.shoppingCartList,
        currentTime: state => state.shoppingCart.currentTime
      }),
      totalInvestAmt() {//总出借金额
        return this.successInvestList.reduce((value, item) => {
          return parseFloat(item.investAmount) + parseFloat(value);
        }, 0)
      },
      successInvestList() {
        console.log(this.shoppingCartList)
        return this.shoppingCartList.filter((item) => {
          if (item.successed) {
            return true
          }
        })
      },
      failInvestList() {
        return this.shoppingCartList.filter((item) => {
          if(!item.successed){
            return true
          }
        })
      },
      totalIncomeAmt() {//总收益
        return this.successInvestList.reduce((value, item) => {
          console.log(parseFloat(item.expectedIncome||0), parseFloat(value||0))
          return parseFloat(item.expectedIncome||0) + parseFloat(value||0);
        }, 0)
      },
      countVoucherList() {

      }
    },
    filters: {
      formatCurrency,
      formatDateToSecond,
      formatDateToDay
    },
    methods: {
      onClickHeaderNextBtn(){
        this.$router.push('/user/center')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/product/shoppingCartSuccess.less";
</style>
