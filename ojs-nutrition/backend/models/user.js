module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user', validate: { isIn: [['admin', 'user']] } },
  }, { timestamps: true });


  User.associate = function(models) {
    // User has many reviews
    User.hasMany(models.Review, { foreignKey: 'UserId' });
};
  return User;
};