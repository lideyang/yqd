<template>
  <div class="coupon-list-dimmer-layer">
    <div class="coupon-list-layer">
      <div class="top am-text-center">
        <div @click="onClickCloseLayer" class="close-icon am-fl"><i
          class="icon-font icon-prev am-fl"></i></div>
        选择优惠券
      </div>
      <div class="content">
        <div class="no-use am-cf" @click="onCheckNoUseCouponBtn(productInfo.loanId)">
          不使用优惠券
          <div class="am-fr">
            <i v-if="noUseCouponBtn" class="am-text-secondary my-checkbox checked icon-font icon-right"></i>
            <i v-else class="my-checkbox"></i>
          </div>
        </div>
        <ul ref="myCouponsList" v-cloak>
          <li v-for="item in currentVoucher" @click="onClickChooseCoupon(item)"
              :class="{gray:productInfo.investAmt<item.limitAmount}">
            <div class="am-g invest">
              <div class="am-u-sm-3 am-text-center icon">
                <span class="am-text-danger am-text-nowrap num">￥{{item.awardAmount}}</span>
                <i class="icon-red"></i>
              </div>
              <div class="am-u-sm-9 info">
                <p class="title require">
                  {{item.limitPeriodStr}}
                  <span class="am-fr">
                    <i v-if="item.useId&&productInfo.loanId==item.useId"
                       class="am-text-secondary my-checkbox checked icon-font icon-right"></i>
                    <i v-else class="my-checkbox"></i>
                  </span>
                </p>
                <p class="am-text-default am-text-sm tips">{{item.limitPeriodRemarkStr}}<br>{{item.actName}}</p>
              </div>
            </div>
            <div class="am-g day">
              <div class="am-u-sm-9 am-u-sm-offset-3">
                <p class="am-text-muted am-text-sm">有效期至：{{item.deadTimeYMDStr}}</p>
              </div>
            </div>
          </li>
          <li v-for="item in currentTicket" @click="onClickChooseCoupon(item)"
              :class="{gray:productInfo.investAmt<item.limitAmount}">
            <div class="am-g invest">
              <div class="am-u-sm-3 am-text-center icon icon-jiaxi">
                <i class="icon-red">
                  <span class="am-text-danger am-text-nowrap num">{{item.awardAmount}}%</span>
                </i>
              </div>
              <div class="am-u-sm-9 info">
                <p class="title require">
                  {{item.limitPeriodStr}}
                  <span class="am-fr">
                    <i v-if="item.useId&&productInfo.loanId==item.useId"
                       class="am-text-secondary my-checkbox checked icon-font icon-right"></i>
                    <i v-else class="my-checkbox"></i>
                  </span>
                </p>
                <p class="am-text-default am-text-sm">{{item.limitPeriodRemarkStr}}<br>{{item.actName}}</p>
              </div>
            </div>
            <div class="am-g day">
              <div class="am-u-sm-9 am-u-sm-offset-3">
                <p class="am-text-muted am-text-sm">有效期至：{{item.deadTimeYMDStr}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    doCountAvailableCoupon
  } from '@/utils/utils'

  export default {
    name: "couponList",
    props: {
      productInfo: {
        default: {},
        type: Object
      },
      voucherList: {
        default: ()=>[],
        type: Array
      },
      ticketList:{
        default: ()=>[],
        type: Array
      }
    },
    data() {
      return {
        currentVoucher: [],
        currentTicket: []
      }
    },
    watch: {
      productInfo: {
        handler(currentItem) {
          console.log('currentItem', currentItem)
          if (Object.keys(currentItem).length) {
            this.currentVoucher = doCountAvailableCoupon(this.voucherList, this.productInfo, false, true)
            this.currentTicket = doCountAvailableCoupon(this.ticketList, this.productInfo, false, true)
            console.log(this.currentVoucher)
          }
        },
        deep: true
      },
    },
    computed: {
      noUseCouponBtn() {
        return !(this.currentVoucher.some(item => item.useId) || this.currentTicket.some(item => item.useId))
      }
    },
    methods: {
      onCheckNoUseCouponBtn() {
        if (!this.noUseCouponBtn) {
          this.$emit('onCancelAllChoose')
        }
      },
      onClickChooseCoupon(coupon) {
        if(this.productInfo.investAmt>=coupon.limitAmount){
          this.$emit('changeCoupon',coupon)
        }
      },
      doCountAvailableCoupon(couponArr) {
        console.log(couponArr)
        return doCountAvailableCoupon(couponArr, this.productInfo, false, true)
      },
      onClickCloseLayer(loanId) {
        this.$emit('onCloseLayer')
      }
    }
  }
