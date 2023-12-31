document.addEventListener('DOMContentLoaded', function() {
    fetch('https://kid7ho.github.io/Personal_Blog/json/projects.json')
        .then(response => response.json())
        .then(json => setNextProjects(json))
        .catch(err => console.error(`Fetch Problem: ${err.message}`));
});

function setNextProjects(projects) {
    let title = "";
    if(document.querySelector('.text') !== null) title = document.querySelector('.text').innerHTML;
    else if(document.querySelector('.text_black') !== null) title = document.querySelector('.text_black').innerHTML;

    let tag1 = "", tag2 = "";
    let tag1Name = "", tag2Name = "";

    for(let i=0; i<projects.length; i++){
        if(projects[i].title == title){
            tag1 = projects[i].tag_class[0];
            tag2 = projects[i].tag_class[1];
            tag1Name = projects[i].tag[0];
            tag2Name = projects[i].tag[1];
            break;
        }
    }

    let categoryText = document.querySelector('.category');
    if(tag1 == "" && tag2 == "") categoryText.innerHTML = "All Projects 카테고리의 다른 글:";
    else categoryText.innerHTML = tag1Name + " / "+ tag2Name + " 카테고리의 다른 글:";
    
    let sameTagProjects = projects.filter(project => project.tag_class[0].toLowerCase().includes(tag1.toLowerCase()) && project.tag_class[1].toLowerCase().includes(tag2.toLowerCase()));

    const nextProjects = document.querySelector('.next_project');
    
    displayProjects(sameTagProjects, nextProjects, title);
    
    setNewProjects(projects);
}

function setNewProjects(projects) {
    let title = "";
    if(document.querySelector('.text') !== null) title = document.querySelector('.text').innerHTML;
    else if(document.querySelector('.text_black') !== null) title = document.querySelector('.text_black').innerHTML;

    let allProjects = projects;
    
    const newProjects = document.querySelector('.new_project');

    displayProjects(allProjects, newProjects, title);
}

function displayProjects(finalProjects, projectsElement, currentProjectTitle) {
    let totalProjects = 0; let maxProjects = 4;

    if(finalProjects == null){
        projectsElement.innerHTML = "<strong>No Other Projects Found.</strong>";
        return;
    }

    for(let i=finalProjects.length-1; i>=0; i--){        
        if(finalProjects[i].title == currentProjectTitle) continue;
        
        totalProjects += 1;
        if(totalProjects > maxProjects) break;

        //Create Projects
        const nextProject = document.createElement('article');

        const projectLink = document.createElement('a');
        const projectURL = `../${finalProjects[i].link}`;
        projectLink.href = projectURL;

        const projectImage = document.createElement('img');
        const imageURL = `https://kid7ho.github.io/Personal_Blog/${finalProjects[i].image}`;
        projectImage.src = imageURL;
        projectImage.alt = finalProjects[i].currentProjectTitle;

        const projectTag = document.createElement('ul');
        projectTag.setAttribute('class', 'tag_project');

        const tag1 = document.createElement('li');
        tag1.setAttribute('class', `${finalProjects[i].tag_class[0]}`);
        tag1.innerText = finalProjects[i].tag[0];
        const tag2 = document.createElement('li');
        tag2.setAttribute('class', `${finalProjects[i].tag_class[1]}`);
        tag2.innerText = finalProjects[i].tag[1];

        const projectTitle = document.createElement('div');
        projectTitle.setAttribute('class', 'next_title');
        projectTitle.innerText = finalProjects[i].title;

        const projectDescription = document.createElement('div');
        projectDescription.setAttribute('class', 'description');
        projectDescription.innerText = `Date: ${finalProjects[i].date}`;

        //Link Elements
        projectsElement.appendChild(nextProject);
        nextProject.appendChild(projectLink);
        projectLink.appendChild(projectImage);
        projectLink.appendChild(projectTag);
        projectLink.appendChild(projectTitle);
        projectLink.appendChild(projectDescription);
        projectTag.appendChild(tag1);
        projectTag.appendChild(tag2);
    }

    if(totalProjects == 0){
        projectsElement.innerHTML = "<strong>No Other Projects Found.</strong>";
    }
}