module.exports = {
    //基础配置
    apiUrl: 'http://wuse.private.bangtk.com:1002',//接口地址
    deBug: true,//是否开启H5端控制台 
    //开发环境
    portNumber: 6971,//运行端口号
    proxyTarget: 'https://wsonline.bangtk.com',//需要代理的接口地址，多个代理使用数组
    proxyMap: '/api',//代理映射，多个代理使用数组，顺序与proxyTarget对应
    //生产环境
    favicon: 'favicon.ico',//应用图标
    favName: '物色好物',
    //更多配置
    buildAssetsDir: 'static',//打包后静态资源目录(js,css,img,fonts)这些文件都可以写里面
    buildOutputDir: 'wsH5',//打包进的目录名
};