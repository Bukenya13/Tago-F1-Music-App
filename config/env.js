// Environment configuration
export const env = {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    lastfmApiKey: import.meta.env.VITE_LASTFM_API_KEY,
    lastfmSharedSecret: import.meta.env.VITE_LASTFM_SHARED_SECRET,
    spotifyClientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    appName: import.meta.env.VITE_APP_NAME || 'Kali Music'
};