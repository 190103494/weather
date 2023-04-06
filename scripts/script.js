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
    document.querySelector("#currentTemp").innerText = Math.floor(content.current.temp) + "°"
    document.querySelector("#city").innerText = content.timezone
    document.querySelector("#currentDate").innerText = new Date(content.current.dt * 1000);
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