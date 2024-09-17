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

module.exports = Order;
