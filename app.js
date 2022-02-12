function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemp = response.data.main.temp;
        
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
}

function search(city){
let apiKey = "c064a1d958e6c2a52bab92fa47962081";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Sydney");


function displayPhoto(response) {
let pictureElement = document.querySelector ("#picture");
pictureElement.setAttribute("src", response.data.results[0].urls.thumb);
}

function searchPhoto (cityPhoto){
let unsplashApiKey = "ckrFKpgDVOZnBe3VsFFrj7gw_f5mMkaX3dFXbj-4i3M";
let newApiUrl = "https://api.unsplash.com/search/photos?page=1&per_page=1&";

axios.get(`${newApiUrl}query=${cityPhoto}&client_id=${unsplashApiKey}`).then(displayPhoto);
}

function handleSubmitPhoto(event){
event.preventDefault();
let cityPhotoElement = document.querySelector("#city-input");
searchPhoto (cityPhotoElement.value);
}

let formPhoto = document.querySelector("#search-form");
formPhoto.addEventListener("submit", handleSubmitPhoto);

searchPhoto ();



//let pictureElement = document.querySelector ("#picture");
//pictureElement.setAttribute("src", response.data.photos[0].src.large);
//console.log(response.data.photos[0].src.large);