module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        amount: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false},
        type: {type: DataTypes.STRING, required: true, allowNull: false, defaultValue: "credit_card", enum: ['credit_card', 'cash']},
    });

    return Payment;
}