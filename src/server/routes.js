var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/hotels', getHotels);
router.get('/hotel/:id', getHotel);
router.post('/filters', getFilteredHotels);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getHotels(req, res, next) {
  res.status(200).send(data.hotels);
}

function getHotel(req, res, next) {
  var id = +req.params.id;
  var hotel = data.hotels.filter(function(p) {
    return p.id === id;
  })[0];

  if (hotel) {
    res.status(200).send(hotel);
  } else {
    four0four.send404(req, res, 'hotel ' + id + ' not found');
  }
}

function filtering(hotels, params) {
  if(params.fivestar === false) {
    hotels = hotels.filter(hotel => hotel.stars !== 5);
  }
  if(params.fourstar === false) {
    hotels = hotels.filter(hotel => hotel.stars !== 4);
  }
  if(params.threestar === false) {
    hotels = hotels.filter(hotel => hotel.stars !== 3);
  }
  if(params.twostar === false) {
    hotels = hotels.filter(hotel => hotel.stars !== 2);
  }
  if(params.onestar === false) {
    hotels = hotels.filter(hotel => hotel.stars !== 1);
  }
  return hotels;
}

function filteringByName(hotels, params) {
  var hotelsByname = hotels.filter(function(p) {
    var tem = p.name.toLowerCase();
    var name = params.name;
    name = name.toLowerCase();
    return tem.includes(name);
  });
  if(params.fivestar === true) {
    hotelsByname = hotelsByname.filter(hotel => hotel.stars === 5);
  }
  if(params.fourstar === true) {
    hotelsByname = hotelsByname.filter(hotel => hotel.stars === 4);
  }
  if(params.threestar === true) {
    hotelsByname = hotelsByname.filter(hotel => hotel.stars === 3);
  }
  if(params.twostar === true) {
    hotelsByname = hotelsByname.filter(hotel => hotel.stars === 2);
  }
  if(params.onestar === true) {
    hotelsByname = hotelsByname.filter(hotel => hotel.stars === 1);
  }
  return hotelsByname;
}

function getFilteredHotels(req, res, next) {
  var name = req.body.params.name;
  var isName = name ? true : false;
  var hotels = data.hotels;
  var params = req.body.params;

  hotels = filtering(hotels, params);

  if(isName) {
    hotels = filteringByName(data.hotels, params);
  }

  if (hotels) {
    res.status(200).send(hotels);
  } else {
    four0four.send404(req, res, 'hotels with your filters not found');
  }
}
