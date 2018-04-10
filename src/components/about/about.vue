<template>
<div class="about-wrap" :style="{backgroundImage:`url(${myInfo.backgroundImage})`}" >
  <div class="about-content">
    <h2 class="title">{{myInfo.name}}</h2>
    <div class="container">
       <div class="row">
        <div class="infos-item col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <span class=" icon icon-loading"></span>
            <span class="icon-title">年龄/30</span>
        </div>
        <div class="infos-item col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <span class=" icon icon-education"></span>
            <span class="icon-title">学历/大专</span>
        </div>
        <div class="infos-item col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <span class="icon icon-location"></span>
            <span class="icon-title">城市/西安</span>
        </div>
        <div class="infos-item col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <span class=" icon icon-Status"></span>
            <span class="icon-title">状态/离职</span>
        </div>
      </div>
    </div>
    <div class="desc">
      <p class="text">{{myInfo.info.desc}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'about',
  props: {
    myInfo: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.about-wrap {
  width: 100%;
  height: 100%;
  .bgImageStyle();
  .about-content {
    height: 100%;
    background: @coverLayerColor;
    color:@fontColor;
    text-align: center;
    .title {
      padding: 100px 0 50px;
      line-height: 48px;
      font-size: 24px;
      text-align: center;
    }
    .row {
      margin: 0 auto;
      max-width: 800px;
      .infos-item {
        margin-bottom: 30px;
        :hover {
            &:first-child {
              transform: scale(.93);

              &::after {
                animation: diffuseEffect 1.3s ease-out 75ms
              }
            }
          }
        .icon {
          position: relative;
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
          line-height: 100px;
          font-size: 50px;
          margin-bottom: 10px;
          border: 1px solid @borderColor;
          border-radius: 50%;
          transition: .2s, transform ease-out .1s;
          &::after {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            box-shadow: 0 0 0 2px @icon-boxShadowColor0;
            transform: scale(.9);
            opacity: 0;
            content: '';
          }
        }
        .icon-title {
          display: block;
          font-size: 14px;
        }
      }
    }
    .desc {
      margin: 60px auto 0;
      max-width: 800px;
      line-height: 32px;
      text-align: left;
      .text {
        padding: 0 20px;
        text-indent: 2em;
      }
    }
  }

}
 @media (max-width: 767px) {
    .about-wrap {
      background: @baseBGColor url('../../assets/bg.png') repeat !important;
      height: auto;
      .about-content {
        height: auto;
        padding-bottom: 30px;
        background-color: transparent;
        .title {
          margin:0 0 20px;
          padding: 0;
          font-size: 20px;
          background: rgba(0,0,0,.2);
        }
        .row {
          .infos-item {
            margin-bottom: 15px;
            .icon {
              width: 50px;
              height: 50px;
              line-height: 50px;
              font-size: 25px;
              &::after {
                position: absolute;
                width: 50px;
                height: 50px;
              }
            }
            .icon-title {
              font-size: 12px;
            }
          }
        }
        .desc {
          margin: 15px auto 0;
          .text {
            font-size: 14px;
          }
        }
      }
     }
  }
</style>
