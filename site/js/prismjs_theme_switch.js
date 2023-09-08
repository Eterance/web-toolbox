// 获取切换按钮和两个样式表的引用
const themeToggle2 = document.getElementById('darkModeToggle');
const lightStylesheet = document.getElementById('prism-stylesheet-light');
const darkStylesheet = document.getElementById('prism-stylesheet-dark');
const savedTheme = localStorage.getItem('theme');
// 根据localStorage中的值设置初始主题
if (savedTheme === 'dark') {
    themeToggle2.checked = true;
    lightStylesheet.disabled = true;
    darkStylesheet.disabled = false;
} else {
    lightStylesheet.disabled = false;
    darkStylesheet.disabled = true;
}
// 监听切换按钮的变化
themeToggle2.addEventListener('change', function() {
    // 根据切换按钮的状态切换主题
    if (themeToggle2.checked) {
        lightStylesheet.disabled = true; // 禁用亮色主题
        darkStylesheet.disabled = false; // 启用暗色主题
    } else {
        lightStylesheet.disabled = false; // 启用亮色主题
        darkStylesheet.disabled = true; // 禁用暗色主题
    }
    // 重新初始化 Prism.js，以确保新主题生效
    Prism.highlightAll();
});