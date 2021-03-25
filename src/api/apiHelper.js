import request from "./ajax";
// import qs from "qs";
import { Toast } from 'vant'
// import vueCookies from "vue-cookies"
import { storage,browserInfo } from '@/utils/utils'

export default function requestHelper(url, method, data, openJsonParams) {
    return new Promise((resolve, reject) => {
        const transformRequest = openJsonParams ? [
            function(data, headers) {
                headers["Content-Type"] = "application/json";
                return data;
            }
        ] : null;
        let params;
        // if(localStorage.getItem('apiType') == 1){
        //     url = url.indexOf('/robotApi') > -1 ? url : url.replace('/robot','/robotApi');
        // }
        switch (method) {
            case "get":
                params = {
                    url: url,
                    method: method,
                    params: data
                };
                break;
            case "post":
                let browser = browserInfo();
                // let option = `token=${storage.get('token')}&app=${process.env.VUE_APP_CURRENTMODE == 'debug'?5:(browser.kernel.android?1:browser.kernel.ios?2:5)}&device=${storage.get('robotInfo')?storage.get('robotInfo').deviceId:''}&deviceId=${storage.get('robotInfo')?storage.get('robotInfo').deviceId:''}`;
                params = {
                    // url: `${url.indexOf('?')>-1?url+'&'+option:url+'?'+option}`,
                    url: url,
                    method: method,
                    data: openJsonParams ? JSON.stringify(data) : qs.stringify(data),
                    // data: data,
                    transformRequest: transformRequest
                };
                break;
            case "put":
                params = openJsonParams ? {
                    url: url,
                    method: method,
                    data: JSON.stringify(data),
                    transformRequest: transformRequest
                } : { url: url, method: method, params: data };
                break;
            case "delete":
                params = openJsonParams ? {
                    url: url,
                    method: method,
                    data: JSON.stringify(data),
                    transformRequest: transformRequest
                } : { url: url, method: method, params: data };
                break;
        }
        request(params).then(response => {
            if(!storage.get('longQuest','session')) Toast.clear();
            resolve(response);
        }).catch(error => {
            if(!storage.get('longQuest','session')) Toast.clear();
            reject(error);
        });
    });
}