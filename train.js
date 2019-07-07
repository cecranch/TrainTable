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
    var frequency = moment($("#frequency").val().trim(), 'minutes');
    var time = moment($("#time").val().trim(), "hh:mm a");

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
    //   $("form")[0].reset();
    });

// reference the data in Firebase and add row in html when new train is added
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var newRow = $("<tr>");
    var tempCell = $("<td>");
    var now = moment();
    var nextArrival = moment(time).add(frequency).format('hh:mm a');
    var minutesAway = moment(nextArrival).diff(now).format('minutes');
    var minutesAway2 = nextArrival.diff(now, "minutes");
    console.log(minutesAway);
    console.log(minutesAway2);
    console.log(nextArrival);

// append new train name
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

// calculate and append next arrival time using moment js
    tempCell.text(childSnapshot.val().nextArrival);
    newRow.append(tempCell);
    tempCell = $("<td>");

// calculate and append minutes away using moment js
    tempCell.text(childSnapshot.val().minutesAway);
    newRow.append(tempCell);
    tempCell = $("<td>");

  
// append new row to table 
    $("#train-table").append(newRow);

});


});

