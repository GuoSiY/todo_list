<template>
    <div class="list-item " v-show="!localItem.deleted"> <!-- 最外层容器-->
        <label class="checkbox"> <!--自定义的多选框-->
            <input type="checkbox" v-model="localItem.finished" :disabled="locked" @change="onChange"> 
        </label>
        <input type="text" v-model="localItem.text" placeholder='写点什么吧' :class="localItem.finished?'finish':''" :disabled="locked? true:false || localItem.finished? true:false" @keyup.enter="onChange">  
        <a class="delete-item" v-if="localItem.finished && !locked" @click="localItem.deleted=true; onChange()"> <!--删除图标-->
            <span class="el-icon-delete"></span>
        </a>
    </div>
</template>

<script>
    import { editRecord } from '../api/api';
    export default{
        props:['item','locked','todoId','init'],//子组件显式的用 props 选项声明它期待获得的数据
        data(){
            return{
                localItem:this.item
            }
        },
        methods:{
            onChange(){
                let _this=this;
                editRecord({
                    item:this.localItem,
                    Id:this.todoId
                }).then(data=>{
                    if(data.status===200){
                        this.init();
                        _this.$store.dispatch('getTodo');
                    }
                })
            }
        }
    }
</script >

<style scoped>
    .list-item{
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 8%;
        background-color: #cccccc2d;
    }

    input[type="text"] {
    background: transparent;
    outline: none;
    border: none;
    width: 80%;
    font-size: 15px;
    padding-left: 10px;
  }
  .delete-item{
    float: right;
  }
  .finish{
    text-decoration: line-through;
    color: #ccc;
  }

</style>