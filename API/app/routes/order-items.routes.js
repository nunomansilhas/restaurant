const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/order-items.controller');

// Fetch all items for a specific order by order_id
router.get('/:order_id', orderItemsController.getOrderItemsByOrderId);

// Add a new order item
router.post('/', orderItemsController.addOrderItem);

// Edit an existing order item
router.put('/:id', orderItemsController.editOrderItem);

// Delete an order item by ID
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;