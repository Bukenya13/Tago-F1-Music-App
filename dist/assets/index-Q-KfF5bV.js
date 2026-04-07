(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();class E{constructor(){this.container=document.getElementById("header-container"),this.init()}async init(){await this.render(),this.bindEvents()}async render(){this.container.innerHTML=`
            <header class="app-header">
                <div class="header-container">
                    <div class="logo">
                        <h1><img src="https://i.pinimg.com/1200x/f6/12/76/f612762f17326aede2c5bd8fbc875a8a.jpg" alt="Tago F1 Music" class="logo-img"> Tago F1 Music</h1>
                    </div>
                    
                    <div class="search-section">
                        <div class="search-box">
                            <input type="text" id="search-input" 
                                   placeholder="Search artists, songs, albums..." 
                                   class="search-input">
                            <button id="search-btn" class="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                                          stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                <nav class="main-nav">
                    <a href="#" class="nav-link active" data-page="home">Home</a>
                    <a href="#" class="nav-link" data-page="trending">Trending</a>
                    <a href="#" class="nav-link" data-page="favorites">💎 Favorites</a>
                    <a href="#" class="nav-link" data-page="about">About</a>
                </nav>
            </header>
        `}bindEvents(){var t,i;(t=document.getElementById("search-btn"))==null||t.addEventListener("click",()=>{const e=document.getElementById("search-input").value.trim();e&&window.dispatchEvent(new CustomEvent("search",{detail:{query:e}}))}),(i=document.getElementById("search-input"))==null||i.addEventListener("keypress",e=>{var a;e.key==="Enter"&&((a=document.getElementById("search-btn"))==null||a.click())}),document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();const s=a.target.dataset.page;document.querySelectorAll(".nav-link").forEach(r=>r.classList.remove("active")),a.target.classList.add("active"),window.dispatchEvent(new CustomEvent("page-change",{detail:{page:s}}))})})}}class w{constructor(){this.container=document.getElementById("footer-container"),this.init()}async init(){await this.render()}async render(){this.container.innerHTML=`
            <footer class="app-footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Tago F1 Music</h3>
                        <p>Discover new music powered by Tago F1 music</p>
                        <div class="social-links">
                            <a href="https://www.Tago F1 music" target="_blank">Visit Tago F1 music</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Features</h4>
                        <ul class="api-links">
                            <li>🔍 Search Tracks & Artists</li>
                            <li>🔥 Trending Music</li>
                            <li>❤️ Save Favorites</li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="#" data-page="home">Home</a></li>
                            <li><a href="#" data-page="trending">Trending</a></li>
                            <li><a href="#" data-page="favorites">Favorites</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Tago F1 music </p>
                    <p class="disclaimer"> Developed by Bukenya Lawrence </p>
                </div>
            </footer>
        `,this.container.querySelectorAll("a[data-page]").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const e=i.target.dataset.page;window.dispatchEvent(new CustomEvent("page-change",{detail:{page:e}}))})})}}class f{constructor(){}async init(){await this.render()}async render(){document.getElementById("app").innerHTML=`
            <div class="home">
                <!-- Animated Hero Section -->
                <div class="hero-section">
                    <div class="animated-bg">
                        <div class="music-note note-1">♪</div>
                        <div class="music-note note-2">♫</div>
                        <div class="music-note note-3">♪</div>
                        <div class="music-note note-4">♬</div>
                        <div class="music-note note-5">♫</div>
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                        <div class="circle circle-3"></div>
                        <div class="pulse-ring"></div>
                        <div class="pulse-ring pulse-ring-2"></div>
                    </div>
                    <div class="hero-content">
                        <h1 class="hero-title">🎵 Discover New Music</h1>
                        <p class="hero-subtitle">Powered by Tago F1 Music - Search for any artist, album, or track</p>
                    </div>
                </div>
                
                <div class="features">
                    <div class="feature-card">
                        <div class="feature-icon"><img class="reck" src="https://i.pinimg.com/736x/d5/d9/1a/d5d91a08b20fd7ad96c5f76790e651bd.jpg" alt="search icon"></div>
                        <h3>Smart Search</h3>
                        <p>Find music by name, artist, or album</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><img class="reck" src="https://i.pinimg.com/736x/fa/55/ec/fa55ecb70cab99b5512637993a44daed.jpg" alt="trending icon"></div>
                        <h3>Trending Tracks</h3>
                        <p>Discover what's popular globally</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                        <img class="reck" src="https://i.pinimg.com/736x/d8/cd/19/d8cd19e53ea470bcbac27bc6cbf6e9b5.jpg" alt="insights icon"></div>
                        <h3>Music Insights</h3>
                        <p>Get stats from Last.fm database</p>
                    </div>
                </div>
                
                <section class="trending-section">
                    <h2>🔥 Trending Tracks</h2>
                    <div id="trending-tracks" class="tracks-grid">
                        <div class="loading">Loading trending tracks...</div>
                    </div>
                </section>
                
                <section class="artists-section">
                    <h2>🎤 Top Artists</h2>
                    <div id="trending-artists" class="tracks-grid">
                        <div class="loading">Loading top artists...</div>
                    </div>
                </section>
            </div>
        `}}const k="c905e5f587c51c5c6b0d434f83a396b8",T="https://ws.audioscrobbler.com/2.0/",m=async(o,t={})=>{const i=new URLSearchParams({method:o,api_key:k,format:"json",...t}),e=await fetch(`${T}?${i.toString()}`);if(!e.ok)throw new Error(`Last.fm API error: ${e.status}`);const a=await e.json();if(a.error)throw new Error(`Last.fm error: ${a.message}`);return a},u=o=>{var r;const t="https://via.placeholder.com/300?text=No+Image";if(!o||!o.length)return t;const i=o.find(n=>n.size==="extralarge"),e=o.find(n=>n.size==="large"),a=o.find(n=>n.size==="medium"),s=(i==null?void 0:i["#text"])||(e==null?void 0:e["#text"])||(a==null?void 0:a["#text"])||((r=o[0])==null?void 0:r["#text"]);return s&&s.trim()!==""?s:t},g={async getTopTracks(o=20){var i,e;return((e=(i=(await m("chart.gettoptracks",{limit:o})).tracks)==null?void 0:i.track)==null?void 0:e.map(a=>({id:a.mbid||`${a.name}-${a.artist.name}`,name:a.name,artist:a.artist.name,playcount:a.playcount,listeners:a.listeners,url:a.url,image:u(a.image)})))||[]},async getTopArtists(o=20){var i,e;return((e=(i=(await m("chart.gettopartists",{limit:o})).artists)==null?void 0:i.artist)==null?void 0:e.map(a=>({id:a.mbid||a.name,name:a.name,playcount:a.playcount,listeners:a.listeners,url:a.url,image:u(a.image)})))||[]},async searchTracks(o,t=20){var e,a,s;return((s=(a=(e=(await m("track.search",{track:o,limit:t})).results)==null?void 0:e.trackmatches)==null?void 0:a.track)==null?void 0:s.map(r=>({id:r.mbid||`${r.name}-${r.artist}`,name:r.name,artist:r.artist,url:r.url,listeners:r.listeners,image:u(r.image)})))||[]},async searchArtists(o,t=20){var e,a,s;return((s=(a=(e=(await m("artist.search",{artist:o,limit:t})).results)==null?void 0:e.artistmatches)==null?void 0:a.artist)==null?void 0:s.map(r=>({id:r.mbid||r.name,name:r.name,listeners:r.listeners,url:r.url,image:u(r.image)})))||[]},async searchAlbums(o,t=20){var e,a,s;return((s=(a=(e=(await m("album.search",{album:o,limit:t})).results)==null?void 0:e.albummatches)==null?void 0:a.album)==null?void 0:s.map(r=>({id:r.mbid||`${r.name}-${r.artist}`,name:r.name,artist:r.artist,url:r.url,image:u(r.image)})))||[]},async getArtistInfo(o){var e,a,s,r,n,c,l;const i=(await m("artist.getinfo",{artist:o})).artist;return{name:i.name,mbid:i.mbid,url:i.url,image:u(i.image),stats:{listeners:(e=i.stats)==null?void 0:e.listeners,playcount:(a=i.stats)==null?void 0:a.playcount},bio:(s=i.bio)==null?void 0:s.summary,similar:((n=(r=i.similar)==null?void 0:r.artist)==null?void 0:n.map(d=>({name:d.name,url:d.url,image:u(d.image)})))||[],tags:((l=(c=i.tags)==null?void 0:c.tag)==null?void 0:l.map(d=>d.name))||[]}},async getTrackInfo(o,t){var a,s,r,n,c;const e=(await m("track.getInfo",{track:o,artist:t})).track;return{name:e.name,mbid:e.mbid,url:e.url,duration:e.duration,listeners:e.listeners,playcount:e.playcount,artist:{name:(a=e.artist)==null?void 0:a.name,url:(s=e.artist)==null?void 0:s.url},album:e.album?{name:e.album.title,artist:e.album.artist,url:e.album.url,image:u(e.album.image)}:null,tags:((n=(r=e.toptags)==null?void 0:r.tag)==null?void 0:n.map(l=>l.name))||[],wiki:(c=e.wiki)==null?void 0:c.summary}},async getAlbumInfo(o,t){var a,s,r,n,c;const e=(await m("album.getInfo",{album:o,artist:t})).album;return{name:e.name,artist:e.artist,mbid:e.mbid,url:e.url,image:u(e.image),listeners:e.listeners,playcount:e.playcount,tracks:((s=(a=e.tracks)==null?void 0:a.track)==null?void 0:s.map(l=>({name:l.name,duration:l.duration,url:l.url})))||[],tags:((n=(r=e.tags)==null?void 0:r.tag)==null?void 0:n.map(l=>l.name))||[],wiki:(c=e.wiki)==null?void 0:c.summary}},async getSimilarTracks(o,t,i=10){var a,s;return((s=(a=(await m("track.getsimilar",{track:o,artist:t,limit:i})).similartracks)==null?void 0:a.track)==null?void 0:s.map(r=>({id:r.mbid||`${r.name}-${r.artist.name}`,name:r.name,artist:r.artist.name,url:r.url,image:u(r.image),match:r.match})))||[]},async getSimilarArtists(o,t=10){var e,a;return((a=(e=(await m("artist.getsimilar",{artist:o,limit:t})).similarartists)==null?void 0:e.artist)==null?void 0:a.map(s=>({id:s.mbid||s.name,name:s.name,url:s.url,image:u(s.image),match:s.match})))||[]},async getTopTracksByTag(o,t=20){var e,a;return((a=(e=(await m("tag.gettoptracks",{tag:o,limit:t})).tracks)==null?void 0:e.track)==null?void 0:a.map(s=>({id:s.mbid||`${s.name}-${s.artist.name}`,name:s.name,artist:s.artist.name,url:s.url,image:u(s.image)})))||[]},async getTopTags(){var t,i;return((i=(t=(await m("chart.gettoptags")).tags)==null?void 0:t.tag)==null?void 0:i.map(e=>({name:e.name,reach:e.reach,taggings:e.taggings,url:e.url})))||[]}},y="https://itunes.apple.com/search",h=new Map,I=async(o,t=5e3)=>{const i=new AbortController,e=setTimeout(()=>i.abort(),t);try{const a=await fetch(o,{signal:i.signal});return clearTimeout(e),a}catch(a){throw clearTimeout(e),a}},L={async searchTrack(o,t){var a;const i=`${o} ${t}`.trim(),e=new URLSearchParams({term:i,media:"music",entity:"song",limit:10});try{const s=await I(`${y}?${e.toString()}`);if(!s.ok)throw new Error("iTunes API error");const r=await s.json();if(console.log("iTunes API response:",r),r.results&&r.results.length>0){let n;if(n=r.results.find(l=>{var d,p;return((d=l.trackName)==null?void 0:d.toLowerCase())===o.toLowerCase()&&((p=l.artistName)==null?void 0:p.toLowerCase().includes(t.toLowerCase()))&&l.previewUrl}),n||(n=r.results.find(l=>l.previewUrl)),n||(n=r.results[0]),!n)return console.log("No results found"),null;const c=n.artworkUrl100?n.artworkUrl100.replace("100x100","600x600"):(a=n.artworkUrl60)==null?void 0:a.replace("60x60","600x600");return console.log("iTunes result:",{trackName:n.trackName,hasPreview:!!n.previewUrl,previewUrl:n.previewUrl?n.previewUrl.substring(0,50)+"...":null}),{previewUrl:n.previewUrl||null,trackName:n.trackName,artistName:n.artistName,albumName:n.collectionName,artworkUrl:c,trackId:n.trackId,duration:n.trackTimeMillis}}return console.log("No results from iTunes API"),null}catch(s){return console.error("iTunes search error:",s),null}},async getTrackArtwork(o,t){const i=`${o}-${t}`.toLowerCase();if(h.has(i))return h.get(i);try{const e=await this.searchTrack(o,t),a=(e==null?void 0:e.artworkUrl)||null;return h.set(i,a),a}catch{return null}},async getArtistArtwork(o){var e;const t=`artist-${o}`.toLowerCase();if(h.has(t))return h.get(t);const i=new URLSearchParams({term:o,media:"music",entity:"musicArtist",limit:1});try{const s=await(await fetch(`${y}?${i.toString()}`)).json();if(s.results&&s.results.length>0){const r=new URLSearchParams({term:o,media:"music",entity:"song",limit:1}),c=await(await fetch(`${y}?${r.toString()}`)).json();if(c.results&&c.results.length>0){const l=(e=c.results[0].artworkUrl100)==null?void 0:e.replace("100x100","300x300");return h.set(t,l),l}}return h.set(t,null),null}catch(a){return console.error("iTunes artist search error:",a),null}},async searchTracks(o,t=20){var e;const i=new URLSearchParams({term:o,media:"music",entity:"song",limit:t});try{const a=await fetch(`${y}?${i.toString()}`);if(!a.ok)throw new Error("iTunes API error");return((e=(await a.json()).results)==null?void 0:e.map(r=>{var n;return{id:r.trackId.toString(),name:r.trackName,artist:r.artistName,album:r.collectionName,image:(n=r.artworkUrl100)==null?void 0:n.replace("100x100","300x300"),previewUrl:r.previewUrl,duration:r.trackTimeMillis}}))||[]}catch(a){return console.error("iTunes search error:",a),[]}}},A="Kali Music";class P{constructor(){this.container=document.getElementById("player-container"),this.currentTrack=null,this.audioElement=null,this.isPlaying=!1,this.progressInterval=null,this.init()}async init(){await this.render(),this.setupAudioPlayer()}setupAudioPlayer(){this.audioElement=new Audio,this.audioElement.id="audio-player",this.audioElement.controls=!1,this.audioElement.crossOrigin="anonymous",this.audioElement.volume=.8,this.audioElement.preload="metadata",document.body.appendChild(this.audioElement),console.log("Audio element created and appended to DOM"),this.audioElement.addEventListener("play",()=>{var i;this.isPlaying=!0,document.getElementById("play-pause-btn").textContent="⏸",document.getElementById("player-status").textContent="🎵 Playing...";const t=document.getElementById("playing-indicator");t&&(t.style.display="flex"),(i=document.getElementById("music-player"))==null||i.classList.add("playing"),this.startProgressUpdate()}),this.audioElement.addEventListener("pause",()=>{var i;this.isPlaying=!1,document.getElementById("play-pause-btn").textContent="▶",document.getElementById("player-status").textContent="⏸ Paused";const t=document.getElementById("playing-indicator");t&&(t.style.display="none"),(i=document.getElementById("music-player"))==null||i.classList.remove("playing"),this.stopProgressUpdate()}),this.audioElement.addEventListener("ended",()=>{var i;this.isPlaying=!1,document.getElementById("play-pause-btn").textContent="▶",document.getElementById("player-status").textContent="🔁 Track ended - Click play to replay";const t=document.getElementById("playing-indicator");t&&(t.style.display="none"),(i=document.getElementById("music-player"))==null||i.classList.remove("playing"),this.stopProgressUpdate()}),this.audioElement.addEventListener("timeupdate",()=>{this.updateProgress()}),this.audioElement.addEventListener("loadedmetadata",()=>{const t=this.audioElement.duration;t&&t!==1/0&&(document.getElementById("duration").textContent=this.formatTime(t),document.getElementById("player-status").textContent="🎵 Ready to play")}),this.audioElement.addEventListener("canplay",()=>{console.log("Audio can play now"),document.getElementById("player-status").textContent="🎵 Ready to play"}),this.audioElement.addEventListener("error",t=>{var a,s;const i=((a=this.audioElement.error)==null?void 0:a.message)||"Unknown error",e=((s=this.audioElement.error)==null?void 0:s.code)||"UNKNOWN";console.error("Audio error event:",{code:e,message:i,networkState:this.audioElement.networkState,readyState:this.audioElement.readyState,src:this.audioElement.src}),document.getElementById("player-status").textContent=`⚠ Audio error: ${i}`}),this.audioElement.addEventListener("loadstart",()=>{console.log("Audio loading started..."),document.getElementById("player-status").textContent="⏳ Loading audio..."})}updateProgress(){if(this.audioElement&&this.audioElement.duration){const t=this.audioElement.currentTime/this.audioElement.duration*100;document.getElementById("progress-bar").value=t,document.getElementById("current-time").textContent=this.formatTime(this.audioElement.currentTime)}}async render(){this.container.innerHTML=`
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
                    </div>
                </div>
            </div>
        `,this.bindEvents()}startProgressUpdate(){this.stopProgressUpdate(),this.progressInterval=setInterval(()=>{this.updateProgress()},100)}stopProgressUpdate(){this.progressInterval&&(clearInterval(this.progressInterval),this.progressInterval=null)}formatTime(t){const i=Math.floor(t/60),e=Math.floor(t%60);return`${i}:${e.toString().padStart(2,"0")}`}bindEvents(){var t,i,e,a,s,r,n;(t=document.getElementById("close-player"))==null||t.addEventListener("click",()=>{this.hidePlayer()}),(i=document.getElementById("play-pause-btn"))==null||i.addEventListener("click",()=>{this.togglePlayPause()}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{this.audioElement&&this.audioElement.currentTime&&(this.audioElement.currentTime=0)}),(a=document.getElementById("next-btn"))==null||a.addEventListener("click",()=>{this.audioElement&&(this.audioElement.currentTime=Math.min(this.audioElement.currentTime+10,this.audioElement.duration))}),(s=document.getElementById("progress-bar"))==null||s.addEventListener("input",c=>{if(this.audioElement&&this.audioElement.duration){const l=c.target.value/100*this.audioElement.duration;this.audioElement.currentTime=l}}),(r=document.getElementById("volume-bar"))==null||r.addEventListener("input",c=>{this.audioElement&&(this.audioElement.volume=c.target.value/100)}),(n=document.getElementById("add-to-favorites"))==null||n.addEventListener("click",()=>{this.currentTrack&&this.addToFavorites()})}togglePlayPause(){this.audioElement&&(this.isPlaying?this.audioElement.pause():this.audioElement.play().catch(t=>{console.error("Playback error:",t),document.getElementById("player-status").textContent="⚠ Unable to play audio"}))}async playTrack(t){this.currentTrack=t;const i=document.getElementById("music-player"),e=document.getElementById("player-status");i.style.display="block",document.getElementById("player-title").textContent=t.name,document.getElementById("player-artist").textContent=t.artist,document.getElementById("player-image").src=t.image||"https://via.placeholder.com/300?text=No+Image",document.getElementById("player-album").textContent=t.album||"",document.getElementById("progress-bar").value=0,document.getElementById("current-time").textContent="0:00",document.getElementById("duration").textContent="0:00",document.getElementById("lastfm-link").href=t.url||`https://www.last.fm/music/${encodeURIComponent(t.artist)}/_/${encodeURIComponent(t.name)}`,this.audioElement&&(this.audioElement.pause(),this.audioElement.src=""),this.isPlaying=!1,document.getElementById("play-pause-btn").textContent="▶",e.textContent="🔍 Finding audio preview...",console.log("Searching for:",t.name,"by",t.artist);try{const a=await L.searchTrack(t.name,t.artist);if(console.log("iTunes response:",a),a&&a.previewUrl){console.log("Preview URL found:",a.previewUrl),document.getElementById("itunes-link").href=`https://itunes.apple.com/us/search?term=${encodeURIComponent(t.name+" "+t.artist)}`,a.artworkUrl&&(document.getElementById("player-image").src=a.artworkUrl);let s=a.previewUrl;console.log("Using audio URL:",s),this.audioElement.src=s,console.log("Audio src set, calling load()..."),this.audioElement.load(),e.textContent="⏳ Loading audio...";const r=this.audioElement.play();r!==void 0?r.then(()=>{console.log("✅ Playback started successfully"),e.textContent="🎵 Playing..."}).catch(n=>{console.error("❌ Play error:",n.name,n.message),e.textContent=`⚠ Cannot play this track: ${n.name}`}):(console.log("⚠ Browser does not support play promise - trying anyway"),e.textContent="🎵 Attempting playback...")}else console.log("❌ No preview URL found in iTunes response"),e.textContent="😢 No audio preview available for this track",document.getElementById("itunes-link").href=`https://itunes.apple.com/us/search?term=${encodeURIComponent(t.artist+" "+t.name)}`}catch(a){console.error("❌ Failed to search iTunes:",a),e.textContent=`⚠ Error: ${a.message}`,document.getElementById("itunes-link").href=`https://itunes.apple.com/us/search?term=${encodeURIComponent(t.artist+" "+t.name)}`}}startProgressUpdate(){this.stopProgressUpdate(),this.progressInterval=setInterval(()=>{this.updateProgress()},100)}stopProgressUpdate(){this.progressInterval&&(clearInterval(this.progressInterval),this.progressInterval=null)}formatTime(t){if(!t||isNaN(t))return"0:00";const i=Math.floor(t/60),e=Math.floor(t%60);return`${i}:${e.toString().padStart(2,"0")}`}bindEvents(){var t,i,e,a,s,r,n;(t=document.getElementById("close-player"))==null||t.addEventListener("click",()=>{this.hidePlayer()}),(i=document.getElementById("play-pause-btn"))==null||i.addEventListener("click",()=>{this.togglePlayPause()}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{this.audioElement&&this.audioElement.currentTime&&(this.audioElement.currentTime=0)}),(a=document.getElementById("next-btn"))==null||a.addEventListener("click",()=>{this.audioElement&&(this.audioElement.currentTime=Math.min(this.audioElement.currentTime+10,this.audioElement.duration))}),(s=document.getElementById("progress-bar"))==null||s.addEventListener("input",c=>{if(this.audioElement&&this.audioElement.duration){const l=c.target.value/100*this.audioElement.duration;this.audioElement.currentTime=l}}),(r=document.getElementById("volume-bar"))==null||r.addEventListener("input",c=>{this.audioElement&&(this.audioElement.volume=c.target.value/100)}),(n=document.getElementById("add-to-favorites"))==null||n.addEventListener("click",()=>{this.currentTrack&&this.addToFavorites()})}addToFavorites(){if(!this.currentTrack)return;const t=JSON.parse(localStorage.getItem("music_favorites")||"[]");if(t.some(e=>e.id===this.currentTrack.id)){document.getElementById("player-status").textContent=`"${this.currentTrack.name}" is already in favorites!`;return}t.push(this.currentTrack),localStorage.setItem("music_favorites",JSON.stringify(t)),document.getElementById("player-status").textContent=`❤ Added "${this.currentTrack.name}" to favorites!`}hidePlayer(){this.audioElement&&(this.audioElement.pause(),this.audioElement.src=""),this.stopProgressUpdate(),this.isPlaying=!1;const t=document.getElementById("music-player");t.style.display="none"}}class ${constructor(){console.log("Music App with Last.fm API Starting..."),this.init()}async init(){try{this.header=new E,this.footer=new w,this.player=new P,this.home=new f,await this.home.init(),await Promise.race([Promise.all([this.loadTrendingTracks(),this.loadTopArtists()]),new Promise((t,i)=>setTimeout(()=>i(new Error("API timeout after 10 seconds")),1e4))]),this.bindEvents()}catch(t){console.error("Failed to initialize app:",t),this.showErrorState(t)}}async loadTrendingTracks(){try{const t=await g.getTopTracks(18);this.displayTracks(t,"trending-tracks")}catch(t){console.error("Failed to load trending tracks:",t);const i=document.getElementById("trending-tracks");i&&(i.innerHTML='<div class="error-message">Could not load trending tracks. Check your internet connection.</div>')}}async loadTopArtists(){try{const t=await g.getTopArtists(18);this.displayArtists(t)}catch(t){console.error("Failed to load top artists:",t);const i=document.getElementById("top-artists");i&&(i.innerHTML='<div class="error-message">Could not load top artists. Check your internet connection.</div>')}}showErrorState(t){const i=document.getElementById("app");i.innerHTML=`
            <div class="error-state">
                <h2>⚠️ Unable to Load App</h2>
                <p>There was an issue loading the music discovery app.</p>
                <p class="error-details">${t.message}</p>
                <button class="retry-btn" onclick="location.reload()">Reload Page</button>
            </div>
        `}async handleSearch(t){const i=document.getElementById("app");i.innerHTML=`
            <div class="search-page">
                <h2>🔍 Search Results for "${t}"</h2>
                <div class="search-tabs">
                    <button class="tab-btn active" data-tab="tracks">Tracks</button>
                    <button class="tab-btn" data-tab="artists">Artists</button>
                    <button class="tab-btn" data-tab="albums">Albums</button>
                </div>
                <div class="loading">Searching Last.fm...</div>
                <div id="search-results" class="tracks-grid"></div>
            </div>
        `;try{const e=await g.searchTracks(t,20);this.displayTracks(e,"search-results"),this.setupSearchTabs(t)}catch(e){console.error("Search error:",e),i.innerHTML=`
                <div class="error">
                    <h3>❌ Search Failed</h3>
                    <p>${e.message}</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `}}setupSearchTabs(t){document.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",async e=>{document.querySelectorAll(".tab-btn").forEach(r=>r.classList.remove("active")),e.target.classList.add("active");const a=e.target.dataset.tab,s=document.getElementById("search-results");s.innerHTML='<div class="loading">Loading...</div>';try{if(a==="tracks"){const r=await g.searchTracks(t,20);this.displayTracks(r,"search-results")}else if(a==="artists"){const r=await g.searchArtists(t,20);this.displayArtists(r,"search-results")}else if(a==="albums"){const r=await g.searchAlbums(t,20);this.displayAlbums(r,"search-results")}}catch(r){s.innerHTML=`<div class="error">Failed to load ${a}: ${r.message}</div>`}})})}displayTracks(t,i){const e=document.getElementById(i);if(!e)return;if(!t||t.length===0){e.innerHTML='<div class="no-results">No tracks found</div>';return}const a="https://via.placeholder.com/300/1a1a2e/ffffff?text=♪";e.innerHTML=t.map(s=>`
            <div class="track-card" data-id="${s.id}" data-name="${s.name}" data-artist="${s.artist}">
                <div class="track-image">
                    <img src="${a}" alt="${s.name}" data-track-name="${s.name}" data-artist-name="${s.artist}" class="lazy-artwork">
                    <div class="play-overlay">▶</div>
                </div>
                <div class="track-content">
                    <div class="track-title">${s.name}</div>
                    <div class="track-artist">${s.artist}</div>
                    ${s.listeners?`<div class="track-stats">👥 ${parseInt(s.listeners).toLocaleString()} listeners</div>`:""}
                    <div class="track-actions">
                        <button class="play-btn" data-track='${JSON.stringify(s).replace(/'/g,"&#39;")}'>
                            ▶ Play
                        </button>
                    </div>
                </div>
            </div>
        `).join(""),this.bindTrackEvents(e,t),this.loadTrackArtwork(e)}async loadTrackArtwork(t){const i=t.querySelectorAll(".lazy-artwork"),e=s=>new Promise((r,n)=>{const c=`deezerCallback_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,l=document.createElement("script"),d=setTimeout(()=>{p(),n(new Error("Timeout"))},5e3),p=()=>{clearTimeout(d),delete window[c],l.parentNode&&l.parentNode.removeChild(l)};window[c]=v=>{p(),r(v)},l.src=`https://api.deezer.com/search?q=${encodeURIComponent(s)}&limit=1&output=jsonp&callback=${c}`,l.onerror=()=>{p(),n(new Error("Script error"))},document.head.appendChild(l)}),a=async(s,r)=>{var n,c;try{const l=await e(`${r} ${s}`);return l.data&&l.data.length>0?((n=l.data[0].album)==null?void 0:n.cover_big)||((c=l.data[0].album)==null?void 0:c.cover_medium):null}catch{return null}};for(const s of i){const r=s.dataset.trackName,n=s.dataset.artistName;try{const c=await a(r,n);c&&(s.src=c,s.classList.add("loaded"))}catch{}}}displayArtists(t,i="trending-artists"){const e=document.getElementById(i);if(!e)return;if(!t||t.length===0){e.innerHTML='<div class="no-results">No artists found</div>';return}const a="https://via.placeholder.com/300/1a1a2e/ffffff?text=🎤";e.innerHTML=t.map(s=>`
            <div class="artist-card" data-name="${s.name}">
                <div class="artist-image">
                    <img src="${a}" alt="${s.name}" data-artist-name="${s.name}" class="lazy-artist-artwork">
                </div>
                <div class="artist-content">
                    <div class="artist-name">${s.name}</div>
                    ${s.listeners?`<div class="artist-stats">👥 ${parseInt(s.listeners).toLocaleString()} listeners</div>`:""}
                    <a href="${s.url}" target="_blank" class="artist-link">View on Last.fm</a>
                </div>
            </div>
        `).join(""),e.querySelectorAll(".artist-card").forEach(s=>{s.addEventListener("click",r=>{if(!r.target.classList.contains("artist-link")){const n=s.dataset.name;this.handleSearch(n)}})}),this.loadArtistArtwork(e)}async loadArtistArtwork(t){const i=t.querySelectorAll(".lazy-artist-artwork"),e=(s,r)=>new Promise((n,c)=>{const l=`deezerCallback_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,d=document.createElement("script"),p=setTimeout(()=>{v(),c(new Error("Timeout"))},5e3),v=()=>{clearTimeout(p),delete window[l],d.parentNode&&d.parentNode.removeChild(d)};window[l]=b=>{v(),n(b)},d.src=`https://api.deezer.com/${s}?q=${encodeURIComponent(r)}&limit=1&output=jsonp&callback=${l}`,d.onerror=()=>{v(),c(new Error("Script error"))},document.head.appendChild(d)}),a=async s=>{try{const r=await e("search/artist",s);return r.data&&r.data.length>0?r.data[0].picture_big||r.data[0].picture_medium:null}catch{return null}};for(const s of i){const r=s.dataset.artistName;try{const n=await a(r);n&&(s.src=n,s.classList.add("loaded"))}catch{}}}displayAlbums(t,i="trending-albums"){const e=document.getElementById(i);if(e){if(!t||t.length===0){e.innerHTML='<div class="no-results">No albums found</div>';return}e.innerHTML=t.map(a=>`
            <div class="album-card">
                <div class="album-image">
                    <img src="${a.image||"https://via.placeholder.com/300?text=Album"}" alt="${a.name}" onerror="this.src='https://via.placeholder.com/300?text=Album'">
                </div>
                <div class="album-content">
                    <div class="album-title">${a.name}</div>
                    <div class="album-artist">${a.artist}</div>
                    <a href="${a.url}" target="_blank" class="album-link">View on Last.fm</a>
                </div>
            </div>
        `).join("")}}bindTrackEvents(t,i){t.querySelectorAll(".play-btn").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation(),a.preventDefault();const s=a.target.closest(".play-btn");if(!s||!s.dataset.track){console.error("No track data found on button");return}try{const r=s.dataset.track.replace(/&#39;/g,"'"),n=JSON.parse(r);console.log("Playing track:",n),this.player.playTrack(n)}catch(r){console.error("Error parsing track data:",r)}})}),t.querySelectorAll(".track-card").forEach(e=>{e.addEventListener("click",a=>{if(a.target.closest(".play-btn"))return;const s=e.dataset.id,r=i.find(n=>n.id===s);r&&(console.log("Playing track from card click:",r),this.player.playTrack(r))})}),t.querySelectorAll(".play-overlay").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const s=a.target.closest(".track-card");if(s){const r=s.dataset.id,n=i.find(c=>c.id===r);n&&(console.log("Playing track from overlay:",n),this.player.playTrack(n))}})})}async showTrending(){this.home=new f,await this.loadTrendingTracks(),await this.loadTopArtists()}async showFavorites(){const t=document.getElementById("app"),i=JSON.parse(localStorage.getItem("music_favorites")||"[]");t.innerHTML=`
            <div class="favorites-page">
                <h2>❤ My Favorites</h2>
                <div id="favorites-list" class="tracks-grid"></div>
            </div>
        `,i.length===0?document.getElementById("favorites-list").innerHTML='<div class="no-results">No favorites yet. Click the ❤ button on any track to add it!</div>':this.displayTracks(i,"favorites-list")}bindEvents(){window.addEventListener("search",t=>{this.handleSearch(t.detail.query)}),window.addEventListener("page-change",async t=>{t.detail.page==="home"?(this.home=new f,await this.loadTrendingTracks()):t.detail.page==="trending"?await this.showTrending():t.detail.page==="favorites"?await this.showFavorites():t.detail.page==="about"&&this.showAbout()})}showAbout(){document.getElementById("app").innerHTML=`
            <div class="about-page">
                <h2>About ${A}</h2>
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
        `}}document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded - initializing app with Last.fm"),window.app=new $});
