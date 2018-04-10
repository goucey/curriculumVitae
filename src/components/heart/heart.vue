<template>
<div class="avatar-wrap" >
  <div class="avatar" :style="{transform: `rotateY(${this.rotateY}deg) rotateX(${this.rotateX}deg) translate3d(0,0,50px)`}">
      <div class="left">
        <img :src="myInfo.avatar" :alt="myInfo.name">
      </div>
      <div class="right">
        <img :src="myInfo.avatar" :alt="myInfo.name">
      </div>
  </div>
</div>
</template>

<script>
const STEP = 0.2
export default {
  name: 'heart',
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      rotateX: 0,
      rotateY: 0
    }
  },
  props: {
    myInfo: {
      type: Object
    }
  },
  methods: {
    // 鼠标移动
    mouseMove (event) {
      if (this.mouseX > event.offsetX) {
        this.rotateY = this.rotateY - STEP
      }
      if (this.mouseX < event.offsetX) {
        this.rotateY = this.rotateY + STEP
      }
      if (this.mouseY > event.offsetY) {
        this.rotateX = this.rotateX + STEP
      }
      if (this.mouseY < event.offsetY) {
        this.rotateX = this.rotateX - STEP
      }
      this.mouseX = event.offsetX
      this.mouseY = event.offsetY
    },
    // 鼠标离开
    mouseOver () {
      this.rotateX = 0
      this.rotateY = 0
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-wrap {
  position: absolute;
  margin: 0 auto;
  top: 0;
  left: 0;
  // bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
  z-index: 1;
  perspective: 2000px;
  transform-style: preserve-3d;
  .avatar {
    width: 100%;
    height: 100%;
    // transition: all .1s ease-in-out ;
    .left,
    .right {
      position: absolute;
      top: 0;
      width: 65%;
      height: 100%;
      border-top: 1px solid #000;
      border-radius: 50% 50% 0 0;
      overflow: hidden;
      img {
        width: 225px;
        height: 225px;
      }
    }
    .right {
      right: 0;
      box-shadow: 5px -2px 8px  rgba(0, 0, 0,.5);
      transform: rotate(46deg) translate3d(-17px, -5px ,0);
      img {
        transform: rotate(-46deg) translate3d(-49px,-28px,0);
      }
    }
    .left {
      left: 0;
      box-shadow: -5px -2px 8px  rgba(0, 0, 0,.5);
      transform: rotate(-46deg) translate3d(17px, -5px ,0);
      img {
        transform: rotate(46deg)  translate3d(-14px,41px,0);
      }
    }
  }
}
</style>
