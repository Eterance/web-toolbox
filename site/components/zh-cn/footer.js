// 可重用的 html 组件
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <!-- 页脚底部居中： https://stackoverflow.com/a/40854221 -->
                <!-- 因为使用组件，因此底部居中class移到外面 -->
                <div class="site-footer">
                    <p class="self-main-color">
                        © 2023 Eterance. 
                        <a class="no-underline" href="https://github.com/Eterance/web-toolbox" target="_blank" rel="nofollow">项目源码</a>
                    </p>
                    <p>
                        <a class="no-underline" href="https://pages.github.com/" target="_blank" rel="nofollow"> 
                            Power by
                            <img id="light-powerby-icon" src="/resources/github-mark.png" style="height:1.3rem;" alt="Server provider Github">
                            <img id="dark-powerby-icon" src="/resources/github-mark-white.png" style="height:1.3rem;" alt="Server provider Github">
                            Github Pages
                        </a>
                        
                    </p>
                    <p>加载耗时 <span id="loadTime"></span> 秒 | HTTP请求 <span id="requestCount"></span> 次</p>
                </div>
            </footer>
            
        `;
    }
}

customElements.define('footer-component', Footer);