let buf = Buffer.alloc(6)

// // fill 填满为止
// buf.fill('123')
// console.log(buf); // <Buffer 31 32 33 31 32 33>
// console.log(buf.toString()); // 123123

// buf.fill('123', 1, 3)
// console.log(buf); // <Buffer 00 31 32 00 00 00>
// console.log(buf.toString());

// buf.fill(123)
// console.log(buf); // <Buffer 7b 7b 7b 7b 7b 7b>
// console.log(buf.toString()); // {{{{{{

// // write 有多少写多少
// buf.write('123456789');
// console.log(buf); // <Buffer 31 32 33 34 35 36>
// console.log(buf.toString()); // 123456

// buf.write('123', 1);
// console.log(buf); // <Buffer 00 31 32 33 00 00>
// console.log(buf.toString()); // 123

// // toString
// buf = Buffer.from('我是中国人');
// console.log(buf); // <Buffer e6 88 91 e6 98 af e4 b8 ad e5 9b bd e4 ba ba>
// console.log(buf.toString()); // 我是中国人

// buf = Buffer.from('我是中国人');
// console.log(buf.toString()); // 我是中国人
// console.log(buf.toString('utf-8', 3, 9)); // 是中

// // slice 
// buf = Buffer.from('我是中国人');
// let b1 = buf.slice(3, 9)
// let b2 = buf.slice(-3)
// console.log(b1.toString()); // 是中
// console.log(b2.toString()); // 人

// // indexOf 
// buf = Buffer.from('我是中国人, 爱中国，爱所有');
// console.log(buf.indexOf('爱')); // 17
// console.log(buf.indexOf('拉')); // -1

// // copy 
// buf = Buffer.from('我是中国人');
// let b1 = buf.slice(3, 9)
// let b2 = buf.slice(-3)
// console.log(b1.toString()); // 是中
// console.log(b2.toString()); // 人