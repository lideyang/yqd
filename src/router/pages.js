/**
 * Created by lidy on 2019/4/28.
 */

export default {
  Home: r => require.ensure([], () => r(require('@/views/home/index/index')), 'home'),
  Login: r => require.ensure([], () => r(require('@/views/account/login/login.vue')), 'login'),
  wxLogin: r => require.ensure([], () => r(require('@/views/account/login/wx.vue')), 'wxLogin'),
  Center: r => require.ensure([], () => r(require('@/views/user/center')), 'center'),
  MyRepayment: r => require.ensure([], () => r(require('@/views/user/myRepayment/myRepayment.vue')), 'myRepayment'),
  MyRepaymentList: r => require.ensure([], () => r(require('@/views/user/myRepayment/list.vue')), 'myRepaymentList'),
  Recharge: r => require.ensure([], () => r(require('@/views/user/recharge')), 'recharge'),
  Setting: r => require.ensure([], () => r(require('@/views/user/setting')), 'setting'),
  Land: r => require.ensure([], () => r(require('@/views/account/land')), 'land'),
  RegSuccess: r => require.ensure([], () => r(require('@/views/account/regSuccess')), 'regSuccess'),
  RechargeRecord: r => require.ensure([], () => r(require('@/views/user/recharge/record')), 'rechargeRecord'),
  MyCoupons: r => require.ensure([], () => r(require('@/views/user/myCoupons')), 'myCoupons'),
  WithdrawRecord: r => require.ensure([], () => r(require('@/views/user/withdraw/record')), 'withdrawRecord'),
  WXBind: r => require.ensure([], () => r(require('@/views/user/wx/bind')), 'WXBind'),
  WXBindSuccess: r => require.ensure([], () => r(require('@/views/user/wx/bindSuccess')), 'WXBindSuccess'),
  May: r => require.ensure([], () => r(require('@/views/activity/may')), 'may'),
  PublishHome: r => require.ensure([], () => r(require('@/views/publish/index')), 'publishHome'),
  PublishHEGUI: r => require.ensure([], () => r(require('@/views/publish/hegui')), 'publishHEGUI'),
  CompanyProfile: r => require.ensure([], () => r(require('@/views/publish/companyProfile')), 'companyProfile'),
  Information: r => require.ensure([], () => r(require('@/views/publish/information')), 'information'),
  Organization: r => require.ensure([], () => r(require('@/views/publish/organization')), 'organization'),
  Team: r => require.ensure([], () => r(require('@/views/publish/team')), 'team'),
  Data: r => require.ensure([], () => r(require('@/views/publish/data')), 'data'),
  Report: r => require.ensure([], () => r(require('@/views/publish/report')), 'report'),
  Examine: r => require.ensure([], () => r(require('@/views/publish/examine')), 'examine'),
  Matters: r => require.ensure([], () => r(require('@/views/publish/matters')), 'matters'),
  Notice: r => require.ensure([], () => r(require('@/views/publish/notice')), 'notice'),
  Explanation: r => require.ensure([], () => r(require('@/views/publish/explanation')), 'explanation'),
  Education: r => require.ensure([], () => r(require('@/views/publish/education')), 'education'),
  ArticleDetail: r => require.ensure([], () => r(require('@/views/publish/articleDetail')), 'articleDetail'),
  Contact: r => require.ensure([], () => r(require('@/views/publish/contact')), 'contact'),
  Control: r => require.ensure([], () => r(require('@/views/publish/control')), 'control'),
  Risk: r => require.ensure([], () => r(require('@/views/publish/risk')), 'risk'),
  DepositoryInfo: r => require.ensure([], () => r(require('@/views/publish/depositoryInfo')), 'depositoryInfo'),
  IntroduceWN: r => require.ensure([], () => r(require('@/views/publish/product/wn')), 'introduceWN'),
  IntroduceQL: r => require.ensure([], () => r(require('@/views/publish/product/ql')), 'introduceQL'),
  IntroduceWH: r => require.ensure([], () => r(require('@/views/publish/product/wh')), 'introduceWH'),
  IntroduceLB: r => require.ensure([], () => r(require('@/views/publish/product/lb')), 'introduceLB'),
  IntroduceYC: r => require.ensure([], () => r(require('@/views/publish/product/yc')), 'introduceYC'),
  IntroduceWQ: r => require.ensure([], () => r(require('@/views/publish/product/wq')), 'introduceWQ'),
  IntroduceList: r => require.ensure([], () => r(require('@/views/publish/product/list')), 'introduceList'),
  WXBindHelp: r => require.ensure([], () => r(require('@/views/activity/wxBindHelp')), 'wxBindHelp'),
  Page404: r => require.ensure([], () => r(require('@/views/error/404')), 'page404'),
  ProductAuto: r => require.ensure([], () => r(require('@/views/product/auto')), 'productAuto'),
  ProductAutoConfirm: r => require.ensure([], () => r(require('@/views/product/autoConfirm')), 'productAutoConfirm'),
  ProductSingle: r => require.ensure([], () => r(require('@/views/product/single')), 'productSingle'),
  ProductTransfer: r => require.ensure([], () => r(require('@/views/product/transfer')), 'productTransfer'),
  ProductDetail: r => require.ensure([], () => r(require('@/views/product/detail')), 'productDetail'),
  ProductSingleConfirm: r => require.ensure([], () => r(require('@/views/product/singleConfirm')), 'productSingleConfirm'),
  ShoppingCart: r => require.ensure([], () => r(require('@/views/product/shoppingCart')), 'shoppingCart'),
  ShoppingCartSuccess: r => require.ensure([], () => r(require('@/views/product/shoppingCartSuccess')), 'shoppingCartSuccess'),
  June: r => require.ensure([], () => r(require('@/views/activity/june')), 'june'),
  JuneShare: r => require.ensure([], () => r(require('@/views/activity/juneShare')), 'juneShare'),
  JuneShareLand: r => require.ensure([], () => r(require('@/views/activity/juneShareLand')), 'juneShareLand'),
  JuneLikesResult: r => require.ensure([], () => r(require('@/views/activity/juneLikesResult')), 'juneLikesResult'),
  July: r => require.ensure([], () => r(require('@/views/activity/july')), 'july'),
  ProductSuccess: r => require.ensure([], () => r(require('@/views/product/success')), 'productSuccess'),
  ForgetPassword: r => require.ensure([], () => r(require('@/views/account/forget/password')), 'forgetPassword'),
  RecommendExplain: r => require.ensure([], () => r(require('@/views/recommend/explain')), 'recommendExplain'),
  RecommendInfo: r => require.ensure([], () => r(require('@/views/recommend/info')), 'recommendInfo'),
  RecommendRule: r => require.ensure([], () => r(require('@/views/recommend/rule')), 'recommendRule'),
  HelpCenter: r => require.ensure([], () => r(require('@/views/help/center')), 'helpCenter'),
  HelpCenterList: r => require.ensure([], () => r(require('@/views/help/list')), 'helpCenter'),
}
