const Order = require("../models/order.model.js");

// Create a new order (POST /orders)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const order = new Order({
        table_number: req.body.table_number,
        user_id: req.body.user_id,
        status: 'Pending'
    });

    Order.create(order, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// View a specific order (GET /orders/{id})
exports.findOne = (req, res) => {
    Order.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Order not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error retrieving order with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Update the status of an order (PUT /orders/{id})
exports.updateStatus = (req, res) => {
    Order.updateStatus(req.params.id, req.body.status, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Order not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating order status with id " + req.params.id });
            }
        } else res.send(data);
    });
};

exports.findAllPending = (req, res) => {
    Order.getAllPending((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};