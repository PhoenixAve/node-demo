const fs = require('fs')
const { resolve } = require('../utils/index.js');

let rs = fs.createReadStream(resolve('./test.txt'));
let ws = fs.createWriteStream(resolve('./test1.txt'));

rs.pipe(ws);