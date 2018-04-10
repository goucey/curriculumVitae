<template>
<div class="three-row-slider row" :class="{show:isShowAnimate}" :style="{'background-image':`url(${images[0]})`}">
  <div class="three-row-item col-lg-4 col-md-4 col-sm-4" >
    <img :style="{visibility:'visible' ,width:`${width}px`,height:'100%',transform: `translate3d(-${translateXStep*0}px,0,0)`,transition:'all 1s ease-in-out',position:'absolute',top:'0',left:'0'}" :src="images[1]" >
  </div>
  <div class="three-row-item col-lg-4 col-md-4 col-sm-4">
    <img :style="{visibility:'visible' ,width:`${width}px`,height:'100%',transform: `translate3d(-${translateXStep*1}px,0,0)`,transition:'all 2s ease-in-out',position:'absolute',top:'0',left:'0'}" :src="images[1]" >
  </div>
  <div class="three-row-item col-lg-4 col-md-4 col-sm-4">
    <img :style="{visibility:'visible' ,width:`${width}px`,height:'100%',transform: `translate3d(-${translateXStep*2}px,0,0)`,transition:'all 3s ease-in-out',position:'absolute',top:'0',left:'0'}" :src="images[1]" >
  </div>
</div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      height: 0,
      width: 0,
      translateXStep: 0
    }
  },
  props: {
    isShowAnimate: {
      type: Boolean
    },
    images: {
      type: Array
    }
  },
  watch: {
    'isShowAnimate' () {
      if (this.isShowAnimate) {
        let _body = document.querySelector('body')
        this.height = _body.clientHeight
        this.width = _body.clientWidth
        this.translateXStep = this.width / 3
      } else {
        this.translateXStep = 0
        this.width = 0
        this.height = 0
      }
    }
  },
  methods: {
    _showAinimate () {

    }
  }
}
</script>

<style lang="less" scoped>
.three-row-slider {
  // width: 100%;
  height: 100%;
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &.show {
    z-index: 100;
  }
  .three-row-item {
    // width: 100%;
    height: 100%;
    // background-image: url('../../assets/bg_3.jpg');
    font-size: 100px;
    overflow: hidden;
    &:nth-last-child(2) {
      background-position: 45.993333% 0;
    }
    &:last-child {
      background-position: 92% 0;
    }
  }
}
</style>
