// src/js/search.js
// Note: Search functionality is now handled in app.js using Last.fm API

export class Search {
    constructor(query) {
        this.query = query;
        this.init();
    }
    
    async init() {
        // Search is handled by MusicApp.handleSearch()
        // This class is kept for backwards compatibility
        window.dispatchEvent(new CustomEvent('search', { detail: { query: this.query } }));
    }
}