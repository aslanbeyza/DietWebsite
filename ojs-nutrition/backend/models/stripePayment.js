/* Stripe'a özgü detayları StripePayment modelinde saklarsınız */
module.exports = (sequelize, DataTypes) => {
    const StripePayment = sequelize.define('StripePayment', {
        OrderId: { // Sadece birini kullanmalısınız
            type: DataTypes.INTEGER,
            references: {
              model: 'Orders',
              key: 'id'
            },
            allowNull: false
          },
        stripePaymentIntentId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'succeeded', 'failed'),
            defaultValue: 'pending'
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'try', // TRY kodu Türk Lirası için
            validate: {
                isIn: [['try', 'TRY']] // Küçük veya büyük harf kabul edilsin
            }
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
     
    return StripePayment;
};