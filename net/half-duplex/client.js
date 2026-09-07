const net = require("net");

const socket = new net.Socket({});

socket.connect({
  host: "127.0.0.1",
  port: 4000,
});

const lessionIds = ["582", "583", "584", "585", "586", "587", "588"];

let lessionId;
const send = () => {
  lessionId = lessionIds[Math.floor(Math.random() * lessionIds.length)];

  const buffer = Buffer.alloc(2);
  buffer.writeInt16BE(lessionId);
  socket.write(buffer);
};
send();
socket.on("data", (buffer) => {
  console.log(lessionId, ":", buffer.toString());
  send();
});
