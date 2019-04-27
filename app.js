const connection = require('express')
const port = 3000
const app = connection()
const dir = __dirname
const multer = require('multer')
/*
app.get('/',(req,res)=>{
  res.send('Hello World')
})
app.get('/users',(req,res)=>{
  res.send('<h1>Users</h1>')
})
*/

var mysequelize = require('./config/database/connection')
var usermodel = require('./model/usermodel')

const path = require('path')

// set static path

// app.use(connection.static(path.join(dir,'public')))

app.use(connection.static(path.join(__dirname,'resources')))
app.set('views',__dirname+'/views')
app.set('view engine','ejs')

var bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))




var mystorage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'resources/uploads')
  },

  filename : function(req,file,cb){
    cb(null,'apple')
  }
})

var upload = multer({
  storage : mystorage
})

var type = upload.single('userimage')


// var con = mysql.createConnection({
//  host:"localhost",
//  user:"leonul",
//  password:"Apple123/",
// })

// con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!"); 
// });

// function execute_query(statement,success_statement){
//  con.query(statement,(err)=>{
//    if(err) throw err
//      console.log(success_statement)
//  })
// }

// let user_data = "create database if not exists user_data"
// execute_query(user_data,"database created")

// let use_database = " use user_data"
// execute_query(use_database, "mydatabase used")
// let user_table = "create table if not exists user_table(user_id int(11) unsigned not null auto_increment, user_name varchar(30) not null, user_password varchar(30) not null, primary key (user_id))"
// execute_query(user_table, "table created");


app.get('/',(req,res)=>{
  res.render('login',{
    message:'Welcome to login Page'
  })
})

app.get('/registration',(req,res)=>{
  res.render('registration',{
    message:'Sign Up to get started'
  })

})


// multiple middleware you can have multiples middleware

app.post('/registration',type,(req,res)=>{
  if(req.file== null && req.body.username ==""&& req.body.password == ""){
    res.render('registration',{message:'Please give proper input'})
  }else{
   // let sql_query = "insert into user_table (user_name,user_password) values('"+req.body.username+"','"+req.body.password+"')"
   // execute_query(sql_query,"data inserted")
   res.status(200).json({
      'success':true // string could be expensive
    })
  }
  
//  console.log(req.body)
 



})


app.post('/login',(req,res)=>{
  var username = req.body.username
  var password = req.body.password

  if(username && password){

  }else{
    res.render('login',{message:'Please give proper input'})
  }
})




app.listen(port,()=>{
  console.log('Server has started')
})