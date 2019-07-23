var config = {
    apiKey: "AIzaSyA4Bp2RG-ZMC6seJvQQRSQ7540ff04V3W4",
    authDomain: "first-project-f407a.firebaseapp.com",
    databaseURL: "https://first-project-f407a.firebaseio.com",
    storageBucket: "",
  };
// intialize firebase
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

console.log(database);

$( document ).ready(function() {

// on Submit push to database
$("#add-new").on("click", function(event) {
    console.log('submit clicked');
// prevent form from trying to submit/refresh the page
    event.preventDefault();

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var time = $("#time").val().trim();
   
// Console log each of the user inputs to confirm we are receiving them
     console.log(name);
     console.log(destination);
     console.log(time);
     console.log(frequency);


    database.ref().push({
        name,
        destination,
        frequency,
        time,
      });
    //   $("form")[0].reset(); try clearing table by using id and .val('')
    });

// reference the data in Firebase and add row in html when new train is added
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

// append new train name
var newRow = $("<tr>");
var tempCell = $("<td>");

tempCell.text(childSnapshot.val().name);
newRow.append(tempCell);
tempCell = $("<td>");

// append destination
tempCell.text(childSnapshot.val().destination);
newRow.append(tempCell);
tempCell = $("<td>");

// append frequency
tempCell.text(childSnapshot.val().frequency);
newRow.append(tempCell);
tempCell = $("<td>");

// create variables and calculate minutes away and next arrival time
// append those 2 items to table
// subtract 1 year to always make sure the time input is prior to next arrival
var time = 0;

var timeConverted = moment(time, 'HH:mm').subtract(1, 'years');

var currentTime = moment();
console.log(currentTime);

var diffTime = moment().diff(moment(timeConverted), 'minutes');
console.log(diffTime);

var remainder = diffTime % frequency;
console.log(remainder);

var minutesAway = frequency - remainder;

var nextArrival = currentTime + minutesAway;
console.log(nextArrival);


// calculate and append next arrival time using moment js
    tempCell.text(nextArrival);
    newRow.append(tempCell);
    tempCell = $("<td>");

// calculate and append minutes away using moment js
    tempCell.text(minutesAway);
    newRow.append(tempCell);
    tempCell = $("<td>");

  
// append new row to table 
    $("#train-table").append(newRow);

});

// Clear button to clear table once complete

$('#clear').click(function(){
    document.getElementById("train-table").innerHTML = "";
});


});

