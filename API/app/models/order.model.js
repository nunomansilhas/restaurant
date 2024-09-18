const sql = require("./db.js");

// Order constructor
const Order = function(order) {
    this.table_number = order.table_number;
    this.user_id = order.user_id;
    this.status = order.status;
};

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newOrder });
    });
};

Order.findById = (id, result) => {
    sql.query("SELECT * FROM orders WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
Order.markAsCompleted = (id, result) => {
    sql.query("UPDATE orders SET status = 'Completed' WHERE id = ?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};
Order.getAllPending = (result) => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.updateStatus = (id, status, result) => {
    sql.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

// Update the timeToComplete for an order (PUT /orders/:id/time-to-complete)
exports.updateTimeToComplete = (req, res) => {
    Order.updateTimeToComplete(req.params.id, req.body.timeToComplete, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Order not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating time to complete for order with id " + req.params.id });
            }
        } else res.send({ message: "Time to complete updated successfully!" });
    });
};

// Update the status of an order
Order.updateStatus = (id, status, result) => {
    sql.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};
module.exports = Order;
