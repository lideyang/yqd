<template>
  <div class="activity-june-share-result-layer">
    <img class="title" :class="{success}" :src="titleImgUrl"/>
    <img class="tips-img" :class="{success}" :src="tipsImgUrl"/>
    <h3 class="tips" v-html="msg"></h3>
    <a :href="shareLink" class="reg-btn">
      我也要领取奖励
    </a>
    <p class="am-text-center">
      注：新手注册立享888元大红包
    </p>
  </div>
</template>

<script>
  import Vue from "vue"
  import {toJson, formatDateToDay, isWX} from '@/utils/utils'
  import {Confirm} from "@components/amaze/components/confirm"
  import {Pagination} from "@components/amaze/components/pagination"
  import shareTips from '@components/shareTips'
  import api from '@api'
  import wx from 'weixin-js-sdk';

  export default {
    name: "june",
    components: {
      'am-confirm': Confirm,
      'am-pagination': Pagination,
      shareTips,
    },
    props: {
      token: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        code: '',
        success: true,
        msg: ''
      }
    },
    filters: {
      formatDateToDay
    },
    watch: {},
    computed: {
      titleImgUrl() {
        if (this.success) {
          return require('@/assets/active/june/banner-s.png')
        } else {
          return require('@/assets/active/june/banner-f.png')
        }
      },
      tipsImgUrl() {
        if (this.success) {
          return require('@/assets/active/june/red.png')
        } else {
          return require('@/assets/active/june/cat-cry.png')
        }
      },
      shareLink() {
        return `/spa/account/land?code=${this.code}`
      }
    },
    created() {
      api.GetJuneShareLikesResult().then(response => {
        this.code = response.data.code
        this.msg = response.msg
        this.success = response.success
      })
    },
    mounted() {
      //this.isShowModal5 = true
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/juneShare";

  body, html {
    height: 100%;
  }
</style>
