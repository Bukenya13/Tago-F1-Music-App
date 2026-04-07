// src/js/home.js
export class Home {
    constructor() {
        // Don't auto-init, let the caller await init()
    }

    async init() {
        await this.render();
    }

    async render() {
        document.getElementById('app').innerHTML = `
            <div class="home">
                <!-- Animated Hero Section -->
                <div class="hero-section">
                    <div class="animated-bg">
                        <div class="music-note note-1">♪</div>
                        <div class="music-note note-2">♫</div>
                        <div class="music-note note-3">♪</div>
                        <div class="music-note note-4">♬</div>
                        <div class="music-note note-5">♫</div>
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                        <div class="circle circle-3"></div>
                        <div class="pulse-ring"></div>
                        <div class="pulse-ring pulse-ring-2"></div>
                    </div>
                    <div class="hero-content">
                        <h1 class="hero-title">🎵 Discover New Music</h1>
                        <p class="hero-subtitle">Powered by Tago F1 Music - Search for any artist, album, or track</p>
                    </div>
                </div>
                
                <div class="features">
                    <div class="feature-card">
                        <div class="feature-icon"><img class="reck" src="https://i.pinimg.com/736x/d5/d9/1a/d5d91a08b20fd7ad96c5f76790e651bd.jpg" alt="search icon"></div>
                        <h3>Smart Search</h3>
                        <p>Find music by name, artist, or album</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><img class="reck" src="https://i.pinimg.com/736x/fa/55/ec/fa55ecb70cab99b5512637993a44daed.jpg" alt="trending icon"></div>
                        <h3>Trending Tracks</h3>
                        <p>Discover what's popular globally</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                        <img class="reck" src="https://i.pinimg.com/736x/d8/cd/19/d8cd19e53ea470bcbac27bc6cbf6e9b5.jpg" alt="insights icon"></div>
                        <h3>Music Insights</h3>
                        <p>Get stats from Last.fm database</p>
                    </div>
                </div>
                
                <section class="trending-section">
                    <h2>🔥 Trending Tracks</h2>
                    <div id="trending-tracks" class="tracks-grid">
                        <div class="loading">Loading trending tracks...</div>
                    </div>
                </section>
                
                <section class="artists-section">
                    <h2>🎤 Top Artists</h2>
                    <div id="trending-artists" class="tracks-grid">
                        <div class="loading">Loading top artists...</div>
                    </div>
                </section>
            </div>
        `;
    }
}