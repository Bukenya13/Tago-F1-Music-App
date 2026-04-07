// src/js/footer.js
export class Footer {
    constructor() {
        this.container = document.getElementById('footer-container');
        this.init();
    }

    async init() {
        await this.render();
    }

    async render() {
        // INSERT the footer HTML
        this.container.innerHTML = `
            <footer class="app-footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Tago F1 Music</h3>
                        <p>Discover new music powered by Tago F1 music</p>
                        <div class="social-links">
                            <a href="https://www.Tago F1 music" target="_blank">Visit Tago F1 music</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Features</h4>
                        <ul class="api-links">
                            <li>🔍 Search Tracks & Artists</li>
                            <li>🔥 Trending Music</li>
                            <li>❤️ Save Favorites</li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="#" data-page="home">Home</a></li>
                            <li><a href="#" data-page="trending">Trending</a></li>
                            <li><a href="#" data-page="favorites">Favorites</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Tago F1 music </p>
                    <p class="disclaimer"> Developed by Bukenya Lawrence </p>
                </div>
            </footer>
        `;

        // Add click events to footer links
        this.container.querySelectorAll('a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                window.dispatchEvent(new CustomEvent('page-change', { detail: { page } }));
            });
        });
    }
}