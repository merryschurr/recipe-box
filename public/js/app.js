$(document).ready(function() {
  getLocation();

  // add a spinner icon to areas where data will be populated
  $('#condition').html('<i class="fa fa-spinner fa-pulse fa-3x"></i>');
  $('#wind-speed').html('<i class="fa fa-spinner fa-pulse fa-3x"></i>');
});

function getLocation() {
  // Using the GEO IP API due to HTTP restrictions from OpenWeatherMap
  $.getJSON('https://freegeoip.net/json/?callback=?', function(loc) {
    $('#city').text(loc.city + ', ' + loc.region_name + ', ' + loc.country_name);
    getWeather(loc.latitude, loc.longitude, loc.country_code);
  })
  .fail(function(err) {
    getWeather();
  });
}

var weather = new XMLHttpRequest();
weather.open("GET", "http://api.wunderground.com/api/fa5715ba5adff2ac/conditions/q/CA/Los_angeles.json", false);
weather.send(null);

var r = JSON.parse(weather.response);

var dis = "Current location: " + r.current_observation.display_location.full + "  <p>";
var temp = r.current_observation.temperature_string+ "  <p>";
var wind = r.current_observation.wind_string+ "  <p>";

function getWeather(id,res) {
  document.getElementById(id).innerHTML=res;
}
getWeather("weather",dis);
getWeather("temp",temp);
getWeather("wind",wind);


function getWeather(lat, lon, countryCode) {
  var weatherAPI = 'http://api.wunderground.com/api/1fba803a484a8b0c/geolookup/conditions/q/IA/Cedar_Rapids.json' +
    lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' + callback;
  if(window.location.protocol === 'https:') weatherAPI = 'https://cors-anywhere.herokuapp.com/' + weatherAPI
  $.getJSON(weatherAPI, function(weatherData) {
      // Also used by convert();
      temp = weatherData.main.temp.toFixed(0);
      tempC = ((temp - 32) * (5 / 9)).toFixed(0);

      var condition = weatherData.weather[0].description,
        id = weatherData.weather[0].id,
        speed = Number((weatherData.wind.speed * 0.86897624190816).toFixed(1)),
        deg = weatherData.wind.deg,
        windDir,
        iconClass,
        bgIndex,
        backgroundId = [299, 499, 599, 699, 799, 800],
        backgroundIcon = [
          'thunderstorm',
          'sprinkle',
          'rain',
          'snow',
          'fog',
          'night-clear',
          'cloudy',
        ],
        backgroundImg = [
          'http://icons.wxug.com/i/c/i/partlycloudy.gif',
          'http://icons.wxug.com/i/c/i/rain.gif',
          'http://icons.wxug.com/i/c/i/snow.gif',
          'http://icons.wxug.com/i/c/i/clear.gif',
          'http://icons.wxug.com/i/c/i/cloudy.gif',
          'http://icons.wxug.com/i/c/i/sprinkle.gif',
          'http://icons.wxug.com/i/c/i/thunderstorm.gif',
        ];

      backgroundId.push(id);
      bgIndex = backgroundId.sort().indexOf(id);
      $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
      iconClass = backgroundIcon[bgIndex];

      //Get wind compass direction. If API returns null, assume 0 degrees.
      if (deg) {
        var index = Math.floor((deg / 22.5) + 0.5) % 16,
          compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
          ],
          windDir = compassDirections[index];

      } else {
        windDir = 'N';
      }

      //determine F or C based on country and add temperature to the page.
      var fahrenheit = ['US', 'BS', 'BZ', 'KY', 'PL'];
      if (fahrenheit.indexOf(countryCode) > -1) {
        $('#temperature').text(temp + '° F');
      } else {
        $('#temperature').text(tempC + '° C');
      }

      //write final weather conditions and wind information to the page
      $('#wind-speed').html(
        '<i class="wi wi-wind wi-from-' + windDir.toLowerCase() + '"></i><br>' +
        windDir + ' ' + speed + ' knots');
      $('#condition').html(
        '<i class="wi wi-' + iconClass + '"></i><br>' + condition);
    })
    .fail(function(err) {
      alert('There was an error retrieving your weather data. \n' +
        'Please try again later.');
    });
}

//toggle between celsius / fahrenheit
$('#convert-button').click(function() {
  if ($('#temperature').text().indexOf('F') > -1) {
    $('#temperature').text(tempC + '° C');
  } else {
    $('#temperature').text(temp + '° F');
  }

  this.blur(); // remove focus from the button
});

