const express = require("express");
const createServer = require("./loaders/server");

const server = createServer();

server.start(
  {
    port: process.env.API_PORT,
    cors: {
      credentials: true,
      origin: "http://localhost:3001",
    },
    debug: true,
  },
  (listener) => {
    console.log(`Server is listening on port ${listener.port}`);
  }
);
