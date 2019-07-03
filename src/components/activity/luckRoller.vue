<template>
  <ul class="roller" :class="{'fx-roll':start}" :style="{transform:currentTranslate}">
    <li v-for="item in list">
      <img :src="item" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: "luckRoller",
    props: {
      start: {
        default: false,
        type: Boolean
      },
      list: {
        default: [],
        type: Array
      },
      index: {
        default: -1,
        type: Number
      }
    },
    computed: {
      currentTranslate() {
        if (this.index === -1) {
          return false
        } else {
          return `translateY(-${(this.index)}rem)`
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .roller {
    position: relative;
    overflow: hidden;
    width: .63rem;

    li {
      height: 1rem;
      background-size: cover;
      text-align: center;
      padding-top: .25rem;
      img{
        width:.5rem;
        margin-left:.02rem;
      }
      &.red {
        background-image: url("../../assets/active/june/red_card.png");
        background-repeat: no-repeat;
        color: #fdef6a;
        font-size: 32px;
        padding-top: .42rem;
      }

      &.money {
        background-image: url("../../assets/active/june/money_card.png");
        background-repeat: no-repeat;
        color: #fdef6a;
        font-size: 40px;
        padding-top: .16rem;
      }
    }
  }

  .fx-roll {
    animation: fx-roll 0.5s 0s infinite linear
  }

  .fx-bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom
  }

  @keyframes fx-roll {
    0% {
      transform: translate3d(0, 0, 0)
    }
    100% {
      transform: translate3d(0, -100%, 0)
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
    40%, 43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0);
      transform: translate3d(0, -30px, 0)
    }
    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0);
      transform: translate3d(0, -15px, 0)
    }
    90% {
      -webkit-transform: translate3d(0, -4px, 0);
      transform: translate3d(0, -4px, 0)
    }
  }
</style>
