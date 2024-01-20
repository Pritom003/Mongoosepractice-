const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const todohandler =require ("./src/todohandler/todohandler.js")

 
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://mongooseprac:NSff8cK10IIJQwpT@cluster0.ucoarqa.mongodb.net/?retryWrites=true&w=majority"
//  ,{useNewUrlParser:true
// , useUnifiedTopology:true}
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/todo',todohandler )
// ekhane app.use jokhon heat korbe tokhor todohandler a heat korbe ekhane rout '/' or '/vi' use ko
// kora jay
// app.use are used for middleware or the fucntione that has to be require first


app.use((req,res,next)=>{
  res.status(404).send('Requested url was not found')
  // next("Requested url was not found")
})
// jokhon kew bhul route call korbe tokhon seta serversite or developer er error na eta user er error
// jeta amara custom bhabe handle korte nijeder middleware use korte pari



app.use((err, req, res, next) => {
  try {
    res.status(500).send('There is an error');
  } catch (error) {
    res.status(500).send('server error', err.message);
  }
});
// try and catch er modde amra try a amader methods and custom error use korbo ar catch er maddhome amra server er error dhorbo




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
