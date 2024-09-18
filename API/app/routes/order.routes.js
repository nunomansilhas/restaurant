module.exports = (app) => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();

    router.post("/", orders.create); // Create a new order
    router.get("/:id", orders.findOne); // Get specific order by id
    router.put("/:id/status", orders.updateStatus); // Update status

    // New route to mark order as completed with time to complete
    router.put("/:id/complete", orders.markAsCompleted);

    // New route to update timeToComplete field
    router.put("/:id/time-to-complete", orders.updateTimeToComplete);

    router.get("/", orders.findAllPending); // Get all pending orders

    app.use('/api/orders', router);
};
