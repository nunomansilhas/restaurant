module.exports = (app) => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();

    router.post("/", orders.create);
    router.get("/:id", orders.findOne);
    router.put("/:id/status", orders.updateStatus);
    router.get("/", orders.findAllPending);
    router.put("/:id/status", orders.updateStatus);
    app.use('/api/orders', router);
};
