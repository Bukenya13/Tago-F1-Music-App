// src/js/utils/constants.js
export const API_CONFIG = {
    LASTFM: {
        API_KEY: import.meta.env.VITE_LASTFM_API_KEY,
        SHARED_SECRET: import.meta.env.VITE_LASTFM_SHARED_SECRET,
        API_BASE: 'https://ws.audioscrobbler.com/2.0/'
    },
    SPOTIFY: {
        CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        REFRESH_TOKEN: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN,
        REDIRECT_URI: import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback',
        AUTH_URL: 'https://accounts.spotify.com/authorize',
        TOKEN_URL: 'https://accounts.spotify.com/api/token',
        API_BASE: 'https://api.spotify.com/v1'
    },
    PLAYLIST: {
        ID: import.meta.env.VITE_SPOTIFY_PLAYLIST_ID || '5pBJOB2JWQy4UdMEPELBDY'
    }
};

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Kali Music';

export const STORAGE_KEYS = {
    SPOTIFY_TOKEN: 'spotify_token',
    USER_PROFILE: 'spotify_user',
    FAVORITES: 'music_favorites'
};