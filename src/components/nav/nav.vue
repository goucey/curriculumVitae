<template>
<div v-if="header" class="nav-wrap">
  <ul class="side-nav-content hidden-xs">
    <li class="side-nav-item" v-for="(item,index) in header.titleMenu" :key="index" :class="{current: currentIndex === index}" @click="current(index)">
      <span class="icon" :class="item.iconClass"></span>
      <span class="title-name">{{item.titleName}}</span>
    </li>
  </ul>
</div>
</template>

<script>
let LOOK = true
export default {
  name: 'sideNav',
  data () {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  props: {
    header: {
      type: Object
    }
  },
  mounted () {
    document.querySelector('#app').onscroll = this.scrollTop
  },
  methods: {
    current (index) {
      this.currentIndex = index
      let app = document.querySelector('#app')
      let height = app.clientHeight
      if (!LOOK) {
        return
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        LOOK = false
        let top = app.scrollTop
        let step = Math.abs(((index * height) - top) / 2)
        app.scrollTop = (index * height) >= top ? (step + top) : (top - step)
        if (step < 5) {
          clearInterval(this.timer)
          app.scrollTop = index * height
          LOOK = true
        }
      }, 50)
    },
    scrollTop (event) {
      let app = document.querySelector('#app')
      let top = app.scrollTop
      let height = app.clientHeight
      this.currentIndex = Math.floor(top / height)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.nav-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  .side-nav-content {
    position: absolute;
    margin: auto;
    top: 0;
    right: 30px;
    bottom: 0;
    width: 20px;
    height: 120px;
    &::after{
      position: absolute;
      top: 30px;
      left: 10%;
      width: 10px;
      height: 200px;
      border-right: 1px dashed @sideNav-ballColor;
      transform: translate3d(-3px,0,0);
      z-index: -1;
      content: '';
    }
    .side-nav-item {
      position: relative;
      margin: 20px 0;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: @sideNav-bgColorBase;
      text-align: center;
      transition: .5s ease-in-out;
      &:hover {
        .title-name {
          transform: translate3d(0,0,0);
          opacity: 1;
        }
      }
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        transform: translate3d(-4px,-4px,0);
        background: @sideNav-bgColor;
        content: '';
      }
      &.current {
        background: transparent;
        &::before {
          opacity: 0;
        }
        .icon {
          transform: scale(2);
        }
      }
      .icon {
        display: block;
        line-height: 20px;
        font-size: 12px;
        border-radius: 50%;
        background:@sideNav-bgColor;
        color: @sideNav-fontColor;
        transition: .8s ease-in-out;
        transform: scale(0);
      }
      .title-name {
        position: absolute;
        top: 0;
        right: 40px;
        width: 80px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        border-radius: 10px 5px 5px 10px;
        background: @sideNav-bgColor;
        color: @sideNav-fontColor;
        transform: translate3d(30px,0,0);
        transition: .5s ease-in-out;
        opacity: 0;
        &::after{
          position: absolute;
          top: 4px;
          right: -6px;
          border: 6px solid transparent;
          border-right: none;
          border-left-color: @sideNav-bgColor;
          content: '';
        }
      }
    }
  }
}
</style>
