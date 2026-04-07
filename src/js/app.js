// src/js/app.js
import { Header } from './header.js';
import { Footer } from './footer.js';
import { Home } from './home.js';
import { lastfmApi } from './api/lastfm.js';
import { itunesApi } from './api/itunes.js';
import { youtubeApi, YouTubePlayer } from './api/youtube.js';
import { APP_NAME } from './utils/constants.js';

// Music Player with Audio Playback
class MusicPlayer {
    constructor() {
        this.container = document.getElementById('player-container');
        this.currentTrack = null;
        this.audioElement = null;
        this.isPlaying = false;
        this.progressInterval = null;
        this.init();
    }

    async init() {
        await this.render();
        this.setupAudioPlayer();
    }

    setupAudioPlayer() {
        // Create HTML5 audio element
        this.audioElement = new Audio();
        this.audioElement.id = 'audio-player';
        this.audioElement.controls = false;
        this.audioElement.crossOrigin = 'anonymous'; // Enable CORS for iTunes preview URLs
        this.audioElement.volume = 0.8; // Set initial volume to 80%
        this.audioElement.preload = 'metadata'; // Changed from 'auto' to avoid CORS issues

        // Append to body for proper browser handling
        document.body.appendChild(this.audioElement);

        console.log('Audio element created and appended to DOM');

        // Listen to audio events
        this.audioElement.addEventListener('play', () => {
            this.isPlaying = true;
            document.getElementById('play-pause-btn').textContent = '⏸';
            document.getElementById('player-status').textContent = '🎵 Playing...';
            const equalizer = document.getElementById('playing-indicator');
            if (equalizer) equalizer.style.display = 'flex';
            document.getElementById('music-player')?.classList.add('playing');
            this.startProgressUpdate();
        });

        this.audioElement.addEventListener('pause', () => {
            this.isPlaying = false;
            document.getElementById('play-pause-btn').textContent = '▶';
            document.getElementById('player-status').textContent = '⏸ Paused';
            const equalizer = document.getElementById('playing-indicator');
            if (equalizer) equalizer.style.display = 'none';
            document.getElementById('music-player')?.classList.remove('playing');
            this.stopProgressUpdate();
        });

        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            document.getElementById('play-pause-btn').textContent = '▶';
            document.getElementById('player-status').textContent = '🔁 Track ended - Click play to replay';
            const equalizer = document.getElementById('playing-indicator');
            if (equalizer) equalizer.style.display = 'none';
            document.getElementById('music-player')?.classList.remove('playing');
            this.stopProgressUpdate();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        this.audioElement.addEventListener('loadedmetadata', () => {
            const duration = this.audioElement.duration;
            if (duration && duration !== Infinity) {
                document.getElementById('duration').textContent = this.formatTime(duration);
                document.getElementById('player-status').textContent = '🎵 Ready to play';
            }
        });

        this.audioElement.addEventListener('canplay', () => {
            console.log('Audio can play now');
            document.getElementById('player-status').textContent = '🎵 Ready to play';
        });

        this.audioElement.addEventListener('error', (e) => {
            const errorMessage = this.audioElement.error?.message || 'Unknown error';
            const errorCode = this.audioElement.error?.code || 'UNKNOWN';
            console.error('Audio error event:', {
                code: errorCode,
                message: errorMessage,
                networkState: this.audioElement.networkState,
                readyState: this.audioElement.readyState,
                src: this.audioElement.src
            });
            document.getElementById('player-status').textContent = `⚠ Audio error: ${errorMessage}`;
        });

        this.audioElement.addEventListener('loadstart', () => {
            console.log('Audio loading started...');
            document.getElementById('player-status').textContent = '⏳ Loading audio...';
        });
    }

    updateProgress() {
        if (this.audioElement && this.audioElement.duration) {
            const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            document.getElementById('progress-bar').value = progress;
            document.getElementById('current-time').textContent = this.formatTime(this.audioElement.currentTime);
        }
    }

