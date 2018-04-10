<template>
<div class="contact-wrap" :style="{backgroundImage:`url(${contact.backgroundImage})`}">
  <div class="contact-content">
    <h2 class="title">{{contact.name}}</h2>
    <div class="container">
      <div class="row">
        <div class="content">
          <div class="tags">
            <span class="tag" v-for="item in contact.tags" :key="item">{{item}}</span>
          </div>
            <div class="infos">
              <p class="text" v-for="item in contact.list" :key="item">{{item}}</p>
            </div>
            <div>
              <contactWay class="hidden-xs" :myInfo="myInfo"></contactWay>
            </div>
        </div>
        <div class="sohuCS-wrap" ref="sohuCSWrap">
          <div class="title">联系我</div>
          <div class="clear-btn hidden-xs" @click="clearSohuCS">关闭</div>
          <sohuCS></sohuCS>
        </div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</div>
</template>

<script>
import sohuCS from '../../components/SOHUCS/sohuCS'
import contactWay from '../../components/contactWay/contactWay'
import footer from '../../components/footer/footer'
export default {
  name: 'contact',
  data () {
    return {
      isClear: true
    }
  },
  props: {
    contact: {
      type: Object
    },
    myInfo: {
      type: Object
    }
  },
  components: {
    sohuCS,
    contactWay,
    'v-footer': footer
  },
  methods: {
    clearSohuCS (even) {
      let height = document.body.clientHeight + 10
      let scs = this.$refs.sohuCSWrap
      scs.style.transform = `translate3d(0,${height}px,0)`
      setTimeout(() => {
        scs.style.display = 'none'
      }, 500)
      this.isClear = true
    },
    showSohuCS () {
      if (this.isClear) {
        let scs = this.$refs.sohuCSWrap
        let height = document.body.clientHeight + 10
        scs.style.transform = `translate3d(0,${height}px,0)`
        scs.style.display = 'block'
        this.isClear = false
        setTimeout(() => {
          scs.style.transform = `translate3d(0,0,0)`
        }, 50)
      } else {
        this.clearSohuCS()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.contact-wrap {
  width: 100%;
  height: 100%;
  .bgImageStyle();
  .contact-content {
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
      .content {
        .tags {
          font-size: 0;
          .tag {
            display: inline-block;
            font-size: 25px;
            margin: 10px 10px 30px;
            &:nth-child(1) {
              color: rgb(227,114,60);
            }
            &:nth-child(2) {
              color: rgb(132,200,0);
            }
            &:nth-child(3) {
              color: rgb(51,204,255);
            }
            &:nth-child(4) {
              color: rgb(144,137,107);
            }
          }
        }
         .infos {
           margin-bottom: 50px;
            .text {
              margin: 20px 0;
              line-height: 24px;
              font-size: 18px;
            }
          }
      }
      .sohuCS-wrap {
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 60px 20px;
        padding-bottom: 50px;
         background: #f5f5f5;
        //  max-height: 300px;
         overflow-y: scroll;
         z-index: 8888;
         transition: .5s ease-in-out;
        .title {
          font-size: 20px;
          color: #000;
        }
        .clear-btn {
          position: absolute;
          top: 40px;
          right: 40px;
          width: 60px;
          height: 40px;
          line-height: 40px;
          border-radius: 10px;
          border: 1px solid @contact-borderColor;
          text-align: center;
          // background: #fff;
          color: @contact-btnFontColor;
          transition: 1s ease-in-out;
          cursor: pointer;
          &:hover {
            background: #fff;
          }
        }
      }
    }
  }

}
@media (max-width:767px) {
  .contact-wrap {
    background: @baseBGColor url('../../assets/bg.png') repeat !important;
    .contact-content {
      background-color: transparent;
      &>.title {
        margin:0 0 20px;
        padding: 0;
        font-size: 20px;
        background: rgba(0,0,0,.2);
      }
      .row {
        .sohuCS-wrap {
          top: 60px;
           padding: 20px 20px;
          padding-bottom: 50px;
          z-index: 777;
        }
      }
    }
  }
}
</style>
