const sql = require("./db.js");

// Layout constructor
const Layout = function(layout) {
    this.name = layout.name;
    this.width = layout.width;
    this.height = layout.height;
    this.admin_id = layout.admin_id;
};

// Create a new layout
Layout.create = (newLayout, result) => {
    sql.query("INSERT INTO layouts SET ?", newLayout, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newLayout });
    });
};

// Get all layouts
Layout.getAll = (result) => {
    sql.query("SELECT * FROM layouts", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get a specific layout by ID
Layout.findById = (id, result) => {
    sql.query("SELECT * FROM layouts WHERE id = ?", [id], (err, res) => {
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

// Update a layout by ID
Layout.updateById = (id, layout, result) => {
    sql.query(
        "UPDATE layouts SET name = ?, width = ?, height = ? WHERE id = ?",
        [layout.name, layout.width, layout.height, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...layout });
        }
    );
};

// Delete a layout by ID
Layout.remove = (id, result) => {
    sql.query("DELETE FROM layouts WHERE id = ?", id, (err, res) => {
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

module.exports = Layout;
