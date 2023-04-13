import axios from "axios";

const host='http://127.0.0.1:8085'

//获取待办列表
export const getTodoList=params=>{
   return axios.get(host+'/todo/list',{
       params:params
    });
};

//新增待办
export const addTodo=params=>{
    return axios.post(host+'/todo/addTodo',params).then(res => res.data
    );
};

//查询待办单项列表的接口
export const getTodo=params=>{
    return axios.get(host+'/todo/listId',{
        params:params
    });
};

//新增待办单项列表项
export const addRecord=params=>{
    return axios.post(host+'/todo/addRecord',params).then(res=>res.data);
};

//修改待办单项标题
export const editTodo=params=>{
    return axios.post(host+'/todo/editTodo',params).then(res=>res.data);
}

//修改待办单项列表项
export const editRecord=params=>{
    return axios.post(host+'/todo/editRecord',params).then(res=>res.data);
}