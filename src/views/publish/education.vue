<template>
  <div class="publish-layer publish-education-layer">
    <container :left-return="false" @onClickLeftBtn="$router.push('/publish/home')" :title="getCurrentNavBarText">
      <publish-nav-bar></publish-nav-bar>
      <div ref="mescroll" class="content mescroll">
        <ul id="dataList" class="data-list" v-cloak>
          <li class="am-g" v-for="item in list" @click="onClickLinkDetail(item.uuid)">
            <div class="am-u-sm-1 split">
              <img src="@/assets/publish/education_split.png"/>
            </div>
            <div class="am-u-sm-11">
              <div class="info">
                <p class="time am-text-primary"><strong>{{item.createTime|filterDate}}</strong></p>
                <p class="am-text-default">{{item.title}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </container>
  </div>
</template>

<script>
  import container from '@layout/container'
  import sign from '@layout/sign'
  import navBar from '@components/publish/navBar'
  import title from '@components/publish/title'
  import api from '@api'
  import {toJson} from '@/utils/utils'
  import localStore from '@/utils/localStore'
  import dayjs from 'dayjs'
  import {mapActions, mapGetters} from "vuex";
  import MeScroll from 'mescroll.js'

  export default {
    name: "companyProfile",
    components: {
      container,
      sign,
      "publishNavBar": navBar,
      "publishTitle": title
    },
    data() {
      return {
        list: []
      }
    },
    filters: {
      filterDate(value) {
        return dayjs(value).format('YYYY.MM.DD')
      }
    },
    computed: {
      ...mapGetters(['getCurrentNavBarText'])
    },
    methods: {
      ...mapActions(['setCurrentNavBarStatus']),
      //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page) {
        //联网请求
        api.GetEducationList({
          pageNo: page.num,
          pageSize: page.size
        }).then((response) => {
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
      onClickLinkDetail(uid) {
        localStore.set('currentArticleStatus', this.$store.getters.findStatusIndex('出借人教育'))
        this.$router.push({
          path: `/publish/detail/notice/${uid}`,
        })
      }
    },
    created() {
      this.setCurrentNavBarStatus(this.$store.getters.findStatusIndex('出借人教育'))
    },
    mounted() {
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
            warpId: "dataList", //父布局的id (1.3.5版本支持传入dom元素)
            icon: require("@/assets/icon/no_data.png"), //图标,默认null,支持网络图
            tip: "暂无记录~", //提示
          }
        }
      });
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/publish/main";
</style>
