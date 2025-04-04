module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        quantity: {type: DataTypes.INTEGER, required: true, allowNull: false},
        price: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false},
    });

    return OrderItem;
}