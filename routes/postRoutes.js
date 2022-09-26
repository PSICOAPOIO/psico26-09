const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

//helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth,  PostController.createPost)
router.post('/add', checkAuth,  PostController.createPostSave)
router.get('/forum', checkAuth,  PostController.forum)
router.post('/remove',checkAuth, PostController.removePost)
router.get('/showPost', PostController.showPost)



module.exports = router