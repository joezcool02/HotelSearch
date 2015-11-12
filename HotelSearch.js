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
    
  }

  function ApplyFilters(Hotels) {
    //Temporarily return the same array
    return Hotels;
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
