var config = {
    apiKey: "AIzaSyA4Bp2RG-ZMC6seJvQQRSQ7540ff04V3W4",
    authDomain: "first-project-f407a.firebaseapp.com",
    databaseURL: "https://first-project-f407a.firebaseio.com",
    storageBucket: "",
  };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

console.log(database);

$( document ).ready(function() {

$("#add-new").on("click", function(event) {
    console.log('submit clicked');
    event.preventDefault();

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var time = $("#time").val().trim();

    database.ref().push({
        name,
        destination,
        frequency,
        time,
      });


database.ref().on("child_added", function(snapshot) {
    var newRow = $("<tr>");
    var tempCell = $("<td>");
    tempCell.text(snapshot.val().name);
    newRow.append(tempCell);
    tempCell = $("<td>");
    tempCell.text(snapshot.val().destination);
    newRow.append(tempCell);
    tempCell = $("<td>");
    tempCell.text(snapshot.val().frequency);
    newRow.append(tempCell);
    // tempCell = $("<td>");
    // tempCell.text(snapshot.val().time);
    // newRow.append(tempCell);
    // tempCell = $("<td>");
    // tempCell.text('X');
    // newRow.append(tempCell);
    
    $("#train-table").append(newRow);

});

var nextArrival = moment($.now()).format('hh:mm a');
    
    var minutesAway = moment(snapshot.val().time).format('hh:mm a');
    moment($.now()).format('m');
    moment(nextArrival).diff(convertedTime, 'minutes');
    console.log("minutes away:  " + minutesAway)

    var convertedTime = moment(snapshot.val().time).format('hh:mm a');
    console.log("next to arrive:  " + convertedTime)
   
  
    // build and append the minutes away
    tempCell.text(minutesAway);
    newRow.append(tempCell);
    tempCell = $("<td>");   // cell must be reset for the next cell to be built

    // build and append the next to arrive
    tempCell.text("$" + snapshot.val().nextArrival);
    newRow.append(tempCell);
    tempCell = $("<td>");   // cell must be reset for the next cell to be built

    // build and append 
    var frequencyInt = parseInt(snapshot.val().frequency)
    tempCell.text("$" + (minutesAway * frequencyInt));
    newRow.append(tempCell);
});

});