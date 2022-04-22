var today = moment(new Date()).format("dddd, MMMM Do");
var x = moment(new Date()).format("hh");

console.log(typeof(x));
$(document).ready(function() {
    $("#currentDay").text(today);
});