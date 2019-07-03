import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/types'
import pages from './pages'
import api from '@api'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: '/spa/',
  routes: [
    {
      path: '*',
      component: r => require.ensure([], () => r(require('@/views/error/404')), 'page404'),
      meta: {
        title: '404错误'
      }
    },
    {
      path: '/',
      component: pages.Home,
      name: 'home',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/account/login',
      component: pages.Login,
      name: 'login',
      meta: {
        title: '登录'
      }
    }, {
      path: '/account/wxLogin',
      component: pages.wxLogin,
      name: 'wxLogin',
      meta: {
        title: '微信登录'
      }
    }, {
      path: '/user/center',
      component: pages.Center,
      name: 'userCenter',
      meta: {
        title: '个人中心'
      }
    }, {
      path: '/user/myRepayment',
      component: pages.MyRepayment,
      name: 'myRepayment',
      meta: {
        title: '我的回款'
      }
    }, {
      path: '/user/myRepaymentList',
      component: pages.MyRepaymentList,
      name: 'myRepaymentList',
      meta: {
        title: '我的回款-列表'
      }
    }, {
      path: '/user/recharge',
      component: pages.Recharge,
      name: 'recharge',
      meta: {
        title: '充值'
      }
    }, {
      path: '/user/rechargeRecord',
      component: pages.RechargeRecord,
      name: 'rechargeRecord',
      meta: {
        title: '充值记录'
      }
    }, {
      path: '/user/setting',
      component: pages.Setting,
      name: 'setting',
      meta: {
        title: '账户设置'
      }
    },
    {
      path: '/account/land',
      component: pages.Land,
      props: (route) => {
        ({code: route.query.code})
      },
      name: 'land',
      meta: {
        title: '落地页'
      }
    }, {
      path: '/account/regSuccess',
      component: pages.RegSuccess,
      name: 'regSuccess',
      meta: {
        title: '注册成功'
      }
    },
    {
      path: '/user/myCoupons',
      component: pages.MyCoupons,
      name: 'myCoupons',
      meta: {
        title: '优惠券'
      }
    }, {
      path: '/user/withdrawRecord',
      component: pages.WithdrawRecord,
      name: 'withdrawRecord',
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/user/WXBindSuccess',
      component: pages.WXBindSuccess,
      name: 'WXBindSuccess',
      meta: {
        title: '微信绑定'
      }
    },
    {
      path: '/user/WXBind',
      component: pages.WXBind,
      name: 'WXBind',
      meta: {
        title: '微信绑定'
      }
    },
    {
      path: '/activity/may',
      component: pages.May,
      name: 'may',
      meta: {
        title: '五月活动'
      }
    },
    {
      path: '/publish/home',
      component: pages.PublishHome,
      name: 'publishHome',
      meta: {
        title: '信披首页'
      }
    },
    {
      path: '/publish/hegui',
      component: pages.PublishHEGUI,
      name: 'publishHEGUI',
      meta: {
        title: '合规进程'
      }
    },
    {
      path: '/publish/companyProfile',
      component: pages.CompanyProfile,
      name: 'companyProfile',
      meta: {
        title: '公司简介'
      }
    },
    {
      path: '/publish/information',
      component: pages.Information,
      name: 'information',
      meta: {
        title: '平台信息'
      }
    },
    {
      path: '/publish/organization',
      component: pages.Organization,
      name: 'organization',
      meta: {
        title: '组织架构'
      }
    },
    {
      path: '/publish/team',
      component: pages.Team,
      name: 'team',
      meta: {
        title: '管理团队'
      }
    },
    {
      path: '/publish/data',
      component: pages.Data,
      name: 'data',
      meta: {
        title: '运营数据'
      }
    },
    {
      path: '/publish/report',
      component: pages.Report,
      name: 'report',
      meta: {
        title: '运营报告'
      }
    },
    {
      path: '/publish/examine',
      component: pages.Examine,
      name: 'examine',
      meta: {
        title: '审核信息'
      }
    },
    {
      path: '/publish/matters',
      component: pages.Matters,
      name: 'matters',
      meta: {
        title: '重大事项'
      }
    },
    {
      path: '/publish/notice',
      component: pages.Notice,
      name: 'notice',
      meta: {
        title: '平台公告'
      }
    },
    {
      path: '/publish/explanation',
      component: pages.Explanation,
      name: 'explanation',
      meta: {
        title: '重大事项'
      }
    },
    {
      path: '/publish/education',
      component: pages.Education,
      name: 'education',
      meta: {
        title: '出借人教育'
      }
    },
    {
      path: '/publish/detail/:type/:id',
      component: pages.ArticleDetail,
      name: 'articleDetail',
      meta: {
        title: '详情'
      }
    },
    {
      path: '/publish/contact',
      component: pages.Contact,
      name: 'contact',
      meta: {
        title: '联系我们'
      }
    },
    {
      path: '/publish/control',
      component: pages.Control,
      name: 'control',
      meta: {
        title: '风险控制'
      }
    },
    {
      path: '/publish/risk',
      component: pages.Risk,
      name: 'risk',
      meta: {
        title: '风险提示'
      }
    },
    {
      path: '/publish/depositoryInfo',
      component: pages.DepositoryInfo,
      name: 'depositoryInfo',
      meta: {
        title: '银行存管'
      }
    },
    {
      path: '/publish/product/introduceWN',
      component: pages.IntroduceWN,
      name: 'introduceWN',
      meta: {
        title: '微农贷'
      }
    },
    {
      path: '/publish/product/introduceQL',
      component: pages.IntroduceQL,
      name: 'introduceQL',
      meta: {
        title: '企链贷'
      }
    },
    {
      path: '/publish/product/introduceWH',
      component: pages.IntroduceWH,
      name: 'introduceWH',
      meta: {
        title: '微花贷'
      }
    },
    {
      path: '/publish/product/introduceLB',
      component: pages.IntroduceLB,
      name: 'introduceLB',
      meta: {
        title: '乐保贷'
      }
    },
    {
      path: '/publish/product/introduceYC',
      component: pages.IntroduceYC,
      name: 'introduceYC',
      meta: {
        title: '优车贷'
      }
    },
    {
      path: '/publish/product/introduceWQ',
      component: pages.IntroduceWQ,
      name: 'introduceWQ',
      meta: {
        title: '微企贷'
      }
    },
    {
      path: '/publish/product/introduceList',
      component: pages.IntroduceList,
      name: 'introduceList',
      meta: {
        title: '产品列表'
      }
    },
    {
      path: '/activity/wxBindHelp',
      component: pages.WXBindHelp,
      name: 'wxBindHelp',
      meta: {
        title: '微信绑定说明'
      }
    },
    {
      path: '/error/404',
      component: pages.Page404,
      name: 'page404',
      meta: {
        title: '404错误'
      }
    },
    {
      path: '/product/auto',
      component: pages.ProductAuto,
      name: 'productAuto',
      meta: {
        title: '易智投'
      }
    },
    {
      path: '/product/autoConfirm',
      component: pages.ProductAutoConfirm,
      name: 'productAutoConfirm',
      meta: {
        title: '委托出借认购'
      }
    },
    {
      path: '/product/single',
      component: pages.ProductSingle,
      name: 'productSingle',
      meta: {
        title: '散标列表'
      }
    },
    {
      path: '/product/transfer',
      component: pages.ProductTransfer,
      name: 'productTransfer',
      meta: {
        title: '债权转让'
      }
    },
    {
      path: '/product/detail/:id',
      component: pages.ProductDetail,
      name: 'productDetail',
      meta: {
        title: '项目详情'
      }
    },
    {
      path: '/product/confirm/:id',
      component: pages.ProductSingleConfirm,
      name: 'productSingleConfirm',
      meta: {
        title: '出借确认'
      }
    },
    {
      path: '/product/shoppingCart',
      component: pages.ShoppingCart,
      name: 'shoppingCart',
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/product/shoppingCartSuccess',
      component: pages.ShoppingCartSuccess,
      name: 'shoppingCartSuccess',
      meta: {
        title: '完成出借'
      }
    },
    {
      path: '/activity/june',
      component: pages.June,
      name: 'june',
      meta: {
        title: '六月活动'
      }
    },
    {
      path: '/activity/juneShare',
      component: pages.JuneShare,
      name: 'juneShare',
      meta: {
        title: '六月活动分享'
      }
    },
    {
      path: '/activity/juneShareLand',
      component: pages.JuneShareLand,
      name: 'juneShareLand',
      meta: {
        title: '六月活动分享页'
      }
    },
    {
      path: '/activity/juneLikesResult',
      component: pages.JuneLikesResult,
      name: 'juneLikesResult',
      meta: {
        title: '六月活动点赞成功'
      }
    },
    {
      path: '/activity/july',
      component: pages.July,
      name: 'july',
      meta: {
        title: '七月活动'
      }
    },
    {
      path: '/product/success',
      component: pages.ProductSuccess,
      name: 'productSuccess',
      meta: {
        title: '出借成功'
      }
    },
    {
      path: '/account/forget/pwd',
      component: pages.ForgetPassword,
      name: 'forgetPassword',
      meta: {
        title: '重置登录密码'
      }
    },
    {
      path: '/recommend/explain',
      component: pages.RecommendExplain,
      name: 'recommendExplain',
      meta: {
        title: '推荐邀请奖励'
      }
    },
    {
      path: '/recommend/info',
      component: pages.RecommendInfo,
      name: 'recommendInfo',
      meta: {
        title: '推荐邀请奖励'
      }
    },
    {
      path: '/recommend/rule',
      component: pages.RecommendRule,
      name: 'recommendRule',
      meta: {
        title: '推荐奖励规则'
      }
    },
    {
      path: '/help/center',
      component: pages.HelpCenter,
      name: 'helpCenter',
      meta: {
        title: '帮助中心'
      }
    },
    {
      path: '/help/list',
      component: pages.HelpCenterList,
      name: 'helpCenterList',
      meta: {
        title: '帮助中心列表'
      }
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const nextRoute = ['user', 'product/detail'] // 需要登录的页面
  console.log('userId:',store.state.user.id)
  console.log('routerTo:',to)
  if (!store.state.user.id) {//完全没有赋值，请求后台接口判断登录信息
    api.GetUserInfo().then(response => {
      if (response.success) {
        store.dispatch('setALLInfo', response.jsonData)//用户信息
        store.dispatch('setShoppingCartCount', response.jsonData.itemCount)//购物车数量
      } else {
        store.dispatch('clearUserInfo')
      }
      next()
    })
    return
  }
  let isLogin = store.state.user.id == 'false' || store.state.user.id == '' ? false : true // 判断false是否登录，本地存储有用户数据则视为已经登录
  // 未登录状态删除登录的数据信息
  if (!isLogin) {

  }
  if (to.meta.title) {
    document.title = to.meta.title + '-亿钱贷'
  }
  //console.log(/^(\/user)|(\/product\/detail)/.test(to.path))
  if (/^(\/user)|(\/product\/comfirm)/.test(to.path)) {// 检测是否需要登录的页面
    if (!isLogin) { // 如果未登录（本地存储无用户数据），并且要跳到登录页面
      // window.location.href = '/secure/login'
      next('/account/login')
      return
    }
  }
  // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
  if (to.name === 'login' && isLogin) {
    //next('/user/center')
    next('/user/center')
    return
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router
