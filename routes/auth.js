const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/admin/login", controller.adminLogin);

module.exports = router;