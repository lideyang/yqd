<template>
  <div class="publish-layer publish-data-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="data-layer">
        <div class="intro">
          <div class="all-data">
            <h3 class="title-info">
              平台整体数据
              <v-popover>
                <i  style="margin-left:.1rem" v-tooltip class="icon-font icon-wenhao"></i>
                <template slot="popover">
                  数据更新截止时间：2019-06-30
                </template>
              </v-popover>
            </h3>
            <table class="info">
              <tbody>
              <tr>
                <td colspan="2">
                  <p>累计交易总额(元)</p>
                  <h3>1,718,945,280.75</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>累计注册人数量(人)</p>
                  <h3>696078</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>累计为出借人赚取利息(元)</p>
                  <h3>42,164,893.81</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>累计交易笔数(笔)</p>
                  <h3>658176</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style="width: 45%" class="am-fl">
                    <p>累计出借人数量(人)</p>
                    <h3>12601</h3>
                  </div>
                  <div style="width: 55%" class="am-fr am-text-right">
                    <p>当前出借人数量(人)</p>
                    <h3>8336</h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="split" style="width: 55%">
                  <div class="split">
                    <p>最大单户出借余额(元)</p>
                    <h3>4,339,926.85</h3>
                  </div>
                </td>
                <td>
                  <p>占借贷余额比率</p>
                  <h3>1.18%</h3>
                </td>
              </tr>
              <tr>
                <td class="split" style="width: 55%">
                  <div class="split">
                    <p>最大十户出借余额(元)</p>
                    <h3>28,099,187.45</h3>
                  </div>
                </td>
                <td>
                  <p>占借贷余额比率</p>
                  <h3>7.64%</h3>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="repay-data">
            <h3 class="title-info">平台借款数据</h3>
            <table class="info">
              <tbody>
              <tr>
                <td colspan="2">
                  <p>累计借贷金额(元)</p>
                  <h3>1,718,315,351.75</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>借贷余额(元)</p>
                  <h3>367,790,411.76</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p>累计借款人数量(人)</p>
                  <h3>198903</h3>
                </td>
                <td>
                  <p>当前借款人数量(人)</p>
                  <h3>36743</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p>累计借贷笔数(笔)</p>
                  <h3>282375</h3>
                </td>
                <td>
                  <p>借贷余额笔数(笔)</p>
                  <h3>36769</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>人均累计借款金额(元)</p>
                  <h3>8638.96</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>利息余额(元)</p>
                  <h3>16,079,738.18</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style="width: 45%" class="am-fl">
                    <p>关联关系借款余额(元)</p>
                    <h3>0</h3>
                  </div>
                  <div style="width: 55%" class="am-fr am-text-right">
                    <p>关联关系借款余额笔数(笔)</p>
                    <h3>0</h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="split" style="width: 60%">
                  <div class="split">
                    <p>最大单一借款人待还金额(元)</p>
                    <h3>1,000,000.00</h3>
                  </div>
                </td>
                <td>
                  <p>占借贷余额比率</p>
                  <h3>0.27%</h3>
                </td>
              </tr>
              <tr>
                <td class="split" style="width: 60%">
                  <div class="split">
                    <p>前十大借款人待还金额(元)</p>
                    <h3>10,000,000.00</h3>
                  </div>
                </td>
                <td>
                  <p>占借贷余额比率</p>
                  <h3>2.71%</h3>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="last-data">
            <h2 class="title-info">借款逾期信息</h2>
            <table class="info">
              <tbody>
              <tr>
                <td class="am-text-center" colspan="2">
                  <p>历史项目逾期金额(元)</p>
                  <h3>0.00</h3>
                </td>
              </tr>
              <tr>
                <td class="split">
                  <div class="split">
                    <p>历史项目逾期率</p>
                    <h3>0%</h3>
                  </div>
                </td>
                <td>
                  <p>逾期项目数(笔)</p>
                  <h3>0</h3>
                </td>
              </tr>
              <tr>
                <td class="split">
                  <div class="split">
                    <p>累计代偿金额(元)</p>
                    <h3>1,006,558.13</h3>
                  </div>
                </td>
                <td>
                  <p>累计代偿笔数(笔)</p>
                  <h3>189</h3>
                </td>
              </tr>
              <tr>
                <td class="split">
                  <div class="split">
                    <p>逾期金额(元)</p>
                    <h3>0.00</h3>
                  </div>
                </td>
                <td>
                  <p>逾期笔数(笔)</p>
                  <h3>0</h3>
                </td>
              </tr>
              <tr>
                <td class="split">
                  <div class="split">
                    <p>逾期90天(不含)</p><p>以上金额</p>
                    <h3>0.00</h3>
                  </div>
                </td>
                <td>
                  <p>逾期90天(不含)</p><p>以上笔数</p>
                  <h3>0</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>项目逾期率</p>
                  <h3 style="margin:.05rem 0">0%</h3>
                  <p>项目分级逾期率（90天以上）<span class="am-fr">0%</span></p>
                  <!-- <p>项目分级逾期率（91-180天）<span class="am-fr">0%</span></p>
                  <p>项目分级逾期率（181天以上）<span class="am-fr">0%</span></p> -->
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>金额逾期率</p>
                  <h3 style="margin:.05rem 0">0%</h3>
                  <p>金额分级逾期率（90天以上）<span class="am-fr">0%</span></p>
                  <!-- <p>金额分级逾期率（91-180天）<span class="am-fr">0%</span></p>
                  <p>金额分级逾期率（181天以上）<span class="am-fr">0%</span></p> -->
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
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
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('运营数据'))
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
