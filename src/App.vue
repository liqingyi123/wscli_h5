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
    /* 适配小黑条
    使用 @supports 来隔离兼容样式，当浏览器支持bottom: constant(safe-area-inset-bottom)或者bottom: env(safe-area-inset-bottom)的时候，safeBottom类就会新增padding-bottom的样式
    <div class="safeBottom"></div>
    */
    @supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) { 
    	.safeBottom,.body{
        /*兼容 IOS<11.2*/
        padding-bottom: constant(safe-area-inset-bottom);
        /*兼容 IOS>11.2*/
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
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
    video::-webkit-media-controls-fullscreen-button {
        display: none;
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
    @keyframes drawer_fromTop{
        0%{
            transform: scale(0) translateY(-100vh);opacity: 0;z-index: -1;
        }
        100%{
            transform: scale(1) translateY(0);opacity: 1;z-index: 100;
        }
    }
    @keyframes drawer_toTop{
        0%{
            transform: scale(1) translateY(0);opacity: 1;z-index: 100;
        }
        100%{
            transform: scale(0) translateY(-100vh);opacity: 0;z-index: -1;
        }
    }
    @keyframes drawer_fromBottom{
        0%{
            transform: scale(0) translateY(100vh);opacity: 0;z-index: -1;
        }
        100%{
            transform: scale(1) translateY(0);opacity: 1;z-index: 100;
        }
    }
    @keyframes drawer_toBottom{
        0%{
            transform: scale(1) translateY(0);opacity: 1;z-index: 100;
        }
        100%{
            transform: scale(0) translateY(100vh);opacity: 0;z-index: -1;
        }
    }
    .drawer-left-enter{
        animation: drawer_fromTop .5s linear 0s 1;
    }
    .drawer-right-enter{
        animation: drawer_fromBottom .5s linear 0s 1;
    }
    .drawer-left-leave-to{
        animation: drawer_toTop .5s linear 0s 1;
    }
    .drawer-right-leave-to{
        animation: drawer_toBottom .5s linear 0s 1;
    }
    .drawer-left-enter,.drawer-right-leave-to,.drawer-left-leave-to,.drawer-right-enter{
        position: absolute;
    }
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
    //特殊效果
    .GCfont{
        background-image:-webkit-linear-gradient(top,#4CBAF4,#27D5DE,#3BF3E9); /*为文本元素提供渐变背景*/
        -webkit-background-clip:text; /*使用透明颜色填充文本*/
        -webkit-text-fill-color:transparent;/*用文本剪辑背景，用渐变背景作为颜色填充文本*/
    }
    /* ************************************************************
     @ 提供公用的默认和鼠标移入移出动画
     @ 使用时直接引用class名字即可,例如class = "linkhover"
     @ distantAndNear 忽远忽近特效\swing 左右摇摆特效\halo 光晕特效\breathLamp 呼吸灯特效\flip 翻转特效\ronate 旋转特效\jump 跳跃特效\beat 跳动特效\fadeIn 淡入特效
     *************************************************************/
    /* 鼠标移上去延时放大1.1倍 */
    .linkhover{transition: all .5s;}
    .linkhover:hover{transform: scale(1.1);}
    /* 翻转特效 */
    .flip:hover{-webkit-animation:flip .6s linear 0s 1;}
    .flip_default{-webkit-animation:flip 2s linear infinite;}
    /* 淡入特效 */
    .fadeIn:hover,.fadeIn_default{-webkit-animation:fadeIn .5s linear 0s 1;}
    .fadeAway:hover,.fadeAway_default{-webkit-animation:fadeAway .5s linear 0s 1;}
    /* 跳动特效 */
    .beat_default,.beat:hover{-webkit-animation: beat 2s linear infinite;}
    /* 呼吸灯特效 */
    .breathLamp_default_2s,.breathLamp_2s:hover{-webkit-animation: breathLamp 2s linear infinite;}
    .breathLamp_default_1s,.breathLamp_1s:hover{-webkit-animation: breathLamp 1s linear infinite;}
    /* 旋转特效 */
    .ronate_default{-webkit-animation: ronate .5s linear infinite;}
    .ronate:hover{-webkit-animation: ronate .3s linear 0s 1;}
    /* 跳跃特效 */
    .jump:hover{-webkit-animation: jump .6s linear 0s 1;}
    /* 忽远忽近特效 */
    .distantAndNear_default:hover{-webkit-animation:distantAndNear 1s linear 0s infinite;}
    .distantAndNear:hover{-webkit-animation:distantAndNear 0.5s linear 0s 1;}
    /* 左右摇摆特效 */
    .swing:hover{-webkit-animation:swing 1s linear 0s infinite;}
    /* 光晕特效 */
    .halo_default,.halo:hover,.halo:focus{-webkit-animation:halo 2s linear 0s infinite;}
    .moveAppear{
    	-webkit-animation:moveappear .3s linear 0s 1;
    	animation-fill-mode: forwards; /*让动画停留在最后一帧 */
        -moz-animation-fill-mode: forwards; 
        -webkit-animation-fill-mode: forwards; 
        -o-animation-fill-mode: forwards;
    }
    .setAppear{-webkit-animation:appear .3s linear 0s 1;}
    .ryTxt{-webkit-animation: RY .8s linear infinite;}
    @keyframes RY{
        0%{
            background-image:-webkit-linear-gradient(right,#E8051F,#FF4000,#F66900,#DB6005,#EF8435,#F2A166,#F3C305);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        14%{
            background-image:-webkit-linear-gradient(right,#FF4000,#F66900,#DB6005,#EF8435,#F2A166,#F3C305,#E8051F);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        28%{
            background-image:-webkit-linear-gradient(right,#F66900,#DB6005,#EF8435,#F2A166,#F3C305,#E8051F,#FF4000);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        42%{
            background-image:-webkit-linear-gradient(right,#DB6005,#EF8435,#F2A166,#F3C305,#E8051F,#FF4000,#F66900);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        56%{
            background-image:-webkit-linear-gradient(right,#EF8435,#F2A166,#F3C305,#E8051F,#FF4000,#F66900,#DB6005);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        70%{
            background-image:-webkit-linear-gradient(right,#F2A166,#F3C305,#E8051F,#FF4000,#F66900,#DB6005,#EF8435);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        84%{
            background-image:-webkit-linear-gradient(right,#F3C305,#E8051F,#FF4000,#F66900,#DB6005,#EF8435,#F2A166);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
        100%{
            background-image:-webkit-linear-gradient(right,#E8051F,#FF4000,#F66900,#DB6005,#EF8435,#F2A166,#F3C305);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
    }
    @-webkit-keyframes distantAndNear{/* 忽远忽近特效 */
    	0%{transform: scale(1);-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);}
    	50%{transform: scale(1.2);-webkit-transform:scale(1.2);-moz-transform:scale(1.2);-o-transform:scale(1.2);}
    	100%{transform: scale(1);-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1); }
    }
    @-webkit-keyframes swing{/* 左右摇摆特效 */
    	0%{transform: rotate(0);-webkit-transform:rotate(0); -moz-transform:rotate(0); -o-transform:rotate(0); }
    	25%{transform: rotate(5deg);-webkit-transform:rotate(5deg); -moz-transform:rotate(5deg); -o-transform:rotate(5deg); }
    	50%{transform: rotate(0);-webkit-transform:rotate(0); -moz-transform:rotate(0); -o-transform:rotate(0); }
    	75%{transform: rotate(-5deg);-webkit-transform:rotate(-5deg); -moz-transform:rotate(-5deg); -o-transform:rotate(-5deg);}
    	100%{transform: rotate(0);-webkit-transform:rotate(0); -moz-transform:rotate(0); -o-transform:rotate(0); }
    }
    @-webkit-keyframes halo{/* 光晕特效 */
    	0%{box-shadow:none;}
    	25%{box-shadow:0 0px 10px white, 0 0 10px white, 0 0 10px white;}
    	50%{box-shadow:0 0px 20px white, 0 0 20px white, 0 0 20px white;}
    	75%{box-shadow:0 0px 10px white, 0 0 10px white, 0 0 10px white;}
    	100%{box-shadow:none;}
    }
    @-webkit-keyframes breathLamp{/* 呼吸灯特效*/
        0%{opacity: 1;}
        25%{opacity: 0.8;}
        50%{opacity: 0.4;}
        75%{opacity: 0.8;}
        100%{pacity: 1;}
    }
    @-webkit-keyframes flip {/* 翻转特效 */
    	0% {-webkit-transform: rotateY(0deg);}
        100% {-webkit-transform: rotateY(-360deg);}
    }
    @-webkit-keyframes ronate {/* 旋转特效 */
    	0% {-webkit-transform: rotate(0deg);}
        100% {-webkit-transform: rotate(360deg);}
    }
    @-webkit-keyframes jump{/* 跳跃特效 */
        0%{transform: rotateX(-30deg);}/* 先压扁起跳 */
        40%{transform: rotateX(0deg);}/* 然后回弹升高 */
        60%{transform: translateY(-15px);}/* 跳到最高点 */
        80%{transform: rotateX(-30deg) translateY(0px);}/* 落地再次压扁 */
        100%{transform: rotateX(0deg);}/* 恢复原状 */
    }
    @-webkit-keyframes beat{/* 跳动特效 */
        0%{transform: translateY(0px);}
        25%{transform: translateY(-15px);}
        50%{transform: translateY(0px);}
        75%{transform: translateY(15px);}
        100%{transform: translateY(0px);}
    }
    @-webkit-keyframes fadeIn {/* 淡入特效 */
        0% {opacity: 0;}
        50% {opacity: 0.5;}
        100% {opacity: 1;}
    }
    @-webkit-keyframes fadeAway {/* 淡出特效 */
        0% {opacity: 1;}
        50% {opacity: 0.5;}
        100% {opacity: 0;}
    }
    @keyframes switch {
        0% { opacity: 0;filter: blur(20px); transform:scale(12)}
        3% { opacity: 1;filter: blur(0); transform:scale(1)}
        10% { opacity: 1;filter: blur(0); transform:scale(.9)}
        13% { opacity: 0;filter: blur(10px); transform:scale(.1)}
        80% { opacity: 0}
        100% { opacity: 0}
    }
    @-webkit-keyframes appear{
    	0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0); }
    	50%{-webkit-transform:scale(0.5);-moz-transform:scale(0.5);-o-transform:scale(0.5);}
    	100%{-webkit-transform:scale(1); -moz-transform:scale(1); -o-transform:scale(1);}
    }
    @-webkit-keyframes moveappear{
    	0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);}
    	50%{-webkit-transform:scale(0.5); -moz-transform:scale(0.5); -o-transform:scale(0.5);}
    	100%{-webkit-transform:scale(0);-moz-transform:scale(0); -o-transform:scale(0); }
    }
</style>
