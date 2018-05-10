<template>
  <div id="app">
    <home @show-sohuCS="showSohuCS" v-if="getData" :serverData="getData"></home>
    <about :myInfo="getData.myInfo"></about>
    <skills :skills="getData.skills"></skills>
    <experience v-if="getData.experience" :exp="getData.experience"></experience>
    <works :works="getData.works"></works>
    <contact ref="contact" :serverData="getData"></contact>
    <v-nav :header="getData.header"></v-nav>
    <div class="loading">
      <div class="move">
        <div class="face">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import home from './components/home/home'
import about from './components/about/about'
import skills from './components/skills/skills'
import experience from './components/experience/experience'
import works from './components/works/works'
import contact from './components/contact/contact'
import nav from './components/nav/nav'

const ERR_OK = 200
export default {
  name: 'App',
  data () {
    return {
      serverData: {},
      isChinese: true,
      getData: {},
      data: {},
      currentIndex: 0,
      lock: true,
      loadNum: 0,
      timer: null,
      tempCount: 0
    }
  },
  created () {
    this.$http.get('/api/webResume/default.ashx').then(res => {
      if (res.body.code === ERR_OK) {
        this.serverData = res.body.data
        this.getData = this.isChinese ? this.serverData.cn : this.serverData.en
      }
    })
  },
  mounted () {
    if (window.addEventListener) {
      window.addEventListener('mousewheel', this.changePages)
      window.addEventListener('DOMMouseScroll', this.changePages)
    } else if (window.attachEvent) {
      window.attachEvent('mousewheel', this.changePages)
    } else {
      window.onmousewheel = this.changePages
    }
    window.onload = this.loadding
  },
  computed: {
    // getData () {
    //   if (this.serverData) {
    //     return this.isChinese ? this.serverData.cn : this.serverData.en
    //   }
    // }
  },
  methods: {
    loadding () {
      // let bimg = document.querySelectorAll('.load-hook')
      // let [count, _this] = [0, this]
      // this.countMove(bimg)
      // for (let i = 0; i < bimg.length; i++) {
      //   bimg[i].onload = function () {
      //     count++
      //     _this.tempCount = count
      //     if (_this.tempCount === bimg.length) {
      //       _this.tempCount = count > bimg.length ? bimg.length : count
      //       _this.hideLoading()
      //     }
      //   }
      // }
      setTimeout(() => {
        this.hideLoading()
      }, 5000)
    },
    // countMove (bimg) {
    //   let [_this] = [this]
    //   clearInterval(this.timer)
    //   this.timer = setInterval(function () {
    //     let _count = 100 / bimg.length * _this.tempCount
    //     let step = _count - _this.loadNum
    //     let temp = 0
    //     if (step > 0) {
    //       temp = step - (_count - _this.loadNum - 1)
    //     }
    //     console.log(_count, _this.loadNum, temp, bimg.length)
    //     if (temp > 0) {
    //       _this.loadNum += temp
    //     }
    //     if (_this.loadNum === 100) {
    //       clearInterval(_this.timer)
    //     }
    //   }, 100)
    // },
    hideLoading () {
      let loading = document.querySelector('.loading')
      loading.style.transform = 'translate3d(0,-1000px,0)'
      setTimeout(() => {
        loading.style.display = 'none'
        console.log('Hi! 朋友，感谢您愿意调试简历代码。\n本简历采用ES6,vue2.x,webpack,less,vue-cli开发构建\n如果您有什么建议或者想学习前端，欢迎您加入我们,我们互相学习，共同进步^_^。\n%c源码地址：https://github.com/goucey/curriculumVitae', 'color: red')
      }, 2500)
    },
    showSohuCS () {
      this.$refs.contact.showSohuCS()
    }
  },
  components: {
    home,
    about,
    skills,
    experience,
    works,
    contact,
    'v-nav': nav
  }
}
</script>

<style lang="less" scoped>
@import './common/less/mixin.less';
#app {
  width: 100%;
  height: 100%;
  transition: .6s cubic-bezier(.36,0,.64,1);
  overflow-y: scroll;
  background: @baseBGColor url('./assets/bg.png') repeat !important;
  .loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999999;
      background: @loading-bgColor;
      transition: 2s ease-in-out;
      .move {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid @loading-fontColor;
        animation: loadingMove 1s ease-in-out infinite;
        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          box-shadow: 10px 10px 100px 20px rgba(0, 0, 0, .8);
          transform: rotateX(60deg) translate3d(-5px,100px,0);
          content: '';
        }
        .face {
          text-align: center;
          transform: translate3d(0,10px ,0);
          span {
            display: inline-block;
            width: 50px;
            height: 30px;
            border-radius: 50%;
            border-bottom: 3px solid @loading-fontColor;
            animation: loadingMoveFace 1s ease-in-out infinite;
          }
        }
      }
    }
}
</style>
