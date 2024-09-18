
const db = require('../models/db');

// Fetch all items for a specific order by order_id
exports.getOrderItemsByOrderId = (req, res) => {
    const orderId = req.params.order_id;
    const query = 'SELECT * FROM order_items WHERE order_id = ?';

    db.query(query, [orderId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'No items found for this order' });
        }
        res.json(results);
    });
};

// Add a new order item
exports.addOrderItem = (req, res) => {
    const { order_id, dish_id, quantity, status } = req.body;
    const query = 'INSERT INTO order_items (order_id, dish_id, quantity, status) VALUES (?, ?, ?, ?)';

    db.query(query, [order_id, dish_id, quantity, status], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding order item' });
        }
        res.status(201).json({ message: 'Order item added successfully' });
    });
};

// Edit an existing order item
exports.editOrderItem = (req, res) => {
    const itemId = req.params.id;
    const { quantity, status } = req.body;
    const query = 'UPDATE order_items SET quantity = ?, status = ? WHERE id = ?';

    db.query(query, [quantity, status, itemId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating order item' });
        }
        res.json({ message: 'Order item updated successfully' });
    });
};

// Delete an order item by ID
exports.deleteOrderItem = (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM order_items WHERE id = ?';

    db.query(query, [itemId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting order item' });
        }
        res.json({ message: 'Order item deleted successfully' });
    });
};