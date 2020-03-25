const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/Images')
    .then(connect => { console.log('db id connected') })
    .catch(err => { console.error(err) })

/*mongoose.connect('mongodb+srv://Bruja:1925BscJp@cluster0-hp4pe.mongodb.net/Images?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('conected to Mongo'))
    .catch(err => console.error(err));
*/
module.exports=mongoose