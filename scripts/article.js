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

    const nextArticles = document.querySelector('.next_article');
    
    displayArticles(sameTagArticles, nextArticles, title);
    
    setNewArticles(articles);
}

function setNewArticles(articles) {
    let title = "";
    if(document.querySelector('.text') !== null) title = document.querySelector('.text').innerHTML;
    else if(document.querySelector('.text_black') !== null) title = document.querySelector('.text_black').innerHTML;

    let allArticles = articles;
    
    const newArticles = document.querySelector('.new_article');

    displayArticles(allArticles, newArticles, title);
}

function displayArticles(finalArticles, articlesElement, currentArticleTitle) {
    let totalArticles = 0; let maxArticles = 4;

    if(finalArticles == null){
        articlesElement.innerHTML = "<strong>No Other Articles Found.</strong>";
        return;
    }

    for(let i=finalArticles.length-1; i>=0; i--){        
        if(finalArticles[i].title == currentArticleTitle) continue;
        
        totalArticles += 1;
        if(totalArticles > maxArticles) break;

        //Create Articles
        const nextArticle = document.createElement('article');

        const articleLink = document.createElement('a');
        const articleURL = `../${finalArticles[i].link}`;
        articleLink.href = articleURL;

        const articleImage = document.createElement('img');
        const imageURL = `https://kid7ho.github.io/Personal_Blog/${finalArticles[i].image}`;
        articleImage.src = imageURL;
        articleImage.alt = finalArticles[i].currentArticleTitle;

        const articleTag = document.createElement('ul');
        articleTag.setAttribute('class', 'tag_article');

        const tag1 = document.createElement('li');
        tag1.setAttribute('class', `${finalArticles[i].tag_class[0]}`);
        tag1.innerText = finalArticles[i].tag[0];
        const tag2 = document.createElement('li');
        tag2.setAttribute('class', `${finalArticles[i].tag_class[1]}`);
        tag2.innerText = finalArticles[i].tag[1];

        const articleTitle = document.createElement('div');
        articleTitle.setAttribute('class', 'next_title');
        articleTitle.innerText = finalArticles[i].title;

        const articleDescription = document.createElement('div');
        articleDescription.setAttribute('class', 'description');
        articleDescription.innerText = `Date: ${finalArticles[i].date}`;

        //Link Elements
        articlesElement.appendChild(nextArticle);
        nextArticle.appendChild(articleLink);
        articleLink.appendChild(articleImage);
        articleLink.appendChild(articleTag);
        articleLink.appendChild(articleTitle);
        articleLink.appendChild(articleDescription);
        articleTag.appendChild(tag1);
        articleTag.appendChild(tag2);
    }

    if(totalArticles == 0){
        articlesElement.innerHTML = "<strong>No Other Articles Found.</strong>";
    }
}