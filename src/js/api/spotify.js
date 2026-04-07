// src/js/api/spotify.js
import { getAccessToken, refreshAccessToken } from '../services/auth.js';
import { API_CONFIG } from '../utils/constants.js';

const spotifyFetch = async (endpoint, options = {}) => {
    let token = getAccessToken();
    
    const fetchWithAuth = async () => {
        const response = await fetch(`${API_CONFIG.SPOTIFY.API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (response.status === 401) {
            // Token expired, try to refresh
            const newToken = await refreshAccessToken();
            if (newToken) {
                token = newToken;
                return fetchWithAuth();
            }
        }
        
        if (!response.ok) {
            throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`);
        }
        
        return response;
    };
    
    return fetchWithAuth();
};

export const spotifyApi = {
    async search(query, type = 'track', limit = 20) {
        const response = await spotifyFetch(
            `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`
        );
        return await response.json();
    },
    
    async getTrack(id) {
        const response = await spotifyFetch(`/tracks/${id}`);
        return await response.json();
    },
    
    async getPlaylist(playlistId = API_CONFIG.PLAYLIST.ID) {
        const response = await spotifyFetch(`/playlists/${playlistId}`);
        return await response.json();
    },
    
    async getPlaylistTracks(playlistId = API_CONFIG.PLAYLIST.ID, limit = 50) {
        const response = await spotifyFetch(`/playlists/${playlistId}/tracks?limit=${limit}`);
        return await response.json();
    },
    
    async addToPlaylist(trackUri, playlistId = API_CONFIG.PLAYLIST.ID) {
        const response = await spotifyFetch(`/playlists/${playlistId}/tracks`, {
            method: 'POST',
            body: JSON.stringify({
                uris: [trackUri]
            })
        });
        return await response.json();
    },
    
    async getUserProfile() {
        const response = await spotifyFetch('/me');
        return await response.json();
    },
    
    async getRecommendations(seedTracks, limit = 20) {
        const params = new URLSearchParams({
            seed_tracks: seedTracks.join(','),
            limit: limit
        });
        
        const response = await spotifyFetch(`/recommendations?${params.toString()}`);
        return await response.json();
    },
    
    async getAudioFeatures(trackId) {
        const response = await spotifyFetch(`/audio-features/${trackId}`);
        return await response.json();
    }
};