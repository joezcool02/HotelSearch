if (Meteor.isClient) {
  Template.SortInput.events({
    'click .SortButton': function (e) {
      console.log("Sort Clicked!")
      DisplayHotels();
    }
  });
}