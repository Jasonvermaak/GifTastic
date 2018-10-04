$(document).ready(function () {

    //Starting the Array
    var topics = ["Football", "Basketball", "Soccer", "Baseball", "Tennis",]

    //Function to generate buttons from array
    function loadButtons() {

        //Loop to create and add new buttons to page
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>").text(topics[i])
            newButton.addClass("gif-button")
            newButton.attr("data-query", (topics[i]))
            $("#gif-button-section").append(newButton)
        }
    }

    //Load initial array
    loadButtons()

    //Add user input to array and reload array to add new buttons
    $("#add-gif-button").click(function (event) {
        event.preventDefault()
        userInput = $("#user-input").val().trim()

        //Check if user input already exists in array
        //Alert that button already exists
        if ($.inArray(userInput.toLowerCase(), topics) !== -1) {
            alert("Button already exists for " + userInput)
        }

        //Add user input to array and reload buttons
        else {
            topics.push(userInput)
            $("#gif-button-section").empty()
            loadButtons()
        }

        //Clears input field
        $("#user-input").val("")
    })

    //Click event listener for buttons created
    $("body").on("click", ".gif-button", function () {
        var searchItem = $(this).attr("data-query")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=Wir4pR8vBsdXyktmyqIESfIqQZ9SB1aq&limit=10"

        //Call to giphy API to get and display gif images
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var displayDiv = $("<div>").addClass("gif-div")
                var rating = $("<p>").text(results[i].rating)
                var gifImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif")
                displayDiv.append(rating, gifImage)
                $("#gif-display").prepend(displayDiv)
            }
        })

    })

    //Click event listener for gifs added to page
    $("body").on("click", ".gif", function () {
        var state = $(this).attr("data-state")

        //Toggles gif src between still image and animated image
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")
        }
    })
})