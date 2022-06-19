
const commande = require("../../controller/commande/commande.contoller");
const express = require("express")
const router = express.Router();


//commande
router.get('/', commande.index);
router.get('/status', commande.getByStatus);
router.get('/count', commande.countcommande);
router.post('/store', commande.store);
router.put('/:id', commande.updateStatus);
router.put('/affecter/:id', commande.affectercommande);

module.exports = router;