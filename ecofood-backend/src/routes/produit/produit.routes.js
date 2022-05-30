const produit = require("../../controller/produit/produits.controller")
const express = require("express")
const router = express.Router();


//produit
router.get('/', produit.index);
router.get('/count/:id', produit.countproduit);
router.post('/store', produit.store);
router.delete('/:id', produit.deleteproduit);
router.put('/:id', produit.update);



module.exports = router;