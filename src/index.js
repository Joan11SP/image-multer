const express = require('express');
const app = express();
const path = require('path')
const router = require('./Routes/routes')
//const multer = require('multer')
require('./conectionDb')
//const uuid=require('uuid/v4')
const morgan = require('morgan')
const body_parser = require('body-parser')
const cors = require('cors')


app.use(express.urlencoded({extended:false}))
//Configurar el motor de vistas
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs'); 

app.use(morgan('dev'))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
//upload to image
app.use(cors())
//renderizar la vista
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

//definir puerto
var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('server on port', port)

})
