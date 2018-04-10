<template>
  <div id="app">
    <home @show-sohuCS="showSohuCS" :serverData="getData" :myInfo="getData.myInfo" :header="getData.header"></home>
    <about :myInfo="getData.myInfo"></about>
    <skills :skills="getData.skills"></skills>
    <experience :exp="getData.experience"></experience>
    <works :works="getData.works"></works>
    <contact ref="contact" :contact="getData.contact" :myInfo="getData.myInfo"></contact>
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

// const ERR_OK = 200
export default {
  name: 'App',
  data () {
    return {
      serverData: {},
      isChinese: true,
      data: {},
      currentIndex: 0,
      lock: true
    }
  },
  created () {
    this.serverData = require('./json/data.json')
    // this.$http.get('/api/webResume.default').when(res => {
    //     if (res.body.code === ERR_OK) {
    //       this.serverData = res.body.data
    //     }
    // })
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
    getData () {
      return this.isChinese ? this.serverData.cn : this.serverData.en
    }
  },
  methods: {
    loadding () {
      let loading = document.querySelector('.loading')
      loading.style.transform = 'translate3d(0,-1000px,0)'
      setTimeout(() => {
        loading.style.display = 'none'
      }, 2000)
    },
    showSohuCS () {
      this.$refs.contact.showSohuCS()
    }
    // changePages (event) {
    //   if (this.lock) {
    //     this.lock = false
    //     if (event.wheelDelta > 0 || event.detail < 0) {
    //       this.currentIndex--
    //       this.currentIndex = this.currentIndex < 0 ? 0 : this.currentIndex
    //     }
    //     if (event.wheelDelta < 0 || event.detail > 0) {
    //       this.currentIndex++
    //       let menusCount = this.getData.header.titleMenu.length
    //       this.currentIndex = this.currentIndex >= menusCount ? menusCount - 1 : this.currentIndex
    //     }
    //     // 防止多次触发特设置 触发锁
    //     setTimeout(() => {
    //       this.lock = true
    //     }, 800)
    //   }
    // }
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
