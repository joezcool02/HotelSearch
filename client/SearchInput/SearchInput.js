if (Meteor.isClient) {
  Template.SearchInput.events({
    'click .FilterButton': function (e) {
      FilterHotels();
    }
  });
}