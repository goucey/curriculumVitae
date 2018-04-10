<template>
<div class="contact-way-wrap">
  <ul class="contact-list">
    <li class="contacts-item" v-for="(item,index) in myInfo.info.contactInfo" :key="index" :data-site="item.tooltip" >
      <a :href="item.path">
        <img v-if="item.tooltipImg" width="100" height="100" :src="item.tooltipImg" :alt="item.tooltip">
        <span :class="item.iconClass"></span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  name: 'contactWay',
  props: {
    myInfo: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.contact-way-wrap {
  padding: 0 10px;
  .contact-list {
    font-size: 0;
    .contacts-item {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin: 0 5px;
      font-size: 18px;
      border-radius: 50%;
      text-align: center;
      background: @contact-bgColor;
      color: @fontColor;
      &:hover {
        &::before {
          position: absolute;
          display: inline-block;
          top: -40px;
          left: 50%;
          padding: 0 10px;
          font-size: 12px;
          transform: translate3d(-50%,0,0);
          white-space: nowrap;
          background: @contact-bgColor;
          color: bisque;
          border-radius: 5px;
          content: attr(data-site)
        }
        &::after {
          position: absolute;
          top: -10px;
          left: 50%;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          transform: translate3d(-50%,0,0);
          border-bottom: none;
          border-top-color: @contact-bgColor;
          content: '';
        }
        img {
          position: absolute;
          display: block;
          top: -110px;
          left: 50%;
          padding: 5px;
          font-size: 12px;
          transform: translate3d(-50%,0,0);
          white-space: nowrap;
          background: @contact-bgColor;
          color: bisque;
          border-radius: 5px;
        }
      }
      a {
        display: block;
        img {
          display: none;
        }
        span {
          color: @fontColor;
          &.icon-email {
            display: inline-block;
            margin-top: 5px;
            //  line-height: 32px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
