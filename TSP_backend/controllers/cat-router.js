// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const router = express.Router()
// get the CRUD operations
const CatCtrl = require('./cat-ctrl')

// =======================================
//              GET ROUTES
// =======================================
router.get('/cats/:id', CatCtrl.getCatById)
router.get('/cats', CatCtrl.getCats)

// =======================================
//              POST ROUTES
// =======================================
router.post('/cats', CatCtrl.createCat)

// =======================================
//              PUT ROUTES
// =======================================
router.put('/cats/:id', CatCtrl.updateCat)

// =======================================
//              DELETE ROUTES
// =======================================
router.delete('/cats/:id', CatCtrl.deleteCat)

module.exports = router