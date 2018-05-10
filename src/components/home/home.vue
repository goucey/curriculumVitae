<template>
<div class="home" v-if="serverData.myInfo && serverData.default" >
  <div class="bg-slider-wrap hidden-xs">
    <ul class="slider-main">
      <!-- 左右无缝滑动 -->
      <li class="lr-slider" :class="{'show-ainimate':showAinimateIndex === 1}" >
        <div class="l-slider load-hook" :style="{backgroundImage: `url('${sliderImgTemp[0]}')`}"></div>
        <div class="r-slider load-hook" :style="{backgroundImage: `url('${sliderImgTemp[1]}')`}"></div>
      </li>
      <!-- 左右立方体滚动 -->
      <li class="revolve-slider-wrap" :class="{current:showAinimateIndex === 2}">
        <revolveSlider :images="sliderImgTemp" :isShowAnimate="showAinimateIndex === 2"></revolveSlider>
      </li>
      <!-- 左右联动动画 -->
      <li class="three-row-slider-wrap container-fluid"  :class="{current:showAinimateIndex === 3}">
          <threeRowSlider ref="threeRowSlider" :images="sliderImgTemp" :isShowAnimate="showAinimateIndex === 3"></threeRowSlider>
      </li>
      <li>
        <div></div>
        <div class="load-hook" v-show="isShowShade" :style="{backgroundImage: `url('${bgMarkImg}')`}" ></div>
      </li>
    </ul>
  </div>
  <div class="home-content">
      <div class="avatar">
        <img class="load-hook" :src="serverData.myInfo.info.avatar" :alt="serverData.myInfo.info.name">
      </div>
      <div class="info">
          <div class="quote">
            <div class="line"></div>
            <div class="text">{{serverData.default.quote}}</div>
            <div class="line"></div>
          </div>
          <div class="introduce" >
            <p>我叫{{serverData.myInfo.info.name}}</p>
            <p>一名前端开发工程师</p>
            <p>{{serverData.myInfo.info.email}}</p>
          </div>
          <contactWay :myInfo="serverData.myInfo" class="hidden-lg hidden-md hidden-sm"></contactWay>
      </div>
      <topNav @show-sohuCS="showSohuCS" :myInfo="serverData.myInfo" :header="serverData.header"></topNav>
  </div>
  <!-- <div class="shade" @mousemove="heartMove" @mouseout="heartMoveOut"> -->
  <!-- </div> -->
</div>
</template>

<script>
import { getRandomNum } from '../../common/js/util'
import revolveSlider from '../../components/revolveSlider/revolveSlider'
import threeRowSlider from '../../components/threeRowSlider/threeRowSlider'
import heart from '../../components/heart/heart'
import contactWay from '../../components/contactWay/contactWay'
import topNav from '../../components/topNav/topNav'
// 动画个数
const sliderCount = 3
export default {
  name: 'home',
  data () {
    return {
      // 执行动画列表的第几个
      showAinimateIndex: 0,
      // 是否开始显示蒙层的图片
      isShowShade: true,
      timer: null,
      bgMarkImg: '',
      sliderImgTemp: [],
      mouseMoveModel: {
        transform: 'rotateY(0deg) rotateX(0deg) translate3d(0,0,50px)'
      }
    }
  },
  props: {
    serverData: {
      type: Object
    }
  },
  watch: {
    'serverData' () {
      if (this.serverData.default) {
        if (this.sliderImgTemp.length === 0) {
          this.sliderImgTemp = [
            this.serverData.default.imgs[0],
            this.serverData.default.imgs[1]
          ]
        }
        this.bgMarkImg = this.serverData.default.imgs[0]
      }
    }
  },
  computed: {
  },
  methods: {
    heartMove () {

    },
    heartMoveOut () {

    },
    // 轮播图动画方法
    _sliderAinimate () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.isShowShade = false
        this.showAinimateIndex = getRandomNum(1, sliderCount)
        // this.showAinimateIndex = sliderCount - 1
        // console.log(this.showAinimateIndex, '切换模式')
        setTimeout(() => {
          this.bgMarkImg = this.sliderImgTemp[1]
          this.isShowShade = true
          // console.log('设置蒙版完毕')
          this.showAinimateIndex = -1
          this.sliderImgTemp[0] = this.sliderImgTemp[1]
          let count = this.serverData.default.imgs.length
          let index = getRandomNum(0, count - 1)
          let temp = this.serverData.default.imgs[index]
          if (this.sliderImgTemp[1] === temp) {
            index = (count - 1) <= index ? index - 1 : index + 1
            temp = this.serverData.default.imgs[index]
          }
          this.sliderImgTemp[1] = temp
        }, 4000)
      }, 8000)
    },
    showSohuCS () {
      this.$emit('show-sohuCS')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._sliderAinimate()
    })
  },
  components: {
    revolveSlider,
    threeRowSlider,
    heart,
    contactWay,
    topNav
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg-slider-wrap,
  .slider-main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li:last-child{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition:  1s;
      z-index: 0;
      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &:first-child {
          background-color: @home-coverLayerColor;
          z-index: 1;
        }
        &:last-child {
          filter: blur(1px);
          background-position: 0 0;
          background-repeat: no-repeat;
          background-size: 100% 100% ;
        }
      }
    }
    .lr-slider {
      width: 200%;
      height: 100%;
      font-size: 0;
      transition: all 1.5s cubic-bezier(0.215, 0.610, 0.355, 1);
      &.show-ainimate{
        transform: translate3d(-50%,0,0);
        //  z-index: -2;
      }
      .l-slider,
      .r-slider {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .revolve-slider-wrap,
    .three-row-slider-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background: @home-bgColor;
      &.current {
        z-index: 0;
      }
    }
  }
  .home-content {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 70%;

    .avatar {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      transition: .3s;
      z-index: 1;
      box-shadow: 0 0 10px 5px @home-avatarBoxShodom0;
      &:hover {
        box-shadow: 0 0 10px 5px @home-avatarBoxShodom1;
      }
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        opacity: .9;
      }
    }
    .info {
      position: absolute;
      top: 220px;
      left: 0;
      width: 100%;
      text-align: center;
      .quote {
        margin: 0 auto;
        width: 80%;
        display: flex;
        .line {
          flex: 1;
          transform: translateY(-50%);
          border-bottom: 1px solid @home-lineColor;
        }
        .text {
          position: relative;
          margin: 0 20px;
          line-height: 25px;
          font-size: 22px;
          // font-weight: 200;
          color: @home-fontColor;
        }
      }
      .introduce {
        margin-top: 50px;
        line-height: 20px;
        font-size: 18px;
        color: @home-fontColor;
        p {
          &:nth-last-child(2) {
            padding: 20px 0;
          }
          &:last-child {
            font-weight: 200;
          }
        }
      }
    }
  }
  .shade {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
  }
}
@media (max-width:767px) {
  .home {
    background: @baseBGColor url('../../assets/bg.png') repeat !important;
    .home-content {
      background-color: transparent;
      .avatar {
        width: 150px;
        height: 150px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .info {
        top: 180px;
        .quote {
          .text {
            font-size: 14px;
          }
        }
        .introduce {
          margin-top: 25px;
          line-height: 16px;
          font-size: 14px;
           p {
            &:nth-last-child(2) {
              padding: 10px 0;
            }
          }
        }
        .contact-way-wrap {
          margin-top: 50px;
        }
      }
    }
  }
}
</style>
