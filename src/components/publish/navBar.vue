<template>
  <div class="am-g publish-navbar-layer">
    <div class="am-u-sm-10 nav-bar" ref="navBarList">
      <ul ref="navBar" :style="{width:navBarWidth+'px'}">
        <li v-for="(item,index) in navBar" :class="{active:status===index}" @click="onClickNavBar(item.router)">
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <div class="am-u-sm-2 am-text-center dropdown" @click="onClickDropdownBtn">
      <i class="icon-font icon-bottom"></i>
    </div>
    <transition name="slide">
      <div v-show="dropdown.visible" class="dropdown-layer am-text-center">
        <div class="title">
          <strong class="am-text-primary">选择栏目</strong>
          <i @click="onClickHideDropdownBtn" class="icon-font am-text-muted icon">X</i>
        </div>
        <div class="dropdown-list am-g">
          <div v-for="(item,index) in navBar" class="am-u-sm-4" :class="{'am-u-end':index===navBar.length-1}">
            <a class="am-btn am-radius" @click="onClickNavBar(item.router)"
               :class="index===status?'am-btn-primary':'am-btn-default'">{{item.text}}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import navBar from '@/utils/publishNavBar'
  import {mapState} from "vuex";

  export default {
    name: "navBar",
    props: {},
    data() {
      return {
        navBar: navBar,
        navBarWidth: '',
        dropdown: {
          visible: false
        }
      }
    },
    components: {},
    mounted() {
      let navBarWidth = 0;
      for (let item of this.$refs['navBar'].childNodes) {
        navBarWidth += item.offsetWidth
      }
      this.navBarWidth = navBarWidth + 10;
      let navBarLength = this.$refs['navBar'].childNodes.length
      this.$nextTick(() => {
        this.$refs['navBarList'].scrollLeft = navBarWidth / navBarLength * this.status + 10
      })

    },
    computed: {
      ...mapState({
        status: state => state.publish.navBar.status
      }),
      dropdownHeight() {
        return this.dropdown.visible ? 'auto' : '0px'
      }
    },
    methods: {
      onClickNavBar(url) {
        this.$router.push('/publish/' + url)
      },
      onClickDropdownBtn() {
        this.dropdown.visible = true
      },
      onClickHideDropdownBtn() {
        this.dropdown.visible = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/style/less/amaze/variables";

  .publish-navbar-layer {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #fafafa;
    box-shadow: 0 20px 20px rgba(50, 50, 50, .05);

    .nav-bar {
      height: .4rem;
      overflow-x: scroll;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      ul {
        margin: 0 .2rem;
        left: 0;
        top: 0;
        height: .4rem;

        li {
          position: relative;
          height: .4rem;
          line-height: .4rem;
          padding: 0 .1rem;
          float: left;

          &.active {
            color: @global-primary;

            &:before {
              position: absolute;
              bottom: 0;
              left: 50%;
              content: '';
              margin-left: -.1rem;
              width: .2rem;
              height: 3px;
              background-color: @global-primary;
            }
          }
        }
      }
    }

    .dropdown {
      i {
        font-size: 24px;
      }
    }

    .dropdown-layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 9999;
      overflow: hidden;

      .title {
        padding: .1rem 0;
        background-color: #fff;

        .icon {
          position: absolute;
          right: .2rem;
          top: .08rem;
        }
      }

      .dropdown-list {
        position: relative;
        background: linear-gradient(to bottom, #f0f0f5, #fff);
        padding: .2rem;
        border-bottom: 1px solid #eaeaea;

        .am-btn {
          margin: 0 0 .1rem;
          padding: .1rem 0;
          width: 1rem;
          text-align: center;
        }
      }
    }

    .slide-enter-active, .slide-leave-active {
      transition: all 1s;
    }

    .slide-enter-active, .slide-leave {
      height: 3.23rem;
    }

    .slide-enter, .slide-leave-active {
      height: 0;
    }
  }
</style>
