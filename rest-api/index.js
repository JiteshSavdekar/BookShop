 let express=require('express'),
 path=require('path'),
 mongoose=require('mongoose'),
 cors=require('cors'),
 bodyParser=require('body-parser'),
 mongoDb=require('./database/db');
 mongoose.Promise=global.Promise;
 mongoose.connect(mongoDb.db,{
     useNewUrlParser:true,
     useUnifiedTopology:true
 }).then(()=>{
     console.log("database connation ");
 },
 error=>{
     console.log("data base error:"+ error);
 }
 )
 //now server carting
 const bookRoute =require("./node-backend/routes/book.routes");
 const app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended:false
 }));
 app.use(cors());
 //crete statick paath 
 app.use(express.static(path.join(__dirname,'dist/Bookstore')));
 // api root
 app.use('/api',bookRoute);
 //port crea te
 const port=process.env.port || 8000;
 app.listen(port,()=>
 {
     console.log('listning port on :'+ port);
 });
 //404 error
 app.use((req,res,next)=>{
next(createError(404));
 });
 //Base router
 app.get('/',(req,res)=>{
     res.send('invaild endpoint');
 });
 app.get('*',(req,res)=>{
     res.sendFile(path.join(__dirname, 'dist/Bookstore/index.js'));

 });
 app.use (function(error,req,res,next){
console.log(err.message);
if(!err.statusCode)err.statusCode=500;
res.status(err.statusCode).send(err.message);
 }); 