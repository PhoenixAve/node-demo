const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (buffer) => {
    const seqBuffer = buffer.slice(0, 2);
    console.log(buffer, buffer.toString());
    const lessionId = buffer.readInt16BE(2);
    console.log("lessionId", lessionId);
    setTimeout(() => {
      const buffer = Buffer.concat([seqBuffer, Buffer.from(data[lessionId])]);
      socket.write(buffer);
    }, 10 + Math.random * 1000);
  });
});

server.listen(4000);

const data = {
  582: "开篇词+学习路线+架构图",
  583: "模块一：JavaScript",
  584: "模块二：HTML和CSS",
  585: "模块三：浏览器实现原理与API",
  586: "模块四：前端综合应用",
  587: "特别加餐",
  588: "尾声",
};
