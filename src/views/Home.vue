<template>
  <div class="home">
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    HelloWorld: resolve=>(require(["@c/HelloWorld.vue"],resolve))
  },
  data() {
      return {
          shareId: '',//邀请码
          sharerInfo: '',
          code: '',
          showVideoTask: false,//显示视频播放弹层
          canReg: true,
          sysConfig: {
              appId: 'wxf551ec1791e7077d',
              backUrl: encodeURIComponent(`https://wsonline.bangtk.com/wsH5/`)
              // backUrl: encodeURIComponent(`https://huidu.wusehaowu.com/wsH5/`)
          }
      }
  },
  mounted() {
    this.$toast.fail('121234') 
  },
  methods: {
      
  }
}
</script>
