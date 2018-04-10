<template>
<div class="top-nav-wrap">
  <div class="content">
    <div class="my-info hidden-xs">
      <img class="avatar" :src="myInfo.info.avatar" width="40" height="40" :alt="myInfo.info.name">
      <span>高希</span>
    </div>
    <div class="menu">
      <div class="music-btn hidden-lg hidden-md hidden-sm">
        <img class="cover" :src="myInfo.info.avatar" width="40" height="40"  alt="">
        <span class="play icon-player_song"></span>
      </div>
      <div class="menu-btn"  @click="showSohuCS">
        <span class="menu-btn-line"></span>
        <span class="menu-btn-line"></span>
        <span class="menu-btn-line"></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    myInfo: {
      type: Object
    },
    header: {
      type: Object
    }
  },
  methods: {
    showSohuCS () {
      this.$emit('show-sohuCS')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.top-nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .content {
    display: flex;
    margin: 25px 50px 0;
    .my-info {
      flex: 0 0 150px;
      width: 150px;
      height: 56px;
      line-height: 50px;
      padding: 8px 10px 8px;
      border-radius: 10px;
      border: 1px solid @borderColor;
      background: @topNav-infobgColor;
      font-size: 0;
      text-align: center;
      .avatar {
        display: inline-block;
        border-radius: 50%;
         vertical-align: top;
      }
      span {
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        margin-left: 20px;
        vertical-align: top;
      }
    }
    .menu {
      flex: 1;
      padding: 8px 10px 8px;
      z-index: 1;
      .music-btn {
        position: relative;
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: @topNav-infobgColor;
        // border: 1px solid @borderColor;
        cursor: pointer;
        .cover {
          border-radius: 50%;
          border: 1px solid @borderColor;
        }
        .play {
          position: absolute;
          top: 10px;
          left: 12px;
          font-size: 20px;
          font-weight: 700;
         color: @topNav-playBtnColor;
        }
      }
      .menu-btn {
        float: right;
        width: 40px;
        height: 40px;
        padding-top: 5px;
        border-radius: 50%;
        background: @topNav-infobgColor;
        border: 1px solid @borderColor;
        cursor: pointer;
        .menu-btn-line {
          display: block;
          margin: 0 auto;
          width: 20px;
          height: 8px;
          border-bottom: 2px solid #fff;
        }
      }
    }
  }
}
@media (max-width: 767px) {
.top-nav-wrap {
  .content {
    display: flex;
    margin: 0;
    padding: 5px 10px 0;
    background: @topNav-bgColor;
    .my-info {
      flex: 0 0 150px;
      width: 150px;
      height: 56px;
      line-height: 50px;
      padding: 8px 10px 8px;
      border-radius: 10px;
      border: 1px solid @borderColor;
      background: @topNav-infobgColor;
      font-size: 0;
      text-align: center;
      .avatar {
        display: inline-block;
        border-radius: 50%;
         vertical-align: top;
      }
      span {
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        margin-left: 20px;
        vertical-align: top;
      }
    }
    .menu {
      flex: 1;
        padding: 8px 10px 8px;
      .menu-btn {
        float: right;
        width: 40px;
        height: 40px;
        padding-top: 5px;
        border-radius: 50%;
        background: @topNav-infobgColor;
        border: 1px solid @borderColor;
        cursor: pointer;
        .menu-btn-line {
          display: block;
          margin: 0 auto;
          width: 20px;
          height: 8px;
          border-bottom: 2px solid #fff;
        }
      }
    }
  }
}
}
</style>
