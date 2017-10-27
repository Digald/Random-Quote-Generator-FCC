$(document).ready(function() {
  // run quote when page loads
  var pulledQuote = "";
  var pulledAuthor = "";
  var tweetQuote = "";
  getQuote();

  // function to get quote from API
  function getQuote() {
    var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    $.getJSON(url, function(json) {
      // inserts json values into html
      $("#quoteText").html(json.quoteText);
      // if/else condition for blank authors
      if (json.quoteAuthor === "") {
        $("author").html("- Anonymous");
        pulledAuthor = "Anonymous";
      } else {
        $("#author").html("- " + json.quoteAuthor);
      }
      // assign value to variables for to prep for twitter post
      pulledQuote = json.quoteText;
      pulledAuthor = json.quoteAuthor;
      tweetQuote = pulledQuote + "- " + pulledAuthor;
      // twitter functionality inside get because of variables...
      $("#twitter").on("click", function() {
        if (tweetQuote.length <= 140) {
          window.open("https://twitter.com/intent/tweet?text=" + tweetQuote)
        } else {
          $(".alert").show();
          if ($(".alert").show()) {
            $("#newQuote").on("click", function() {
              $(".alert").hide();
            });
          }
        }
      }); // end twitter function
    }); // end get.JSON
  } // end getQuote()

  $(".alert").hide();

  // when clicking New Quote button, displays new quote and author
  $("#newQuote").on("click", function() {
    getQuote();
  }); // end newQuote

}); // end document.ready
