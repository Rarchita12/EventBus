//Global Variables
var myTrips = [];
var userCity;
var eventID;
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
/*$("#event-submit-btn").on("click", function (event) {
  event.preventDefault();

  var userStreet = $("#user-street").val();
  userCity = $("#user-city").val();
  var userState = $("#user-state").val();
  var userZip = $("#user-zip").val();
  convertCity(userStreet, userState, userZip);
  $("#events-page").addClass("hide");
  $("#directions-page").removeClass("hide");
});
*/
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

/***LATLONG CONVERSION***/
//convert input to lat/long
function convertCity(userStreet, userCity, userState, userZip) {
  const APIKey =
    "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
  let geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userStreet}"%20"${userCity}"%20"${userState}"%20"${userZip}.json?access_token=${APIKey}`;

  $.ajax({
    url: geocodingURL,
    method: "GET",
  }).then(function (userCityResponse) {
    getRoute(userCityResponse);
   // getUserInfo(userCityResponse);
    //console.clear();
    console.log("Matched User City =", userCityResponse.features[0].place_name);
    console.log(userCityResponse.features[0].center[1]);
    //displayEventsPage(userCityResponse);
  });
}

/***EVENTS PAGE***/
function getUserInfo() {
  console.log("hello");
  var genre = document.getElementById("genres");
  var genreSelection = genre.options[genre.selectedIndex].value;
  var keyword1;
  var classify;
  var radius;
  var sortSelect;
  var userStreet = $("#user-street").val();
  var userCity = $("#user-city").val();
  var userState = $("#user-state").val();
  var userZip = $("#user-zip").val();
  //var lat = userCityResponse.features[0].center[1];
  //var long = userCityResponse.features[0].center[0];
  //var lat = convertCity(userStreet, userCity, userState, userZip);
  //console.log(lat);
  //NEED TO ADD GENRE
  if (genreSelection === "Sports") {
    keyword1 = "Sports";
    classify = "Sports";
  } else if (genreSelection === "ArtsTheatre") {
    keyword1 = "Arts & Theatre";
    classify = "Arts & Theatre";
  } else if (genreSelection === "Family") {
    keyword1 = "Family";
    classify = "Family";
  } else if (genreSelection === "Film") {
    keyword1 = "Film";
    classify = "Film";
  } else if (genreSelection === "Other") {
    keyword1 = "Other";
    classify = "Other";
  } else {
    keyword1 = "";
    classify = "";
  }
  console.log(genreSelection);

  var startDate = document.getElementById("datepicker-start").value;
  var endDate = document.getElementById("datepicker-end").value;
  console.log("Start: " + startDate + " End Date: " + endDate);

  var StartDateNew =
    moment(startDate, "MM/DD/YYYY").format("YYYY-MM-DD") + "T00:00:00Z";
  console.log("NewStart: " + StartDateNew);
  var EndDateNew =
    moment(endDate, "MM/DD/YYYY").format("YYYY-MM-DD") + "T15:00:00Z";
  console.log("NewEnd: " + EndDateNew);

  var distance = document.getElementById("distance");
  var distanceSelection = distance.options[distance.selectedIndex].value;
  console.log(distanceSelection);

  if (distanceSelection === "10") {
    radius = "10";
  } else if (distanceSelection === "25") {
    radius = "25";
  } else if (distanceSelection === "50") {
    radius = "50";
  } else if (distanceSelection === "75") {
    radius = "75";
  } else {
    radius = "";
  }

  var sorting = document.getElementById("sort");
  var sortSelection = sorting.options[sorting.selectedIndex].value;
  console.log(sortSelection);

  if (sortSelection === "date") {
    sortSelect = "date";
  } else if (sortSelection === "distance") {
    sortSelect = "distance";
  } else {
    sortSelect = "relevance";
  }

  /*
function dateRange(){
  $("#dateRange1").datepicker();
  console.log("here");
}
*/

  fetch(
    // Make a fetch request to Wikipedia to get a random article title
    //`// YOUR CODE HERE`
    //

    "https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=" +
      StartDateNew +
      "&endDateTime=" +
      EndDateNew +
      "&latlong=" +
      userLat +
      "," +
      userLong +
      "&radius=" +
      radius +
      "&unit=miles&classificationName=[" +
      classify +
      ']&keyword="' +
      keyword1 +
      '"&sort=' +
      sortSelect +
      ",asc&apikey=sn3YzS5u3eeoiEBigTAhQPKYhKDI8yUA"
  )
    .then(function (ticketMasterResponse) {
      //take the response and convert it to JavaScript
      return ticketMasterResponse.json();
    })
    .then(function (ticketMasterResponse) {
      //wikiResponse is available as a JavaScript Object here

      console.log(ticketMasterResponse);

      var eventsArraySize = ticketMasterResponse._embedded.events.length;
      console.log("Events array size: " + eventsArraySize);
      for (var i = 0; i < eventsArraySize; i++) {
        var butt1 = document.createElement("button");
        butt1.setAttribute("id", i);
        var content = document.createElement("div");
        content.setAttribute("id", i);
        var icon = document.createElement("img");
        icon.setAttribute("id", i);
        icon.classList.add("images");
        icon.setAttribute(
          "src",
          ticketMasterResponse._embedded.events[i].images[9].url
        );
        //ticketMasterResponse.embedded.events[0].images[0];
        var EventDate = document.createElement("h4");
        var unixDate =
          ticketMasterResponse._embedded.events[i].dates.start.dateTime;
        console.log("Unix Date: " + unixDate);

        //"dddd, MMMM Do, YYYY h:mm:ss A"
        var humanDate = moment(unixDate.substring(0, 10)).format("MMM DD, ddd");
        var humanTime = moment(unixDate.substring(11, 19), "h:mm:ss").format(
          "hh:mm A"
        );

        console.log("Human Date: " + humanDate);
        console.log("Human Time: " + humanTime);
        EventDate.setAttribute("id", i);
        EventDate.setAttribute("class", "date" + i);
        EventDate.innerHTML = humanDate + "<br/>" + humanTime;
        var EventTitle = document.createElement("h4");
        EventTitle.setAttribute("id", i);
        var name = ticketMasterResponse._embedded.events[i].name;
        console.log("Name: " + name);
        EventTitle.innerHTML = name;
        var EventLocation = document.createElement("p");
        EventLocation.setAttribute("id", i);
        var location =
          ticketMasterResponse._embedded.events[i]._embedded.venues[0].name +
          " - " +
          ticketMasterResponse._embedded.events[i]._embedded.venues[0].city
            .name +
          ", " +
          ticketMasterResponse._embedded.events[i]._embedded.venues[0].state
            .stateCode;
        console.log("Location: " + location);
        EventLocation.innerHTML = location;

        content.appendChild(icon);
        content.appendChild(EventTitle);
        content.appendChild(EventDate);

        content.appendChild(EventLocation);
        butt1.appendChild(content);

        var lineBreak = document.createElement("br");
        var lineBreak2 = document.createElement("br");
        //lineBreak.innerHTML = "<br/>";
        document.getElementById("displayEvents").appendChild(butt1);
        document.getElementById("displayEvents").appendChild(lineBreak);
        document.getElementById("displayEvents").appendChild(lineBreak2);
      }

      document
        .getElementById("displayEvents")
        .addEventListener("click", function (e) {
          //console.log(event.target.tagName);

          if (
            e.target &&
            (event.target.tagName === "BUTTON" ||
              event.target.tagName === "DIV" ||
              event.target.tagName === "H4" ||
              event.target.tagName === "IMG" ||
              event.target.tagName === "P")
          ) {
            eventID = event.target.getAttribute("id");
            var event_Name =
              ticketMasterResponse._embedded.events[eventID].name;
            var event_Date = document.querySelector(".date" + eventID)
              .textContent;
            console.log(document.getElementsByClassName("0"));
            var venue_Lat =
              ticketMasterResponse._embedded.events[eventID]._embedded.venues[0]
                .location.latitude;
            var venue_Long =
              ticketMasterResponse._embedded.events[eventID]._embedded.venues[0]
                .location.longitude;

            console.log("Event Name " + event_Name);
            console.log("Date " + event_Date);
            console.log("Lat " + venue_Lat);
            console.log("Long" + venue_Long);
            updateArray(event_Name, event_Date, venue_Lat, venue_Long);
            document.querySelector("#EventsPage").style.display = "none";
          }
        });
    });
}

$(function () {
  $("#datepicker-start").datepicker();
  $("#datepicker-end").datepicker();
});

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
  console.log("Starting Point", userLat, userLong);
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
        '<span class="duration">Trip duration: ' +
        Math.floor(data.duration / 60) +
        " min </span>" +
        tripInstructions;
    }
    console.log("Route Information", route);
  };
  req.send();
}

//Save trip function
function saveTrip() {
  localStorage.setItem("cities", JSON.stringify(trips));
}

//My Trips Page
