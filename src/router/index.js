import Vue from 'vue'
import VueRouter from 'vue-router'
import vueCookies from "vue-cookies"
import { Dialog } from 'vant'
import setting from '../../setting.js'
Vue.use(VueRouter)
//获取原型对象上的push函数..屏蔽路由重复报错
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//自动化路由管理
//需要满足之后的子路由配置文件都在/src/router/child里面创建
// 自动导入子路由配置文件.js
let routes = [];
(modules => modules.keys().forEach((key) => {
    routes = routes.concat(modules(key).default);
}))(require.context('./child/', true, /\.js$/));
// console.log(routes)
const router = new VueRouter({
    routes
})
//路由守卫
router.beforeEach((to, from, next)  => {
    document.title = to.matched[0].meta.title || setting.favName
    if(to.name == "Home" || to.name == "About"){ // 如果不需要权限校验，直接进入路由界面
        next();
    }else{
        if (vueCookies.get('token')) {  // 获取当前的token是否存在
            next();
        } else {
            Dialog.alert({
                title: '错误',
                message: 'token缺失'
            }).then(()=>{
                let token = _dsbridge.call("getToken",JSON.stringify({
                    _dscbstub: 'abc'
                }))
                console.log('呼叫APP重新给token',token,typeof token)
                token = JSON.parse(token).result;
                vueCookies.set('token',token)
                console.log('重新设置token',token)
                _dsbridge.call("getToken",'',(res)=>{
                    console.log('呼叫APP重新给token',res)
                    vueCookies.set('token',res)
                    next();
                });
                // next({
                //     path: '/', // 将跳转的路由path作为参数，登录成功后计划跳转到该路由
                //     query: {redirect: to.fullPath}
                // })
            })
        }
    }
});
export default router;
