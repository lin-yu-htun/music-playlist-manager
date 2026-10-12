// ========================================
// MUSIC PLAYLIST MANAGER
// ========================================

// ========================================
// 1. PLAYLIST DATA
// ========================================

let playlist = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    genre: "Pop",
  },
  {
    id: 3,
    title: "Starboy",
    artist: "The Weeknd",
    genre: "R&B",
  },
];

// ========================================
// 2. DOM ELEMENTS
// ========================================

const songForm = document.querySelector("#songForm");

const songTitle = document.querySelector("#songTitle");
const songArtist = document.querySelector("#songArtist");
const songGenre = document.querySelector("#songGenre");

const playlistContainer = document.querySelector("#playlist");

const songCount = document.querySelector("#songCount");

const searchInput = document.querySelector("#searchInput");

const emptyState = document.querySelector("#emptyState");

const formError = document.querySelector("#formError");

// ========================================
// 3. RENDER PLAYLIST
// ========================================

function renderPlaylist(songs) {
  playlistContainer.innerHTML = "";

  // Update song count
  songCount.textContent = songs.length;

  // Show empty state when there are no songs
  if (songs.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // Display every song
  songs.forEach(function (song) {
    const songElement = document.createElement("div");

    songElement.classList.add("song");

    songElement.innerHTML = `
      <div class="song-cover">
        ♫
      </div>

      <div class="song-info">
        <div class="song-title">
          ${song.title}
        </div>

        <div class="song-artist">
          ${song.artist}
        </div>
      </div>

      <div class="song-meta">
        <span class="genre">
          ${song.genre}
        </span>

        <button
          class="remove-button"
          onclick="removeSong(${song.id})"
        >
          Remove
        </button>
      </div>
    `;

    playlistContainer.appendChild(songElement);
  });
}

// ========================================
// CHALLENGE 1: ADD A NEW SONG
// ========================================

songForm.addEventListener("submit", function (event) {
  // Prevent page refresh
  event.preventDefault();

  // 1. Get values from the form
  const title = songTitle.value.trim();
  const artist = songArtist.value.trim();
  const genre = songGenre.value;

  // 2. Validate the inputs
  if (title === "" || artist === "" || genre === "") {
    formError.textContent = "Please complete all fields.";
    return;
  }

  // Clear error message
  formError.textContent = "";

  // 3. Create a song object
  const newSong = {
    id: Date.now(),
    title: title,
    artist: artist,
    genre: genre,
  };

  // 4. Add the new song to the playlist
  playlist = [...playlist, newSong];

  // 5. Render the updated playlist
  renderPlaylist(playlist);

  // 6. Clear the form
  songForm.reset();
});

// ========================================
// CHALLENGE 2: SEARCH SONGS
// ========================================

searchInput.addEventListener("input", function () {
  // 1. Get the search text
  const searchText = searchInput.value.toLowerCase().trim();

  // 2. Filter the playlist
  const filteredSongs = playlist.filter(function (song) {
    // 3. Search by title OR artist
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();

    return title.includes(searchText) || artist.includes(searchText);
  });

  // 4. Display the filtered songs
  renderPlaylist(filteredSongs);
});

// ========================================
// CHALLENGE 3: REMOVE A SONG
// ========================================

function removeSong(songId) {
  // 1. Filter the playlist
  playlist = playlist.filter(function (song) {
    return song.id !== songId;
  });

  // 2. Display the updated playlist
  // Keep the current search results if searching
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredSongs = playlist.filter(function (song) {
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();

    return title.includes(searchText) || artist.includes(searchText);
  });

  renderPlaylist(filteredSongs);
}

// ========================================
// INITIAL RENDER
// ========================================

renderPlaylist(playlist);
