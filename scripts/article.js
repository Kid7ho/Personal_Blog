document.addEventListener('DOMContentLoaded', function() {
    fetch('https://kid7ho.github.io/Personal_Blog/json/articles.json')
        .then(response => response.json())
        .then(json => setNextArticles(json))
        .catch(err => console.error(`Fetch Problem: ${err.message}`));
});

function setNextArticles(articles) {
    let title = "";
    if(document.querySelector('.text') !== null) title = document.querySelector('.text').innerHTML;
    else if(document.querySelector('.text_black') !== null) title = document.querySelector('.text_black').innerHTML;

    let tag1 = "", tag2 = "";
    let tag1Name = "", tag2Name = "";

    for(let i=0; i<articles.length; i++){
        if(articles[i].title == title){
            tag1 = articles[i].tag_class[0];
            tag2 = articles[i].tag_class[1];
            tag1Name = articles[i].tag[0];
            tag2Name = articles[i].tag[1];
            break;
        }
    }

    let categoryText = document.querySelector('.category');
    if(tag1 == "" && tag2 == "") categoryText.innerHTML = "All Articles 카테고리의 다른 글:";
    else categoryText.innerHTML = tag1Name + " / "+ tag2Name + " 카테고리의 다른 글:";
    
    let sameTagArticles = articles.filter(article => article.tag_class[0].toLowerCase().includes(tag1) || article.tag_class[1].toLowerCase().includes(tag2));
    let nextArticles = document.querySelector('.next_article');
    let nextArticle = nextArticles.querySelectorAll('li');

    for(let i=0; i<sameTagArticles.length && i<6; i++){
        let article = nextArticle[i];
        
        article.querySelector('a').href = sameTagArticles[i].link.split("/")[1];
        article.querySelector('a').innerHTML = sameTagArticles[i].title;
    }
}