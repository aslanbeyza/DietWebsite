module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        total: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false},
        status: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            defaultValue: "pending",
            enum: ["pending", "completed", "cancelled"]
        },
        imageUrl: { type: DataTypes.STRING,allowNull: true,}
    });
    return Order;
}