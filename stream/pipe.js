const fs = require('fs');
const { resolve } = require('../utils');

const rs = fs.createReadStream(resolve('./pipe01.txt'), {
  highWaterMark: 4
})

const ws = fs.createWriteStream(resolve('./pipe02.txt'), {
  highWaterMark: 1
})

rs.pipe(ws);