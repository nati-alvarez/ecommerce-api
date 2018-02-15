const router = require("express").Router();
const controller = require("../controllers/cart");

router.post("/checkout", controller.checkout);

module.exports = router;