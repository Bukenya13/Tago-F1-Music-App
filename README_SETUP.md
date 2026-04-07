# MusicFinder - Music Discovery App

A modern music discovery application powered by Spotify API, built with Vite and vanilla JavaScript.

## 🎵 Features

- **Smart Search** - Search for artists, albums, and tracks
- **Music Preview** - Listen to 30-second track previews
- **Playlist Management** - Create and manage playlists
- **Spotify Integration** - Full Spotify API integration
- **Responsive Design** - Works on desktop and mobile devices
- **Demo Mode** - Browse the app without authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm

### Installation

```bash
# Clone or navigate to the project
cd music-discovery-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build

# Preview the build
npm run preview
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with your Spotify API credentials:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
VITE_SPOTIFY_PLAYLIST_ID=5pBJOB2JWQy4UdMEPELBDY
VITE_APP_NAME=MusicFinder
```

### Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Copy your Client ID and Client Secret
4. Set the Redirect URI to `http://localhost:5173/callback`
5. Use the authorization flow to get a refresh token

## 📁 Project Structure

```
music-discovery-app/
├── public/
│   └── index.html          # Main HTML entry point
├── src/
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   ├── header.js       # Header component
│   │   ├── footer.js       # Footer component
│   │   ├── home.js         # Home page component
│   │   ├── search.js       # Search functionality
│   │   ├── player.js       # Music player
│   │   ├── trending.js     # Trending page
│   │   ├── api/
│   │   │   ├── spotify.js  # Spotify API wrapper
│   │   │   └── lastfm.js   # Last.fm API wrapper
│   │   ├── services/
│   │   │   └── auth.js     # Authentication logic
│   │   └── utils/
│   │       ├── constants.js # App constants
│   │       ├── helpers.js   # Helper functions
│   │       └── storage.js   # Local storage utilities
│   └── css/
│       ├── reset.css       # CSS reset
│       ├── main.css        # Main styles
│       ├── header.css      # Header styles
│       ├── footer.css      # Footer styles
│       ├── player.css      # Player styles
│       ├── cards.css       # Card components
│       └── typography.css  # Typography styles
├── config/
│   ├── vite.config.js      # Vite configuration
│   └── env.js              # Environment configuration
├── package.json
├── vite.config.js          # Root vite config
└── .env                    # Environment variables (create this)
```

## 🔗 Page Navigation

The app uses a custom event system for navigation:

- **Home** - Displays featured playlists and recommendations
- **Trending** - Shows trending music
- **Search** - Search for tracks, artists, and albums
- **About** - App information and links

## 🎨 Styling

- **Reset CSS** - Consistent styling across browsers
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Spotify Color Scheme** - Green (#1DB954) primary color
- **Smooth Animations** - Transitions and hover effects

## 🔐 Authentication Flow

1. User clicks "Login with Spotify"
2. Redirects to Spotify authorization page
3. User grants permissions
4. Token is stored in localStorage
5. App can now access user's Spotify data

## 🐛 Debugging

If you encounter issues:

1. Check the browser console for errors
2. Verify your Spotify API credentials are correct
3. Clear browser cache/localStorage: `localStorage.clear()`
4. Ensure you're using the correct Node.js version
5. See `DEBUGGING_NOTES.md` for detailed debugging info

## 📝 Recent Fixes

✅ Fixed CSS and JavaScript asset paths
✅ Fixed Header component constructor
✅ Added comprehensive styling
✅ Implemented demo mode
✅ Fixed Vite configuration
✅ Added responsive design

See `DEBUGGING_NOTES.md` for detailed information about all fixes applied.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Browser DevTools

Use your browser's DevTools to:
- Inspect HTML structure
- Debug JavaScript in the Sources tab
- Check network requests to Spotify API
- Monitor console for errors

## 📚 API Documentation

### Spotify API
- [Web API Reference](https://developer.spotify.com/documentation/web-api)
- [Player Integration](https://developer.spotify.com/documentation/web-playback-sdk/)

### Last.fm API
- [Documentation](https://www.last.fm/api)

## 📦 Dependencies

- **Vite** - Fast build tool and dev server
- **Spotify Web API** - Music data and features

## 📄 License

This is a demo project for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For issues with the Spotify API, check their documentation at developer.spotify.com

---

**Happy Music Discovering! 🎵**
