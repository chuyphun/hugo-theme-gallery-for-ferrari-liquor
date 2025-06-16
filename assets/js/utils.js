export function inPlaceShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function copyShuffle(array) {
  const indices = Array.from(Array(array.length).keys())
  inPlaceShuffle(indices);
  return indices.map(index => array[index]);
}


export function songList2Table(songList) {
  const table = document.createElement('table');
  table.className = 'fuzzy-found-songs'

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['代碼', '歌名', '歌手'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  songList.forEach(song => {
    const row = document.createElement('tr');
    row.className = 'fuzzy-found-songs'

    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const singerTd = document.createElement('td');
    codeTd.textContent = song.item.code
    nameTd.textContent = song.item.name
    singerTd.textContent = song.item.singer

    row.appendChild(codeTd);
    row.appendChild(nameTd);
    row.appendChild(singerTd);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table
}
