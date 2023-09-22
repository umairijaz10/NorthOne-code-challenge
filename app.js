const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./models/schema');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })  
.then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });;

// Configure middleware
app.use(bodyParser.json());

// Create a route for GraphQL using Express-GraphQL middleware
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
