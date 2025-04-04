module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {type: DataTypes.STRING, required: true, allowNull: false},
    });

    return Category;
}