    async render() {
        this.container.innerHTML = `
            <div id="music-player" class="spotify-player" style="display: none;">
                <div class="player-header">
                    <h3>
                        <span id="playing-indicator" class="equalizer" style="display: none;">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </span>
                        Now Playing
                    </h3>
                    <button id="close-player" class="close-btn">✕</button>
                </div>
                <div class="player-content">
                    <div class="track-display">
                        <img id="player-image" class="album-art" src="" alt="">
                        <div class="track-info">
                            <div id="player-title" class="track-name">Select a track</div>
                            <div id="player-artist" class="artist-name"></div>
                            <div id="player-album" class="album-name"></div>
                        </div>
                    </div>
                    
                    <div class="player-center">
                        <!-- Playback Controls -->
                        <div class="playback-controls">
                            <button id="prev-btn" class="playback-btn" title="Previous">⏮</button>
                            <button id="play-pause-btn" class="playback-btn play-btn" title="Play/Pause">▶</button>
                            <button id="next-btn" class="playback-btn" title="Next">⏭</button>
                        </div>
                        
                        <!-- Audio Progress Bar -->
                        <div class="audio-progress">
                            <span id="current-time">0:00</span>
                            <input type="range" id="progress-bar" class="progress-bar" value="0" min="0" max="100">
                            <span id="duration">0:00</span>
                        </div>
                        
                        <div id="player-status" class="player-status">Ready</div>
                    </div>
                    
                    <div class="volume-control">
                        <span>🔊</span>
                        <input type="range" id="volume-bar" class="volume-bar" value="80" min="0" max="100">
                    </div>
                    
                    <div class="player-actions">
                        <button id="add-to-favorites" class="action-btn">❤ Add</button>
                        <a id="lastfm-link" href="#" target="_blank" class="action-btn">📟 Last.fm</a>
                        <a id="itunes-link" href="#" target="_blank" class="action-btn">🎵 iTunes</a>
                        <a id="youtube-link" href="#" target="_blank" class="action-btn">📺 YouTube</a>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    startProgressUpdate() {
        this.stopProgressUpdate();
        this.progressInterval = setInterval(() => {
            this.updateProgress();
        }, 100);
    }

    stopProgressUpdate() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    bindEvents() {
        document.getElementById('close-player')?.addEventListener('click', () => {
            this.hidePlayer();
        });

        document.getElementById('play-pause-btn')?.addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('prev-btn')?.addEventListener('click', () => {
            if (this.audioElement && this.audioElement.currentTime) {
                this.audioElement.currentTime = 0;
            }
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            if (this.audioElement) {
                this.audioElement.currentTime = Math.min(
                    this.audioElement.currentTime + 10,
                    this.audioElement.duration
                );
            }
        });

        document.getElementById('progress-bar')?.addEventListener('input', (e) => {
            if (this.audioElement && this.audioElement.duration) {
                const time = (e.target.value / 100) * this.audioElement.duration;
                this.audioElement.currentTime = time;
            }
        });

        document.getElementById('volume-bar')?.addEventListener('input', (e) => {
            if (this.audioElement) {
                this.audioElement.volume = e.target.value / 100;
            }
        });

        document.getElementById('add-to-favorites')?.addEventListener('click', () => {
            if (this.currentTrack) {
                this.addToFavorites();
            }
        });
    }

    togglePlayPause() {
        if (this.audioElement) {
            if (this.isPlaying) {
                this.audioElement.pause();
            } else {
                this.audioElement.play().catch(error => {
                    console.error('Playback error:', error);
                    document.getElementById('player-status').textContent = '⚠ Unable to play audio';
                });
            }
        }
    }

    async playTrack(track) {
        this.currentTrack = track;
        const player = document.getElementById('music-player');
        const statusEl = document.getElementById('player-status');

        // Show player and update UI
        player.style.display = 'block';
        document.getElementById('player-title').textContent = track.name;
        document.getElementById('player-artist').textContent = track.artist;
        document.getElementById('player-image').src = track.image || 'https://via.placeholder.com/300?text=No+Image';
        document.getElementById('player-album').textContent = track.album || '';

        // Reset progress
        document.getElementById('progress-bar').value = 0;
        document.getElementById('current-time').textContent = '0:00';
        document.getElementById('duration').textContent = '0:00';

        // Set external links
        document.getElementById('lastfm-link').href = track.url || `https://www.last.fm/music/${encodeURIComponent(track.artist)}/_/${encodeURIComponent(track.name)}`;

        // Search for YouTube video and set link
        try {
            const youtubeResult = await youtubeApi.searchTrack(track.name, track.artist);
            if (youtubeResult) {
                if (youtubeResult.isFallback) {
                    document.getElementById('youtube-link').href = youtubeResult.searchUrl;
                } else {
                    document.getElementById('youtube-link').href = `https://www.youtube.com/watch?v=${youtubeResult.videoId}`;
                }
            } else {
                document.getElementById('youtube-link').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' ' + track.artist)}`;
            }
        } catch (error) {
            console.error('YouTube search error:', error);
            document.getElementById('youtube-link').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' ' + track.artist)}`;
        }

