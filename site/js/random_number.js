
// 读取LocalStorage中的历史记录
const randomNumbers = document.getElementById('randomNumbers');
const history = JSON.parse(localStorage.getItem('randomNumberHistory')) || [];

history.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item container';
    listItem.innerHTML = `<span class="timestamp">${item.timestamp} </span> <p class="random-result"> ${item.numbers.join(', ')} </p>`;
    randomNumbers.appendChild(listItem);
});

function generateRandomNumbers() {
    const startRange = parseInt(document.getElementById('startRange').value);
    const endRange = parseInt(document.getElementById('endRange').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const timestamp = new Date().toLocaleString();

    // 生成多个随机数并合并成一个字符串
    let randomNumbersList = [];
    for (let i = 0; i < quantity; i++) {
        const randomNumber = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
        randomNumbersList.push(randomNumber);
    }

    // 创建一个列表项，显示时间戳和生成的随机数
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item container';
    listItem.innerHTML = `<span class="timestamp">${timestamp} </span> <p class="random-result"> ${randomNumbersList.join(', ')} </p>`;
    randomNumbers.insertBefore(listItem, randomNumbers.firstChild); // 将新项插入到顶部

    // 将历史记录添加到LocalStorage
    history.unshift({ timestamp, numbers: randomNumbersList });
    localStorage.setItem('randomNumberHistory', JSON.stringify(history));
}

function confirmClearHistory() {
    // 弹出确认框
    const confirmed = confirm(clearRandomHistoryConfirm);

    if (confirmed) {
        // 如果用户确认清除历史记录，执行清除操作
        clearHistory();
    }
}

function clearHistory() {
    // 清除历史记录并更新页面
    localStorage.removeItem('randomNumberHistory');
    randomNumbers.innerHTML = '';
    
    // 显示toast消息
    const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
    toast.show();
}