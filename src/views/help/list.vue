<template>
  <div class="help-center-list-layer">
    <container title="帮助中心">
      <template v-slot:left>
        <a @click="onClickHeaderNextBtn" href="javascript:;;">
          <i class="am-header-icon icon-font icon-prev"></i>
          帮助中心
        </a>
      </template>
      <help-nav-bar></help-nav-bar>
      <help-question :list="list"></help-question>
    </container>
  </div>
</template>

<script>
  import footerMenu from '@layout/footerMenu'
  import container from '@layout/container'
  import navBar from '@components/help/navBar'
  import question from '@components/help/question'
  import {toJson} from '@/utils/utils'
  import api from '@api'
  import {mapState, mapActions} from "vuex";

  export default {
    name: "helpCenterList",
    components: {
      container,
      footerMenu,
      "helpNavBar": navBar,
      "helpQuestion": question,
    },
    data() {
      return {
        typeId: this.$route.query.typeId,
        list: []
      }
    },
    watch: {
      $route(route) {
        this.typeId = route.query.typeId
        this.doChangeQuestionList(this.typeId)
      },
    },
    created() {
      this.doChangeQuestionList(this.typeId)
    },
    methods: {
      doChangeQuestionList(typeId) {
        if (typeId) {
          api.GetHelpCenterTypeList(typeId).then(response => {
            let data = toJson(response)
            console.log(data)
            this.list = data.data
          })
        } else {
          this.onClickHeaderNextBtn()
        }
      },
      onClickHeaderNextBtn() {
        this.$router.push('/help/center')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/views/help/center";
</style>
