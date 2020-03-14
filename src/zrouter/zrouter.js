let Vue
export default class ZRouter{
    static install(_Vue) {
        // console.log(_Vue)
        Vue = _Vue
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    // console.log('路由入口', this.$options)
                    Vue.prototype.$zrouter = this.$options.router
                    // 路由入口,启动路由
                    this.$options.router.init();
                }
            }
        })
    }
    constructor(options) {
        // console.log('初始化路由表', options)
        this.$options = options
        this.routerMap = {}
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }
    init() {
        // console.log('初始化配置,启动整个路由表')
        // 1.监听hashchange
        this.bindEvent()
        // 处理路由表
        this.createRouterMap()
        // 初始化组件router-view router-lick
        this.initComponent()
    }
    bindEvent() {
        // console.log('绑定事件')
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
        window.addEventListener('load', this.onHashChange.bind(this), false)
    }
    getFrom(e) {
        console.log(e)
        let from, to
        if (e.newURL) {
            to = e.newURL
            from = e.oldURL
        } else {
            to = this.getHash()
            from = ''
        }
        return { to, from }
    }
    onHashChange(e) {
        // console.log('hash变了', e)
        let hash = this.getHash()
        let router = this.routerMap[this.app.current];
        let { to, from } = this.getFrom(e)
        if (router.beforeEnter) {
            router.beforeEnter(to, from, ()=>{
                this.app.current = hash
            })
        } else {
            this.app.current = hash
        }
    }
    getHash() {
        // console.log(window.location.hash)
        return window.location.hash.slice(1) || '/'
    }
    createRouterMap() {
        // console.log('createRouterMap', this.$options)
        this.$options.routes.forEach(item=>{
            this.routerMap[item.path] = item
        })
    }
    initComponent() {
        Vue.component('router-view', {
            render: h=>{
                const component = this.routerMap[this.app.current].component
                return h(component)
            }
        })
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h){
                return h('a', {
                    attrs: {
                        href: '#' + this.to,
                    }
                },
                [this.$slots.default]
                )
            }
        })
    }
}


