const Table = require("../models/table.model.js");

// Get all tables (GET /tables)
exports.findAll = (req, res) => {
    Table.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Update table status (PUT /tables/{id}/status)
exports.updateStatus = (req, res) => {
    Table.updateStatus(req.params.id, req.body.status, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Table not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating table with id " + req.params.id });
            }
        } else res.send(data);
    });
};
