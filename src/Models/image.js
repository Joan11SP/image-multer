const {model,Schema} = require('mongoose')

const image = new Schema({
    nombre:{type:String},
    format:{type:String},
    filename:{type:String},
    path:{type:String}
})
const images=model('images',image);
module.exports=images