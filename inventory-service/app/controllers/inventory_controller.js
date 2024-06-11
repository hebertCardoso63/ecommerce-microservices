// src/controllers/inventoryController.js
const service = require('../services/inventory_service');

exports.processOrder = async order => {
    const { products } = order;

    try {
        await service.updateInventory(products);

        console.log('Inventory updated successfully.');
    } catch (error) {
        console.error('Failed to update inventory:', error.message);
    }
};
