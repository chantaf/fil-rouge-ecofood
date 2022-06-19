const responsable = require("../../controller/responsable/responsable.controller")
const express = require("express")
const router = express.Router();




//responsables
router.get('/', responsable.index);
router.post('/store', responsable.store);
router.post('/login', responsable.loginresponsable);
router.delete('/:id', responsable.deleteresponsable);
router.put('/:id', responsable.updateresponsable);

module.exports = router;