// 76.90134 43.248622
//https://api.openweathermap.org/data/2.5/onecall?lat=48.785835&lon=-122.40642&appid=32304bca70420a2d98a8d0fc2416a813&units=metric
// console.log("hw")
let lat = 48.785835
// 76.90134
let lon = -122.40642
// 43.248622
const API_KEY = "32304bca70420a2d98a8d0fc2416a813"

$( document ).ready(function() {
    getWeather()
});
function renderContent(content){
    console.log(content)
    //Main Block
    document.querySelector("#currentTemp").innerText = Math.round(content.current.temp) + "°"
    document.querySelector("#city").innerText = content.timezone
    document.querySelector("#currentDate").innerText = new Date(content.current.dt * 1000).toLocaleDateString();
    document.querySelector("#pressure").innerText = content.current.pressure
    document.querySelector('#windSpeed').innerText = content.current.wind_speed
    document.querySelector('#humidity').innerText = content.current.humidity
    document.querySelector('#cloudness').innerText = content.current.clouds
    document.querySelector('#currentState').innerText = content.current.weather[0].main
    // document.querySelector('#currentIcon').src = setIcon(content.current.weather[0].icon)
    //ChangeIcon
    const iconLocation = content.current.weather[0].icon
    document.querySelector('#currentIcon').src = `https://openweathermap.org/img/wn/${iconLocation}.png`


    //Block1
    const iconLocation1 = content.daily[0].weather[0].icon
    document.querySelector('#firstIcon').src = `https://openweathermap.org/img/wn/${iconLocation1}.png`
    document.querySelector('#firstTemp').innerText = Math.round(content.daily[0].temp.day) + "°"
    document.querySelector('#firstState').innerText = content.daily[0].weather[0].main
    // document.querySelector('#firstIcon').src = setIcon(content.daily[0].weather[0].icon)


    //Block2
    const iconLocation2 = content.daily[1].weather[0].icon
    document.querySelector('#secondIcon').src = `https://openweathermap.org/img/wn/${iconLocation2}.png`
    document.querySelector('#secondTemp').innerText = Math.round(content.daily[1].temp.day) + "°"
    document.querySelector('#secondState').innerText = content.daily[1].weather[0].main

    //Block3
    const iconLocation3 = content.daily[2].weather[0].icon
    document.querySelector('#thirdIcon').src = `https://openweathermap.org/img/wn/${iconLocation3}.png`
    document.querySelector('#thirdTemp').innerText = Math.round(content.daily[2].temp.day) + "°"
    document.querySelector('#thirdState').innerText = content.daily[2].weather[0].main

    //Block4
    const iconLocation4 = content.daily[3].weather[0].icon
    document.querySelector('#forthIcon').src = `https://openweathermap.org/img/wn/${iconLocation4}.png`
    document.querySelector('#forthTemp').innerText = Math.round(content.daily[3].temp.day) + "°"
    document.querySelector('#forthState').innerText = content.daily[3].weather[0].main


}
function getWeather(){
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        type: 'GET',
        dataType: 'json',
        data: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: "metric"
        },
        success (response) {
            console.log('its OK')
            renderContent(response)
        },
        onerror (err) {
            console.log(err)
        }
    });
}
function getCoords() {
    if (!checkLsCoords()){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                console.log(lat, lon)
                saveLsCoords({'lat': lat, 'lon': lon})
                getWeather()
            });
        } else {
            alert('Ваш браузер - старый')
        }
    }else{
        setCoordsLs()
        getWeather()
    }

}

function saveLsCoords(coords={}){
    let coordsForSave = JSON.stringify(coords)
    localStorage.setItem('coords', coordsForSave)
}

function checkLsCoords(){
    return ( (localStorage.getItem('coords') || '').length > 0)
}

function setCoordsLs(){
    let coordsStr = localStorage.getItem('coords')
    let coords = JSON.parse(coordsStr)
    lat = coords.lat
    lon = coords.lon
}

// function setIcon(code){
//     const icons = {
//         '04n' : '',
//         '10d': ''
//     }
//     return icons[code]
// }

