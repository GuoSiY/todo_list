import Vue from 'vue'
import Router from 'vue-router'
import layouts from '@/components/myLayouts.vue'//导入layouts.vue组件
import todo from '@/components/myTodo.vue'
Vue.use(Router)//全局注册Router组件，它会绑定到Vue实例里面。

export default new Router({
    routes:[
        {
            path:'/',
            name:'layouts',
            component:layouts,
            children:[{
                path:'/todo/:id',
                name:'todo',
                component:todo
            }]
        }
    ]
})