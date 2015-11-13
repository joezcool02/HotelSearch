describe("Initial Load", function() {
  it("3 Hotels Loaded as expected", function() {
    expect($('.Result').length).toEqual(3);
  });
});

describe("Filter Tests", function() {
  it("Check Swimming Pool", function() {
    $(".ChkSwimmingPool").click();
    $(".FilterButton").click();
    expect($('.Result').length).toEqual(1);
  });
});

describe("Filter Tests", function() {
  it("Check Car Park", function() {
    $(".ChkCarPark").click();

    //unselect Swimming Pools
    $(".ChkSwimmingPool").click();

    $(".FilterButton").click();
    expect($('.Result').length).toEqual(2);
  });
});

describe("Filter Tests", function() {
  it("Check Gym", function() {

    $(".ChkGym").click();

    //uncheck CarPark
    $(".ChkCarPark").click();
    $(".FilterButton").click();
    expect($('.Result').length).toEqual(1);

    //uncheck Gym to end filter tests
    $(".ChkGym").click();

  });
});

describe("Sort Tests", function() {
  it("Check Ascending", function() {

    $(".StarSortInput").val("Ascending");
    $(".SortButton").click();

    var topHotel = $('.StarRatingSpace').first();

    var topHotelStarCount = topHotel.find('.StarFillImg').length;
    expect(topHotelStarCount).toEqual(3);

  });
});


describe("Sort Tests", function() {
  it("Check Descending", function() {

    $(".StarSortInput").val("Descending");
    $(".SortButton").click();

    var topHotel = $('.StarRatingSpace').first();

    var topHotelStarCount = topHotel.find('.StarFillImg').length;
    expect(topHotelStarCount).toEqual(5);

  });
});





