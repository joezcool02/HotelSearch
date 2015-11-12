if (Meteor.isClient) {
  Template.SearchInput.events({
    'click .FilterButton': function (e) {
      console.log("Filter Clicked!")
      DisplayHotels();
    }
  });
}