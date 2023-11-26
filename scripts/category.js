document.addEventListener('DOMContentLoaded', function() {
  searchFocus();
  categorySelect();
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

  listItems.forEach(function(item, index) {
    let category = item.innerHTML.split("\n")[0];
    /*item.addEventListener('change', function(e){
      if(this.childNodes.checked) this.classList.remove('selected');
      else this.classList.add('selected');
      //filterCategory(category);
    });*/
    item.addEventListener('mouseover', function(e){
      if(this.className != 'selected') this.classList.add('hover');
    });
    item.addEventListener('mouseout', function(e){
      this.classList.remove('hover');
    });
  });
}