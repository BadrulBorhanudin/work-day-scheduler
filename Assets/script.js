$(function () {
    // Function to save user input to local storage
    function saveToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
  
    // Function to get user input from local storage
    function getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
  
    // Function to apply past, present, or future class based on the current hour
    function updateBlockClasses() {
        var currentHour = dayjs().hour();
  
        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }
  
    // Function to display the current date in the header
    function displayCurrentDate() {
        var currentDate = dayjs().format("dddd, MMMM D");
        $("#currentDay").text(currentDate);
    }
  
    // Function to dynamically generate time blocks
    function generateTimeBlocks() {
        var container = $("#timeBlocksContainer");
  
        for (var hour = 9; hour <= 17; hour++) {
            var timeBlock = $("<div>")
                .attr("id", "hour-" + hour)
                .addClass("row time-block")
                .appendTo(container);
  
        $("<div>")
            .addClass("col-2 col-md-1 hour text-center py-3")
            .text(hour > 12 ? hour - 12 + "PM" : hour + "AM")
            .appendTo(timeBlock);
  
        $("<textarea>")
            .addClass("col-8 col-md-10 description")
            .attr("rows", "3")
            .val(getFromLocalStorage("hour-" + hour) || "") // Set saved value
            .appendTo(timeBlock);
  
        $("<button>")
            .addClass("btn saveBtn col-2 col-md-1")
            .attr("aria-label", "save")
            .html('<i class="fas fa-save" aria-hidden="true"></i>')
            .on("click", function () {
                var blockId = $(this).closest(".time-block").attr("id");
                var userInput = $(this).siblings(".description").val();
                saveToLocalStorage(blockId, userInput);
            })
            .appendTo(timeBlock);
        }
    }
  
    // Call the function to generate time blocks
    generateTimeBlocks();
  
    // Display the current date in the header
    displayCurrentDate();
  
    // Apply past, present, or future classes initially
    updateBlockClasses();
});
