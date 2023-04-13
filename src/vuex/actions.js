
import { getTodoList } from "../api/api";

export const getTodo=({
    commit
})=>{
    return new Promise((resolve)=>{
        getTodoList().then(res=>{
            commit('editTodo',res.data.todos);
            resolve();
        });
    });
};

