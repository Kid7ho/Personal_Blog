document.addEventListener('DOMContentLoaded', function() {
    fetch('https://kid7ho.github.io/Personal_Blog/json/articles.json')
        .then(response => response.json())
        .then(json => init(json))
        .catch(err => console.error(`Fetch Problem: ${err.message}`));
});

function init(posts) {
    let title = document.querySelector('.text').innerHTML;

    let tag1 = "";
    let tag2 = "";

    for(let i=0; i<posts.length; i++){
        if(posts[i].title == title){
            console.log(i);
        }

        console.log(`${posts[i].title}\n${title}`);
        
    }
}