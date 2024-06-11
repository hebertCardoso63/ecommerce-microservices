const amqp = require('amqplib');
const knex = require('../factories/knex-factory');


exports.saveOrderItens = async (orderItensData, orderIds) => {
	const arrayInserts = orderItensData.map((orderData) => ({
			product_id: orderData.product_id,
			quantity: orderData.quantity,
			price: orderData.price,
            order_id: orderIds[0].id,	
	}));

	const query = await knex('order_items')
		.insert(arrayInserts);

	return query;
}	
exports.calculateTotalPrice = items => {
	return items.reduce((total, item) => {
	  return total + item.price;
	}, 0);
}

exports.createOrder = async customerId => {
	const orderData = {
		customer_id: customerId,
		status: 'APROVADO',
	};

    const query = await knex('orders')
        .insert(orderData, ['id']);

    return query; 
}

const connectRabbitMQ = async (url, maxRetries, delay) => {
	let attempts = 0;
  
	while (attempts < maxRetries) {
	try {
		const connection = await amqp.connect(url);
		console.log('Connected to RabbitMQ');
		return connection;
	} catch (error) {
		attempts++;
		console.log(`Retry ${attempts}/${maxRetries}: Unable to connect to RabbitMQ. Retrying in ${delay}ms...`);
		await new Promise(res => setTimeout(res, delay));
	}
	}
  
	throw new Error('Max retries reached. Unable to connect to RabbitMQ.');
};

exports.sendOrderToQueue = async orderData => {
	try {
		const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
		const connection = await connectRabbitMQ(rabbitMQUrl, 10, 5000);
		const channel = await connection.createChannel();
		const queue = 'orderQueue';
		const msg = JSON.stringify(orderData);

		await channel.assertQueue(queue, { durable: true });
		await channel.sendToQueue(queue, Buffer.from(msg));

		console.log(" [x] Sent %s", msg);

		setTimeout(() => {
			connection.close();
		}, 500); // Close connection after a short delay to ensure the message is sent
		} catch (error) {
			console.error('Failed to send message to RabbitMQ:', error);
	}
}