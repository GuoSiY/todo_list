<template>
    
    <el-container class="container">
        <el-header>
            <h1>待办清单</h1>
        </el-header>
        <el-container>
            <el-aside class="menu"><myMenus></myMenus></el-aside>
            <el-main class="content"><myTodo></myTodo></el-main>
        </el-container>
    </el-container>
</template>

<script>
import myMenus from './myMenus.vue'//导入menus组件
import myTodo from './myTodo.vue'
    export default {
        components:{//注册menus组件，让它可以在template中调用
            myMenus,
            myTodo
        }
    };
</script>

<style scoped>
.container{
    width: 80%;
    height: 90%;
    margin: auto;
    position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    background-color: #F1F1FB;
    border-radius: 3%;
}
.menu{
    float: left;
    width: 20%;
    height: 100%;
    background-color: #fff;
    border-bottom-left-radius: 3%;
}
.content{
    float: left;
    width: 80%;
    height: 100%;
    background-color: #ffe8e8;
    border-bottom-right-radius: 3%;
}
 h1{
    margin:15px 30px;
    color: #454691;
}
</style>