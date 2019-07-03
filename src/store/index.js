import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import reg from './modules/reg'
import user from './modules/user'
import publish from './modules/publish'
import shoppingCart from './modules/shoppingCart'
import product from './modules/product'
import help from './modules/help'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    reg,
    user,
    publish,
    shoppingCart,
    product,
    help
  }
})
