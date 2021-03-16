<template>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <keep-alive :include="this.$storage.get('signBack')!='hasSign'?['shopHome','collectList']:['shopHome']">
        <router-view></router-view>
    </keep-alive>
    <!-- <router-view></router-view> -->
</template>

<style lang="scss">
    html,body{
        -webkit-text-size-adjust:none;
        //-webkit-text-size-adjust:auto !important;
    }
    html{font-size: 50px;}
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;margin: 0;padding: 0;
    }
    #nav {
        padding: .6rem;
        a {
            font-weight: bold;color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    body{
        background-color: #F8F8F8;font-size: .32rem;color: #303030;
    }
    *{
        padding: 0;margin: 0;box-sizing: border-box;
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
        .body{
            position: relative;width: 100%;min-height: 100vh;background-color: #F8F8F8;
        }
    }
</style>
