<template>
  <div class="publish-layer publish-product-introduce-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div class="home-layer">
        <ul class="am-list about-list government-list" style="padding: 0 0 .001rem;">
          <li><a @click="$router.push('/publish/product/introduceWN')"><p>主要服务于农业全产业链中的优质涉农新型经营主体
          </p><span class="am-fr">详情<i class="icon-font icon-next"></i></span></a></li>
          <li><a @click="$router.push('/publish/product/introduceQL')"><p>主要针对供应链模式中核心企业及上下游小微企业
          </p><span class="am-fr">详情<i class="icon-font icon-next"></i></span></a></li>
          <li><a @click="$router.push('/publish/product/introduceWH')"><p>主要针对具有良好信用及稳定工作收入的群体
          </p><span class="am-fr">详情<i class="icon-font icon-next"></i></span></a></li>
          <li><a @click="$router.push('/publish/product/introduceLB')"><p>主要针对拥有良好的信用记录及名下资产拥有一定增信背书的群体</p><span
            class="am-fr">详情<i class="icon-font icon-next"></i></span></a></li>
          <li><a @click="$router.push('/publish/product/introduceYC')"><p>主要针对企业或个人名下拥有合法车辆的车主</p><span class="am-fr">详情<i
            class="icon-font icon-next"></i></span></a></li>
          <li><a @click="$router.push('/publish/product/introduceWQ')"><p>主要针对具有稳定经营记录与收入来源的中小微企业</p><span
            class="am-fr">详情<i class="icon-font icon-next"></i></span></a></li>
        </ul>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import navBar from '@components/publish/navBar'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "list",
    components: {
      container,
      "publishNavBar": navBar
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('项目介绍'))
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
    },
  }
</script>

<style lang="less">
  @import "~@/style/less/views/publish/product";
  html, body {
    height: 100%;
  }

  .about-home .home-layer {
    margin: 0;
  }
  .home-layer .about-list.government-list li {
    background-image: url("../../../assets/about/product_list.jpg") !important;
    background-size: 100% auto;
  }

  .home-layer .about-list.government-list li:first-child {

  }

  .home-layer .about-list.government-list li:nth-child(2) {
    background-position: 0 -1.5rem;
  }

  .home-layer .about-list.government-list li:nth-child(3) {
    background-position: 0 -3rem;
  }

  .home-layer .about-list.government-list li:nth-child(4) {
    background-position: 0 -4.5rem;
  }

  .home-layer .about-list.government-list li:nth-child(5) {
    background-position: 0 -6rem;
  }

  .home-layer .about-list.government-list li:nth-child(6) {
    background-position: 0 -7.5rem;
  }

  .home-layer .about-list.government-list li p {
    position: absolute;
    font-size: 12px;
    left: .4rem;
    top: .7rem;
    color: #fff;
    width: 2.4rem;
  }
</style>
