<template>
  <div class="help-center-layer">
    <container title="帮助中心">
      <template v-slot:left>
        <a @click="onClickHeaderNextBtn" href="javascript:;;">
          <i class="am-header-icon icon-font icon-prev"></i>
          常见问题
        </a>
      </template>

      <div class="content">
        <div class="search-layer">
          <i class="icon-font icon-search"></i>
          <input placeholder="搜索关键词问题" v-model="searchText"/>
        </div>
        <ul v-show="!isSearch" class="menu am-text-center am-cf">
          <li v-for="(item,index) in list" @click="onClickNavBar(index,item.typeId)">
            <div class="icon-font am-text-primary" :class="item|helpListIcon"></div>
            <p>{{item.typeName}}</p>
          </li>
        </ul>
        <help-question v-show="isSearch&&searchList.length" :list="searchList"></help-question>
        <div v-show="isSearch&&!searchList.length" class="search-empty">
          抱歉，没有搜索到相关结果
        </div>
      </div>
      <div class="hot-question">
        <h2 class="title">
          热点问题
        </h2>
        <ul class="am-cf">
          <li v-for="item in hotList">
            {{item.faqQuestion}}
          </li>
        </ul>
      </div>
    </container>
  </div>
</template>

<script>
  import footerMenu from '@layout/footerMenu'
  import container from '@layout/container'
  import navBarList from '@/utils/helpCenterNavBar'
  import question from '@components/help/question'
  import {toJson, debounce} from '@/utils/utils'
  import api from '@api'
  import {mapState, mapActions} from "vuex";

  let timeout = null
  export default {
    name: "helpCenter",
    components: {
      container,
      footerMenu,
      "helpQuestion": question,
    },
    data() {
      return {
        navBar: navBarList,
        searchText: '',
        hotList: [],
        searchList: [],
        isSearch: false
      }
    },
    filters: {
      helpListIcon(data) {
        let icon = 'icon-new-hard-center'
        navBarList.forEach(item => {
          if (item.text == data.typeName) {
            icon = item.icon
          }
        })
        return icon
      }
    },
    computed: {
      ...mapState({
        list: state => state.help.navBar.list
      }),
    },
    watch: {
      searchText(value) {
        if (value) {
          this.doGetSearchList(value)
        } else {
          clearTimeout(timeout)
          this.isSearch = false
        }
      }
    },
    created() {
      api.GetHelpCenterList().then(response => {
        let data = toJson(response)
        console.log(data)
        this.setHelpNavBarList(data.types)
        this.hotList = data.faqs
      })
    },
    methods: {
      ...mapActions(['setHelpNavBarList', 'setHelpNavBarStatus']),
      onClickNavBar(status, typeId) {
        this.setHelpNavBarStatus(status)
        this.$router.push({
          path: '/help/list', query: {
            typeId
          }
        })
      },
      onClickHeaderNextBtn() {
        window.location.href = '/static/more'
      },
      doGetSearchList(value) {
        timeout = debounce(() => {
          api.GetHelpCenterQuery({keyword: value}).then(response => {
            let data = toJson(response)
            this.searchList = data.data
            this.isSearch = true
          })
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/help/center";
</style>
