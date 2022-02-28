const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {validateBody} = require('../middlewares/validator')
const {bodySchema} = require('../middlewares/schema/bodySchema')

router.post('/signup', validateBody(bodySchema), authController.signup);

module.exports = router;
