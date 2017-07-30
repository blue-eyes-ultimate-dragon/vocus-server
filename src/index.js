require('dotenv').config();
require('babel-register')();
require('babel-polyfill');
const log = require('fancy-log');
const server = require('./server').default;

const port = process.env.PORT || 5000;

const xlsxj = require('xlsx-to-json');
const path = require('path');

const fs = require('fs');


xlsxj(
  {
    input: path.resolve(__dirname, './workforce.xlsx'),
    output: path.resolve(__dirname, './workforce.json'),
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  },
);

server.listen(port, () => log(`API server started on ${port}`));
