<template>
 <div class="revolve-slider" :class="{init: !isShowAnimate,current: isShowAnimate}">
    <div class="frist-bg-img load-hook" :style="{backgroundImage: `url(${images[1]})`}"></div>
    <div class="last-bg-img load-hook" :style="{backgroundImage: `url(${images[0]})`}"></div>
  </div>
</template>

<script>
export default {
  name: 'revolveSlider',
  props: {
    isShowAnimate: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
  .revolve-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // z-index: 2;
    transform-style: preserve-3d;
    perspective: 2500px;
    perspective-origin: 50% 100px;
    transform: translateZ(0);
    &.init {
      .frist-bg-img{
        // opacity: 0.5;
        left: -76%;
        transform: rotateY(-90deg) translate3d(-15%, 0, 125px);
        transform-origin: top right;
      }
      .last-bg-img{
        opacity: 1;
        transform: translate3d(0, 0, 125px);
      }

    }
    &.current {
      z-index: 200;
      .frist-bg-img{
        height: 100%;
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      .last-bg-img{
        left: 76%;
        height: 100% ;
        transform: rotateY(90deg) translate3d(15%, 0, 125px);
        transform-origin: top left;
        // opacity: 0.5;
      }
    }
    .frist-bg-img,
    .last-bg-img {
      position: absolute;
      left: 0;
      width: 100%;
      min-height: 60%;
      height: 100%;
      max-height: 100%;
      line-height: 1.5;
      opacity: 1;
      transition: 3s all cubic-bezier(0.260, 0.860, 0.440, 0.985);
      transform: translateZ(0);
      box-sizing: border-box;
      overflow: hidden;
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
