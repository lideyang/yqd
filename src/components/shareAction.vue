<template>
  <div>
    <!--分享-->
    <am-actions class="my-recommend-share" :is-show.sync="actionsVisible">
      <h3 class="am-share-title">送您888元新手专享红包</h3>
      <ul class="am-share-sns am-avg-sm-3">
        <li @click.stop.prevent="onClickShareWxHandle">
          <a>
            <i class="icon-font icon-weixin"></i><span>微信</span>
          </a>
        </li>
        <li @click.stop.prevent="onClickShareCodeHandle">
          <a>
            <i class="icon-font icon-leaf"></i><span>专属推荐码</span>
          </a>
        </li>
      </ul>
      <div class="am-share-footer">
        <button class="am-btn am-btn-default am-btn-block" @click="actionsVisible=false">取消</button>
      </div>
    </am-actions>
    <!--分享提示遮罩-->
    <share-tips :showTips="shareTipsVisible" @onchangeVisible="onClickShareVisible"></share-tips>
  </div>
</template>

<script>
  import Vue from "vue"
  import {Actions} from "@components/amaze/components/actions"
  import shareTips from '@components/shareTips'
  import VueClipboard from 'vue-clipboard2'

  Vue.use(VueClipboard)
  export default {
    components: {
      shareTips,
      'am-actions': Actions
    },
    props:{
      shareLink:''
    },
    data() {
      return {
        shareTipsVisible: false,
        actionsVisible: false
      }
    },
    methods: {
      show() {
        this.actionsVisible = true
      },
      onClickShareVisible(visible) {
        this.shareTipsVisible = visible
      },
      onclickShareBtnHandle() {
        //分享按钮
        this.actionsVisible = true
      },
      onClickShareWxHandle() {
        this.actionsVisible = false
        this.shareTipsVisible = true
      },
      onClickShareCodeHandle() {
        this.$copyText(this.shareLink).then((e) => {
          this.$notify({
            message: '已复制链接，请将链接发送给微信好友',
            type: 'success'
          });
          this.actionsVisible = false
        }, (e) => {
          this.$notify({
            message: e,
            type: 'warning'
          });
        })
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
  .my-recommend-share {
    font-size: 14px;
    background-color: #fff;

    .am-share-title {
      padding: .1rem;
    }

    .am-share-title, .am-btn {
      font-size: 16px;
    }

    .am-share-sns {
      padding: .1rem 0;

      li {
        margin: 0;
      }

      span {
        margin: .1rem 0 0;
      }
    }

    .icon-font {
      font-size: 36px;
      border: 1px solid #dcdcdc;
      border-radius: 50%;
      padding: .05rem;
      display: inline-block;
      width: .6rem;
      height: .6rem;
      line-height: .5rem;

      &.icon-weixin {
        color: #24bd01;
      }

      &.icon-leaf {
        color: #d7c293;
      }
    }

    .am-share-footer {
      padding: .05rem 0;
    }
  }

  .am-share-wechat-qr {
    font-size: 12px;

    .am-modal-dialog {
      background-color: #f6f7fb;
      padding: .2rem 0 .1rem;
      border-radius: 8px;
      width: 80%;

      .am-close {
        width: 36px;
        height: 36px;
        font-size: 36px;
        top: 16px;
        right: 16px;

        .icon-font {
          font-size: 36px;
        }
      }

      .am-share-wechat-tip {
        font-size: 26px;
        color: #333;
      }

      .am-share-wx-qr {
        margin: 0 0 .3rem;
      }
    }
  }
</style>
