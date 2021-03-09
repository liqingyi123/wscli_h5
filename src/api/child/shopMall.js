import requestHelper from "../apiHelper.js";
import setting from "../../../setting.js";
const apiUrl = setting.apiUrl;
const methodGet = "get";
const methodPost = "post";
const methodPut = "put";
const methodDelete = "delete";
// 和商铺购买有关的接口
export default {
    /* ******** 注册页 **********/
    // 注册
    register: function(params){
        // code//公众号网页授权code
        // appKey//公众号appid
        // shareMcode//邀请码
        // app是
        const url = apiUrl + "/user/login/hFiveLogin";
        return requestHelper(url, methodGet, params);
    },
    //根据邀请码获取邀请人信息
    getSharerInfo: function(params){
        const url = apiUrl + "/user/info/yqinfo";
        return requestHelper(url, methodGet, params);
    },
    /* ******** 商铺 **********/
    //获取分类
    getMeuns: function(params) {
        const url = apiUrl + "/goods/type/list";
        return requestHelper(url, methodGet, params);
    },
    //获取分类
    // export function getMeuns(params) {
    //     const url = apiUrl + "/goods/type/list";
    //     return requestHelper(url, methodGet, params);
    // }
    //获取分类商品列表(综合，价格下的)
    getTypeGoods: function(params) {
        // id, // 分类ID
        // fromType, //来源类型[0:分类商品列表,1:商品详情]
        // shortName, //排序字段[0:综合,1:佣金,2:价格,3:销量,4:券额]
        // shortType,//排序方式[0:顺序 1:反序]
        // count,//当前页码
        const url = apiUrl + "/goods/type/goods";
        return requestHelper(url, methodGet, params);
    },
    //获取唯品会商品列表
    getGoods_wph: function(params) {
        // type, //类目 精选组货码 女装精选 7hfpy0m4 男装精选 wj7evz2j  美妆精选 vd0wbfdx 数码电子 dpot8m5u 精选-首饰 szkl4kj7 鞋包精选 byh9331t 母婴精选 gkf52p8p 居家精选 cnrzcs22 运动户外精选 indvf44e 家用电器 uggxpyh5   默认 7hfpy0m4
        // sourceType, //请求源类型：0-频道，1-组货 默认 1
        // channelType, //频道类型:0-超高佣，1-出单爆款; 当请求类型为频道时必传  默认 0]
        // pageNum,//页码 默认1
        // pageSize,//每页条数 默认20
        // sort,//排序字段: COMMISSION-佣金，PRICE-价格,COMM_RATIO-佣金比例，DISCOUNT-折扣
        // order//排序顺序：0-正序，1-逆序，默认正序
        const url = apiUrl + "/goods/vip/page/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取苏宁商品列表
    getGoods_sn: function(params) {
        // type,//商品类型：1-小编推荐；2-实时热销榜；3-当日热推榜；4-高佣爆款榜；5-团长招商榜；6-9块9专区
        // cityCode, //城市编码 默认025
        // picWidth, //图片宽度
        // picHeight,//图片高度
        // pageNum,//页码，默认1
        // pageSize,//每页数量，默认20
        // selfSupport,//是否苏宁自营 0：全部；1：是
        // couponMark//1表示拿到券后价，不传按照以前逻辑取不到券后价
        const url = apiUrl + "/goods/su/ning/page/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取京东商品列表
    getGoods_jd: function(params) {
        // type, 频道ID:1-好券商品,2-精选卖场,10-9.9包邮,15-京东配送,22-实时热销榜,23-为你推荐,24-数码家电,25-超市,26-母婴玩具,27-家具日用,28-美妆穿搭,30-图书文具, 31-今日必推,32-京东好物,33-京东秒杀,34-拼购商品,40-高收益榜,41-自营热卖榜,108-秒杀进行中,109-新品首发,110-自营,112-京东爆品,125-首购商品,129-高佣榜单,130-视频商品,153-历史最低价商品榜，210-极速版商品  默认（22）
        // pid, //联盟id_应用id_推广位id，三段式
        // fields, //支持出参数据筛选，逗号','分隔，目前可用：videoInfo,documentInfo,skuLabelInfo（商品标签）,promotionLabelInfo(促销标签)
        // forbidTypes,//10微信京东购物小程序禁售，11微信京喜小程序禁售
        // pageNum,//页码 默认1
        // pageSize,//每页条数 默认20
        // sort,//排序方式[0:综合,1:佣金,2:价格,3:销量]
        // order//排序顺序：0-正序，1-逆序，默认正序
        const url = apiUrl + "/goods/jd/page/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取淘宝商品列表
    getGoods_tb: function(params) {
        const url = apiUrl + "/goods/recommend/boutique";
        return requestHelper(url, methodGet, params);
    },
    //获取拼多多精选-综合
    getSCList: function(params) {
        // count,
        // placeId: 3,
        const url = apiUrl + "/goods/recommend/info";
        return requestHelper(url, methodGet, params);
    },
    //获取商品详情
    getGoodsDetailById: function(params) {
        // type: 2,//2:拼多多 3：淘宝 4：唯品会 5：京东 6：苏宁易购  默认2
        // goodsId: '',
        // mallId: ''//店铺ID，type = 6 必传
        const url = apiUrl + "/goods/detail/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取商品详情下的商品推荐
    getRecommendsFromDetail: function(params) {
        // goodsId,//商品ID
        // pageNum,//页码 默认1
        // pageSize//每页条数 默认40
        // type,//平台类型：2:拼多多 3：淘宝  4：唯品会  5：京东 6：苏宁易购  默认2
        // catId,//商品类别  平多多，淘宝 必传
        // goodsTitle//京东必传
        const url = apiUrl + "/goods/like/page/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //搜索拼多多列表
    goodsSearch: function(params) {
        // type,//平台类型：2:拼多多 3：淘宝  4：唯品会  5：京东 6：苏宁易购
        // keyword,//关键字
        // isCoupon,//是否是优惠券商品，1：有优惠券，0：无优惠券
        // pageNum,//页码 默认 1
        // pageSize,//页数 默认 20
        // sort,//排序方式 [0:综合,1:佣金,2:价格,3:销量,4:券额] 默认 0
        // order,//1:升序 0：降序
        const url = apiUrl + "/goods/page/by/keyword/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取购买链接
    getBuyLink: function(params) {
        // type,//平台类型 2:拼多多 3：淘宝  4：唯品会  5：京东 6：苏宁易购  默认 2
        // materialUrl,//商品落地页地址
        // couponUrl,//优惠券地址
        // app,//1:安卓 2:苹果 5:小程序
        // goodsId,//商品ID
        // goodsSign,//拼多多goodsSign
        // fromType,//页面来源
        // searchId,//拼多多搜索id
        // mCode//用户的mcode
        const url = apiUrl + "/goods/share/information/ignore/token";
        return requestHelper(url, methodGet, params);
    },
    //获取商品收藏参数原有完整参数
    getCLParam: function(params) {
        // param,//参数（需要转换的长串）
        const url = apiUrl + "/goods/convert/url";
        return requestHelper(url, methodGet, params);
    },
    //获取商品收藏列表
    getCollectList: function(params) {
        // type,//平台类型 2:拼多多 3：淘宝  4：唯品会  5：京东 6：苏宁易购  默认 2
        // infoJson,//json 格式字符串，需encode编码  goodsId:商品ID  mallId:店铺ID
        const url = apiUrl + "/goods/collect/list/by/info";
        return requestHelper(url, methodGet, params);
    }
};