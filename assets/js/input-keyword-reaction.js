import { copyShuffle, songList2Table, } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');

  // 1. Configure Fuse.js
  // Adjust keys and thresholds as needed
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.5, // Lower for stricter matches, higher for looser
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [ // What fields to search in
      "name",
      "singer"
    ]
  };

  const fuse = new Fuse(allSongs, fuseOptions);

  // 2. Listen for input
  searchInput.addEventListener('input', function (e) {
    const query = e.target.value;
    resultsContainer.innerHTML = ''; // Clear previous results
    if (query.trim() === '') {
      // Do nothing or display all songs shuffled?

      // Option 1
      return;

      // Option 2
      //const table = songList2Table(copyShuffle(allSongs));
      //const table = utils.songList2Table(utils.copyShuffle(allSongs));
      //resultsContainer.appendChild(table);
    }

    // 3. Perform fuzzy search
    const results = fuse.search(query);

    // 4. Display results
    if (results.length > 0) {
      //const table = utils.songList2Table(results)
      const table = songList2Table(results)

      resultsContainer.appendChild(table);
    } else {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    }
  });
});
