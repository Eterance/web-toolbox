# Eterance Web Toolbox

[简体中文](https://github.com/Eterance/web-toolbox/blob/main/readme.md) | [繁體中文](https://github.com/Eterance/web-toolbox/blob/main/readme.zh-tw.md) | English

## What is this?

This is a web-based toolbox that contains some useful small tools.

This is a purely static website handcrafted with HTML+CSS+JavaScript, with support for mobile view, multiple languages, and light/dark mode.

## URLs

Cloudflare Pages: [https://tools.eterance.com/](https://tools.eterance.com/) (Recommended)

Github Pages: [https://eterance.github.io/web-toolbox/](https://eterance.github.io/web-toolbox/)

For instructions on deploying with Cloudflare Pages, refer to: [https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/](https://blog.eterance.com/articles/deploying-a-static-website-with-github-action-and-cloudflare-pages/) (Simplified Chinese only)

## What do I need to modify if I want to deploy this toolbox on my own?

- The icons in all HTML files
- The `<title>` tags in all HTML files
- The `projectName` field in `.github/workflows/deploy.yml` if you want to use Cloudflare Pages
- The website title in `navbar.js` for all languages in `site/components/`, and the project links in `footer.js` and `footer-cf.js` (if you have forked the project)
- Modify the CDN links