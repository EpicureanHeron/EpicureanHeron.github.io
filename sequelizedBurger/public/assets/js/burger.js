//this burger.js handles JQUERY functions on the handlebars page 
$(function () {
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burgerName: $("#burgerName").val().trim(),
            devoured: false
        };
        if (!newBurger.burgerName) {
            alert("Hello! I am an alert box!!");
        }
        else {
            // Send the POST request.
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log("created a new burger");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }
    });
    //use this function to send to the PUT function in the burger_controller
    $(".devourBurger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        var newDevoured = true;

        var customerData = {
            
            newCustomer: $("#customerName").val().trim()

        }
        $.ajax("/api/customers", {
            type: "POST",
            data: customerData
        
        // Send the PUT request.
        
        }).then(function () {
            $.ajax("/api/burgers/" + id, {
                type: "PUT",
                data: newDevoured
            }).then(
                function () {
                    console.log("changed devour state to ", newDevoured);
                    // Reload the page to get the updated list
                    location.reload();
                }
            )
        })
    });
})
