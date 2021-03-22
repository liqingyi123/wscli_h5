<template>
    <transition :name="aName">
        <keep-alive :include="keepPage">
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>
<script>
    import setting from '../setting.js';
    export default {
        name: "App",
        data(){
            return {
                aName: setting.pageChangeEffect+"-right",
                keepPage: ['home','robot','pay','pointSend']
            }
        },
        watch: {
            $route(to,from) {
                // 设置切换动画
                if(this.$router.isBack){
                    this.aName = setting.pageChangeEffect+"-right";
                }else{
                    this.aName = setting.pageChangeEffect+"-left";
                }
                this.$router.isBack = false;
            }
        },
    }
</script>
<style lang="scss">
    html,body{-webkit-text-size-adjust:none;}
    html{font-size: 50px;}
    body{
        background-color: #F8F8F8;font-size: .32rem;color: #303030;
    }
    *{
        padding: 0;margin: 0;box-sizing: border-box;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
    }
    img {
        display: block;margin: 0;font-size: 0;vertical-align: top;height: auto;width: 100%;
    }
    input,button{
        border-style: none;user-select: none;background: transparent;
    }
    /* 布局样式 */
    .f-r {display: flex;flex-direction: row;}
    .f-c {display: flex;flex-direction: column;}
    .f-r-center {display: flex;flex-direction: row;align-items: center;justify-content: center;}
    .f-r-around {display: flex;flex-direction: row;align-items: center;justify-content: space-around;}
    .f-r-between {display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
    .f-c-center {display: flex;flex-direction: column;align-items: center;justify-content: center;}
    .f-r-itemCenter {display: flex;flex-direction: row;align-items: center;}
    .f-c-itemCenter {display: flex;flex-direction: column;align-items: center;}
    .ai-center {align-items: center;}
    .ai-start {align-items: flex-start;}
    .ai-end {align-items: flex-end;}
    .jc-center {justify-content: center;}
    .jc-between {justify-content: space-between;}
    .jc-around {justify-content: space-around;}
    .jc-start {justify-content: flex-start;}
    .jc-end {justify-content: flex-end;}
    .f-w-center{display: flex;flex-wrap: wrap;justify-content: center;}
    .f-w-between{display: flex;flex-wrap: wrap;justify-content: space-between;}
    .f-w-around{display: flex;flex-wrap: wrap;justify-content: space-around;}
    .f-w-left{display: flex;flex-wrap: wrap;justify-content: left;}
    /* 清除浮动 */
    .clearfix:after {
      content: "";display: block;height: 0;clear: both;visibility: hidden;
    }
    .html{
        position: relative;width: 100vw;
    }
    .body{
        position: relative;width: 100%;min-height: 100vh;background-color: #F8F8F8;
    }
    /* 路由切换动画 */
    .funny-left-enter,.funny-right-leave-to {
      opacity: 0;transform: rotate3d(1,1,1,45deg);
    }
    .funny-left-leave-to, .funny-right-enter {
      opacity: 0;transform: rotate3d(0,0,0.5,-45deg);
    }
    .flip-left-enter,.flip-right-leave-to {
      opacity: 0;transform: rotateY(180deg);
    }
    .flip-left-leave-to, .flip-right-enter {
      opacity: 0;transform: rotateY(-180deg);
    }
    .subPanel-left-enter,.subPanel-right-leave-to {
      opacity: 0;transform: translate(100%,100%)
    }
    .subPanel-left-leave-to, .subPanel-right-enter {
      opacity: 0;transform: translate(-100%,-100%)
    }
    .upDown-left-enter,.upDown-right-leave-to {
      opacity: 0;transform: translateY(100%)
    }
    .upDown-left-leave-to, .upDown-right-enter {
      opacity: 0;transform: translateY(-100%)
    }
    .default-left-enter,.default-right-leave-to {
      opacity: 0;transform: translateX(100%)
    }
    .default-left-leave-to, .default-right-enter {
      opacity: 0;transform: translateX(-100%)
    }
    .default-left-enter-active, .default-left-leave-active, .default-right-enter-active, .default-right-leave-active,.funny-left-enter-active, .funny-left-leave-active, .funny-right-enter-active, .funny-right-leave-active,.flip-left-enter-active, .flip-left-leave-active, .flip-right-enter-active, .flip-right-leave-active,.subPanel-left-enter-active, .subPanel-left-leave-active, .subPanel-right-enter-active, .subPanel-right-leave-active,.upDown-left-enter-active, .upDown-left-leave-active, .upDown-right-enter-active, .upDown-right-leave-active{
      transition: .3s;position: absolute;top:0;
    }
</style>
