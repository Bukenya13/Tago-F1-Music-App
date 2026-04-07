// src/js/api/youtube.js
// YouTube Music integration using YouTube IFrame API for playback

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Updated working Invidious instances (2024/2025)
const INVIDIOUS_INSTANCES = [
    'https://invidious.fdn.fr',
    'https://inv.nadeko.net',
    'https://invidious.private.coffee',
    'https://yt.artemislena.eu',
    'https://invidious.protokolla.fi'
];

let currentInvidiousIndex = 0;

const getInvidiousUrl = () => INVIDIOUS_INSTANCES[currentInvidiousIndex];

// Try next Invidious instance on failure
const rotateInvidious = () => {
    currentInvidiousIndex = (currentInvidiousIndex + 1) % INVIDIOUS_INSTANCES.length;
    console.log(`Switched to Invidious instance: ${getInvidiousUrl()}`);
};

// Cache for search results
const searchCache = new Map();

export const youtubeApi = {
    // Search for a track on YouTube
    async searchTrack(trackName, artistName) {
        const query = `${artistName} - ${trackName} official audio`;
        const cacheKey = query.toLowerCase();
        
        if (searchCache.has(cacheKey)) {
            console.log('Using cached result for:', query);
            return searchCache.get(cacheKey);
        }

        // Try all Invidious instances
        for (let attempt = 0; attempt < INVIDIOUS_INSTANCES.length; attempt++) {
            try {
                console.log(`Trying Invidious instance ${attempt + 1}/${INVIDIOUS_INSTANCES.length}: ${getInvidiousUrl()}`);
                const result = await this.searchInvidious(query);
                if (result) {
                    searchCache.set(cacheKey, result);
                    return result;
                }
            } catch (error) {
                console.warn(`Invidious instance failed: ${getInvidiousUrl()}`, error.message);
                rotateInvidious();
            }
        }

        // Fallback to YouTube API if key is available
        if (YOUTUBE_API_KEY && YOUTUBE_API_KEY !== 'your_youtube_api_key') {
            try {
                console.log('Trying YouTube Data API...');
                const result = await this.searchYouTubeAPI(query);
                if (result) {
                    searchCache.set(cacheKey, result);
                    return result;
                }
            } catch (error) {
                console.error('YouTube API search failed:', error);
            }
        }

        // Last resort: Create a searchable result with estimated video ID
        console.log('All APIs failed, using search fallback');
        return this.createSearchFallback(trackName, artistName);
    },

    // Create a fallback result that opens YouTube search
    createSearchFallback(trackName, artistName) {
        const searchQuery = `${artistName} ${trackName}`;
        return {
            videoId: null,
            title: `${artistName} - ${trackName}`,
            channel: 'Search on YouTube',
            thumbnail: `https://via.placeholder.com/480x360/1a1a2e/ffffff?text=${encodeURIComponent(trackName.substring(0, 15))}`,
            thumbnailHQ: `https://via.placeholder.com/1280x720/1a1a2e/ffffff?text=${encodeURIComponent(trackName.substring(0, 15))}`,
            searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
            isFallback: true
        };
    },

    // Search using Invidious API (free, no API key)
    async searchInvidious(query) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        const url = `${getInvidiousUrl()}/api/v1/search?q=${encodeURIComponent(query)}&type=video&sort_by=relevance`;
        
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Invidious API error: ${response.status}`);
        }
        
        const results = await response.json();
        
        if (results && results.length > 0) {
            // Filter for music-related results
            const musicResult = results.find(v => 
                v.type === 'video' && 
                (v.title.toLowerCase().includes('official') || 
                 v.title.toLowerCase().includes('audio') ||
                 v.title.toLowerCase().includes('music') ||
                 v.lengthSeconds < 600) // Less than 10 min likely a song
            ) || results[0];
            
            return {
                videoId: musicResult.videoId,
                title: musicResult.title,
                channel: musicResult.author,
                thumbnail: `https://i.ytimg.com/vi/${musicResult.videoId}/hqdefault.jpg`,
                thumbnailHQ: `https://i.ytimg.com/vi/${musicResult.videoId}/maxresdefault.jpg`,
                duration: musicResult.lengthSeconds,
                viewCount: musicResult.viewCount
            };
        }
        
        return null;
    },

    // Search using official YouTube API (requires API key)
    async searchYouTubeAPI(query) {
        const params = new URLSearchParams({
            part: 'snippet',
            q: query,
            type: 'video',
            videoCategoryId: '10', // Music category
            maxResults: 5,
            key: YOUTUBE_API_KEY
        });

        const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('YouTube API error');
        }
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            return {
                videoId: video.id.videoId,
                title: video.snippet.title,
                channel: video.snippet.channelTitle,
                thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
                thumbnailHQ: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url
            };
        }
        
        return null;
    },

    // Get video thumbnail URL
    getThumbnail(videoId, quality = 'hq') {
        const qualities = {
            'default': 'default',
            'mq': 'mqdefault',
            'hq': 'hqdefault',
            'sd': 'sddefault',
            'max': 'maxresdefault'
        };
        return `https://i.ytimg.com/vi/${videoId}/${qualities[quality] || 'hqdefault'}.jpg`;
    },

    // Get artwork for a track
    async getTrackArtwork(trackName, artistName) {
        try {
            const result = await this.searchTrack(trackName, artistName);
            return result?.thumbnail || null;
        } catch {
            return null;
        }
    },

    // Get artwork for an artist (search for their popular song)
    async getArtistArtwork(artistName) {
        try {
            const result = await this.searchTrack('', artistName);
            return result?.thumbnail || null;
        } catch {
            return null;
        }
    }
};

