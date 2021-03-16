module.exports = {
    // const apiUrl = 'http://wuse.private.bangtk.com:1002' // 测试环境
    // const apiUrl = "http://192.168.1.216:8080" //本地环境
    // const apiUrl = "http://8b52179d7edd.ngrok.io" //本地环境
    // const apiUrl = 'api' // 测试环境
    // const apiUrl = 'http://test.h5.wusehaowu.com' // 测试环境
    // const apiUrl = 'https://huidu.wusehaowu.com' // 测试环境
    //基础配置
    apiUrl: 'api',//接口地址(当使用代理时请使用代理名称--proxyMap=/api，则apiUrl=api)
    deBug: false,//是否开启H5端控制台 
    //开发环境
    portNumber: 6971,//运行端口号
    proxyTarget: 'http://wuse.private.bangtk.com:1002',//需要代理的接口地址，多个代理使用数组
    proxyMap: '/api',//代理映射，多个代理使用数组，顺序与proxyTarget对应
    //生产环境
    favicon: 'wuse.ico',//应用图标
    favName: '物色好物',
    //更多配置
    buildAssetsDir: 'static',//打包后静态资源目录(js,css,img,fonts)这些文件都可以写里面
    buildOutputDir: 'wsH5',//打包进的目录名
    
};
