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

var eventID;
function getUserInfo(){
var genre = document.getElementById("genres");
var genreSelection = genre.options[genre.selectedIndex].value;
var keyword1;
var classify;
var radius;
var sortSelect;
//NEED TO ADD GENRE
if(genreSelection === "Sports"){
  keyword1 = "Sports";
  classify = "Sports";
}
else if(genreSelection === "ArtsTheatre"){
  keyword1 = "Arts & Theatre";
  classify = "Arts & Theatre";
}
else if(genreSelection === "Family"){
  keyword1 = "Family";
  classify = "Family";
}
else if(genreSelection === "Film"){
  keyword1 = "Film";
  classify = "Film";
}
else if(genreSelection === "Other"){
  keyword1 = "Other";
  classify = "Other";
}
else{
  keyword1 = "";
  classify = "";
}
console.log(genreSelection);






/*var dates = document.getElementById("dates");
var datesSelection = dates.options[dates.selectedIndex].value;
if(datesSelection === "dateRange"){
  $("#dateRange").datepicker();
}
*/

var startDate = document.getElementById("datepicker-start").value;
var endDate = document.getElementById("datepicker-end").value;
console.log("Start: " + startDate + " End Date: " + endDate);

var StartDateNew = moment(startDate, "MM/DD/YYYY").format("YYYY-MM-DD") + "T00:00:00Z";
console.log("NewStart: " + StartDateNew);
var EndDateNew = moment(endDate, "MM/DD/YYYY").format("YYYY-MM-DD") +  "T15:00:00Z";
console.log("NewEnd: " + EndDateNew);

var distance = document.getElementById("distance");
var distanceSelection = distance.options[distance.selectedIndex].value;
console.log(distanceSelection);

if(distanceSelection === "10"){
  radius = "10";
}
else if(distanceSelection === "25"){
  radius = "25";
}
else if(distanceSelection === "50"){
  radius = "50";
}
else if(distanceSelection === "75"){
  radius = "75";
}

else{
  radius = "";
}


var sorting = document.getElementById("sort");
var sortSelection = sorting.options[sorting.selectedIndex].value;
console.log(sortSelection);

if(sortSelection === "date"){
  sortSelect= "date";
}
else if(sortSelection === "distance"){
  sortSelect = "distance";
}
else
{
    sortSelect= "relevance";
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

  'https://app.ticketmaster.com/discovery/v2/events.json?startDateTime='+StartDateNew+'&endDateTime='+EndDateNew+'&city=Dallas&stateCode=TX&radius='+radius+'&unit=miles&classificationName=['+classify+']&keyword="'+keyword1+'"&sort='+sortSelect+',asc&apikey=sn3YzS5u3eeoiEBigTAhQPKYhKDI8yUA'
)
  .then(function(ticketMasterResponse) {
    //take the response and convert it to JavaScript 
    return ticketMasterResponse.json();
  })
  .then(function(ticketMasterResponse) {
    //wikiResponse is available as a JavaScript Object here
  
   console.log(ticketMasterResponse);
   


var eventsArraySize = ticketMasterResponse._embedded.events.length;
console.log("Events array size: " + eventsArraySize);
 for(var i =0; i<eventsArraySize;i++){
  var butt1 = document.createElement("button");
  butt1.setAttribute("id", i);
  var content = document.createElement("div");
  content.setAttribute("id", i);
  var icon = document.createElement("img");
  icon.setAttribute("id", i);
  icon.classList.add("images");
  icon.setAttribute("src", ticketMasterResponse._embedded.events[i].images[9].url);
  //ticketMasterResponse.embedded.events[0].images[0];
  var EventDate = document.createElement("h4");
  var unixDate =ticketMasterResponse._embedded.events[i].dates.start.dateTime;
  console.log("Unix Date: " + unixDate);
  
  //"dddd, MMMM Do, YYYY h:mm:ss A"
  var humanDate = moment(unixDate.substring(0, 10)).format("MMM DD, ddd") ;
  var humanTime = moment(unixDate.substring(11, 19), "h:mm:ss").format("hh:mm A") ;
  
  console.log("Human Date: " +humanDate);
  console.log("Human Time: " +humanTime);
  EventDate.setAttribute("id", i);
  EventDate.setAttribute("class", "date" +i);
  EventDate.innerHTML= humanDate + "<br/>" + humanTime;
  var EventTitle = document.createElement("h4");
  EventTitle.setAttribute("id", i);
  var name = ticketMasterResponse._embedded.events[i].name;
  console.log("Name: " +name);
  EventTitle.innerHTML = name;
  var EventLocation = document.createElement("p");
  EventLocation.setAttribute("id", i);
  var location = ticketMasterResponse._embedded.events[i]._embedded.venues[0].name + " - " + ticketMasterResponse._embedded.events[i]._embedded.venues[0].city.name + ", " + ticketMasterResponse._embedded.events[i]._embedded.venues[0].state.stateCode;
  console.log("Location: " +location);
  EventLocation.innerHTML = location;
  
  content.appendChild(icon);
  content.appendChild(EventTitle);
  content.appendChild(EventDate);
  
  content.appendChild(EventLocation);
  butt1.appendChild(content);
  
  var lineBreak =document.createElement("br");
  var lineBreak2 =document.createElement("br");
//lineBreak.innerHTML = "<br/>";
  document.getElementById("displayEvents").appendChild(butt1);
  document.getElementById("displayEvents").appendChild(lineBreak);
  document.getElementById("displayEvents").appendChild(lineBreak2);


}

document.getElementById("displayEvents").addEventListener('click',function(e){
  //console.log(event.target.tagName);
  
  if(e.target && (event.target.tagName=== 'BUTTON' || event.target.tagName=== 'DIV' || event.target.tagName=== 'H4' || event.target.tagName=== 'IMG' || event.target.tagName=== 'P'))
  {
    eventID= event.target.getAttribute("id");
    var event_Name = ticketMasterResponse._embedded.events[eventID].name;
    var  event_Date= document.querySelector('.date' + eventID).textContent;
    console.log(document.getElementsByClassName('0'));
    var lat = ticketMasterResponse._embedded.events[eventID]._embedded.venues[0].location.latitude;
    var long = ticketMasterResponse._embedded.events[eventID]._embedded.venues[0].location.longitude;
    
       console.log("Event Name " +event_Name);
       console.log("Date " +event_Date);
       console.log("Lat " +lat);
       console.log("Long" +long);
       document.querySelector('#EventsPage').style.display = "none";
   }
});

  
  });

}




  //const activities = document.getElementById('dates');

/*activities.addEventListener('change', (e) => {
  console.log(`e.target.value = ${ e.target.value }`);
if( e.target.value === "dateRange"){
  console.log("here");
  
  document.getElementById('myModal').style.display="block";
  $("#datepicker").datepicker();
  // When the user clicks on <span> (x), close the modal



}
});*/


$(function() {
  $( "#datepicker-start" ).datepicker();
  $( "#datepicker-end" ).datepicker();
});