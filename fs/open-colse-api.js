const fs = require('fs');
const path = require('path');

// open
fs.open(path.resolve(__dirname, 'data.txt'), 'r', (err, fd) => {
  console.log(fd);
  fs.close(fd, err => {
    if (err) return console.log(err);
    console.log('关闭成功');
    console.log(fd);
  })
})