        // Stop any current playback
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        this.isPlaying = false;
        document.getElementById('play-pause-btn').textContent = '▶';

        // Search for track preview on iTunes
        statusEl.textContent = '🔍 Finding audio preview...';
        console.log('Searching for:', track.name, 'by', track.artist);

        try {
            const itunesTrack = await itunesApi.searchTrack(track.name, track.artist);
            console.log('iTunes response:', itunesTrack);

            if (itunesTrack && itunesTrack.previewUrl) {
                console.log('Preview URL found:', itunesTrack.previewUrl);

                // Set iTunes link
                document.getElementById('itunes-link').href = `https://itunes.apple.com/us/search?term=${encodeURIComponent(track.name + ' ' + track.artist)}`;

                // Update album art if available
                if (itunesTrack.artworkUrl) {
                    document.getElementById('player-image').src = itunesTrack.artworkUrl;
                }

                // Set the source with CORS proxy fallback
                let audioUrl = itunesTrack.previewUrl;
                console.log('Using audio URL:', audioUrl);

                this.audioElement.src = audioUrl;
                console.log('Audio src set, calling load()...');

                // Reset state before playing
                this.audioElement.load();

                // Attempt to play with proper error handling
                statusEl.textContent = '⏳ Loading audio...';

                const playPromise = this.audioElement.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Playback started successfully');
                            statusEl.textContent = '🎵 Playing...';
                        })
                        .catch(error => {
                            console.error('❌ Play error:', error.name, error.message);
                            statusEl.textContent = `⚠ Cannot play this track: ${error.name}`;
                        });
                } else {
                    console.log('⚠ Browser does not support play promise - trying anyway');
                    statusEl.textContent = '🎵 Attempting playback...';
                }

            } else {
                console.log('❌ No preview URL found in iTunes response');
                statusEl.textContent = '😢 No audio preview available for this track';
                document.getElementById('itunes-link').href = `https://itunes.apple.com/us/search?term=${encodeURIComponent(track.artist + ' ' + track.name)}`;
            }
        } catch (error) {
            console.error('❌ Failed to search iTunes:', error);
            statusEl.textContent = `⚠ Error: ${error.message}`;
            document.getElementById('itunes-link').href = `https://itunes.apple.com/us/search?term=${encodeURIComponent(track.artist + ' ' + track.name)}`;
        }
    }

    startProgressUpdate() {
        this.stopProgressUpdate();
        this.progressInterval = setInterval(() => {
            this.updateProgress();
        }, 100);
    }

    stopProgressUpdate() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    bindEvents() {
        document.getElementById('close-player')?.addEventListener('click', () => {
            this.hidePlayer();
        });

        document.getElementById('play-pause-btn')?.addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('prev-btn')?.addEventListener('click', () => {
            if (this.audioElement && this.audioElement.currentTime) {
                this.audioElement.currentTime = 0;
            }
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            if (this.audioElement) {
                this.audioElement.currentTime = Math.min(
                    this.audioElement.currentTime + 10,
                    this.audioElement.duration
                );
            }
        });

        document.getElementById('progress-bar')?.addEventListener('input', (e) => {
            if (this.audioElement && this.audioElement.duration) {
                const time = (e.target.value / 100) * this.audioElement.duration;
                this.audioElement.currentTime = time;
            }
        });

        document.getElementById('volume-bar')?.addEventListener('input', (e) => {
            if (this.audioElement) {
                this.audioElement.volume = e.target.value / 100;
            }
        });

        document.getElementById('add-to-favorites')?.addEventListener('click', () => {
            if (this.currentTrack) {
                this.addToFavorites();
            }
        });
    }

    addToFavorites() {
        if (!this.currentTrack) return;

        const favorites = JSON.parse(localStorage.getItem('music_favorites') || '[]');

        // Check if already in favorites
        const exists = favorites.some(f => f.id === this.currentTrack.id);
        if (exists) {
            document.getElementById('player-status').textContent = `"${this.currentTrack.name}" is already in favorites!`;
            return;
        }

        favorites.push(this.currentTrack);
        localStorage.setItem('music_favorites', JSON.stringify(favorites));
        document.getElementById('player-status').textContent = `❤ Added "${this.currentTrack.name}" to favorites!`;
    }

    hidePlayer() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        this.stopProgressUpdate();
        this.isPlaying = false;
        const player = document.getElementById('music-player');
        player.style.display = 'none';
    }
}

