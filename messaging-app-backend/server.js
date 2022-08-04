const express = require('express')
const mongoose = require('mongoose')
//import mongoose from 'mongoose'
//App Config
const app = express();
const port = process.env.PORT || 9000
//Middleware
//DB config
//API endpoints
app.get("/", (req, res) => res.status(200).send("Hello the server talking"))
app.listen(port, () => console.log(`Listenning on localhost: ${port}`))