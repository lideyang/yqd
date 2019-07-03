<template>
  <div class="publish-layer publish-explanation-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <table class="am-table am-table-bordered">
          <tbody>
          <tr>
            <td>类别</td>
            <td><strong>出借人借款标准</strong></td>
          </tr>
          <tr>
            <td>充值费用</td>
            <td><strong>0元</strong></td>
          </tr>
          <tr>
            <td>提现手续费</td>
            <td>
              1、普通提现，有3次/日免费提现次数，超过免费次数后收取5元/笔手续费。<br/>
              2、快速提现，手续费为提现金额的0.05%，超过3次/日提现次数后加收5元/笔手续费。<br/>
              3、超出提现减免额度，出借人的提现手续费按照3次/日后手续费标准收费。<br/>
              提现手续费减免额度=账户当前出借已收本息+平台奖励-已成功提现金额
            </td>
          </tr>
          <tr>
            <td>债权转让管理费</td>
            <td>债权转让管理费为债权金额的0.5%，转让成功后收取；如债权持有大于等于90天，则免管理费。</td>
          </tr>
          <tr>
            <td>提前还款补偿金</td>
            <td>
              以剩余利息为计算基数，计收比例为0-5%，计算标准为：剩余利息 x 计收比例。<br/>
              （部分产品无提前还款补偿金，具体以合同为准。）
            </td>
          </tr>
          <tr>
            <td>逾期补偿金</td>
            <td>以剩余未还本金为基数，每逾期1天，出借人获得0.02%作为补偿，即：剩余未还本金 x 0.02% x 逾期天数。
            </td>
          </tr>
          <tr>
            <td>借款取消补偿金</td>
            <td>借款放款起息前，借款人取消借款的，出借人可获得借款取消补偿金，按出借金额的0.05％/天计算。
            </td>
          </tr>
          </tbody>
        </table>
        <table class="am-table am-table-bordered invest-per">
          <tbody>
          <tr>
            <td>类别</td>
            <td><strong>借款人资费标准</strong></td>
          </tr>
          <tr>
            <td style="width: .4rem">借款服务费率</td>
            <td style="padding: 0">
              <table>
                <tbody>
                <tr>
                  <td>产品</td>
                  <td>出借费率(年化)</td>
                  <td>居间服务费(年化)</td>
                </tr>
                <tr>
                  <td>微农贷</td>
                  <td>≤10.5%</td>
                  <td>0.5%≤居间服务费≤8%</td>
                </tr>
                <tr>
                  <td>企链贷</td>
                  <td>≤10.5%</td>
                  <td>0.5%≤居间服务费≤8%</td>
                </tr>
                <tr>
                  <td>优车贷</td>
                  <td>≤10.5%</td>
                  <td>2%≤居间服务费≤10%</td>
                </tr>
                <tr>
                  <td>乐保贷</td>
                  <td>≤10%</td>
                  <td>0.5%≤居间服务费≤5%</td>
                </tr>
                <tr>
                  <td>微花贷</td>
                  <td>≤10.5%</td>
                  <td>2%≤居间服务费≤12%</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>提前还款违约金</td>
            <td>
              申请提前归还贷款本金的，则需在还款当日向亿钱贷平台支付提前还款违约金，收费标准为剩余利息之和的5%-20%作为提前还款手续费用
            </td>
          </tr>
          <tr>
            <td>逾期还款违约金</td>
            <td>借款人按逾期本金的万分之四每日计收逾期违约金</td>
          </tr>
          </tbody>
        </table>
      </div>
    </container>
    <sign/>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "companyProfile",
    components: {
      container,
      sign,
      "publishNavBar": navBar,
      "publishTitle": title
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('资费说明'))
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
