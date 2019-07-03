<template>
  <div class="activity-june-layer">
    <div class="banner">
      <img src="@/assets/active/june/banner.jpg"/>
      <p>活动时间：6月1日-6月30日</p>
    </div>
    <div class="title">奖励券天天领</div>
    <p class="am-text-center tips">待收本金满1000元可领</p>
    <ul class="cart-layer" v-if="list.length">
      <li>
        <div class="am-g boxer">
          <div class="am-u-sm-6" v-if="list[0]" @click="onClickReceive(list[0])">
            <div class="cart">
              <div class="num">{{list[0].awardAmount}}<span>%</span></div>
              <a class="btn" :class="count===5?'btn-disabled':'btn-link'">{{listBtnText}}</a>
            </div>
            <p>{{list[0].limit}}</p>
          </div>
          <div class="am-u-sm-6" v-if="list[1]" @click="onClickReceive(list[1])">
            <div class="cart">
              <div class="num">{{list[1].awardAmount}}<span>%</span></div>
              <a class="btn" :class="count===5?'btn-disabled':'btn-link'">{{listBtnText}}</a>
            </div>
            <p>{{list[1].limit}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="am-g boxer">
          <div class="am-u-sm-6" v-if="list[2]" @click="onClickReceive(list[2])">
            <div class="cart">
              <div class="num">{{list[2].awardAmount}}<span>%</span></div>
              <a class="btn" :class="count===5?'btn-disabled':'btn-link'">{{listBtnText}}</a>
            </div>
            <p>{{list[2].limit}}</p>
          </div>
          <div class="am-u-sm-6" v-if="list[3]" @click="onClickReceive(list[3])">
            <div class="cart">
              <div class="num">{{list[3].awardAmount}}<span>%</span></div>
              <a class="btn" :class="count===5?'btn-disabled':'btn-link'">{{listBtnText}}</a>
            </div>
            <p>{{list[3].limit}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="title">时来运转</div>
    <p class="am-text-center tips">单笔出借满2000获得一次抽奖机会</p>
    <div class="luck-layer">
      <div class="boxer">
        <div class="dropdown">
          <luck-roller :start="step1.status" :index="step1.index" :list="luckList" class="roller step1"></luck-roller>
          <luck-roller :start="step2.status" :index="step2.index" :list="luckList" class="roller step2"></luck-roller>
          <luck-roller :start="step3.status" :index="step3.index" :list="luckList" class="roller step3"></luck-roller>
        </div>
        <div class="start-btn" @click="onClickStart"></div>
        <p class="luck-info am-text-center">
          <span v-if="isLogin">您已经抽奖{{luckedCount}}次，剩余{{luckCount}}次机会</span>
          <!--<span v-else @click="doLinkLoginURL">请先登录</span>-->
          <a class="am-fr" @click="onClickLuckInfoModalHandle">中奖记录></a>
        </p>
      </div>
    </div>
    <div v-if="myFortunesList.length" class="title">我的财运卡</div>
    <div v-if="myFortunesList.length" class="cy-layer am-text-center">
      <p class="tips">
        财运卡的4位数字码以及当日收盘上证指数后4位相减的绝对值最大和最小者中奖
      </p>
      <ul class="am-cf cy-list">
        <li
          :class="{status0:item.awardStatus=='0',status1:item.awardStatus=='1'||item.awardStatus=='3',status2:item.awardStatus=='2',active:item.isTurn}"
          v-for="item in myFortunesList"
        >
          <div class="card-layer" :style="{transform:item.isTurn?'rotateY(-180deg)':'rotateY(0deg)'}">
            <div class="info">
              <div class="status">{{item.awardStatus|awardStatusFilter}}</div>
              <strong class="num">{{item.cardNo}}</strong>
              <p v-if="item.drawNoMin">中奖值:{{item.drawNoMin}}/{{item.drawNoMax}}</p>
              <p v-else>中奖值:--</p>
            </div>
            <div class="share" @click="onClickShareBtnHandle">
              分享有奖
            </div>
            <div class="time">
              {{item.createTime|formatDateToDay}}
              <v-popover v-if="item.awardNo">
                <i v-tooltip class="icon-font icon-wenhao"></i>
                <template slot="popover">
                  当日收盘上证指数后四位：{{item.awardNo}}
                </template>
              </v-popover>
            </div>
          </div>
          <div class="card-layer card-layer2" :style="{transform:!item.isTurn?'rotateY(-180deg)':'rotateY(0deg)'}">
            <template>
              <div class="info">
                <p v-if="item.awardStatus=='1'||item.awardStatus=='3'"
                   class="money">单日年化出借金额:{{item.detail.investAmt}}</p>
                <p v-if="item.awardStatus=='1'||item.awardStatus=='3'" class="money">已收返现金额:<span
                  class="am-text-danger">{{item.detail.awardAmt}}</span></p>
                <p class="tips">
                  财运数:{{item.detail.recomCount}}个 注册数:{{item.detail.recomCount}}个
                </p>
                <strong class="am-text-danger">分享奖励:{{item.detail.recomCount}}元</strong>
              </div>
              <div class="share" @click="onClickShareBtnHandle">
                分享有奖
              </div>
              <div class="time">
                {{item.createTime|formatDateToDay}}
                <v-popover v-if="item.awardNo">
                  <i v-tooltip class="icon-font icon-wenhao"></i>
                  <template slot="popover">
                    当日收盘上证指数后四位：{{item.awardNo}}
                  </template>
                </v-popover>
              </div>
            </template>
          </div>
          <div @click="onClickFortunesCardHandle(item)" class="more" v-if="item.awardStatus!='0'">
            <p>{{item.isTurn?'返回':'查看更多'}}</p>
          </div>
        </li>
      </ul>
      <div v-if="myFortunesTotalPages>1" class="pagination am-text-center">
        <img @click="onClickFortunesPrevHandle" class="prev" src="@/assets/active/june/prev.png"/>
        <img @click="onClickFortunesNextHandle" class="prev" src="@/assets/active/june/next.png"/>
        <!--<a @click="onClickMyFortunesModalHandle">财运卡中奖记录></a>-->
      </div>
      <roll-screen v-if="myFortunesRecordList.length" :contentArr="myFortunesRecordList"
                   @onDetail="onShowFortunesDetail">
      </roll-screen>
    </div>
    <div class="title">活动规则</div>
    <div class="opt">
      <p>抽奖机会获得：单笔出借满2000获得1次（债权转让除外），例：单笔出借满10000，可获得5次（若使用购物车出借，则仅单个项目满2000计算抽奖次数，不以购物车多个项目的累计金额计算抽奖次数）</p>
      <p>奖品发放：现金、红包实时发放</p>
      <h3>财运卡说明：</h3>
      <p>1、财运卡为带有4位随机数字码的卡片，仅在国内股市交易日0点-14:30可抽出财运卡</p>
      <p>
        2、当日抽取的财运卡与当日收盘上证指数后四位（含小数位）相减，绝对值最小和最大的获得一次返现机会，若绝对值一样，则先抽取的财运卡中奖。
        <br/>
        例：6月4日上证指数收盘为2862.28，抽到一张财运卡数字码为6230，则用6230减去6228，取绝对值，若绝对值最小和最大者中奖。
      </p>
      <p>3、中奖财运卡的返现比例为当日（0点-24点）出借金额年化的2%，最低获得88元（即根据出借计算的返现低于88时，也可获得88元）。</p>
      <p>4、财运卡中奖后为了获得更高的返现，可在24点前追加出借。</p>
      <p>5、一张财运卡只能参与一次上证指数抽奖（限当天）。</p>
      <p>6、奖励发放：中奖的财运卡返现奖励于中奖第二日发放至平台账户。</p>
      <h3>财运卡分享说明：</h3>
      <p>1、可将财运卡转发给好友，完成5个好友页面点赞且推荐1个好友注册，可获得5元现金奖励，奖励可累计，即：若有10个好友点赞且2个好友注册，可获得10元现金，可获得的奖励金额≤财运卡张数*5元，奖励满足条件后即时发放。</p>
      <p>2、通过财运卡注册，自动建立推荐关系，享受推荐奖励。</p>
      <p>3、每个微信号只能为一个好友点赞。</p>
    </div>
    <am-modal class="activity-may-tips-modal2 am-text-center" @visible-change="onChangeModal2Visible"
              :isShow="isShowModal2" :closeBtn="false" :width="2.6" :height="2.86" cssUnit="rem">
      <am-modal-body>
        <p>您今日已经领取了<strong class="am-text-danger">{{count}}</strong>张</p>
        <p class="tips">还可以领取<strong class="am-text-danger">{{5-count}}</strong>张</p>
        <a @click.prevent="isShowModal2=false">好的</a>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal am-text-center" @visible-change="onChangeModalVisible"
              :isShow="isShowModal" :closeBtn="false" :width="2.6" :height="2.96" cssUnit="rem">
      <am-modal-body>
        <p class="am-text-center title">
          <img src="/src/assets/active/june/reward_title.png">
        </p>
        <p class="am-text-center type">
          <span v-if="awardType==3">{{awardAmt}}%</span>
          <img :src="luckList[currentReWardIndex]">
        </p>
        <p class="tips">恭喜您，获得{{awardAmt}}{{awardTypeText}}</p>
        <a @click.prevent="isShowModal=false">继续抽奖</a>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal4 am-text-center" @visible-change="onChangeModal4Visible"
              :isShow="isShowModal4" :closeBtn="false" :width="2.6" :height="3.11" cssUnit="rem">
      <am-modal-body>
        <p class="tips">{{noLuckTipsText}}</p>
        <a @click.prevent="isShowModal4=false">继续抽奖</a>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal4 activity-may-tips-modal5 am-text-center"
              @visible-change="onChangeModal5Visible"
              :isShow="isShowModal5" :closeBtn="false" :width="2.6" :height="3.11" cssUnit="rem">
      <am-modal-body>
        <p class="tips">{{noLuckTipsText}}</p>
        <div class="am-text-danger am-text-center no-luck-tips">
          <p>单笔出借每满2,000元可获得一次机会,</p>
          <p>例:单笔出借满20,000元,可获得10次机会</p>
        </div>
        <a @click.prevent="onProductListHandle">立即出借</a>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal3 am-text-center" @visible-change="onChangeModal3Visible"
              :isShow="isShowModal3" :closeBtn="true" :width="3.3" cssUnit="rem">
      <am-modal-body>
        <div class="title">
          中奖记录
        </div>
        <div class="record-list">
          <table class="am-table am-table-bordered">
            <thead>
            <tr>
              <td>奖品类型</td>
              <td>奖品金额</td>
              <td>发放状态</td>
              <td>获得时间</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in luckRecordList">
              <td>{{item.awardType|awardTypeFilter}}</td>
              <td>{{item.awardStatus=='1'&&item.awardType=='7'?'待确认':item.awardAmt}}{{item.awardStatus=='1'&&item.awardType=='7'?'':item.awardType=='3'?'%':'元'}}</td>
              <td>{{item.awardStatus=='1'&&item.awardType=='7'?'待发放':'已发放'}}</td>
              <td>{{item.createTime|formatDateToDay}}</td>
            </tr>
            </tbody>
          </table>
          <am-pagination v-if="luckRecordList.length" align="center" :total="luckRecodePageTotal"
                         v-model="luckRecodePageNum" :show-page-btn-count="3"></am-pagination>
        </div>
      </am-modal-body>
    </am-modal>
    <am-modal class="activity-may-tips-modal3 am-text-center" @visible-change="onChangeModal6Visible"
              :isShow="isShowModal6" :closeBtn="true" :width="3.3" cssUnit="rem">
      <am-modal-body>
        <div class="title">
          财运卡中奖记录
        </div>
        <div class="record-list">
          <table class="am-table am-table-bordered">
            <thead>
            <tr>
              <td>用户名</td>
              <td>数字码</td>
              <td>中奖值</td>
              <td>奖励金额(元)</td>
              <td>获得时间</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in myFortunesRecordList">
              <td>{{item.fuzzyUsername}}</td>
              <td>{{item.cardNo}}</td>
              <td>{{item.myAwardNo}}</td>
              <td>{{item.awardStatus=='1'?'待确认':item.awardAmt}}</td>
              <td>{{item.createTime|formatDateToDay}}</td>
            </tr>
            </tbody>
          </table>
          <am-pagination v-if="myFortunesRecordList.length>10" align="center" :total="myFortunesRecodePageTotal"
                         v-model="myFortunesRecodePageNum" :show-page-btn-count="3"></am-pagination>
        </div>
      </am-modal-body>
    </am-modal>
    <am-confirm :is-show.sync="confirmVisible" @confirm="onProductListHandle">
      <h4>今日领取奖励券已达到上限，去出借赚取收益吧。</h4>
    </am-confirm>
  </div>
</template>

<script>
  import luckRoller from '@components/activity/luckRoller'
  import rollScreen from '@components/rollScreen'
  import {toJson, formatDateToDay} from '@/utils/utils'
  import {setViewport} from '@/utils/tool'
  import {Confirm} from "@components/amaze/components/confirm"
  import {Pagination} from "@components/amaze/components/pagination"
  import api from '@api'

  export default {
    name: "june",
    components: {
      luckRoller,
      rollScreen,
      'am-confirm': Confirm,
      'am-pagination': Pagination
    },
    data() {
      return {
        list: [],
        count: 0,
        code: '',
        token: this.$route.query.token || '',
        isShowModal: false,
        isShowModal2: false,
        isShowModal3: false,
        isShowModal4: false,
        isShowModal5: false,
        isShowModal6: false,
        confirmVisible: false,
        isLogin: false,
        luckCount: 0,
        luckedCount: 0,
        awardAmt: 0,
        awardType: 2,
        luckCode: "0",
        luckRecodePageNum: 1,
        luckRecodePageTotal: 1,
        step1: {
          status: false,
          index: -1
        },
        step2: {
          status: false,
          index: -1
        },
        step3: {
          status: false,
          index: -1
        },
        currentReWardIndex: 0,
        luckList: [require('@/assets/active/june/black.png'), require('@/assets/active/june/clover.png')
          , require('@/assets/active/june/coins.png'), require('@/assets/active/june/Dimond.png'), require('@/assets/active/june/heart.png'), require('@/assets/active/june/redpacket.png'), require('@/assets/active/june/lucky.png'), require('@/assets/active/june/card.png')
          , require('@/assets/active/june/cat.png'), require('@/assets/active/june/money.png'), require('@/assets/active/june/jxq.png')
        ],
        luckRecordList: [],
        myFortunesList: [],
        myFortunesRecordList: [],
        myFortunesRecodePageNum: 1,
        myFortunesTotalPages: 0,
        myFortunesCurrentPage: 1,
        myFortunesRecodePageTotal: 1
      }
    },
    filters: {
      formatDateToDay,
      awardTypeFilter(awardType) {
        let awardTypeInt = parseInt(awardType)
        switch (awardTypeInt) {
          case 2:
            return "红包"
          case 4:
            return "现金"
          case 3:
            return "奖励券"
          case 7:
            return "财运卡"
        }
      },
      awardStatusFilter(awardStatus) {
        let awardStatusInt = parseInt(awardStatus)
        switch (awardStatusInt) {
          case 0:
            return "待开奖"
          case 1:
            return "已中奖"
          case 2:
            return "未中奖"
          case 3:
            return "已发放"
        }
      }
    },
    watch: {
      luckRecodePageNum(value) {
        api.GetJuneLuckInfo({
          pageNo: value,
          pageSize: 10
        }).then(response => {
          if (response.success) {
            this.luckRecordList = response.data.recod
            this.luckRecodePageTotal = response.data.page.totalCount
            this.myFortunesCurrentPage = response.data.page.pageNo
            this.isShowModal3 = true
          } else {
            this.$notify({
              message: response.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    computed: {
      listBtnText() {
        return this.count == 5 ? '明日再来' : '点击领取'
      },
      awardTypeText() {
        switch (this.awardType) {
          case 2:
            return "元红包"
          case 4:
            return "元现金"
          case 3:
            return "%奖励券"
          case 7:
            return "财运卡"
        }
      },
      noLuckTipsText() {
        switch (this.luckCode) {
          case "0":
            return "您暂无抽奖机会哦"
          case "2":
            return "未抽到奖品，再接再厉"
        }
      }
    },
    created() {
      api.GetJuneInfo({
        token: this.token
      }).then(response => {
        let data = toJson(response)
        console.log(data)
        this.count = data.count
        this.list = data.rules
        console.log(this.list)
        if (data.drawCount === undefined) {
          this.isLogin = false
        } else {
          this.luckCount = data.remainderCount
          this.luckedCount = data.drawCount
          this.code = data.code
          this.realName = data.realName
          this.isLogin = true
        }
      })
      this.doGetMyFortunesList(1)//获取财运卡数据
      api.GetJuneFortunesInfo({
        pageNo: 1,
        pageSize: 10,
        token: this.token
      }).then(response => {
        if (response.success) {
          this.myFortunesRecordList = response.data.record
          this.myFortunesRecodePageTotal = response.data.page.totalCount
        } else {
          this.$notify({
            message: response.msg,
            type: 'warning'
          });
        }
      })
    },
    mounted() {
      //this.isShowModal5 = true
    },
    methods: {
      onClickStart() {
        if (this.isLogin) {
          api.GetJuneLuck().then(response => {
            this.luckCode = response.code
            if (response.code == "0000" || response.code == "2") {
              this.step1.status = true
              this.step2.status = true
              this.step3.status = true
              if (response.code == "0000") {
                if (response.data.awardType == "2") {
                  this.currentReWardIndex = 5
                } else if (response.data.awardType == "4") {
                  this.currentReWardIndex = 9
                } else if (response.data.awardType == "3") {
                  this.currentReWardIndex = 10
                } else {
                  this.doGetMyFortunesList(1)
                  this.myFortunesCurrentPage = 1
                  this.currentReWardIndex = 6
                }
                setTimeout(() => {
                  this.step1.status = false
                  this.step1.index = this.currentReWardIndex
                }, 1000)
                setTimeout(() => {
                  this.step2.status = false
                  this.step2.index = this.currentReWardIndex
                }, 1500)
                setTimeout(() => {
                  this.step3.status = false
                  this.step3.index = this.currentReWardIndex
                }, 2000)
                setTimeout(() => {
                  this.awardAmt = response.data.awardAmt
                  this.awardType = parseInt(response.data.awardType)
                  this.isShowModal = true
                }, 2500)
              } else {
                setTimeout(() => {
                  this.step1.status = false
                  this.step1.index = this.doRandomIndex()
                }, 1000)
                setTimeout(() => {
                  this.step2.status = false
                  this.step2.index = this.doRandomIndex()
                }, 1500)
                setTimeout(() => {
                  this.step3.status = false
                  if (this.step1.index === this.step2.index) {
                    let currentIndex = this.step1.index
                    let randomIndex = this.doRandomIndex()
                    while (currentIndex === randomIndex) {
                      randomIndex = this.doRandomIndex()
                    }
                    this.step3.index = randomIndex
                  } else {
                    this.step3.index = this.doRandomIndex()
                  }
                }, 2000)
                setTimeout(() => {
                  this.isShowModal4 = true
                }, 2500)
              }
              this.luckedCount = this.luckedCount + 1
              this.luckCount = this.luckCount - 1
            } else {
              if (response.code == "0") {
                this.isShowModal5 = true
              } else {
                this.$notify({
                  message: response.msg,
                  type: 'warning'
                });
              }
            }
          })
        } else {
          this.doLinkLoginURL()
        }
      },
      doRandomIndex() {
        let luckLength = this.luckList.length
        return Math.floor(Math.random() * luckLength)
      },
      doLinkLoginURL() {
        setViewport(1)
        this.$router.push({
          path: '/account/login', query: {
            callbackUrl:'/spa/activity/june'
          }
        })
      },
      onRecommendHandle() {
        window.location.href = '/event/recommend';
      },
      onProductListHandle() {
        window.location.href = '/product/index'
      },
      onChangeModalVisible(visible) {
        this.isShowModal = visible
      },
      onChangeModal2Visible(visible) {
        this.isShowModal2 = visible
      },
      onChangeModal3Visible(visible) {
        this.isShowModal3 = visible
      },
      onChangeModal4Visible(visible) {
        this.isShowModal4 = visible
      },
      onChangeModal5Visible(visible) {
        this.isShowModal5 = visible
      },
      onChangeModal6Visible(visible) {
        this.isShowModal6 = visible
      },
      onClickReceive(item) {
        if (this.isLogin) {
          if (this.count < 5) {
            api.GetMayReward(item.ruleId).then(response => {
              if (response.success) {
                this.count = this.count + 1
                this.isShowModal2 = true
              } else {
                this.$notify({
                  message: response.msg,
                  type: 'warning'
                });
              }
            })
          } else {
            //this.confirmVisible = true
          }
        } else {
          this.doLinkLoginURL()
        }
      },
      onClickLuckInfoModalHandle() {
        api.GetJuneLuckInfo({
          pageNo: 1,
          pageSize: 10
        }).then(response => {
          if (response.success) {
            this.luckRecordList = response.data.recod
            this.luckRecodePageTotal = response.data.page.totalCount
            this.isShowModal3 = true
          } else {
            this.$notify({
              message: response.msg,
              type: 'warning'
            });
          }
        })
      },
      doGetMyFortunesList(pageNo) {
        api.GetJuneMyFortunesCard({
          pageNo: pageNo,
          pageSize: 4,
          token: this.token
        }).then(response => {
          console.log(response)
          if (response.success) {
            this.isLogin = true
            this.myFortunesList = response.data.record.map(item => {
              item.isTurn = false
              let obj = {
                "recomCount": 0,
                "maxReceiveCount": 0,
                "investAmt": 0,
                "receiveCount": 0,
                "likeCount": 0,
                "receiveAmt": 0,
                "awardAmt": 0
              }
              item.detail = obj
              return item
            })
            this.myFortunesTotalPages = response.data.page.totalPages
          } else {
            this.isLogin = false
          }
        })
      },
      onClickFortunesPrevHandle() {
        if (this.myFortunesCurrentPage > 1) {
          this.myFortunesCurrentPage = this.myFortunesCurrentPage - 1
          this.doGetMyFortunesList(this.myFortunesCurrentPage)
        }
      },
      onClickFortunesNextHandle() {
        if (this.myFortunesCurrentPage < this.myFortunesTotalPages) {
          this.myFortunesCurrentPage = this.myFortunesCurrentPage + 1
          this.doGetMyFortunesList(this.myFortunesCurrentPage)


        }
      },
      onClickFortunesCardHandle(item) {
        if (item.awardStatus != '0') {
          if (item.isTurn) {
            item.isTurn = false
          } else {
            api.GetJuneFortunesCardDetail({
              awardId: item.awardId
            }).then(response => {
              if (response.success) {
                item.detail = response.data
                item.isTurn = true
              }
            })
          }

        }
      },
      onClickShareBtnHandle() {
        //this.$router.push('/activity/juneShare')
        window.location.href = '/spa/activity/juneShare'
      },
      onClickShareVisible(visible) {
        this.shareTipsVisible = visible
      },
      onShowFortunesDetail() {
        this.isShowModal6 = true
      }
    }
  }
</script>

<style lang="less">
  @import "~@/style/less/views/activity/june";
</style>
