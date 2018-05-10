<template>
<div v-if="works" class="works-wrap load-hook" :style="{backgroundImage:`url(${works.bgImage})`}">
  <div class="works-content">
    <h2 class="title">{{works.name}}</h2>
    <div class="container">
      <div class="row">
        <ul class="works-list" :style="{transform: `rotateY(${rolateYDeg}deg)`}">
          <li v-for="(item,index) in works.list" :key="index" class=" works-item" :class="{'hidden-sm': index >=2}">
            <a :href="item.url" target="_block">
                <div class="thumbImg" :style="{backgroundImage: `url(${item.thumbImg})` }"></div>
                <div class="content">
                  <h3 class="title">{{item.name}}</h3>
                  <p class="desc">{{item.desc}}</p>
                </div>
              </a>
          </li>
        </ul>
      </div>
      <div class="ball-list">
          <span class="ball" v-for="(item,index) in works.list" :key="index" :data-index="index" :class="{current: chengeIndex === index}" @click="chengeWorks(index)" > </span>
      </div>
      </div>
  </div>
</div>
</template>

<script>
const ROLATESTEP = 90
export default {
  name: 'works',
  data() {
    return {
      chengeIndex: 0
    }
  },
  props: {
    works: {
      type: Object
    }
  },
  computed: {
    rolateYDeg () {
      return this.chengeIndex * ROLATESTEP
    }
  },
  methods: {
    chengeWorks (index) {
      this.chengeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.works-wrap {
  width: 100%;
  height: 100%;
  .bgImageStyle();
  .works-content {
    height: 100%;
    background: @coverLayerColor;
    color: @fontColor;
    text-align: center;
    &>.title {
      padding:100px 0 50px;
      line-height: 48px;
      font-size: 24px;
      text-align: center;
    }
    .container {
      .works-list {
        display: flex;
         width: 100%;
         height: 300px;
        .works-item {
          position: relative;
          flex: 1;
          margin: 10px;
          overflow: hidden;
          a {
            display: block;
            .thumbImg {
              height: 300px;
              .bgImageStyle();
              transition: 1s ease-in-out;
            }
            .content {
              position: absolute;
              left: 0;
              bottom: 0;
              padding: 10px;
              width: 100.3%;
              line-height: 20px;
              background: @coverLayerColor;
              color: @fontColor;
              transition: .3s ease-in-out;
              transform: translate3d(0,100px,0);
              .title {
                font-size: 14px;
                font-weight: 400;
              }
              .desc {
                font-size: 12px;
                font-weight: 200;
                text-align: left;
                color: @works-infoColor;
              }
            }
            &:hover {
              .content {
                transform: translate3d(0,0,0);
              }
              .thumbImg {
                transform: scale(1.2);
              }
            }
          }

        }
      }

    }
  }
}
@media (max-width:767px) {
  .works-wrap {
    height: auto;
    background: @baseBGColor url('../../assets/bg.png') repeat !important;
    .works-content {
      height: auto;
      padding-bottom: 30px;
      background-color: transparent;
      &>.title {
        margin: 0 0 25px;
        padding:0;
        font-size: 20px;
        background: rgba(0,0,0,.2);
      }
      .container {
        perspective: 2000px;
        margin-top: 50px;
        .works-list {
          position: relative;
          margin: 0 auto;
          width: 240px;
          transform-style: preserve-3d;
          transition: 1S ease-in-out ;
          .works-item {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            width: 240px;
            border: 5px solid transparent;
            // border-bottom: 10px solid transparent;
            box-shadow: 0 1px 15px 5px @coverLayerColor;
            &:nth-child(1) {
              background: rgba(122,18,193,.2);
              transform: translate3d(0,0,120px);
            }
            &:nth-child(2) {
              background: rgba(122,18,193,.2);
              transform: rotateY(90deg) translate3d(0,0,120px);
            }
            &:nth-child(3) {
              background: rgba(122,18,193,.2);
              transform: rotateY(180deg) translate3d(0,0,120px);
            }
            &:nth-child(4) {
              background: rgba(122,18,193,.2);
              transform: rotateY(270deg) translate3d(0,0,120px);
            }
            a {
              .content {
                transform: translate3d(0,0,0);
                background: @works-infoBackgroundColor;
                .title {
                  font-size: 14px;
                }
                .desc {
                  font-size: 8px;
                }
              }
            }

          }
        }
        .ball-list {
          margin-top: 50px;
          font-size: 0;
          .ball {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 0 10px;
            border-radius: 50%;
            background: @works-ballColor;
            &.current {
              background: @works-currentBallColor;
            }
          }
        }
      }
    }
  }
}
</style>
