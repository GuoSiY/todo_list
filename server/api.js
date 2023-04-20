const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const bodyParser = require('body-parser')

// 解析提交的json参数
let jsonParser = bodyParser.json()

//建立与 mysql 数据库的连接
const db=mysql.createPool({
    host:'localhost',//数据库的IP地址
    user:'root',//账号
    password:'123456',//密码
    database:'todos'//指定要操作的数据库
})


//获取待办列表
router.get('/todo/list',(req,res)=>{
    let lists={}
    db.query('select * from  todolists where isDelete=0',(err,result)=>{
        if(err) throw err
        let todos=[]
        for(var i=0;i<result.length;i++){
            let obj={}
            obj.title=result[i].title
            obj.count=result[i].count
            obj.locked=result[i].locked
            obj.isDelete=result[i].isDelete
            obj.id=result[i].id
            todos.push(obj)
        }
        lists={
            status:200,
            msg:'sucess',
            todos
        }
        
        res.send(JSON.stringify(lists))
    })
})

//新增待办事项
router.post('/todo/addTodo',(req,res)=>{
    const list={
        title:'newList',
        count:0,
        locked:0,
        isDelete:0
    }
    const sqlStr='insert into todolists (title,count,locked,isDelete) values (?,?,?,?)' 
    db.query(sqlStr,[list.title,list.count,list.locked,list.isDelete],(err,result)=>{
        if(err) throw err
        if(result.affectedRows===1){
            console.log('插入待办事项成功')
            res.send({
                status:200,
                msg:'sucess'
            })
        }

        
    })
})

//获取待办单项列表
router.get('/todo/listId',(req,res)=>{
    let data={}
    let items=[]
    let todo={}
    let count=0
    const id=req.query.id
    const sqlStr1='select * from item where todoid = ?'
    const sqlStr2='select count(*) as c from item where todoid= ? and finished=0'
    const sqlStr3='update todolists set count=? where id=?'
    const sqlStr4='select * from todolists where id=?'
    db.query(sqlStr1,[id],(err,result)=>{
        if(err) throw err
        for(var i=0;i<result.length;i++){
            let obj={}
            obj.id=result[i].id
            obj.text=result[i].text
            obj.finished=result[i].finished
            obj.deleted=result[i].deleted
            items.push(obj)
        }

        db.query(sqlStr2,[id],(err,result)=>{
            if(err) throw err
            count=result[0].c

            db.query(sqlStr3,[count,id],(err,result)=>{
                if(err) throw err
                if(result.affectedRows===1){
                    console.log('更新count成功')
                }

                db.query(sqlStr4,[id],(err,result)=>{
                    if(err) throw err
                    todo.title=result[0].title
                    todo.count=result[0].count
                    todo.locked=result[0].locked
                    todo.isDelete=result[0].isDelete

                    data={
                        status:200,
                        msg:'sucess',
                        items,
                        todo
                    }
                    console.log(data)
                    res.send(JSON.stringify(data))
                })
                
            })
            })

        })
    })

//新增待办单项
router.post('/todo/addRecord',jsonParser,(req,res)=>{

    let count=0
    const sqlStr='insert into item (todoid,text,finished,deleted) values(?,?,?,?)'
    const sqlStr2='select count(*) as c from item where todoid= ? and finished=0'
    db.query(sqlStr,[req.body.id,req.body.text,0,0],(err,result)=>{
        if(err) throw err
        if(result.affectedRows===1){
            console.log('新增待办单项列表项成功')
            db.query(sqlStr2,[req.body.id],(err,result)=>{
                if(err) throw err
                count=result[0].c
                const sqlStr3='update todolists set count=? where id=?'
                db.query(sqlStr3,[count,req.body.id],(err,result)=>{
                    if(err) throw err
                    if(result.affectedRows===1){
                        console.log('更新count成功')
                        res.send({
                            status:200,
                            msg:'sucess'
                        })
                    }
                })
            })
        }
    })

})

//修改待办事项
router.post('/todo/editTodo',jsonParser,(req,res)=>{
    const sqlStr='update todolists set title=? , count=? , locked=? , isDelete=? where id=?'
    db.query(sqlStr,[req.body.todo.title,req.body.todo.count,req.body.todo.locked,req.body.todo.isDelete,req.body.id],(err,result)=>{
        if(err) throw err
        if(result.affectedRows===1){
            console.log('修改待办单项成功')
            res.send({
                status:200,
                msg:'sucess'
            })
        }
    })
})

//修改待办单项
router.post('/todo/editRecord',jsonParser,(req,res)=>{
    let count=0
    const sqlStr='update item set text=? , finished=? , deleted=? where id=?'
    const sqlStr2='select count(*) as c from item where todoid= ? and finished=0'
    db.query(sqlStr,[req.body.item.text,req.body.item.finished,req.body.item.deleted,req.body.item.id],(err,result)=>{
        if(err) throw err
        if(result.affectedRows===1){
            console.log('修改待办单项列表项成功')
            db.query(sqlStr2,[req.body.Id],(err,result)=>{
                if(err) throw err
                count=result[0].c
                const sqlStr3='update todolists set count=? where id=?'
                db.query(sqlStr3,[count,req.body.Id],(err,result)=>{
                    if(err) throw err
                    if(result.affectedRows===1){
                        console.log('更新count成功')
                        res.send({
                            status:200,
                            msg:'sucess'
                        })
                    }
                })
            })
        }
    })
})

   

module.exports=router
