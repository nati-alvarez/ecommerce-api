const router = require("express").Router();

const productRoutes = require('./products');
const cartRoutes = require("./cart");
const ordersRoutes = require("./orders");
const authRoutes = require("./auth")

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", ordersRoutes);
router.use("/auth", authRoutes);

module.exports = router;