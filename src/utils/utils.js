/**
 * Created by lidy on 2017/12/28.
 */
import dayjs from 'dayjs'

export const formatCurrency = (num, flag = true) => {//保留两位小数
  let argNum = arguments.length;
  if (num == null || num == 0) {
    return flag ? "0.00" : "0";
  }
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ','
      + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + (flag ? ('.' + cents) : ''));
}
export const formatBigMoney = value => {
  if (value) {
    let digit = value.toString().indexOf('.')
    if (digit > 7) {
      let num = value / 10000
      let numStr = num.toString().match(/^\d+(?:\.\d{0,2})?/)
      return formatCurrency(numStr) + '万'
    }
    return formatCurrency(value)
  }
  return value
}
export const formatDateToSecond = (time) => {
  console.log(time)
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
export const formatDateToDay = (time) => {
  return dayjs(time).format('YYYY-MM-DD')
}
//截取url参数
export const GetRequestParams = () => {
  let url = location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
//判断微信游览器
export const isWX = () => {
  let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true
  }
  return false
}
//万元转换
export const formatAmountUnit = (num) => {
  let money = Number(num);
  if (money > 9999) {
    return money / 10000 + "万"
  }
  return money
}
//转换json字符串
export const toJson = (str) => {
  return eval('(' + str + ')')
}
/*
 * 数组A的行数为2^n，代表n个物品共有2^n个子集，列数为n。即每一行的排列为一个背包实例
 * 数组couponLimit存放每个物品的具体重量
 * 数组couponValue存放每个物品的具体价值
 * maxWeight表示背包最大承重量
 */
export const bruteForce = (couponLimit, couponValue, maxLimit) => {
  let couponLength = couponLimit.length;
  let path = []; // 来记录树中的移动路径，为1的时候表示选择该数据，为0表示不选择
  let maxvalue = 0; // 背包的最大权重值
  let maxPath = [];

  function search(i) { // 表示递归深度
    if (i >= couponLength) {
      checkMax(); //检查最大值
    } else {
      path[i] = 0;
      search(i + 1);
      path[i] = 1;
      search(i + 1);
    }
  }

  function checkMax() {
    let weight = 0,
      value = 0;
    for (let i = 0; i < couponLength; i++) {
      if (path[i] == 1) {
        weight += couponLimit[i];
        value += couponValue[i];
      } else {
        path[i] == 0;
      }
    }
    if (weight <= maxLimit) { // 判断是否达到上限
      if (value >= maxvalue) {
        maxvalue = value;
        console.log('最大价值为' + maxvalue);
        console.log('所选物品（1为选中，0代表不选）：');
        console.log(path);
        Object.assign(maxPath, path)
      }
    }
  }

  search(0);
  return maxPath;
}

export const packageMaxValue = (weights, values, W) => {
  var n = weights.length;
  var f = new Array(n)
  f[-1] = new Array(W + 1).fill(0)
  var selected = [];
  for (var i = 0; i < n; i++) { //注意边界，没有等号
    f[i] = [] //创建当前的二维数组
    for (var j = 0; j <= W; j++) { //注意边界，有等号
      if (j < weights[i]) { //注意边界， 没有等号
        f[i][j] = f[i - 1][j]//case 1
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);//case 2
      }
    }
  }
  var j = W, w = 0
  for (var i = n - 1; i >= 0; i--) {
    if (f[i][j] > f[i - 1][j]) {
      selected[i] = 1;
      //console.log("物品",i,"其重量为", weights[i],"其价格为", values[i])
      j = j - weights[i];
      w += weights[i]
    } else {
      selected[i] = 0;
    }
  }
  //console.log("背包最大承重为",W," 现在重量为", w, " 总价值为", f[n-1][W])
  //console.log(selected)
  return {
    use: selected,
    value: f[n - 1][W],
    limit: w
  }
}

