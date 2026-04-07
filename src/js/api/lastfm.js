// src/js/api/lastfm.js

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// Helper function to make Last.fm API calls
const lastfmFetch = async (method, params = {}) => {
    const queryParams = new URLSearchParams({
        method,
        api_key: LASTFM_API_KEY,
        format: 'json',
        ...params
    });

    const response = await fetch(`${LASTFM_BASE_URL}?${queryParams.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Last.fm API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(`Last.fm error: ${data.message}`);
    }
    
    return data;
};

// Helper to get best available image
const getBestImage = (images) => {
    const placeholder = 'https://via.placeholder.com/300?text=No+Image';
    if (!images || !images.length) {
        return placeholder;
    }
    // Last.fm images are ordered: small, medium, large, extralarge
    // Note: Last.fm often returns empty strings for image URLs
    const extralarge = images.find(img => img.size === 'extralarge');
    const large = images.find(img => img.size === 'large');
    const medium = images.find(img => img.size === 'medium');
    
    const url = extralarge?.['#text'] || large?.['#text'] || medium?.['#text'] || images[0]?.['#text'];
    
    // Return placeholder if URL is empty or undefined
    return (url && url.trim() !== '') ? url : placeholder;
};

export const lastfmApi = {
    // Get top tracks globally
    async getTopTracks(limit = 20) {
        const data = await lastfmFetch('chart.gettoptracks', { limit });
        return data.tracks?.track?.map(track => ({
            id: track.mbid || `${track.name}-${track.artist.name}`,
            name: track.name,
            artist: track.artist.name,
            playcount: track.playcount,
            listeners: track.listeners,
            url: track.url,
            image: getBestImage(track.image)
        })) || [];
    },

    // Get top artists globally
    async getTopArtists(limit = 20) {
        const data = await lastfmFetch('chart.gettopartists', { limit });
        return data.artists?.artist?.map(artist => ({
            id: artist.mbid || artist.name,
            name: artist.name,
            playcount: artist.playcount,
            listeners: artist.listeners,
            url: artist.url,
            image: getBestImage(artist.image)
        })) || [];
    },

    // Search for tracks
    async searchTracks(query, limit = 20) {
        const data = await lastfmFetch('track.search', { track: query, limit });
        return data.results?.trackmatches?.track?.map(track => ({
            id: track.mbid || `${track.name}-${track.artist}`,
            name: track.name,
            artist: track.artist,
            url: track.url,
            listeners: track.listeners,
            image: getBestImage(track.image)
        })) || [];
    },

    // Search for artists
    async searchArtists(query, limit = 20) {
        const data = await lastfmFetch('artist.search', { artist: query, limit });
        return data.results?.artistmatches?.artist?.map(artist => ({
            id: artist.mbid || artist.name,
            name: artist.name,
            listeners: artist.listeners,
            url: artist.url,
            image: getBestImage(artist.image)
        })) || [];
    },

    // Search for albums
    async searchAlbums(query, limit = 20) {
        const data = await lastfmFetch('album.search', { album: query, limit });
        return data.results?.albummatches?.album?.map(album => ({
            id: album.mbid || `${album.name}-${album.artist}`,
            name: album.name,
            artist: album.artist,
            url: album.url,
            image: getBestImage(album.image)
        })) || [];
    },

    // Get artist info
    async getArtistInfo(artist) {
        const data = await lastfmFetch('artist.getinfo', { artist });
        const artistData = data.artist;
        return {
            name: artistData.name,
            mbid: artistData.mbid,
            url: artistData.url,
            image: getBestImage(artistData.image),
            stats: {
                listeners: artistData.stats?.listeners,
                playcount: artistData.stats?.playcount
            },
            bio: artistData.bio?.summary,
            similar: artistData.similar?.artist?.map(a => ({
                name: a.name,
                url: a.url,
                image: getBestImage(a.image)
            })) || [],
            tags: artistData.tags?.tag?.map(t => t.name) || []
        };
    },

    // Get track info
    async getTrackInfo(track, artist) {
        const data = await lastfmFetch('track.getInfo', { track, artist });
        const trackData = data.track;
        return {
            name: trackData.name,
            mbid: trackData.mbid,
            url: trackData.url,
            duration: trackData.duration,
            listeners: trackData.listeners,
            playcount: trackData.playcount,
            artist: {
                name: trackData.artist?.name,
                url: trackData.artist?.url
            },
            album: trackData.album ? {
                name: trackData.album.title,
                artist: trackData.album.artist,
                url: trackData.album.url,
                image: getBestImage(trackData.album.image)
            } : null,
            tags: trackData.toptags?.tag?.map(t => t.name) || [],
            wiki: trackData.wiki?.summary
        };
    },

    // Get album info
    async getAlbumInfo(album, artist) {
        const data = await lastfmFetch('album.getInfo', { album, artist });
        const albumData = data.album;
        return {
            name: albumData.name,
            artist: albumData.artist,
            mbid: albumData.mbid,
            url: albumData.url,
            image: getBestImage(albumData.image),
            listeners: albumData.listeners,
            playcount: albumData.playcount,
            tracks: albumData.tracks?.track?.map(t => ({
                name: t.name,
                duration: t.duration,
                url: t.url
            })) || [],
            tags: albumData.tags?.tag?.map(t => t.name) || [],
            wiki: albumData.wiki?.summary
        };
    },

    // Get similar tracks
    async getSimilarTracks(track, artist, limit = 10) {
        const data = await lastfmFetch('track.getsimilar', { track, artist, limit });
        return data.similartracks?.track?.map(t => ({
            id: t.mbid || `${t.name}-${t.artist.name}`,
            name: t.name,
            artist: t.artist.name,
            url: t.url,
            image: getBestImage(t.image),
            match: t.match
        })) || [];
    },

    // Get similar artists
    async getSimilarArtists(artist, limit = 10) {
        const data = await lastfmFetch('artist.getsimilar', { artist, limit });
        return data.similarartists?.artist?.map(a => ({
            id: a.mbid || a.name,
            name: a.name,
            url: a.url,
            image: getBestImage(a.image),
            match: a.match
        })) || [];
    },

    // Get top tracks by tag/genre
    async getTopTracksByTag(tag, limit = 20) {
        const data = await lastfmFetch('tag.gettoptracks', { tag, limit });
        return data.tracks?.track?.map(track => ({
            id: track.mbid || `${track.name}-${track.artist.name}`,
            name: track.name,
            artist: track.artist.name,
            url: track.url,
            image: getBestImage(track.image)
        })) || [];
    },

    // Get top tags
    async getTopTags() {
        const data = await lastfmFetch('chart.gettoptags');
        return data.tags?.tag?.map(tag => ({
            name: tag.name,
            reach: tag.reach,
            taggings: tag.taggings,
            url: tag.url
        })) || [];
    }
};