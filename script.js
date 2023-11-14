const cityInput = document.querySelector("input")
const weatherDisplay = document.querySelector("p")
const findButton = document.querySelector("button");
const temperatureDisplay = document.querySelector("h2");
const locationDisplay = document.querySelector(".location");
const weatherContainer = document.querySelector(".weather");



async function fetchApi (){
    findButton.innerHTML = 'Loading...'
    const city = cityInput.value
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=babb60e2f27524f858ab48abd648c8fb`)
    const weather = await apiCall.json();

    console.log(weather)
    if(weather.cod === '404'){
        weatherContainer.style.display = 'none'
        findButton.innerHTML = 'couldnt find city'

        setTimeout(function(){
        findButton.innerHTML = 'get weather info'
        },2000)
    } else {
        const weatherInfo = weather.weather[0].description;
    const temperature = Math.floor(weather.main.temp);
    const {name, sys} = weather;

    locationDisplay.innerHTML = `${name}, ${sys.country}`
    temperatureDisplay.innerHTML = `${temperature}°C`
    weatherDisplay.innerHTML = weatherInfo

    setTimeout(function(){
        findButton.innerHTML = 'get weather info'
            weatherContainer.style.display = 'block'
        },1000)
    }
    
}

findButton.addEventListener("click", ()=>{
    if (!cityInput.value.trim()) return;

    fetchApi()
});