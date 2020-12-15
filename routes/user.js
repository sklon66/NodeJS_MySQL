const router = require('express').Router();

const {
  user
} = require('../controllers');

router.get('/', user.get);
router.put('/', user.update);
router.post('/', user.new);

router.get('/init', user.init);


module.exports = router;