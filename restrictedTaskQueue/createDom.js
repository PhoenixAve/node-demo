const container = document.querySelector('.container');
let str = ''
for (let i = 0; i < domLength; i++) {
  str += `<span class="inline-block">数值：${i}</span>`;
}

container.innerHTML = str;