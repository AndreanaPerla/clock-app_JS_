const clock = document.querySelector('.clock-now');
const greet = document.querySelector('.greet');
const main = document.querySelector('.main');
const locationCity = document.querySelector('.location');
const currentTimezone = document.querySelector('.current-timezone');
const currentDay = document.querySelector('.number-day');
const weather = document.querySelector('.how-weather');
const temperature = document.querySelector('.temperature');

//get current time & set greeting + backgroundImage
let currentTime = new Date();
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
if (minute < 10) {
    minute = '0' + minute
}
clock.innerHTML = `${hour}:${minute}`;

let greeting = '';
if (hour >= 4 && hour < 12) {
    greeting = 'Good morning!'
    main.style.backgroundImage = 'url(images/morning-sky01.jpg)'
} else if (hour >= 12 && hour <= 18) {
    greeting = 'Good afternoon!'
    main.style.backgroundImage = 'url(images/afternoon02.jpg)'
} else {
    greeting = 'Good evening!'
    main.style.backgroundImage = 'url(images/night-sky01.jpg)'
}
greet.innerHTML = `${greeting}`;

//get timezone & day of the week
function getTimezone() {
    const URL_TIMEZONE = 'https://worldtimeapi.org/api/ip';
    fetch(URL_TIMEZONE)
        .then(function(regionRes) {
            return regionRes.json();
        })
        .then(function(regionRes) {
            //console.log(regionRes);
            currentTimezone.innerHTML = regionRes.timezone;
            let dayWeek = regionRes.day_of_week;
            if (dayWeek == 1) {
                currentDay.innerHTML = 'monday'
            } else if (dayWeek == 2) {
                currentDay.innerHTML = 'tuesday'
            } else if (dayWeek == 3) {
                currentDay.innerHTML = 'wednesday'
            } else if (dayWeek == 4) {
                currentDay.innerHTML = 'thursday'
            } else if (dayWeek == 5) {
                currentDay.innerHTML = 'friday'
            } else if (dayWeek == 6) {
                currentDay.innerHTML = 'saturday'
            } else {
                currentDay.innerHTML = 'sunday'
            }
        })
        .catch(function(err) {
            console.log(err);
        })

}
getTimezone();

//get weather & locations (<- not precise...)
function getWeather() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let apiKey = 'c4e10ce7b57a0085d920746d92728e42';
            const URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;            
            fetch(URL_WEATHER)
                .then(function(weatherRes) {
                    return weatherRes.json();
                })
                .then(function(weatherRes) {
                    //console.log(weatherRes);
                    const cityName = weatherRes.name ;
                    const countryCode = weatherRes.sys.country ;
                    locationCity.innerHTML = `${cityName}, ${countryCode}`

                    weather.innerHTML = weatherRes.weather[0].description;
                    let temp = weatherRes.main.temp;
                    temp = parseInt(temp) - 273;
                    temperature.innerHTML = temp + '°'
                })
                .catch(function(err) {
                    console.log(err);
                })
        })
    } else {
        console.log('We cannot find your location...');
    }
}
getWeather();
