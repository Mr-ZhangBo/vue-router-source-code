import Vue from 'vue'
import ZRouter from './zrouter.js'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(ZRouter)

export default new ZRouter({
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter(to, from, next) {
                console.log(`我要去哪里 ${to} 来自哪里${from} 下一步是否执行${next}`)
                next();
            }
        },{
            path: '/about',
            component: About,
        }
    ]
})

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
