const sql = require("./db.js");

// Dish constructor
const Dish = function(dish) {
    this.name = dish.name;
    this.price = dish.price;
    this.category = dish.category;
    this.status = dish.status;
};

Dish.create = (newDish, result) => {
    sql.query("INSERT INTO dishes SET ?", newDish, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newDish });
    });
};

Dish.updateById = (id, dish, result) => {
    sql.query(
        "UPDATE dishes SET name = ?, price = ?, category = ?, status = ? WHERE id = ?",
        [dish.name, dish.price, dish.category, dish.status, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...dish });
        }
    );
};

Dish.getAll = (result) => {
    sql.query("SELECT * FROM dishes", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Dish.remove = (id, result) => {
    sql.query("DELETE FROM dishes WHERE id = ?", id, (err, res) => {
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

module.exports = Dish;
