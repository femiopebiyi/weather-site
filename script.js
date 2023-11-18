const cityInput = document.querySelector("input")
const weatherDisplay = document.querySelector("p")
const findButton = document.querySelector("button");
const temperatureDisplay = document.querySelector("h2");
const locationDisplay = document.querySelector(".location");
const weatherContainer = document.querySelector(".weather");
const weatherImg =  document.querySelector(".weather-img-con img")

cityInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        fetchApi()
    }
})

async function fetchApi (){
    try{
        findButton.innerHTML = 'Loading...'
    const city = cityInput.value
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=babb60e2f27524f858ab48abd648c8fb`)
    const weather = await apiCall.json();

    console.log(weather)
    const weatherId = weather.weather[0].id
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
    addWeatherImg(weatherId)


    setTimeout(function(){
        findButton.innerHTML = 'get weather info'
            weatherContainer.style.display = 'block'
        },1000)
    }
    } catch{
        weatherContainer.style.display = 'none'
        findButton.innerHTML = 'couldnt find city'

        setTimeout(function(){
        findButton.innerHTML = 'get weather info'
        },2000)
    }
    
    
}

findButton.addEventListener("click", ()=>{
    if (!cityInput.value.trim()) return;

    fetchApi()
});

function addWeatherImg (id){
    if (id <=500){
        weatherImg.src = 'cloud-rain-solid.svg'
    } else if(id>= 800){
        weatherImg.src = 'cloud-solid.svg'
        
    }
}