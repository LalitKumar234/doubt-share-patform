const express = require("express");
const auth = require("../middlewares/auth.middleware");
const doubtController = require("../controllers/doubt.controller");


const router = express.Router();


router.post('/', auth, doubtController.doubt)
router.get('/', auth, doubtController.getDoubts)
router.put('/:id', auth, doubtController.resolveDoubt)

module.exports = router;