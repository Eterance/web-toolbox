
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// 检查本地存储中的模式设置
const currentMode = localStorage.getItem('theme');
if (currentMode === 'dark') {
    enableDarkMode();
    darkModeToggle.checked = true;
}

// 切换模式按钮点击事件
darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// 启用黑夜模式
function enableDarkMode() {
    body.classList.add('dark');
    setTheme('dark');
}

// 禁用黑夜模式
function disableDarkMode() {
    body.classList.remove('dark');
    setTheme('light');
}

// 在页面加载完成后执行以下代码
window.addEventListener('load', function () {
    // 获取页面加载时间
    var loadTimeMillis = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    var loadTimeSeconds = (loadTimeMillis / 1000).toFixed(3);
    // 将加载时间插入到页面中
    var loadTimeElement = document.getElementById('loadTime');
    loadTimeElement.textContent = loadTimeSeconds.toString();


    // 获取页面加载期间发起的所有资源加载性能条目
    var resources = window.performance.getEntriesByType("resource");

    // 获取资源加载的数量
    var requestCount = resources.length;

    // 将请求数量显示在页面上
    var requestCountElement = document.getElementById("requestCount");
    if (requestCountElement) {
        requestCountElement.textContent = requestCount.toString();
    }
});

function changeLanguage(languageCode) {
    // 获取当前页面的URL
    let currentURL = window.location.pathname;

    // 匹配当前语言部分的正则表达式
    let languageRegex = /\/[a-z]{2}-[a-z]{2}\//;
    let newURL = '';

    if (currentURL == "/") {
        newURL = '/' + languageCode + '/';
    }
    else if (isLanguageCodeOnly(currentURL)) {
        newURL = '/';
    }
    else {
        // 查找并替换语言部分以生成新的URL
        newURL = currentURL.replace(languageRegex, '/' + languageCode + '/');
    }

    // 重定向到新的URL
    window.location.href = newURL;
}

function isLanguageCodeOnly(str) {
    // 使用正则表达式检查字符串格式
    const regex = /^\/[a-z]{2}-[a-z]{2}\/$/;
    return regex.test(str);
}
