<template>
  <div class="container">
    <header data-am-widget="header" class="am-header am-header-default top-header">
      <div v-if="leftStatus" class="am-header-left am-header-nav">
        <slot name="left">
          <a @click="onClickNextBtn" href="javascript:;;">
            <i class="am-header-icon icon-font icon-prev"></i>
            返回
          </a>
        </slot>
      </div>

      <h1 class="am-header-title">
        <a id="headerTitle" href="#title-link" class="">
          {{title}}
        </a>
      </h1>
      <div class="am-header-right am-header-nav">
        <slot name="icon">
          <a @click.prevent="onClickRightBtn" :href="url">
            <i v-if="iconfont" class="am-text-xl" :class="iconfont"></i>
            <span v-if="rightText">{{rightText}}</span>
          </a>
        </slot>
      </div>
    </header>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "亿钱贷"
      },
      icon: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: "#"
      },
      leftStatus: {
        type: Boolean,
        default: true
      },
      rightText: {
        type: String,
        default: ""
      },
      leftReturn: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      iconfont() {
        if (!this.icon) return ''
        return 'icon-font icon-' + this.icon
      }
    },
    methods: {
      onClickRightBtn() {
        this.$emit("onClickRightBtn")
      },
      onClickNextBtn() {
        if (this.leftReturn) {
          this.$router.go(-1)
        } else {
          this.$emit("onClickLeftBtn")
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    height: 100%;
  }
</style>
