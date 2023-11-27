// 闭包泄露对象
       const o1 = (() => {
           const data = {
               a: 1,
               b: 2
           };
           return {
               get: (key) => {
                   return data[key];
               }
           }
       })();
       const o2 = (() => { // 判断是否属于原型链属性解决泄露
           const data = {
               a: 1,
               b: 2
           };
           return {
               get: (key) => {
                   if (data.hasOwnProperty(key)) {
                       return data[key];
                   }
                   return undefined;
               }
           }
       })();
       const o3 = (() => { // 隔绝原型链解决泄露
           const data = Object.create({
               a: 1,
               b: 2
           });
           return {
               get: (key) => {
                   return data[key];
               }
           }
       })();
       const o4 = (() => { // 使用合适的数据类型Map
           const data = new Map([
               ['a', 1],
               ['b', 1]
           ]);
           return {
               get: (key) => {
                   return data.get(key);
               }
           }
       })();
       // 添加漏洞打破闭包隔绝
       Object.defineProperty(Object.prototype, 'all', {
           get() {
               console.log(this)
               return this;
           }
       });
       console.log(o1.get('all')); //泄露会获取data
       console.log(o2.get('all'));
       console.log(o3.get('all'));
       console.log(o4.get('all'));