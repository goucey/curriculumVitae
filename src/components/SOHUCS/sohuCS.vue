<template>
<div id="SOHUCS" sid="1205" >
</div>
</template>

<script>
const appid = 'cyty8isKN'
const conf = 'prod_d7534bb11c8d042204a2f5fc19eeaf82'
const width = window.innerWidth || document.documentElement.clientWidth
export default {
  name: 'SOHUCS',
  methods: {
    loadJs (d, a) {
      let c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
      let b = document.createElement('script')
      b.setAttribute('type', 'text/javascript')
      b.setAttribute('charset', 'UTF-8')
      b.setAttribute('src', d)
      if (typeof a === 'function') {
        if (window.attachEvent) {
          b.onreadystatechange = () => {
            let e = b.readyState
            if (e === 'loaded' || e === 'complete') {
              b.onreadystatechange = null
              a()
            }
          }
        } else {
          b.onload = a
        }
      }
      c.appendChild(b)
    }
  },
  mounted () {
    if (width < 960) {
      let script = document.createElement('script')
      script.setAttribute('id', 'changyan_mobile_js')
      script.setAttribute('charset', 'utf-8')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', `http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=${appid}&conf=${conf}`)
      document.body.appendChild(script)
    } else {
      this.loadJs('http://changyan.sohu.com/upload/changyan.js', () => {
        window.changyan.api.config({
          appid: appid,
          conf: conf
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
