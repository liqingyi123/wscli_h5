import axios from 'axios'
import qs from "qs";
import { Notify,Toast } from 'vant'
import router from '@/router/index'
import signature from '@/utils/sign'
import { unicodeToCh,browserInfo,storage } from '@/utils/utils'

// const apiUrl = 'http://wuse.private.bangtk.com:1002' // 测试环境
// const apiUrl = 'https://wsonline.bangtk.com' //正式环境
// const apiUrl = "http://192.168.1.216:8080" //本地环境
// const apiUrl = "http://8b52179d7edd.ngrok.io" //本地环境

const service = axios.create({
    // baseURL: apiUrl, // api的base_url
    timeout: 600000, // 请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        token: storage.get('token')
    }
});
let browser = browserInfo();
let sign = signature.signature();
// request拦截器
service.interceptors.request.use(
    config => {
        let data = config.params || config.data;
        Object.assign(data,sign,{
            token: storage.get('token'),
            device: storage.get('robotInfo') ? storage.get('robotInfo').deviceId : '',
            deviceId: storage.get('robotInfo') ? storage.get('robotInfo').deviceId : '',
            app: process.env.VUE_APP_CURRENTMODE == 'debug' ? 5 : (browser.kernel.android?1:browser.kernel.ios?2:5)
            // app: browser.kernel.android?1:browser.kernel.ios?2:5
        });
        // if(config.method  === 'post'){
        //     config.data = qs.stringify(data)
        // }
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
            return Promise.reject(res);
        }else if(res.code == 551099){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || '系统繁忙，请重试。',
                duration: 3000
            });
            return Promise.reject(res);
        }else if(res.code == 6006 || res.code == 6007){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || 'Warn',
                duration: 3000
            });
            return Promise.reject(res);
        }else if(res.code == 20001){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || 'Warn',
                duration: 3000
            });
            return Promise.reject(res);
        }else if(res.code == 500){
            Notify({
                type: 'warning', 
                message: res.message || res.msg || '服务器内部错误',
                duration: 3000
            });
            return Promise.reject(res);
        }else {
            let msg = res.msg || res.message;
            if(msg != 'SUCCESS'){
                Notify({
                    type: 'warning', 
                    message: res.message || res.msg,
                    duration: 3000
                });
            }
            // Notify({
            //     type: 'danger', 
            //     message: res.message ? unicodeToCh(res.message) : res.msg ? unicodeToCh(res.msg) : 'danger',
            //     duration: 3000
            // });
            // return Promise.resolve(false);
            return res;
        }
    },
    error => {
        if(error.message.indexOf(401) > -1){
            Notify({
                type: 'danger', 
                message: 'token过期，请重新进入页面',
                duration: 3000
            });
            return Promise.reject(error);
        }else if(error.message.indexOf(404) > -1) {
            Notify({
                type: 'danger', 
                message: '请求的资源不存在',
                duration: 3000
            });
            return Promise.reject(error);
        }
        else if(error.message.indexOf(500) > -1){
            Notify({
                type: 'danger', 
                message: error.message || '服务器内部错误',
                duration: 3000
            });
            return Promise.reject(false);
        }
        else if(error.message.indexOf(502) > -1){
            Notify({
                type: 'danger', 
                message: '502 网关错误',
                duration: 3000
            });
            return Promise.reject(false);
        }
        else{
            Notify({ 
                type: 'danger', 
                message: error.message || '请求发生错误',
                duration: 3000
            });
            return Promise.reject(error);
        }
    }
);

export default service;
