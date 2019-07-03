import store from '../store'
import Vue from 'vue'

/**
 *   Toast公共方法
 */
export function toast(str, icon) {
  store.dispatch('showToast', true)
  if (icon == 'success') {
    store.dispatch('showSuccess', true)
    store.dispatch('showFail', false)
  } else {
    store.dispatch('showSuccess', false)
    store.dispatch('showFail', true)
  }
  store.dispatch('toastMsg', str);
  setTimeout(() => {
    store.dispatch('showToast', false);
  }, 1500);
}

/**
 * loading
 */

export function loading(status) {
  store.dispatch('setLoadingState', status)
}

/**
 * 跳转到登录页
 */
export function gotoLogin(name) {
  store.dispatch('setUserName', '')
  window.location.href = '/spa/account/login'
}

/**
 * 设置meta
 */

export function setViewport(dpr) {
  let scale = dpr === 1 ? 1.0 : 0.5
  let viewportMeta = document.getElementById('viewport');
  viewportMeta.setAttribute('content', `width=device-width,initial-scale=${scale},minimum-scale=${scale},maximum-scale=${scale},user-scalable=no,viewport-fit=cover`);
  setHtmlFontSize(document, window, scale)
}
