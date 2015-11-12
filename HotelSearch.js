if (Meteor.isClient) {

  //Meteor Call function to call a Server Side function from the client side
  Meteor.call('GetHotelsArr', function(error, result) {
          LoadInHotels(result);
        });

  //Load in the Hotels from the Server side
  function LoadInHotels(Hotels) {
    DisplayHotels(Hotels);
  }

  //Display the Hotels in the Client view
  function DisplayHotels(Hotels) {

    //Filtered Hotels
    var FilteredHotels = ApplyFilters(Hotels);

    //For each Hotel
    FilteredHotels.forEach(function(Hotel) {
      
    //Render in the Hotel in our HTML style
    $( ".ResultsArea" ).append('<div class="row"> <div class="Result"> <div class="col-md-4 col-sm-12"> <div class="ResultImageSpace"> <img class="ResultImage" src="/HotelImage.jpg"> </div></div><div class="col-md-8 col-sm-12"> <div class="ResultTextArea"> <h2 class="HotelNameSpace">' + Hotel.Name + '</h2> <p class="StarRatingSpace">' + Hotel.StarRating + '</p> <div class="AmenitiesArea"></div></div></div></div></div>');
    });

    //Render in the star ratings per user
    DisplayStars(FilteredHotels);
    
  }

  //Apply filters to the Hotels
  function ApplyFilters(Hotels) {
    //Temporarily return the same array
    return Hotels;
  }

  //Build a selector for an individual hotel, JQuery
  function BuildSelectorString(ChildNumber) {
    return ".ResultsArea > div:nth-child(" + ChildNumber + ")  .StarRatingSpace";
  }

  //Build a rating string out of 5 stars
  function BuildRatingString(StarNumber) {
    var StarString = ""

    for (var i = 0 ; i < 5; i++) {
      if(i < StarNumber)
        StarString = StarString + "<img src=StarFill.png>";
      else
        StarString = StarString + "<img src=StarEmpty.png>";
    };

    // return StarString;
    return StarString;
  }

  //function to display the Stars
  function DisplayStars(Hotels) {
    
    //Display Stars
    //create counter
    var counter = 0;
    var SelectorString ="";
    var OutputStarString ="";

    Hotels.forEach(function(Hotel) {
      // $( ".StarRatingSpace:child(" + counter + ")" ).append('*');
      SelectorString = BuildSelectorString(counter + 1);
      OutputStarString = BuildRatingString(Hotel.StarRating);
      $( SelectorString ).append(OutputStarString);

      counter++;
    });
  }



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    HotelsArr = {};

      // Checking all content can be accessed from the text file
      console.log(Assets.getText('example.txt'));

      //checking all content can be accessed from the json file
      HotelsArr = JSON.parse(Assets.getText('example.json'));
      
      console.log("Json Object");
      //checking my json object has been loaded correctly
      console.log("10th Monarch " + HotelsArr[1].Name);

      Meteor.methods({
        GetHotelsArr : function() {
          
          return JSON.parse(Assets.getText('example.json'));
        }
      })
      
  });
}