// Main App
class MusicApp {
    constructor() {
        console.log('Music App with Last.fm API Starting...');
        this.init();
    }

    async init() {
        try {
            // Initialize components - wait for async inits to complete
            this.header = new Header();
            this.footer = new Footer();
            this.player = new MusicPlayer();
            this.home = new Home();

            // Wait for home to render before loading data
            await this.home.init();

            // Load trending tracks and artists from Last.fm with timeout
            await Promise.race([
                Promise.all([
                    this.loadTrendingTracks(),
                    this.loadTopArtists()
                ]),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('API timeout after 10 seconds')), 10000)
                )
            ]);

            this.bindEvents();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showErrorState(error);
        }
    }

    async loadTrendingTracks() {
        try {
            const tracks = await lastfmApi.getTopTracks(18);
            this.displayTracks(tracks, 'trending-tracks');
        } catch (error) {
            console.error('Failed to load trending tracks:', error);
            const container = document.getElementById('trending-tracks');
            if (container) {
                container.innerHTML = '<div class="error-message">Could not load trending tracks. Check your internet connection.</div>';
            }
        }
    }

    async loadTopArtists() {
        try {
            const artists = await lastfmApi.getTopArtists(18);
            this.displayArtists(artists);
        } catch (error) {
            console.error('Failed to load top artists:', error);
            const container = document.getElementById('top-artists');
            if (container) {
                container.innerHTML = '<div class="error-message">Could not load top artists. Check your internet connection.</div>';
            }
        }
    }

    showErrorState(error) {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = `
            <div class="error-state">
                <h2>⚠️ Unable to Load App</h2>
                <p>There was an issue loading the music discovery app.</p>
                <p class="error-details">${error.message}</p>
                <button class="retry-btn" onclick="location.reload()">Reload Page</button>
            </div>
        `;
    }

    async handleSearch(query) {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="search-page">
                <h2>🔍 Search Results for "${query}"</h2>
                <div class="search-tabs">
                    <button class="tab-btn active" data-tab="tracks">Tracks</button>
                    <button class="tab-btn" data-tab="artists">Artists</button>
                    <button class="tab-btn" data-tab="albums">Albums</button>
                </div>
                <div class="loading">Searching Last.fm...</div>
                <div id="search-results" class="tracks-grid"></div>
            </div>
        `;

        try {
            // Search tracks by default
            const tracks = await lastfmApi.searchTracks(query, 20);
            this.displayTracks(tracks, 'search-results');

            // Setup tab switching
            this.setupSearchTabs(query);
        } catch (error) {
            console.error('Search error:', error);
            app.innerHTML = `
                <div class="error">
                    <h3>❌ Search Failed</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }

    setupSearchTabs(query) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                // Update active tab
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const tab = e.target.dataset.tab;
                const container = document.getElementById('search-results');
                container.innerHTML = '<div class="loading">Loading...</div>';

                try {
                    if (tab === 'tracks') {
                        const tracks = await lastfmApi.searchTracks(query, 20);
                        this.displayTracks(tracks, 'search-results');
                    } else if (tab === 'artists') {
                        const artists = await lastfmApi.searchArtists(query, 20);
                        this.displayArtists(artists, 'search-results');
                    } else if (tab === 'albums') {
                        const albums = await lastfmApi.searchAlbums(query, 20);
                        this.displayAlbums(albums, 'search-results');
                    }
                } catch (error) {
                    container.innerHTML = `<div class="error">Failed to load ${tab}: ${error.message}</div>`;
                }
            });
        });
    }

    displayTracks(tracks, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!tracks || tracks.length === 0) {
            container.innerHTML = '<div class="no-results">No tracks found</div>';
            return;
        }

        const placeholder = 'https://via.placeholder.com/300/1a1a2e/ffffff?text=♪';

        container.innerHTML = tracks.map(track => `
            <div class="track-card" data-id="${track.id}" data-name="${track.name}" data-artist="${track.artist}">
                <div class="track-image">
                    <img src="${placeholder}" alt="${track.name}" data-track-name="${track.name}" data-artist-name="${track.artist}" class="lazy-artwork">
                    <div class="play-overlay">▶</div>
                </div>
                <div class="track-content">
                    <div class="track-title">${track.name}</div>
                    <div class="track-artist">${track.artist}</div>
                    ${track.listeners ? `<div class="track-stats">👥 ${parseInt(track.listeners).toLocaleString()} listeners</div>` : ''}
                    <div class="track-actions">
                        <button class="play-btn" data-track='${JSON.stringify(track).replace(/'/g, "&#39;")}'>
                            ▶ Play
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click events
        this.bindTrackEvents(container, tracks);

        // Load artwork using Deezer API (most reliable for images)
        this.loadTrackArtwork(container);
    }

    async loadTrackArtwork(container) {
        const images = container.querySelectorAll('.lazy-artwork');

        // JSONP helper for Deezer API (bypasses CORS)
        const fetchDeezerJSONP = (query) => {
            return new Promise((resolve, reject) => {
                const callbackName = `deezerCallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                const script = document.createElement('script');

                // Timeout after 5 seconds
                const timeout = setTimeout(() => {
                    cleanup();
                    reject(new Error('Timeout'));
                }, 5000);

                const cleanup = () => {
                    clearTimeout(timeout);
                    delete window[callbackName];
                    if (script.parentNode) script.parentNode.removeChild(script);
                };

                window[callbackName] = (data) => {
                    cleanup();
                    resolve(data);
                };

                script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=1&output=jsonp&callback=${callbackName}`;
                script.onerror = () => {
                    cleanup();
                    reject(new Error('Script error'));
                };

                document.head.appendChild(script);
            });
        };

        // Get artwork from Deezer using JSONP
        const getArtworkFromDeezer = async (trackName, artistName) => {
            try {
                const data = await fetchDeezerJSONP(`${artistName} ${trackName}`);

                if (data.data && data.data.length > 0) {
                    return data.data[0].album?.cover_big || data.data[0].album?.cover_medium;
                }
                return null;
            } catch {
                return null;
            }
        };

        // Load images sequentially to avoid overwhelming the API
        for (const img of images) {
            const trackName = img.dataset.trackName;
            const artistName = img.dataset.artistName;

            try {
                const artwork = await getArtworkFromDeezer(trackName, artistName);

                if (artwork) {
                    img.src = artwork;
                    img.classList.add('loaded');
                }
            } catch (error) {
                // Keep placeholder on error
            }
        }
    }

    displayArtists(artists, containerId = 'trending-artists') {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!artists || artists.length === 0) {
            container.innerHTML = '<div class="no-results">No artists found</div>';
            return;
        }

        const placeholder = 'https://via.placeholder.com/300/1a1a2e/ffffff?text=🎤';

        container.innerHTML = artists.map(artist => `
            <div class="artist-card" data-name="${artist.name}">
                <div class="artist-image">
                    <img src="${placeholder}" alt="${artist.name}" data-artist-name="${artist.name}" class="lazy-artist-artwork">
                </div>
                <div class="artist-content">
                    <div class="artist-name">${artist.name}</div>
                    ${artist.listeners ? `<div class="artist-stats">👥 ${parseInt(artist.listeners).toLocaleString()} listeners</div>` : ''}
                    <a href="${artist.url}" target="_blank" class="artist-link">View on Last.fm</a>
                </div>
            </div>
        `).join('');

        // Add click to search for artist's tracks
        container.querySelectorAll('.artist-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('artist-link')) {
                    const artistName = card.dataset.name;
                    this.handleSearch(artistName);
                }
            });
        });

        // Load artist artwork using Deezer API
        this.loadArtistArtwork(container);
    }

    async loadArtistArtwork(container) {
        const images = container.querySelectorAll('.lazy-artist-artwork');

        // JSONP helper for Deezer API (bypasses CORS)
        const fetchDeezerJSONP = (endpoint, query) => {
            return new Promise((resolve, reject) => {
                const callbackName = `deezerCallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                const script = document.createElement('script');

                const timeout = setTimeout(() => {
                    cleanup();
                    reject(new Error('Timeout'));
                }, 5000);

                const cleanup = () => {
                    clearTimeout(timeout);
                    delete window[callbackName];
                    if (script.parentNode) script.parentNode.removeChild(script);
                };

                window[callbackName] = (data) => {
                    cleanup();
                    resolve(data);
                };

                script.src = `https://api.deezer.com/${endpoint}?q=${encodeURIComponent(query)}&limit=1&output=jsonp&callback=${callbackName}`;
                script.onerror = () => {
                    cleanup();
                    reject(new Error('Script error'));
                };

                document.head.appendChild(script);
            });
        };

        // Get artist image from Deezer using JSONP
        const getArtistFromDeezer = async (artistName) => {
            try {
                const data = await fetchDeezerJSONP('search/artist', artistName);

                if (data.data && data.data.length > 0) {
                    return data.data[0].picture_big || data.data[0].picture_medium;
                }
                return null;
            } catch {
                return null;
            }
        };

        // Load images sequentially
        for (const img of images) {
            const artistName = img.dataset.artistName;

            try {
                const artwork = await getArtistFromDeezer(artistName);

                if (artwork) {
                    img.src = artwork;
                    img.classList.add('loaded');
                }
            } catch (error) {
                // Keep placeholder on error
            }
        }
    }

    displayAlbums(albums, containerId = 'trending-albums') {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!albums || albums.length === 0) {
            container.innerHTML = '<div class="no-results">No albums found</div>';
            return;
        }

        container.innerHTML = albums.map(album => `
            <div class="album-card">
                <div class="album-image">
                    <img src="${album.image || 'https://via.placeholder.com/300?text=Album'}" alt="${album.name}" onerror="this.src='https://via.placeholder.com/300?text=Album'">
                </div>
                <div class="album-content">
                    <div class="album-title">${album.name}</div>
                    <div class="album-artist">${album.artist}</div>
                    <a href="${album.url}" target="_blank" class="album-link">View on Last.fm</a>
                </div>
            </div>
        `).join('');
    }

    bindTrackEvents(container, tracks) {
        // Handle play button clicks
        container.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                // Get the button element (might be the text inside)
                const button = e.target.closest('.play-btn');
                if (!button || !button.dataset.track) {
                    console.error('No track data found on button');
                    return;
                }

                try {
                    const trackData = button.dataset.track.replace(/&#39;/g, "'");
                    const track = JSON.parse(trackData);
                    console.log('Playing track:', track);
                    this.player.playTrack(track);
                } catch (err) {
                    console.error('Error parsing track data:', err);
                }
            });
        });

        // Handle track card clicks (anywhere on the card)
        container.querySelectorAll('.track-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the play button
                if (e.target.closest('.play-btn')) return;

                const trackId = card.dataset.id;
                const track = tracks.find(t => t.id === trackId);
                if (track) {
                    console.log('Playing track from card click:', track);
                    this.player.playTrack(track);
                }
            });
        });

        // Handle play overlay clicks
        container.querySelectorAll('.play-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.track-card');
                if (card) {
                    const trackId = card.dataset.id;
                    const track = tracks.find(t => t.id === trackId);
                    if (track) {
                        console.log('Playing track from overlay:', track);
                        this.player.playTrack(track);
                    }
                }
            });
        });
    }

    async showTrending() {
        this.home = new Home();
        await this.loadTrendingTracks();
        await this.loadTopArtists();
    }

    async showFavorites() {
        const app = document.getElementById('app');
        const favorites = JSON.parse(localStorage.getItem('music_favorites') || '[]');

        app.innerHTML = `
            <div class="favorites-page">
                <h2>❤ My Favorites</h2>
                <div id="favorites-list" class="tracks-grid"></div>
            </div>
        `;

        if (favorites.length === 0) {
            document.getElementById('favorites-list').innerHTML = '<div class="no-results">No favorites yet. Click the ❤ button on any track to add it!</div>';
        } else {
            this.displayTracks(favorites, 'favorites-list');
        }
    }

    bindEvents() {
        window.addEventListener('search', (e) => {
            this.handleSearch(e.detail.query);
        });

        window.addEventListener('page-change', async (e) => {
            if (e.detail.page === 'home') {
                this.home = new Home();
                await this.loadTrendingTracks();
            } else if (e.detail.page === 'trending') {
                await this.showTrending();
            } else if (e.detail.page === 'favorites') {
                await this.showFavorites();
            } else if (e.detail.page === 'about') {
                this.showAbout();
            }
        });
    }

    showAbout() {
        document.getElementById('app').innerHTML = `
            <div class="about-page">
                <h2>About ${APP_NAME}</h2>
                <p>A music discovery app powered by <strong>Tago F1 music </strong></p>
                
                <div class="features">
                    <div class="feature-card">
                        <h3>🔍 Search</h3>
                        <p>Search for tracks, artists, and albums</p>
                    </div>
                    <div class="feature-card">
                        <h3>📈 Trending</h3>
                        <p>Discover what's popular globally</p>
                    </div>
                    <div class="feature-card">
                        <h3>❤ Favorites</h3>
                        <p>Save your favorite tracks locally</p>
                    </div>
                </div>
                
                <div class="api-info">
                    <h3>Powered by Tago F1 Music</h3>
                    <p>Data provided by the Last.fm music database API</p>
                    <a href="https://www.last.fm/api" target="_blank">Learn more about Last.fm API</a>
                </div>
            </div>
        `;
    }
}

// Start app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded - initializing app with Last.fm');
    window.app = new MusicApp();
});
