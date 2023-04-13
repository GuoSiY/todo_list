const express =require('express')
const app=express()//创建服务器

//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

//在路由之前配置cors这个中间件，从而解决跨域问题
const cors=require('cors')
app.use(cors({
    origin:'http://localhost:8080'
}))

const api=require('./api')//导入路由
app.use('/',api)

app.listen(8085,()=>{
    console.log('server running at http://127.0.0.1:8085')
})