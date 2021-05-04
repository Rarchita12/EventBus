//***USER INFO PAGE***/
//save user info as an array
var userInfo = [];
var userLocation = [];
var userCity;
var userState;
var userLong;
var userLat;
const APIKey =
"pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
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
 // convertCity(userStreet, userState, userZip);
  
  $("#address-page").addClass("hide");
  $("#EventsPage").removeClass("hide");
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
  for(var j=0; j<localStorage.length-2;j++){
     var events1 = document.createElement("p");
     var event = localStorage.getItem(j);
     events1.innerHTML = event;
     document.getElementById("trip-list").appendChild(events1);

  }
});

//Start Over
$("#start-over-btn").on("click", function (event) {
  event.preventDefault();
 // $( "#address-page" ).load(window.location.href + " #address-page" );
location.reload();
  /*
  $("#address-page").removeClass("hide");
  $("#directions-page").addClass("hide");*/
});

//My Trips Page
$("#plan-another-btn").on("click", function (event) {
  event.preventDefault();
  location.reload();
});






/***LATLONG CONVERSION***/
//convert input to lat/long
function convertCity(userCity, userState) {
    const APIKey =
      "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
    let geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userCity}"%20"${userState}.json?access_token=${APIKey}`;
  
    $.ajax({
      url: geocodingURL,
      method: "GET",
    }).then(function (userCityResponse) {
    // getRoute(userCityResponse);
     // getUserInfo(userCityResponse);
      //console.clear();
      console.log("Matched User City =", userCityResponse.features[0].place_name);
      console.log(userCityResponse.features[0].center[1]);
      //displayEventsPage(userCityResponse);
    });
  }


  async function getJsonRoute(userCity, userState, urlMap,urlTicket ) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}




async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}




/***EVENTS PAGE***/
async function getUserInfo() {
    userCity = $("#user-city").val();
    document.getElementById("userLocation").innerHTML = "Near " + userCity;
   // document.getElementById("userLocation").style.display = "block";
    console.log("This is City " + userCity);
    userState = $("#user-state").val();
    console.log("This is State " + userState);
    let apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userCity}"%20"${userState}.json?access_token=pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA`;
    jsondata = await getJson(apiUrl)
    console.log(jsondata);
    userLong = jsondata.features[0].center[0];
    userLat = jsondata.features[0].center[1];
    
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
        ",asc&includeTBA=no&includeTBD=no&apikey=sn3YzS5u3eeoiEBigTAhQPKYhKDI8yUA"
    )
      .then(function (ticketMasterResponse) {
        //take the response and convert it to JavaScript
        return ticketMasterResponse.json();
      })
      .then(function (ticketMasterResponse) {
        //wikiResponse is available as a JavaScript Object here
  
        console.log(ticketMasterResponse);
  
        if(ticketMasterResponse._embedded.events.length ===0){
          document.getElementById("numEvents").innerHTML += "Sorry! We found 0 events. Please Try Again.";
        document.getElementById("numEvents").style.display = "block";
        }
        
        var eventsArraySize = ticketMasterResponse._embedded.events.length;
        console.log("Events array size: " + eventsArraySize);
        document.getElementById("numEvents").innerHTML += "We found "+ eventsArraySize + " events.";
        document.getElementById("numEvents").style.display = "block";
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

          if(!ticketMasterResponse._embedded.events[i].dates.start.dateTime){
            //throw Error("ERROR");
            var unixDate = "TBA";
            console.log("THIS IS AN ERROR");
          }
          else{
          var unixDate =
            ticketMasterResponse._embedded.events[i].dates.start.dateTime;
          console.log("Unix Date: " + unixDate);
  
          //"dddd, MMMM Do, YYYY h:mm:ss A"
          var humanDate = moment(unixDate.substring(0, 10)).format("MMM DD, ddd");
          var humanTime = moment(unixDate.substring(11, 19), "h:mm:ss").format(
            "hh:mm A"
          );
          }
  
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
           //   date: , name: , lat: , long: 
              userInfo.push(event_Date);
              userInfo.push(event_Name);
              userInfo.push(venue_Lat);
              userInfo.push(venue_Long);
              //updateArray(event_Name, event_Date, venue_Lat, venue_Long);
              $("#events-page").addClass("hide");
  $("#directions-page").removeClass("hide");
  var i=0;
  localStorage.setItem(i, userInfo);
  i++;
              getRoute(jsondata, userInfo);
              getRoute(jsondata, userInfo);
              document.querySelector("#EventsPage").style.display = "none";
              return userInfo;
            }
          });
        
      });
  }

  
  console.log("The array: " + userInfo);
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
function getRoute(jsondata, userInfo) {
    console.log("User City Reponse " + JSON.stringify(jsondata));
    console.log("User City Reponse " + userInfo);

    userLong = jsondata.features[0].center[0];
    userLat = jsondata.features[0].center[1];


console.log("Starting Point", userLat, userLong);
var start = [userLong, userLat];
// var end = [-97.75554333304073, 30.23216688535965];7
var end = [userInfo[3], userInfo[2]];
console.log("This is end: " +end);
var center = [((Number(userLong) + Number(end[0])) / 2), ((Number(userLat) + Number(end[1])) / 2)];
console.log("Inside center: " +center);
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
  console.log("Center: " + center);
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
