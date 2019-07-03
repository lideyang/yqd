<template>
  <div class="publish-layer publish-information-layer">
    <container :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <publish-title class="title">平台信息</publish-title>
        <ul class="opt">
          <li>
            <div class="am-g">
              <div class="am-u-sm-12">
                <strong>全称及简称</strong>
              </div>
              <div class="am-u-sm-12">
                深圳市亿钱贷电子商务有限公司（简称“亿钱贷”）
              </div>
            </div>
          </li>
          <li>
            <div class="am-g">
              <div class="am-u-sm-12">
                <strong>统一社会信用代码</strong>
              </div>
              <div class="am-u-sm-12">
                <p>914403003059821133</p>
              </div>
            </div>
            <div class="am-g">
              <div class="am-u-sm-5">
                <p><strong>注册资本</strong></p>
              </div>
              <div class="am-u-sm-7">
                <p>2000万</p>
              </div>
            </div>
            <div class="am-g">
              <div class="am-u-sm-5">
                <p><strong>实缴资本</strong></p>
              </div>
              <div class="am-u-sm-7">
                <p>2000万</p>
              </div>
            </div>
          </li>
          <li>
            <div class="am-g">
              <div class="am-u-sm-12">
                <strong>注册地址</strong>
              </div>
              <div class="am-u-sm-12">
                深圳市福田区福田街道福华三路与金田路交汇处卓越世纪中心4号楼21层02
              </div>
              <div class="am-u-sm-12">
                <strong>实际经营地址</strong>
              </div>
              <div class="am-u-sm-12">
                深圳市福田区益田路与福华三路交界东北深圳国际商会中心54-B单元
              </div>
            </div>
          </li>
          <li class="time">
            <div class="am-g title">
              <div class="am-u-sm-12">
                <strong>成立时间</strong>
              </div>
              <div class="am-u-sm-12">
                2014年4月29日
              </div>
            </div>
            <div class="am-g info">
              <div class="am-u-sm-5">
                公司经营期限
              </div>
              <div class="am-u-sm-7">
                永续经营
              </div>
              <div class="am-u-sm-5">
                公司经营状态
              </div>
              <div class="am-u-sm-7">
                开业（存续）
              </div>
              <div class="am-u-sm-5">
                法定代表人
              </div>
              <div class="am-u-sm-7">
                周世平
              </div>
              <div class="am-u-sm-5">
                实际控制人
              </div>
              <div class="am-u-sm-7">
                周世平
              </div>
              <div class="am-u-sm-5">
                经营范围
              </div>
              <div class="am-u-sm-7">
                经营电子商务；数据库服务；数据库管理；计算机系统分析；提供计算机技术服务；
                出借兴办实业；出借管理；出借咨询；出借顾问；国内贸易；经营进出口业务；贸易经济代理；理财咨询；
                对未上市企业进行股权出借；开展股权出借和企业上市咨询业务；互联网信息服务。
              </div>
              <div class="am-u-sm-5">
                资金存管情况
              </div>
              <div class="am-u-sm-7">
                银行名称：四川新网银行股份有限公司<br>
                签约时间：2018年10月<br>
                全量业务上线时间：2018年12月
              </div>
              <div class="am-u-sm-5">
                公司官方网址
              </div>
              <div class="am-u-sm-7">
                www.yiqiandai.com<br>(ip地址：121.29.18.119、116.211.172.173、120.78.33.86)
              </div>
              <div class="am-u-sm-5">
                ICP备案号
              </div>
              <div class="am-u-sm-7">
                粤ICP备14041671号-1
              </div>
              <div class="am-u-sm-5">
                分支机构
              </div>
              <div class="am-u-sm-7">
                无
              </div>
              <div class="am-g">
                <div class="am-u-sm-5">
                  电信业务经营<br/>许可信息
                </div>
                <div class="am-u-sm-7">
                  经营许可证申请中
                </div>
              </div>
              <div class="am-u-sm-5">
                信息系统安全等级保护备案证明
              </div>
              <div class="am-u-sm-7">
                信息安全等级保护测评，已通过第三级测评
              </div>
              <div class="am-u-sm-5">
                公安备案号
              </div>
              <div class="am-u-sm-7">
                备案号申请中
              </div>
              <div class="am-u-sm-5">
                备案登记地方金融监管部门
              </div>
              <div class="am-u-sm-7">
                福田区地方金融风险防控工作领导小组办公室
              </div>
              <div class="am-u-sm-5">
                备案登记编号
              </div>
              <div class="am-u-sm-7">
                准备备案中
              </div>
              <div class="am-u-sm-5">
                法人签名
              </div>
              <div class="am-u-sm-7">
                <img style="width: 1.8rem" src="@/assets/publish/autograph.png" />
              </div>
            </div>
          </li>
        </ul>
        <publish-title class="title">股东信息</publish-title>
        <p class="am-text-center">
          <img class="company" src="@/assets/publish/information_logo.png"/>
        </p>
        <p class="am-text-center">
          <img class="logo" src="@/assets/publish/information_sn.png"/>
        </p>
        <p>
          深南金科股份有限公司成立于2004年，于2010年在深交所中小板上市（股票简称：深南股份），股票代码002417。公司2015年以前主营业务为研发、生产、销售移动通信设备，
          2015年以后以产业+金融为战略布局，下设“产业金融”、“资产管理”、“互联网金融”三大板块金融业务，主要产业有汽车金融、供应链金融、网络借贷、股权及债权出借等；
          目前公司已在深圳、南通、北京、上海、杭州、平潭等多个核心城市组建团队并设立了子公司，形成了转型升级的初步格局
        </p>
        <p class="am-text-center">
          <img class="logo" src="@/assets/publish/information_hl.png"/>
        </p>
        <p>
          红岭创投为红岭创投电子商务股份有限公司旗下的互联网金融服务平台，于2009年3月正式上线运营。作为国内成立较早的互联网金融服务平台，
          红岭创投致力建立具有特色的互联网金融交易场所，为客户带来全新的投融资服务体验。时至今日，红岭创投四十余家省级分公司布局全国，
          以其诚信、透明、自律、创新的特征赢得了良好的用户口碑，是国内行业规模较大、较具影响力的品牌之一。
        </p>
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
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('平台信息'))
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
