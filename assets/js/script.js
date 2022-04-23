var today = moment(new Date()).format("dddd, MMMM Do");
var x = moment(new Date()).format("H");
// console.log(parseInt(x));

// console.log(typeof(x));
$(document).ready(function() {
    $("#currentDay").text(today);
});

/*get current hour, convert to Number, get hour data from each row,
compare equality, apply appropriate class for past, present and future
*/
var checkPastPresentFuture = function() {
    let currHour = parseInt(moment(new Date()).format("H"));
    $(".row").each(function(i) {
        let rowHour = $(this).data("hour");
        if (currHour > rowHour) {
            $(':nth-child(2)', this).toggleClass("past");
        }
        if (currHour == rowHour) {
            $(':nth-child(2)', this).toggleClass("present");
        }
        if (currHour < rowHour) {
            $(':nth-child(2)', this).toggleClass("future");
        }
    })
}

// <p> to <input>
$(".row").click(function() {
    let currTarget = $(':nth-child(2) p', this);
    let currTargetTxt = currTarget.text().trim();
    let textInput = $("<input>").addClass("form-control").val(currTargetTxt);
    currTarget.replaceWith(textInput);
    // console.log(currTargetTxt);
});

//<input> to <p>
$(".row").on("blur", "input", function() {
    let currTarget = $(":nth-child(2) input");
    let userTxt = currTarget.val();
    let pTag = $("<p>").text(userTxt);
    currTarget.replaceWith(pTag);
});

checkPastPresentFuture();