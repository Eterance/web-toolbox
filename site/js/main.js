
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
// 该占位符将在 Github Actions 中被替换为实际的项目名称
const githubProjectName = "<ProjectNamePlaceHolder>";

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

// 切换语言
function changeLanguage(languageCode) {
    // 获取当前页面的URL
    let currentPath = window.location.pathname;

    // 匹配当前语言部分的正则表达式
    let languageRegex = /\/[a-z]{2}-[a-z]{2}\//;
    let [prefix, realPath] = separatePath(currentPath);

    let newURL = '';

    if (realPath == "/") {
        // 简体中文首页跳转到其他语言首页
        newURL = '/' + languageCode + '/';
    }
    else if (isLanguageCodeOnly(realPath) && languageCode == 'zh-cn') {
        // 其他语言首页跳转到简体中文首页
        newURL = '/';
    }
    else {
        // 查找并替换语言部分以生成新的URL
        newURL = realPath.replace(languageRegex, '/' + languageCode + '/');
    }

    // 重定向到新的URL
    window.location.href = prefix + newURL;
}

function isLanguageCodeOnly(str) {
    // 使用正则表达式检查字符串格式
    const regex = /^\/[a-z]{2}-[a-z]{2}\/$/;
    return regex.test(str);
}

function separatePath(path) {
    // 如果 path 以 githubProjectName 开头，则分离
    if (path.startsWith(githubProjectName)) {
        const prefix = githubProjectName;
        const realPath = path.substring(githubProjectName.length);
        return [prefix, realPath];
    } else {
        // 如果不是以 githubProjectName 开头，则没有前缀
        return ['', path];
    }
}
