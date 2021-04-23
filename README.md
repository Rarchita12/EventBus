# EventBus

## Proposal PowerPoint
https://docs.google.com/presentation/d/1ni5DCQ1bEUT9jzVbZkLpHSMDqCV3ZLyOh93iE414hC0/edit?usp=sharing

## Project Requirements
Use a CSS framework other than Bootstrap.(Foundation or Pure.css)
Be deployed to GitHub Pages.
Be interactive (i.e., accept and respond to user input). (Input our location, filter by distance(10mi,25,50,75,All) , select genre)
Use at least two server-side APIs. (GraphHopper(Routing API & GeoCoding API), TicketMaster)
Does not use alerts, confirms, or prompts (use modals).
Use client-side storage to store persistent data.(Previous Trips Modal)
Be responsive.
Have a polished UI.
Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).



## Overview:
Planning for an upcoming event can be tedious and stressful. Have no fear! EventBus can help relieve some of your stress!  EventBus is an application designed to allow the user to choose an upcoming event and EventBus will provide the user with travel directions to that venue!    

## API’s:
https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
https://docs.graphhopper.com/
Framework
https://get.foundation/

## Acceptance Criteria:
* GIVEN a user visits the site,
* WHEN the user will enter their location, event type, date range, radius.
* THEN an event/venue list is displayed according to the criteria selected
* WHEN the user selects an event from the list
* THEN display a route from users location to the event

* GIVEN the user want to view past trips
* WHEN they ‘click’ on the Travel History Btn
* THEN the user is presented with a list of previous trips


## To Do tasks for EventBus
1. HTML
  * Input Field - Address
  * Select Dropdown - Filters
  * Btn - Submit details for fetch()
2. CSS Styling
  * Gray out past events
3. JavaScript
  * API Calls (Ticketmaster, GraphHopper)
4. Event Handlers
  * OnClick - Button click passes user information to the API
5. Local Storage
  * All search history is saved with localStorage 


	

