// Reusable HTML component
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <footer>
            <!-- Footer bottom center: https://stackoverflow.com/a/40854221 -->
            <!-- Move the bottom center class outside because we are using components -->
                <div class="site-footer">
                    <p class="self-main-color">
                        © 2023 Eterance. 
                        <a class="no-underline" href="https://github.com/Eterance/web-toolbox" target="_blank" rel="nofollow">Source Code</a>
                    </p>
                    <p>
                        <a class="no-underline" href="https://pages.cloudflare.com/" target="_blank" rel="nofollow"> 
                            Power by
                            <img id="light-powerby-icon" src="/resources/CF_logomark.png" style="height:1rem;" alt="Server provider Cloudflare">
                            <img id="dark-powerby-icon" src="/resources/CF_logomark.png" style="height:1rem;" alt="Server provider Cloudflare">
                            Cloudflare Pages
                        </a>                        
                    </p>
                    <p>Loading time <span id="loadTime"></span> s | HTTP requests <span id="requestCount"></span> times</p>
                </div>
            </footer>
            
        `;
    }
}

customElements.define('footer-component', Footer);