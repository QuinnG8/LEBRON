document.querySelectorAll('.edit-button').forEach(cell => cell.addEventListener('click', function (e) { 
  e.preventDefault();
  document.getElementById('edit-form').classList.add('visible');
  document.getElementById('add-form').classList.remove('visible');
}));

document.getElementById('add-button').addEventListener('click', function (e) { 
  e.preventDefault();
  document.getElementById('edit-form').classList.remove('visible');
  document.getElementById('add-form').classList.add('visible');
});

