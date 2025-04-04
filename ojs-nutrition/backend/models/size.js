module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define("Size", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gram: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    pieces: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_services: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Size.associate = function (models) {
    Size.belongsTo(models.Variant, { foreignKey: "VariantId" });

  };

  return Size;
};