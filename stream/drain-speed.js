/**
 * 需求：将“我爱祖国”写入制定的文件
 * 01 一次性吸入
 * 02 分批写入
 */

const fs = require("fs");
const { resolve } = require("../utils");

const ws = fs.createWriteStream(resolve("test.txt"), {
  highWaterMark: 3,
});

const str = "我爱祖国";

// // 一次性写入，会把文件全部读到内存，然后写入，可能会导致内存撑爆的情况
// ws.write(str);

// 分批限流写入
const source = str.split("");
let num = 0;
let flag = true;
function executeWrite() {
  flag = true;
  while (num !== source.length && flag) {
    // 当flag为false时，'drain' 事件将在适合继续将数据写入流时触发
    flag = ws.write(source[num]);
    num++;
  }
}

executeWrite();

ws.on("drain", () => {
  console.log("drain事件执行了");
  executeWrite();
});
