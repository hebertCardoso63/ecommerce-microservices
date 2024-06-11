const service = require('../services/order_service');
const { orderSchema } = require('../validators/order');

exports.createOrder = async (request, response) => {
    const { body } = request;

    const { error, value: orderData } = orderSchema.validate(body);

    if (error) {
        return response.status(400).json({ error: error.details[0].message });
    }

    const { 
        customer_id: customerId,
        products,
    } = orderData;

    const totalPrice = service.calculateTotalPrice(products);

    try {
        const orderId = await service.createOrder(customerId);

        await service.saveOrderItens(products, orderId);

        await service.sendOrderToQueue({ orderId, customerId, products });
    
        return response.status(200).json({
            order_id: orderId,
            status: 'received',
            message: 'Order successfully placed.'
        });
      } catch (err) {
            console.log(666, err.message);
            response.status(500).json({ error: 'Internal Server Error' });
      }
};