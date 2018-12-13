/* Dependencies */
var 
listings = require('../controllers/listings.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

router.put('/flowers/:ngen/:nspe/:ncom/:ogen/:ospe', listings.update);

router.post('/sightings/:fname/:name/:loc', listings.add);
router.delete('/sightings/:fname/:name/:loc', listings.remove);


router.route('/flowers')
  .get(listings.flowers);

router.route('/sightings')
  .get(listings.sightings)

router.route('/sightings/:fname')
  .get(listings.search)
module.exports = router;