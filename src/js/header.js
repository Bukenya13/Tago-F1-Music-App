// src/js/header.js
export class Header {
    constructor() {
        this.container = document.getElementById('header-container');
        this.init();
    }

    async init() {
        await this.render();
        this.bindEvents();
    }

    async render() {
        // INSERT the header HTML
        this.container.innerHTML = `
            <header class="app-header">
                <div class="header-container">
                    <div class="logo">
                        <h1><img src="https://i.pinimg.com/1200x/f6/12/76/f612762f17326aede2c5bd8fbc875a8a.jpg" alt="Tago F1 Music" class="logo-img"> Tago F1 Music</h1>
                    </div>
                    
                    <div class="search-section">
                        <div class="search-box">
                            <input type="text" id="search-input" 
                                   placeholder="Search artists, songs, albums..." 
                                   class="search-input">
                            <button id="search-btn" class="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                                          stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                <nav class="main-nav">
                    <a href="#" class="nav-link active" data-page="home">Home</a>
                    <a href="#" class="nav-link" data-page="trending">Trending</a>
                    <a href="#" class="nav-link" data-page="favorites">💎 Favorites</a>
                    <a href="#" class="nav-link" data-page="about">About</a>
                </nav>
            </header>
        `;
    }

    bindEvents() {
        // Search button
        document.getElementById('search-btn')?.addEventListener('click', () => {
            const query = document.getElementById('search-input').value.trim();
            if (query) {
                window.dispatchEvent(new CustomEvent('search', { detail: { query } }));
            }
        });

        // Enter key in search
        document.getElementById('search-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-btn')?.click();
            }
        });

        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;

                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                // Dispatch page change event
                window.dispatchEvent(new CustomEvent('page-change', { detail: { page } }));
            });
        });
    }
}