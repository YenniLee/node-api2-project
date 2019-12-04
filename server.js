const express = require('express');
const postsRouter = require('./post-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Web API II Project</h>
  `);
});

module.exports = server;
