<template>
    <div class="lists-todo"><!--待办菜单容器-->
        <a  @click="clickList(item.id)" class="list" v-for="item in todoList" :key="item"  :class="{'active':item.id===todoId}"><!--单个待办菜单-->
            <span class="icon-lock el-icon-lock" v-show="item.locked"></span><!--锁定的图标-->
            <span class="count">{{ item.count }}</span><!--未完成的待办数量-->
            <span :class="item.locked?'':'title'">{{ item.title }}</span> <!--菜单内容-->
            <hr>
        </a>

        
        <a class="list-new" @click="addTodoList"><!--新增菜单-->
            <span class="icon-plus el-icon-plus"></span><!--新增的图标-->
            <span>新增</span>
            <hr>
        </a>
    </div>
</template>

<script>
import { addTodo} from '@/api/api';

    export default {
       data(){
        return{
            items:[
              
            ],
            todoId:''//默认选中id
        }
       },
       created(){
        /*getTodoList({}).then(res=>{
            const lists=res.data;
            this.items=lists.todos;
            this.todoId=lists.todos[0].id;
        })*/
        this.$store.dispatch('getTodo').then(()=>{
            /*在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。
            原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，
            所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，
            因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。*/
            this.$nextTick(()=>{
                this.clickList(this.todoList[0].id);
            });
        });
       },
       methods:{
        clickList(id){
            this.todoId=id;
        },
        addTodoList(){
            addTodo({}).then( data=>{
                if(data.status===200){
                    /*getTodoList({}).then(res=>{
                    const lists=res.data;
                    this.items=lists.todos;
                    this.todoId=lists.todos[lists.todos.length-1].id;
                    })*/
                    this.$store.dispatch('getTodo').then(()=>{
                        this.$nextTick(()=>{
                            setTimeout(()=>{
                                this.clickList(this.todoList[this.todoList.length-1].id);
                            },100);
                        });
                    });
                }
            });
        }
       },
       watch:{
        'todoId'(id){
            this.$router.push({name:'todo',params:{id:id}}).catch(err=>{
                console.log(err);
            });
        }
       },
       computed:{
        todoList(){
            return this.$store.getters.getTodoList;
        }
       }
    };
</script>

<style scoped>
    .lists-todo a{
        display: block;
        line-height: 1.5em;
        padding: .85em 2em;
        position: relative;
        text-decoration:none;
        text-align: left;
        cursor: pointer;
        overflow-x:hidden;
        color: #30305C;
    }
    .count{
        transition: all .2s ease-in;
        background: hsla(268, 89%, 49%, 0.051);
        border-radius: 1em;
        float: right;
        font-size: .7rem;
        line-height: 1;
        margin-top: .1rem;
        margin-right: -.5em;
        padding: .3em 0.7em;
    }
    .icon-lock{
        padding-right: 0.5em;
    }
    .title{
        padding-left: 1.5em;
    }

    .icon-plus{
        padding-right: 0.5em;
    }
    
    a:hover {
        color:#d61f35;
    }

    .active{
        color:#d61f35 !important;
    }
</style>