/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___Dai Anh Bui___ Student ID: __102629219__ Date: __13 September 2023__
* Cyclic Link:
*
********************************************************************************/ 


const express = require('express');
const app = express();
const port = 3000; 

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const CompaniesDB = require('./modules/companiesDB.js');
const db = new CompaniesDB();
const HTTP_PORT = process.env.PORT || 8080;

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
      console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

app.post('/api/companies', (req, res) => {
  db.addNewCompany(req.body).then((data) => {res.status(201).json()});
})

app.get('/api/companies', (req, res) => {
  db.getAllCompanies(res.query.page, res.query.perPage, res.query.tag).then((data) => {res.status(200).json(data);})
})

app.get('/api/companies/:_name', (req, res) => {
  db.getCompanyByName(res.params._name).then((data) => {res.status(200).json(data);})
})

app.put('/api/companies/:_name', (req, res) => {
  db.updateCompanyByName(req.params._name, req.body).then((data) => {res.status(200).json({message:"Successfully updated company's name", data});})
  .catch(()=> {res.status(501).json({message:"Unsuccessful updated company's name"})})
})

app.delete('/api/companies/:_name', (req, res) => {
  db.deleteCompanyByName(req.params._name).then(() => {res.status(200).json({message:"Sucessfully deleted company's name", data});})
  .catch(()=> {res.status(501).json({message:"Unsuccessfully deleted company's name"})})
})