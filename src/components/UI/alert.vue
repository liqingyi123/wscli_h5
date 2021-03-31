<template>
    <div class="__alerter f-c-center" :class="[show2?'__show':'__hide']" @click="submitEvent(false)">
        <div class="__body f-c" :class="[align=='left'?'ai-start':align=='right'?'ai-end':'ai-center']">
            <img v-if="showIcon" class="__icon" :src="typeof showIcon == 'string' ? showIcon : `${ossUrl}/robot/icon/active/alertIcon.png`">
            <div v-if="title" class="__title">{{title}}</div>
            <div v-if="content" class="__content" v-html="formatBR(content)"></div>
            <slot></slot>
            <div class="__submit" @click.stop="submitEvent(true)">{{submitTxt}}</div>
            <div v-if="showCancel" class="__cancel" @click.stop="cancelEvent">{{cancelTxt}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'alert',
    props: {
        show: {//是否显示取消按钮
            type: Boolean,
            default: false,
            required: true
        },
        showIcon: {//是否显示头部icon,true-显示默认头像 string-显示自定义头像
            type: [String,Boolean],
            default: true
        },
        title: {//提示标题
            type: String,
            default: ''
        },
        content: {//提示文字，若换行请用\n表示
            type: String,
            default: '',
            required: true
        },
        align: {//内容排列方向
            type: String,
            default: 'center'//left-靠左 center/其他-居中 right-靠右
        },
        submitTxt: {//确认按钮文字
            type: String,
            default: '我知道了'
        },
        submitStyle: {//确认按钮自定义样式
            type: String,
            default: ''
        },
        showCancel: {//是否显示取消按钮
            type: Boolean,
            default: false
        },
        cancelTxt: {//取消按钮文字
            type: String,
            default: '取消'
        }
    },
    data () {
        return {
            ossUrl: this.$ossUrl,
            show2: this.show
        }
    },
    watch:{
        show: function(newVal,oldVal){
            this.show2 = newVal
        }
    },
    methods: {
        formatBR: function(val){
            let value = JSON.stringify(val);
            value = value.substring(1,value.length-1)
            return value.replace(/\\\\n/g,'<br/>');
        },
        submitEvent: function(type){
            this.show2 = false;
            this.$emit('submit',type)
        },
        cancelEvent: function(){
            this.show2 = false;
            this.$emit('cancel')
        }
    }
  }
</script>

<style scoped lang="scss">
    .__show{
        opacity: 1;z-index: 9999;transition: all .5s;
    }
    .__hide{
        opacity: 0;z-index: -1;transition: all .5s;
    }
    .__alerter{
        position: fixed;width: 100vw;height: 100vh;top: 0;left: 0;background-color: rgba(0,0,0,.7);
        .__body{
            position: relative;width: 5.68rem;background-color: #FFFFFF;border-radius: .36rem;padding: .45rem .3rem;
            .__icon{
                position: absolute;width: 1.9rem;height: 1.9rem;top: -.95rem;
            }
            .__title{
                width: 4.2rem;line-height: .5rem;font-size: .36rem;color: #333333;font-weight: 550;margin-top: .09rem;text-align: center;
            }
            .__content{
                margin-top: 1.16rem;color: #606060;width: 4.2rem;text-align: center;font-size: .3rem;line-height: .42rem;white-space: pre-line;
            }
            .__submit{
                width: 4.2rem;height: .86rem;border-radius: .43rem;text-align: center;line-height: .86rem;background: linear-gradient(180deg, #FF4D98 0%, #FF1C62 46%, #FF2D55 100%);color: #FFFFFF;font-size: .3rem;margin-top: .47rem;
            }
            .__cancel{
                text-align: center;margin-top: .38rem;font-size: .3rem;color: #606060;line-height: .42rem;
            }
        }
    }
</style>
