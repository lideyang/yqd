<template>
  <div class="recommend-rule-layer">
    <container title="推荐奖励规则">
      <div class="content">
        <div class="panel">
          <h2>一重好礼 · 好友注册即送10元红包</h2>
          <ul>
            <li>
              1、好友注册后，系统给推荐人自动发放10元红包，出借90天及以上项目金额满1000元可用。
            </li>
          </ul>
        </div>
        <div class="panel">
          <h2>二重好礼 · 最高200元现金</h2>
          <ul>
            <li>
              1、推荐的单个好友注册后30个自然日内，累计出借达到相应的金额（出借期限≥3个月或90天），可获得相应的现金奖励，具体如下：
              <table class="am-table am-table-bordered am-text-center">
                <tr>
                  <td>级别1</td>
                  <td>10,000元≤累计出借额＜30,000元</td>
                  <td>50元</td>
                </tr>
                <tr>
                  <td>级别2</td>
                  <td>30,000元≤累计出借额＜50,000元</td>
                  <td>50+50元</td>
                </tr>
                <tr>
                  <td>级别3</td>
                  <td>累计出借额≥50,000元</td>
                  <td>50+50+100元</td>
                </tr>
              </table>
            </li>
            <li>2、奖励发放：满足条件以出借时间为准，奖励在满足各级别的最后一个项目放款后次个自然日发放。推荐好友注册人数不限，符合条件即可获得奖励。举例：A推荐B，B在注册后30天内累计出借5万，则可获得50+50+100元现金奖励；
            </li>
            <li>3、适用项目：散标、易智投；</li>
            <li>4、活动时间节点说明：2018年10月1日起推荐注册的会员享受此项奖励。</li>
          </ul>
        </div>
        <div class="panel">
          <h2>三重好礼 · 最高 0.8% 佣金</h2>
          <ul>
            <li>
              1、推荐用户出借，可获得被推荐人待收本金年化x%的现金奖励，奖励比例如下：
              <table class="am-table am-table-bordered am-text-center">
                <tr>
                  <td>被推荐人待收之和＜50,000元</td>
                  <td>0.4%</td>
                </tr>
                <tr>
                  <td>50,000元≤被推荐人待收之和＜200,000元</td>
                  <td>0.6%</td>
                </tr>
                <tr>
                  <td>被推荐人待收之和≥200,000元</td>
                  <td>0.8%</td>
                </tr>
              </table>
            </li>
            <li>2、奖励发放时间：出借项目放款后（易智投起息后）计入待收本金，每日奖励金额=待收本金*x%/360天，次日发放；</li>
            <li>3、适用项目：散标、易智投、债权转让;</li>
            <li>4、活动时间节点说明：自2018年10月1日起，待收本金的奖励比例按照以上规则计算。因2018年8月1日0点之前起息的债权推荐奖励一次性发放，则该时间前的债权不计算此部分奖励。</li>
          </ul>
        </div>
        <div class="panel">
          <h2>推荐奖励补充细则</h2>
          <ul>
            <li>1、推荐人账户待收本金需≥5000元才可享受奖励二与奖励三，符合条件的用户可同时享有以上三项奖励。</li>

            <li>2、被推荐人通过推荐人分享的页面注册，或在注册时填写推荐人的推荐码或手机号码，注册成功即建立推荐关系。</li>

            <li>3、自2018年10月1日起，建立的推荐关系，推荐奖励有效期为180天，2018年10月1日之前建立的推荐关系，推荐奖励有效期保留原有规则的一年期。</li>

            <li>4、推荐活动时间：2018年10月1日-2019年12月31日。</li>

            <li>5、本活动最终解释权归亿钱贷所有，如有调整，将以公告形式通知。</li>
          </ul>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'

  export default {
    name: "recommendRule",
    components: {
      container
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/recommend/rule";
</style>
