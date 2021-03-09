import axios from 'axios'
import { Notify } from 'vant'
import vueCookies from "vue-cookies"
import router from '@/router/index'
import signature from '@u/sign'
import { unicodeToCh,browserInfo,storage } from '@u/utils'

// const apiUrl = 'http://wuse.private.bangtk.com:1002' // 测试环境
// const apiUrl = 'https://wsonline.bangtk.com' //正式环境
// const apiUrl = "http://192.168.1.216:8080" //本地环境
// const apiUrl = "http://8b52179d7edd.ngrok.io" //本地环境

const service = axios.create({
    // baseURL: apiUrl, // api的base_url
    timeout: 60000, // 请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    }
});

// request拦截器
service.interceptors.request.use(
  config => {
    // token放进请求头和请求体中，后端取哪随便
    let sign = signature.signature();
    let browser = browserInfo();
    // console.log(1111,browser)
    // if (token) config.headers.token = token;
    let data = config.params || config.data;
    Object.assign(data, sign,{
        // token: vueCookies.get('token'),
        // uid: vueCookies.get('uid'),
        // device: vueCookies.get('device'),
        app: browser.kernel.android?1:browser.kernel.ios?2:5
    });
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code == -1) {
            Notify({ 
                type: 'warning', 
                message: res.message ? unicodeToCh(res.message) : res.msg ? unicodeToCh(res.msg) : 'Warn',
                duration: 3000
            });
            return Promise.reject(false);
        }else if(res.code == 551099){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || '系统繁忙，请重试。',
                duration: 3000
            });
            return Promise.reject(false);
        }else if(res.code == 6006 || res.code == 6007 || res.code == 6001){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || 'Warn',
                duration: 3000
            });
            return Promise.reject(false);
        }else if(res.code == 20001){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || 'Warn',
                duration: 3000
            });
            return Promise.reject(false);
        }else{
            return res;
        }
    },
    error => {
        console.log('请求失败',error)
        if(error.status == 401){
            Notify({
                type: 'danger', 
                message: 'token过期，请重新进入页面',
                duration: 3000
            });
        }else if(error.status == 404){
            Notify({
                type: 'danger', 
                message: '请求的资源不存在',
                duration: 3000
            });
        }else if(error.status == 502){
            Notify({
                type: 'danger', 
                message: '502 Bad Gateway',
                duration: 3000
            });
        }else{
            Notify({ 
                type: 'danger', 
                message: error.message || error.msg || 'Error',
                duration: 3000
            });
        }
        return Promise.reject(false);
    }
);

export default service;
