const express = require('express');
const mongoose = require('mongoose');
// Router express theke e pai
const router=express.Router()

// import shcma file
const todoSchema=require ('../Schemas/TodoSchemas.js')
// create model which will follow the Schema
const Todo =new mongoose.model("Todo",todoSchema)
// ekhane Todo namer ekta model crate hobe amader crud operation er
//  post er kaaj korar shomoy ekta model create hobe j model a prottekta field scheema k follow korbe kew jodi schema onushare na how tahole error show hobe


// Get  Apis
// get all
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ status: 'active' }).select({
      _id:0,
      date:0,
    }).limit(1)
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get one
router.get('/:id',async(req,res)=>{

})
//  Post api
// post all
router.post('/all', async (req, res) => {
  const todos = req.body; 
  // ekta array of object insert korte model.insetMany(req.body)

  try {
    const insertedTodos = await Todo.insertMany(todos);
    res.status(201).json({ message: 'Todos inserted successfully', todos: insertedTodos });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(201).json({ message: 'Todo inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//  PUT
router.put('/:id', async (req, res) => {
  try {
    const updatetodo = await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active"
        }
      }
    );

    if (updatetodo.nModified === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo updated successfully' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE 
// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });

    if (deletedTodo.deletedCount === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// try er moddhe j kaaj korte chaibo serverside a seta hobe r catch er moddhe server er error dhora hobe 



module.exports=router;