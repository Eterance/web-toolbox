class NavBar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <!-- Navigation Bar -->
            <!-- Navigation Bar hover color change https://codingyaar.com/bootstrap-navbar-hover-background-color/-->
            <nav class="navbar navbar-expand-lg">
                <!-- Website Title -->
                <div class="container">
                    <a class="navbar-brand logo-font self-main-color" href="/en-us/">
                        <img src="/resources/NFS11-256.png" class="site-icon" alt="Site Icon">
                        Eterance's Toolbox
                    </a>
        
                    <!-- Toggle Button (for small screen devices)-->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
        
                    <!-- Navigation Links -->
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/en-us/">
                                    <i class="fa-solid fa-screwdriver-wrench"></i>
                                    Tool List
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://blog.baldcoder.top" target="_blank">
                                    <i class="fa-solid fa-blog"></i>
                                    Blog
                                </a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-language fa-lg"></i>
                                    English(US)
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="javascript:void(0);" onclick="changeLanguage('zh-cn')">
                                            中文(简体) <span class="lang-explain">Chinese(Simplified)</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="javascript:void(0);" onclick="changeLanguage('zh-tw')">
                                            中文(繁體) <span class="lang-explain">Chinese(Traditional)</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                            <li class="nav-item">
                                <div class="form-check form-switch nav-toggle">
                                    <input class="form-check-input" type="checkbox" role="switch" id="darkModeToggle">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Dark Mode</label>
                                </div>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('navbar-component', NavBar);