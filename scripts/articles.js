document.addEventListener('DOMContentLoaded', function() {
    fetch('https://kid7ho.github.io/Personal_Blog/json/articles.json')
        .then(response => response.json())
        .then(json => init(json))
        .catch(err => console.error(`Fetch Problem: ${err.message}`));
});

function init(posts) {
    const contents = document.getElementById('contents');
    const search = document.querySelector('.search-input');
    const submit1 = document.querySelector('.search-button');
    const submit2 = document.querySelector('.submit');
    const category = document.getElementsByName('category');
    
    //initialize
    let displayedPosts = 0;
    let finalGroup;

    finalGroup = posts;
    updateDisplay();

    //wait for filter button click
    submit1.addEventListener('click', syncFilter);
    submit2.addEventListener('click', syncFilter);

    //infinite scroll
    document.addEventListener('scroll', function() {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - document.querySelector('footer').getBoundingClientRect().height) loadPosts();
    });

    function syncFilter(e) {
        e.preventDefault();

        displayedPosts = 0;

        finalGroup = [];
        
        filterPosts();
    }

    function filterPosts() {
        finalGroup = posts;

        //search
        if(search.value.trim() === ''){
            //
        }
        else{
            const keyword = search.value.trim().toLowerCase();
            finalGroup = posts.filter(post => post.title.toLowerCase().includes(keyword));
        }

        //category
        let currentCategory = "";
        category.forEach((tag) => {
            if(tag.checked) currentCategory = tag.value;
        });
        currentCategory = currentCategory.toLowerCase();
        finalGroup = finalGroup.filter(post => post.tag_class[0].toLowerCase().includes(currentCategory) || post.tag_class[1].toLowerCase().includes(currentCategory));
        //

        updateDisplay();
    }

    function updateDisplay() {   
        console.log(finalGroup);
        
        //remove all elements
        while(contents.firstChild){
            contents.removeChild(contents.firstChild);
        }

        //insert elements
        if(finalGroup == undefined || finalGroup.length === 0){
            const tmp = document.createElement('p');
            tmp.textContent = "No result";
            contents.appendChild(tmp);
        }
        else{
            loadPosts();
        }
    }

    function showPosts(post) {
        const imageURL = `${post.image}`;

        const newPost = document.createElement('article');

        const postLink = document.createElement('a');
        postLink.href = `${post.link}`;

        const postImage = document.createElement('img');
        postImage.src = imageURL;
        postImage.alt = post.title;

        const postTag = document.createElement('ul');
        postTag.setAttribute('class', 'tag');

        const tag1 = document.createElement('li');
        tag1.setAttribute('class', `${post.tag_class[0]}`);
        tag1.innerText = post.tag[0];
        const tag2 = document.createElement('li');
        tag2.setAttribute('class', `${post.tag_class[1]}`);
        tag2.innerText = post.tag[1];

        const postTitle = document.createElement('div');
        postTitle.setAttribute('class', 'title');
        postTitle.innerText = post.title;

        const postDescription = document.createElement('div');
        postDescription.setAttribute('class', 'description');
        postDescription.innerText = `Date: ${post.date}`;

        const postAuthor = document.createElement('div');
        postAuthor.setAttribute('class', 'author');
        postAuthor.innerHTML = `By: <strong>${post.author}</strong>`;

        contents.appendChild(newPost);
        newPost.appendChild(postLink);
        postLink.appendChild(postImage);
        postLink.appendChild(postTag);
        postLink.appendChild(postTitle);
        postLink.appendChild(postDescription);
        postLink.appendChild(postAuthor);
        postTag.appendChild(tag1);
        postTag.appendChild(tag2);

        let height = contents.offsetHeight;
        if(height < newPost.offsetHeight){
            height = newPost.offsetHeight;
            console.log(`change height`);
        }
    }

    function loadPosts() {
        if(displayedPosts >= finalGroup.length) return;

        const displayUnitPosts = 6;
        let startIndex = displayedPosts;
        let endIndex = Math.min((displayedPosts + displayUnitPosts), finalGroup.length + 1);
        displayedPosts = endIndex;

        let tmp = finalGroup.slice(startIndex, endIndex);

        for(const post of tmp){
            showPosts(post);
        }
    }
}
