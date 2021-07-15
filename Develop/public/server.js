// install packages for application 
const express = require('express')
const path = require('path')
const fs = require('fs')

// set up for express app and port to use for application
const app = express()
const PORT = process.env.PORT || 8080;

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
