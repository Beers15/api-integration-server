'use strict';

const express = require('express');
const { Candidates, Products, Categories } = require('../model');
const apiRouter = express.Router();

apiRouter.get('/products', async (req, res) => {

  try {
    let products = await Products.findAll();
    let response = {
      count: products.length,
      results: products,
    };
    res.status(200).send(response);
  } catch(e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

apiRouter.post('/products', async (req, res) => {
  let { name, price, categoryId, count, imageUrl } = req.body;

  try {
    let product = await Products.create({
      name,
      price,
      categoryId,
      inventoryCount: count,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1617360547704-3da8b5363369?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    });
    res.status(201).send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

apiRouter.put('/products', async (req, res) => {
  let { action, name } = req.body;
  
  try {   
    let record = await Products.findOne({ where: { name }});
  
    //increment or decrement product stock based on user action
    if(action === 'increment') record.inventoryCount++;
    else if(action === 'decrement') record.inventoryCount--;

    await Products.update(
      { inventoryCount: record.inventoryCount },
      { where: { name }
    });
    res.status(201).send({ inventoryCount: record.inventoryCount });
  } catch(err) {
    console.log("#ERR", err)
    res.status(400).send(err);
  }
});

apiRouter.post('/categories', async (req,res,next)=>{
  // req.body === { name: 'bath stuff' };

  try {
    let rawData = {
      displayName: req.body.name,
      normalizedName: req.body.name.toLowerCase(),
      description: req.body.description,
    };
    let response = await Categories.create(rawData);
    res.status(201).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

apiRouter.get('/categories', async (req, res, next)=>{
  
  try{
    let categories = await Categories.findAll();
    let response = {
      count: categories.length,
      results: categories,
    };
    res.status(200).send(response);
  }catch(e){
    console.log(e);
    res.status(400).send(e.message);
  }
});





apiRouter.post('/api/test', (req, res, next) => {
  res.status(200).send('Partner, it\'s a work in progress.');
});

apiRouter.post('/api/candidate', async (req, res, next) => {
  try {
    let candidate = await Candidates.create(req.body);
    res.send(candidate);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

apiRouter.post('/vote', async (req, res, next) => {

  const { id } = req.body;

  try {
    let candidate = await Candidates.findOne({where: { id }});
    candidate.voteCount += 1;
    await candidate.save();
  
    res.send(200);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }

});

module.exports = apiRouter;
