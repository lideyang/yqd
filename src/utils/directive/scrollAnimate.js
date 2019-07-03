/**
 * Created by lidy on 2019/5/6.
 */
//函数防抖
const debounce = (func, wait) => {
  let timer = null
  return function () {
    const that = arguments.callee
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(that)
    }, wait)
  }
}

const setStyle = (el, opt) => {
  el.style.animationDuration = opt.duration + 's' || '0';
  el.style.animationDelay = opt.delay + 's' || '0';
  el.style.animationFillMode = opt.mode || 'forwards';
}

//判断元素是否可见
const see = (el, binding, Vue) => {
  const offsetHeight = el.getBoundingClientRect().top //滚动距离游览器可视顶部高度
  let height = el.getBoundingClientRect().height //元素高度
  let wh = window.innerHeight //内容视口高度
  const animateClassName = binding.value.name || ' ' //动画类名
  const className = el.className           //当前类名
  setStyle(el, binding.value)
  if (offsetHeight <= wh && offsetHeight >= -height) {
    el.className = className + ' ' + animateClassName
  }
  //监听滚动判读是否可见，可见执行动画，不可见则隐藏
  window.addEventListener('scroll', debounce(() => {
    const offsetHeight = el.getBoundingClientRect().top //滚动距离游览器可视顶部高度
    height = el.getBoundingClientRect().height
    if (offsetHeight <= wh && offsetHeight >= -height) {
      el.className = className + ' ' + animateClassName
    }
  }, 300))
}

module.exports = {
  install(Vue) {
    Vue.directive('animate', {
      // 当被绑定的元素插入到 DOM 中时激活
      inserted(el, binding, Vue) {
        see(el, binding, Vue)
      }

    })
  }
}
