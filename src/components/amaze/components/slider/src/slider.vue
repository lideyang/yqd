<template>
  <div
    :class="computedClass"
    ref="container"
    :style="{height: sliderHeight + 'px'}"
    @mouseenter="mouseEnterHandle"
    @mouseleave="mouseLeaveHandle"
    @touchstart="touchStart"
    @touchmove='touchMove'
    @touchend="touchEnd"
  >
    <ul class="am-slides">
      <slot></slot>
    </ul>
    <ul class="am-direction-nav" v-if="directionNav">
      <li class="am-nav-prev">
        <a class="am-prev" href="#" @click.prevent="prevHandle"></a>
      </li>
      <li class="am-nav-next">
        <a class="am-next" href="#" @click.prevent="nextHandle"></a>
      </li>
    </ul>
    <ol class="am-control-nav am-control-paging" v-if="controlNav">
      <li v-for="val in itemCount">
        <a href="#" :class="{'am-active': showIndex === val - 1}" @click.prevent="selectHandle(val - 1)">{{ val }}</a>
        <i></i>
      </li>
    </ol>
  </div>
</template>

<script>
  import Touch from '@/utils/touch'

  let touch = null;
  export default {
    name: 'am-slider',
    data() {
      return {
        showIndex: this.activeIndex,
        sliderHeight: this.height
      };
    },
    props: {
      activeIndex: {
        type: Number,
        default: 0
      },
      customClass: {
        type: String
      },
      controlNav: {
        type: Boolean,
        default: true
      },
      directionNav: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 0
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      playDelay: {
        type: Number,
        default: 5000
      }
    },

    methods: {
      prevHandle() {
        if (this.showIndex <= 0) {
          this.showIndex = this.items.length - 1;
        } else {
          this.showIndex--;
        }
      },
      nextHandle() {
        if (this.showIndex >= this.items.length - 1) {
          this.showIndex = 0;
        } else {
          this.showIndex++;
        }
      },
      selectHandle(index) {
        if (index !== this.showIndex) {
          this.showIndex = index;
        }
      },
      touchStart(ev) {
        touch.touchStart(ev)
      },
      touchMove(ev) {
        touch.touchMove(ev)
      },
      touchEnd(ev) {
        let result = touch.touchEnd(ev)
        if (result === 'left') {
          this.nextHandle()
        } else if (result === 'right') {
          this.prevHandle()
        }
      },
      move() {
        const {showIndex} = this;
        const {width} = this.$refs['container'].getBoundingClientRect();
        if(!this.height){
          this.sliderHeight = this.items[showIndex].elm.lastChild.offsetHeight;
        }
        console.log(this.sliderHeight)
        this.items.forEach((vNode, index) => {
          let x = (index - showIndex) * width;
          vNode.componentInstance.translateItem(x);
        });
        this.$emit('onChange',showIndex)
      },
      mouseEnterHandle() {
        if (this.autoPlay) {
          clearInterval(this.timer);
        }
      },
      mouseLeaveHandle() {
        if (this.autoPlay) {
          this.timer = setInterval(this.nextHandle, this.playDelay);
        }
      }
    },
    watch: {
      showIndex(curVal, oldVal) {
        this.move();
      }
    },
    computed: {
      computedClass() {
        const classes = [];

        classes.push('am-slider');
        classes.push('am-slider-default');

        if (this.customClass !== undefined) {
          classes.push(this.customClass);
        }

        return classes.join(' ');
      },
      itemCount() {
        let count = 0;
        this.items = [];

        this.$slots.default.forEach((vNode) => {
          if (vNode.componentOptions && vNode.componentOptions.tag === 'am-slider-item') {
            this.items.push(vNode);
            count++;
          }
        });

        return count;
      }
    },
    mounted() {
      touch = new Touch({el:this.$refs['container']})
      this.move();
      if (this.autoPlay) {
        this.timer = setInterval(this.nextHandle, this.playDelay);
      }
    },
    beforeDestroy() {
      if (this.autoPlay) {
        clearInterval(this.timer);
      }
    }
  };
</script>
