const mongoose = require('mongoose');
// mongodb connenct jebhabe mongoose er sathe hoy same way te 
// ekhane Schema er sathe connect korbo jeta ekta object model create korbe

const todoSchema=mongoose.Schema(
  {
    title:
    {
      type:String,
      required:true,
    },
  description : String,

  status:
  {
    type :String ,
    enum:['pending','active']

  },    
  date:{
    type:Date,
    default:Date.now,
  }
  }
)
// Schema use kore amra ekta model banabo
module.exports=todoSchema;