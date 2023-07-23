
let movieArray=[];
let itemArray = [];
let pageNo=1;
let maxPage;
let st;
let searchTerm="harry"
const rating1=document.getElementById("rating");
const comment1=document.getElementById("comment");
const APIkey="95fcaa1d";

function findMovies(){
    const searchText1=document.getElementById('searchText');
    searchTerm = (searchText1.value);
    searchTerm=(searchTerm&&searchTerm!=="")?searchTerm:"avengers";
    searchTerm=searchTerm.replace(" ","+");
    console.log(searchTerm)
    loadMovies(searchTerm);
}

function loadMovies(searchTerm){
    console.log();

    const urlFront = "https://www.omdbapi.com/?s=";
    const urlPage = `&page=${pageNo}`;
    const urlBack = `&apikey=${APIkey}`
    const url = urlFront + searchTerm + urlPage + urlBack;
    console.log(url)

    fetch(url)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        movieArray=data.Search;
        console.log(data)
        maxPage=Math.floor((data.totalResults)/('10'));
        console.log(maxPage);
        Update();
    })
    .catch(error=>{
        console.log('error' + error)
    })
    
}
function prevSearch(){
    if(pageNo===0){
        alert("No prev page");
    }
    else{
        pageNo=pageNo-1;
        const pNo=document.getElementById("currentPage");
        pNo.textContent=`${pageNo}`;
        findMovies();
    }
}
function nextSearch(){
   if(pageNo==maxPage){
    alert("No Further Suggestions");
   }
   else{
    pageNo=pageNo+1;
    const pNo=document.getElementById("currentPage");
    pNo.textContent=`${pageNo}`;
    findMovies();
   }
}
function showDetails(index){
    const imd=movieArray[index];
    console.log(imd);
    const movieID=imd.imdbID;
    displayMovie(movieID);
      
}
function displayMovie(movieID){
    const url = `https://www.omdbapi.com/?apikey=${APIkey}&i=${movieID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.scrollTo(0,10000);
            const descriptionElement = document.getElementById('description');
            descriptionElement.innerHTML = `
        <div class="movieHeading">
            <h2>${data.Title}</h2>
            <img src="${data.Poster}" alt="${data.Title}" class="movie-poster">
        </div>
        <div class="movieDetails">
            <p><strong>Runtime:</strong> ${data.Runtime}</p>
            <p><strong>Release Date:</strong> ${data.Released}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Rated:</strong> ${data.Rated}</p>
            <p><strong>Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Cast:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
      `;

        })
        .catch(err => {
            console.error('Error fetching movie details from OMDB API:', err);
        });
}
function Update(){
    const tableBody=document.getElementById("tableBody");
    tableBody.innerHTML="";
    console.log("Updating ....")
    console.log(movieArray)
    console.log("Updating1 ....")
    movieArray.forEach((eachItem, index) => {
        const movieElement=document.createElement("div");
        movieElement.className="movieElement";
        const posterElement=document.createElement("img");
        const posterPath=eachItem.Poster;
        posterElement.src=posterPath;
        posterElement.className="poster";
        const titleElement=document.createElement("p");
        titleElement.className="titleElement";
        titleElement.textContent=eachItem.Title;
        movieElement.addEventListener("click", () => showDetails(index));
        
        movieElement.appendChild(posterElement);
        movieElement.appendChild(titleElement);
        tableBody.appendChild(movieElement);
    })
    
}

function getAndUpdate(){
    const rating = rating1.value;
    const comment = comment1.value;

}

// function getItems() {
//     const movieArray1 = localStorage.getItem("movieArray");
//     if (movieArray1) {
//         movieArray = JSON.parse(movieArray1);
//     }
// }
// window.addEventListener("beforeunload", () => {
//     localStorage.setItem("movieArray", JSON.stringify(movieArray));
// });

// getItems();
findMovies();
