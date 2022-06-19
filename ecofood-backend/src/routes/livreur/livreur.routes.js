const livreur = require("../../controller/livreur/livreur.controller")
const express = require("express")
const router = express.Router();




//livreurs
router.get('/', livreur.index);
router.post('/store', livreur.store);
router.post('/login', livreur.loginlivreur);
router.delete('/:id', livreur.deletelivreur);
router.put('/:id', livreur.updatelivreur);
router.get('/count', livreur.countlivreur);

module.exports = router;