const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
// const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
      .map(
        song => `<li>
      <img src="${song.album.cover_small}">
      <span style="font-size: 15px; "><strong>${song.artist.name}</strong> - ${song.title.substring(0, 10)}... - ${secToMin(song.duration)} </span>
      <span>
        <button class="btn song-lyrics" data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics</button>
        <button class="btn"><a class="song-preview" href="${song.preview}"> Preview </a></button>
      </span>
    </li>`
      )
      .join('')}
    </ul>
  `;

}

function secToMin(sec) {
  var min = Math.floor(sec / 60);
  var sec = sec % 60;
  return `${min} m ${sec} s`;
 }

//   if (data.prev || data.next) {
//     more.innerHTML = `
//       ${
//         data.prev
//           ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
//           : ''
//       }
//       ${
//         data.next
//           ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
//           : ''
//       }
//     `;
//   } else {
//     more.innerHTML = '';
//   }
// }

// Get prev and next songs
// async function getMoreSongs(url) {
//   const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
//   const data = await res.json();

//   showData(data);
// }

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

   if (data.error) {
        result.innerHTML = data.error;
   } else {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span class="lyrics-data" style=" margin-bottom: 20px; font-size: 30px;">${lyrics}</span>
        `;
  }

  // more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
