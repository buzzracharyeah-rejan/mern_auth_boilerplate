const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {validateBody, validateQuery} = require('../middlewares/validator')
const {bodySchema, tokenSchema} = require('../middlewares/schema/authSchema')

router.post('/signup', validateBody(bodySchema), authController.signup);
router.post('/signupWithEmail', validateBody(bodySchema), authController.signupWithEmail); 
router.post('/signupWithEmailConfirm', validateQuery(tokenSchema), authController.signupWithEmailConfirm)

module.exports = router;
