<template>
  <a @click="onClickBtn" class="am-btn am-btn-secondary am-btn-xs re-send-btn am-radius"
     :class="{'btn-disabled':isStart}">{{codeBtn.text}}</a>
</template>

<script>
  let codeBtn = {
    Tid: null
  }
  export default {
    name: "countDownBtn",
    props: {
      text: {
        type: String,
        default: '重新发送'
      },
      countTime: {
        type: Number,
        default: 60
      },
      start:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        codeBtn: {
          text: this.text
        },
        isStart: false
      }
    },
    computed: {},
    methods: {
      startCount(){
        if (!this.isStart) {
          this.isStart = true;
          this.countDown(this.countTime);
        }
      },
      onClickBtn(event) {
        if (!this.isStart) {
          this.$emit('onClick')
        }
      },
      countDown(time) {
        let count = time;
        codeBtn.Tid = setInterval(() => {
          if (count > 0) {
            count--;
            this.codeBtn.text = "剩余" + count + '秒';
            console.log(this.codeBtn.text)
          } else {
            this.countEnd()
          }
        }, 1000)
      },
      countEnd(){//倒计时结束
        clearInterval(codeBtn.Tid);
        this.codeBtn.text = this.text;
        this.isStart = false;
        this.$emit('onEnd')
      }
    }
  }
</script>

<style scoped>

</style>
