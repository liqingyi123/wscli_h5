<template>
  <div class="__header" :style="{height:height+'px',backgroundColor:bgColor}" >
    <img class="__backBtn" src="../../assets/icon/backBtn.png" @click="goBack">
    <div :style="{color:tColor,fonteight:tWeight,fontSize:tSize+'px'}">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: 'pageHeader',
    props: {
      title: {//标题文字
        type: String,
        required: true
      },
      height: {//标题高度
        type: [String,Number],
        default: 50
      },
      bgColor: {//标题背景色
        type: String,
        default: 'transparent'
      },
      tColor: {//标题颜色
        type: String,
        default: '#303030'
      },
      tWeight: {//标题颜色
        type: String,
        default: 'normal'
      },
      tSize: {//标题字号
        type: [String,Number],
        default: 16
      }
    },
    data () {
      return {

      }
    },
    methods: {
      goBack: function(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="scss">
  .__header{
    width: 100%;position: relative;display: flex;flex-direction: row;align-items: center;justify-content: center;background-color: transparent;
  }
  .__backBtn{
    position: absolute;left: 5px;width: 25px;height: 25px;
  }
</style>
