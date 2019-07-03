<template>
  <div v-show="isShow" class="validator-modal">
    <div class="slider">
      <div class="validator-modal" id="nc"></div>
    </div>
  </div>
</template>

<script>
  import "@/utils/ali_validate"
  import api from '@api'
    export default {
      name: "validatorModal",
      props:{
        isShow: {
          type: Boolean,
          default: false
        },
        mobile:{
          type:String,
          default:''
        },
        isSign:{
          type: Boolean,
          default: true
        }
      },
      watch: {
        isShow(curVal) {
          this.$emit('visible-change', curVal);
        }
      },
      mounted() {
        //滑块验证
        var nc_appkey = 'FFFF0N00000000005F1A';// 应用标识,不可更改
        var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        var nc_scene = 'nc_register_h5';
        var nc = NoCaptcha.init({
          renderTo: '#nc',
          appkey: nc_appkey,
          scene: nc_scene,
          token: nc_token,
          elementID: ['phone'],
          callback: (data) => {
            console.log('submit')
            if(this.isSign){
              api.CheckSlideReg({
                csessionid:data.csessionid,
                token:nc_token,
                scene:nc_scene,
                sig:data.sig,
                slidercode:false,
                phone:this.mobile
              }).then(response=>{
                this.$emit("onValidatorResult",response)
              })
            }else{
              console.log(data)
              this.$emit("onValidatorResult",{
                csessionid:data.csessionid,
                token:nc_token,
                scene:nc_scene,
                sig:data.sig,
                slidercode:false,
                code:data.code
              })
            }
          }
        });
        NoCaptcha.upLang('cn', {
          'SLIDER_LABEL': "向右滑动以完成验证",//等待滑动
        });
        nc.on('error', (e) => {
          console.log('error')
        });
        nc.on('fail', (e) => {
          console.log('fail')
        });
        nc.on('success', (e) => {
          console.log('success')
        });
        nc.on('afterverify', (e) => {
          console.log('afterverify')
        });
        NoCaptcha.setEnabled(true);
        nc.reset();
      }
    }
</script>

<style lang="less" scoped>
  .validator-modal {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    .slider{
      position: absolute;
      top:3rem;
      width:100%;
    }
  }
</style>
