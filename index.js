
const serverless = require('serverless-http');
const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const githubRoutes =  require('./routes/github');

app.use('/github', githubRoutes);

module.exports.handler = serverless(app);