export const poundage = (amount, freeAmt, hasCashCount, withdrawlCount, singleCashFee) => {
  var amount = Number($("#amount").val());
  var freeAmt = Number("${(accountVo.freeAmt)!0}");
  var hasCashCount = Number('${hasCashCount!0}');
  var withdrawlCount = Number('${withdrawlCount!3}');
  var singleCashFee = Number('${singleCashFee!2}');
  //免费额度大于取现额度 免费
  if (freeAmt >= amount) {
    if (hasCashCount >= withdrawlCount) {
      $("#fee").html(singleCashFee + "元");
    } else {
      $("#fee").html("0.00" + "元");
    }
  } else {
    $("#fee").html(singleCashFee + "元");
  }
}

//根据投资金额和利率计算收益
export const calculateIncome = (amount, rate, currentLoanPeriod, currentLoanPeriodUnit, repayMode) => {
  var income = 0;
  if (currentLoanPeriodUnit == 0) {
    income = rate / 100 / 360 * amount * currentLoanPeriod;
  } else if (currentLoanPeriodUnit == 1) {
    //月利率
    var yln = rate / 100 / 12;
    if (repayMode == 0) {
      // 等额本息计算方式：应收利息、已还本金之和、代收本金、应还本金、应还利息、待收本金
      var yslxh = 0, totalYhbj = 0, dsbj = 0, yhbj = 0, interest_cur = 0, zhdhbj = amount;
      // 月还本息
      var yhbx = ((Math.pow(1 + yln, currentLoanPeriod) * yln * parseInt(amount)) / (Math.pow(1 + yln, currentLoanPeriod) - 1));
      for (var i = 1; i <= currentLoanPeriod; i++) {
        interest_cur = (amount - totalYhbj) * yln;
        yhbj = yhbx - interest_cur;
        totalYhbj = totalYhbj + yhbj;
        dsbj = amount - totalYhbj;
        if (i == (currentLoanPeriod - 1)) {
          zhdhbj = dsbj;
        }
        if (i == currentLoanPeriod) {
          yhbj = zhdhbj;
          interest_cur = yhbx - yhbj;
          totalYhbj = totalYhbj + yhbj;
          dsbj = 0;
        }
        income = income + interest_cur;
      }
    } else if (repayMode == 1) {
      //等额本金计算方式：月利率、应收本息、应收本金、应收利息、已收本金、应收本金总额
      var new_ysbx = 0, new_ysbj = 0, new_yslx = 0, new_sybj = 0, ysbjTotle = 0;
      new_ysbj = amount / currentLoanPeriod;
      for (var i = 1; i <= currentLoanPeriod; i++) {
        new_yslx = (amount - ysbjTotle) * yln;
        ysbjTotle = ysbjTotle + new_ysbj;
        new_ysbx = new_yslx + new_ysbj;
        new_sybj = amount - new_ysbj * i;
        income = income + new_yslx;
      }
    } else {
      income = yln * amount * currentLoanPeriod;
    }
  } else if (currentLoanPeriodUnit == 2) {
    income = rate / 100 * amount * currentLoanPeriod;
  }
  income = Math.floor(income * 100) / 100;
  return income;
}

export const doCountAvailableCoupon = (couponArr, productInfo, isAmt, isUse = false, isCurrent = false) => {
  let investAmt = productInfo.investAmt
  let loanPeriodUnit = productInfo.loanPeriodUnit
  let loanPeriod = productInfo.loanPeriod
  let loanId = productInfo.loanId
  return couponArr.filter(item => {
    if (isUse) {
      if (item.useId && item.useId !== loanId) {//如果选择并且不是当前标的的红包过滤
        return false
      }
    }
    if (isCurrent) {
      if (item.useId !== loanId) {
        return false
      }
    }
    if (isAmt) {
      if (investAmt < item.limitAmount) {//小于红包使用金额
        return false
      }
    }
    let investLimit = 0////标的期限
    if (item.period === -1) {//红包不限制
      investLimit = loanPeriodUnit === "0" ? loanPeriod : loanPeriod * 30
    } else {
      investLimit = item.period
    }
    if (investLimit < item.limitPeriods) {
      return false
    }
    if (item.maxPeriods && investLimit > item.maxPeriods) {
      return false
    }
    return true
  })
}
let timeout = null
export const debounce = (fn, delay) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, delay)
  return timeout
}


