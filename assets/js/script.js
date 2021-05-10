//***Global Variables***/
var userInfo = [];
var userLocation = [];
var userCity;
var userState;
var userLong;
var userLat;
const APIKey =
  "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";

//Button Interactions
//Header - EventBus Header
$("#title").on("click", function (event) {
  event.preventDefault();
  $("#intro-page").removeClass("hide");
  $("#address-page").addClass("hide");
  $("#EventsPage").addClass("hide");
  $("#directions-page").addClass("hide");
  $("#my-trips-page").addClass("hide");
});
//Header - My Trips
$("#my-trips-nav").on("click", function (event) {
  event.preventDefault();
  $("#intro-page").addClass("hide");
  $("#address-page").addClass("hide");
  $("#EventsPage").addClass("hide");
  $("#directions-page").addClass("hide");
  $("#my-trips-page").removeClass("hide");
  renderTrips();
});
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
  convertCity(userStreet, userCity, userState, userZip);

  $("#address-page").addClass("hide");
  $("#EventsPage").removeClass("hide");
});

//Save Trip Button
$("#confirm-trip-btn").on("click", function (event) {
  event.preventDefault();

  $("#directions-page").addClass("hide");
  $("#my-trips-page").removeClass("hide");
  renderTrips();
});

$("#trip-list").on("click", ".pastTrips", function (event) {
  event.preventDefault();
  var latlong = JSON.parse(event.target.getAttribute("id"));
     
  
  $("#my-trips-page").addClass("hide");
  $("#directions-page").removeClass("hide");

  
getRoute(latlong);
getRoute(latlong);

});




function renderTrips() {
  document.getElementById("trip-list").innerHTML = " ";
  for (var j = 0; j < localStorage.length; j++) {
    if (
      localStorage.key(j) === "mapbox.eventData.uuid:YXdlZ2hvcnN0" ||
      localStorage.key(j) === "mapbox.eventData:YXdlZ2hvcnN0"
    ) {
    } else {
     
      var events1 = document.createElement("p");
      var hiddenSpan = document.createElement("span");
      events1.classList.add("pastTrips");
      var event = JSON.parse(localStorage.getItem(localStorage.key(j)));
      events1.innerHTML = event[2] + " - " + event[3];
      var venueLatLong = (hiddenSpan.innerHTML = event[4] + "," + event[5]);
      hiddenSpan.classList.add("hide");
      events1.setAttribute("id", localStorage.getItem(localStorage.key(j)));
      
      events1.append(hiddenSpan);
      document.getElementById("trip-list").appendChild(events1);
      
  
    }
  }
}



//Plan Another Trip Button
$("#plan-another-btn").on("click", function (event) {
  event.preventDefault();
  location.reload();
});

