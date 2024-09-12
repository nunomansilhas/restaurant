const Layout = require("../models/layout.model.js");
const Table = require("../models/table.model.js");

// Create a new layout with tables
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const layout = new Layout({
        name: req.body.name,
        width: req.body.width,
        height: req.body.height,
        admin_id: req.body.admin_id
    });

    Layout.create(layout, (err, layoutData) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        // Insert tables after the layout is created
        const tables = req.body.tables.map(table => ({
            ...table,
            layout_id: layoutData.id
        }));

        tables.forEach(table => {
            Table.create(table, (err) => {
                if (err) res.status(500).send({ message: err.message });
            });
        });

        res.send(layoutData);
    });
};

// Retrieve all layouts with their tables
exports.findAll = (req, res) => {
    Layout.getAll((err, layouts) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        const layoutPromises = layouts.map(layout =>
            new Promise((resolve, reject) => {
                Table.findByLayoutId(layout.id, (err, tables) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ ...layout, tables });
                    }
                });
            })
        );

        Promise.all(layoutPromises)
            .then(result => res.send(result))
            .catch(err => res.status(500).send({ message: err.message }));
    });
};

// Retrieve a specific layout by ID with its tables
exports.findOne = (req, res) => {
    Layout.findById(req.params.id, (err, layoutData) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        if (!layoutData) {
            res.status(404).send({ message: `Layout not found with id ${req.params.id}` });
            return;
        }

        Table.findByLayoutId(layoutData.id, (err, tables) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
            res.send({ ...layoutData, tables });
        });
    });
};

// Update an existing layout and its tables
exports.update = (req, res) => {
    Layout.updateById(req.params.id, req.body, (err, layoutData) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        // Delete old tables and insert new ones
        Table.removeByLayoutId(req.params.id, () => {
            const tables = req.body.tables.map(table => ({
                ...table,
                layout_id: req.params.id
            }));

            tables.forEach(table => {
                Table.create(table, (err) => {
                    if (err) res.status(500).send({ message: err.message });
                });
            });

            res.send(layoutData);
        });
    });
};

// Delete a layout by ID
exports.delete = (req, res) => {
    const layoutId = req.params.id;

    // First, delete all tables associated with this layout
    Table.removeByLayoutId(layoutId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting tables for layout with id " + layoutId
            });
            return;
        }

        // Now delete the layout itself
        Layout.remove(layoutId, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting layout with id " + layoutId
                });
                return;
            }
            res.send({ message: `Layout and its tables were deleted successfully!` });
        });
    });
};