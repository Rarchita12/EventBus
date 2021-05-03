/*fetch(
  "https://app.ticketmaster.com/discovery/v2/events?apikey=5SeBGIy4GsBTA6ttR5Pu2buX8RhCTCsq&radius=25&size=200&unit=miles&locale=*&startDateTime=2021-04-27T18:06:00Z&endDateTime=2021-12-31T18:06:00Z&city=Austin"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

fetch(
  "https://api.mapbox.com/directions/v5/mapbox/driving/-73.996%2C40.732%3B-73.991%2C40.735?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoiYXdlZ2hvcnN0IiwiYSI6ImNrbnpianptdzAyYWkzMG85aG52NHY2YnYifQ.XX_caU54wujSY7FkrRplrA"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
*/

function getUserInfo() {
  // LEARNING ASSISTANT
  var dateSelected = $("#datepicker")
    .datepicker({ dateFormat: "mm-dd-yy" })
    .val();
  console.log(dateSelected);

  var genre = document.getElementById("genres");
  var genreSelection = genre.options[genre.selectedIndex].text;
  console.log(genreSelection);
  var dates = document.getElementById("dates");
  var datesSelection = dates.options[dates.selectedIndex].value;
  if (datesSelection === "dateRange") {
    $("#dateRange").datepicker();
  }

  var distance = document.getElementById("distance");
  var distanceSelection = distance.options[distance.selectedIndex].value;
  console.log(distanceSelection);
}

function dateRange() {
  $("#dateRange1").datepicker();
  console.log("here");
}

fetch(
  // Make a fetch request to Wikipedia to get a random article title
  //`// YOUR CODE HERE`
  //

  'https://app.ticketmaster.com/discovery/v2/events.json?latlong=34.052235,-118.243683&radius=100&unit=miles&classificationName=[Other]&keyword="Other"&apikey=sn3YzS5u3eeoiEBigTAhQPKYhKDI8yUA'
)
  .then(function (ticketMasterResponse) {
    //take the response and convert it to JavaScript
    return ticketMasterResponse.json();
  })
  .then(function (ticketMasterResponse) {
    //wikiResponse is available as a JavaScript Object here

    console.log(ticketMasterResponse);
  });

const activities = document.getElementById("dates");

activities.addEventListener("change", (e) => {
  console.log(`e.target.value = ${e.target.value}`);
  if (e.target.value === "dateRange") {
    document.getElementById("myModal").style.display = "block";
    $("#datepicker").datepicker();
    // When the user clicks on <span> (x), close the modal
  }
});

function checkAndUpdateTimePicker() {
  console.log(activities.value);
  if (
    new Date(activities.value).toLocaleDateString() ==
    new Date().toLocaleDateString()
  ) {
    console.log("hello");
    document.querySelectorAll("#dateRange1 option").forEach((opt) => {
      console.log(opt.value);
      let optHour = opt.value.split(".")[0];
      let optMinute = opt.value.split(".")[1];

      let currentHour = new Date().getHours();
      let currentMinute = new Date().getMinutes();
      if (optHour < currentHour) {
        opt.disabled = true;
        opt.dataset.description =
          "Please scroll to choose a different time, this time has passed.";
      }
      if (optHour == currentHour && optMinute < currentMinute) {
        opt.disabled = true;
      }
    });
  } else {
    console.log("hello");
    document.querySelectorAll("#dateRange1 option").forEach((opt) => {
      opt.disabled = false;
    });
  }
}
