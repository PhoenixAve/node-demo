let dom1 = document.querySelector(".h1");
let dom2 = document.querySelector(".h2");
let num1 = 1;
let num2 = 1;

function render() {
  dom1.innerHTML = ++num1;
  dom2.innerHTML = ++num2;
  // console.log('执行单次渲染');
  if (num1 < domLength) {
    requestAnimationFrame(render);
  } else {
    console.log('dom渲染结束，渲染耗时----->', Date.now() - renderDomStartTime);
    console.log('dom渲染结束，总耗时----->', Date.now() - startTime);
  }
}
const renderDomStartTime = Date.now();
requestAnimationFrame(render);
console.log('从开始执行到首次渲染结束耗时---->', Date.now() - startTime);
