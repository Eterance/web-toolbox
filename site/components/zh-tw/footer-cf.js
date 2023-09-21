// 可重複使用的 HTML 元件
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <!-- 頁腳底部置中： https://stackoverflow.com/a/40854221 -->
                <!-- 因為使用元件，所以底部置中的 class 移到外面 -->
                <div class="site-footer">
                    <p class="self-main-color">
                        © 2023 Eterance. 
                        <a class="no-underline" href="https://github.com/Eterance/web-toolbox" target="_blank" rel="nofollow">專案原始碼</a>
                    </p>
                    <p>
                        <a class="no-underline" href="https://pages.cloudflare.com/" target="_blank" rel="nofollow"> 
                            Power by
                            <img id="light-powerby-icon" src="/resources/CF_logomark.png" style="height:1rem;" alt="Server provider Cloudflare">
                            <img id="dark-powerby-icon" src="/resources/CF_logomark.png" style="height:1rem;" alt="Server provider Cloudflare">
                            Cloudflare Pages
                        </a>
                    </p>
                    <p>載入時間 <span id="loadTime"></span> 秒 | HTTP 請求 <span id="requestCount"></span> 次</p>
                </div>
            </footer>
            
        `;
    }
}

customElements.define('footer-component', Footer);