// YouTube IFrame Player Manager
export class YouTubePlayer {
    constructor(containerId) {
        this.containerId = containerId;
        this.player = null;
        this.isReady = false;
        this.onReadyCallbacks = [];
        this.onStateChangeCallbacks = [];
        this.currentVideoId = null;
        
        this.loadYouTubeAPI();
    }

    loadYouTubeAPI() {
        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
            this.initPlayer();
            return;
        }

        // Load YouTube IFrame API
        if (!document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Wait for API to be ready
        window.onYouTubeIframeAPIReady = () => {
            this.initPlayer();
        };
    }

    initPlayer() {
        this.player = new YT.Player(this.containerId, {
            height: '100%',
            width: '100%',
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'disablekb': 0,
                'fs': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'playsinline': 1
            },
            events: {
                'onReady': () => {
                    this.isReady = true;
                    console.log('YouTube player ready!');
                    this.onReadyCallbacks.forEach(cb => cb());
                },
                'onStateChange': (event) => {
                    this.onStateChangeCallbacks.forEach(cb => cb(event));
                },
                'onError': (event) => {
                    console.error('YouTube Player error:', event.data);
                }
            }
        });
    }

    onReady(callback) {
        if (this.isReady) {
            callback();
        } else {
            this.onReadyCallbacks.push(callback);
        }
    }

    onStateChange(callback) {
        this.onStateChangeCallbacks.push(callback);
    }

    loadVideo(videoId) {
        this.currentVideoId = videoId;
        if (this.isReady && this.player) {
            this.player.loadVideoById(videoId);
        } else {
            this.onReady(() => {
                this.player.loadVideoById(videoId);
            });
        }
    }

    play() {
        if (this.isReady && this.player) {
            this.player.playVideo();
        }
    }

    pause() {
        if (this.isReady && this.player) {
            this.player.pauseVideo();
        }
    }

    stop() {
        if (this.isReady && this.player) {
            this.player.stopVideo();
        }
    }

    seekTo(seconds) {
        if (this.isReady && this.player) {
            this.player.seekTo(seconds, true);
        }
    }

    setVolume(volume) {
        if (this.isReady && this.player) {
            this.player.setVolume(volume);
        }
    }

    getVolume() {
        if (this.isReady && this.player) {
            return this.player.getVolume();
        }
        return 50;
    }

    getCurrentTime() {
        if (this.isReady && this.player) {
            return this.player.getCurrentTime();
        }
        return 0;
    }

    getDuration() {
        if (this.isReady && this.player) {
            return this.player.getDuration();
        }
        return 0;
    }

    getState() {
        if (this.isReady && this.player) {
            return this.player.getPlayerState();
        }
        return -1;
    }

    // Player states
    static get STATES() {
        return {
            UNSTARTED: -1,
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        };
    }
}
