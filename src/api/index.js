/**
 * Created by lidy on 2019/4/8.
 */
import axios from 'axios'
import {toast, loading, gotoLogin} from '../utils/tool'

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = '/';

console.log(process.env.NODE_ENV);

//POST传参序列化
axios.interceptors.request.use((config) => {
  loading(true);
  if (config.method === 'post' && config.data) {
    let ret = ''
    for (let it in config.data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
    }
    config.data = ret;
  }
  return config;
}, (error) => {
  loading(false);
  toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  // if (!res.data.success) {
  //   // _.toast(res.data.msg);
  //   return Promise.reject(res);
  // }
  console.log(res.request.responseURL)
  if (process.env.NODE_ENV === 'production') {
    if (res.request.responseURL.indexOf('/spa/account/login') > -1 || res.request.responseURL.indexOf('/sessionexpired') > -1) {
      //gotoLogin()//返回的是302跳转登录执行路由跳转
      //return false
    }
  }
  return res;
}, (error) => {
  toast("网络异常", 'fail');
  return Promise.reject(error);
});

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    if (params && params.test) {
      url = '/api' + url
    } else if (process.env.NODE_ENV === 'development') {
      url = '/test' + url
    }
    axios.post(url, params)
    .then(response => {
      loading(false)
      resolve(response.data);
    }, err => {
      if (process.env.NODE_ENV === 'production') {
        gotoLogin()//现在只能判断请求失败跳转登录
      }
      loading(false)
      reject(err);
    })
    .catch((error) => {
      loading(false)
      reject(error)
    })
  })
}

export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    if (params && params.test) {
      url = '/api' + url
    } else if (process.env.NODE_ENV === 'development') {
      url = '/test' + url
    }
    axios.get(url, {
      params: params
    }).then(response => {
      loading(false)
      resolve(response.data)
    }, err => {
      if (process.env.NODE_ENV === 'production') {
        gotoLogin()//现在只能判断请求失败跳转登录
      }
      loading(false)
      resolve(err)
    }).catch((error) => {
      loading(false)
      resolve(error)
    })
  })
}

