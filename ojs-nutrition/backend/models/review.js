module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Product, { foreignKey: 'ProductId' });
    Review.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Review;
};
