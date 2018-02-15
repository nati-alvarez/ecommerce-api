const passport = require("passport");
const router = require("express").Router();
const controller = require("../controllers/product");

router.get("/", controller.getProducts);
router.post("/", passport.authenticate('jwt', {session: false}), controller.createProduct);
router.get("/:id", controller.getProduct);
router.put("/:id", passport.authenticate('jwt', {session: false}),controller.updateProduct);
router.delete("/:productId", passport.authenticate('jwt', {session: false}), controller.deleteProduct);

module.exports = router;