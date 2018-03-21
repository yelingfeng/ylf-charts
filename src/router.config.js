import Vue from 'vue'
import Router from 'vue-router'
import BarView from './charts/Bar.vue'
import LineView from './charts/Line.vue'
import PieView from './charts/Pie.vue'
Vue.use(Router)

// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '*',
        redirect: '/bar'
    },
    { path: '/bar', component: BarView },
    { path: '/line', component:LineView },
    { path: '/pie', component:PieView}
]

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})
