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




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
