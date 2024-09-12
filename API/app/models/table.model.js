const sql = require("./db.js");

// Table constructor
const Table = function(table) {
    this.x = table.x;
    this.y = table.y;
    this.width = table.width;
    this.height = table.height;
    this.capacity = table.capacity;
    this.status = table.status;
    this.layout_id = table.layout_id;
};

// Create tables for a layout
Table.create = (newTable, result) => {
    sql.query("INSERT INTO tables SET ?", newTable, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newTable });
    });
};

// Get tables by layout ID
Table.findByLayoutId = (layoutId, result) => {
    sql.query("SELECT * FROM tables WHERE layout_id = ?", [layoutId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Delete tables by layout ID
Table.removeByLayoutId = (layoutId, result) => {
    sql.query("DELETE FROM tables WHERE layout_id = ?", layoutId, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Table;
