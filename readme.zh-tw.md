# Eterance 的百寶箱 (web-toolbox)

[简体中文](https://github.com/Eterance/web-toolbox/blob/main/readme.md) | 繁體中文 | [English](https://github.com/Eterance/web-toolbox/blob/main/readme.en-us.md)

## 這是什麼？

這是一個網頁版的工具箱，包含了一些有用的小工具。

這是一個徒手撸的 HTML+CSS+JavaScript 的純靜態網站，適配移動端視圖、多語言、支持亮暗模式。

## 網址

Cloudflare Pages：[https://tools.eterance.com/](https://tools.eterance.com/) （推薦）

Github Pages：[https://eterance.github.io/web-toolbox/](https://eterance.github.io/web-toolbox/)

如何部署在 Cloudflare Pages 參見：[https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/](https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/)（僅提供簡體中文）

## 如果我要自行部署這個工具箱，要修改什麼地方才能把它變成我的？

- 所有 HTML 文件中的 icon
- 所有 HTML 文件中的 `<title>` 標籤
- 如果你要使用 Cloudflare Pages，`.github/workflows/deploy.yml` 中的 `projectName` 欄位
- `site/components/` 中所有語言的 `navbar.js` 的網站標題、（如果 folk 了項目）`footer.js` 和 `footer-cf.js` 的項目連結
- 修改連結的CDN
- 