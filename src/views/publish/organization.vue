<template>
  <div class="publish-layer publish-organization-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="content">
        <publish-title class="title">组织架构</publish-title>
        <p>
          目前公司下设市场拓展部、运营管理部、产品管理部、风险控制部、技术开发部、法务合规部、财务管理部、综合管理部和客户服务部九个一级部门。团队管理大多以扁平化管理为主，各部门间相互配合、相互提升、分工明确，指令下达快速，业务活动组织较流畅。
        </p>
        <img class="banner" src="@/assets/publish/zzjg_banner.png"/>
        <publish-title class="title">人员结构</publish-title>
        <p>截止4月起，亿钱贷平台工作人员数总计49人。技术人员与风控人员合计22人，其中拥有本科及以上学历占73%以上，具体的年龄结构与学历分布情况如下图：：</p>
        <canvas ref="personAgeCanvas"></canvas>
        <canvas ref="personEducationCanvas"></canvas>
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
  import {Ring, setArea} from '@/utils/chart'
  //人员结构
  const totalArr = [{text: '25岁及以下', color: '#21c28e', val: 16}, {
    text: '26岁至30岁',
    color: '#2ad4da',
    val: 45
  }, {text: '31岁至40岁', color: '#51a0e3', val: 35}, {text: '41岁及以上', color: '#43aee0', val: 4}];
  //学历结构
  const totalArr2 = [{text: '博士及硕士', color: '#7177e8', val: 12}, {text: '本科', color: '#7ab5ed', val: 61}, {
    text: '专科',
    color: '#7edaea',
    val: 27
  }];
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
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('组织架构'))
    },
    mounted() {
      //年龄结构
      let ctx = setArea(this.$refs['personAgeCanvas'], 120, 120);//设置宽高倍数
      let ring = new Ring(57, 18, {title: '年龄结构', bgColor: '#fff'}, "butt");
      ring.drawRing(ctx, 1.5 * Math.PI, totalArr, 70, 70);
      //学历结构
      let ctx2 = setArea(this.$refs['personEducationCanvas'], 120, 120);//设置宽高倍数
      let ring2 = new Ring(57, 18, {title: '学历结构', bgColor: '#fff'}, "butt");
      ring2.drawRing(ctx2, 1.5 * Math.PI, totalArr2, 70, 70);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
