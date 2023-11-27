
// // alloc allocUnsafe
// const b1 = Buffer.alloc(10);
// const b2 = Buffer.allocUnsafe(10);
// console.log(b1);
// console.log(b2);


// // from
// // 中文无法被识别
// const b1 = Buffer.from('好', 'utf-8');
// console.log(b1);
// const b2 = Buffer.from([1, 2, '中'], 'utf-8');
// const b3 = Buffer.from([0xe4, 0xb8, 0xad], 'utf-8');
// console.log(b2.toString());
// console.log(b3.toString());

// const b4 = Buffer.alloc(3)
// const b5 = Buffer.from(b4)
// console.log(b4);

// b4[0] = 1
// console.log(b4 === b5); // false