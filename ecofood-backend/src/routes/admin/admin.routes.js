const admin = require("../../controller/admin/admin.controller")
const express = require("express")
const router = express.Router();



//admin
router.get('/', admin.index);
router.post('/store', admin.store);
router.post('/login', admin.loginadmin);
router.delete('/delete/:id', admin.deleteadmin);
router.put('/update/:id', admin.updateadmin);
router.post('/data', admin.getDataUser);
module.exports = router;