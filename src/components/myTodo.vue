<template>
     <el-container v-show="!todo.isDelete">
      <el-header>
        <div class="header-top">
          <div class="list-edit-form" v-show="isUpdate">
            <!--用户点击标题进入修改状态-->
            <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked?true:false">
            <a class="finishEdit" @click="isUpdate=false">
              <span class="el-icon-circle-close"></span>
            </a>
          </div>

          <h1 v-show="!isUpdate" >
            <span class="title" @click="isUpdate=true">{{ todo.title }}</span>
            <span class="count" @click="isUpdate=true">{{todo.count}}</span>
            <a class="delete">
              <span class="el-icon-delete" @click="onDelete"></span>
            </a>
            <a class="iflocked" @click="onlock">
              <span class="el-icon-lock" v-if="todo.locked"></span>
              <span class="el-icon-unlock" v-else></span>
            </a>
          </h1>
        </div>
        <div class="header-bottom">
          <span class="plus el-icon-circle-plus-outline"></span>
          <input type="text" v-model="text" placeholder="请输入" @keyup.enter="onAdd" :disabled="todo.locked?true:false" />
        </div>
      </el-header>
      <el-main class="list-items">
          <div v-for="item2 in items" :key="item2">
              <myItem :item="item2" :locked="todo.locked? true:false" :todoId="id" :init="init"></myItem>
          </div>
      </el-main>
    </el-container>
</template>

<script>
  import { getTodo,addRecord,editTodo } from '@/api/api';
  import myItem from './myItem.vue';
    export default{
        components:{
          myItem
        },
        data(){
          return{
            todo:{//当前待办
              
            },
            items:[//待办单项列表
              
            ],
            text:'',//新增待办单项
            isUpdate:false,
            id:this.$route.params.id
          }
        },
        methods:{
          onAdd(){
            const ID=this.$route.params.id;
            let _this=this;
            addRecord({id:ID,text:this.text}).then(data=>{
              if(data.status===200){
                this.text=''
                this.init();
                _this.$store.dispatch('getTodo');
              }
            })
          },

          init(){
            const ID=this.$route.params.id;
            getTodo({id:ID}).then(res=>{
              this.todo=res.data.todo;
              this.items=res.data.items;
            });
          },

          updateTodo(){
            const ID=this.$route.params.id;
            let _this=this;
            editTodo({todo:this.todo,id:ID}).then(data=>{
              if(data.status===200){
                _this.$store.dispatch('getTodo');
              }
            });
          },

          updateTitle(){
            this.updateTodo();
            this.isUpdate=false;
          },

          onlock(){
            this.todo.locked=!this.todo.locked;
            this.updateTodo();
          },

          onDelete(){
            this.todo.isDelete=true;
            this.updateTodo();
          }
        },
        watch:{//监听$route.params.id的变化，如果id改变代表用户点击了其他待办事项，需要重新请求数据
          '$route.params.id'(){
            this.init();
          }
        },
        created(){
          this.init();
        }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .el-container{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5%;
  }
  .el-header{
    height: 13% !important;
    background-image: linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%);
}
  .header-top{
    margin-top: 10px;
    color: rgb(71, 75, 73);
  }
  a{
    float: right;
    padding-right: 5px;
  }
  .count{
        transition: all .2s ease-in;
        background: hsla(260, 18%, 97%, 0.33);
        border-radius: 1em;
        font-size: .5rem;
        line-height: 1;
        margin-left: 0.8em;
        padding: .3em 0.7em;
    }
  .header-bottom{
    margin-top: 15px;
    color: rgb(71, 75, 73);
  }

  input{
    outline: none;
    background: transparent;
    border: none;
    margin-left: 5px;
    width: 95%;
  }
  .header-bottom:focus-within{
    color: azure;
  }
  
</style>