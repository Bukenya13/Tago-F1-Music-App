export class TrackCard {
    static create(track) {
        return `
            <div class="track-card" data-id="${track.id}">
                <div class="track-image-container">
                    <img src="${track.image}" alt="${track.album}" class="track-image">
                    <div class="play-btn-overlay">
                        ▶
                    </div>
                </div>
                <div class="track-content">
                    <div class="track-title">${track.name}</div>
                    <div class="track-artist">${track.artist}</div>
                    <div class="track-album">${track.album}</div>
                </div>
            </div>
        `;
    }
}