export default {
  /**
   * 首页信息
   */
  GetHomeInfo() {
    return fetchPost('/index')
  },
  /**
   * 用户登录
   */
  Login(params) {
    return fetchPost('/secure/login/ajax', params)
  },
  // Login(params) {
  //   return fetchPost('/api/login', params)
  // },
  /**
   * 登出
   */
  Logout(params) {
    return fetchGet('/logexit', params)
  },
  /**
   * 获取当前用户数据
   */
  GetUserInfo(params) {
    return fetchGet('/member/session', params)
  },
  /**
   * 注册接口
   */
  Register(params) {
    return fetchPost('/secure/register/ajax', params)
  },
  /**
   * 注册获取短信验证码接口
   */
  GetRegisterCode(params) {
    return fetchPost('/secure/register/verify-code', params)
  },
  /**
   * 验证图形验证码是否正确
   */
  CheckPicCode(code) {
    return fetchPost('/secure/register/check-code', {code})
  },
  /**
   * 验证用户名是否注册
   */
  CheckUserName(account) {
    return fetchPost('/secure/register/check-account', account)
  },
  /**
   * 滑块验证
   */
  CheckSlideReg(params) {
    return fetchPost('/secure/land/sign', params)
  },
  /**
   * 获取用户中心数据
   */
  GetUserCenter(params) {
    return fetchPost('/member/account/index', params)
  },
  /**
   * 获取我的回款日历
   */
  GetMyRepayment(params) {
    return fetchGet('/member/invest/myCalendar', params)
  },
  /**
   * 获取我的回款列表
   */
  GetMyRepaymentList(params) {
    return fetchGet('/member/invest/calendar', params)
  },
  /**
   * 获取充值页面数据
   */
  RechargeInfo(params) {
    return fetchGet('/member/account/recharge/info', params)
  },
  /**
   * 提交充值
   */
  SubmitRecharge(params) {
    return fetchPost('/member/account/netsaveConfirm', params)
  },
  /**
   * 获取充值总金额
   */
  GetRechargeTotalAmount() {
    return fetchGet('/member/trade/rechargeAmtSum')
  },
  /**
   * 获取充值记录列表
   */
  GetRechargeRecord(params) {
    return fetchGet('/member/trade/recharge', params)
  },
  /**
   * 获取提现总金额
   */
  GetWithdrawTotalAmount() {
    return fetchGet('/member/trade/cashAmtSum')
  },
  /**
   * 获取提现记录列表
   */
  GetWithdrawRecord() {
    return fetchGet('/member/trade/cash')
  },
  /**
   * 取消提现
   */
  CancelWithdraw(params) {
    return fetchGet('/member/account/cashCancel', params)
  },
  /**
   * 取消存管授权
   */
  GetSettingInfo() {
    return fetchPost('/api/setting')
  },
  /**
   * 获取账户设置页面信息
   */
  SetCancelAuto(params) {
    return fetchGet('/api/cancel', params)
  },
  /**
   * 获取优惠券数据
   */
  GetCouponTicketList(params) {
    return fetchGet('/member/invest/getCouponTicketList', params)
  },
  /**
   * 获取推荐人姓名
   */
  GetRecommendRealName(code) {
    return fetchGet('/secure/land/getRealName', {code})
  },
  /**
   * 获取加密登录密码偏移量
   */
  GetPwdEncryptionCode() {
    return fetchGet('/secure/login/info')
  },
  /**
   * 获取出借人教育列表
   */
  GetEducationList(params) {
    return fetchPost('/article/law/ajList', params)
  },
  /**
   * 获取新闻公告列表
   */
  GetNoticeList(params) {
    return fetchPost('/article/notice/ajList', params)
  },
  /**
   * 获取出借人教育列表
   */
  GetArticleDetail(params) {
    return fetchGet(`/article/api/${params.type}/${params.uid}`)
  },
  /**
   * 获取运营报告列表
   */
  GetReportList(params) {
    return fetchPost(`/article/report/ajList`, params)
  },
  /**
   * 获取五月活动信息
   */
  GetMayInfo() {
    return fetchGet('/event/2019/may')
  },
  /**
   * 获取五月活动奖励券
   */
  GetMayReward(ruleId) {
    return fetchGet('/event/dec/award', {
      ruleId: ruleId
    })
  },
  /**
   * 提交五月活动翻倍
   */
  MayDouble() {
    return fetchGet('/event/2019/mayAward')
  },
  /**
   * 获取六月活动信息
   */
  GetJuneInfo(params) {
    return fetchGet('/event/2019/june', params)
  },
  /**
   * 获取六月活动奖励券
   */
  GetJuneReward(ruleId) {
    return fetchGet('/event/dec/award', {
      ruleId: ruleId
    })
  },
  /**
   * 六月抽奖接口
   */
  GetJuneLuck() {
    return fetchGet('/event/2019/juneAward')
  },
  /**
   * 六月我的财运卡记录
   */
  GetJuneMyFortunesCard(parmas) {
    return fetchGet('/event/2019/myCardList', parmas)
  },
  /**
   * 六月中奖财运卡记录
   */
  GetJuneFortunesInfo(parmas) {
    return fetchGet('/event/2019/winCardList', parmas)
  },
  /**
   * 六月中奖财运卡详情
   */
  GetJuneFortunesCardDetail(parmas) {
    return fetchGet('/event/2019/cardDetail', parmas)
  },
  /**
   * 六月中奖我的分享详情
   */
  GetJuneLikesList(parmas) {
    return fetchGet('/event/2019/myJuneLikes', parmas)
  },
  /**
   * 六月中奖我的分享点赞页面分享数据
   */
  GetJuneShareLikesList(parmas) {
    return fetchGet('/event/2019/likes', parmas)
  },
  /**
   * 六月中奖我的分享点赞页面分享结果
   */
  GetJuneShareLikesResult(parmas) {
    return fetchGet('/event/2019/likesResult', parmas)
  },
  /**
   * 获取六月抽奖记录
   */
  GetJuneLuckInfo(params) {
    return fetchGet('/event/2019/juneRecod', params)
  },
  /**
   * 获取七月活动信息
   */
  GetJulyInfo(params) {
    return fetchGet('/event/2019/july', params)
  },
  /**
   * 获取七月抽奖记录
   */
  GetJulyLuckInfo(params) {
    return fetchGet('/event/2019/julyRecod', params)
  },
  /**
   * 七月抽奖接口
   */
  GetJulyLuck() {
    return fetchGet('/event/2019/julyAward')
  },
  /**
   * 获取易智投列表
   */
  GetProductAutoList(params) {
    return fetchPost('/product/auto', params)
  },
  /**
   * 跳转认购易智投
   */
  SubmitProductAuto(params) {
    return fetchPost('/plan/hplan-check', params)
  },
  /**
   * 获取认购易智投
   */
  GetProductAutoConfirm(params) {
    return fetchPost('/plan/autoConfirmInfo', params)
  },
  /**
   * 认购易智投
   */
  SubmitProductAutoConfirm(params) {
    return fetchPost('/plan/hplan-join', params)
  },
  /**
   * 获取散标列表
   */
  GetProductSingleList(params) {
    return fetchPost('/product/list', params)
  },
  /**
   * 获取散标认购数据
   */
  GetProductSingleConfirm(params) {
    return fetchGet('/product/single/confirmInfo', params)
  },
  /**
   * 获取散标认购数据
   */
  SubmitProductSingleConfirm(params) {
    return fetchPost('/product/invest/confirm', params)
  },
  /**
   * 获取债权转让列表
   */
  GetProductTransferList(params) {
    return fetchPost('/transfer/list', params)
  },
  /**
   * 获取项目详情数据
   */
  GetProductDetailInfo(id) {
    return fetchGet('/product/getDetailInfo/' + id)
  },
  /**
   * 获取项目出借记录数据
   */
  GetProductRecordList(params) {
    return fetchPost('/product/invest/record/' + params.id, params)
  },
  /**
   * 获取微信分享公众号openid
   */
  GetWXToken(params) {
    return fetchPost('/wx/share/token', params)
  },
  /**
   * 获取购物车列表
   */
  GetShoppingCartList(params) {
    return fetchGet('/product/buyCart/list', params)
  },
  /**
   * 删除购物车
   */
  DeleteShoppingCart(params) {
    return fetchPost('/product/buyCart/delete', params)
  },
  /**
   * 新增购物车
   */
  AddShoppingCart(params) {
    return fetchPost('/product/buyCart/add', params)
  },
  /**
   * 购物车认购
   */
  shoppingCartInvest(params) {
    return fetchPost('/product/buyCart/invest', params)
  },
  /**
   * 出借成功页数据
   */
  ProductSuccessInfo(params) {
    return fetchPost('/product/invest/success', params)
  },
  /**
   * 重置登录密码发送验证码
   */
  ForgetPwdSendCode(params) {
    return fetchPost('/secure/findPwd/verifyCode', params)
  },
  /**
   * 重置登录密码
   */
  ForgetPwd(params) {
    return fetchPost('/secure/findPwd/checkVerify', params)
  },
  /**
   * 获取推荐页面数据
   */
  GetRecommendInfo(token) {
    return fetchPost('/member/recom/list?token=' + token)
  },
  /**
   * 获取推荐页面我的奖励数据
   */
  GetRecommendMyReward(params) {
    return fetchPost('/member/recom/awardRecord', params)
  },
  /**
   * 获取推荐页面我的邀请好友数据
   */
  GetRecommendFriend(params) {
    return fetchPost('/member/recom/recommendRecord', params)
  },
  /**
   * 获取帮助中心
   */
  GetHelpCenterList(params) {
    return fetchPost('/help/index', params)
  },
  /**
   * 获取帮助中心类型列表
   */
  GetHelpCenterTypeList(typeId) {
    return fetchPost(`/help/question/${typeId}`)
  },
  /**
   * 获取帮助中心搜索数据
   */
  GetHelpCenterQuery(params) {
    return fetchPost('/help/question/search', params)
  },
}
