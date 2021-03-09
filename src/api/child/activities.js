import requestHelper from "../apiHelper.js";
import setting from "../../../setting.js";
const apiUrl = setting.apiUrl;
const methodGet = "get";
const methodPost = "post";
const methodPut = "put";
const methodDelete = "delete";
// 和活动有关的接口
export default {
    /* ******** 注册页 **********/
    // 注册
    abc: function(params){
        // code//公众号网页授权code
        // appKey//公众号appid
        // shareMcode//邀请码
        // app是
        const url = apiUrl + "/user/login/hFiveLogin";
        return requestHelper(url, methodGet, params);
    },
    //根据邀请码获取邀请人信息
    wert: function(params){
        const url = apiUrl + "/user/info/yqinfo";
        return requestHelper(url, methodGet, params);
    }
};