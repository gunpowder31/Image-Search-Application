//accessKey to store API key
const accessKey = "_NMudXQHf8um7dJO48AEGJ2-R5FKLKHK_0eQedPj0Cs"
//form variable to store form 
const formEl =document.querySelector("form");
//input variable to store input element
const inputEl =document.getElementById("search-input");
//search results variable to store images/boxes/containers
const searchResults=document.querySelector(".search-results");
//show more to store show more button
const showMore =document.getElementById("show-more-button");

let inputData ="";//to store users inputs
let page =1;//by default page is 1
//using async cause we are using response and fetch
async function searchImages(){
    inputData=inputEl.ariaValueMax;
    const url ='https://api.unsplash.com/search/photos?page=$(page)&query=$(inputData)&client_id=$(accessKey)';

//using fetch to fetch images using query in url
const response = await fetch (url);
//after getting the query we have to convert it into json format
const data =await response.json();
//the results will be stored inside results variable
const results=data.results;

if (page===1) {
    searchResults.innerHTML=""  ;
}
//after getting the data inside results variable we have to map the data
results.map((result)=>{
    //creating a container like the one in the html file
    const imageWrappper =document.createElement('div');
    imageWrappper.classList.add("search-result");
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink=document.createElement('a');
    imageLink.href=result.links.html;
    imageLink.target="_blank";
    imageLink.textContent=result.alt_description;

    imageWrappper.appendChild(image);
    imageWrappper.appendChild(imageLink);
    searchResults.appendChild(imageWrappper);
});
    page++;
    //if page is more than one then change the style of show more button
    //which means it will displayed 
    //(statically it is not set to display in the stylesheet)
    if (page>1) {
        showMore.style.display="block";
        
    }
}
formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page=1;
    searchImages();
})
showMore.addEventListener("click", ()=>{
    searchImages();
});