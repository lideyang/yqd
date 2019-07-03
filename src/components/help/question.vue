<template>
  <div class="question-list-layer">
    <ul>
      <li v-for="item in question">
        <div class="title am-text-truncate" @click="onClickQuestionHandle(item)" :title="item.faqQuestion" :class="{active:item.isShow}">{{item.faqQuestion}}
          <div class="icon">{{item.isShow?'-':'+'}}</div>
        </div>
        <div class="content" v-html="item.faqAnswer" v-show="item.isShow">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "questionList",
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        question: []
      }
    },
    watch: {
      list(value) {
        this.question = this.doCopyQuestion(value)
      }
    },
    created() {
      this.question = this.doCopyQuestion(this.list)
    },
    methods: {
      doCopyQuestion(data) {
        return data.map((item, index) => {
          let obj = Object.assign({}, item)
          obj.isShow = index === 0 ? true : false
          return obj
        })
      },
      onClickQuestionHandle(item) {
        item.isShow = !item.isShow
      }
    }
  }
</script>

<style lang="less">
  @import "../../style/less/amaze/variables";

  .question-list-layer {
    margin: .15rem;

    ul {
      li {
        border-bottom: 1px solid #ececec;

        .title {
          position: relative;
          line-height: .5rem;
          height: .5rem;
          padding: 0 .25rem 0 .1rem;
          font-size: 16px;
          color: #000;
          font-weight: 500;

          &.active {
            background-color: #ececec;
          }

          .icon {
            position: absolute;
            right: .1rem;
            top: 0;
            border: 1px solid #666666;
            border-radius: 2px;
            color: #666;
            width: 15px;
            height: 15px;
            line-height: 11px;
            text-align: center;
            margin: .17rem 0 0 0;
          }
        }

        .content {
          margin: .1rem 0 0;
          font-family: @base-font-family !important;
          color: #666 !important;

          * {
            font-family: @base-font-family !important;
            color: #666 !important;
          }

          img {
            max-width: 100% !important;
            height: auto!important;
          }
        }
      }
    }
  }
</style>
