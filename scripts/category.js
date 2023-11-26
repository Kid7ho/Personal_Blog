document.addEventListener('DOMContentLoaded', function() {
  searchFocus();
  categorySelect();
  changeSelectedCategory();
});

function searchFocus() {
  let search = document.querySelector('.search-input');

  search.addEventListener('focus', function(e){
    search.parentNode.classList.add('focus');
  });
  search.addEventListener('blur', function(e){
    search.parentNode.classList.remove('focus');
  });
}

function categorySelect() {
  let categoryList = document.querySelector('.category_list'); 
  let listItems = categoryList.querySelectorAll('label');
  let inputRadios = document.getElementsByName('category');

  listItems.forEach(function(item) {
    let category = item.innerHTML.split("\n")[0];
    item.addEventListener('mouseover', function(e){
      if(this.className != 'selected') this.classList.add('hover');
    });
    item.addEventListener('mouseout', function(e){
      this.classList.remove('hover');
    });
  });

  inputRadios.forEach(function(input) {
    input.addEventListener('change', function(e) {
      changeSelectedCategory();
    });
  });
}

function changeSelectedCategory() {
  let inputRadios = document.getElementsByName('category');

  for(let i=0; i<inputRadios.length; i++){
    if(inputRadios[i].checked) inputRadios[i].parentNode.classList.add('selected');
    else inputRadios[i].parentNode.classList.remove('selected');
  }
}