</script>

<style lang="less">
  .coupon-list-dimmer-layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 999;

    .coupon-list-layer {
      position: absolute;
      bottom: 0;
      max-height: 5rem;
      width: 100%;
      z-index: 9999;
      background-color: #fff;
      border-radius: 16px 16px 0 0;

      .top {
        position: relative;
        padding: .15rem .1rem;
        font-size: 20px;

        .close-icon {
          position: absolute;
          left: 0;
          top: 0;
          padding: .2rem;
        }
      }

      .content {
        background-color: #ececec;
        padding: .15rem;
        overflow-y: auto;
        max-height: 4rem;

        .my-checkbox {
          border-radius: 50%;
          border: 1px solid #ccc;
          line-height: 1;
          display: block;
          width: .18rem;
          height: .18rem;
        }

        .checked {
          font-size: .18rem;
          border: none;
        }

        .no-use {
          padding: .15rem;
          margin: 0 0 .15rem;
          border-radius: 6px;
          background-color: #fff;
        }

        ul {
          li {
            position: relative;
            margin: 0 0 .1rem;
            background-color: #fff;
            box-shadow: 0 0 10px 0 rgba(46, 64, 169, 0.10);
            border-radius: 8px;

            &:last-child {
              margin-bottom: 0;
            }

            &.gray {
              div.invest {
                div.icon {
                  .icon-red {
                    background-image: url(../assets/icon/red_grey2.png);
                  }

                  &.icon-jiaxi {
                    .icon-red {
                      background-image: url(../assets/icon/coupon_grey2.png);
                    }
                  }

                  .num {
                    color: #999;
                  }
                }

                div.info {
                  p.require {
                    color: red;
                  }

                  p.title {
                    color: #999;
                  }
                }
              }
            }

            &.active {
              div.invest {
                .choose {
                  .icon-font {
                    color: #c49644;
                  }
                }
              }
            }

            div.invest {
              div.icon {
                position: relative;
                padding: .2rem .12rem 0;
                height: .9rem;

                .num {
                  font-size: 25px;
                  margin: .05rem 0 0;
                  display: block;
                  font-weight: bold;
                }

                .icon-red {
                  position: absolute;
                  display: block;
                  background: url(../assets/icon/red_icon2.png) no-repeat center bottom;
                  background-size: contain;
                  height: .47rem;
                  width: .61rem;
                  left: .2rem;
                  bottom: -.28rem;
                }

                &.icon-jiaxi {
                  .icon-red {
                    position: absolute;
                    display: block;
                    background: url(../assets/icon/icon_coupon2.png) no-repeat 0 center;
                    background-size: contain;
                    height: .39rem;
                    width: .64rem;
                    left: .2rem;
                    bottom: .2rem;
                    font-style: normal;
                    text-align: center;

                    .num {
                      font-size: 20px;
                    }
                  }
                }

                img {
                  max-width: 0.62rem;
                }
              }

              div.info {
                padding: .2rem .12rem .08rem;
                height: .9rem;

                p {
                  margin: 0 0 .05rem;
                  line-height: 1.4;

                  &.title {
                    color: #555;
                    margin: 0 0 .05rem;
                    font-weight: bold;
                  }

                  &.tips {
                    font-size: 13px;
                    color: #777;
                  }
                }
              }

              .choose {
                padding: .28rem 0;
              }
            }

            .day {
              background-color: #f9f9f9;

              line-height: .28rem;

              p {
                padding: 0 .12rem;
                margin: 0;
              }
            }

            .use-icon {
              position: absolute;
              right: 0.15rem;
              top: .15rem;
              width: 0.75rem;
            }
          }
        }
      }
    }
  }
</style>
