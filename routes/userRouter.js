const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

//Register user 
router.post('/register',userCtrl.registerUser)

//Login user
router.post('/login',userCtrl.loginUser)

//Verify token
router.get('/verify',userCtrl.verifyToken)

module.exports = router