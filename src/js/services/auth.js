// src/js/services/auth.js
import { storage } from '../utils/storage.js';
import { API_CONFIG } from '../utils/constants.js';

export const getAccessToken = () => {
    // Check URL hash first (for implicit grant flow)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
        storage.set('spotify_token', token);
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return token;
    }
    
    // Check localStorage
    return storage.get('spotify_token');
};

export const refreshAccessToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(
                    `${API_CONFIG.SPOTIFY.CLIENT_ID}:${API_CONFIG.SPOTIFY.CLIENT_SECRET}`
                )
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: API_CONFIG.SPOTIFY.REFRESH_TOKEN
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        
        const data = await response.json();
        storage.set('spotify_token', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
};

export const getAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: API_CONFIG.SPOTIFY.CLIENT_ID,
        response_type: 'token',
        redirect_uri: API_CONFIG.SPOTIFY.REDIRECT_URI,
        scope: 'playlist-read-private playlist-modify-public playlist-modify-private user-read-private user-read-email',
        show_dialog: false
    });
    
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const logout = () => {
    storage.remove('spotify_token');
};

export const isAuthenticated = () => {
    return !!getAccessToken();
};