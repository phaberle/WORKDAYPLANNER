var today = moment(new Date()).format("dddd, MMMM Do");
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
$(".description").click(function() {
    console.log("son of a bitch");
    let currTarget = $('p', this);
    let currTargetTxt = currTarget.text().trim();
    if (currTargetTxt.length > 0) {
        let textInput = $("<input>").addClass("form-control").val(currTargetTxt);
        currTarget.replaceWith(textInput);
    } else {
        let textInput = $("<input>").addClass("form-control").val(currTargetTxt).attr("placeholder", "Type new task/event here.");
        currTarget.replaceWith(textInput);
    }
});

//<input> to <p>
$(".row").on("mouseleave", "input", function() {
    let currTarget = $(":nth-child(2) input");
    let userTxt = currTarget.val();
    let pTag = $("<p>").text(userTxt);
    currTarget.replaceWith(pTag);
});

/*LOCAL STORAGE CRUD*/

$(".saveBtn").click(function() {
    let parentNumber = $(this).parent().data("hour");
    let arrayName = "_" + parentNumber;
    let arrayContent = $(this).siblings('div').find('p').text().trim();
    let derivedArray = eval(arrayName + "=[\"" + arrayContent + "\"];");
    localStorage.setItem("\"" + arrayName + "\"", JSON.stringify(derivedArray));
});

var loadFromLocalStorage = function() {
    $(".row").each(function(i) {
        let rowHour = $(this).data("hour");
        let derivedArrayName = "_" + rowHour;
        let objectFromLocalStorage = localStorage.getItem("\"" + derivedArrayName + "\"");
        let textFromObj = JSON.parse(objectFromLocalStorage);
        $(this).find("p").text(textFromObj);
    })
};



checkPastPresentFuture();
loadFromLocalStorage();