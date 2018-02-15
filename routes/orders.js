const express = require("express");
const router = express.Router();

const controller = require("../controllers/orders");

router.get("/", controller.getCatalogue);

module.exports =  router;