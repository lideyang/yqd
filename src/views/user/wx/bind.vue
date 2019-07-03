<template>
  <div class="wx-bind-layer am-text-center">
    <container title="微信绑定">
      <div class="wx-bind-boxer">
        <div class="logo-pic am-text-center">
          <img src="@/assets/wx/bind_title.png" />
        </div>
        <div class="info">
          <p>您的亿钱贷账号  <span class="am-text-secondary">{{realName}}</span></p>
          <p>将与微信号 <span class="am-text-secondary">{{wxName}}</span> 进行绑定</p>
        </div>
        <p class="bind-btn">
          <a class="am-btn am-btn-success am-btn-xl am-block am-radius" href="">立即绑定</a>
        </p>
        <p class="am-text-muted">
          绑定后可通过服务号接收账户资金动态信息
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

    },
    destroyed() {
      removeBodyBg('gray-bg')
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/wx/bind.less";
</style>
