// page-one-router.js
// page-one管理的路由文件
export default [{
  path: '/',
  component: () => import('@v/Home.vue'),
  meta: {
    title: '首页'
  }
}, {
  path: '/about',
  component: () => import('@v/About.vue'),
  meta: {
    title: '关于'
  }
}];