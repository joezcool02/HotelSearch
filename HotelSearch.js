if (Meteor.isClient) {

  Meteor.call('GetHotelsArr', function(error, result) {
          console.log(result[0].nm);
          LoadInHotels(result);
        });


  function LoadInHotels(Hotels) {
    console.log(Hotels[1].nm);
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
