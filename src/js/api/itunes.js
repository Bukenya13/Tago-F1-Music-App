// src/js/api/itunes.js
// iTunes Search API for getting track previews and artwork (free, no API key needed)

const ITUNES_BASE_URL = 'https://itunes.apple.com/search';

// Cache for artwork to avoid repeated API calls
const artworkCache = new Map();

// Helper to fetch with timeout
const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

export const itunesApi = {
    // Search for a track and get preview URL
    async searchTrack(trackName, artistName) {
        const query = `${trackName} ${artistName}`.trim();
        const params = new URLSearchParams({
            term: query,
            media: 'music',
            entity: 'song',
            limit: 10
        });

        try {
            const response = await fetchWithTimeout(`${ITUNES_BASE_URL}?${params.toString()}`);
            if (!response.ok) {
                throw new Error('iTunes API error');
            }
            
            const data = await response.json();
            console.log('iTunes API response:', data);
            
            if (data.results && data.results.length > 0) {
                // Try to find the best match with a preview
                let result;
                
                // First try to find exact match with preview
                result = data.results.find(track => 
                    track.trackName?.toLowerCase() === trackName.toLowerCase() &&
                    track.artistName?.toLowerCase().includes(artistName.toLowerCase()) &&
                    track.previewUrl
                );
                
                // If no exact match, find any result with preview
                if (!result) {
                    result = data.results.find(track => track.previewUrl);
                }
                
                // If still no preview, take first result
                if (!result) {
                    result = data.results[0];
                }
                
                if (!result) {
                    console.log('No results found');
                    return null;
                }
                
                // Get high quality artwork
                const artwork = result.artworkUrl100 
                    ? result.artworkUrl100.replace('100x100', '600x600')
                    : result.artworkUrl60?.replace('60x60', '600x600');
                
                console.log('iTunes result:', {
                    trackName: result.trackName,
                    hasPreview: !!result.previewUrl,
                    previewUrl: result.previewUrl ? result.previewUrl.substring(0, 50) + '...' : null
                });
                
                return {
                    previewUrl: result.previewUrl || null,
                    trackName: result.trackName,
                    artistName: result.artistName,
                    albumName: result.collectionName,
                    artworkUrl: artwork,
                    trackId: result.trackId,
                    duration: result.trackTimeMillis
                };
            }
            
            console.log('No results from iTunes API');
            return null;
        } catch (error) {
            console.error('iTunes search error:', error);
            return null;
        }
    },

    // Get artwork for a track (with caching)
    async getTrackArtwork(trackName, artistName) {
        const cacheKey = `${trackName}-${artistName}`.toLowerCase();
        
        if (artworkCache.has(cacheKey)) {
            return artworkCache.get(cacheKey);
        }
        
        try {
            const result = await this.searchTrack(trackName, artistName);
            const artwork = result?.artworkUrl || null;
            artworkCache.set(cacheKey, artwork);
            return artwork;
        } catch {
            return null;
        }
    },

    // Get artwork for an artist
    async getArtistArtwork(artistName) {
        const cacheKey = `artist-${artistName}`.toLowerCase();
        
        if (artworkCache.has(cacheKey)) {
            return artworkCache.get(cacheKey);
        }
        
        const params = new URLSearchParams({
            term: artistName,
            media: 'music',
            entity: 'musicArtist',
            limit: 1
        });

        try {
            const response = await fetch(`${ITUNES_BASE_URL}?${params.toString()}`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                // Get a high-res image from their top track instead
                const trackParams = new URLSearchParams({
                    term: artistName,
                    media: 'music',
                    entity: 'song',
                    limit: 1
                });
                const trackResponse = await fetch(`${ITUNES_BASE_URL}?${trackParams.toString()}`);
                const trackData = await trackResponse.json();
                
                if (trackData.results && trackData.results.length > 0) {
                    const artwork = trackData.results[0].artworkUrl100?.replace('100x100', '300x300');
                    artworkCache.set(cacheKey, artwork);
                    return artwork;
                }
            }
            
            artworkCache.set(cacheKey, null);
            return null;
        } catch (error) {
            console.error('iTunes artist search error:', error);
            return null;
        }
    },

    // Search multiple tracks at once
    async searchTracks(query, limit = 20) {
        const params = new URLSearchParams({
            term: query,
            media: 'music',
            entity: 'song',
            limit
        });

        try {
            const response = await fetch(`${ITUNES_BASE_URL}?${params.toString()}`);
            if (!response.ok) {
                throw new Error('iTunes API error');
            }
            
            const data = await response.json();
            
            return data.results?.map(track => ({
                id: track.trackId.toString(),
                name: track.trackName,
                artist: track.artistName,
                album: track.collectionName,
                image: track.artworkUrl100?.replace('100x100', '300x300'),
                previewUrl: track.previewUrl,
                duration: track.trackTimeMillis
            })) || [];
        } catch (error) {
            console.error('iTunes search error:', error);
            return [];
        }
    }
};
