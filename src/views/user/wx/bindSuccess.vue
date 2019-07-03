<template>
  <div class="wx-bind-layer am-text-center">
    <container title="微信绑定">
      <div class="wx-bind-boxer">
        <div class="icon am-text-center">
          <i class="icon-font icon-right am-text-success" />
        </div>
        <div class="info">
          <p>您的亿钱贷账号  <span class="am-text-secondary">{{realName}}</span></p>
          <p>将与微信号 <span class="am-text-secondary">{{wxName}}</span> 进行绑定</p>
        </div>
        <p class="bind-btn">
          <a class="am-btn am-btn-success am-btn-xl am-block am-radius" @click.prevent="onClick">确定</a>
        </p>
      </div>
    </container>
  </div>
</template>

<script>
  import container from "@components/layout/container"
  import {formatDateToSecond, formatCurrency, toJson} from '@/utils/utils'
  import {setBodyBg, removeBodyBg} from '@/utils/setBodyBg'
  import api from '@api'

  export default {
    name: "rechargeRecord",
    data() {
      return {
        realName: '',
        wxName: ''
      }
    },
    components: {
      container
    },
    computed: {},
    filters: {
      formatDateToSecond,
      formatCurrency
    },
    created() {
      setBodyBg('gray-bg')
      api.GetRechargeRecord().then(response => {
        //let result = toJson(response)
        this.list = response.result.map(item => {
          item.isOpen = false
          return item
        });
        console.log(response)
      }).catch(result => {

      })
    },
    methods: {
      onClick(){
        this.$router.push('/user/center')
      }
    },
    destroyed() {
      removeBodyBg('gray-bg')
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/wx/bindSuccess.less";
</style>
