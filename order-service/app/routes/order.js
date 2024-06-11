const {
    createOrder,
} = require('../controllers/order_controller');

module.exports = app => {
    app.route('/api/orders')
        .post(
            createOrder,
        );
}