var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/hotels', getHotels);
router.get('/hotel/:id', getHotel);
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
