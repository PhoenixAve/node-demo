const net = require("net");
const { buffer } = require("stream/consumers");

const socket = new net.Socket({});

socket.connect({
  host: "127.0.0.1",
  port: 4000,
});

let seq = 0;

const encode = (lessionId) => {
  // 扩大buffer长度 从2->4，前面存入seq
  const buffer = Buffer.alloc(4);
  console.log("seq与lessionId的对应关系", seq, lessionId);
  buffer.writeInt16BE(seq++);
  buffer.writeInt16BE(lessionId, 2);
  return buffer;
};

const lessionIds = ["582", "583", "584", "585", "586", "587", "588"];

let lessionId;
const send = () => {
  lessionId = lessionIds[Math.floor(Math.random() * lessionIds.length)];
  socket.write(encode(lessionId));
};

send();
setInterval(send, 50);
socket.on("data", (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);
  console.log(
    seq,
    ":",
    seqBuffer.toString(),
    lessionId,
    ":",
    titleBuffer.toString()
  );
});
