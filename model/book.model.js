const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

    Title:{type:String,required:true},

    Author:{type:String,required:true},

    Genere:{type:String,required:true,enum:["Fiction","Comic","Science"]},

    Description:{type:String,required:true},

    Price:{type:Number,required:true}



},


    {versionKey:false}

)


const BookModel = mongoose.model("book",bookSchema)

module.exports={BookModel}