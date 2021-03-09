const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') // compression-webpack-plugin插件需要npm安装
const webpack = require('webpack')
const setting = require('./setting.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}
function assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ? 'static' : 'static'
    return path.posix.join(assetsSubDirectory, _path)
}
//遍历代理
let proxy = {};
if(setting.proxyTarget){
    if(typeof setting.proxyTarget === 'string'){//若只设置了单个代理
        let pathRewrite = {};
        pathRewrite['^'+setting.proxyMap] = '';
        proxy[setting.proxyMap] = {
            target: setting.proxyTarget, // 代理接口地址
            secure: setting.proxyTarget.indexOf('https') > -1 ? true : false, // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 是否跨域
            pathRewrite: pathRewrite
        }
    }else{
        setting.proxyTarget.forEach((item,index)=>{
            let pathRewrite = {};
            pathRewrite['^'+setting.proxyMap[index]] = '';
            proxy[setting.proxyMap[index]] = {
                target: item, // 代理接口地址
                secure: item.indexOf('https') > -1 ? true : false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 是否跨域
                pathRewrite: pathRewrite
            }
        })
    }
}



module.exports = {
    productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
    publicPath: './',//根路径 cli3.0以上使用publicPath
    assetsDir: setting.buildAssetsDir,//静态资源目录(js,css,img,fonts)这些文件都可以写里面
    outputDir: setting.buildOutputDir,//打包的时候生成的一个文件名
    indexPath: 'index.html',
    devServer: {
        open: true, // npm run serve后自动打开页面
        host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
        port: setting.portNumber, // 开发服务器运行端口号
        proxy: proxy
    },
    pwa:{
        iconPaths:{
            favicon32: setting.favicon,
            favicon16: setting.favicon,
            appleTouchIcon: setting.favicon,
            maskIcon: setting.favicon,
            msTileImage: setting.favicon
        }
    },
    chainWebpack: (config) => {
        // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
        config.plugins.delete('prefetch')
        // 移除 preload 插件(针对生产环境首屏请求数进行优化)   preload 插件的用途：https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
        config.plugins.delete('preload')
        // 第1个参数：别名，第2个参数：路径  （设置路径别名）
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@a', resolve('./src/assets'))
            .set('@c', resolve('./src/components'))
            .set('@v', resolve('./src/views'))
            .set('@u', resolve('./src/utils'))
            .set('@p', resolve('./src/api'))
        config.module
            .rule('cur')
            .test(/\.cur$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000,
                name: assetsPath('img/[name].[hash:7].[ext]')
            })
            .end()
        //修改页面标题
        config.plugin('html')
            .tap(args => {
              args[0].title = setting.favName;
              return args;
            })
    },
    // 配置打包 js、css文件为.gz格式，优化加载速度  （参考：https://blog.csdn.net/qq_31677507/article/details/102742196）
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css/, // 匹配文件
                        threshold: 10240, // 超过10kB的数据进行压缩
                        deleteOriginalAssets: false // 是否删除原文件 （原文件也建议发布到服务器以支持不兼容gzip的浏览器）
                    })
                ],
                performance: { // 生产环境构建代码文件超出以下配置大小会在命令行中显示警告
                    hints: 'warning',
                    // 入口起点的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
                    maxEntrypointSize: 5000000000,
                    // 生成文件的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
                    maxAssetSize: 3000000000
                    // // 只给出 js 文件的性能提示
                    // assetFilter: function (assetFilename) {
                    //   return assetFilename.endsWith('.js')
                    // }
                }
            }
        }
    }
}
