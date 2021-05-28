let weatherMap;
let weatherMarker;

function initMap() {
  weatherMarker = new google.maps.Marker();

  const myLatLng = {
    lat: 30,
    lng: 30
  };

  let windowInfo = new google.maps.InfoWindow({});

  weatherMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: myLatLng,
  });

  weatherMap.addListener('click', (event) => {
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + event.latLng.lat() + "&lon=" + event.latLng.lng() + "&appid=1b5ee5a1a74d624a74750350327ea372",
      function (data) {
        let temp = parseInt(data.main.temp - 273.15);
        windowInfo.setContent(
          "<div id='txt', class='display-6'>" +
          "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png' alt='альтернативный текст'>" +
          "t = " + temp.toString() + "&#8451\n" + "</div>");
          weatherMarker.setMap(null);
          weatherMarker = new google.maps.Marker({
          position: event.latLng,
          map: weatherMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0
          }
        });
        windowInfo.open(weatherMap, weatherMarker);

      });

  });

}