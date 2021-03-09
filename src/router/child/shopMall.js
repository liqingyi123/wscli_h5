// 和小程序正常商城购买有关的页面
export default [
    {
        path: '/',
        name: 'register',
        meta: {title: "输入邀请信息"},
        // component: () => import('@/views/register.vue')
        component: resolve => (require(["@/views/register.vue"],resolve))
    },{
        path: '/shopHome',
        name: 'shopHome',
        meta: {title: "店铺首页"},
        // component: () => import('@/views/shopHome.vue')
        component: resolve => (require(["@/views/shopHome.vue"],resolve))
    },{
        path: '/goodsDetail',
        name: 'goodsDetail',
        meta: {title: "商品详情页"},
        // component: () => import('@/views/goodsDetail.vue')
        component: resolve => (require(["@/views/goodsDetail.vue"],resolve))
    },{
        path: '/collectList',
        name: 'collectList',
        meta: {title: "收藏分享列表"},
        // component: () => import('@/views/collectList.vue')
        component: resolve => (require(["@/views/collectList.vue"],resolve))
    }
];