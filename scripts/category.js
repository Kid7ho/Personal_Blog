document.addEventListener('DOMContentLoaded', function() {
  var search = document.querySelector('.search-input');

  search.addEventListener("focus", function(e){
    search.parentNode.classList.add('focus');
  });
  search.addEventListener("blur", function(e){
    search.parentNode.classList.remove('focus');
  });
});