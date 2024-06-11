const amqp = require('amqplib');
const knex = require('../factories/knex-factory');

exports.updateInventory = async products => {
    return knex.transaction(async trx => {
        for (const product of products) {
            const { product_id, quantity } = product;

            const currentInventory = await trx({ i: 'inventories'})
                .where('i.product_id', product_id)
                .select('i.quantity')
                .first();

            if (currentInventory && currentInventory.quantity >= quantity) {
                await trx({ i: 'inventories'})
                    .where('i.product_id', product_id)
                    .update({
                        quantity: currentInventory.quantity - quantity
                    });
            } else {
                throw new Error(`Insufficient inventory for product ID: ${product_id}`);
            }
        }
    });
  };

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

exports.consumeMessages = async (queue, callback) => {
    try {
        const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
        const connection = await connectRabbitMQ(rabbitMQUrl, 10, 5000);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());

                callback(messageContent);

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Failed to consume messages from RabbitMQ:', error);
    }
};
