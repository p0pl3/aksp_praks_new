const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema.js');
const port = 1234;
const app = express();
app.use('/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))
app.listen(port);
