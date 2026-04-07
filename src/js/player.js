export class Player {
    constructor() {
        this.audio = null;
        this.currentTrack = null;
        this.init();
    }
    
    async init() {
        await this.render();
        this.bindEvents();
    }
    
    async render() {
        document.getElementById('player-container').innerHTML = `
            <div id="player" class="audio-player" style="display: none;">
                <div class="player-container">
                    <div class="now-playing">
                        <img id="player-image" class="album-art" src="" alt="">
                        <div class="track-info">
                            <div id="player-title" class="track-name">No track selected</div>
                            <div id="player-artist" class="artist-name">Select a track to play</div>
                        </div>
                    </div>
                    <div class="player-controls">
                        <button id="prev-btn" class="control-btn">⏪</button>
                        <button id="play-btn" class="play-btn">▶️</button>
                        <button id="next-btn" class="control-btn">⏩</button>
                    </div>
                    <div class="player-progress">
                        <span id="current-time">0:00</span>
                        <input type="range" id="progress-bar" class="progress-bar" value="0" max="100">
                        <span id="duration">0:00</span>
                    </div>
                    <audio id="audio-element"></audio>
                </div>
            </div>
        `;
        
        this.audio = document.getElementById('audio-element');
    }
    
    bindEvents() {
        document.getElementById('play-btn')?.addEventListener('click', () => this.togglePlay());
        document.getElementById('prev-btn')?.addEventListener('click', () => this.prev());
        document.getElementById('next-btn')?.addEventListener('click', () => this.next());
        
        this.audio?.addEventListener('timeupdate', () => this.updateProgress());
        this.audio?.addEventListener('ended', () => this.next());
    }
    
    playTrack(track) {
        if (!track.preview_url) {
            alert('No preview available for this track');
            return;
        }
        
        this.currentTrack = track;
        this.audio.src = track.preview_url;
        
        // Update UI
        document.getElementById('player').style.display = 'block';
        document.getElementById('player-title').textContent = track.name;
        document.getElementById('player-artist').textContent = track.artist;
        document.getElementById('player-image').src = track.image;
        
        this.audio.play()
            .then(() => {
                document.getElementById('play-btn').textContent = '⏸';
            })
            .catch(e => {
                console.error('Play error:', e);
                alert('Cannot play preview');
            });
    }
    
    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            document.getElementById('play-btn').textContent = '⏸️';
        } else {
            this.audio.pause();
            document.getElementById('play-btn').textContent = '▶️';
        }
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        document.getElementById('progress-bar').value = percent;
        
        document.getElementById('current-time').textContent = this.formatTime(this.audio.currentTime);
        document.getElementById('duration').textContent = this.formatTime(this.audio.duration);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    prev() {
        // Implement queue logic
    }
    
    next() {
        // Implement queue logic
    }
}