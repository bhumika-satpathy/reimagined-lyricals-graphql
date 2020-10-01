const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();
// mongodb+srv://p00gz:<password>@cluster0.lrtf1.mongodb.net/<dbname>?retryWrites=true&w=majority

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://p00gz:KcdERSjCa7SaAO4A@cluster0.lrtf1.mongodb.net/test?retryWrites=true&w=majority'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI,{useNewUrlParser: true});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => { })
        .catch(err => console.log(err));
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
