const Dish = require("../models/dish.model.js");

// Add a new dish (POST /dishes)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const dish = new Dish({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        status: req.body.status
    });

    Dish.create(dish, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Edit an existing dish (PUT /dishes/{id})
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Dish.updateById(req.params.id, new Dish(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Dish not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating dish with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// List all dishes (GET /dishes)
exports.findAll = (req, res) => {
    Dish.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Remove a dish (DELETE /dishes/{id})
exports.delete = (req, res) => {
    Dish.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Dish not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete dish with id " + req.params.id });
            }
        } else res.send({ message: `Dish was deleted successfully!` });
    });
};
