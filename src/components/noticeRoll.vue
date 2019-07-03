<template>
  <div :style="{height:height*lineNum + 'px'}" class="notice-roll">
    <ul class="rollScreen_list" :style={transform:transform} :class="{rollScreen_list_unanim:num===0}">
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index :style="{height:height+'px'}">
        <span class="am-text-truncate am-text-middle">
          <a :href="'/article/notice/'+item.uuid">{{item.title}}</a>
        </span>
        <i class="am-text-middle">{{item.createTime|formatDateToDay}}</i>
      </li>
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index+contentArr.length
          :style="{height:height+'px'}">
         <span class="am-text-truncate am-text-middle">
          <a :href="'/article/notice/'+item.uuid">{{item.title}}</a>
        </span>
        <i class="am-text-middle">{{item.createTime|formatDateToDay}}</i>
      </li>
    </ul>
  </div>
</template>
<script>
  import {formatDateToDay} from '@/utils/utils'

  export default {
    props: {
      height: {
        default: 20,
        type: Number
      }, // 每行元素的高度
      lineNum: {
        default: 1,
        type: Number
      }, // 显示行数
      contentArr: {
        default: null,
        type: Array
      }, // 简单文本轮播
      dLength: {
        default: null,
        type: Number
      }, // 自定义插槽内容的时候必须传自定义内容的长度
      time: {
        default: 3000,
        type: Number // 定义轮播切换速度
      }
    },
    data: function () {
      return {
        num: 0,
        loopTime: this.time
      }
    },
    computed: {
      transform: function () {
        return 'translateY(-' + this.num * this.height + 'px)'
      }
    },
    filters: {
      formatDateToDay
    },
    beforeCreate: function () {
    },
    created: function () {
      let _this = this
      if ((this.contentArr != null && this.contentArr.length < this.lineNum) || (this.dLength != null && this.dLength < this.lineNum)) {
        console.error('轮播显示行数不能超过数据总行数')
      } else {
        // 先判断轮播切换速度，如果小于动画播放时间则提示切换速度过快
        if (_this.loopTime <= 1000) {
          console.warn('轮播切换速度过快，至少大于1s')
          _this.loopTime = 1000
        }
        // 两种轮播 第一种contentArr！= null 第二种自定义插槽
        if (_this.contentArr !== null) {
          setInterval(function () {
            if (_this.num !== _this.contentArr.length) {
              _this.num++
            } else {
              _this.num = 0
              setTimeout(function () {
                _this.num++
              }, 50)
            }
          }, _this.loopTime)
        } else if (_this.dLength !== null) {
          setInterval(function () {
            if (_this.num !== _this.dLength) {
              _this.num++
            } else {
              _this.num = 0
              setTimeout(function () {
                _this.num++
              }, 50)
            }
          }, _this.loopTime)
        } else if (_this.dLength === null && _this.dLength === null) {
          console.error('contentArr 和 dLength 均为空，rollScreen组件运行出错')
        }
      }
    },
    mounted: function () {
      // 复制一份slot的节点，如果直接用同名slot会报错
      if (this.dLength !== null) {
        for (let i = 0; i < this.dLength; i++) {
          this.$el.childNodes[0].appendChild(this.$slots.slide[i].elm.cloneNode(true))
        }
      }
    },
    methods: {}
  }
</script>

<style lang="less">
  .notice-roll {
    ul {
      position: relative;
      color: #333;
      height: .2rem;
      transition: top .3s ease;

      li {
        line-height: 1.4;

        span {
          display: inline-block;
          width: 2rem;

          a {
            color: #333;
          }
        }

        i {
          font-style: normal;
        }
      }

    }
  }
</style>
