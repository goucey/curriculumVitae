<template>
<div class="skills-wrap" :style="{backgroundImage:`url(${skills.backgroundImage})`}">
  <div class="skills-content">
    <h2 class="title">{{skills.name}}</h2>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-sx-12">
          <div class="skills-list-main">
            <ul class="skills-list" ref="skillList">
              <li class="skills-item" v-for="(item,index) in skills.list" :key="index" :style="{backgroundColor: item.color,'animation-delay': `${-(index*1.34+4)}s,${-(index*1.34)}s` }" :data-name="item.name" >{{item.name}}</li>
            </ul>
            <div ref="ball" class="ball">
                <div class="inner inner-hook"></div>
            </div>
          </div>
        </div>
        <div class="desc-wrap col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <p class="desc hidden-xs" v-for="(desc, descIndex) in skills.descList" :key="descIndex" >{{descIndex+1}}?{{desc}}</p>
            <p class="desc hidden-sm hidden-md hidden-lg" v-for="item in skills.briefDescList" :key="item" >{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'skills',
  data () {
    return {
      timer: null,
      skellPointLeft: [],
      skillsIndex: -1,
      isAdd: true
    }
  },
  props: {
    skills: {
      type: Object
    }
  },
  methods: {
    _getSkillPiontLeft () {
      let list = this.$refs.skillList.children
      for (let i = 0; i < list.length; i++) {
        let poin1 = {left: list[i].offsetLeft + 12.5, top: -20}
        let _top = ((this.$refs.skillList.parentElement.clientHeight - 20) / 100) * this.skills.list[i].master
        this.skellPointLeft.push(poin1)
        let poin = {left: list[i].offsetLeft + 12.5, top: -_top}
        this.skellPointLeft.push(poin)
      }
    },
    _ainimate () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.skillsIndex >= this.skellPointLeft.length - 2) {
          this.isAdd = false
        }
        if (this.skillsIndex <= 0) {
          this.isAdd = true
        }
        console.log(this.skillsIndex, this.skellPointLeft.length)
        if (this.isAdd) {
          this.skillsIndex++
        } else {
          this.skillsIndex--
        }
        let [x, y] = [this.skellPointLeft[this.skillsIndex].left, this.skellPointLeft[this.skillsIndex].top]

        let ball = this.$refs.ball
        ball.style.webkitTransform = `translate3d(0,${y}px,0)`
        ball.style.transform = `translate3d(0,${y}px,0)`
        let inner = ball.querySelector('.inner-hook')
        inner.style.webkitTransform = `translate3d(${x}px,0,0)`
        inner.style.transform = `translate3d(${x}px,0,0)`
      }, 1000)
    }
  },
  mounted () {
    // this._getSkillPiontLeft()
    // this._ainimate()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.skills-wrap {
  width: 100%;
  height: 100%;
  transition: 3s ease-in-out;
  .bgImageStyle();
  .skills-content {
    height: 100%;
    background: @coverLayerColor;
    color: @fontColor;
    .title {
      padding:100px 0 30px;
      line-height: 48px;
      font-size: 24px;
      text-align: center;
    }
    .row {
      margin: 0 auto;
      // max-width: 1100px;
      .skills-list-main {
        position: relative;
         height: 380px;
        .skills-list {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          font-size: 0;
          // background: #666;
          text-align: center;
          border: 2px dashed @borderColor;

          .skills-item {
            position: absolute;
            height: 50px;
            width: 50px;
            line-height: 50px;
            font-size: 10px;
            border-radius: 50%;
            animation-name: ballRotateEffectX, ballRotateEffectY;
            animation-duration: 8s,8s;
            animation-timing-function: cubic-bezier(.36,0,.64,1) ,cubic-bezier(.36,0,.64,1) ;
            animation-iteration-count: infinite,infinite;
            animation-direction: alternate,alternate;
            animation-fill-mode: initial,initial;
          }
        }
        // .ball {
        //   position: absolute;
        //   left: 0;
        //   bottom: 0;
        //   transition: all 1s cubic-bezier(0.36, 0, 0.64, 1);
        //   .inner {
        //     width: 10px;
        //     height: 10px;
        //     background: #f00;
        //     border-radius: 50%;
        //     transition: all 1s linear;
        //   }
        // }
      }
      .desc-wrap {
         margin-top: 60px;
        .desc {
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 14px;
          text-indent: 2em;
          font-weight: normal;
          transition: .3s ease-in-out;
          &:hover {
            transform: translate3d(5px,0,0);
          }
        }
      }
    }
    // max-width: 800px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .skills-content {
      .row {
        .desc-wrap {
          margin-top: 0;
        }
      }
    }
  }
}

  @media (max-width: 767px) {
    .skills-wrap {
      height: auto;
      background: @baseBGColor url('../../assets/bg.png') repeat !important;
    .skills-content {
      height: auto;
      padding-bottom: 30px;
      background-color: transparent;
      .title {
        margin:0 0 25px;
        padding: 0;
        font-size: 20px;
        background: rgba(0,0,0,.2);
      }
      .row {
        .skills-list-main {
          position: relative;
          height: 200px;
          .skills-list {
          transform: scale(.9) translate3d(0,30px,0);
          }
          // .ball {
          //   position: absolute;
          //   left: 0;
          //   bottom: 0;
          //   transition: all 1s cubic-bezier(0.36, 0, 0.64, 1);
          //   .inner {
          //     width: 10px;
          //     height: 10px;
          //     background: #f00;
          //     border-radius: 50%;
          //     transition: all 1s linear;
          //   }
          // }
        }
        .desc-wrap {
           margin-top: 80px;
          .desc {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 14px;
            text-indent: 2em;
            font-weight: normal;
            transition: .3s ease-in-out;
            &:hover {
              transform: translate3d(5px,0,0);
            }
          }
        }
      }
    }
    }
  }
</style>
