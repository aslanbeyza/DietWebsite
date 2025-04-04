module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define("Variant", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    flavor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aroma_photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    photo_src: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Variant.associate = function (models) {
    Variant.belongsTo(models.Size);
    Variant.hasMany(models.Size, { foreignKey: 'VariantId' });
    Variant.hasMany(models.PriceInfo, { foreignKey: "VariantId" }); 
  };

  return Variant;
};