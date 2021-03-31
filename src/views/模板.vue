<template>
    <div class="html">
        <van-pull-refresh v-model="pullRefreshing" @refresh="onRefresh">
            <div class="body">
                
            </div>
        </van-pull-refresh>
        <van-overlay :show="showTask" z-index="999" @click="showTask=false">
            <div class="taskBody">
                
            </div>
        </van-overlay>
    </div>
</template>

<script>
    // import { storage,dateFormat } from '@u/utils.js'
    // import { login,exit,checkOnline,getRobotInfo,getAPIType } from "@p/index.js"
    let _this;
    export default {
        name: '',
        components: {},
        data() {
            return {
                ossUrl: this.$ossUrl,
                pullRefreshing: false,//下拉刷新进行中
                showTask: false//显示扫码弹层
            }
        },
        mounted() {
            _this = this;
        },
        methods: {
            onRefresh: function(){
                setTimeout(()=>{
                    this.pullRefreshing = false;
                },1000);
            }
        }
  }
</script>
<style scoped lang="scss">
    .body{
        padding: .16rem .24rem;
    }
    .taskBody{
            display: flex;align-items: center;justify-content: center;height: 100%;
    }
</style>
