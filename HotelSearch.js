if (Meteor.isClient) {

  Meteor.call('GetHotelsArr', function(error, result) {
          console.log(result[0].Name);
          LoadInHotels(result);
        });

  function LoadInHotels(Hotels) {
    console.log(Hotels[1].Name);
    DisplayHotels(Hotels);
  }

  function DisplayHotels(Hotels) {

    var FilteredHotels = ApplyFilters(Hotels);

    FilteredHotels.forEach(function(Hotel) {
      
    $( ".ResultsArea" ).append('<div class="row"> <div class="Result"> <div class="col-md-4 col-sm-12"> <div class="ResultImageSpace"> <img class="ResultImage" src="/HotelImage.jpg"> </div></div><div class="col-md-8 col-sm-12"> <div class="ResultTextArea"> <h2 class="HotelNameSpace">' + Hotel.Name + '</h2> <p class="StarRatingSpace">' + Hotel.StarRating + '</p></div></div></div></div>');
    });

    DisplayStars(FilteredHotels);
    
  }

  function ApplyFilters(Hotels) {
    //Temporarily return the same array
    return Hotels;
  }

  function BuildSelectorString(ChildNumber) {
    //Temporarily return the same array
    return ".ResultsArea > div:nth-child(" + ChildNumber + ")  .StarRatingSpace";
  }

  function BuildRatingString(StarNumber) {
    var StarString = ""

    for (var i = 0 ; i < 5; i++) {
      if(i < StarNumber)
        StarString = StarString + "*";
      else
        StarString = StarString + "o";
    };

    // return StarString;
    return StarString;
  }

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