/**Get Lat/Long based only on city, state code, street, and zip*/
async function getConvertCity(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

/***LATLONG CONVERSION***/
//convert input to lat/long
async function convertCity(userCity, userState, userStreet, userZip) {
  const APIKey =
    "pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA";
  let geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userStreet}"%20"${userCity}"%20"${userState}"%20"${userZip}.json?access_token=${APIKey}`;

  let convertCityData = await getConvertCity(geocodingURL);
  userLong = String(convertCityData.features[0].center[0]);
  userLat = String(convertCityData.features[0].center[1]);

  userInfo.push(userLat);
  userInfo.push(userLong);
 
}

/**Get Lat/Long based only on city and state code*/
async function getMapData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

/***EVENTS PAGE***/
async function getUserInfo() {
  document.getElementById("numEvents").innerHTML = "";
  document.getElementById("displayEvents").innerHTML = "";
  userCity = $("#user-city").val();
  document.getElementById("userLocation").innerHTML = "Near " + userCity;

  userState = $("#user-state").val();

  let apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userCity}"%20"${userState}.json?access_token=pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA`;
  //fetch data based only on user city and user state
  coordinates = await getMapData(apiUrl);

  cityLong = coordinates.features[0].center[0];
  cityLat = coordinates.features[0].center[1];

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

  //set keyword and classification based on user genre selection
  if (genreSelection === "Music") {
    keyword1 = "Music";
    classify = "Music";
  } else if (genreSelection === "Pop") {
    keyword1 = "Pop";
    classify = "Pop";
  } else if (genreSelection === "Rock") {
    keyword1 = "Rock";
    classify = "Rock";
  } else if (genreSelection === "Rap") {
    keyword1 = "Rap";
    classify = "Rap";
  } else if (genreSelection === "Country") {
    keyword1 = "Country";
    classify = "Country";
  } else if (genreSelection === "Alternative") {
    keyword1 = "Alternative";
    classify = "Alternative";
  } else if (genreSelection === "Jazz") {
    keyword1 = "Jazz";
    classify = "Jazz";
  } else if (genreSelection === "Sports") {
    keyword1 = "Sports";
    classify = "Sports";
  } else if (genreSelection === "Sports") {
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
  }

  //Datepicker
  var startDate = document.getElementById("datepicker-start").value;
  var endDate = document.getElementById("datepicker-end").value;

  var StartDateNew =
    moment(startDate, "MM/DD/YYYY").format("YYYY-MM-DD") + "T00:00:00Z";

  var EndDateNew =
    moment(endDate, "MM/DD/YYYY").format("YYYY-MM-DD") + "T15:00:00Z";

  var distance = document.getElementById("distance");
  var distanceSelection = distance.options[distance.selectedIndex].value;

  //set radius based on user distance selection
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

  //set sorting based on user sort selection
  if (sortSelection === "date") {
    sortSelect = "date";
  } else if (sortSelection === "distance") {
    sortSelect = "distance";
  } else {
    sortSelect = "relevance";
  }
  //fetch based on user criteria
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=" +
      StartDateNew +
      "&endDateTime=" +
      EndDateNew +
      "&latlong=" +
      cityLat +
      "," +
      cityLong +
      "&radius=" +
      radius +
      "&unit=miles&classificationName=[" +
      classify +
      ']&keyword="' +
      keyword1 +
      '"&sort=' +
      sortSelect +
      ",asc&includeTBA=no&includeTBD=no&countryCode=us&apikey=sn3YzS5u3eeoiEBigTAhQPKYhKDI8yUA"
  )
    .then(function (ticketMasterResponse) {
      return ticketMasterResponse.json();
    })
    .then(function (ticketMasterResponse) {
      //if there are events
      if (ticketMasterResponse._embedded) {
        var eventsArraySize = ticketMasterResponse._embedded.events.length;

        document.getElementById("numEvents").innerHTML +=
          "We found " + eventsArraySize + " events";
        document.getElementById("numEvents").style.display = "block";
        //display events
        for (var i = 0; i < eventsArraySize; i++) {
          var butt1 = document.createElement("button");
          butt1.setAttribute("id", i);
          butt1.classList.add("event-btn");
          var content = document.createElement("div");
          content.setAttribute("id", i);
          var icon = document.createElement("img");
          icon.setAttribute("id", i);
          icon.classList.add("images");
          icon.setAttribute(
            "src",
            ticketMasterResponse._embedded.events[i].images[9].url
          );

          var EventDate = document.createElement("h4");

          if (!ticketMasterResponse._embedded.events[i].dates.start.dateTime) {
            var unixDate = "TBA";
          } else {
            var unixDate =
              ticketMasterResponse._embedded.events[i].dates.start.dateTime;

            var humanDate = moment(unixDate.substring(0, 10)).format(
              "MMM DD, ddd"
            );
            var humanTime = moment(
              unixDate.substring(11, 19),
              "h:mm:ss"
            ).format("hh:mm A");
          }

          EventDate.setAttribute("id", i);
          EventDate.setAttribute("class", "date" + i);
          EventDate.innerHTML = humanDate + "<br/>" + humanTime + " GMT";
          var EventTitle = document.createElement("h4");
          EventTitle.setAttribute("id", i);
          var name = ticketMasterResponse._embedded.events[i].name;
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

          EventLocation.innerHTML = location;

          content.appendChild(icon);
          content.appendChild(EventTitle);
          content.appendChild(EventDate);

          content.appendChild(EventLocation);
          butt1.appendChild(content);

          var lineBreak = document.createElement("br");
          var lineBreak2 = document.createElement("br");

          document.getElementById("displayEvents").appendChild(butt1);
          document.getElementById("displayEvents").appendChild(lineBreak);
          document.getElementById("displayEvents").appendChild(lineBreak2);
        }

        //event listener for an event selection
        document
          .getElementById("displayEvents")
          .addEventListener("click", function (e) {
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

              var eventdate = event_Date.substring(0, 11);
              var eventdateTime = event_Date.substring(11, 19);
              event_Date = eventdate + " " + eventdateTime;
              date = eventdate + " " + eventdateTime;

              var venue_Lat =
                ticketMasterResponse._embedded.events[eventID]._embedded
                  .venues[0].location.latitude;
              var venue_Long =
                ticketMasterResponse._embedded.events[eventID]._embedded
                  .venues[0].location.longitude;

              var buttEventID =
                ticketMasterResponse._embedded.events[eventID].id;

              userInfo.push(event_Date);
              userInfo.push(event_Name);
              userInfo.push(venue_Lat);
              userInfo.push(venue_Long);

              $("#EventsPage").addClass("hide");
              $("#directions-page").removeClass("hide");

              localStorage.setItem(buttEventID, JSON.stringify(userInfo));
              

              getRoute(userInfo);
              getRoute(userInfo);
              document.querySelector("#EventsPage").style.display = "none";

              return userInfo;
            }
          });
      }
      //No events, Try Again
      else {
        document.getElementById("numEvents").innerHTML +=
          "Sorry! We found 0 events. Please Try Again.";
        document.getElementById("numEvents").style.display = "block";
      }
    });
}

//Display Datepicker
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
function getRoute(userInfo) {
  
  
  var start = [userInfo[1], userInfo[0]];

  var end = [userInfo[5], userInfo[4]];

  
  var center = [
    (Number(userInfo[1]) + Number(end[0])) / 2,
    (Number(userInfo[0]) + Number(end[1])) / 2,
  ];
 
  

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

    map.setCenter(center).setZoom(8);
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

      /*Start and End Point
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
                  coordinates: [userInfo[1], userInfo[0]],
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
      console.log("This is the end: " + end);
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
      */
    }

    // Display the written instructions
    var instructions = document.getElementById("instructions");
    var steps = data.legs[0].steps;

    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
      tripInstructions.push("<br><li>" + steps[i].maneuver.instruction.slice(0,-1)) +
        "</li>";
      instructions.innerHTML =
        '<span class="duration">Trip duration: ' +
        Math.floor(data.duration / 60) +
        " min </span>" +
        tripInstructions;
    }
    
  };
  req.send();
  
}
