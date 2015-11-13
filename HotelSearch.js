if (Meteor.isClient) {

  var GlobalHotels = [];
  //Meteor Call function to call a Server Side function from the client side
  Meteor.call('GetHotelsArr', function(error, result) {
          GlobalHotels = result;
          console.log(GlobalHotels);
          LoadInHotels(result);
        });

  //Load in the Hotels from the Server side
  function LoadInHotels(Hotels) {
    DisplayHotels(Hotels);
  }

  function ApplyFilters(Hotels) {

    var CarParkChecked = false;
    var SwimmingPoolChecked = false;
    var GymChecked = false;
    
    var canBePushed = true;

    var FilteredArray = [];



    if ($('.ChkCarPark').is(":checked"))
      CarParkChecked = true;

    if ($('.ChkSwimmingPool').is(":checked"))
      SwimmingPoolChecked = true;

    if ($('.ChkGym').is(":checked"))
      GymChecked = true;

    //For each Hotel
    Hotels.forEach(function(Hotel) {

      canBePushed = true;

      if(CarParkChecked)
        if(Hotel.Facilities.indexOf("carpark") == -1)
            canBePushed = false;

      if(SwimmingPoolChecked)
        if(Hotel.Facilities.indexOf("pool") == -1)
            canBePushed = false;

      if(GymChecked)
        if(Hotel.Facilities.indexOf("gym") == -1)
            canBePushed = false;

      if (canBePushed)
        FilteredArray.push(Hotel);

    });

    console.log(FilteredArray);
    //Temporarily return the same array
    return FilteredArray;
  }


  function RemoveHotels() {
    $(".ResultsArea").remove();
  }


  //temporary sort hotels stub
  function SortHotels(Hotels) {

    //sort hotels into Descending Order
    Hotels.sort(StarCompare);

    //If Ascending required, simply reverse the Descending Sorted Array
    if($(".StarSortInput option:selected").text() == "Ascending")
      Hotels.reverse();

    return Hotels;
  }

  //StarCompare Ascending
  function StarCompare(a,b) {
    if (a.StarRating < b.StarRating)
      return 1;
    if (a.StarRating > b.StarRating)
      return -1;
    return 0;
  }

  //Display the Hotels in the Client view
  DisplayHotels = function() {
    // Include the global hotels
    Hotels = GlobalHotels;
    //Filtered Hotels
    var FilteredHotels = ApplyFilters(Hotels);
    var SortedFilteredHotels = SortHotels(FilteredHotels);

    RemoveHotels();

    $('<div class="ResultsArea"></div>').insertBefore( ".alert" );
    //For each Hotel
    SortedFilteredHotels.forEach(function(Hotel) {
      
    //Render in the Hotel in our HTML style
    $( ".ResultsArea" ).append('<div class="row"> <div class="Result"> <div class="col-md-4 col-sm-12"> <div class="ResultImageSpace"> <img class="ResultImage" src="/HotelImage.jpg"> </div></div><div class="col-md-8 col-sm-12"> <div class="ResultTextArea"> <h2 class="HotelNameSpace">' + Hotel.Name + '</h2> <p class="StarRatingSpace"></p> <div class="AmenitiesArea"></div></div></div></div></div>');
    });

    //Render in the star ratings per user
    DisplayStars(SortedFilteredHotels);
    DisplayAmenities(SortedFilteredHotels);
    
  }



  //Build a selector for an individual hotel stars, JQuery
  function BuildStarSelectorString(ChildNumber) {
    return ".ResultsArea > div:nth-child(" + ChildNumber + ")  .StarRatingSpace";
  }

  //Build a rating string out of 5 stars
  function BuildRatingString(StarNumber) {
    var StarString = ""

    for (var i = 0 ; i < 5; i++) {
      if(i < StarNumber)
        StarString = StarString + "<img class='StarFillImg' src=StarFill.png>";
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
      SelectorString = BuildStarSelectorString(counter + 1);
      OutputStarString = BuildRatingString(Hotel.StarRating);
      $( SelectorString ).append(OutputStarString);

      counter++;
    });
  }

  //function to display the Stars
  function DisplayAmenities(Hotels) {

    //Display Stars
    //create counter
    var counter = 0;
    var SelectorString ="";
    var OutputStarString = "";
    

    Hotels.forEach(function(Hotel) {
      // $( ".StarRatingSpace:child(" + counter + ")" ).append('*');
      SelectorString = BuildAmenitiesSelectorString(counter + 1);
      OutputStarString = BuildAmenitiesString(Hotel.Facilities);
      $( SelectorString ).append(OutputStarString);

      counter++;
    });
  }

  //Build a selector for an individual hotel, JQuery
  function BuildAmenitiesSelectorString(ChildNumber) {
    return ".ResultsArea > div:nth-child(" + ChildNumber + ")  .AmenitiesArea";
  }


  //Build a selector for an individual hotel, JQuery
  function BuildAmenitiesString(Facilities) {
    var AmenitiesString = ""

    Facilities.forEach(function(Facility) {
      AmenitiesString = AmenitiesString + "<img src=" + Facility + ".png>";

    });

    // return AmenitiesString;
    return AmenitiesString;
    
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
