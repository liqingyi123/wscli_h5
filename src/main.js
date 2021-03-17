import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
//引入缓存便捷管理工具并设为属性
import { storage,browserInfo } from './utils/utils.js'
Vue.prototype.$storage = storage
Vue.prototype.$browserInfo = browserInfo()
import setting from '../setting.js'
//引入过滤器集群
import filters from './utils/tofix.js'
Object.keys(filters).forEach(key =>{
    Vue.filter(key,filters[key]);
})
//引入vue-cookies
// import cookies from "vue-cookies"
// Vue.use(cookies)
//引入vant组件
import 'vant/lib/index.css'
import { 
    Toast,//轻提示
    Dialog,//弹出框
    Loading, //加载
    PullRefresh,//下拉刷新
    Lazyload,//懒加载
    Overlay,//遮罩层
    Switch,//开关
    ActionSheet,//动作面板
    Notify,//消息通知
    NoticeBar,//通知栏
    Tab, Tabs,
    Empty,
    List 
} from 'vant'
Toast.setDefaultOptions('loading',{forbidClick: true,duration: 0});
Vue.use(Toast).use(Dialog).use(Loading).use(PullRefresh).use(Lazyload).use(Overlay).use(Switch).use(ActionSheet).use(NoticeBar).use(Tab).use(Tabs).use(Empty).use(List)
// 引入微信sdk
// import wx from 'weixin-js-sdk'
// Vue.prototype.wx = wx
//判断是否开启了控制台
if(setting.deBug) require('./utils/eruda.min.js').init();
Vue.prototype.$ossUrl = 'https://oss.bangtk.com';

//增加页面切换动画
window.addEventListener('popstate',function(e){
    router.isBack = true;
},false)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
