// Two implementations
// To be decided which one is better

/*
document.getElementsByName('gender').forEach(radio => {
  radio.addEventListener('change', function (){

    const femaleTable = document.getElementById('female-singers');
    const maleTable = document.getElementById('male-singers');
    const groupTable = document.getElementById('group-singers');

    femaleTable.style.display = 'none';
    maleTable.style.display = 'none';
    groupTable.style.display = 'none';

    const selectedValue = this.value;
    if ( selectedValue === 'female' ) {
      femaleTable.style.display = 'block';
      console.log(femaleTable);
    } else if ( selectedValue === 'male' ) {
      maleTable.style.display = 'block';
      console.log(maleTable);
    } else if ( selectedValue === 'group' ) {
      groupTable.style.display = 'block';
      console.log(groupTable);
    }
  });
});
*/

document.getElementById('singerCategories').addEventListener('change', function(event) {
  if (event.target.type === 'radio') {
    const femaleTable = document.getElementById('female-singers');
    const maleTable = document.getElementById('male-singers');
    const groupTable = document.getElementById('group-singers');

    femaleTable.style.display = 'none';
    maleTable.style.display = 'none';
    groupTable.style.display = 'none';

    const selectedValue = event.target.value;
    if ( selectedValue === 'female' ) {
      femaleTable.style.display = 'block';
    } else if ( selectedValue === 'male' ) {
      maleTable.style.display = 'block';
    } else if ( selectedValue === 'group' ) {
      groupTable.style.display = 'block';
    }
  }
});
