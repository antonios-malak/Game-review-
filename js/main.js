const navlinks=document.querySelectorAll(".nav-link")
navlinks.forEach(link =>{
    link.addEventListener('click', function(e){
        navlinks.forEach(nav => nav.classList.remove("active"));
        e.target.classList.add("active");
        const category = link.id;        
        getApi(category)
    })
})

async function getApi(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4a9fe67430msh32ca8ed6217dea4p120c73jsn36472d6fa5da',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
const response = await fetch
(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,options);
const apiData = await response.json();
loading.classList.add("d-none");
loadCards(apiData);
}

function loadCards(apiData){
    const container = document.getElementById("card-container")
    container.innerHTML=""

    apiData.forEach(game =>{
    var card = ""
    card += `
     <div class=" col-sm-12 col-md-6 col-lg-4 col-xl-3 g-4 d-flex" >
        <div class="card " id="${game.id}" data-bs-toggle="modal" data-bs-target="#gameModal" onclick="getDetails(this.id)">
            <img src="${game.thumbnail}" class="card-img-top p-3" alt="...">
            <div class="card-body position-relative py-0 ">
                <h5 class="card-title">${game.title}</h5>
                <p class="card-text text-center">${game.short_description}</p>
                <button class="rounded-3 border border-0">Free</button>
            </div>
            <div class="card-footer d-flex justify-content-between p-2">
            <div class="category">${game.genre}</div>
            <div class="user">${game.platform}</div>
            </div>
        </div>
    </div>
    `
    container.insertAdjacentHTML("beforeend", card);
    })

}
getApi("mmorpg");

async function getDetails(id) {
    const detailsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4a9fe67430msh32ca8ed6217dea4p120c73jsn36472d6fa5da',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const detailsResponse = await fetch (`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` , detailsOptions)
    const details = await detailsResponse.json()
    console.log(details);
    
    displayDetails(details)
}


function displayDetails(details){
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML=`
     <div class="modal fade" id="gameModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen p-3">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="gameModalLabel">Game Details</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column flex-lg-row gap-4 justify-content-around align-items-center" id="modal-content">
                  <div class="image w-100">
                    <img class="w-100" src="${details.thumbnail}">
                  </div>
                  <div class=" w-100">
                    <h3>Title:${details.title}</h3>
                    <h5>Category:  <span class="bg-primary px-1 rounded-3">${details.genre}</span></h5>
                    <h5>Platform:  <span class="bg-primary px-1 rounded-3">${details.platform}</span></h5>
                    <h5>Status:  <span class="bg-primary px-1 rounded-3">${details.status}</span></h5>
                    <p class="text-white">${details.description}</p>
                    <a href="${details.game_url}"><button type="button" class="btn btn-outline-warning">Show Game</button></a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `

}
