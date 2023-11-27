const http = require('http');

function sleepTime(time) {
  const selep = Date.now() + time * 1000
  while(Date.now() < selep) {}
  return
}

sleepTime(4)
const server = http.createServer((req, res) => {
  res.end('sever starting...')
})

server.listen(3000, () => {
  console.log('服务已经启动了');
})