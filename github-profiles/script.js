const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${nullchecker(user.bio)}</p>
      <ul>
        <li><strong>Followers </strong> - ${user.followers} </li>
        <li><strong>Following </strong> - ${user.following}</li>
        <li><strong>Repositories </strong> - ${user.public_repos}</li>
      </ul>
      <ul class="second-desc">
        ${attritubenullcheck(nullchecker(user.twitter_username), "Twitter")}
        ${attritubenullcheck(nullchecker(user.location), "Location")}
      </ul>
      <ul>
        ${dateAttritubenullcheck(nullchecker(dateFormatter(user.created_at)), "Created")}
        ${buttonnullcheck(user.blog, "Visit Blog")}
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

function dateFormatter(str){
    moment.defaultFormat = "DD.MM.YYYY, HH:mm";

    var str2 = moment(str).format('llll');
    return str2
}

function buttonnullcheck(item, att) {
    if (item != "") {
        return `<a class="blog-button" href="${item}">${att}</a>`;
    }
    else return "";
}

function dateAttritubenullcheck(item, att) {
    if (item != "") {
        return `<li><strong>${att}</strong> - ${item} </li>`;
    }
    else return "";
}


function attritubenullcheck(item, att) {
    if (item != "") {
        return `<li><strong>${att}</strong> - ${item} </li>`;
    }
    else return "";
}

function nullchecker(item) {
    if (item == null)
        return "";
    else return item;
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})

