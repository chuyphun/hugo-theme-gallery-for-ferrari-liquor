import { songList2Table, } from './utils.js';

const fuseOptions = {
  threshold: 0.2,
  keys: [
    "singer"
  ]
};

const fuse = new Fuse(allSongs, fuseOptions);

// Go the grid way
const singerItems = document.querySelectorAll('div.singer-item');
console.log(singerItems);
// Add a click event listener to each singer item
singerItems.forEach(item => {
  item.addEventListener('click', (event) => {
    //const singerName = event.currentTarget.dataset
    console.log(event);
    //item.style.color = '#990000';
    //console.log(item);
    const singerName = item.textContent;
    if (singerName) {
      displayTheirSongs(singerName);
    }
  });
});


// Or go the table way
const singerTds = document.querySelectorAll('td.clickable');
//console.log(singerTds[0]);
//const singerTdBlueColor = document.querySelector('td.clickable').style.color;
//console.log(singerTdBlueColor);
//console.log(document.querySelector('td.clickable').style);

// Add a click event listener to each singer TD
singerTds.forEach(td => {
  td.addEventListener('click', (event) => {
    //const singerName = event.currentTarget.dataset
    console.log(event);
    //td.style.color = '#990000';
    td.style.color = 'purple';
    //console.log(td);
    const singerName = td.textContent;
    if (singerName) {
      displayTheirSongs(singerName);
    }
  });
});

function displayTheirSongs(singerName) {
  const songsContainer = document.getElementById('songs-container');
  //console.log(songsContainer.innerHTML);
  const songsContainerTitle = document.getElementById('songs-container-title');

  songsContainer.innerHTML = '<h2 id="songs-container-title"></h2>';
  const results = fuse.search(singerName);
  if (results.length > 0) {
    if (songsContainer.classList.contains('hidden')) {
      songsContainer.classList.contains('hidden')
      void songsContainer.offsetWidth;
    }

    songsContainer.style.opacity = '0%';

    // Wait for fade out, then update content and fade in
    setTimeout(() => {
      songsContainerTitle.textContent = singerName;
      //console.log(songsContainerTitle);
      songsContainer.style.opacity = '100%';
      const table = songList2Table(results)

      songsContainer.appendChild(table);
      // Scroll to the new content/container
      setTimeout(() => {
        songsContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 100); // Small delay to allow fade-in to start before scroll
    }, 300); // Matches the transition duration
  } else {
    //songsContainer.innerHTML = '<p>No results found.</p>';
  }
}
