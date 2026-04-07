// src/js/trending.js
import { lastfmApi } from './api/lastfm.js';

export class Trending {
    constructor() {
        this.init();
    }
    
    async init() {
        await this.render();
        await this.loadContent();
    }
    
    async render() {
        document.getElementById('app').innerHTML = `
            <div class="trending-page">
                <h1>🔥 Trending Now</h1>
                <p class="subtitle">Discover what's popular globally on Last.fm</p>
                
                <section class="trending-section">
                    <h2>Top Tracks</h2>
                    <div id="top-tracks" class="tracks-grid">
                        <div class="loading">Loading top tracks...</div>
                    </div>
                </section>
                
                <section class="trending-section">
                    <h2>Top Artists</h2>
                    <div id="top-artists" class="tracks-grid">
                        <div class="loading">Loading top artists...</div>
                    </div>
                </section>
                
                <section class="trending-section">
                    <h2>Popular Tags</h2>
                    <div id="top-tags" class="tags-grid">
                        <div class="loading">Loading tags...</div>
                    </div>
                </section>
            </div>
        `;
    }
    
    async loadContent() {
        try {
            // Load all content in parallel
            const [tracks, artists, tags] = await Promise.all([
                lastfmApi.getTopTracks(20),
                lastfmApi.getTopArtists(12),
                lastfmApi.getTopTags()
            ]);
            
            this.displayTracks(tracks);
            this.displayArtists(artists);
            this.displayTags(tags);
        } catch (error) {
            console.error('Failed to load trending content:', error);
        }
    }
    
    displayTracks(tracks) {
        const container = document.getElementById('top-tracks');
        if (!tracks || tracks.length === 0) {
            container.innerHTML = '<div class="no-results">No tracks found</div>';
            return;
        }
        
        container.innerHTML = tracks.map(track => `
            <div class="track-card" data-track='${JSON.stringify(track).replace(/'/g, "&#39;")}'>
                <div class="track-image">
                    <img src="${track.image || 'https://via.placeholder.com/300?text=No+Image'}" alt="${track.name}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                    <div class="play-overlay">▶</div>
                </div>
                <div class="track-content">
                    <div class="track-title">${track.name}</div>
                    <div class="track-artist">${track.artist}</div>
                    ${track.listeners ? `<div class="track-stats">👥 ${parseInt(track.listeners).toLocaleString()} listeners</div>` : ''}
                </div>
            </div>
        `).join('');
        
        // Add click events
        container.querySelectorAll('.track-card').forEach(card => {
            card.addEventListener('click', () => {
                const track = JSON.parse(card.dataset.track.replace(/&#39;/g, "'"));
                window.app.player.playTrack(track);
            });
        });
    }
    
    displayArtists(artists) {
        const container = document.getElementById('top-artists');
        if (!artists || artists.length === 0) {
            container.innerHTML = '<div class="no-results">No artists found</div>';
            return;
        }
        
        container.innerHTML = artists.map(artist => `
            <div class="artist-card" data-name="${artist.name}">
                <div class="artist-image">
                    <img src="${artist.image || 'https://via.placeholder.com/300?text=Artist'}" alt="${artist.name}" onerror="this.src='https://via.placeholder.com/300?text=Artist'">
                </div>
                <div class="artist-content">
                    <div class="artist-name">${artist.name}</div>
                    ${artist.listeners ? `<div class="artist-stats">👥 ${parseInt(artist.listeners).toLocaleString()} listeners</div>` : ''}
                    <a href="${artist.url}" target="_blank" class="artist-link">View on Last.fm</a>
                </div>
            </div>
        `).join('');
        
        // Add click to search for artist
        container.querySelectorAll('.artist-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('artist-link')) {
                    const artistName = card.dataset.name;
                    window.dispatchEvent(new CustomEvent('search', { detail: { query: artistName } }));
                }
            });
        });
    }
    
    displayTags(tags) {
        const container = document.getElementById('top-tags');
        if (!tags || tags.length === 0) {
            container.innerHTML = '<div class="no-results">No tags found</div>';
            return;
        }
        
        container.innerHTML = tags.slice(0, 20).map(tag => `
            <a href="${tag.url}" target="_blank" class="tag-chip">${tag.name}</a>
        `).join('');
    }
}
