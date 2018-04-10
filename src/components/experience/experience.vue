<template>
<div class="experience-wrap"  :style="{backgroundImage:`url(${exp.backgroundImage})`}">
  <div class="experience-content">
    <h2 class="title">{{exp.name}}</h2>
      <div class="container">
       <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="exp-list">
              <div class="years">
                 <div v-for="(value, key, index) in exp.list" class="ball" :class="{current:key===shouYearKey}" :key="key" :data-key="key" :style="{'animation-delay': `${-((index*step)+4)}s,${-(index*step)}s` }" @click="showYear(key)" >{{getYear(key)}}</div>
              </div>
              <div class="months">
                  <div class="month " :class="{action: monthActionIndex===index }" v-for="(item,index) in exp.list[shouYearKey]" :key="item.month" :data-index="index" :style="{marginBottom:`${marginTop(exp.list[shouYearKey].length)}px`}" @click="showExpInfo(index)" >
                    <span class="text">{{item.month}}</span>
                  </div>
              </div>
            </div>
        </div>
        <div class=" content-wrap col-lg-8 col-md-8 col-sm-8 col-xs-12">
          <div ref="content" class="content">
            <h3 class="title">{{currentData.title}}</h3>
            <p class="work-time">{{currentData.time}}</p>
            <p class="post">{{currentData.post}}</p>
            <p class="tech">{{currentData.tech}}</p>
            <ul class="desc-list">
              <li class="desc" v-for="(item,index) in currentData.desc" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'exp',
  data () {
    return {
      currentData: {},
      shouYearKey: 'Y2016',
      monthActionIndex: 0
    }
  },
  computed: {
    step () {
      const length = Object.keys(this.exp.list).length
      return (18 / (length - 1))
    }

  },
  methods: {
    getYear(key) {
      return key.substr(1)
    },
    showYear (key, event) {
      this._expInfoAnimate()
      this.shouYearKey = key
      this.monthActionIndex = 0
      this.currentData = this.exp.list[this.shouYearKey][0]
    },
    marginTop (count) {
      let months = document.querySelector('.months')
      let mouth = document.querySelector('.months .text')
      if (months !== null) {
        let height = months.offsetHeight
        let itemHeight = mouth.offsetHeight
        return count === 1 ? 0 : ((height - (itemHeight * count)) / count)
      }
      return 10
    },
    showExpInfo (index) {
      this._expInfoAnimate()
      this.monthActionIndex = index
      this.currentData = this.exp.list[this.shouYearKey][index]
    },
    _expInfoAnimate () {
      this.$refs.content.style.animation = 'rightToLeftEffect .8s ease-in-out'
      setTimeout(() => {
        this.$refs.content.style.animation = ''
      }, 800)
    }
  },
  mounted () {
    this.currentData = this.exp.list.Y2016[0]
  },
  props: {
    exp: {
      trpe: Object
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
  .experience-wrap {
    width: 100%;
    height: 100%;
    .bgImageStyle();
    .experience-content {
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
      .row {
        .exp-list {
          transform: translate3d(30px,-45px, 0);
          .years {
            position: relative;
            margin: 0 auto;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border-bottom: 1px solid @borderColor;
            &:hover {
              .ball {
                display: block;
                opacity: 1;
                transition: opacity 1s ease-in-out;
                animation-name: ballRotateEffect-160-X, ballRotateEffect-160-Y;
                animation-duration: 8s,8s;
                animation-timing-function: cubic-bezier(.36,0,.64,1) ,cubic-bezier(.36,0,.64,1) ;
                animation-iteration-count: infinite,infinite;
                animation-direction: alternate,alternate;
                animation-fill-mode: initial,initial;
              }
            }
            .ball {
              position: absolute;
              display: none;
              opacity: 0;
              width: 100px;
              height: 100px;
              line-height: 90px;
              font-size: 32px;
              border-radius: 50%;
              background: @exp-ballBackgroundColor;
              transition: .3s ease-in-out;
              transform: scale(.5);
              text-align: center;
              &::before {
                position: absolute;
                bottom: -18px;
                left: 0;
                width: 100px;
                font-size: 20px;
                text-align: center;
                color: @exp-yearColor;
                content: 'Year'
              }
              &::after {
                position: absolute;
                top: 0;
                left: 0;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                border: 5px solid @borderColor;
                content: '';
              }
              &:hover {
                transform: scale(.4);
                &::after {
                  animation: diffuseEffect .8s ease-in-out;
                  // transform: scale(.9);
                }
              }
              &.current {
                display: block;
                opacity: 1;
                top: 19%;
                left: 19%;
                transform: scale(.9);
                animation-name: none;
                animation-play-state: paused;
                 &:hover {
                // transform: scale(.8);
                &::after {
                  animation: diffuseEffect .8s ease-in-out;

                  // transform: scale(.9);
                }
              }
              }
            }
          }
          .months {
            position: relative;
            width: 100%;
            height: 200px;
            margin-top: 50px;
            &::before {
              position: absolute;
              top: -85px;
              left: 50%;
              width: 5px;
              height: 300px;
              border-radius:30% 30% 0 0;
              z-index: -2;
              background: @exp-ballBackgroundColor;
              content: ''
            }
            &::after {
               position: absolute;
              top: -100px;
              left: 50%;
              width: 0;
              height: 0;
              border: 31px solid transparent;
              transform: translate3d(-29px, 0, 0);
              border-top-color:@exp-salverColor;
              border-radius: 20px 20px 0 0;
              border-bottom: none;
              z-index: -1;
              content: ''
            }
            .month {

              .text {
                display: inline-block;
                width: 25px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                border-radius: 50%;
                transform: translate3d(2.5px,0,0);
                background: @exp-ballBackgroundColor1;
                color: @exp-fontColor;
                cursor: pointer;
                 &::after {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  border: 5px solid @borderColor;
                  content: '';
                }
                &:hover {
                  // transform: scale(.4);
                  &::after {
                    animation: diffuseEffect .8s ease-in-out;
                    // transform: scale(.9);
                  }
                }
              }
              &.action{
                .text {
                  &::after {
                    animation: diffuseEffect .8s ease-in-out infinite;
                  }
                }
              }
            }
          }
        }
        .content-wrap{
          position: relative;
          height: 400px;
          overflow: hidden;
          .content {
            position: absolute;
            top: 0;
            left: 0;
            right: 20%;
            bottom: 0;
            margin: 35px auto;
            padding: 20px;
            line-height: 24px;
            border-radius: 3px;
            font-weight: 100;
            transform: translate(0,0,0);
            opacity: 1;
            background: @infoBackgroundColor;
            text-align: left;
            .title {
              margin: 10px 0 15px;
              font-size: 20px;
            }
            .work-time {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .post {
              font-size: 16px;
              margin-bottom: 10px;
            }
            .tech {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .desc {
              font-size: 16px;
              &::before {
                display: inline-block;
                width: 8px;
                height: 8px;
                margin-right: 5px;
                line-height: 16px;
                border-radius: 50%;
                background: @listItemIconColor;
                content: '';
              }
              &:hover {
                &::before {
                  animation: diffuseEffect 1s ease-in-out
                }
              }
            }
          }
        }
      }
    }
  }
@media (max-width: 767px) {
  .experience-wrap{
    background: @baseBGColor url('../../assets/bg.png') repeat !important;
    height: auto;
    .experience-content {
      height: auto;
      padding-bottom: 30px;
      background-color: transparent;
      &>.title {
        margin:0 0 25px;
        padding: 0;
        font-size: 20px;
        background: rgba(0,0,0,.2);
      }
      .row {
        .exp-list {
          transform: translate3d(0,-20px, 0);
          .years {
            transform: scale(.7);
            .ball {
              display: block;
              opacity: 1;
              transition: opacity 1s ease-in-out;
              animation-name: ballRotateEffect-160-X, ballRotateEffect-160-Y;
              animation-duration: 8s,8s;
              animation-timing-function: cubic-bezier(.36,0,.64,1) ,cubic-bezier(.36,0,.64,1) ;
              animation-iteration-count: infinite,infinite;
              animation-direction: alternate,alternate;
              animation-fill-mode: initial,initial;
            }
          }
          .months {
            height: 0;
            margin-top: 10px;
            &::before {
              display: none;
            }
            &::after {
              transform: scale(.7) translate3d(-44px, 39px, 0);
            }
            .month {
              display: inline-block;
              .text {
                margin: 0 5px;
              }
            }
          }
        }
        .content-wrap{
          margin-top: 20px;
          width: 100%;
          height: auto;
          overflow: hidden;
          .content {
            position:initial;
            width: 100%;
            right: 0;
            margin: 15px 0;
            line-height: 16px;
            .title {
              margin: 5px 0 7px;
              font-size: 14px;
            }
            .work-time {
              font-size: 7px;
              margin-bottom: 10px;
            }
            .post {
              font-size: 8px;
              margin-bottom: 10px;
            }
            .tech {
              font-size: 7px;
              margin-bottom: 10px;
            }
            .desc {
              font-size: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
