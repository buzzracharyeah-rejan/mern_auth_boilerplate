const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody, validateQuery } = require('../middlewares/validator');
const { signupSchema, loginSchema, tokenSchema } = require('../middlewares/schema/authSchema');
const { passportLocal, passportJwt } = require('../middlewares/passport');

router.post('/signup', validateBody(signupSchema), authController.signup);
router.post('/signupWithEmail', validateBody(signupSchema), authController.signupWithEmail);
router.post(
  '/signupWithEmailConfirm',
  validateQuery(tokenSchema),
  authController.signupWithEmailConfirm
);
router.post('/login', validateBody(loginSchema), passportLocal, authController.login);
router.get('/protected', passportJwt, (req, res, next) => {
    // console.log(req.headers)
  res.status(200).json({ status: 'success' });
});

module.exports = router;
