if (Meteor.isClient) {

  Meteor.call('GetHotelsArr', function(error, result) {
          console.log(result[0].nm);
          LoadInHotels(result);
        });

  function LoadInHotels(Hotels) {
    console.log(Hotels[1].nm);
    DisplayHotels(Hotels);
  }

  function DisplayHotels(Hotels) {
    Hotels.forEach(function(Hotel) {
      console.log(Hotel);
      // $( ".ResultsArea" ).append(Hotel.nm + "<br>");


    $( ".ResultsArea" ).append('<div class="row"> <div class="Result"> <div class="col-md-4 col-sm-12"> <div class="ResultImageSpace"> <img class="ResultImage" src="/HotelImage.jpg"> </div></div><div class="col-md-8 col-sm-12"> <div class="ResultTextArea"> <h2>' + Hotel.nm + '</h2> <p>' + Hotel.hse + '</p></div></div></div></div>');

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
      console.log("10th Monarch " + HotelsArr[10].nm);

      Meteor.methods({
        GetHotelsArr : function() {
          
          return JSON.parse(Assets.getText('example.json'));
        }
      })
      
  });
}
