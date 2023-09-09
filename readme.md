# Eterance 的百宝箱 (web-toolbox)

## 这是什么？

这是一个网页版的工具箱，包含了一些有用的小工具。

这是一个徒手撸的 HTML+CSS+JavaScript 的纯静态网站。

## 网址

Cloudflare Pages：[https://tools.eterance.com/](https://tools.eterance.com/) （推荐）

Github Pages：[https://eterance.github.io/web-toolbox/](https://eterance.github.io/web-toolbox/)

如何部署在 Cloudflare Pages 参见：[https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/](https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/)

## 如果我要自行部署这个工具箱，要修改什么地方才能把它变成我的？

- 所有 HTML 文件中的 icon
- 所有 HTML 文件中的 `<title>` 标签
- 如果你要使用 Cloudflare Pages，`.github/workflows/deploy.yml` 中的 `projectName` 字段
- `site/components/` 中所有语言的 `navbar.js` 的网站标题、（如果 folk 了项目）`footer.js` 和 `footer-cf.js` 的项目链接
