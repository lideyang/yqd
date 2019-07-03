/**
 * Created by lidy on 2019/4/28.
 */
class Touch {
  constructor(opt) {
    this.disX = 0
    this.lastX = 0
    this.lastY = 0
    this.container=opt.el
  }

  touchStart(ev) {
    ev = ev || event;
    // console.log(ev.targetTouches);
    // console.log(ev.changedTouches);
    if (ev.touches.length == 1) { //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      this.startX = this.lastX = ev.touches[0].clientX; // 记录开始位置
      this.lastY = ev.touches[0].clientX;
    }
  }

  touchMove(ev) {
    ev = ev || event;
    let slideWidth = this.container.offsetWidth; //$refs 减少获取dom节点的消耗
    // console.log(ev.targetTouches);
    // console.log(ev.changedTouches);
    if (ev.touches.length == 1) {
      // 实时的滑动的距离-起始位置=实时移动的位置
      this.disX = this.lastX - this.startX;
      // 计算两次移动距离Y>X就不启动滑动动画,防止误滑
      let disX = ev.touches[0].clientX - this.lastX
      let disY = ev.touches[0].clientY - this.lastY
      // console.log(disX, disY);
      if (Math.abs(disX) > Math.abs(disY)) {
        this.translateX = 'translateX(' + this.disX + 'px)';
      }
      // 记录一次坐标值
      this.lastX = ev.touches[0].clientX;
      this.lastY = ev.touches[0].clientY;
    }
  }

  touchEnd(ev) {
    ev = ev || event;
    let slideWidth = this.container.offsetWidth;
    if (ev.changedTouches.length == 1) {
      let endX = ev.changedTouches[0].clientX;
      this.disX = endX - this.startX;
      // console.log(this.disX, 'this.disX')
      // console.log((slideWidth / 2), 'slideWidth/2');
      this.translateX = 'translateX(0px)';
      // 只有滑动大于一半距离才触发
      if (Math.abs(this.disX) > (slideWidth / 2)) {
        if (this.disX < 0) {
          console.log('左滑');
          return 'left'
        } else {
          console.log('右滑');
          return 'right'
        }
      }
      return ''
    }
    return ''
  }
}

export default Touch
