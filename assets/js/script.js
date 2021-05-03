//Global Variables
var userCity;
//Test Fetches
//ticketmaster
/*fetch(
  "https://app.ticketmaster.com/discovery/v2/events?apikey=5SeBGIy4GsBTA6ttR5Pu2buX8RhCTCsq&radius=25&size=3&unit=miles&locale=*&startDateTime=2021-04-27T18:06:00Z&endDateTime=2021-12-31T18:06:00Z&city=Austin"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

//mapbox
fetch(
  "https://api.mapbox.com/directions/v5/mapbox/driving/-73.996%2C40.732%3B-73.991%2C40.735?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
*/

//***USER INFO PAGE***/
//save user info as an array
var userLocation = [];

//Button Interactions
//Intro - Get Started
$("#get-started-btn").on("click", function (event) {
  event.preventDefault();
  $("#intro-page").addClass("hide");
  $("#address-page").removeClass("hide");
});
//user-info submit
$("#user-info-btn").on("click", function (event) {
  event.preventDefault();

  var userStreet = $("#user-street").val();
  userCity = $("#user-city").val();
  var userState = $("#user-state").val();
  var userZip = $("#user-zip").val();
  convertCity(userStreet, userState, userZip);
  $("#address-page").addClass("hide");
  $("#events-page").removeClass("hide");
});

//events-page submit
$("#test-btn").on("click", function (event) {
  event.preventDefault();

  var userStreet = $("#user-street").val();
  userCity = $("#user-city").val();
  var userState = $("#user-state").val();
  var userZip = $("#user-zip").val();
  convertCity(userStreet, userState, userZip);
  $("#events-page").addClass("hide");
  $("#directions-page").removeClass("hide");
});

//Directions Page
//directions page save trip
$("#confirm-trip-btn").on("click", function (event) {
  event.preventDefault();

  $("#directions-page").addClass("hide");
  $("#my-trips-page").removeClass("hide");
});

//Start Over
$("#start-over-btn").on("click", function (event) {
  event.preventDefault();
  $("#address-page").removeClass("hide");
  $("#directions-page").addClass("hide");
});

//My Trips Page
$("#plan-another-btn").on("click", function (event) {
  event.preventDefault();
  $("#address-page").removeClass("hide");
  $("#my-trips-page").addClass("hide");
});
//convert input to lat/long
function convertCity(userStreet, userCity, userState, userZip) {
  const APIKey =
    "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
  let geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userStreet}"%20"${userCity}"%20"${userState}"%20"${userZip}.json?access_token=${APIKey}`;

  $.ajax({
    url: geocodingURL,
    method: "GET",
  }).then(function (userCityResponse) {
    console.log(userCityResponse);
    getRoute(userCityResponse);
    //displayEventsPage(userCityResponse);
  });
}

/***DIRECTIONS PAGE***/
//sets map generic details on load
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-100.89250982470283, 39.715048726126575], // starting position
  zoom: 2,
});

//set variables
var start = [];
var end;

// create a function to make a directions request
function getRoute(userCityResponse) {
  let userLong = userCityResponse.features[0].center[0];
  let userLat = userCityResponse.features[0].center[1];
  console.log(userLat, userLong);
  var start = [userLong, userLat];
  // var end = [-97.75554333304073, 30.23216688535965];
  var end = [-96.80300088039094, 32.78745518007029];
  var center = [(userLong + end[0]) / 2, (userLat + end[1]) / 2];
  //updateMap(center, start, end);
  var url =
    "https://api.mapbox.com/directions/v5/mapbox/driving/" +
    start[0] +
    "," +
    start[1] +
    ";" +
    end[0] +
    "," +
    end[1] +
    "?steps=true&geometries=geojson&access_token=" +
    mapboxgl.accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onload = function () {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, reset it using setData
    map.setCenter(center).setZoom(5);
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    } else {
      // otherwise, make a new request
      //route display
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: geojson,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
      // Add starting point to the map
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [userLong, userLat],
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#FF0000",
        },
      });
      // Add ending point to the map
      map.addLayer({
        id: "endpoint",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: end,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#FF0000",
        },
      });
    }

    // Display the written instructions
    var instructions = document.getElementById("instructions");
    var steps = data.legs[0].steps;

    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
      tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) +
        "</li>";
      instructions.innerHTML =
        '<br><span class="duration">Trip duration: ' +
        Math.floor(data.duration / 60) +
        " min </span>" +
        tripInstructions;
    }
  };
  req.send();
}
