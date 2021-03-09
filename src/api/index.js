//自动化接口管理
//需要满足之后的子接口配置文件都在/src/api/child里面创建
// 自动导入子接口配置文件.js
let apiList = {};
(modules => modules.keys().forEach((key) => {
    // apiList = apiList.concat(modules(key).default);
    apiList = {...apiList,...modules(key).default};
}))(require.context('./child/', true, /\.js$/));
// console.log('apiList',apiList)
module.exports = apiList
// export default apiList

